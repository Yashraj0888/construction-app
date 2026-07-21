import type { Enquiry, PipelineStatus } from "./_shared";

export type AdminCounts = Record<PipelineStatus, number>;

export type StaffNote = {
  id: string;
  enquiry_id?: string;
  html: string;
  created_at: string;
  updated_at: string;
};

export type ListCacheEntry = {
  enquiries: Enquiry[];
  counts: AdminCounts;
  fetchedAt: number;
};

export type DetailCacheEntry = {
  enquiry: Enquiry;
  notes: StaffNote[];
  fetchedAt: number;
};

const listCache = new Map<string, ListCacheEntry>();
const detailCache = new Map<string, DetailCacheEntry>();

/** Soft TTL helper — list/detail now prefer session cache until Refresh. */
export const ADMIN_CACHE_TTL_MS = 60_000;

export function listCacheKey(opts: {
  type: string;
  status: string;
  q: string;
}): string {
  return `${opts.type}::${opts.status}::${opts.q.trim().toLowerCase()}`;
}

export function getListCache(key: string): ListCacheEntry | null {
  return listCache.get(key) ?? null;
}

export function setListCache(
  key: string,
  enquiries: Enquiry[],
  counts: AdminCounts
): void {
  listCache.set(key, { enquiries, counts, fetchedAt: Date.now() });
  for (const row of enquiries) {
    const existing = detailCache.get(row.id);
    if (!existing || !existing.enquiry.payload) {
      detailCache.set(row.id, {
        enquiry: existing ? { ...existing.enquiry, ...row } : row,
        notes: existing?.notes ?? [],
        fetchedAt: existing?.fetchedAt ?? Date.now(),
      });
    }
  }
}

export function getDetailCache(id: string): DetailCacheEntry | null {
  return detailCache.get(id) ?? null;
}

export function setDetailCache(enquiry: Enquiry, notes?: StaffNote[]): void {
  const prev = detailCache.get(enquiry.id);
  detailCache.set(enquiry.id, {
    enquiry,
    notes: notes ?? prev?.notes ?? [],
    fetchedAt: Date.now(),
  });
  for (const [key, entry] of listCache) {
    const idx = entry.enquiries.findIndex((e) => e.id === enquiry.id);
    if (idx === -1) continue;
    const next = [...entry.enquiries];
    next[idx] = {
      ...next[idx],
      ...enquiry,
      payload: next[idx].payload ?? enquiry.payload,
    };
    listCache.set(key, { ...entry, enquiries: next });
  }
}

export function setNotesCache(enquiryId: string, notes: StaffNote[]): void {
  const prev = detailCache.get(enquiryId);
  if (!prev) return;
  detailCache.set(enquiryId, { ...prev, notes, fetchedAt: Date.now() });
}

export function invalidateListCaches(): void {
  listCache.clear();
}

export function clearAdminCache(): void {
  listCache.clear();
  detailCache.clear();
}

export function isFresh(fetchedAt: number, ttl = ADMIN_CACHE_TTL_MS): boolean {
  return Date.now() - fetchedAt < ttl;
}

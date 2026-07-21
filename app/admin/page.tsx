"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, RefreshCw, ChevronRight } from "lucide-react";
import CustomSelect from "./components/CustomSelect";
import {
  getListCache,
  setListCache,
  listCacheKey,
  clearAdminCache,
  type AdminCounts,
} from "./cache";
import {
  Enquiry,
  TYPE_LABELS,
  STATUS_TILES,
  PipelineStatus,
  fullName,
  formatWhen,
  statusMeta,
  normalizePipelineStatus,
} from "./_shared";

const EMPTY_COUNTS: AdminCounts = {
  open: 0,
  sale: 0,
  pending: 0,
  contact_us: 0,
  disputed: 0,
};

export default function AdminDashboardPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [rows, setRows] = useState<Enquiry[]>([]);
  const [counts, setCounts] = useState<AdminCounts>(EMPTY_COUNTS);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<PipelineStatus>("open");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const cacheKey = useMemo(
    () =>
      listCacheKey({
        type: typeFilter,
        status: statusFilter,
        q: search,
      }),
    [typeFilter, statusFilter, search]
  );

  const loadEnquiries = useCallback(
    async (opts?: { signal?: AbortSignal; force?: boolean }) => {
      const signal = opts?.signal;
      const force = opts?.force ?? false;
      setFetchError("");

      const cached = getListCache(cacheKey);
      if (cached && !force) {
        // Session cache: serve cached list until Refresh (or full page reload).
        setRows(cached.enquiries);
        setCounts({ ...EMPTY_COUNTS, ...cached.counts });
        setAuthed(true);
        setLoading(false);
        return;
      } else if (!cached) {
        setLoading(true);
      }

      const params = new URLSearchParams();
      if (typeFilter !== "all") params.set("type", typeFilter);
      params.set("status", statusFilter);
      if (search.trim()) params.set("q", search.trim());

      try {
        const res = await fetch(`/api/admin/enquiries?${params.toString()}`, {
          signal,
          cache: "no-store",
        });
        if (signal?.aborted) return;
        if (res.status === 401) {
          clearAdminCache();
          setAuthed(false);
          setLoading(false);
          return;
        }
        const json = await res.json();
        if (!res.ok) {
          setFetchError(json.error || "Failed to load enquiries");
          setLoading(false);
          return;
        }
        const enquiries = (json.enquiries || []) as Enquiry[];
        const nextCounts = { ...EMPTY_COUNTS, ...(json.counts || {}) };
        setListCache(cacheKey, enquiries, nextCounts);
        setAuthed(true);
        setRows(enquiries);
        setCounts(nextCounts);
        setLoading(false);
      } catch (err) {
        if (signal?.aborted || (err instanceof DOMException && err.name === "AbortError")) return;
        if (!getListCache(cacheKey)) {
          setFetchError("Failed to load enquiries");
        }
        setLoading(false);
      }
    },
    [cacheKey, typeFilter, statusFilter, search]
  );

  useLayoutEffect(() => {
    const cached = getListCache(cacheKey);
    if (!cached) return;
    setRows(cached.enquiries);
    setCounts({ ...EMPTY_COUNTS, ...cached.counts });
    setAuthed(true);
    setLoading(false);
  }, [cacheKey]);

  useEffect(() => {
    const ac = new AbortController();
    void loadEnquiries({ signal: ac.signal });
    return () => ac.abort();
  }, [loadEnquiries]);

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 280);
    return () => clearTimeout(t);
  }, [searchInput]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const json = await res.json().catch(() => ({}));
    setLoggingIn(false);
    if (!res.ok) {
      setLoginError(json.error || "Login failed");
      return;
    }
    setPassword("");
    setAuthed(true);
    clearAdminCache();
    void loadEnquiries({ force: true });
  };

  const typeOptions = useMemo(
    () => [
      { value: "all", label: "All types" },
      ...Object.entries(TYPE_LABELS).map(([value, label]) => ({ value, label })),
    ],
    []
  );

  const activeTile = STATUS_TILES.find((t) => t.key === statusFilter);

  return (
    <>
      {authed === false ? (
        <div className="login-wrap">
          <form className="login-card" onSubmit={handleLogin}>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 700,
                color: "#64748b",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Staff access
            </p>
            <h1>Enquiries</h1>
            <p style={{ margin: "0 0 16px", color: "#64748b", fontSize: 14 }}>
              Enter your admin password to view leads.
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
            />
            {loginError && (
              <p className="error" style={{ marginTop: 10 }}>
                {loginError}
              </p>
            )}
            <button type="submit" className="btn btn-primary" disabled={loggingIn}>
              {loggingIn ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      ) : (
        <div className="admin-page">
          <div className="admin-inner">
            <header className="admin-header">
              <div>
                <p>Lead desk · Construction Card Assistance</p>
                <h1>Enquiries</h1>
              </div>
              <div className="admin-header-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => void loadEnquiries({ force: true })}
                >
                  <RefreshCw size={15} /> Refresh
                </button>
              </div>
            </header>

            <div className="tile-grid" role="tablist" aria-label="Lead status filters">
              {STATUS_TILES.map((tile) => {
                const active = statusFilter === tile.key;
                return (
                  <button
                    key={tile.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`tile ${active ? "is-active" : ""} ${tile.live ? "" : "is-soon"} ${tile.key === "sale" ? "tile-sale" : ""}`}
                    onClick={() => setStatusFilter(tile.key)}
                  >
                    <div className="tile-top">
                      <span className="tile-label">{tile.label}</span>
                      {!tile.live && <span className="tile-badge">Soon</span>}
                    </div>
                    <span className="tile-count">{counts[tile.key] ?? 0}</span>
                    <p className="tile-hint">{tile.hint}</p>
                  </button>
                );
              })}
            </div>

            <div className="toolbar">
              <div className="search-box">
                <Search size={16} />
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search name, email, phone..."
                />
              </div>
              <CustomSelect
                value={typeFilter}
                onChange={setTypeFilter}
                options={typeOptions}
                ariaLabel="Filter by type"
                minWidth={180}
              />
            </div>

            {fetchError && (
              <p className="error" style={{ marginBottom: 12 }}>
                {fetchError}
              </p>
            )}

            <div className="list-head">
              <h2>{activeTile?.label || "Leads"}</h2>
              <span>
                {loading && rows.length === 0
                  ? "Loading…"
                  : `${rows.length} lead${rows.length === 1 ? "" : "s"}`}
              </span>
            </div>

            <section className="panel">
              {loading && rows.length === 0 && <div className="empty">Loading…</div>}
              {!loading && rows.length === 0 && (
                <div className="empty">
                  {statusFilter === "sale" ||
                  statusFilter === "pending" ||
                  statusFilter === "disputed"
                    ? "No leads in this payment stage yet — backend coming soon."
                    : "No leads in this filter."}
                </div>
              )}
              {loading && rows.length > 0 && (
                <p
                  style={{
                    margin: 0,
                    padding: "12px 28px",
                    fontSize: 13,
                    color: "#64748b",
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  Updating…
                </p>
              )}
              {rows.map((row) => {
                const meta = statusMeta(row.status, row.enquiry_type);
                const isSale = normalizePipelineStatus(row.status, row.enquiry_type) === "sale";
                return (
                  <Link
                    key={row.id}
                    href={`/admin/enquiries/${row.id}`}
                    className={`row ${isSale ? "row-sale" : ""}`}
                  >
                    <div className="row-top">
                      <div>
                        <p className="row-name">{fullName(row)}</p>
                        <p className="row-line">
                          {row.email || "No email"} · {row.phone || "No phone"}
                        </p>
                        <p className="row-line" style={{ marginTop: 6 }}>
                          {TYPE_LABELS[row.enquiry_type] || row.enquiry_type}
                          {row.product ? ` — ${row.product}` : ""}
                          {" · "}
                          {formatWhen(row.created_at)}
                        </p>
                      </div>
                      <div className="row-meta">
                        <span className="pill" style={{ background: meta.bg, color: meta.color }}>
                          {meta.label}
                        </span>
                        <ChevronRight size={18} className="row-chevron" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </section>
          </div>
        </div>
      )}
    </>
  );
}

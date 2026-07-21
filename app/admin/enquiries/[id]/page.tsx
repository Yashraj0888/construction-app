"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Mail,
  Pencil,
  Phone,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import CustomSelect from "../../components/CustomSelect";
import NotesEditor, {
  htmlToPlain,
  isEditorEmpty,
} from "../../components/NotesEditor";
import {
  getDetailCache,
  setDetailCache,
  setNotesCache,
  invalidateListCaches,
  clearAdminCache,
  type StaffNote,
} from "../../cache";
import {
  Enquiry,
  TYPE_LABELS,
  STATUS_OPTIONS,
  buildReadableRows,
  fullName,
  formatWhen,
  statusMeta,
  normalizePipelineStatus,
} from "../../_shared";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  if (!value || value === "—") return null;
  return (
    <button
      type="button"
      className="copy-btn"
      title="Copy"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

export default function AdminEnquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : "";

  const leftColRef = useRef<HTMLElement | null>(null);
  const [notesPaneMaxH, setNotesPaneMaxH] = useState<number | undefined>();

  const [authed, setAuthed] = useState<boolean | null>(null);
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMore, setShowMore] = useState(false);

  const [notes, setNotes] = useState<StaffNote[]>([]);
  const [draftHtml, setDraftHtml] = useState("");
  const [composerKey, setComposerKey] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveOk, setSaveOk] = useState(false);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editHtml, setEditHtml] = useState("");
  const [editKey, setEditKey] = useState(0);
  const [noteBusyId, setNoteBusyId] = useState<string | null>(null);
  const [noteError, setNoteError] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const load = useCallback(
    async (opts?: { force?: boolean }) => {
      if (!id) return;
      const force = opts?.force ?? false;
      setError("");

      const cached = getDetailCache(id);
      if (cached && !force) {
        setEnquiry(cached.enquiry);
        setNotes(cached.notes ?? []);
        setAuthed(true);
        setLoading(false);
        // Keep session cache until Refresh / full reload once we have full detail.
        if (cached.enquiry.payload) return;
      } else if (!cached) {
        setLoading(true);
      }

      const [enqRes, notesRes] = await Promise.all([
        fetch(`/api/admin/enquiries/${id}`, { cache: "no-store" }),
        fetch(`/api/admin/enquiries/${id}/notes`, { cache: "no-store" }),
      ]);

      if (enqRes.status === 401 || notesRes.status === 401) {
        clearAdminCache();
        setAuthed(false);
        setLoading(false);
        router.replace("/admin");
        return;
      }

      const enqJson = await enqRes.json();
      if (!enqRes.ok) {
        setError(enqJson.error || "Failed to load enquiry");
        if (!cached) setEnquiry(null);
        setAuthed(true);
        setLoading(false);
        return;
      }

      const next = enqJson.enquiry as Enquiry;
      let nextNotes: StaffNote[] = cached?.notes ?? [];
      if (notesRes.ok) {
        const notesJson = await notesRes.json();
        nextNotes = (notesJson.notes || []) as StaffNote[];
      }

      setDetailCache(next, nextNotes);
      setAuthed(true);
      setEnquiry(next);
      setNotes(nextNotes);
      setLoading(false);
    },
    [id, router]
  );

  useEffect(() => {
    void load();
  }, [load]);

  // Cap notes pane height to the user-info column on desktop; overflow scrolls inside.
  useEffect(() => {
    const el = leftColRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const sync = () => {
      const desktop = window.matchMedia("(min-width: 960px)").matches;
      if (!desktop) {
        setNotesPaneMaxH(undefined);
        return;
      }
      const h = Math.round(el.getBoundingClientRect().height);
      if (h > 0) setNotesPaneMaxH(h);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [enquiry, showMore, loading]);

  const readable = useMemo(
    () => (enquiry ? buildReadableRows(enquiry) : null),
    [enquiry]
  );

  const statusOptions = useMemo(
    () =>
      STATUS_OPTIONS.map((s) => {
        const meta = statusMeta(s);
        return { value: s, label: meta.label, tone: { bg: meta.bg, color: meta.color } };
      }),
    []
  );

  const updateStatus = async (status: string) => {
    if (!enquiry) return;
    const res = await fetch("/api/admin/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: enquiry.id, status }),
    });
    if (!res.ok) return;
    const next = { ...enquiry, status };
    setEnquiry(next);
    setDetailCache(next, notes);
    invalidateListCaches();
  };

  const persistNotes = (nextNotes: StaffNote[]) => {
    setNotes(nextNotes);
    if (enquiry) setNotesCache(enquiry.id, nextNotes);
  };

  const handleSaveNote = async () => {
    if (!enquiry) return;
    if (isEditorEmpty(draftHtml)) {
      setSaveError("Write something before saving.");
      return;
    }
    setSaving(true);
    setSaveError("");
    setSaveOk(false);
    const res = await fetch(`/api/admin/enquiries/${enquiry.id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html: draftHtml }),
    });
    const json = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setSaveError(json.error || "Failed to save note");
      return;
    }
    const created = json.note as StaffNote;
    persistNotes([created, ...notes]);
    setDraftHtml("");
    setComposerKey((k) => k + 1);
    setSaveOk(true);
    setTimeout(() => setSaveOk(false), 1600);
  };

  const startEdit = (note: StaffNote) => {
    setNoteError("");
    setEditingId(note.id);
    setEditHtml(note.html);
    setEditKey((k) => k + 1);
    setExpandedIds((prev) => new Set(prev).add(note.id));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditHtml("");
    setNoteError("");
  };

  const handleUpdateNote = async (noteId: string) => {
    if (!enquiry) return;
    if (isEditorEmpty(editHtml)) {
      setNoteError("Note cannot be empty.");
      return;
    }
    setNoteBusyId(noteId);
    setNoteError("");
    const res = await fetch(`/api/admin/enquiries/${enquiry.id}/notes/${noteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html: editHtml }),
    });
    const json = await res.json().catch(() => ({}));
    setNoteBusyId(null);
    if (!res.ok) {
      setNoteError(json.error || "Failed to update note");
      return;
    }
    const updated = json.note as StaffNote;
    persistNotes(notes.map((n) => (n.id === noteId ? updated : n)));
    cancelEdit();
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!enquiry) return;
    setNoteBusyId(noteId);
    setNoteError("");
    const res = await fetch(`/api/admin/enquiries/${enquiry.id}/notes/${noteId}`, {
      method: "DELETE",
    });
    const json = await res.json().catch(() => ({}));
    setNoteBusyId(null);
    setDeleteConfirmId(null);
    if (!res.ok) {
      setNoteError(json.error || "Failed to delete note");
      return;
    }
    if (editingId === noteId) cancelEdit();
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.delete(noteId);
      return next;
    });
    persistNotes(notes.filter((n) => n.id !== noteId));
  };

  const toggleExpanded = (noteId: string) => {
    if (editingId === noteId) return;
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(noteId)) next.delete(noteId);
      else next.add(noteId);
      return next;
    });
  };

  if (authed === false) return null;

  const primaryRows = enquiry
    ? [
        { label: "Full name", value: fullName(enquiry) },
        { label: "Email", value: enquiry.email || "—" },
        { label: "Phone", value: enquiry.phone || "—" },
      ]
    : [];

  return (
    <div className="admin-page">
      <div className="admin-inner">
        <Link href="/admin" className="back-link">
          <ArrowLeft size={16} /> Back to enquiries
        </Link>

        {loading && !enquiry && <div className="panel empty">Loading details…</div>}
        {!loading && error && !enquiry && (
          <div className="panel empty">
            <p className="error">{error}</p>
            <Link href="/admin" className="btn" style={{ marginTop: 16 }}>
              Back to list
            </Link>
          </div>
        )}

        {enquiry && readable && (
          <div className="detail-split">
            {/* LEFT — contact + expandable details */}
            <section className="detail-col" ref={leftColRef}>
              <div className="detail-col-head">
                <div>
                  <h2>{fullName(enquiry)}</h2>
                  <p>
                    {TYPE_LABELS[enquiry.enquiry_type] || enquiry.enquiry_type}
                    {enquiry.product ? ` — ${enquiry.product}` : ""}
                  </p>
                </div>
                <CustomSelect
                  variant="pill"
                  value={normalizePipelineStatus(enquiry.status, enquiry.enquiry_type)}
                  onChange={(v) => void updateStatus(v)}
                  options={statusOptions}
                  ariaLabel="Update status"
                  minWidth={150}
                />
              </div>

              <div className="contact-primary">
                {primaryRows.map((item) => (
                  <div className="info-item" key={item.label}>
                    <div className="info-label">{item.label}</div>
                    <div className="info-value">{item.value}</div>
                    {(item.label === "Email" || item.label === "Phone") && (
                      <CopyButton value={item.value} />
                    )}
                  </div>
                ))}
              </div>

              <div className="detail-actions" style={{ marginBottom: 14 }}>
                {enquiry.email && (
                  <a className="btn btn-primary" href={`mailto:${enquiry.email}`}>
                    <Mail size={15} /> Email
                  </a>
                )}
                {enquiry.phone && (
                  <a className="btn" href={`tel:${enquiry.phone}`}>
                    <Phone size={15} /> Call
                  </a>
                )}
              </div>

              <button
                type="button"
                className="load-more-btn"
                onClick={() => setShowMore((v) => !v)}
              >
                {showMore ? (
                  <>
                    <ChevronUp size={15} style={{ display: "inline", verticalAlign: "-3px", marginRight: 6 }} />
                    Hide full details
                  </>
                ) : (
                  <>
                    <ChevronDown size={15} style={{ display: "inline", verticalAlign: "-3px", marginRight: 6 }} />
                    Load more details
                  </>
                )}
              </button>

              {showMore && (
                <>
                  <div className="section">
                    <h3>What they applied for</h3>
                    <div className="info-list">
                      {readable.booking.map((item) => (
                        <div className="info-item" key={`b-${item.label}`}>
                          <div className="info-label">{item.label}</div>
                          <div className="info-value">{item.value}</div>
                          <span />
                        </div>
                      ))}
                    </div>
                  </div>

                  {readable.extra.length > 0 && (
                    <div className="section" style={{ marginBottom: 0 }}>
                      <h3>More from their form</h3>
                      <div className="info-list">
                        {readable.extra.map((item) => (
                          <div className="info-item" key={`e-${item.label}-${item.value}`}>
                            <div className="info-label">{item.label}</div>
                            <div className="info-value">{item.value}</div>
                            <span />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </section>

            {/* RIGHT — call notes (list scrolls; composer always visible) */}
            <section className="detail-col detail-col--notes">
              <div className="detail-col-head">
                <div>
                  <h2>Call notes</h2>
                  <p>Saved against this lead — reopen anytime to continue.</p>
                </div>
              </div>

              <div
                className="notes-list-scroll"
                style={
                  notesPaneMaxH
                    ? { maxHeight: Math.max(140, notesPaneMaxH - 320) }
                    : undefined
                }
              >
                {notes.length === 0 ? (
                  <div className="notes-empty">No notes yet. Add the first one below.</div>
                ) : (
                  <div className="notes-list">
                    {notes.map((note) => {
                      const expanded = expandedIds.has(note.id);
                      const editing = editingId === note.id;
                      const busy = noteBusyId === note.id;
                      const preview = htmlToPlain(note.html);

                      return (
                        <article
                          key={note.id}
                          className={`note-card${expanded ? " is-expanded" : ""}${editing ? " is-editing" : ""}`}
                        >
                          <div className="note-card-meta">
                            <time dateTime={note.created_at}>
                              {formatWhen(note.created_at)}
                              {note.updated_at !== note.created_at ? " · edited" : ""}
                            </time>
                            <div className="note-card-actions">
                              {!editing && (
                                <>
                                  <button
                                    type="button"
                                    className="note-icon-btn"
                                    title="Edit note"
                                    disabled={busy}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      startEdit(note);
                                    }}
                                  >
                                    <Pencil size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    className="note-icon-btn note-icon-btn--danger"
                                    title="Delete note"
                                    disabled={busy}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setDeleteConfirmId(note.id);
                                    }}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                          {editing ? (
                            <div className="note-edit">
                              <NotesEditor
                                key={editKey}
                                value={editHtml}
                                onChange={setEditHtml}
                                placeholder="Update this note…"
                                compact
                              />
                              <div className="note-edit-actions">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  disabled={busy}
                                  onClick={() => void handleUpdateNote(note.id)}
                                >
                                  <Save size={14} />
                                  {busy ? "Saving…" : "Update"}
                                </button>
                                <button
                                  type="button"
                                  className="btn"
                                  disabled={busy}
                                  onClick={cancelEdit}
                                >
                                  <X size={14} /> Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="note-card-toggle"
                              onClick={() => toggleExpanded(note.id)}
                              aria-expanded={expanded}
                            >
                              {expanded ? (
                                <div
                                  className="note-card-body"
                                  dangerouslySetInnerHTML={{ __html: note.html }}
                                />
                              ) : (
                                <div className="note-card-preview" title={preview}>
                                  {preview || "(empty note)"}
                                </div>
                              )}
                              <span className="note-expand-hint">
                                {expanded ? "Click to collapse" : "Click to expand"}
                              </span>
                            </button>
                          )}
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>

              {noteError && (
                <p className="error" style={{ marginTop: 8, marginBottom: 0 }}>
                  {noteError}
                </p>
              )}

              <div className="note-composer">
                <p className="note-composer-label">
                  {notes.length === 0 ? "New note" : "Add another note"}
                </p>
                <NotesEditor
                  key={composerKey}
                  value={draftHtml}
                  onChange={setDraftHtml}
                  placeholder="What did you discuss? Next steps, payment, call-back time…"
                />
                {saveError && (
                  <p className="error" style={{ marginTop: 10 }}>
                    {saveError}
                  </p>
                )}
                <div className="note-composer-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={saving}
                    onClick={() => void handleSaveNote()}
                  >
                    <Save size={15} />
                    {saving ? "Saving…" : "Save note"}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    disabled={saving || isEditorEmpty(draftHtml)}
                    onClick={() => {
                      setDraftHtml("");
                      setComposerKey((k) => k + 1);
                      setSaveError("");
                    }}
                  >
                    <Plus size={15} /> Clear draft
                  </button>
                  {saveOk && (
                    <span
                      style={{
                        alignSelf: "center",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#2f6b42",
                      }}
                    >
                      Saved
                    </span>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {deleteConfirmId && (
          <div
            className="admin-modal-backdrop"
            role="presentation"
            onClick={() => {
              if (!noteBusyId) setDeleteConfirmId(null);
            }}
          >
            <div
              className="admin-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-note-title"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="delete-note-title">Delete this note?</h3>
              <p>This permanently removes the note from this lead. You can&apos;t undo it.</p>
              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="btn"
                  disabled={!!noteBusyId}
                  onClick={() => setDeleteConfirmId(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  disabled={!!noteBusyId}
                  onClick={() => void handleDeleteNote(deleteConfirmId)}
                >
                  <Trash2 size={15} />
                  {noteBusyId === deleteConfirmId ? "Deleting…" : "Delete note"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

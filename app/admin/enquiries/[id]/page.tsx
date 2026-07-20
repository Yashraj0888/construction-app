"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Check, Copy, LogOut, Mail, Phone } from "lucide-react";
import CustomSelect from "../../components/CustomSelect";
import { ADMIN_CSS } from "../../admin.css";
import {
  Enquiry,
  TYPE_LABELS,
  STATUS_OPTIONS,
  buildReadableRows,
  fullName,
  statusMeta,
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

  const [authed, setAuthed] = useState<boolean | null>(null);
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    const res = await fetch(`/api/admin/enquiries/${id}`);
    if (res.status === 401) {
      setAuthed(false);
      setLoading(false);
      router.replace("/admin");
      return;
    }
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Failed to load enquiry");
      setEnquiry(null);
      setAuthed(true);
      setLoading(false);
      return;
    }
    setAuthed(true);
    setEnquiry(json.enquiry as Enquiry);
    setLoading(false);
  }, [id, router]);

  useEffect(() => {
    void load();
  }, [load]);

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
    setEnquiry((prev) => (prev ? { ...prev, status } : prev));
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/admin");
  };

  if (authed === false) return null;

  return (
    <>
      <style>{ADMIN_CSS}</style>
      <div className="admin-page">
        <div className="admin-inner">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <Link href="/admin" className="back-link">
              <ArrowLeft size={16} /> Back to enquiries
            </Link>
            <button type="button" className="btn" onClick={() => void handleLogout()}>
              <LogOut size={15} /> Log out
            </button>
          </div>

          {loading && <div className="panel empty">Loading details…</div>}
          {!loading && error && (
            <div className="panel empty">
              <p className="error">{error}</p>
              <Link href="/admin" className="btn" style={{ marginTop: 16 }}>
                Back to list
              </Link>
            </div>
          )}

          {!loading && enquiry && readable && (
            <section className="panel">
              <div className="detail">
                <div className="detail-head">
                  <div>
                    <p
                      style={{
                        margin: "0 0 6px",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#64748b",
                      }}
                    >
                      Enquiry detail
                    </p>
                    <h1>{fullName(enquiry)}</h1>
                    <p>
                      {TYPE_LABELS[enquiry.enquiry_type] || enquiry.enquiry_type}
                      {enquiry.product ? ` — ${enquiry.product}` : ""}
                    </p>
                  </div>
                  <CustomSelect
                    variant="pill"
                    value={enquiry.status}
                    onChange={(v) => void updateStatus(v)}
                    options={statusOptions}
                    ariaLabel="Update status"
                    minWidth={150}
                  />
                </div>

                {(enquiry.email || enquiry.phone) && (
                  <div className="quick-contact">
                    {enquiry.phone && (
                      <a className="quick-link" href={`tel:${enquiry.phone}`}>
                        <Phone size={16} />
                        <span>
                          <small>Phone</small>
                          <strong>{enquiry.phone}</strong>
                        </span>
                      </a>
                    )}
                    {enquiry.email && (
                      <a className="quick-link" href={`mailto:${enquiry.email}`}>
                        <Mail size={16} />
                        <span>
                          <small>Email</small>
                          <strong>{enquiry.email}</strong>
                        </span>
                      </a>
                    )}
                  </div>
                )}

                <div className="section">
                  <h3>Contact details</h3>
                  <div className="info-list">
                    {readable.contact.map((item) => (
                      <div className="info-item" key={`c-${item.label}`}>
                        <div className="info-label">{item.label}</div>
                        <div className="info-value">{item.value}</div>
                        {(item.label === "Email" || item.label === "Phone") && (
                          <CopyButton value={item.value} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

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
                  <div className="section">
                    <h3>More details from their form</h3>
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

                <div className="detail-actions">
                  {enquiry.email && (
                    <a className="btn btn-primary" href={`mailto:${enquiry.email}`}>
                      <Mail size={15} /> Email them
                    </a>
                  )}
                  {enquiry.phone && (
                    <a className="btn" href={`tel:${enquiry.phone}`}>
                      <Phone size={15} /> Call them
                    </a>
                  )}
                  <Link href="/admin" className="btn">
                    Back to list
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

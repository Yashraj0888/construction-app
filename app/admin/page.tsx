"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, RefreshCw, LogOut, ChevronRight } from "lucide-react";
import CustomSelect from "./components/CustomSelect";
import { ADMIN_CSS } from "./admin.css";
import {
  Enquiry,
  TYPE_LABELS,
  STATUS_OPTIONS,
  fullName,
  statusMeta,
} from "./_shared";

export default function AdminDashboardPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const loadEnquiries = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setFetchError("");
    const params = new URLSearchParams();
    if (typeFilter !== "all") params.set("type", typeFilter);
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (search.trim()) params.set("q", search.trim());

    try {
      const res = await fetch(`/api/admin/enquiries?${params.toString()}`, { signal });
      if (signal?.aborted) return;
      if (res.status === 401) {
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
      setAuthed(true);
      setRows((json.enquiries || []) as Enquiry[]);
      setLoading(false);
    } catch (err) {
      if (signal?.aborted || (err instanceof DOMException && err.name === "AbortError")) return;
      setFetchError("Failed to load enquiries");
      setLoading(false);
    }
  }, [typeFilter, statusFilter, search]);

  useEffect(() => {
    const ac = new AbortController();
    void loadEnquiries(ac.signal);
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
    void loadEnquiries();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    setRows([]);
  };

  const counts = useMemo(() => {
    const byStatus: Record<string, number> = {};
    for (const row of rows) byStatus[row.status] = (byStatus[row.status] || 0) + 1;
    return {
      total: rows.length,
      new: byStatus.new || 0,
      in_progress: byStatus.in_progress || 0,
      contacted: byStatus.contacted || 0,
    };
  }, [rows]);

  const typeOptions = useMemo(
    () => [
      { value: "all", label: "All types" },
      ...Object.entries(TYPE_LABELS).map(([value, label]) => ({ value, label })),
    ],
    []
  );

  const statusFilterOptions = useMemo(
    () => [
      { value: "all", label: "All statuses" },
      ...STATUS_OPTIONS.map((s) => {
        const meta = statusMeta(s);
        return { value: s, label: meta.label, tone: { bg: meta.bg, color: meta.color } };
      }),
    ],
    []
  );

  return (
    <>
      <style>{ADMIN_CSS}</style>

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
                <p>Construction Card Assistance</p>
                <h1>Enquiries</h1>
              </div>
              <div className="admin-header-actions">
                <button type="button" className="btn" onClick={() => void loadEnquiries()}>
                  <RefreshCw size={15} /> Refresh
                </button>
                <button type="button" className="btn" onClick={() => void handleLogout()}>
                  <LogOut size={15} /> Log out
                </button>
              </div>
            </header>

            <div className="stats">
              <div className="stat">
                <span>Showing</span>
                <strong>{counts.total}</strong>
              </div>
              <div className="stat">
                <span>New</span>
                <strong>{counts.new}</strong>
              </div>
              <div className="stat">
                <span>In progress</span>
                <strong>{counts.in_progress}</strong>
              </div>
              <div className="stat">
                <span>Contacted</span>
                <strong>{counts.contacted}</strong>
              </div>
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
              <CustomSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusFilterOptions}
                ariaLabel="Filter by status"
                minWidth={170}
              />
            </div>

            {fetchError && (
              <p className="error" style={{ marginBottom: 12 }}>
                {fetchError}
              </p>
            )}

            <section className="panel">
              {loading && rows.length === 0 && <div className="empty">Loading…</div>}
              {!loading && rows.length === 0 && <div className="empty">No enquiries found.</div>}
              {loading && rows.length > 0 && (
                <p style={{ margin: 0, padding: "12px 28px", fontSize: 13, color: "#64748b", borderBottom: "1px solid #f1f5f9" }}>
                  Updating…
                </p>
              )}
              {rows.map((row) => {
                const meta = statusMeta(row.status);
                return (
                  <Link
                    key={row.id}
                    href={`/admin/enquiries/${row.id}`}
                    className="row"
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

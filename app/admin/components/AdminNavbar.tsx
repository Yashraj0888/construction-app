"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { clearAdminCache } from "../cache";

export default function AdminNavbar() {
  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    clearAdminCache();
    window.location.href = "/admin";
  };

  return (
    <header className="admin-nav">
      <div className="admin-nav-inner">
        <Link href="/admin" className="admin-brand" aria-label="Construction Card Assistance — Admin">
          <svg viewBox="0 0 100 100" className="admin-brand-mark" fill="currentColor" aria-hidden>
            <path
              d="M45,85 C25,75 20,45 35,25 C30,35 30,55 42,70"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path d="M28,32 C26,38 29,43 33,41" />
            <path d="M25,44 C23,50 26,55 30,53" />
            <path d="M25,56 C23,62 27,67 31,64" />
            <path d="M29,68 C28,74 32,78 36,75" />
            <path
              d="M55,85 C75,75 80,45 65,25 C70,35 70,55 58,70"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path d="M72,32 C74,38 71,43 67,41" />
            <path d="M75,44 C77,50 74,55 70,53" />
            <path d="M75,56 C77,62 73,67 69,64" />
            <path d="M71,68 C72,74 68,78 64,75" />
            <text x="50" y="58" fontSize="20" fontWeight="700" textAnchor="middle" fill="#c45c26">
              CCA
            </text>
          </svg>
          <span className="admin-brand-name">Construction Card Assistance</span>
        </Link>

        <button type="button" className="admin-nav-logout" onClick={() => void handleLogout()}>
          <LogOut size={15} />
          Log out
        </button>
      </div>
    </header>
  );
}

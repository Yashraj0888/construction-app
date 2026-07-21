import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import AdminNavbar from "./components/AdminNavbar";
import { ADMIN_CSS } from "./admin.css";

const adminSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--admin-font",
  display: "swap",
});

const adminMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--admin-mono",
  display: "swap",
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`admin-shell ${adminSans.variable} ${adminMono.variable}`}>
      <style>{ADMIN_CSS}</style>
      <AdminNavbar />
      {children}
    </div>
  );
}

"use client";

import { useState } from "react";
import { HardHat, Menu, X, ChevronRight, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "CITB Test", href: "/book-citb-test" },
  {
    label: "CSCS Cards",
    href: "#",
    dropdown: [
      { label: "Green Labourer", href: "/cscs-green-card" },
      { label: "Blue Skilled", href: "/cscs-blue-card" },
      { label: "Red Provisional", href: "/cscs-red-card" },
      { label: "Gold Advanced Craft", href: "/cscs-gold-card" },
      { label: "Gold Supervisor", href: "/cscs-gold-card" },
      { label: "Black Manager", href: "/cscs-black-card" },
      { label: "All CSCS Cards", href: "/cscs-cards" },
    ],
  },
  { label: "Construction Courses", href: "#" },
  { label: "Group Booking", href: "#" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 w-full" role="navigation" aria-label="Main navigation">
      {/* Native CSS styling to guarantee hover states and transitions bypass compiler cache */}
      <style>{`
        .nav-item-mobile {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          padding-bottom: 16px;
          padding-left: 24px;
          padding-right: 24px;
          font-size: 16px;
          font-weight: 600;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }
        .chevron-icon {
          color: #94a3b8;
        }
        .hamburger-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          color: #334155;
          border: none;
          background: transparent;
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .hamburger-btn:hover {
          color: #0f172a;
          background-color: #f1f5f9;
          transform: scale(1.1);
        }
        .hamburger-btn:active {
          transform: scale(0.95);
        }
        .nav-dropdown-item {
          display: block;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 500;
          color: #334155;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .nav-dropdown-item:hover {
          color: #0f172a;
          background-color: #f8fafc;
          transform: translateY(-1px);
        }
        @media (min-width: 768px) {
          .hamburger-btn { display: none !important; }
          .mobile-drawer { display: none !important; }
        }
      `}</style>

      <div style={{ width: "100%", paddingLeft: "32px", paddingRight: "32px" }}>
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0" style={{ textDecoration: "none" }} aria-label="Construction Card Assistance - Home">
            <svg viewBox="0 0 100 100" className="w-12 h-12 text-[#0f172a]" fill="currentColor">
              {/* Left Laurel Branch */}
              <path d="M45,85 C25,75 20,45 35,25 C30,35 30,55 42,70" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M28,32 C26,38 29,43 33,41" />
              <path d="M25,44 C23,50 26,55 30,53" />
              <path d="M25,56 C23,62 27,67 31,64" />
              <path d="M29,68 C28,74 32,78 36,75" />
              
              {/* Right Laurel Branch */}
              <path d="M55,85 C75,75 80,45 65,25 C70,35 70,55 58,70" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M72,32 C74,38 71,43 67,41" />
              <path d="M75,44 C77,50 74,55 70,53" />
              <path d="M75,56 C77,62 73,67 69,64" />
              <path d="M71,68 C72,74 68,78 64,75" />
              
              {/* Center Initials */}
              <text x="50" y="58" fontSize="20" fontWeight="900" textAnchor="middle" fill="#2563eb">CCA</text>
            </svg>
            <span className="text-[#0F172A] font-bold text-sm sm:text-base leading-tight">Construction Card Assistance</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-[#334155] hover:text-[#0F172A] hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
                    style={{ textDecoration: "none" }}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === link.label}
                  >
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                  </button>
                  {activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 animate-fade-in" style={{ paddingTop: "6px", paddingBottom: "6px" }}>
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="nav-dropdown-item"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-semibold text-[#334155] hover:text-[#0F172A] hover:bg-slate-50 rounded-md transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hamburger-btn md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)"
            }}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu Drawer (Always in DOM for transitions) */}
      <div 
        className="mobile-drawer md:hidden overflow-hidden bg-white border-t border-slate-100"
        style={{
          maxHeight: mobileOpen ? "1000px" : "0px",
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? "translateY(0)" : "translateY(-10px)",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out, transform 0.3s ease-out"
        }}
      >
        <div style={{ paddingTop: "8px", paddingBottom: "24px" }}>
            {navLinks.map((link) => (
              link.dropdown ? (
                <div key={link.label}>
                  <button
                    onClick={() => setMobileDropdown(mobileDropdown === link.label ? null : link.label)}
                    className="nav-item-mobile w-full bg-transparent border-none cursor-pointer text-left flex items-center justify-between"
                    style={{ fontFamily: "inherit" }}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={16} className="chevron-icon" style={{ transform: mobileDropdown === link.label ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
                  </button>
                  <div style={{
                    maxHeight: mobileDropdown === link.label ? "500px" : "0px",
                    opacity: mobileDropdown === link.label ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease, opacity 0.25s ease",
                  }}>
                    {link.dropdown.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block text-sm text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 transition-colors"
                        style={{ textDecoration: "none", padding: "12px 24px 12px 40px" }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-item-mobile"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} className="chevron-icon" />
                </a>
              )
            ))}
          </div>
      </div>
    </nav>
  );
}

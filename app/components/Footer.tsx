"use client";

import { Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f8fafc] text-slate-600 border-t border-slate-200" style={{ paddingTop: "64px", paddingBottom: "32px" }}>
      <style>{`
        .footer-grid {
          max-width: 1024px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 992px) {
          .footer-grid {
            grid-template-columns: 1.1fr 0.9fr 1.1fr 1.1fr;
          }
        }
        
        .footer-col-title {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .footer-link {
          color: #475569;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        
        .footer-link:hover {
          color: #2563eb;
          transform: translateX(3px);
        }
        
        /* Secure Payments Widget */
        .payments-widget {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }
        
        .payments-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #0f172a;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .stripe-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #635bff;
          color: #ffffff;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 800;
          font-size: 11px;
          margin-bottom: 12px;
          letter-spacing: 0.02em;
        }
        
        .payment-cards {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .card-icon {
          width: 38px;
          height: 24px;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 8px;
          color: #0f172a;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
        }
        
        /* Laurel Wreath Brand Logo widget */
        .brand-logo-widget {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .brand-header-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .wreath-icon {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          color: #0f172a;
        }
        
        .brand-logo-text {
          color: #0f172a;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.3;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        
        .disclaimer-box {
          font-size: 12px;
          line-height: 1.5;
          color: #64748b;
          border-left: 2px solid #cbd5e1;
          padding-left: 12px;
        }
        
        .copyright-bar {
          max-width: 1024px;
          margin: 48px auto 0 auto;
          padding: 24px 24px 0 24px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: #64748b;
        }
        @media (min-width: 640px) {
          .copyright-bar {
            flex-direction: row;
          }
        }
      `}</style>
      
      <div className="footer-grid">
        {/* Column 1: Contacts & Legal */}
        <div>
          <h3 className="footer-col-title">Support</h3>
          <div className="footer-links">
            <a href="mailto:support@constructioncardassistance.co.uk" className="footer-link">
              <Mail size={16} className="text-[#2563eb]" />
              <span>support@constructioncardassistance.co.uk</span>
            </a>
            <a href="/terms-and-conditions" className="footer-link">Terms and Conditions</a>
            <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="footer-col-title">Quick Links</h3>
          <div className="footer-links">
            <a href="/about-cscs-card" className="footer-link">Know Your Card</a>
            <a href="/cscs-cards" className="footer-link">CSCS Card Types</a>
            <a href="/trade-wise-test" className="footer-link">Trade Wise Test</a>
            <a href="/find-test-centre" className="footer-link">Test Centers</a>
          </div>
        </div>

        {/* Column 3: Secure Payments */}
        <div>
          <div className="payments-widget">
            <div className="payments-header">
              <ShieldCheck size={18} className="text-[#10b981]" />
              <span>Secure Payments</span>
            </div>
            <div>
              <span className="stripe-badge">powered by stripe</span>
            </div>
            <div className="payment-cards">
              <div className="card-icon" style={{ background: "#1a1f71", color: "#ffffff" }}>VISA</div>
              <div className="card-icon" style={{ background: "#eb001b", color: "#ffffff" }}>MC</div>
              <div className="card-icon" style={{ background: "#ff6000", color: "#ffffff" }}>DISC</div>
              <div className="card-icon" style={{ background: "#0185cc", color: "#ffffff" }}>AMEX</div>
            </div>
          </div>
        </div>

        {/* Column 4: Brand & Disclaimer */}
        <div className="brand-logo-widget">
          <div className="brand-header-group">
            <svg viewBox="0 0 100 100" className="wreath-icon" fill="currentColor">
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
            <div className="brand-logo-text">
              Construction<br />Card Assistance
            </div>
          </div>
          <div className="disclaimer-box">
            Construction Card Assistance explicitly states that we are not part of, or associated with CSCS or CITB.
          </div>
        </div>
      </div>

      <div className="copyright-bar">
        <div>© 2026 Construction Card Assistance. All rights reserved.</div>
        <div style={{ display: "flex", gap: "16px" }}>
          <span style={{ color: "#475569" }}>•</span>
          <span>Independent Booking Agency</span>
        </div>
      </div>
    </footer>
  );
}

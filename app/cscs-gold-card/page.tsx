"use client";

import CardDetailPage from "../components/CardDetailPage";
import { ShieldAlert, CheckCircle, Info, ClipboardCheck } from "lucide-react";

export default function CscsGoldCardPage() {
  return (
    <CardDetailPage
      cardType="gold"
      title="CSCS Gold Card"
      subhead="ADVANCED CRAFT"
      bgHex="#b45309"
      cardName="Gold Advanced Craft Card"
      easyApplyTitle="Gold Advanced Card"
      easyApplySub="Easy apply for CSCS Gold Card."
      requirements={[]}
      extraContent={
        <div className="max-w-none text-slate-700">
          <style>{`
            .gold-section {
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 44px;
              margin-bottom: 44px;
            }
            .gold-section:last-of-type {
              border-bottom: none;
              padding-bottom: 0;
              margin-bottom: 0;
            }
            .gold-section-title {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-size: 24px;
              font-weight: 850;
              color: #0f172a;
              margin-bottom: 24px;
              letter-spacing: -0.02em;
              line-height: 1.25;
            }
            
            .info-bullet-list {
              list-style-type: none;
              padding-left: 0;
              margin-bottom: 0;
            }
            .info-bullet-list li {
              position: relative;
              padding-left: 22px;
              margin-bottom: 12px;
              font-size: 14.5px;
              line-height: 1.55;
            }
            .info-bullet-list li:last-child {
              margin-bottom: 0;
            }
            .info-bullet-list li::before {
              content: "•";
              position: absolute;
              left: 6px;
              color: #d97706;
              font-weight: 900;
            }
            
            .gold-highlight-link {
              color: #d97706;
              font-weight: 700;
              text-decoration: underline;
              transition: all 0.2s ease;
            }
            .gold-highlight-link:hover {
              color: #b45309;
            }
            .validity-card-box {
              border-radius: 12px;
              padding: 28px !important;
              border: 1px solid #fde68a !important;
              background: #fef3c7 !important;
              margin-bottom: 32px;
            }
            .booking-panel {
              background: #fef3c7 !important;
              border: 1px solid #fde68a !important;
              border-radius: 12px;
              padding: 28px !important;
              margin-top: 36px;
            }
          `}</style>

          {/* Section 1: Validity & Eligibility */}
          <div className="gold-section">
            <h3 className="gold-section-title">
              Validity & Suitability Criteria
            </h3>
            
            <div className="validity-card-box">
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">CSCS Gold Card</h4>
              <p className="text-2xl font-black text-amber-800" style={{ marginBottom: "8px" }}>5 Years Validity</p>
              <p className="text-xs text-slate-655 mt-1">Available to advanced craft construction workers with recognized qualifications.</p>
            </div>

            <p className="text-[14.5px] leading-relaxed text-slate-600 mb-4" style={{ marginBottom: "20px" }}>
              This card is available if you have either:
            </p>
            
            <ul className="info-bullet-list">
              <li>Achieved a Construction Related NVQ or SVQ level 3</li>
              <li>Completed an approved indentured apprenticeship (e.g. with NJCBI, BATJIC etc.)</li>
              <li>Completed an employer sponsored apprenticeship which included the achievement of a City and Guilds of London Institute Advanced Craft Certificate.</li>
            </ul>
          </div>

          {/* Section 2: CITB Test Requirements */}
          <div className="gold-section">
            <h3 className="gold-section-title">
              Test Requirements & Fees
            </h3>
            
            <div className="booking-panel text-[14.5px] text-slate-600 space-y-6">
              <p>
                <strong>CITB Health, Safety & Environment Test:</strong><br />
                Applicants must also have passed the appropriate level{" "}
                <a href="/book-citb-test" className="gold-highlight-link">
                  CITB health, safety and environment test
                </a>{" "}
                within the last 2 years. This must be taken at the relevant level for the occupation being applied for. To find out which level of test is required please use our Test Finder.
              </p>
              <p>
                <strong>CSCS Booking Fee:</strong><br />
                The CSCS Card booking is £65 which includes the £36 CSCS fee, booking fee and VAT.
              </p>
              <p>
                <strong>Submit Application:</strong><br />
                You can conveniently apply for a CSCS Card via our{" "}
                <a href="/apply-cscs?cardType=Gold%20Advanced%20Craft%20Card" className="gold-highlight-link">
                  online application service
                </a>.
              </p>
              <p className="text-sm font-bold text-slate-700" style={{ marginTop: "20px" }}>
                Still not sure which CITB test to take?{" "}
                <a href="/#contact" className="gold-highlight-link">
                  Contact Support
                </a>.
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}

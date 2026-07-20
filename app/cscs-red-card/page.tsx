"use client";

import CardDetailPage from "../components/CardDetailPage";
import { ShieldAlert, CheckCircle, Info, ClipboardCheck } from "lucide-react";

export default function CscsRedCardPage() {
  return (
    <CardDetailPage
      cardType="red"
      title="CSCS Red Card"
      subhead="PROVISIONAL"
      bgHex="#b91c1c"
      cardName="Provisional Temporary Card"
      easyApplyTitle="Provisional / Trainee Card"
      easyApplySub="Easy apply for CSCS Red Card."
      requirements={[]}
      extraContent={
        <div className="max-w-none text-slate-700">
          <style>{`
            .red-section {
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 44px;
              margin-bottom: 44px;
            }
            .red-section:last-of-type {
              border-bottom: none;
              padding-bottom: 0;
              margin-bottom: 0;
            }
            .red-section-title {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-size: 24px;
              font-weight: 850;
              color: #0f172a;
              margin-bottom: 24px;
              letter-spacing: -0.02em;
              line-height: 1.25;
            }
            .red-section-subtitle {
              font-size: 15px;
              color: #475569;
              line-height: 1.6;
              margin-top: -8px;
              margin-bottom: 28px;
            }
            
            .info-card-box {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              padding: 28px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.02);
            }
            
            .info-card-heading {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-size: 18px;
              font-weight: 800;
              color: #0f172a;
              margin-bottom: 16px;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            
            .red-alert {
              background: #fef2f2;
              border: 1px solid #fee2e2;
              border-radius: 12px;
              padding: 18px 22px;
              color: #b91c1c;
              font-size: 14.5px;
              line-height: 1.6;
              display: flex;
              gap: 12px;
              align-items: flex-start;
              margin-top: 24px;
            }
            
            .red-highlight-link {
              color: #b91c1c;
              font-weight: 700;
              text-decoration: underline;
              transition: all 0.2s ease;
            }
            .red-highlight-link:hover {
              color: #991b1b;
            }
            .validity-card-box {
              border-radius: 12px;
              padding: 28px !important;
              border: 1px solid #fee2e2 !important;
              background: #fef2f2 !important;
              margin-bottom: 32px;
            }
            .booking-panel {
              background: #fef2f2 !important;
              border: 1px solid #fee2e2 !important;
              border-radius: 12px;
              padding: 28px !important;
              margin-top: 36px;
            }
          `}</style>

          {/* Section 1: Validity & Eligibility */}
          <div className="red-section">
            <h3 className="red-section-title">
              Validity & Suitability Criteria
            </h3>
            
            <div className="validity-card-box">
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">CSCS Provisional Card</h4>
              <p className="text-2xl font-black text-red-700" style={{ marginBottom: "8px" }}>6 Months Validity</p>
              <p className="text-xs text-slate-500 mt-1">This temporary card is strictly non-renewable.</p>
            </div>

            <p className="text-[14.5px] leading-relaxed text-slate-600 mb-4" style={{ marginBottom: "1px", marginTop: "16px" }}>
              This card is for people who are working through probationary periods while employers assess their suitability for employment. You can only apply for a provisional card if you have not held a CSCS card before and this card can only be applied for once.
            </p>
          </div>

          {/* Section 2: Qualifications & Exams */}
          <div className="red-section">
            <h3 className="red-section-title">
              No Qualifications Required
            </h3>
            
            <div className="info-card-box">
              <h4 className="info-card-heading">
                <ShieldAlert className="text-red-600" size={20} />
                <span>Exam Criteria</span>
              </h4>
              <p className="text-[14.5px] text-slate-600 leading-relaxed mb-4">
                No construction-related qualification is required for this card. However, applicants must have passed the{" "}
                <a href="/book-citb-test" className="red-highlight-link">
                  CITB health, safety and environment test
                </a>{" "}
                within the past two years.
              </p>
            </div>
          </div>

          {/* Section 3: Progression & Next Steps */}
          <div className="red-section">
            <h3 className="red-section-title">
              Card Expiry & Progression Steps
            </h3>
            
            <div className="booking-panel text-[14.5px] text-slate-600 space-y-6">
              <p>
                <strong>Provisional Card Expiry:</strong><br />
                This card lasts for six months and is not renewable. Before it expires, card holders must achieve or be registered for a recognised construction related qualification and apply for the appropriate CSCS card for their job.
              </p>
              <p>
                <strong>CSCS Booking Fee:</strong><br />
                The CSCS Card booking is £65 which includes the £36 CSCS fee, booking fee and VAT.
              </p>
              <p>
                <strong>Submit Application:</strong><br />
                You can conveniently apply for a CSCS Card via our{" "}
                <a href="/apply-cscs?cardType=Provisional%20Temporary%20Card" className="red-highlight-link">
                  online application service
                </a>.
              </p>
              <p className="text-sm font-bold text-slate-700" style={{ marginTop: "20px" }}>
                Still not sure which test to take?{" "}
                <a href="/#contact" className="red-highlight-link">
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

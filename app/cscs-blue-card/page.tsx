"use client";

import CardDetailPage from "../components/CardDetailPage";
import { ShieldAlert, CheckCircle, Info, ClipboardCheck } from "lucide-react";

export default function CscsBlueCardPage() {
  return (
    <CardDetailPage
      cardType="blue"
      title="CSCS Blue Card"
      subhead="SKILLED WORKER"
      bgHex="#1d4ed8"
      cardName="Blue Skilled Worker Card"
      easyApplyTitle="Blue Skilled Worker Card"
      easyApplySub="Easy apply for CSCS Blue Card - Skilled Worker."
      requirements={[
        { title: "CITB Test (Operatives)", link: "#citb" },
        { title: "NVQ Level 2 Qualification", link: "#nvq2" },
      ]}
      extraContent={
        <div className="max-w-none text-slate-700">
          <style>{`
            .blue-section {
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 44px;
              margin-bottom: 44px;
            }
            .blue-section:last-of-type {
              border-bottom: none;
              padding-bottom: 0;
              margin-bottom: 0;
            }
            .blue-section-title {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-size: 24px;
              font-weight: 850;
              color: #0f172a;
              margin-bottom: 24px;
              letter-spacing: -0.02em;
              line-height: 1.25;
            }
            .blue-section-subtitle {
              font-size: 15px;
              color: #475569;
              line-height: 1.6;
              margin-top: -8px;
              margin-bottom: 28px;
            }
            
            .info-card-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 28px;
              margin-bottom: 28px;
            }
            @media (min-width: 768px) {
              .info-card-grid {
                grid-template-columns: 1fr 1fr;
              }
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
              color: #2563eb;
              font-weight: 900;
            }
            
            .blue-alert {
              background: #eff6ff;
              border: 1px solid #bfdbfe;
              border-radius: 12px;
              padding: 18px 22px;
              color: #1e4ed8;
              font-size: 14.5px;
              line-height: 1.6;
              display: flex;
              gap: 12px;
              align-items: flex-start;
              margin-top: 24px;
            }
            .validity-card-box {
              border-radius: 12px;
              padding: 28px !important;
              border: 1px solid #bfdbfe !important;
              background: #eff6ff !important;
              margin-bottom: 32px;
            }
            .booking-panel {
              background: #eff6ff !important;
              border: 1px solid #bfdbfe !important;
              border-radius: 12px;
              padding: 28px !important;
              margin-top: 36px;
            }
          `}</style>

          {/* Section 1: Validity & Eligibility */}
          <div className="blue-section">
            <h3 className="blue-section-title">
              Validity & Application Criteria
            </h3>
            
            <div className="validity-card-box">
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">CSCS Blue Card</h4>
              <p className="text-2xl font-black text-blue-700" style={{ marginBottom: "8px" }}>5 Years Validity</p>
              <p className="text-xs text-slate-500 mt-1 ">Available to workers who hold the required construction-related qualifications.</p>
            </div>

            <p className="text-[14.5px] leading-relaxed text-slate-600" style={{marginTop:"20px", marginBottom:"20px"}} >
              You can apply for this card if you have achieved either:
            </p>
            <ul className="info-bullet-list">
              <li>Achieved a construction related NVQ or SVQ level 2, or</li>
              <li>Completed an apprenticeship, such as an Employer sponsored apprenticeship, a City and Guilds of London Institute Craft Certificate or a CSCS Approved Trailblazer.</li>
            </ul>
          </div>

          {/* Section 2: Experienced Workers Alternative */}
          <div className="blue-section">
            <h3 className="blue-section-title">
              Experienced Worker Options
            </h3>
            <p className="blue-section-subtitle">
              Options if you do not hold the required Level 2 qualifications but have work history.
            </p>

            <div className="info-card-box">
              <h4 className="info-card-heading">
                <ShieldAlert className="text-blue-600" size={20} />
                <span>Registering for Qualifications</span>
              </h4>
              <p className="text-[14.5px] text-slate-600 leading-relaxed mb-4" style={{ marginBottom: "16px" }}>
                If you do not have these qualifications, but you are experienced in your job, you can register for a qualification applicable to your occupation. You can then apply for an <strong>Experienced Worker Card (Red)</strong>.
              </p>
              <p className="text-[14.5px] text-slate-600 leading-relaxed">
                For more information about registering (enrollment) for a qualification, please visit{" "}
                <a href="#nvq2" className="text-blue-600 font-bold hover:underline">
                  NVQ Level 2
                </a>.
              </p>
            </div>
          </div>

          {/* Section 3: Test Requirements & Booking */}
          <div className="blue-section">
            <h3 className="blue-section-title">
              Test Requirements & Fees
            </h3>
            
            <div className="booking-panel text-[14.5px] text-slate-600 space-y-6">
              <p>
                <strong>CITB Health, Safety & Environment Test:</strong><br />
                All applicants must have passed the <a href="#citb" className="text-blue-600 font-bold hover:underline">CITB health, safety and environment test</a> within the last 2 years, at the relevant level for the occupation being applied for. To find out which level of test is required please use our Card Finder.
              </p>
              <p>
                <strong>CSCS Booking Fee:</strong><br />
                The CSCS Card booking is £65 which includes the £36 CSCS fee, booking fee and VAT.
              </p>
              <p className="text-sm font-bold text-slate-700" style={{ marginTop: "20px" }}>
                Still not sure which test to take?{" "}
                <a href="#contact" className="text-blue-600 hover:underline">
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

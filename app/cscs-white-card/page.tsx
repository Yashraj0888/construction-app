"use client";

import CardDetailPage from "../components/CardDetailPage";
import { CheckCircle2, FileText, ShieldAlert, Award } from "lucide-react";

export default function CscsWhiteCardPage() {
  return (
    <CardDetailPage
      cardType="white"
      title="CSCS White Card - Academically Qualified Person"
      subhead="ACADEMICALLY QUALIFIED PERSON"
      bgHex="#f1f5f9"
      cardName="White AQP Card"
      easyApplyTitle="White AQP Card"
      easyApplySub="Easy apply for CSCS White Card - Academically Qualified."
      requirements={[]}
      extraContent={
        <div className="max-w-none text-slate-700">
          <style>{`
            .white-section {
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 44px;
              margin-bottom: 44px;
            }
            .white-section:last-of-type {
              border-bottom: none;
              padding-bottom: 0;
              margin-bottom: 0;
            }
            .white-section-title {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-size: 24px;
              font-weight: 850;
              color: #0f172a;
              margin-bottom: 24px;
              letter-spacing: -0.02em;
              line-height: 1.25;
            }
            .white-section-subtitle {
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
              color: #0f172a;
              font-weight: 900;
            }
            
            .validity-card-box {
              border-radius: 12px;
              padding: 24px !important;
              border: 1px solid transparent;
            }
            .validity-card-white {
              background: #f8fafc !important;
              border-color: #cbd5e1 !important;
            }
            
            .qualifications-panel {
              background: #f8fafc !important;
              border: 1px solid #e2e8f0 !important;
              border-radius: 12px !important;
              padding: 28px !important;
              margin-bottom: 32px;
            }
            
            .price-panel {
              background: #eff6ff !important;
              border: 1px solid #bfdbfe !important;
              border-radius: 12px !important;
              padding: 28px !important;
              margin-top: 36px;
            }
          `}</style>

          {/* Section 1: Eligibility & Qualifications */}
          <div className="white-section">
            <h3 className="white-section-title">
              Academically Qualified Person Eligibility
            </h3>
            <p className="white-section-subtitle">
              This card is available to people who have completed construction-related academic qualifications.
            </p>
            
            <div className="qualifications-panel">
              <h4 className="font-bold text-slate-800 text-[15.5px] mb-4 flex items-center gap-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                <Award className="text-slate-900" size={18} />
                <span>Accepted Qualifications</span>
              </h4>
              <ul className="info-bullet-list">
                <li>Certain construction related degrees</li>
                <li>HNDs (Higher National Diplomas)</li>
                <li>HNCs (Higher National Certificates)</li>
                <li>CIOB Certificates</li>
                <li>NEBOSH diplomas</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Validity & Document Requirements */}
          <div className="white-section">
            <h3 className="white-section-title">
              Validity & Document Requirements
            </h3>

            <div className="info-card-grid">
              <div className="info-card-box validity-card-box validity-card-white">
                <h4 className="info-card-heading">
                  <CheckCircle2 className="text-slate-900" size={20} />
                  <span>Card Validity</span>
                </h4>
                <p className="text-2xl font-black text-slate-800">5 Years Validity</p>
                <p className="text-xs text-slate-500 mt-1">This card is valid for five years and is renewable.</p>
              </div>

              <div className="info-card-box">
                <h4 className="info-card-heading">
                  <FileText className="text-slate-900" size={20} />
                  <span>Evidence Required</span>
                </h4>
                <p className="text-[14.5px] text-slate-600 leading-relaxed">
                  To apply for the card, applicants will need to supply a copy of their qualification and, where possible, evidence of the units achieved within the qualification.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Required Test & Pricing */}
          <div className="white-section">
            <h3 className="white-section-title">
              Test Requirement & Pricing
            </h3>
            
            <div className="info-card-grid">
              <div className="info-card-box">
                <h4 className="info-card-heading">
                  <ShieldAlert className="text-slate-900" size={20} />
                  <span>Required Test</span>
                </h4>
                <p className="text-[14.5px] text-slate-600 leading-relaxed">
                  All applicants must pass the <strong>CITB Managers and Professionals Health, Safety and Environment Test</strong>.
                </p>
              </div>

              <div className="info-card-box validity-card-box" style={{ background: "#eff6ff", borderColor: "#bfdbfe" }}>
                <h4 className="info-card-heading">
                  <Award className="text-blue-700" size={20} />
                  <span>Booking Cost</span>
                </h4>
                <p className="text-[14.5px] text-slate-650 leading-relaxed">
                  The CSCS Card booking is <strong>£65</strong> which includes the £36 CSCS fee, booking fee and VAT.
                </p>
              </div>
            </div>

            <div className="price-panel text-[14.5px] text-slate-600">
              <p className="text-sm font-bold text-slate-700">
                Still not sure?{" "}
                <a href="/#contact" className="text-blue-650 font-bold hover:underline">
                  Contact Support
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}

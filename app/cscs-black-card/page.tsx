"use client";

import CardDetailPage from "../components/CardDetailPage";
import { CheckCircle2, FileText, AlertCircle, HelpCircle, Award, ShieldAlert } from "lucide-react";

export default function CscsBlackCardPage() {
  return (
    <CardDetailPage
      cardType="black"
      title="CSCS Black Card"
      subhead="MANAGER"
      bgHex="#0f172a"
      cardName="Black Manager Card"
      easyApplyTitle="Black Manager Card"
      easyApplySub="Easy apply for CSCS Black Card - Managers."
      requirements={[]}
      extraContent={
        <div className="max-w-none text-slate-700">
          <style>{`
            .black-section {
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 44px;
              margin-bottom: 44px;
            }
            .black-section:last-of-type {
              border-bottom: none;
              padding-bottom: 0;
              margin-bottom: 0;
            }
            .black-section-title {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-size: 24px;
              font-weight: 850;
              color: #0f172a;
              margin-bottom: 24px;
              letter-spacing: -0.02em;
              line-height: 1.25;
            }
            .black-section-subtitle {
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
            
            .black-alert {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 18px 22px;
              color: #334155;
              font-size: 14.5px;
              line-height: 1.6;
              display: flex;
              gap: 12px;
              align-items: flex-start;
              margin-top: 24px;
            }
            
            .validity-card-box {
              border-radius: 12px;
              padding: 24px !important;
              border: 1px solid transparent;
            }
            .validity-card-black {
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
          <div className="black-section">
            <h3 className="black-section-title">
              Manager & Technical Occupations Eligibility
            </h3>
            <p className="black-section-subtitle">
              This card is available for manager and technical occupations subject to meeting specific qualification requirements.
            </p>
            
            <div className="qualifications-panel">
              <h4 className="font-bold text-slate-800 text-[15.5px] mb-4 flex items-center gap-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                <Award className="text-slate-900" size={18} />
                <span>Accepted Qualifications</span>
              </h4>
              <ul className="info-bullet-list">
                <li>Achievement of a relevant Construction Management/Technical related NVQ/SVQ level 5, 6 or 7.</li>
                <li>A SVQ Level 4 in Construction Management/Technical related qualification.</li>
                <li>Holding a pre-existing NVQ level 4 in construction management.</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Validity & Test Requirements */}
          <div className="black-section">
            <h3 className="black-section-title">
              Validity & Test Requirements
            </h3>

            <div className="info-card-grid">
              <div className="info-card-box validity-card-box validity-card-black">
                <h4 className="info-card-heading">
                  <CheckCircle2 className="text-slate-900" size={20} />
                  <span>Card Validity</span>
                </h4>
                <p className="text-2xl font-black text-slate-800">5 Years Validity</p>
                <p className="text-xs text-slate-500 mt-1">This card is valid for five years and is renewable upon expiry.</p>
              </div>

              <div className="info-card-box">
                <h4 className="info-card-heading">
                  <ShieldAlert className="text-slate-900" size={20} />
                  <span>Required Test</span>
                </h4>
                <p className="text-[14.5px] text-slate-600 leading-relaxed">
                  All applicants must pass the <strong>CITB Managers and Professionals Health, Safety and Environment Test</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Cost & Contact */}
          <div className="black-section">
            <div className="price-panel text-[14.5px] text-slate-600 space-y-6">
              <h4 className="font-bold text-slate-800 text-lg mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Booking Fee & Pricing
              </h4>
              <p>
                The CSCS Card booking is <strong>£65</strong> which includes the £36 CSCS fee, booking fee and VAT.
              </p>
              <p className="text-sm font-bold text-slate-700" style={{ marginTop: "20px" }}>
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

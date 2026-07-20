"use client";

import CardDetailPage from "../components/CardDetailPage";
import { CheckCircle2, AlertCircle, HelpCircle, ShieldAlert, Award, FileText } from "lucide-react";

export default function CscsGreenCardPage() {
  return (
    <CardDetailPage
      cardType="green"
      title="CSCS Green Card"
      subhead="LABOURER"
      bgHex="#047857"
      cardName="Green Labourer Card"
      easyApplyTitle="Green Labourer Card"
      easyApplySub="Easy apply for CSCS Green Card - Labourers Card."
      requirements={[
        { title: "CITB Test (Operatives)", link: "/book-citb-test" },
        { title: "Health & Safety Awareness Course", link: "/health-safety-awareness" },
      ]}
      extraContent={
        <div className="max-w-none text-slate-700">
          <style>{`
            .green-section {
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 44px;
              margin-bottom: 44px;
            }
            .green-section:last-of-type {
              border-bottom: none;
              padding-bottom: 0;
              margin-bottom: 0;
            }
            .green-section-title {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-size: 24px;
              font-weight: 850;
              color: #0f172a;
              margin-bottom: 24px;
              letter-spacing: -0.02em;
              line-height: 1.25;
            }
            .green-section-subtitle {
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
              color: #10b981;
              font-weight: 900;
            }
            
            .green-alert {
              background: #f0fdf4;
              border: 1px solid #bbf7d0;
              border-radius: 12px;
              padding: 18px 22px;
              color: #15803d;
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
            .validity-card-new {
              background: #f0fdf4 !important;
              border-color: #bbf7d0 !important;
            }
            .validity-card-renew {
              background: #eff6ff !important;
              border-color: #bfdbfe !important;
            }
            
            .qualifications-panel {
              background: #f8fafc !important;
              border: 1px solid #e2e8f0 !important;
              border-radius: 12px !important;
              padding: 28px !important;
              margin-bottom: 32px;
            }
            
            .replacements-panel {
              background: #eff6ff !important;
              border: 1px solid #bfdbfe !important;
              border-radius: 12px !important;
              padding: 28px !important;
              margin-top: 36px;
            }
          `}</style>

          {/* Section 1: Key Guidelines */}
          <div className="green-section">
            <h3 className="green-section-title">
              Labourer Card Renewal and Application Guidelines
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="validity-card-box validity-card-new">
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">New Applications</h4>
                <p className="text-2xl font-black text-emerald-700">2 Years Validity</p>
                <p className="text-xs text-slate-500 mt-1">First-time applications do not require evidence of labouring work.</p>
              </div>
              <div className="validity-card-box validity-card-renew">
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">Card Renewals</h4>
                <p className="text-2xl font-black text-blue-700">5 Years Validity</p>
                <p className="text-xs text-slate-500 mt-1">Available to workers who pass requirements and provide proof of labouring role.</p>
              </div>
            </div>

            <div className="space-y-6 text-[14.5px] leading-relaxed text-slate-600" style={{ marginTop: "32px" }}>
              <p>
                • <strong>Expired within one year:</strong> If your previous Labourer card has expired within one year, you can renew it for five years by providing proof of working in a labouring role.
              </p>
              <p>
                • <strong>Expired over one year ago:</strong> If your previous card expired more than one year ago, you must submit an appeal with evidence of your work as a Labourer or reapply as a new applicant.
              </p>
            </div>
          </div>

          {/* Section 2: Evidence Rules */}
          <div className="green-section">
            <h3 className="green-section-title">
              Evidence & Proof of Work
            </h3>
            <p className="green-section-subtitle">
              When applying for a five-year Labourer card after holding a two-year card, or when renewing a card that has not been expired for more than one year, evidence must be supplied.
            </p>

            <div className="info-card-grid">
              <div className="info-card-box">
                <h4 className="info-card-heading">
                  <FileText className="text-emerald-600" size={20} />
                  <span>Accepted Evidence</span>
                </h4>
                <ul className="info-bullet-list">
                  <li>A formal letter from your employer (or main contractor for self-employed workers) written on company-headed paper.</li>
                  <li>A fully completed official CSCS Labourer Declaration form.</li>
                </ul>
              </div>

              <div className="info-card-box">
                <h4 className="info-card-heading">
                  <CheckCircle2 className="text-emerald-600" size={20} />
                  <span>Self-Employed Applicants</span>
                </h4>
                <p className="text-[14.5px] text-slate-600 leading-relaxed">
                  Self-employed construction workers can have a main contractor for whom they have worked complete and vouch for them via the standard declaration form.
                </p>
              </div>
            </div>

            <div className="green-alert">
              <AlertCircle className="flex-shrink-0" style={{ marginTop: "2px" }} size={20} />
              <div>
                <strong>Note:</strong> Evidence of active labouring work is <strong>not required</strong> for a first-time two-year Labourer card application. Existing cards remain valid until expiry.
              </div>
            </div>
          </div>

          {/* Section 3: Site Access & Roles */}
          <div className="green-section">
            <h3 className="green-section-title">
              Who Needs a Labourer Card?
            </h3>
            <p className="green-section-subtitle">
              These restrictions ensure cards align with the Building Safety Act, addressing the oversupply of Labourer cards and ensuring only genuine active Labourers hold them. Non-construction or office-based workers who rarely visit sites do not require a card.
            </p>

            <div className="info-card-box">
              <h4 className="info-card-heading">
                <ShieldAlert className="text-amber-600" size={20} />
                <span>Cleaners on Construction Sites</span>
              </h4>
              <div className="space-y-4 text-[14.5px] text-slate-600 leading-relaxed">
                <p>
                  • <strong>No CSCS card required</strong> for cleaners working in site offices or welfare facilities.
                </p>
                <p>
                  • <strong>Labourer Card required</strong> for general cleaning duties on live construction sites.
                </p>
                <p>
                  • <strong>Blue Skilled Card required</strong> for specialist cleaning (e.g. industrial cleaning) which requires a Level 2 Certificate in Cleaning and Support Services Skills.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Card Requirements & Alternatives */}
          <div className="green-section">
            <h3 className="green-section-title">
              Card Requirements & Alternative Qualifications
            </h3>

            <div className="space-y-8">
              <div className="qualifications-panel">
                <h4 className="font-bold text-slate-800 text-[15.5px] mb-4 flex items-center gap-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  <Award className="text-emerald-600" size={18} />
                  <span>Approved Qualifications List</span>
                </h4>
                <p className="text-[14px] text-slate-500 mb-4 leading-relaxed">
                  All applicants must pass the <a href="/book-citb-test" className="text-emerald-600 font-bold hover:underline">CITB health, safety and environment test for operatives</a> and hold any one of the following:
                </p>
                <ul className="info-bullet-list">
                  <li>An RQF Level 1/SCQF Level 4 Award in Health and Safety in a Construction Environment</li>
                  <li>An SCQF Level 5 REHIS Elementary Health and Safety Certificate</li>
                  <li>The NOCN/CSkills Awards Construction Health and Safety (F/618/0738) unit</li>
                </ul>
                <p className="text-[14px] text-slate-600 mt-6 leading-relaxed">
                  To obtain one of the required qualifications listed above, please visit our{" "}
                  <a href="/health-safety-awareness" className="text-emerald-600 font-bold hover:underline">
                    Health and Safety Awareness Course
                  </a>{" "}
                  booking portal.
                </p>
              </div>

              <div className="info-card-grid" style={{ marginBottom: "36px" }}>
                <div className="info-card-box">
                  <h4 className="font-bold text-slate-850 mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Validity of Qualifications</h4>
                  <p className="text-[14.5px] text-slate-600 leading-relaxed">
                    Five-year validity qualifications must have been completed within four years of the application date to be accepted.
                  </p>
                </div>
                <div className="info-card-box">
                  <h4 className="font-bold text-slate-850 mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Recognised Alternatives</h4>
                  <p className="text-[14.5px] text-slate-600 leading-relaxed">
                    IOSH Safety, Health, and Environment for Construction Workers is valid for three years and must be within its validity period at the time of application.
                  </p>
                </div>
              </div>
            </div>

            {/* Replacements & Booking */}
            <div className="replacements-panel text-[14.5px] text-slate-600 space-y-6">
              <p>
                <strong>How to replace your CSCS Green Card?</strong><br />
                Request a replacement for your lost, stolen or broken CSCS Card by submitting your details in the <a href="/apply-cscs?cardType=Green%20Labourer%20Card" className="text-emerald-600 font-bold hover:underline">online application service</a>.
              </p>
              <p>
                <strong>Renewing your Green CSCS Labourer Card:</strong><br />
                Renew your card (valid for 5 years) by passing the CITB Health, Safety and Environment Test within the last 2 years and holding a valid Level 1 Health & Safety Awareness certificate (or equivalent). The CSCS Card booking is £65 which includes the £36 CSCS fee, booking fee and VAT.
              </p>
              <p className="text-sm font-bold text-slate-700" style={{ marginTop: "20px" }}>
                Still not sure which test to take?{" "}
                <a href="/#contact" className="text-blue-600 hover:underline">
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

"use client";

import { CheckCircle2 } from "lucide-react";

export default function HowToBookSection() {
  return (
    <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <style>{`
        .book-container {
          max-width: 1024px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 992px) {
          .book-container {
            grid-template-columns: 1fr 1.1fr;
          }
        }
        
        /* Premium Vector Illustration Mockup */
        .illustration-wrapper {
          background: #fca5a5; /* Matching the salmon background in the image */
          border-radius: 24px;
          padding: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/10;
        }
        
        .mockup-laptop {
          width: 85%;
          max-width: 320px;
          position: relative;
          z-index: 2;
        }
        .mockup-screen {
          background: #ffffff;
          border: 12px solid #0f172a;
          border-bottom-width: 16px;
          border-radius: 20px 20px 0 0;
          box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.15);
          aspect-ratio: 16/10;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .mockup-keyboard-base {
          height: 10px;
          background: #1e293b;
          border-radius: 0 0 10px 10px;
          position: relative;
        }
        .mockup-keyboard-notch {
          width: 40px;
          height: 4px;
          background: #0f172a;
          margin: 0 auto;
          border-radius: 0 0 4px 4px;
        }
        
        .screen-header {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        .screen-user-icon {
          width: 24px;
          height: 24px;
          background: #e2e8f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
        }
        .screen-title {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
        }
        
        .screen-lines {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-grow: 1;
        }
        .screen-line {
          height: 6px;
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .screen-badge {
          align-self: flex-end;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10b981;
        }
        
        /* Copy text columns */
        .content-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .title-main {
          font-size: 30px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
          line-height: 1.25;
        }
        .title-sub {
          font-size: 16px;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 24px;
        }
        .body-desc {
          font-size: 16px;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        
        /* Steps list styling */
        .step-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }
        .step-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .step-marker {
          flex-shrink: 0;
          color: #0f172a;
          font-size: 14px;
          line-height: 1.6;
        }
        .step-text {
          font-size: 15px;
          color: #334155;
          line-height: 1.6;
        }
        .step-link {
          color: #2563eb;
          text-decoration: underline;
          font-weight: 600;
        }
        .step-link:hover {
          color: #1d4ed8;
        }
        
        .footer-note {
          font-size: 15px;
          color: #475569;
          line-height: 1.6;
        }
      `}</style>
      <div className="book-container">
        {/* Left Column: Vector Illustration */}
        <div className="illustration-wrapper">
          <div className="mockup-laptop">
            <div className="mockup-screen">
              <div className="screen-header">
                <div className="screen-user-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="screen-title">CITB Test</div>
              </div>
              <div className="screen-lines">
                <div className="screen-line" style={{ width: "80%" }}></div>
                <div className="screen-line" style={{ width: "65%" }}></div>
                <div className="screen-line" style={{ width: "75%" }}></div>
                <div className="screen-line" style={{ width: "45%" }}></div>
              </div>
              <div className="screen-badge">
                <CheckCircle2 size={36} fill="#e6f4ea" strokeWidth={2} />
              </div>
            </div>
            <div className="mockup-keyboard-base">
              <div className="mockup-keyboard-notch"></div>
            </div>
          </div>
        </div>

        {/* Right Column: Copywriting content */}
        <div className="content-col">
          <h2 className="title-main">How to Book Your CITB Test?</h2>
          <div className="title-sub">Fast-track your CITB Health, Safety & Environment test scheduling online.</div>
          
          <p className="body-desc">
            <strong>Scheduling your CITB touchscreen test is simple and efficient. Follow our three-step online guide to secure your official test date at a nearby local center.</strong>
          </p>

          <div className="step-list">
            <div className="step-item">
              <div className="step-marker">▶</div>
              <div className="step-text">
                Complete the online booking form <a href="/book-citb-test" className="step-link">here</a>, choosing your preferred date, time slot, and test center.
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-marker">▶</div>
              <div className="step-text">
                Review your application details, confirm your contact information, and complete the secure payment.
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-marker">▶</div>
              <div className="step-text">
                Receive your booking confirmation and official test preparation guide instantly via email and text.
              </div>
            </div>
          </div>

          <div className="footer-note">
            Need help selecting the correct test category? Find the recommended exam for your specific trade <a href="/trade-wise-test" className="step-link">here</a>.
          </div>
        </div>
      </div>
    </section>
  );
}

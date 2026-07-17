"use client";

export default function ApplyCscsSection() {
  return (
    <section className="bg-slate-50 border-t border-slate-200" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <style>{`
        .cscs-container {
          max-width: 1024px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 992px) {
          .cscs-container {
            grid-template-columns: 1fr 1.1fr;
          }
        }
        
        /* Premium Vector CSCS Card Mockup */
        .card-illustration-wrapper {
          background: #f1f5f9;
          border-radius: 24px;
          padding: 40px 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/10;
        }
        
        .cscs-card-mockup {
          width: 100%;
          max-width: 380px;
          background: #047857; /* Deep CSCS Green */
          border: 4px solid #065f46;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 20px 25px -5px rgba(4, 120, 87, 0.15), 0 10px 10px -5px rgba(4, 120, 87, 0.1);
          aspect-ratio: 1.586/1; /* Standard ID Card ratio */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          color: #ffffff;
        }
        
        /* Card header lines */
        .cscs-card-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 8px;
        }
        .cscs-card-stripes {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .cscs-card-stripe {
          height: 2px;
          background: rgba(255, 255, 255, 0.4);
          width: 100%;
        }
        
        .cscs-card-body {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-grow: 1;
          margin-bottom: 12px;
        }
        
        .cscs-card-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-self: stretch;
          flex-grow: 1;
          max-width: 62%;
        }
        
        .cscs-card-chip {
          width: 54px;
          height: 38px;
          background: #94a3b8; /* Hologram Chip */
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          margin-bottom: 20px;
        }
        
        .cscs-card-name {
          font-family: monospace;
          font-weight: 800;
          font-size: 14px;
          color: #000000;
          background: rgba(255, 255, 255, 0.75);
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-block;
          letter-spacing: 0.05em;
        }
        
        .cscs-card-photo-wrapper {
          width: 90px;
          height: 110px;
          background: #e2e8f0;
          border: 2px solid #ffffff;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .cscs-card-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Bottom Category Bar */
        .cscs-card-footer {
          background: #cbd5e1;
          border: 2px solid #0f172a;
          color: #000000;
          text-align: center;
          font-weight: 800;
          font-size: 14px;
          padding: 6px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
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
          margin-bottom: 24px;
          line-height: 1.25;
        }
        
        /* Steps list styling */
        .step-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
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
        .step-sublist {
          margin-top: 8px;
          padding-left: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .step-subitem {
          font-size: 14px;
          color: #475569;
          line-height: 1.5;
        }
        .step-link {
          color: #2563eb;
          text-decoration: underline;
          font-weight: 600;
        }
        .step-link:hover {
          color: #1d4ed8;
        }
      `}</style>
      <div className="cscs-container">
        {/* Left Column: Vector Card Mockup */}
        <div className="card-illustration-wrapper">
          <div className="cscs-card-mockup">
            <div className="cscs-card-header">
              <div className="cscs-card-stripes">
                <div className="cscs-card-stripe"></div>
                <div className="cscs-card-stripe"></div>
                <div className="cscs-card-stripe"></div>
              </div>
            </div>
            
            <div className="cscs-card-body">
              <div className="cscs-card-left">
                <div className="cscs-card-chip"></div>
                <div className="cscs-card-name">JOHN CITIZEN</div>
              </div>
              <div className="cscs-card-photo-wrapper">
                <img 
                  src="/worker_portrait.png" 
                  alt="Construction Worker Card Profile" 
                  className="cscs-card-photo" 
                />
              </div>
            </div>
            
            <div className="cscs-card-footer">
              Labourer
            </div>
          </div>
        </div>

        {/* Right Column: Copywriting content */}
        <div className="content-col">
          <h2 className="title-main">Apply For CSCS Card</h2>
          
          <div className="step-list">
            <div className="step-item">
              <div className="step-marker">▶</div>
              <div className="step-text">
                Complete the CSCS Card application <a href="/cscs-cards" className="step-link">here</a>. Choose the correct card level corresponding to your qualifications and training.
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-marker">▶</div>
              <div className="step-text">
                Select your booking path:
                <div className="step-sublist">
                  <div className="step-subitem">
                    • Select <strong>New Card</strong> if you are obtaining your credential for the first time.
                  </div>
                  <div className="step-subitem">
                    • Select <strong>Renew Card</strong> if you are updating an expired or soon-to-expire CSCS card.
                  </div>
                  <div className="step-subitem">
                    • Select <strong>Lost Card</strong> if you need an official replacement card issued.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-marker">▶</div>
              <div className="step-text">
                Provide your CITB test details, upload any required qualification certificates, and enter your delivery address.
              </div>
            </div>

            <div className="step-item">
              <div className="step-marker">▶</div>
              <div className="step-text">
                Verify your details, confirm submission, and complete the secure payment.
              </div>
            </div>

            <div className="step-item">
              <div className="step-marker">▶</div>
              <div className="step-text">
                Once approved, your physical CSCS card will be dispatched and delivered within 15 working days.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

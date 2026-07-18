"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Mail, Phone, ArrowLeft, ArrowRight, CheckCircle, Info, ClipboardCheck } from "lucide-react";

// Define Zod Validation Schema for Easy Apply
const easyApplySchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  emailAddress: z.string().email({ message: "Please enter a valid email address." }),
});

type FormErrors = {
  [key in keyof z.infer<typeof easyApplySchema>]?: string;
};

export interface CardDetailProps {
  cardType: string; // e.g. "green", "blue", "red", "gold", "black"
  title: string;
  subhead: string;
  bgHex: string;
  cardName: string;
  easyApplyTitle: string;
  easyApplySub: string;
  requirements: Array<{
    title: string;
    link: string;
  }>;
  extraContent?: React.ReactNode;
}

export default function CardDetailPage({
  cardType,
  title,
  subhead,
  bgHex,
  cardName,
  easyApplyTitle,
  easyApplySub,
  requirements,
  extraContent,
}: CardDetailProps) {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = easyApplySchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: FormErrors = {};
      validation.error.errors.forEach((err) => {
        const path = err.path[0] as keyof FormErrors;
        if (path) {
          fieldErrors[path] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setFormSubmitted(true);
  };

  const isWhiteCard = cardType === "white";
  const isGoldCard = cardType === "gold";
  const isBlackCard = cardType === "black";

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-6">
        <style>{`
          .detail-container {
            max-width: 1024px;
            margin: 0 auto;
          }
          
          .back-link-wrapper {
            margin-bottom: 24px;
          }
          
          .back-link {
            font-size: 14px;
            font-weight: 700;
            color: #2563eb;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
          }
          .back-link:hover {
            color: #1d4ed8;
            transform: translateX(-2px);
          }
          
          .detail-header-box {
            margin-bottom: 32px;
          }
          
          .detail-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 36px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 12px;
            letter-spacing: -0.02em;
          }
          
          .detail-subtitle-note {
            font-size: 15px;
            color: #64748b;
            line-height: 1.6;
          }
          
          .detail-apply-link {
            color: #2563eb;
            font-weight: 700;
            text-decoration: underline;
          }
          .detail-apply-link:hover {
            color: #1d4ed8;
          }
          
          .detail-columns {
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;
            margin-bottom: 56px;
            align-items: start;
          }
          @media (min-width: 768px) {
            .detail-columns {
              grid-template-columns: 1.1fr 0.9fr;
            }
          }
          
          /* Visual Mockup Container */
          .detail-mockup-panel {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 36px 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
          }
          
          .cscs-large-mockup {
            width: 100%;
            max-width: 440px;
            height: 250px;
            border-radius: 14px;
            position: relative;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.12);
            box-sizing: border-box;
          }
          
          .large-mockup-header {
            height: 40px;
            display: flex;
            align-items: center;
            padding: 0 20px;
          }
          
          .large-mockup-stripes {
            display: flex;
            gap: 3px;
          }
          
          .large-mockup-stripe {
            width: 18px;
            height: 6px;
            border-radius: 1px;
            background: rgba(0,0,0,0.15);
          }
          .cscs-large-mockup-white .large-mockup-stripe {
            background: #000000;
          }
          
          .large-mockup-body {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 0 18px 10px 18px;
            flex-grow: 1;
          }
          
          .large-mockup-left {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-self: stretch;
            justify-content: space-between;
            padding-bottom: 6px;
          }
          
          .large-mockup-chip {
            width: 44px;
            height: 32px;
            background: rgba(255,255,255,0.4);
            border-radius: 4px;
          }
          .cscs-large-mockup-white .large-mockup-chip {
            background: #cbd5e1;
          }
          
          .large-mockup-name {
            font-size: 15px;
            font-weight: 800;
            color: #000000;
            background: rgba(255, 255, 255, 0.85);
            padding: 4px 8px;
            border-radius: 3px;
            white-space: nowrap;
            letter-spacing: 0.02em;
          }
          
          .large-mockup-photo-box {
            width: 110px;
            height: 135px;
            background: #cbd5e1;
            border: 2px solid #ffffff;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          }
          
          .large-mockup-footer {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-top: 1px solid rgba(0, 0, 0, 0.08);
          }
          
          /* Easy Apply Card */
          .easy-apply-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 36px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          
          .easy-apply-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px;
          }
          
          .easy-apply-subtitle {
            font-size: 13.5px;
            color: #64748b;
            margin-bottom: 24px;
            line-height: 1.4;
          }
          
          .input-control {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
            font-size: 14px;
            color: #0f172a;
            background: #ffffff;
            transition: all 0.2s ease;
            outline: none;
            box-sizing: border-box;
          }
          .input-control:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
          }
          .input-control.has-error {
            border-color: #ef4444;
            background-color: #fef2f2;
          }
          
          .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }
          .input-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            pointer-events: none;
            display: flex;
            align-items: center;
          }
          .input-wrapper .input-icon ~ input {
            padding-left: 48px !important;
          }
          
          .error-text {
            font-size: 12px;
            color: #ef4444;
            margin-top: 6px;
            font-weight: 600;
          }
          
          .easy-apply-btn {
            width: 100%;
            padding: 12.5px;
            border-radius: 12px;
            background: #2563eb;
            color: #ffffff;
            font-weight: 700;
            font-size: 15px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 16px;
            box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
          }
          .easy-apply-btn:hover {
            background: #1d4ed8;
            transform: translateY(-1px);
            box-shadow: 0 6px 12px rgba(37, 99, 235, 0.3);
          }
          
          .requirements-section {
            margin-top: 48px;
            border-top: 1px solid #e2e8f0;
            padding-top: 40px;
          }
          
          .req-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 24px;
          }
          
          .req-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }
          @media (min-width: 640px) {
            .req-grid {
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            }
          }
          
          .req-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          }
          
          .req-icon-wrapper {
            width: 48px;
            height: 48px;
            background: #eff6ff;
            color: #2563eb;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
          }
          
          .req-card-title {
            font-size: 15px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 16px;
          }
          
          .req-btn {
            width: 100%;
            padding: 8px 16px;
            background: #2563eb;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 13.5px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            display: inline-block;
          }
          .req-btn:hover {
            background: #1d4ed8;
          }
        `}</style>

        <div className="detail-container">
          <div className="back-link-wrapper">
            <a href="/cscs-cards" className="back-link">
              <ArrowLeft size={16} />
              <span>Go to full card type list</span>
            </a>
          </div>

          <div className="detail-header-box">
            <h1 className="detail-title">{title}</h1>
            <p className="detail-subtitle-note">
              Apply online: You can conveniently apply for a CSCS Card via our{" "}
              <a href={`/apply-cscs?cardType=${encodeURIComponent(cardName)}`} className="detail-apply-link">
                online application service
              </a>
              .
            </p>
          </div>

          <div className="detail-columns">
            {/* Left Mockup Display */}
            <div className="detail-mockup-panel">
              <div 
                className={`cscs-large-mockup ${isWhiteCard ? "cscs-large-mockup-white" : ""}`}
                style={{ background: bgHex }}
              >
                <div className="large-mockup-header">
                  <div className="large-mockup-stripes">
                    <div className="large-mockup-stripe" style={{ background: isWhiteCard ? "#000000" : "rgba(0,0,0,0.15)", width: "16px", height: "4px" }}></div>
                    <div className="large-mockup-stripe" style={{ background: isWhiteCard ? "#000000" : "rgba(0,0,0,0.15)", width: "16px", height: "4px" }}></div>
                    <div className="large-mockup-stripe" style={{ background: isWhiteCard ? "#000000" : "rgba(0,0,0,0.15)", width: "16px", height: "4px" }}></div>
                  </div>
                </div>

                <div className="large-mockup-body">
                  <div className="large-mockup-left">
                    <div className="large-mockup-chip" style={{ background: isWhiteCard ? "#cbd5e1" : "rgba(255,255,255,0.4)" }}></div>
                    <div className="large-mockup-name" style={{ color: isWhiteCard ? "#0f172a" : "#000000" }}>FIRSTNAME SURNAME</div>
                  </div>
                  <div className="large-mockup-photo-box">
                    <img 
                      src="/worker_portrait.png" 
                      alt="" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                  </div>
                </div>

                <div 
                  className="large-mockup-footer"
                  style={{ 
                    background: isWhiteCard ? "#cbd5e1" : (isGoldCard ? "#92400e" : (isBlackCard ? "#1e293b" : "rgba(255,255,255,0.25)")),
                    color: isWhiteCard ? "#0f172a" : "#ffffff"
                  }}
                >
                  {subhead}
                </div>
              </div>
            </div>

            {/* Right Easy Apply Form */}
            <div className="easy-apply-card">
              {formSubmitted ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div 
                    style={{ 
                      width: "60px", 
                      height: "60px", 
                      background: "#ecfdf5", 
                      color: "#10b981", 
                      borderRadius: "50%", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      margin: "0 auto 20px auto",
                      border: "2px solid #a7f3d0"
                    }}
                  >
                    <ClipboardCheck size={28} />
                  </div>
                  <h3 className="easy-apply-title" style={{ textAlign: "center" }}>Easy Apply Received</h3>
                  <p className="easy-apply-subtitle" style={{ textAlign: "center", marginTop: "8px" }}>
                    Thank you! Your preliminary application details for the **{cardName}** have been validated and saved. We will contact you at <strong>{formData.emailAddress}</strong> shortly to finish your booking.
                  </p>
                  <button 
                    onClick={() => { setFormSubmitted(false); setFormData({ firstName: "", lastName: "", phoneNumber: "", emailAddress: "" }); }}
                    className="easy-apply-btn"
                  >
                    Reset Form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="easy-apply-title">{easyApplyTitle}</h3>
                  <p className="easy-apply-subtitle">{easyApplySub}</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`input-control ${errors.firstName ? "has-error" : ""}`}
                        required
                      />
                      {errors.firstName && <div className="error-text">{errors.firstName}</div>}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`input-control ${errors.lastName ? "has-error" : ""}`}
                        required
                      />
                      {errors.lastName && <div className="error-text">{errors.lastName}</div>}
                    </div>

                    <div>
                      <div className="input-wrapper">
                        <Phone className="input-icon" size={16} />
                        <input
                          type="tel"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className={`input-control ${errors.phoneNumber ? "has-error" : ""}`}
                          style={{ paddingLeft: "48px" }}
                          required
                        />
                      </div>
                      {errors.phoneNumber && <div className="error-text">{errors.phoneNumber}</div>}
                    </div>

                    <div>
                      <div className="input-wrapper">
                        <Mail className="input-icon" size={16} />
                        <input
                          type="email"
                          name="emailAddress"
                          placeholder="Email"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          className={`input-control ${errors.emailAddress ? "has-error" : ""}`}
                          style={{ paddingLeft: "48px" }}
                          required
                        />
                      </div>
                      {errors.emailAddress && <div className="error-text">{errors.emailAddress}</div>}
                    </div>

                    <button type="submit" className="easy-apply-btn">
                      <span>Easy Apply</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Requirements section */}
          {requirements && requirements.length > 0 && (
            <div className="requirements-section">
              <h2 className="req-title">Eligibility Requirements</h2>
              <div className="req-grid">
                {requirements.map((req, index) => {
                  const isCitb = req.title.toLowerCase().includes("citb");
                  return (
                    <div key={index} className="req-card">
                      <div className="req-icon-wrapper">
                        {isCitb ? <ClipboardCheck size={22} /> : <CheckCircle size={22} />}
                      </div>
                      <h3 className="req-card-title">{req.title}</h3>
                      <a href={req.link} className="req-btn">
                        Book Now
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {extraContent && (
            <div className="extra-content-section" style={{ marginTop: "56px", borderTop: "1px solid #e2e8f0", paddingTop: "48px", paddingBottom: "80px" }}>
              {extraContent}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

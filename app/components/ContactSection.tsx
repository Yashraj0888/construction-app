"use client";

import { useState, useEffect } from "react";
import { Mail, MapPin, Phone, RotateCw, Send } from "lucide-react";
import { z } from "zod";
import { createEnquiry } from "@/lib/enquiries";
import { isValidEmail } from "@/lib/validation";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .refine((v) => isValidEmail(v), {
      message: "Enter a valid email address (e.g. name@domain.com).",
    }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactSection() {
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const generateCaptcha = () => {
    const chars = "23456789abcdefghkmnpqrstuvwxyzABCDEFGHKMNPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setErrorMessage("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0].message);
      return;
    }

    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
      setErrorMessage("Incorrect captcha text. Please try again.");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    setFormSubmitted(true);
    setErrorMessage("");
    void createEnquiry({
      enquiry_type: "contact",
      product: formData.subject || "Contact form",
      source_path: "/#contact",
      first_name: formData.name || null,
      email: formData.email || null,
      message: formData.message || null,
      status: "new",
      agreed_to_terms: false,
      payload: {
        trigger: "form_submitted",
        subject: formData.subject,
      },
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
    setCaptchaInput("");
    generateCaptcha();
  };

  return (
    <section id="contact" className="bg-white border-t border-slate-200" style={{ paddingTop: "85px", paddingBottom: "85px" }}>
      <style>{`
        .contact-layout {
          max-width: 1024px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 60px;
        }
        @media (min-width: 992px) {
          .contact-layout {
            grid-template-columns: 0.9fr 1.6fr;
            align-items: start;
          }
        }
        
        /* Left Column Styles */
        .info-col {
          display: flex;
          flex-direction: column;
        }
        .contact-pre {
          font-size: 13px;
          text-transform: uppercase;
          font-weight: 800;
          color: #2563eb;
          letter-spacing: 0.12em;
          margin-bottom: 12px;
        }
        .contact-title {
          font-size: 34px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 36px;
          line-height: 1.25;
        }
        
        .info-cards {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        
        .info-item {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        
        .info-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
          flex-shrink: 0;
        }
        
        .info-details h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .info-link {
          color: #334155;
          text-decoration: none;
          font-size: 15px;
          transition: color 0.15s ease;
          display: block;
          line-height: 1.5;
        }
        .info-link:hover {
          color: #2563eb;
        }
        .info-text {
          font-size: 15px;
          color: #475569;
          line-height: 1.6;
        }
        
        /* Form Card Styles */
        .form-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 36px;
          box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.03), 0 4px 6px -2px rgba(15, 23, 42, 0.02);
        }
        .form-header {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 24px;
        }
        
        .form-fields-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        @media (min-width: 600px) {
          .form-fields-grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
        }
        .input-field {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          font-size: 14px;
          color: #0f172a;
          background: #ffffff;
          transition: all 0.2s ease;
          box-sizing: border-box;
          outline: none;
        }
        .input-field:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
        .input-field::placeholder {
          color: #94a3b8;
        }
        
        /* Captcha Styling */
        .captcha-box-container {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .captcha-image-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          padding: 8px 16px;
          border-radius: 12px;
          user-select: none;
          flex-shrink: 0;
        }
        .captcha-code {
          font-family: 'Courier New', Courier, monospace;
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.15em;
          text-decoration: line-through;
          font-style: italic;
          background: linear-gradient(90deg, #334155, #64748b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .captcha-refresh-btn {
          border: none;
          background: transparent;
          cursor: pointer;
          color: #64748b;
          padding: 6px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .captcha-refresh-btn:hover {
          color: #0f172a;
          background-color: #e2e8f0;
          transform: rotate(30deg);
        }
        
        .error-msg {
          font-size: 14px;
          font-weight: 600;
          color: #ef4444;
          margin-bottom: 20px;
        }
        
        .success-msg {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
          padding: 16px 20px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 24px;
        }
        
        .submit-btn {
          width: 100%;
          padding: 14px 28px;
          background: #0f172a;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }
        .submit-btn:hover {
          background: #2563eb;
          color: #ffffff;
        }
      `}</style>

      <div className="contact-layout">
        {/* Left Column: Heading and Details */}
        <div className="info-col">
          <div className="contact-pre">Contact Us</div>
          <h2 className="contact-title">Let's get your queries answered</h2>
          
          <div className="info-cards">
            {/* Say Hello */}
            <div className="info-item">
              <div className="info-icon-wrapper">
                <Mail size={22} />
              </div>
              <div className="info-details">
                <h3>Say hello</h3>
                <a href="mailto:support@constructioncardassistance.co.uk" className="info-link">
                  support@constructioncardassistance.co.uk
                </a>
                <a href="tel:+441135199938" className="info-link" style={{ marginTop: "4px" }}>
                  +44 113 519 9938 <span style={{ color: "#64748b", fontSize: "13px" }}>(Mon-Fri, 9am-5pm)</span>
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="info-item">
              <div className="info-icon-wrapper">
                <MapPin size={22} />
              </div>
              <div className="info-details">
                <h3>Location</h3>
                <div className="info-text">
                  14 King Street, International House<br />
                  Leeds, LS1 2HL<br />
                  United Kingdom
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Container */}
        <div className="form-card">
          <h3 className="form-header">Raise A Query/Complaint</h3>

          {formSubmitted ? (
            <div className="success-msg">
              Thank you! Your query has been successfully submitted. We will get back to you shortly.
              <button 
                onClick={() => setFormSubmitted(false)}
                className="submit-btn" 
                style={{ marginTop: "16px", padding: "10px 20px", fontSize: "14px", width: "auto" }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMessage && <div className="error-msg">{errorMessage}</div>}

              <div className="form-fields-grid">
                <div className="form-fields-grid-2">
                  <div className="input-group" style={{ marginBottom: "16px" }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name*"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="input-group" style={{ marginBottom: "16px" }}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email*"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                <div className="input-group">
                  <textarea
                    name="message"
                    placeholder="How can we help you?*"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="input-field"
                    style={{ resize: "none", fontFamily: "inherit" }}
                    required
                  ></textarea>
                </div>
              </div>

              {/* Captcha Block */}
              <div className="captcha-box-container">
                <div className="captcha-image-wrapper">
                  <span className="captcha-code">{captchaText}</span>
                  <button 
                    type="button" 
                    onClick={generateCaptcha} 
                    className="captcha-refresh-btn"
                    title="Refresh verification code"
                  >
                    <RotateCw size={16} />
                  </button>
                </div>
                <div style={{ flexGrow: 1, minWidth: "150px" }}>
                  <input
                    type="text"
                    placeholder="Word Verification"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                <span>Submit</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

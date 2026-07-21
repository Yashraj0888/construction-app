"use client";

import { useState } from "react";
import { z } from "zod";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createEnquiry } from "@/lib/enquiries";
import { isValidEmail } from "@/lib/validation";
import { Check, Mail, Send } from "lucide-react";

const groupBookingSchema = z.object({
  title: z.string().min(1, { message: "Please select a title." }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  companyName: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .refine((v) => isValidEmail(v), {
      message: "Enter a valid email address (e.g. name@domain.com).",
    }),
  message: z.string().min(10, { message: "Please add a short message (at least 10 characters)." }),
});

type FormErrors = Partial<Record<keyof z.infer<typeof groupBookingSchema>, string>>;

export default function GroupBookingPage() {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    companyName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = groupBookingSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: FormErrors = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof FormErrors;
        if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    void createEnquiry({
      enquiry_type: "group_booking",
      product: "Group Booking",
      source_path: "/group-booking",
      title: formData.title || null,
      first_name: formData.firstName || null,
      middle_name: formData.middleName || null,
      last_name: formData.lastName || null,
      email: formData.email || null,
      company_name: formData.companyName || null,
      message: formData.message || null,
      status: "open",
      agreed_to_terms: false,
      payload: {
        trigger: "form_submitted",
      },
    }).finally(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        title: "",
        firstName: "",
        middleName: "",
        lastName: "",
        companyName: "",
        email: "",
        message: "",
      });
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flexGrow: 1, paddingTop: "64px", paddingBottom: "96px", paddingLeft: "24px", paddingRight: "24px" }}>
        <style>{`
          .gb-container {
            max-width: 820px;
            width: 100%;
            margin: 0 auto;
            box-sizing: border-box;
          }
          .gb-header {
            text-align: center;
            margin-bottom: 40px;
          }
          .gb-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 34px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.02em;
            margin: 0 0 16px 0;
            line-height: 1.2;
          }
          @media (max-width: 640px) {
            .gb-title { font-size: 26px; }
          }
          .gb-intro {
            font-size: 15px;
            color: #475569;
            line-height: 1.65;
            margin: 0 0 8px 0;
          }
          .gb-intro strong {
            color: #0f172a;
            font-weight: 700;
          }
          .gb-discount {
            font-size: 14px;
            color: #64748b;
            margin: 0;
          }

          .gb-form {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 36px 32px;
            box-shadow: 0 8px 24px -10px rgba(15, 23, 42, 0.1);
          }
          @media (max-width: 640px) {
            .gb-form { padding: 28px 20px; }
          }

          .gb-name-row {
            display: grid;
            grid-template-columns: 1fr;
            gap: 14px;
            margin-bottom: 20px;
          }
          @media (min-width: 768px) {
            .gb-name-row {
              grid-template-columns: 0.85fr 1.2fr 1.1fr 1.2fr;
            }
          }

          .gb-field {
            margin-bottom: 20px;
          }
          .gb-label {
            display: block;
            font-size: 14px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 8px;
          }
          .gb-input,
          .gb-select,
          .gb-textarea {
            width: 100%;
            border: 1.5px solid #e2e8f0;
            border-radius: 10px;
            font-size: 14px;
            color: #0f172a;
            background: #ffffff;
            outline: none;
            box-sizing: border-box;
            font-family: inherit;
            transition: border-color 0.15s ease, box-shadow 0.15s ease;
          }
          .gb-input,
          .gb-select {
            height: 48px;
            padding: 12px 14px;
          }
          .gb-textarea {
            min-height: 140px;
            padding: 14px;
            resize: vertical;
            line-height: 1.5;
          }
          .gb-input:focus,
          .gb-select:focus,
          .gb-textarea:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
          }
          .gb-input.has-error,
          .gb-select.has-error,
          .gb-textarea.has-error {
            border-color: #ef4444;
            background: #fef2f2;
          }
          .gb-error {
            font-size: 12px;
            color: #ef4444;
            font-weight: 600;
            margin-top: 6px;
          }

          .gb-email-wrap {
            position: relative;
          }
          .gb-email-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            pointer-events: none;
            display: flex;
          }
          .gb-email-wrap .gb-input {
            padding-left: 44px;
          }
          .gb-email-ok {
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #16a34a;
            pointer-events: none;
            display: flex;
          }

          .gb-submit {
            width: 100%;
            margin-top: 8px;
            padding: 14px 20px;
            border: none;
            border-radius: 10px;
            background: #2563eb;
            color: #ffffff;
            font-weight: 700;
            font-size: 15px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
            transition: background 0.15s ease, transform 0.15s ease;
          }
          .gb-submit:hover:not(:disabled) {
            background: #1d4ed8;
            transform: translateY(-1px);
          }
          .gb-submit:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .gb-success {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 48px 32px;
            text-align: center;
            box-shadow: 0 8px 24px -10px rgba(15, 23, 42, 0.1);
          }
          .gb-success-icon {
            width: 64px;
            height: 64px;
            border-radius: 9999px;
            background: #d1fae5;
            color: #059669;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px auto;
          }
          .gb-success h2 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 10px 0;
          }
          .gb-success p {
            font-size: 14px;
            color: #64748b;
            line-height: 1.65;
            margin: 0 0 24px 0;
          }
          .gb-success-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 24px;
            border-radius: 10px;
            background: #0f172a;
            color: #ffffff;
            font-weight: 700;
            font-size: 14px;
            border: none;
            cursor: pointer;
          }
          .gb-success-btn:hover { background: #1e293b; }
        `}</style>

        <div className="gb-container">
          <div className="gb-header">
            <h1 className="gb-title">Details for Group Booking</h1>
            <p className="gb-intro">
              Please enter the details below so that we can get in touch for booking multiple delegates for{" "}
              <strong>Health and Safety Test, Course and/or CSCS Card</strong>.
            </p>
            <p className="gb-discount">We offer discount if you are booking for multiple delegates.</p>
          </div>

          {submitted ? (
            <div className="gb-success">
              <div className="gb-success-icon">
                <Check size={30} strokeWidth={3} />
              </div>
              <h2>Message sent</h2>
              <p>
                Thanks for your group booking enquiry. Our team will review your details and contact you shortly about multi-delegate options and discounts.
              </p>
              <button type="button" className="gb-success-btn" onClick={() => setSubmitted(false)}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form className="gb-form" onSubmit={handleSubmit} method="post" noValidate>
              <div className="gb-name-row">
                <div>
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`gb-select ${errors.title ? "has-error" : ""}`}
                    aria-label="Title"
                  >
                    <option value="">Title</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </select>
                  {errors.title && <div className="gb-error">{errors.title}</div>}
                </div>

                <div>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`gb-input ${errors.firstName ? "has-error" : ""}`}
                    aria-label="First Name"
                  />
                  {errors.firstName && <div className="gb-error">{errors.firstName}</div>}
                </div>

                <div>
                  <input
                    name="middleName"
                    type="text"
                    placeholder="Middle Name"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="gb-input"
                    aria-label="Middle Name"
                  />
                </div>

                <div>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`gb-input ${errors.lastName ? "has-error" : ""}`}
                    aria-label="Last Name"
                  />
                  {errors.lastName && <div className="gb-error">{errors.lastName}</div>}
                </div>
              </div>

              <div className="gb-field">
                <label className="gb-label" htmlFor="companyName">
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="Your Company name. Leave this field blank if you do not belong to any company."
                  value={formData.companyName}
                  onChange={handleChange}
                  className="gb-input"
                />
              </div>

              <div className="gb-field">
                <div className="gb-email-wrap">
                  <span className="gb-email-icon" aria-hidden="true">
                    <Mail size={16} />
                  </span>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`gb-input ${errors.email ? "has-error" : ""}`}
                    aria-label="Email address"
                    autoComplete="email"
                  />
                  {!errors.email && z.string().email().safeParse(formData.email).success && (
                    <span className="gb-email-ok" aria-hidden="true">
                      <Check size={16} strokeWidth={3} />
                    </span>
                  )}
                </div>
                {errors.email && <div className="gb-error">{errors.email}</div>}
              </div>

              <div className="gb-field">
                <textarea
                  name="message"
                  placeholder="Tell us how many delegates you need to book, which services (CITB test, course, CSCS card), and any preferred dates or locations."
                  value={formData.message}
                  onChange={handleChange}
                  className={`gb-textarea ${errors.message ? "has-error" : ""}`}
                  aria-label="Message"
                />
                {errors.message && <div className="gb-error">{errors.message}</div>}
              </div>

              <button type="submit" className="gb-submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
                {!loading && <Send size={16} />}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

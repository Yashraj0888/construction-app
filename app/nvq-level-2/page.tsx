"use client";

import { useState } from "react";
import { z } from "zod";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createEnquiry } from "@/lib/enquiries";
import { isValidEmail, isValidPhone } from "@/lib/validation";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";

const easyApplySchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required." })
    .refine((v) => isValidPhone(v), {
      message: "Enter a valid phone number (e.g. 07123456789 or +447123456789).",
    }),
  emailAddress: z
    .string()
    .min(1, { message: "Email address is required." })
    .refine((v) => isValidEmail(v), {
      message: "Enter a valid email address (e.g. name@domain.com).",
    }),
});

type FormErrors = {
  [key in keyof z.infer<typeof easyApplySchema>]?: string;
};

type FormFields = z.infer<typeof easyApplySchema>;

const emptyForm: FormFields = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  emailAddress: "",
};

const highlights = [
  "Typically completed in around two months",
  "Practical assessment carried out on a live worksite",
  "Supported by experienced industry trainers and assessors",
  "Flexible study that fits around your working hours",
  "Available to candidates across the UK",
  "Covers the full range of construction trades",
];

const trades = [
  "Stone masonry",
  "Plastering",
  "Carpentry",
  "Bricklaying",
  "Steel fixing",
  "Joinery",
  "Roofing",
  "Wall and floor tiling",
  "Painting and decorating",
  "Plant operations",
  "Demolition",
  "Steel erection",
  "Highway maintenance",
  "Scaffolding",
  "Groundworks",
  "Formwork",
  "Insulation",
  "Dry lining",
];

function EasyApplyForm({
  title,
  subtitle,
  formKey,
  onSuccess,
}: {
  title: string;
  subtitle: string;
  formKey: "nvq" | "enrollment";
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState<FormFields>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      validation.error.issues.forEach((err) => {
        const path = err.path[0] as keyof FormErrors;
        if (path) fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "nvq_enquiry",
        JSON.stringify({
          type: formKey,
          ...formData,
          submittedAt: new Date().toISOString(),
        })
      );
    }

    void createEnquiry({
      enquiry_type: "nvq",
      product: formKey === "enrollment" ? "NVQ Level 2 Enrolment" : "NVQ Level 2",
      source_path: "/nvq-level-2",
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.emailAddress,
      phone: formData.phoneNumber,
      status: "open",
      agreed_to_terms: false,
      payload: {
        trigger: "easy_apply",
        formKey,
      },
    });

    setFormData(emptyForm);
    setErrors({});
    onSuccess();
  };

  return (
    <form className="nvq-form-card" onSubmit={handleSubmit} noValidate>
      <h3 className="nvq-form-title">{title}</h3>
      <p className="nvq-form-sub">{subtitle}</p>

      <div className="nvq-field">
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className={`nvq-input ${errors.firstName ? "has-error" : ""}`}
        />
        {errors.firstName && <div className="nvq-error">{errors.firstName}</div>}
      </div>

      <div className="nvq-field">
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className={`nvq-input ${errors.lastName ? "has-error" : ""}`}
        />
        {errors.lastName && <div className="nvq-error">{errors.lastName}</div>}
      </div>

      <div className="nvq-field">
        <div className="nvq-input-wrap">
          <span className="nvq-input-icon"><Phone size={16} /></span>
          <input
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`nvq-input has-icon ${errors.phoneNumber ? "has-error" : ""}`}
          />
        </div>
        {errors.phoneNumber && <div className="nvq-error">{errors.phoneNumber}</div>}
      </div>

      <div className="nvq-field">
        <div className="nvq-input-wrap">
          <span className="nvq-input-icon"><Mail size={16} /></span>
          <input
            name="emailAddress"
            type="email"
            placeholder="Email"
            value={formData.emailAddress}
            onChange={handleChange}
            className={`nvq-input has-icon ${errors.emailAddress ? "has-error" : ""}`}
          />
        </div>
        {errors.emailAddress && <div className="nvq-error">{errors.emailAddress}</div>}
      </div>

      <button type="submit" className="nvq-apply-btn">
        Easy Apply
        <ArrowRight size={18} />
      </button>
    </form>
  );
}

function CardMockup({
  bgHex,
  label,
  firstName,
  lastName,
}: {
  bgHex: string;
  label: string;
  firstName?: string;
  lastName?: string;
}) {
  const displayName =
    firstName || lastName
      ? `${firstName || ""} ${lastName || ""}`.trim().toUpperCase()
      : "FIRSTNAME SURNAME";

  return (
    <div className="nvq-card-mock" style={{ background: bgHex }} aria-hidden="true">
      <div className="nvq-card-stripes">
        <div className="nvq-card-stripe" />
        <div className="nvq-card-stripe" />
        <div className="nvq-card-stripe" />
        <div className="nvq-card-stripe" />
      </div>
      <div className="nvq-card-body">
        <div className="nvq-card-left">
          <div className="nvq-card-name">{displayName}</div>
          <div className="nvq-card-chip" />
        </div>
        <div className="nvq-card-photo">
          <img src="/worker_portrait.png" alt="" />
        </div>
      </div>
      <div className="nvq-card-footer">{label}</div>
    </div>
  );
}

export default function NvqLevel2Page() {
  const [nvqSuccess, setNvqSuccess] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flexGrow: 1, paddingTop: "64px", paddingBottom: "96px", paddingLeft: "24px", paddingRight: "24px" }}>
        <style>{`
          .nvq-container {
            max-width: 1024px;
            width: 100%;
            margin: 0 auto;
            box-sizing: border-box;
          }
          .nvq-page-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 36px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.02em;
            line-height: 1.2;
            margin: 0 0 28px 0;
          }
          @media (max-width: 640px) {
            .nvq-page-title { font-size: 28px; }
          }
          .nvq-check-list {
            list-style: none;
            padding: 0;
            margin: 0 0 24px 0;
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .nvq-check-list li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-size: 15px;
            color: #334155;
            line-height: 1.5;
          }
          .nvq-check-icon {
            width: 22px;
            height: 22px;
            border-radius: 9999px;
            background: #d1fae5;
            color: #059669;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-top: 1px;
          }
          .nvq-highlight {
            font-size: 15px;
            font-weight: 700;
            color: #5b21b6;
            margin: 0 0 40px 0;
            line-height: 1.55;
          }
          .nvq-highlight a {
            color: #5b21b6;
            text-decoration: underline;
          }

          .nvq-pair {
            display: grid;
            grid-template-columns: 1fr;
            gap: 36px;
            align-items: center;
            margin-bottom: 52px;
          }
          @media (min-width: 900px) {
            .nvq-pair {
              grid-template-columns: 1.05fr 0.95fr;
              gap: 48px;
            }
          }

          .nvq-card-mock {
            width: 100%;
            max-width: 420px;
            margin: 0 auto;
            aspect-ratio: 1.58 / 1;
            border-radius: 18px;
            box-shadow: 0 20px 40px -12px rgba(15, 23, 42, 0.28);
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          .nvq-card-stripes {
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 18px 0 0 18px;
          }
          .nvq-card-stripe {
            width: 56px;
            height: 7px;
            border-radius: 2px;
            background: rgba(0, 0, 0, 0.35);
          }
          .nvq-card-body {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 16px 18px 14px 18px;
            gap: 12px;
          }
          .nvq-card-left {
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 58%;
          }
          .nvq-card-name {
            font-size: 13px;
            font-weight: 800;
            color: #0f172a;
            background: rgba(255, 255, 255, 0.9);
            padding: 4px 8px;
            border-radius: 4px;
            letter-spacing: 0.02em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .nvq-card-chip {
            width: 48px;
            height: 36px;
            background: #cbd5e1;
            border-radius: 4px;
          }
          .nvq-card-photo {
            width: 92px;
            height: 112px;
            background: #cbd5e1;
            border: 2px solid #ffffff;
            border-radius: 6px;
            overflow: hidden;
            flex-shrink: 0;
            box-shadow: 0 2px 6px rgba(0,0,0,0.12);
          }
          .nvq-card-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
          .nvq-card-footer {
            height: 42px;
            background: rgba(226, 232, 240, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 14px;
            letter-spacing: 0.06em;
            color: #0f172a;
            text-transform: uppercase;
          }

          .nvq-form-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 32px 28px;
            box-shadow: 0 10px 30px -12px rgba(15, 23, 42, 0.12);
          }
          .nvq-form-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 6px 0;
          }
          .nvq-form-sub {
            font-size: 13px;
            color: #64748b;
            margin: 0 0 24px 0;
          }
          .nvq-field { margin-bottom: 16px; }
          .nvq-input-wrap { position: relative; }
          .nvq-input-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            pointer-events: none;
            display: flex;
          }
          .nvq-input {
            width: 100%;
            height: 48px;
            padding: 12px 16px;
            border: 1.5px solid #e2e8f0;
            border-radius: 12px;
            font-size: 14px;
            color: #0f172a;
            background: #ffffff;
            outline: none;
            box-sizing: border-box;
            font-family: inherit;
            transition: border-color 0.15s ease, box-shadow 0.15s ease;
          }
          .nvq-input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
          }
          .nvq-input.has-icon { padding-left: 44px; }
          .nvq-input.has-error {
            border-color: #ef4444;
            background: #fef2f2;
          }
          .nvq-error {
            font-size: 12px;
            color: #ef4444;
            font-weight: 600;
            margin-top: 6px;
          }
          .nvq-apply-btn {
            width: 100%;
            margin-top: 8px;
            padding: 14px 20px;
            border: none;
            border-radius: 12px;
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
          .nvq-apply-btn:hover {
            background: #1d4ed8;
            transform: translateY(-1px);
          }
          .nvq-success {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 36px 28px;
            text-align: center;
            box-shadow: 0 10px 30px -12px rgba(15, 23, 42, 0.12);
          }
          .nvq-success-icon {
            width: 56px;
            height: 56px;
            border-radius: 9999px;
            background: #d1fae5;
            color: #059669;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px auto;
          }
          .nvq-success h3 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 8px 0;
          }
          .nvq-success p {
            font-size: 14px;
            color: #64748b;
            line-height: 1.6;
            margin: 0;
          }

          .nvq-content {
            border-top: 1px solid #e2e8f0;
            padding-top: 44px;
            margin-bottom: 52px;
          }
          .nvq-body {
            font-size: 15px;
            color: #475569;
            line-height: 1.7;
            margin: 0 0 18px 0;
          }
          .nvq-body a {
            color: #2563eb;
            font-weight: 600;
            text-decoration: underline;
          }
          .nvq-subheading {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin: 32px 0 16px 0;
            letter-spacing: -0.02em;
          }
          .nvq-trade-list {
            list-style: disc;
            padding-left: 22px;
            margin: 0 0 8px 0;
            columns: 1;
            column-gap: 40px;
          }
          @media (min-width: 640px) {
            .nvq-trade-list { columns: 2; }
          }
          @media (min-width: 900px) {
            .nvq-trade-list { columns: 3; }
          }
          .nvq-trade-list li {
            font-size: 14.5px;
            color: #475569;
            line-height: 1.55;
            margin-bottom: 10px;
            break-inside: avoid;
          }
        `}</style>

        <div className="nvq-container">
          <h1 className="nvq-page-title">NVQ Level 2 in Construction</h1>

          <ul className="nvq-check-list">
            {highlights.map((item) => (
              <li key={item}>
                <span className="nvq-check-icon"><Check size={14} strokeWidth={3} /></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="nvq-highlight">
            Completing this route supports your application for a{" "}
            <a href="/cscs-blue-card">CSCS Blue Skilled Worker Card</a>.
          </p>

          {/* Blue skilled worker + NVQ form */}
          <div className="nvq-pair">
            <CardMockup bgHex="#1d4ed8" label="Skilled Worker" />
            {nvqSuccess ? (
              <div className="nvq-success">
                <div className="nvq-success-icon"><Check size={28} strokeWidth={3} /></div>
                <h3>Enquiry received</h3>
                <p>Thanks for your interest in NVQ Level 2. A member of our team will contact you shortly to discuss the next steps.</p>
              </div>
            ) : (
              <EasyApplyForm
                formKey="nvq"
                title="NVQ Level 2"
                subtitle="Quick enquiry for NVQ Level 2 in Construction."
                onSuccess={() => setNvqSuccess(true)}
              />
            )}
          </div>

          {/* Middle copy */}
          <section className="nvq-content">
            <p className="nvq-body">
              Holding a Blue CSCS Card shows employers you are a competent skilled worker. The usual path is to finish an NVQ Level 2 in your trade and pass the CITB Health, Safety &amp; Environment test. Together, those requirements unlock a Skilled Worker Card that is typically valid for five years.
            </p>
            <p className="nvq-body">
              If you are already working on site, an NVQ lets you evidence the skills you use every day without stepping away from your job for long classroom blocks. Assessment is built around real tasks on your project, guided by specialists who know your trade.
            </p>

            <h2 className="nvq-subheading">Trades we cover</h2>
            <p className="nvq-body">
              NVQ Level 2 pathways are available across most construction disciplines, including:
            </p>
            <ul className="nvq-trade-list">
              {trades.map((trade) => (
                <li key={trade}>{trade}</li>
              ))}
            </ul>

            <h2 className="nvq-subheading">Starting while you train</h2>
            <p className="nvq-body">
              Many candidates need site access before their NVQ is finished. In that case you can usually apply for a temporary{" "}
              <a href="/cscs-red-card">CSCS Red Card</a> — either as a Trainee or as an Experienced Worker — so you can keep working while you complete the qualification. Once your NVQ Level 2 is awarded and your CITB test is passed, you can move up to the Blue Skilled Worker Card.
            </p>
            <p className="nvq-body">
              Not sure which route fits you? Send an enrolment enquiry below and we will help you choose between trainee and skilled-worker pathways.
            </p>
          </section>

          {/* Red trainee + enrollment form */}
          <div className="nvq-pair" id="enrollment">
            <CardMockup bgHex="#b91c1c" label="Trainee" />
            {enrollmentSuccess ? (
              <div className="nvq-success">
                <div className="nvq-success-icon"><Check size={28} strokeWidth={3} /></div>
                <h3>Enrolment enquiry received</h3>
                <p>We have your details. Someone from our team will be in touch to walk you through temporary Red Card options and NVQ enrolment.</p>
              </div>
            ) : (
              <EasyApplyForm
                formKey="enrollment"
                title="NVQ Level 2 (Enrolment)"
                subtitle="Quick enquiry to start enrolment or a temporary Red Card path."
                onSuccess={() => setEnrollmentSuccess(true)}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

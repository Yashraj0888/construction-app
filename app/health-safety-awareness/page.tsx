"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createEnquiry } from "@/lib/enquiries";
import { isValidEmail, isValidPhone } from "@/lib/validation";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  Phone,
} from "lucide-react";

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

const onlineBenefits = [
  "Up to 99% pass rate currently",
  "Officially accredited",
  "Short exam from a laptop/computer and not at a test centre",
  "Course can be completed on a smartphone or computer",
  "No need to take a day off work",
  "Immediate training at times that work for you",
  "Dedicated staff support",
  "No travel needed",
];

const learningTopics = [
  "Health & Safety law",
  "How to report unsafe acts in order to prevent accidents",
  "The need to prevent accidents",
  "Both risk assessments and method statements",
  "Performing safely in your job role and asking for advice where necessary",
  "How your role fits into the control and management of the construction site",
];

const offlineLocations = [
  "Birmingham",
  "Leeds",
  "Liverpool",
  "London",
  "Manchester",
  "Nottingham",
];

const faqs = [
  {
    q: "Who is this course for?",
    a: "This course is suitable for new and existing workers in the construction and civil engineering industry who need the Level 1 Award in Health & Safety in a Construction Environment to apply for a CSCS Green Labourer Card.",
  },
  {
    q: "How long is the online course?",
    a: "Most candidates complete the online course in less than 6 hours. You can study at your own pace from a smartphone or computer.",
  },
  {
    q: "How long is the qualification valid?",
    a: "The online Health & Safety Awareness qualification is typically valid for 5 years. The classroom RQF Level 1 Award is valid for life.",
  },
  {
    q: "Can I use this for a CSCS Green Card?",
    a: "Yes. This qualification can be used to apply for a CSCS Green Labourer Card, alongside your CITB Health, Safety & Environment test score report.",
  },
];

export default function HealthSafetyAwarenessPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [faqOpen, setFaqOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleEasyApply = async (e: React.FormEvent) => {
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

    setErrors({});
    await createEnquiry({
      enquiry_type: "health_safety_easy_apply",
      product: "Level 1 Health & Safety Awareness Course",
      source_path: "/health-safety-awareness",
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.emailAddress,
      phone: formData.phoneNumber,
      status: "in_progress",
      agreed_to_terms: false,
      payload: {
        trigger: "easy_apply",
        step: "easy_apply",
      },
    });
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "course_book_prefill",
        JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          emailAddress: formData.emailAddress,
        })
      );
    }
    router.push("/course-book");
  };

  const displayName =
    formData.firstName || formData.lastName
      ? `${formData.firstName} ${formData.lastName}`.trim().toUpperCase()
      : "FIRSTNAME SURNAME";

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flexGrow: 1, paddingTop: "64px", paddingBottom: "96px", paddingLeft: "24px", paddingRight: "24px" }}>
        <style>{`
          .hsa-container {
            max-width: 1024px;
            width: 100%;
            margin: 0 auto;
            box-sizing: border-box;
          }
          .hsa-page-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 36px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.02em;
            line-height: 1.2;
            margin: 0 0 12px 0;
          }
          .hsa-page-sub {
            font-size: 15px;
            color: #64748b;
            line-height: 1.6;
            margin: 0 0 40px 0;
            max-width: 820px;
          }
          @media (max-width: 640px) {
            .hsa-page-title { font-size: 28px; }
          }

          .hsa-hero {
            display: grid;
            grid-template-columns: 1fr;
            gap: 36px;
            align-items: center;
            margin-bottom: 56px;
          }
          @media (min-width: 900px) {
            .hsa-hero {
              grid-template-columns: 1.05fr 0.95fr;
              gap: 48px;
            }
          }

          .hsa-card-mock {
            width: 100%;
            max-width: 420px;
            margin: 0 auto;
            aspect-ratio: 1.58 / 1;
            border-radius: 18px;
            background: #047857;
            box-shadow: 0 20px 40px -12px rgba(4, 120, 87, 0.35);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
          }
          .hsa-card-stripes {
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 18px 0 0 18px;
          }
          .hsa-card-stripe {
            width: 56px;
            height: 7px;
            border-radius: 2px;
            background: rgba(0, 0, 0, 0.35);
          }
          .hsa-card-body {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 16px 18px 14px 18px;
            gap: 12px;
          }
          .hsa-card-left {
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 58%;
          }
          .hsa-card-name {
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
          .hsa-card-chip {
            width: 48px;
            height: 36px;
            background: #cbd5e1;
            border-radius: 4px;
          }
          .hsa-card-photo {
            width: 92px;
            height: 112px;
            background: #cbd5e1;
            border: 2px solid #ffffff;
            border-radius: 6px;
            overflow: hidden;
            flex-shrink: 0;
            box-shadow: 0 2px 6px rgba(0,0,0,0.12);
          }
          .hsa-card-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
          .hsa-card-footer {
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

          .hsa-form-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 32px 28px;
            box-shadow: 0 10px 30px -12px rgba(15, 23, 42, 0.12);
          }
          .hsa-form-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 6px 0;
          }
          .hsa-form-sub {
            font-size: 13px;
            color: #64748b;
            margin: 0 0 24px 0;
          }
          .hsa-field {
            margin-bottom: 16px;
          }
          .hsa-input-wrap {
            position: relative;
          }
          .hsa-input-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            pointer-events: none;
            display: flex;
          }
          .hsa-input {
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
          .hsa-input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
          }
          .hsa-input.has-icon {
            padding-left: 44px;
          }
          .hsa-input.has-error {
            border-color: #ef4444;
            background: #fef2f2;
          }
          .hsa-error {
            font-size: 12px;
            color: #ef4444;
            font-weight: 600;
            margin-top: 6px;
          }
          .hsa-apply-btn {
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
          .hsa-apply-btn:hover {
            background: #1d4ed8;
            transform: translateY(-1px);
          }

          .hsa-section {
            border-top: 1px solid #e2e8f0;
            padding-top: 48px;
            margin-top: 8px;
            margin-bottom: 56px;
          }
          .hsa-section:last-of-type {
            margin-bottom: 0;
          }
          .hsa-section-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 26px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.02em;
            line-height: 1.25;
            margin: 0 0 28px 0;
          }
          .hsa-check-list {
            list-style: none;
            padding: 0;
            margin: 0 0 28px 0;
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .hsa-check-list li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-size: 15px;
            color: #334155;
            line-height: 1.5;
          }
          .hsa-check-icon {
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
          .hsa-highlight {
            font-size: 15px;
            font-weight: 700;
            color: #5b21b6;
            margin: 0 0 16px 0;
            line-height: 1.5;
          }
          .hsa-highlight a {
            color: #5b21b6;
            text-decoration: underline;
          }
          .hsa-body {
            font-size: 15px;
            color: #475569;
            line-height: 1.7;
            margin: 0 0 16px 0;
          }
          .hsa-body a {
            color: #2563eb;
            font-weight: 600;
            text-decoration: underline;
          }
          .hsa-subheading {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin: 36px 0 24px 0;
          }
          .hsa-steps {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 28px;
          }
          @media (min-width: 768px) {
            .hsa-steps {
              grid-template-columns: repeat(3, 1fr);
              gap: 28px;
            }
          }
          .hsa-step {
            display: flex;
            gap: 14px;
            align-items: flex-start;
          }
          .hsa-step-num {
            width: 28px;
            height: 28px;
            border-radius: 9999px;
            background: #0f172a;
            color: #ffffff;
            font-size: 13px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .hsa-step p {
            margin: 0;
            font-size: 14px;
            color: #475569;
            line-height: 1.6;
          }
          .hsa-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 14px 28px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 15px;
            text-decoration: none;
            border: none;
            cursor: pointer;
            margin: 8px 0 28px 0;
            transition: transform 0.15s ease, background 0.15s ease;
          }
          .hsa-cta:hover { transform: translateY(-1px); }
          .hsa-cta-green {
            background: #059669;
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
          }
          .hsa-cta-green:hover { background: #047857; }
          .hsa-cta-blue {
            background: #2563eb;
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
          }
          .hsa-cta-blue:hover { background: #1d4ed8; }
          .hsa-bullet-list {
            list-style: disc;
            padding-left: 22px;
            margin: 0 0 28px 0;
            color: #475569;
          }
          .hsa-bullet-list li {
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 10px;
          }
          .hsa-bullet-list li:last-child { margin-bottom: 0; }
          .hsa-meta {
            font-size: 15px;
            color: #334155;
            line-height: 1.7;
            margin: 0 0 12px 0;
          }
          .hsa-meta strong {
            color: #0f172a;
          }
          .hsa-faq {
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            background: #ffffff;
            overflow: hidden;
            margin-top: 8px;
          }
          .hsa-faq-item + .hsa-faq-item {
            border-top: 1px solid #e2e8f0;
          }
          .hsa-faq-btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding: 18px 22px;
            background: #ffffff;
            border: none;
            cursor: pointer;
            text-align: left;
            font-family: inherit;
            font-size: 15px;
            font-weight: 700;
            color: #0f172a;
          }
          .hsa-faq-btn:hover { background: #f8fafc; }
          .hsa-faq-answer {
            padding: 0 22px 18px 22px;
            font-size: 14px;
            color: #475569;
            line-height: 1.65;
          }
        `}</style>

        <div className="hsa-container">
          <h1 className="hsa-page-title">Health &amp; Safety Awareness Course</h1>
          <p className="hsa-page-sub">
            To get a CSCS Green Labourer Card you need to complete the Level 1 Health and Safety in a Construction Environment course also known as One Day course.
          </p>

          {/* Card + Easy Apply */}
          <div className="hsa-hero">
            <div className="hsa-card-mock" aria-hidden="true">
              <div className="hsa-card-stripes">
                <div className="hsa-card-stripe" />
                <div className="hsa-card-stripe" />
                <div className="hsa-card-stripe" />
                <div className="hsa-card-stripe" />
              </div>
              <div className="hsa-card-body">
                <div className="hsa-card-left">
                  <div className="hsa-card-name">{displayName}</div>
                  <div className="hsa-card-chip" />
                </div>
                <div className="hsa-card-photo">
                  <img
                    src="/worker_portrait.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="hsa-card-footer">Labourer</div>
            </div>

            <form className="hsa-form-card" onSubmit={handleEasyApply} noValidate>
              <h2 className="hsa-form-title">Health &amp; Safety Awareness</h2>
              <p className="hsa-form-sub">Easy apply for Level 1 Health &amp; Safety in Construction.</p>

              <div className="hsa-field">
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`hsa-input ${errors.firstName ? "has-error" : ""}`}
                />
                {errors.firstName && <div className="hsa-error">{errors.firstName}</div>}
              </div>

              <div className="hsa-field">
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`hsa-input ${errors.lastName ? "has-error" : ""}`}
                />
                {errors.lastName && <div className="hsa-error">{errors.lastName}</div>}
              </div>

              <div className="hsa-field">
                <div className="hsa-input-wrap">
                  <span className="hsa-input-icon"><Phone size={16} /></span>
                  <input
                    name="phoneNumber"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`hsa-input has-icon ${errors.phoneNumber ? "has-error" : ""}`}
                  />
                </div>
                {errors.phoneNumber && <div className="hsa-error">{errors.phoneNumber}</div>}
              </div>

              <div className="hsa-field">
                <div className="hsa-input-wrap">
                  <span className="hsa-input-icon"><Mail size={16} /></span>
                  <input
                    name="emailAddress"
                    type="email"
                    placeholder="Email"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className={`hsa-input has-icon ${errors.emailAddress ? "has-error" : ""}`}
                  />
                </div>
                {errors.emailAddress && <div className="hsa-error">{errors.emailAddress}</div>}
              </div>

              <button type="submit" className="hsa-apply-btn">
                Easy Apply
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Online content */}
          <section className="hsa-section" id="online">
            <h2 className="hsa-section-title">
              Level 1 Award in Health &amp; Safety in a Construction Environment(Online)
            </h2>

            <ul className="hsa-check-list">
              {onlineBenefits.map((item) => (
                <li key={item}>
                  <span className="hsa-check-icon"><Check size={14} strokeWidth={3} /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="hsa-highlight">
              This qualification can be used to get a{" "}
              <a href="/cscs-green-card">CSCS Green Labourer Card</a>.
            </p>

            <p className="hsa-body">
              To get the CSCS Green Card you must complete the Health, Safety and Awareness qualification. Our online course takes half the time of a classroom course, can be completed from home, and is valid for 5 years.
            </p>
            <p className="hsa-body">
              For booking your Health &amp; Safety Awareness Course, please visit the{" "}
              <a href="/course-book">Course Page</a>.{" "}
              <a href="/health-safety-awareness#learn">Download information about the qualification</a>.
            </p>

            <h3 className="hsa-subheading">How does it work?</h3>
            <div className="hsa-steps">
              <div className="hsa-step">
                <span className="hsa-step-num">1</span>
                <p>
                  Make payment for your Health, Safety &amp; Awareness (HS&amp;A) Course safely online and receive your login details sent to your email within 24 hours.
                </p>
              </div>
              <div className="hsa-step">
                <span className="hsa-step-num">2</span>
                <p>
                  Complete the simple course from your computer in less than 6 hours and receive instant confirmation.
                </p>
              </div>
              <div className="hsa-step">
                <span className="hsa-step-num">3</span>
                <p>
                  You can use the confirmation you receive to apply for your CSCS Green Card (Valid for 5 Years).
                </p>
              </div>
            </div>

            <p className="hsa-body">
              <strong>Please note:</strong> You will need both the Health, Safety &amp; Awareness certificate and the Health, Safety &amp; Environment test score report when applying for your CSCS Green Labourer Card. This card allows you to work on UK construction sites.
            </p>

            <a href="/course-book?mode=online" className="hsa-cta hsa-cta-green">
              Book Online Course
            </a>

            <p className="hsa-body" id="learn">
              This course is for anyone working in the construction and civil engineering industry — whether you are new to the industry or an existing worker. It aims to educate workers on the hazards they may face on site and how to work safely.
            </p>
            <p className="hsa-body">What you will learn:</p>
            <ul className="hsa-bullet-list">
              {learningTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>

            <div className="hsa-faq">
              <button
                type="button"
                className="hsa-faq-btn"
                onClick={() => setFaqOpen((open) => !open)}
                aria-expanded={faqOpen}
              >
                <span>Frequently Asked Questions</span>
                <ChevronDown
                  size={18}
                  style={{
                    color: "#94a3b8",
                    flexShrink: 0,
                    transform: faqOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>
              {faqOpen && (
                <div className="hsa-faq-answer">
                  {faqs.map((faq) => (
                    <div key={faq.q} style={{ marginBottom: "18px" }}>
                      <p style={{ margin: "0 0 6px 0", fontWeight: 700, color: "#0f172a" }}>{faq.q}</p>
                      <p style={{ margin: 0 }}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Offline content */}
          <section className="hsa-section" id="offline">
            <h2 className="hsa-section-title">
              Level 1 Award in Health &amp; Safety in a Construction Environment(Offline)
            </h2>

            <p className="hsa-meta"><strong>Duration:</strong> 1 day</p>
            <p className="hsa-body">
              Includes classroom training. Final Assessment: 40 Multiple-Choice questions, 80% pass mark, 60-minute time limit.
            </p>
            <p className="hsa-body">
              The CSCS Green Card is an important requirement for labourers on UK construction sites. Completing this RQF Level 1 Award helps you meet the qualification requirements, and the award is valid for life.
            </p>

            <p className="hsa-body" style={{ marginBottom: 12 }}>
              <strong>This course is available in the following locations:</strong>
            </p>
            <ul className="hsa-bullet-list">
              {offlineLocations.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>

            <a href="/course-book?mode=centre" className="hsa-cta hsa-cta-blue">
              Book Classroom Course
            </a>

            <p className="hsa-body">
              Upon successful completion, you will receive the Level 1 Award in Health and Safety within a Construction Environment (RQF) certificate.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { createEnquiry } from "@/lib/enquiries";
import { isValidEmail, isValidPhone, isValidUkPostcode, normalizePostcode } from "@/lib/validation";
import { Mail, Phone, ArrowLeft, ArrowRight, CheckCircle, Info, ClipboardCheck, User, Truck, Lock } from "lucide-react";

// Define Zod Validation Schema for Easy Apply
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
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const [additionalData, setAdditionalData] = useState({
    citbId: "",
    addressLine1: "",
    locality: "",
    city: "",
    county: "",
    postcode: "",
  });
  const [step2Errors, setStep2Errors] = useState<Record<string, string>>({});

  useState(() => {
    if (typeof window !== "undefined") {
      const navEntries = window.performance.getEntriesByType("navigation");
      if (navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === "reload") {
        sessionStorage.removeItem("cscs_temp_form_data");
        sessionStorage.removeItem("cscs_temp_address_data");
      } else {
        const savedForm = sessionStorage.getItem("cscs_temp_form_data");
        if (savedForm) {
          try {
            const parsed = JSON.parse(savedForm);
            setFormData({
              firstName: parsed.firstName || "",
              lastName: parsed.lastName || "",
              phoneNumber: parsed.phoneNumber || "",
              emailAddress: parsed.emailAddress || "",
            });
          } catch (e) {
            console.error(e);
          }
        }
        const savedAddress = sessionStorage.getItem("cscs_temp_address_data");
        if (savedAddress) {
          try {
            const parsed = JSON.parse(savedAddress);
            setAdditionalData({
              citbId: parsed.citbId || "",
              addressLine1: parsed.addressLine1 || "",
              locality: parsed.locality || "",
              city: parsed.city || "",
              county: parsed.county || "",
              postcode: parsed.postcode || "",
            });
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (typeof window !== "undefined") {
        sessionStorage.setItem("cscs_temp_form_data", JSON.stringify(updated));
      }
      return updated;
    });
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAdditionalChange = (field: string, value: string) => {
    setAdditionalData((prev) => {
      const updated = { ...prev, [field]: value };
      if (typeof window !== "undefined") {
        sessionStorage.setItem("cscs_temp_address_data", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = easyApplySchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: FormErrors = {};
      validation.error.issues.forEach((err) => {
        const path = err.path[0] as keyof FormErrors;
        if (path) {
          fieldErrors[path] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    await createEnquiry({
      enquiry_type: "cscs_card",
      product: cardName,
      source_path: typeof window !== "undefined" ? window.location.pathname : null,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.emailAddress,
      phone: formData.phoneNumber,
      status: "in_progress",
      agreed_to_terms: false,
      payload: {
        trigger: "easy_apply",
        cardType: cardType,
        cardName,
        step: "easy_apply",
      },
    });

    router.push(`/apply-cscs?cardType=${encodeURIComponent(cardName)}`);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!additionalData.addressLine1.trim()) {
      newErrors.addressLine1 = "Please enter your house number and street name.";
    }
    if (!additionalData.city.trim()) {
      newErrors.city = "Please enter your town/city.";
    }
    if (!additionalData.county.trim()) {
      newErrors.county = "Please enter your county.";
    }
    if (!additionalData.postcode.trim()) {
      newErrors.postcode = "Postcode is required.";
    } else if (!isValidUkPostcode(additionalData.postcode)) {
      newErrors.postcode = "Enter a valid UK postcode (e.g. SW1A 1AA).";
    }

    if (Object.keys(newErrors).length > 0) {
      setStep2Errors(newErrors);
      return;
    }

    setAdditionalData((prev) => ({ ...prev, postcode: normalizePostcode(prev.postcode) }));
    setStep2Errors({});
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({ firstName: "", lastName: "", phoneNumber: "", emailAddress: "" });
    setAdditionalData({ citbId: "", addressLine1: "", locality: "", city: "", county: "", postcode: "" });
    setErrors({});
    setStep2Errors({});
  };

  const isWhiteCard = cardType === "white";
  const isGoldCard = cardType === "gold";
  const isBlackCard = cardType === "black";

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <Navbar />

      <main style={{ flexGrow: 1, paddingTop: "80px", paddingBottom: "80px", paddingLeft: "24px", paddingRight: "24px" }}>
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
            background: #e8edf2;
            border: 1px solid #d4dae3;
            border-radius: 4px;
            padding: 48px 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: none;
          }
          
          .cscs-large-mockup {
            width: 100%;
            max-width: 420px;
            height: 248px;
            border-radius: 8px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.22);
            box-sizing: border-box;
            transform: perspective(1100px) rotateY(-6deg) rotateX(3deg);
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.28),
              inset 0 -10px 24px rgba(0,0,0,0.12),
              10px 18px 28px rgba(15, 23, 42, 0.22),
              2px 4px 0 rgba(15, 23, 42, 0.06);
          }
          .cscs-large-mockup::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              125deg,
              rgba(255,255,255,0.22) 0%,
              rgba(255,255,255,0.05) 28%,
              transparent 48%,
              rgba(0,0,0,0.06) 100%
            );
            pointer-events: none;
            z-index: 2;
          }
          .cscs-large-mockup::after {
            content: "";
            position: absolute;
            top: -20%;
            left: -10%;
            width: 45%;
            height: 140%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.12),
              transparent
            );
            transform: rotate(18deg);
            pointer-events: none;
            z-index: 3;
          }
          
          .large-mockup-header {
            height: 36px;
            display: flex;
            align-items: center;
            padding: 14px 0 0 16px;
            position: relative;
            z-index: 1;
          }
          
          .large-mockup-stripes {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          
          .large-mockup-stripe {
            width: 42px;
            height: 5px;
            border-radius: 0;
            background: rgba(0,0,0,0.28);
          }
          .cscs-large-mockup-white .large-mockup-stripe {
            background: #0f172a;
          }
          
          .large-mockup-body {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 0 16px 12px 16px;
            flex-grow: 1;
            position: relative;
            z-index: 1;
          }
          
          .large-mockup-left {
            display: flex;
            flex-direction: column;
            gap: 12px;
            align-self: stretch;
            justify-content: space-between;
            padding-bottom: 4px;
            max-width: 58%;
          }
          
          .large-mockup-chip {
            width: 40px;
            height: 30px;
            border-radius: 3px;
            background: linear-gradient(145deg, #f5e6b8 0%, #c9a227 45%, #8a6d1b 100%);
            border: 1px solid rgba(0,0,0,0.18);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.45);
          }
          .cscs-large-mockup-white .large-mockup-chip {
            background: linear-gradient(145deg, #e2e8f0 0%, #94a3b8 100%);
          }
          
          .large-mockup-name {
            font-size: 13px;
            font-weight: 800;
            color: #0f172a;
            background: #f1f5f9;
            padding: 5px 8px;
            border-radius: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            letter-spacing: 0.03em;
            border: 1px solid rgba(0,0,0,0.08);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
          }
          
          .large-mockup-photo-box {
            width: 104px;
            height: 128px;
            background: #94a3b8;
            border: 2px solid #f8fafc;
            border-radius: 2px;
            overflow: hidden;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          }
          
          .large-mockup-footer {
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 15px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            border-top: 1px solid rgba(0, 0, 0, 0.12);
            position: relative;
            z-index: 1;
          }
          
          /* Easy Apply Card */
          .easy-apply-card {
            background: #ffffff;
            border: 1px solid #d4dae3;
            border-radius: 4px;
            padding: 32px 28px;
            box-shadow: none;
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
            border-top: 1px solid #d4dae3;
            padding-top: 40px;
          }
          
          .req-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 20px;
            letter-spacing: -0.02em;
          }
          
          .req-grid {
            display: flex;
            flex-direction: column;
            gap: 0;
            border: 1px solid #d4dae3;
            background: #d4dae3;
          }
          
          .req-card {
            background: #ffffff;
            border: none;
            border-radius: 0;
            padding: 18px 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            text-align: left;
            gap: 16px;
            box-shadow: none;
          }
          .req-card + .req-card {
            border-top: 1px solid #d4dae3;
          }
          
          .req-icon-wrapper {
            width: 36px;
            height: 36px;
            background: #f1f5f9;
            color: #334155;
            border-radius: 3px;
            border: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0;
            flex-shrink: 0;
          }
          
          .req-card-title {
            font-size: 15px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 0;
            flex-grow: 1;
            line-height: 1.35;
          }
          
          .req-btn {
            width: auto;
            padding: 8px 14px;
            background: transparent;
            color: #0f172a;
            border: 1px solid #94a3b8;
            border-radius: 3px;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.15s ease, border-color 0.15s ease;
            text-decoration: none;
            display: inline-block;
            white-space: nowrap;
            flex-shrink: 0;
          }
          .req-btn:hover {
            background: #0f172a;
            border-color: #0f172a;
            color: #ffffff;
          }

          /* Step 2 Form Styling */
          .step2-summary-banner {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            gap: 24px;
            margin-bottom: 40px;
          }
          @media (min-width: 640px) {
            .step2-summary-banner {
              flex-direction: row;
              align-items: center;
            }
          }
          
          .step2-banner-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px;
            border-bottom: none;
            padding-bottom: 0;
            margin-top: 0;
          }
          
          .step2-delivery-label {
            font-size: 11px;
            font-weight: 800;
            color: #94a3b8;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          
          .step2-delivery-value {
            font-size: 14px;
            font-weight: 600;
            color: #475569;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          
          .step2-note-text {
            font-size: 13px;
            font-weight: 700;
            color: #64748b;
            margin: 0;
          }
          .step2-note-highlight {
            font-weight: 400;
            color: #64748b;
          }

          .step2-section-heading {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            margin-top: 36px;
            margin-bottom: 20px;
            letter-spacing: -0.02em;
            border-bottom: none;
            padding-bottom: 0;
          }

          .step2-input-group {
            margin-bottom: 24px;
          }

          .step2-button-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 40px;
            padding-top: 24px;
            border-top: 1px solid #e2e8f0;
          }

          .step2-btn-back {
            background: #f43f5e;
            color: #ffffff;
            font-weight: 700;
            font-size: 14px;
            padding: 12px 24px;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
          }
          .step2-btn-back:hover {
            background: #e11d48;
            transform: translateY(-1px);
          }
          .step2-btn-back:active {
            transform: translateY(0);
          }

          .step2-btn-submit {
            background: #10b981;
            color: #ffffff;
            font-weight: 700;
            font-size: 14px;
            padding: 12px 24px;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
            text-decoration: none;
          }
          .step2-btn-submit:hover {
            background: #059669;
            transform: translateY(-1px);
            box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
          }
          .step2-btn-submit:active {
            transform: translateY(0);
          }

          .cscs-mockup {
            width: 92%;
            max-width: 300px;
            height: 170px;
            border-radius: 7px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            flex-shrink: 0;
            transform: perspective(900px) rotateY(-4deg) rotateX(2deg);
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.25),
              inset 0 -8px 18px rgba(0,0,0,0.1),
              6px 12px 20px rgba(15, 23, 42, 0.18);
          }
          .cscs-mockup::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              125deg,
              rgba(255,255,255,0.2) 0%,
              transparent 42%,
              rgba(0,0,0,0.05) 100%
            );
            pointer-events: none;
            z-index: 2;
          }
          
          .mockup-header {
            height: 24px;
            display: flex;
            align-items: center;
            padding: 10px 0 0 10px;
            position: relative;
            z-index: 1;
          }
          
          .mockup-stripes {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }
          .mockup-stripe {
            width: 22px;
            height: 3px;
            border-radius: 0;
            background: rgba(0,0,0,0.28);
          }
          
          .mockup-card-white .mockup-stripe {
            background: #0f172a;
          }
          
          .mockup-body {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 0 10px 8px 10px;
            flex-grow: 1;
            position: relative;
            z-index: 1;
          }
          
          .mockup-left {
            max-width: 60%;
            display: flex;
            flex-direction: column;
            gap: 6px;
            align-self: stretch;
            justify-content: space-between;
            padding-bottom: 4px;
          }
          
          .mockup-chip {
            width: 26px;
            height: 20px;
            background: linear-gradient(145deg, #f5e6b8 0%, #c9a227 45%, #8a6d1b 100%);
            border-radius: 2px;
            border: 1px solid rgba(0,0,0,0.15);
          }
          
          .mockup-name {
            font-size: 9px;
            font-weight: 800;
            color: #0f172a;
            background: #f1f5f9;
            padding: 2px 5px;
            border-radius: 1px;
            white-space: nowrap;
            letter-spacing: 0.02em;
            border: 1px solid rgba(0,0,0,0.08);
          }
          
          .mockup-photo-box {
            width: 60px;
            height: 74px;
            background: #94a3b8;
            border: 1.5px solid #f8fafc;
            border-radius: 1px;
            overflow: hidden;
            flex-shrink: 0;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
          }
          .mockup-photo {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .mockup-footer {
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            border-top: 1px solid rgba(0, 0, 0, 0.12);
            position: relative;
            z-index: 1;
          }

          /* Step 3 Confirm and Pay Page Styles */
          .step3-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 32px;
            align-items: start;
            margin-top: 24px;
          }
          @media (min-width: 992px) {
            .step3-container {
              grid-template-columns: 1.8fr 1.2fr;
            }
          }

          .step3-header-box {
            margin-bottom: 32px;
          }

          .step3-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 32px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 12px;
            letter-spacing: -0.02em;
          }

          .step3-subtitle {
            font-size: 15px;
            color: #64748b;
            line-height: 1.6;
          }

          .step3-details-panel {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 32px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }

          .step3-section-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 32px;
            border-bottom: none;
            padding-bottom: 0;
            margin-top: 0;
          }

          .step3-check-icon {
            color: #6366f1;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .step3-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 28px;
            margin-bottom: 36px;
          }

          .step3-field-label {
            font-size: 11px;
            font-weight: 800;
            color: #94a3b8;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 8px;
            display: block;
          }

          .step3-field-value {
            font-size: 15px;
            font-weight: 700;
            color: #1e293b;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .step3-field-icon {
            color: #64748b;
            flex-shrink: 0;
          }

          .step3-sidebar {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 32px;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .step3-btn-pay {
            background: #10b981;
            color: #ffffff;
            font-weight: 700;
            font-size: 15px;
            padding: 14px 28px;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            display: block;
            width: 100%;
            box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
            text-decoration: none;
          }
          .step3-btn-pay:hover {
            background: #059669;
            transform: translateY(-1px);
            box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
          }
          .step3-btn-pay:active {
            transform: translateY(0);
          }

          .step3-btn-update {
            background: #2563eb;
            color: #ffffff;
            font-weight: 700;
            font-size: 15px;
            padding: 14px 28px;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            display: block;
            width: 100%;
            box-shadow: 0 4px 10px rgba(37, 99, 235, 0.15);
            text-decoration: none;
          }
          .step3-btn-update:hover {
            background: #1d4ed8;
            transform: translateY(-1px);
            box-shadow: 0 6px 12px rgba(37, 99, 235, 0.25);
          }
          .step3-btn-update:active {
            transform: translateY(0);
          }

          .step3-secure-badge {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-size: 12px;
            color: #64748b;
            margin-top: 12px;
          }

          .detail-container.step3-wide-container {
            max-width: 1200px !important;
          }

          .step3-summary-banner {
            display: flex;
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }
          @media (min-width: 768px) {
            .step3-summary-banner {
              flex-direction: row !important;
              align-items: center !important;
              justify-content: space-between !important;
            }
          }
        `}</style>

        <div className={`detail-container ${step === 3 ? "step3-wide-container" : ""}`}>
          {step === 1 && (
            <>
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
                        <div className="large-mockup-stripe" />
                        <div className="large-mockup-stripe" />
                        <div className="large-mockup-stripe" />
                        <div className="large-mockup-stripe" />
                      </div>
                    </div>

                    <div className="large-mockup-body">
                      <div className="large-mockup-left">
                        <div className="large-mockup-chip" />
                        <div className="large-mockup-name">
                          {(formData.firstName || formData.lastName) ? `${formData.firstName} ${formData.lastName}`.toUpperCase() : "FIRSTNAME SURNAME"}
                        </div>
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
            </>
          )}

          {step === 2 && (
            <div style={{ maxWidth: "900px", margin: "0 auto", paddingBottom: "60px" }}>
              {/* Top Summary Banner */}
              <div className="step2-summary-banner">
                <div>
                  <h3 className="step2-banner-title">{cardName}</h3>
                  <p className="step2-delivery-label">DELIVERY</p>
                  <div className="step2-delivery-value">
                    <span>📍 10 days after approval.</span>
                  </div>
                  <p className="step2-note-text">
                    Please Note: <span className="step2-note-highlight">a digital version is available immediately upon approval in the My CSCS app.</span>
                  </p>
                </div>
                
                {/* Mini card mockup */}
                <div 
                  className={`cscs-mockup ${isWhiteCard ? "mockup-card-white" : ""}`}
                  style={{ background: bgHex }}
                >
                  <div className="mockup-header">
                    <div className="mockup-stripes">
                      <div className="mockup-stripe" />
                      <div className="mockup-stripe" />
                      <div className="mockup-stripe" />
                      <div className="mockup-stripe" />
                    </div>
                  </div>
                  <div className="mockup-body">
                    <div className="mockup-left">
                      <div className="mockup-chip" />
                      <div className="mockup-name">
                        {(formData.firstName || formData.lastName) ? `${formData.firstName} ${formData.lastName}`.toUpperCase() : "FIRSTNAME SURNAME"}
                      </div>
                    </div>
                    <div className="mockup-photo-box">
                      <img 
                        src="/worker_portrait.png" 
                        alt="" 
                        className="mockup-photo" 
                      />
                    </div>
                  </div>
                  <div 
                    className="mockup-footer"
                    style={{ 
                      background: isWhiteCard ? "#cbd5e1" : (isGoldCard ? "#92400e" : (isBlackCard ? "#1e293b" : "rgba(255,255,255,0.25)")),
                      color: isWhiteCard ? "#0f172a" : "#ffffff"
                    }}
                  >
                    {subhead}
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleStep2Submit} noValidate>
                {/* Additional Information */}
                <div className="step2-input-group">
                  <h2 className="step2-section-heading">Additional Information</h2>
                  <div className="flex flex-col gap-2" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className="field-label" style={{ marginBottom: 0 }}>CITB Testing ID(If available)</label>
                    <input
                      type="text"
                      placeholder="eg. CITB000792164"
                      value={additionalData.citbId}
                      onChange={(e) => handleAdditionalChange("citbId", e.target.value)}
                      className="input-control"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="step2-input-group" style={{ marginTop: "32px" }}>
                  <h2 className="step2-section-heading">Address</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <input
                        type="text"
                        placeholder="House number and Street name..."
                        value={additionalData.addressLine1}
                        onChange={(e) => {
                          handleAdditionalChange("addressLine1", e.target.value);
                          if (step2Errors.addressLine1) setStep2Errors(prev => ({ ...prev, addressLine1: "" }));
                        }}
                        className={`input-control ${step2Errors.addressLine1 ? "has-error" : ""}`}
                      />
                      {step2Errors.addressLine1 && <div className="error-text">{step2Errors.addressLine1}</div>}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Locality(Optional)"
                        value={additionalData.locality}
                        onChange={(e) => handleAdditionalChange("locality", e.target.value)}
                        className="input-control"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Town/City"
                        value={additionalData.city}
                        onChange={(e) => {
                          handleAdditionalChange("city", e.target.value);
                          if (step2Errors.city) setStep2Errors(prev => ({ ...prev, city: "" }));
                        }}
                        className={`input-control ${step2Errors.city ? "has-error" : ""}`}
                      />
                      {step2Errors.city && <div className="error-text">{step2Errors.city}</div>}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="County"
                        value={additionalData.county}
                        onChange={(e) => {
                          handleAdditionalChange("county", e.target.value);
                          if (step2Errors.county) setStep2Errors(prev => ({ ...prev, county: "" }));
                        }}
                        className={`input-control ${step2Errors.county ? "has-error" : ""}`}
                      />
                      {step2Errors.county && <div className="error-text">{step2Errors.county}</div>}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Postcode"
                        value={additionalData.postcode}
                        onChange={(e) => {
                          handleAdditionalChange("postcode", e.target.value);
                          if (step2Errors.postcode) setStep2Errors(prev => ({ ...prev, postcode: "" }));
                        }}
                        className={`input-control ${step2Errors.postcode ? "has-error" : ""}`}
                      />
                      {step2Errors.postcode && <div className="error-text">{step2Errors.postcode}</div>}
                    </div>
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="step2-button-row">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="step2-btn-back"
                  >
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="step2-btn-submit"
                  >
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "60px" }}>
              <div className="step3-header-box">
                <h1 className="step3-title">Confirm and Pay - CSCS Card</h1>
                <p className="step3-subtitle">
                  Please review your booking details below. A confirmation will be sent to your email upon successful payment.
                </p>
              </div>

              <div className="step3-container">
                {/* Left panel */}
                <div className="step3-details-panel">
                  <h2 className="step3-section-title">
                    <span className="step3-check-icon">
                      <CheckCircle size={22} style={{ color: "#6366f1" }} />
                    </span>
                    <span>Confirm Details</span>
                  </h2>

                  <div className="step3-grid">
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div>
                          <span className="step3-field-label">NAME</span>
                          <span className="step3-field-value">
                            <User size={16} className="step3-field-icon" />
                            <span>{formData.firstName} {formData.lastName}</span>
                          </span>
                        </div>
                        <div>
                          <span className="step3-field-label">EMAIL ADDRESS</span>
                          <span className="step3-field-value" style={{ wordBreak: "break-all" }}>
                            <Mail size={16} className="step3-field-icon" />
                            <span>{formData.emailAddress}</span>
                          </span>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
                        <div>
                          <span className="step3-field-label">APPLICATION TYPE</span>
                          <span className="step3-field-value" style={{ textTransform: "capitalize" }}>
                            <span>New</span>
                          </span>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
                        <div>
                          <span className="step3-field-label">DELIVER TO</span>
                          <span className="step3-field-value">
                            <Truck size={18} className="step3-field-icon" />
                            <span>
                              {additionalData.addressLine1}
                              {additionalData.locality ? `, ${additionalData.locality}` : ""}
                              {`, ${additionalData.city}, ${additionalData.county} - ${additionalData.postcode}`}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Banner at the bottom of left panel */}
                  <div className="step2-summary-banner step3-summary-banner" style={{ marginBottom: 0, marginTop: "40px" }}>
                    <div>
                      <h3 className="step2-banner-title">{cardName}</h3>
                      <p className="step2-delivery-label">DELIVERY</p>
                      <div className="step2-delivery-value">
                        <span>📍 10 days after approval.</span>
                      </div>
                      <p className="step2-note-text">
                        Please Note: <span className="step2-note-highlight">a digital version is available immediately upon approval in the My CSCS app.</span>
                      </p>
                    </div>

                    {/* Mini Card Mockup */}
                    <div 
                      className={`cscs-mockup ${isWhiteCard ? "mockup-card-white" : ""}`}
                      style={{ background: bgHex }}
                    >
                  <div className="mockup-header">
                    <div className="mockup-stripes">
                      <div className="mockup-stripe" />
                      <div className="mockup-stripe" />
                      <div className="mockup-stripe" />
                      <div className="mockup-stripe" />
                    </div>
                  </div>
                  <div className="mockup-body">
                    <div className="mockup-left">
                      <div className="mockup-chip" />
                      <div className="mockup-name">
                        {`${formData.firstName} ${formData.lastName}`.toUpperCase()}
                      </div>
                    </div>
                    <div className="mockup-photo-box">
                      <img 
                        src="/worker_portrait.png" 
                        alt="" 
                        className="mockup-photo"
                      />
                    </div>
                  </div>
                      <div 
                        className="mockup-footer"
                        style={{ 
                          background: isWhiteCard ? "#cbd5e1" : (isGoldCard ? "#92400e" : (isBlackCard ? "#1e293b" : "rgba(255,255,255,0.25)")),
                          color: isWhiteCard ? "#0f172a" : "#ffffff"
                        }}
                      >
                        {subhead}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right panel (Sidebar buttons) */}
                <div className="step3-sidebar">
                  <button 
                    onClick={() => setStep(4)} 
                    className="step3-btn-pay"
                  >
                    Confirm and Pay
                  </button>
                  <button 
                    onClick={() => setStep(1)} 
                    className="step3-btn-update"
                  >
                    Update Details
                  </button>
                  <div className="step3-secure-badge">
                    <Lock size={14} />
                    <span>Secure SSL Payment</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ textAlign: "center", padding: "48px 0", maxWidth: "600px", margin: "0 auto" }}>
              <div 
                style={{ 
                  width: "80px", 
                  height: "80px", 
                  background: "#ecfdf5", 
                  color: "#10b981", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  margin: "0 auto 24px auto",
                  border: "2px solid #a7f3d0"
                }}
              >
                <ClipboardCheck size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-4 font-serif">Application Submitted</h2>
              <p className="max-w-md mx-auto text-slate-500 mb-8 leading-relaxed">
                Thank you, <strong>{formData.firstName} {formData.lastName}</strong>! Your application for the <strong>{cardName}</strong> has been received successfully.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left mb-8 text-sm text-slate-600 space-y-2">
                <p><strong>Email:</strong> {formData.emailAddress}</p>
                <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                {additionalData.citbId && <p><strong>CITB ID:</strong> {additionalData.citbId}</p>}
                <p><strong>Address:</strong> {additionalData.addressLine1}, {additionalData.locality ? additionalData.locality + ", " : ""}{additionalData.city}, {additionalData.county}, {additionalData.postcode}</p>
              </div>
              <button 
                onClick={handleReset}
                className="easy-apply-btn"
                style={{ maxWidth: "240px", margin: "0 auto" }}
              >
                Apply for another card
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

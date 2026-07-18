"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, Calendar, ClipboardCheck, ArrowLeft, Send, User, Truck, Lock, CheckCircle } from "lucide-react";

// Define Zod Validation Schema
const cscsFormSchema = z.object({
  title: z.string().min(1, { message: "Please select a title." }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  dobDay: z.string().min(1, { message: "Please select a birth day." }),
  dobMonth: z.string().min(1, { message: "Please select a birth month." }),
  dobYear: z.string().min(1, { message: "Please select a birth year." }),
  niNumber: z.string().optional(),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  emailAddress: z.string().email({ message: "Please enter a valid email address." }),
  applicationType: z.enum(["new", "renew", "lost"] as const, {
    message: "Please select an application type.",
  }),
  occupation: z.string().min(2, { message: "Please enter your occupation." }),
  cardType: z.string().min(2, { message: "Please enter the required card type (e.g. Green, Blue)." }),
  agreedToTerms: z.literal(true, {
    message: "You must agree to the Terms and Conditions and Privacy Policy.",
  }),
});


type FormErrors = {
  [key in keyof z.infer<typeof cscsFormSchema>]?: string;
};

function ApplyCscsForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    niNumber: "",
    phoneNumber: "",
    emailAddress: "",
    applicationType: "" as "" | "new" | "renew" | "lost",
    occupation: "",
    cardType: "",
    agreedToTerms: false,
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

  useEffect(() => {
    const cardParam = searchParams.get("cardType");
    if (cardParam) {
      setFormData((prev) => ({
        ...prev,
        cardType: cardParam,
        occupation: cardParam.toLowerCase().includes("labourer") ? "Labourer" :
                    cardParam.toLowerCase().includes("skilled") ? "Skilled Worker" :
                    cardParam.toLowerCase().includes("supervisor") ? "Supervisor" :
                    cardParam.toLowerCase().includes("manager") ? "Manager" :
                    cardParam.toLowerCase().includes("experienced") ? "Experienced Worker" :
                    cardParam.toLowerCase().includes("trainee") ? "Trainee" : ""
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const navEntries = window.performance.getEntriesByType("navigation");
      if (navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === "reload") {
        sessionStorage.removeItem("cscs_temp_form_data");
        sessionStorage.removeItem("cscs_temp_address_data");
        return;
      }

      const savedForm = sessionStorage.getItem("cscs_temp_form_data");
      if (savedForm) {
        try {
          const parsed = JSON.parse(savedForm);
          setFormData((prev) => ({
            ...prev,
            title: parsed.title || prev.title,
            firstName: parsed.firstName || prev.firstName,
            middleName: parsed.middleName || prev.middleName,
            lastName: parsed.lastName || prev.lastName,
            dobDay: parsed.dobDay || prev.dobDay,
            dobMonth: parsed.dobMonth || prev.dobMonth,
            dobYear: parsed.dobYear || prev.dobYear,
            niNumber: parsed.niNumber || prev.niNumber,
            phoneNumber: parsed.phoneNumber || prev.phoneNumber,
            emailAddress: parsed.emailAddress || prev.emailAddress,
            applicationType: parsed.applicationType || prev.applicationType,
            occupation: parsed.occupation || prev.occupation,
            cardType: parsed.cardType || prev.cardType,
          }));
        } catch (e) {
          console.error(e);
        }
      }

      const savedAddress = sessionStorage.getItem("cscs_temp_address_data");
      if (savedAddress) {
        try {
          const parsed = JSON.parse(savedAddress);
          setAdditionalData((prev) => ({
            ...prev,
            citbId: parsed.citbId || prev.citbId,
            addressLine1: parsed.addressLine1 || prev.addressLine1,
            locality: parsed.locality || prev.locality,
            city: parsed.city || prev.city,
            county: parsed.county || prev.county,
            postcode: parsed.postcode || prev.postcode,
          }));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const getCardStyle = (cardName: string) => {
    const name = cardName.toLowerCase();
    if (name.includes("green") || name.includes("labourer")) {
      return { bgHex: "#047857", subhead: "LABOURER", isWhite: false, isGold: false, isBlack: false };
    }
    if (name.includes("blue") || name.includes("skilled")) {
      return { bgHex: "#1d4ed8", subhead: "SKILLED WORKER", isWhite: false, isGold: false, isBlack: false };
    }
    if (name.includes("red") || name.includes("provisional") || name.includes("trainee") || name.includes("experienced")) {
      return { bgHex: "#b91c1c", subhead: "PROVISIONAL / TRAINEE", isWhite: false, isGold: false, isBlack: false };
    }
    if (name.includes("gold") || name.includes("supervisor") || name.includes("advanced")) {
      return { bgHex: "#b45309", subhead: "SUPERVISOR", isWhite: false, isGold: true, isBlack: false };
    }
    if (name.includes("black") || name.includes("manager")) {
      return { bgHex: "#0f172a", subhead: "MANAGER", isWhite: false, isGold: false, isBlack: true };
    }
    if (name.includes("white") || name.includes("pqp") || name.includes("aqp")) {
      return { bgHex: "#f1f5f9", subhead: "QUALIFIED PERSON", isWhite: true, isGold: false, isBlack: false };
    }
    return { bgHex: "#64748b", subhead: "CSCS CARD", isWhite: false, isGold: false, isBlack: false };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => {
      const updated = { ...prev, [name]: val };
      if (typeof window !== "undefined") {
        sessionStorage.setItem("cscs_temp_form_data", JSON.stringify(updated));
      }
      return updated;
    });
    // Clear error for this field dynamically
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRadioChange = (val: "new" | "renew" | "lost") => {
    setFormData((prev) => {
      const updated = { ...prev, applicationType: val };
      if (typeof window !== "undefined") {
        sessionStorage.setItem("cscs_temp_form_data", JSON.stringify(updated));
      }
      return updated;
    });
    if (errors.applicationType) {
      setErrors((prev) => ({ ...prev, applicationType: undefined }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = cscsFormSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: FormErrors = {};
      validation.error.issues.forEach((err) => {
        const path = err.path[0] as keyof FormErrors;
        if (path) {
          fieldErrors[path] = err.message;
        }
      });
      setErrors(fieldErrors);
      // Scroll to the first error
      const firstErrorKey = Object.keys(fieldErrors)[0];
      const errorElement = document.getElementsByName(firstErrorKey)[0];
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setErrors({});
    setStep(2);
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
      newErrors.postcode = "Please enter your postcode.";
    }

    if (Object.keys(newErrors).length > 0) {
      setStep2Errors(newErrors);
      return;
    }

    setStep2Errors({});
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      niNumber: "",
      phoneNumber: "",
      emailAddress: "",
      applicationType: "",
      occupation: "",
      cardType: "",
      agreedToTerms: false,
    });
    setAdditionalData({ citbId: "", addressLine1: "", locality: "", city: "", county: "", postcode: "" });
    setErrors({});
    setStep2Errors({});
  };

  // Generate lists for Date of Birth selectors
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => String(currentYear - 14 - i)); // Must be at least 14 years old to work on site

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <Navbar />
      
      <main style={{ flexGrow: 1, paddingTop: "80px", paddingBottom: "80px", paddingLeft: "24px", paddingRight: "24px" }}>
        <style>{`
          .form-container {
            max-width: 800px;
            margin: 0 auto;
          }
          
          .form-header-box {
            margin-bottom: 32px;
          }
          
          .form-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 32px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px;
          }
          
          .form-subtitle {
            font-size: 14px;
            color: #64748b;
            line-height: 1.5;
          }
          
          .form-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.025);
          }
          
          .form-section {
            margin-bottom: 36px;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 32px;
          }
          .form-section:last-of-type {
            border-bottom: none;
            padding-bottom: 0;
            margin-bottom: 24px;
          }
          
          .section-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 24px;
            letter-spacing: -0.02em;
          }
          
          .form-row {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 20px;
          }
          @media (min-width: 640px) {
            .form-row-3 {
              grid-template-columns: 1fr 1.2fr 1.2fr;
            }
            .form-row-dob {
              grid-template-columns: 1fr 1.5fr 1.2fr;
            }
          }
          
          .field-label {
            font-size: 14px;
            font-weight: 700;
            color: #334155;
            margin-bottom: 8px;
            display: block;
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
          
          .input-prefix {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #475569;
            font-weight: 700;
            font-size: 14px;
            pointer-events: none;
            line-height: 1;
            display: flex;
            align-items: center;
          }
          .input-wrapper .input-prefix ~ input {
            padding-left: 60px !important;
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
          
          .input-control.has-error:focus {
            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
          }
          
          .field-note {
            font-size: 11px;
            color: #64748b;
            margin-top: 6px;
            line-height: 1.4;
          }
          
          .error-text {
            font-size: 12.5px;
            color: #ef4444;
            margin-top: 6px;
            font-weight: 600;
          }
          
          /* Radios Layout */
          .radio-group {
            display: flex;
            gap: 24px;
            flex-wrap: wrap;
            margin-top: 8px;
          }
          
          .radio-label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #334155;
            cursor: pointer;
            user-select: none;
          }
          
          .radio-input {
            width: 18px;
            height: 18px;
            accent-color: #2563eb;
            cursor: pointer;
          }
          
          /* Checkbox Agreement */
          .checkbox-label {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            font-size: 14px;
            color: #475569;
            cursor: pointer;
            line-height: 1.4;
          }
          
          .checkbox-input {
            width: 18px;
            height: 18px;
            margin-top: 2px;
            accent-color: #2563eb;
            cursor: pointer;
            flex-shrink: 0;
          }
          
          /* Action Buttons */
          .btn-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 32px;
            gap: 16px;
          }
          
          .btn-back {
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 15px;
            background: #ffffff;
            color: #64748b;
            border: 1px solid #cbd5e1;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }
          .btn-back:hover {
            background: #f8fafc;
            color: #0f172a;
            border-color: #94a3b8;
          }
          
          .btn-submit {
            padding: 12px 28px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 15px;
            background: #10b981;
            color: #ffffff;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
          }
          .btn-submit:hover {
            background: #059669;
            transform: translateY(-1px);
            box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
          }
          
          /* Success Card Layout */
          .success-card {
            text-align: center;
            padding: 48px 24px;
          }
          .success-badge {
            width: 72px;
            height: 72px;
            background: #ecfdf5;
            color: #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px auto;
            border: 2px solid #a7f3d0;
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
            border-radius: 10px;
            position: relative;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            flex-shrink: 0;
          }
          
          .mockup-header {
            height: 24px;
            display: flex;
            align-items: center;
            padding: 0 8px;
            position: relative;
          }
          
          .mockup-stripes {
            display: flex;
            gap: 2px;
          }
          .mockup-stripe {
            width: 8px;
            height: 4px;
            border-radius: 1px;
          }
          
          .mockup-card-white .mockup-stripe {
            background: #000000;
          }
          
          .mockup-body {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 0 12px 6px 12px;
            flex-grow: 1;
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
            width: 28px;
            height: 22px;
            background: #cbd5e1;
            border-radius: 3px;
          }
          
          .mockup-name {
            font-size: 9px;
            font-weight: 800;
            color: #000000;
            background: rgba(255, 255, 255, 0.85);
            padding: 2px 4px;
            border-radius: 2px;
            white-space: nowrap;
            letter-spacing: 0.02em;
          }
          
          .mockup-photo-box {
            width: 64px;
            height: 78px;
            background: #cbd5e1;
            border: 1.5px solid #ffffff;
            border-radius: 5px;
            overflow: hidden;
            flex-shrink: 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          }
          .mockup-photo {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .mockup-footer {
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 11.5px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-top: 1px solid rgba(0, 0, 0, 0.08);
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

          .form-container.step3-wide-container {
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

        <div className={`form-container ${step === 3 ? "step3-wide-container" : ""}`}>
          {step === 1 && (
            <div className="form-header-box">
              <h1 className="form-title">Apply For CSCS Card</h1>
              <p className="form-subtitle">
                Please fill out this form carefully and ensure all information provided is accurate and complete.
              </p>
            </div>
          )}

          <div className="form-card">
            {step === 1 && (
              <form onSubmit={handleSubmit} noValidate>
                {/* Section 1: Personal Details */}
                <div className="form-section">
                  <h3 className="section-title">Personal Details</h3>
                  
                  <div className="form-row">
                    <div>
                      <label className="field-label">Title*</label>
                      <select
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`input-control ${errors.title ? "has-error" : ""}`}
                        required
                      >
                        <option value="">Select Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms</option>
                        <option value="Dr">Dr</option>
                      </select>
                      {errors.title && <div className="error-text">{errors.title}</div>}
                    </div>
                  </div>

                  <div className="form-row-3 form-row">
                    <div>
                      <label className="field-label">First Name*</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="e.g. John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`input-control ${errors.firstName ? "has-error" : ""}`}
                        required
                      />
                      {errors.firstName && <div className="error-text">{errors.firstName}</div>}
                    </div>

                    <div>
                      <label className="field-label">Middle Name(s)</label>
                      <input
                        type="text"
                        name="middleName"
                        placeholder="Optional"
                        value={formData.middleName}
                        onChange={handleInputChange}
                        className="input-control"
                      />
                    </div>

                    <div>
                      <label className="field-label">Last Name*</label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="e.g. Smith"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`input-control ${errors.lastName ? "has-error" : ""}`}
                        required
                      />
                      {errors.lastName && <div className="error-text">{errors.lastName}</div>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div>
                      <label className="field-label">Date of Birth*</label>
                      <div className="form-row-dob form-row">
                        <select
                          name="dobDay"
                          value={formData.dobDay}
                          onChange={handleInputChange}
                          className={`input-control ${errors.dobDay ? "has-error" : ""}`}
                          required
                        >
                          <option value="">Day</option>
                          {days.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                        <select
                          name="dobMonth"
                          value={formData.dobMonth}
                          onChange={handleInputChange}
                          className={`input-control ${errors.dobMonth ? "has-error" : ""}`}
                          required
                        >
                          <option value="">Month</option>
                          {months.map((m) => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                          ))}
                        </select>
                        <select
                          name="dobYear"
                          value={formData.dobYear}
                          onChange={handleInputChange}
                          className={`input-control ${errors.dobYear ? "has-error" : ""}`}
                          required
                        >
                          <option value="">Year</option>
                          {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>
                      {(errors.dobDay || errors.dobMonth || errors.dobYear) && (
                        <div className="error-text">Please select a valid date of birth.</div>
                      )}
                    </div>
                  </div>

                  <div className="form-row" style={{ marginTop: "20px" }}>
                    <div>
                      <label className="field-label">National Insurance Number (Optional)</label>
                      <input
                        type="text"
                        name="niNumber"
                        placeholder="e.g. QQ 123456 C"
                        value={formData.niNumber}
                        onChange={handleInputChange}
                        className="input-control"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact Details */}
                <div className="form-section">
                  <h3 className="section-title">Contact Details</h3>
                  
                  <div className="form-row">
                    <div>
                      <label className="field-label">Phone Number*</label>
                      <div className="input-wrapper">
                        <span className="input-prefix">+44</span>
                        <input
                          type="tel"
                          name="phoneNumber"
                          placeholder="e.g. 2080995236"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className={`input-control ${errors.phoneNumber ? "has-error" : ""}`}
                          style={{ paddingLeft: "60px" }}
                          required
                        />
                      </div>
                      {errors.phoneNumber && <div className="error-text">{errors.phoneNumber}</div>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div>
                      <label className="field-label">Email Address*</label>
                      <div className="input-wrapper">
                        <Mail className="input-icon" size={16} />
                        <input
                          type="email"
                          name="emailAddress"
                          placeholder="yourname@domain.com"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          className={`input-control ${errors.emailAddress ? "has-error" : ""}`}
                          style={{ paddingLeft: "48px" }}
                          required
                        />
                      </div>
                      {errors.emailAddress && <div className="error-text">{errors.emailAddress}</div>}
                    </div>
                  </div>
                </div>

                {/* Section 3: Card Details */}
                <div className="form-section">
                  <h3 className="section-title">Card Details</h3>
                  
                  <div className="form-row">
                    <div>
                      <label className="field-label">Application Type*</label>
                      <div className="radio-group">
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="applicationType"
                            checked={formData.applicationType === "new"}
                            onChange={() => handleRadioChange("new")}
                            className="radio-input"
                          />
                          <span>New Card</span>
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="applicationType"
                            checked={formData.applicationType === "renew"}
                            onChange={() => handleRadioChange("renew")}
                            className="radio-input"
                          />
                          <span>Renew Card</span>
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="applicationType"
                            checked={formData.applicationType === "lost"}
                            onChange={() => handleRadioChange("lost")}
                            className="radio-input"
                          />
                          <span>Lost/Stolen</span>
                        </label>
                      </div>
                      {errors.applicationType && <div className="error-text">{errors.applicationType}</div>}
                    </div>
                  </div>

                  <div className="form-row" style={{ marginTop: "12px" }}>
                    <div>
                      <label className="field-label">Occupation*</label>
                      <input
                        type="text"
                        name="occupation"
                        placeholder="e.g. Bricklayer"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        className={`input-control ${errors.occupation ? "has-error" : ""}`}
                        required
                      />
                      {errors.occupation && <div className="error-text">{errors.occupation}</div>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div>
                      <label className="field-label">Card Type*</label>
                      <div className="input-wrapper">
                        <input
                          type="text"
                          name="cardType"
                          placeholder="Green, Blue, Black, etc"
                          value={formData.cardType}
                          onChange={handleInputChange}
                          className={`input-control ${errors.cardType ? "has-error" : ""}`}
                          required
                        />
                      </div>
                      {errors.cardType && <div className="error-text">{errors.cardType}</div>}
                    </div>
                  </div>
                </div>

                {/* Section 4: Terms Checkbox */}
                <div style={{ marginTop: "12px" }}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleInputChange}
                      className="checkbox-input"
                      required
                    />
                    <span>I have read and agree to the Terms and Conditions and Privacy Policy</span>
                  </label>
                  {errors.agreedToTerms && <div className="error-text">{errors.agreedToTerms}</div>}
                </div>

                {/* Footer buttons */}
                <div className="btn-row">
                  <button type="button" onClick={() => router.push("/")} className="btn-back">
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button 
                    type="submit" 
                    className="btn-submit"
                    disabled={!formData.agreedToTerms}
                    style={{ opacity: formData.agreedToTerms ? 1 : 0.5, cursor: formData.agreedToTerms ? "pointer" : "not-allowed" }}
                  >
                    <span>Next Step</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div style={{ padding: "8px 0" }}>
                {/* Top Summary Banner */}
                {(() => {
                  const cardStyle = getCardStyle(formData.cardType);
                  return (
                    <div className="step2-summary-banner">
                      <div>
                        <h3 className="step2-banner-title">{formData.cardType || "CSCS Card"}</h3>
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
                        className={`cscs-mockup ${cardStyle.isWhite ? "mockup-card-white" : ""}`}
                        style={{ background: cardStyle.bgHex }}
                      >
                        <div className="mockup-header">
                          <div className="mockup-stripes">
                            <div className="mockup-stripe" style={{ background: cardStyle.isWhite ? "#000000" : "rgba(0,0,0,0.15)", width: "10px", height: "3px" }}></div>
                            <div className="mockup-stripe" style={{ background: cardStyle.isWhite ? "#000000" : "rgba(0,0,0,0.15)", width: "10px", height: "3px" }}></div>
                            <div className="mockup-stripe" style={{ background: cardStyle.isWhite ? "#000000" : "rgba(0,0,0,0.15)", width: "10px", height: "3px" }}></div>
                          </div>
                        </div>
                        <div className="mockup-body">
                          <div className="mockup-left">
                            <div className="mockup-chip" style={{ background: cardStyle.isWhite ? "#cbd5e1" : "rgba(255,255,255,0.4)" }}></div>
                            <div className="mockup-name" style={{ color: cardStyle.isWhite ? "#0f172a" : "#000000" }}>
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
                            background: cardStyle.isWhite ? "#cbd5e1" : (cardStyle.isGold ? "#92400e" : (cardStyle.isBlack ? "#1e293b" : "rgba(255,255,255,0.25)")),
                            color: cardStyle.isWhite ? "#0f172a" : "#ffffff"
                          }}
                        >
                          {cardStyle.subhead}
                        </div>
                      </div>
                    </div>
                  );
                })()}

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
              (() => {
                const cardStyle = getCardStyle(formData.cardType);
                return (
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
                                  <span>{formData.applicationType}</span>
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
                            <h3 className="step2-banner-title">{formData.cardType || "CSCS Card"}</h3>
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
                            className={`cscs-mockup ${cardStyle.isWhite ? "mockup-card-white" : ""}`}
                            style={{ background: cardStyle.bgHex }}
                          >
                            <div className="mockup-header">
                              <div className="mockup-stripes">
                                <div className="mockup-stripe" style={{ background: cardStyle.isWhite ? "#000000" : "rgba(0,0,0,0.15)", width: "10px", height: "3px" }}></div>
                                <div className="mockup-stripe" style={{ background: cardStyle.isWhite ? "#000000" : "rgba(0,0,0,0.15)", width: "10px", height: "3px" }}></div>
                                <div className="mockup-stripe" style={{ background: cardStyle.isWhite ? "#000000" : "rgba(0,0,0,0.15)", width: "10px", height: "3px" }}></div>
                              </div>
                            </div>
                            <div className="mockup-body">
                              <div className="mockup-left">
                                <div className="mockup-chip" style={{ background: cardStyle.isWhite ? "#cbd5e1" : "rgba(255,255,255,0.4)" }}></div>
                                <div className="mockup-name" style={{ color: cardStyle.isWhite ? "#0f172a" : "#000000" }}>
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
                                background: cardStyle.isWhite ? "#cbd5e1" : (cardStyle.isGold ? "#92400e" : (cardStyle.isBlack ? "#1e293b" : "rgba(255,255,255,0.25)")),
                                color: cardStyle.isWhite ? "#0f172a" : "#ffffff"
                              }}
                            >
                              {cardStyle.subhead}
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
                );
              })()
            )}

            {step === 4 && (
              <div className="success-card">
                <div className="success-badge">
                  <ClipboardCheck size={36} />
                </div>
                <h2 className="form-title" style={{ fontSize: "24px" }}>Application Received!</h2>
                <p className="form-subtitle" style={{ maxWidth: "480px", margin: "12px auto 32px auto", fontSize: "15px" }}>
                  Your CSCS Card application has been successfully submitted and validated. Our processing team will review your qualifications and contact you shortly.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left mb-8 text-sm text-slate-600 space-y-2 max-w-md mx-auto">
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Email:</strong> {formData.emailAddress}</p>
                  <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                  <p><strong>Card Type:</strong> {formData.cardType}</p>
                  {additionalData.citbId && <p><strong>CITB ID:</strong> {additionalData.citbId}</p>}
                  <p><strong>Address:</strong> {additionalData.addressLine1}, {additionalData.locality ? additionalData.locality + ", " : ""}{additionalData.city}, {additionalData.county}, {additionalData.postcode}</p>
                </div>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                  <button onClick={() => router.push("/")} className="btn-back">
                    Return to Homepage
                  </button>
                  <button onClick={handleReset} className="btn-submit">
                    Apply for Another Card
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ApplyCscsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-slate-500">Loading form...</div>}>
      <ApplyCscsForm />
    </Suspense>
  );
}

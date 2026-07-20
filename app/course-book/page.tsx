"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DatePickerField from "../components/DatePickerField";
import { syncEnquiry } from "@/lib/enquiries";
import { emailError, isValidPhone, phoneError } from "@/lib/validation";
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  AlertCircle, 
  Star 
} from "lucide-react";

function CourseBookForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Form states
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [niNumber, setNiNumber] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+44");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [deliveryMode, setDeliveryMode] = useState<"online" | "centre">("online");
  const [courseLocation, setCourseLocation] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "centre" || mode === "online") setDeliveryMode(mode);

    if (typeof window === "undefined") return;
    const saved = sessionStorage.getItem("course_book_prefill");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as {
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
        emailAddress?: string;
      };
      if (parsed.firstName) setFirstName(parsed.firstName);
      if (parsed.lastName) setLastName(parsed.lastName);
      if (parsed.phoneNumber) setPhoneNumber(parsed.phoneNumber);
      if (parsed.emailAddress) setEmailAddress(parsed.emailAddress);
    } catch {
      // ignore invalid prefill payload
    } finally {
      sessionStorage.removeItem("course_book_prefill");
    }
  }, [searchParams]);

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title) newErrors.title = "Please select a title.";
    if (!firstName.trim() || firstName.length < 2) newErrors.firstName = "First name must be at least 2 characters.";
    if (!lastName.trim() || lastName.length < 2) newErrors.lastName = "Last name must be at least 2 characters.";
    
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!isValidPhone(phoneNumber) && !isValidPhone(`${phonePrefix}${phoneNumber}`)) {
      newErrors.phoneNumber = phoneError(phoneNumber) || "Enter a valid phone number.";
    }

    const emailCheck = emailError(emailAddress);
    if (emailCheck) newErrors.emailAddress = emailCheck;

    if (deliveryMode === "centre" && !courseLocation) {
      newErrors.courseLocation = "Please select a course location.";
    }

    if (!preferredDate) {
      newErrors.preferredDate = "Please choose a preferred assessment date.";
    }

    if (!agreedToTerms) {
      newErrors.agreedToTerms = "You must agree to the Terms and Conditions and Privacy Policy.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      void syncEnquiry({
        enquiry_type: "course_book",
        product: deliveryMode === "centre"
          ? `H&S Course - Classroom${courseLocation ? ` (${courseLocation})` : ""}`
          : "H&S Course - Online",
        source_path: "/course-book",
        title: title || null,
        first_name: firstName || null,
        middle_name: middleName || null,
        last_name: lastName || null,
        email: emailAddress || null,
        phone: phoneNumber ? `${phonePrefix} ${phoneNumber}` : null,
        status: "new",
        agreed_to_terms: true,
        payload: {
          trigger: "form_submitted",
          deliveryMode,
          courseLocation,
          preferredDate,
          niNumber,
        },
      }).finally(() => {
        setTimeout(() => {
          setLoading(false);
          setIsSubmitted(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 800);
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans" style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      <main style={{ flexGrow: 1, paddingTop: "64px", paddingBottom: "96px", paddingLeft: "24px", paddingRight: "24px" }}>
        <style>{`
          .course-book-container {
            max-width: 960px;
            width: 100%;
            margin: 0 auto;
            box-sizing: border-box;
          }

          .course-header {
            margin-bottom: 40px;
          }
          .course-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 600;
            color: #065f46;
            background: #d1fae5;
            border-radius: 9999px;
            margin-bottom: 16px;
          }
          .course-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 34px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.02em;
            line-height: 1.2;
            margin: 0 0 10px 0;
          }
          .course-subtitle {
            font-size: 14px;
            font-weight: 600;
            color: #64748b;
            margin: 0 0 28px 0;
          }
          .course-info-box {
            margin-top: 0;
            padding: 20px 24px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.04);
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          @media (min-width: 768px) {
            .course-info-box {
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            }
          }
          .course-info-title {
            font-size: 16px;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 6px 0;
          }
          .course-info-text {
            font-size: 13px;
            color: #475569;
            margin: 0;
            line-height: 1.5;
          }
          .course-info-link {
            color: #2563eb;
            font-weight: 600;
            font-size: 13px;
            text-decoration: none;
            white-space: nowrap;
            flex-shrink: 0;
          }
          .course-info-link:hover {
            color: #1d4ed8;
          }

          .course-form-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 24px;
            padding: 40px 36px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
          }
          @media (max-width: 640px) {
            .course-title { font-size: 26px; }
            .course-form-card { padding: 28px 20px; }
          }

          .form-section {
            margin-bottom: 40px;
            padding-bottom: 36px;
            border-bottom: 1px solid #f1f5f9;
          }
          .form-section:last-of-type {
            margin-bottom: 0;
          }
          .form-section-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            border-bottom: 1.5px solid #f1f5f9;
            padding-bottom: 14px;
            margin: 0 0 28px 0;
            letter-spacing: -0.015em;
          }

          .field-grid-4 {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }
          @media (min-width: 768px) {
            .field-grid-4 {
              grid-template-columns: repeat(4, 1fr);
            }
          }
          .field-grid-2 {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }
          @media (min-width: 768px) {
            .field-grid-2 {
              grid-template-columns: 1fr 1fr;
            }
          }
          .field-full { grid-column: 1 / -1; }
          .field-half {
            grid-column: 1 / -1;
          }
          @media (min-width: 768px) {
            .field-half { grid-column: span 2; }
          }

          .field-label {
            font-size: 13px;
            font-weight: 700;
            color: #334155;
            margin-bottom: 8px;
            display: block;
          }
          .input-control {
            width: 100%;
            height: 48px;
            padding: 12px 16px;
            border: 1.5px solid #e2e8f0;
            border-radius: 10px;
            font-size: 14px;
            color: #0f172a;
            background-color: #ffffff;
            transition: all 0.2s ease;
            outline: none;
            box-sizing: border-box;
          }
          .input-control:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          .input-error {
            border-color: #ef4444 !important;
          }
          .input-error:focus {
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
          }
          .error-hint {
            color: #ef4444;
            font-size: 12px;
            margin-top: 6px;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .field-hint {
            color: #d97706;
            font-size: 12px;
            font-weight: 600;
            line-height: 1.5;
            margin: 4px 0 0 0;
          }
          .field-hint-muted {
            color: #94a3b8;
            font-size: 12px;
            font-weight: 500;
            margin-top: 8px;
            display: block;
          }

          .course-details-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 36px;
            align-items: start;
          }
          @media (min-width: 1024px) {
            .course-details-layout {
              grid-template-columns: 1.4fr 1fr;
              gap: 48px;
            }
          }
          .course-fields-stack {
            display: flex;
            flex-direction: column;
            gap: 28px;
          }
          .radio-row {
            display: flex;
            flex-wrap: wrap;
            gap: 28px;
            margin-top: 10px;
          }
          .radio-label {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            font-weight: 600;
            color: #334155;
            font-size: 14px;
            user-select: none;
          }
          .radio-label input {
            width: 16px;
            height: 16px;
          }
          .course-type-display {
            display: flex;
            align-items: center;
            background: #f8fafc;
            color: #475569;
            font-weight: 600;
            user-select: none;
          }
          .course-image-col {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .course-image-frame {
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 12px;
            background: #ffffff;
            box-shadow: 0 1px 2px rgba(0,0,0,0.04);
            width: 100%;
            max-width: 340px;
            overflow: hidden;
          }
          .course-image-frame img {
            width: 100%;
            height: auto;
            max-height: 220px;
            object-fit: cover;
            border-radius: 14px;
            display: block;
          }
          .course-rating {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 14px;
            user-select: none;
          }
          .course-rating-stars {
            display: flex;
            gap: 2px;
          }
          .course-rating-label {
            font-size: 12px;
            font-weight: 800;
            color: #475569;
          }

          .phone-row {
            display: flex;
            gap: 10px;
          }
          .phone-prefix {
            width: 100px;
            flex-shrink: 0;
          }

          .terms-block {
            margin-bottom: 32px;
            padding-top: 8px;
          }
          .terms-label {
            display: inline-flex;
            align-items: flex-start;
            gap: 12px;
            cursor: pointer;
            user-select: none;
          }
          .terms-label input {
            width: 16px;
            height: 16px;
            margin-top: 2px;
            flex-shrink: 0;
          }
          .terms-label span {
            color: #475569;
            font-size: 14px;
            font-weight: 600;
            line-height: 1.45;
          }

          .form-actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding-top: 28px;
            border-top: 1px solid #f1f5f9;
          }
          .btn-back {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border: 1px solid #cbd5e1;
            background: #ffffff;
            color: #475569;
            font-weight: 700;
            font-size: 14px;
            padding: 12px 24px;
            border-radius: 12px;
            cursor: pointer;
            transition: background 0.15s ease;
          }
          .btn-back:hover { background: #f8fafc; }
          .btn-submit {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #059669;
            color: #ffffff;
            font-weight: 700;
            font-size: 14px;
            padding: 12px 32px;
            border-radius: 12px;
            border: none;
            box-shadow: 0 4px 6px -1px rgba(5, 150, 105, 0.25);
            cursor: pointer;
            transition: background 0.15s ease;
          }
          .btn-submit:hover { background: #10b981; }
          .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

          .success-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 24px;
            padding: 48px 40px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.04);
            text-align: center;
            max-width: 640px;
            margin: 0 auto;
          }
          .success-icon {
            width: 64px;
            height: 64px;
            background: #d1fae5;
            color: #059669;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px auto;
          }
          .success-title {
            font-size: 24px;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 12px 0;
          }
          .success-text {
            font-size: 14px;
            color: #475569;
            line-height: 1.6;
            margin: 0 0 32px 0;
          }
          .success-details {
            background: #f8fafc;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 32px;
            text-align: left;
            border: 1px solid #f1f5f9;
          }
          .success-details-title {
            font-size: 11px;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            margin: 0 0 14px 0;
          }
          .success-details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            font-size: 12px;
          }
          .success-details-grid span:first-child {
            color: #64748b;
            display: block;
            margin-bottom: 2px;
          }
          .success-details-grid span:last-child {
            color: #1e293b;
            font-weight: 600;
          }
          .btn-home {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #0f172a;
            color: #ffffff;
            font-weight: 700;
            font-size: 14px;
            padding: 12px 28px;
            border-radius: 9999px;
            border: none;
            cursor: pointer;
          }
          .btn-home:hover { background: #1e293b; }
        `}</style>

        <div className="course-book-container">
        {/* Header Section */}
        <div className="course-header">
          <span className="course-badge">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Requirement
          </span>
          <h1 className="course-title">
            Level 1 Health and Safety in a Construction Environment
          </h1>
          <p className="course-subtitle">
            (leads to CSCS Green Labourer Card)
          </p>

          <div className="course-info-box">
            <div>
              <h2 className="course-info-title">
                Book Health and Safety Awareness Course
              </h2>
              <p className="course-info-text">
                Get your health and safety course certificate which you can use to apply for your CSCS Card.
              </p>
            </div>
            <a
              href="/health-safety-awareness"
              className="course-info-link"
            >
              Know more about health and safety related courses in construction →
            </a>
          </div>
        </div>

        {isSubmitted ? (
          /* Success Panel */
          <div className="success-card">
            <div className="success-icon">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="success-title">
              Booking Request Received!
            </h3>
            <p className="success-text">
              Thank you for submitting your booking details. We have received your request for the <strong>Level 1 Health and Safety Course</strong>. A booking representative will contact you shortly via email and phone to confirm your preferred assessment date and process the secure registration.
            </p>
            
            <div className="success-details">
              <h4 className="success-details-title">Submission Details</h4>
              <div className="success-details-grid">
                <div>
                  <span>Candidate Name:</span>
                  <span>{firstName} {lastName}</span>
                </div>
                <div>
                  <span>Email Address:</span>
                  <span>{emailAddress}</span>
                </div>
                <div>
                  <span>Course Mode:</span>
                  <span style={{ textTransform: "uppercase" }}>{deliveryMode === "online" ? "Online Study" : "Classroom Centre"}</span>
                </div>
                {deliveryMode === "centre" && courseLocation && (
                  <div>
                    <span>Course Location:</span>
                    <span>{courseLocation}</span>
                  </div>
                )}
                <div>
                  <span>Preferred Date:</span>
                  <span>{new Date(preferredDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
              </div>
            </div>

            <button onClick={() => router.push("/")} className="btn-home">
              Back to Homepage
            </button>
          </div>
        ) : (
          /* Form Content Card */
          <form onSubmit={handleSubmit} className="course-form-card">

            {/* 1. Personal Details Section */}
            <div className="form-section">
              <h3 className="form-section-title">Personal Details</h3>
              
              <div className="field-grid-4">
                {/* Title */}
                <div>
                  <label className="field-label">Title*</label>
                  <select 
                    value={title} 
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errors.title) setErrors(prev => ({ ...prev, title: "" }));
                    }}
                    className={`input-control ${errors.title ? "input-error" : ""}`}
                  >
                    <option value="">Select A Title</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </select>
                  {errors.title && (
                    <span className="error-hint">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.title}
                    </span>
                  )}
                </div>

                {/* First Name */}
                <div>
                  <label className="field-label">First Name*</label>
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    value={firstName} 
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors(prev => ({ ...prev, firstName: "" }));
                    }}
                    className={`input-control ${errors.firstName ? "input-error" : ""}`}
                  />
                  {errors.firstName && (
                    <span className="error-hint">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.firstName}
                    </span>
                  )}
                </div>

                {/* Middle Name */}
                <div>
                  <label className="field-label">Middle Name (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="Middle Name" 
                    value={middleName} 
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="input-control"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="field-label">Last Name*</label>
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    value={lastName} 
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors(prev => ({ ...prev, lastName: "" }));
                    }}
                    className={`input-control ${errors.lastName ? "input-error" : ""}`}
                  />
                  {errors.lastName && (
                    <span className="error-hint">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.lastName}
                    </span>
                  )}
                </div>

                <div className="field-full">
                  <p className="field-hint">
                    *Please enter your full name exactly as it appears on your photographic ID (e.g., passport or driving licence)
                  </p>
                </div>

                {/* National Insurance Number */}
                <div className="field-half">
                  <label className="field-label">National Insurance Number (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. QQ 12 34 56 C" 
                    value={niNumber} 
                    onChange={(e) => setNiNumber(e.target.value)}
                    className="input-control"
                    style={{ fontFamily: "ui-monospace, monospace", letterSpacing: "0.05em" }}
                  />
                </div>
              </div>
            </div>

            {/* 2. Contact Details Section */}
            <div className="form-section">
              <h3 className="form-section-title">Contact Details</h3>
              
              <div className="field-grid-2">
                {/* Phone Number */}
                <div>
                  <label className="field-label">Phone Number*</label>
                  <div className="phone-row">
                    <select 
                      value={phonePrefix} 
                      onChange={(e) => setPhonePrefix(e.target.value)}
                      className="input-control phone-prefix"
                    >
                      <option value="+44">+44 (UK)</option>
                      <option value="+353">+353 (IE)</option>
                      <option value="+1">+1 (US)</option>
                    </select>
                    <input 
                      type="tel" 
                      placeholder="e.g. 7123456789" 
                      value={phoneNumber} 
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: "" }));
                      }}
                      className={`input-control ${errors.phoneNumber ? "input-error" : ""}`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <span className="error-hint">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phoneNumber}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="field-label">Email Address*</label>
                  <input 
                    type="email" 
                    placeholder="yourname@domain.com" 
                    value={emailAddress} 
                    onChange={(e) => {
                      setEmailAddress(e.target.value);
                      if (errors.emailAddress) setErrors(prev => ({ ...prev, emailAddress: "" }));
                    }}
                    className={`input-control ${errors.emailAddress ? "input-error" : ""}`}
                  />
                  {errors.emailAddress && (
                    <span className="error-hint">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.emailAddress}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Course Details Section */}
            <div className="form-section">
              <h3 className="form-section-title">Course Details</h3>
              
              <div className="course-details-layout">
                <div className="course-fields-stack">
                  {/* Delivery Mode Choice */}
                  <div>
                    <label className="field-label">How would you like to take the course?*</label>
                    <div className="radio-row">
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          name="deliveryMode" 
                          checked={deliveryMode === "online"} 
                          onChange={() => {
                            setDeliveryMode("online");
                            setCourseLocation("");
                            if (errors.courseLocation) setErrors(prev => ({ ...prev, courseLocation: "" }));
                          }}
                        />
                        Online
                      </label>
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          name="deliveryMode" 
                          checked={deliveryMode === "centre"} 
                          onChange={() => setDeliveryMode("centre")}
                        />
                        At a Course Centre
                      </label>
                    </div>
                  </div>

                  {/* Course Location — only when centre delivery is selected */}
                  {deliveryMode === "centre" && (
                    <div>
                      <label className="field-label">Course Location*</label>
                      <select
                        value={courseLocation}
                        onChange={(e) => {
                          setCourseLocation(e.target.value);
                          if (errors.courseLocation) setErrors(prev => ({ ...prev, courseLocation: "" }));
                        }}
                        className={`input-control ${errors.courseLocation ? "input-error" : ""}`}
                      >
                        <option value="">Select a course location</option>
                        <option value="Main Hurak Centre">Main Hurak Centre</option>
                        <option value="Birmingham Centre">Birmingham Centre</option>
                      </select>
                      {errors.courseLocation && (
                        <span className="error-hint">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.courseLocation}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Course Type Display */}
                  <div>
                    <label className="field-label">Course Type*</label>
                    <div className="input-control course-type-display">
                      Level 1 Health and Safety in a Construction Environment ({deliveryMode === "online" ? "online" : "classroom"})
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="field-label">Preferred Assessment Date*</label>
                    <DatePickerField
                      value={preferredDate}
                      onChange={(value) => {
                        setPreferredDate(value);
                        if (errors.preferredDate) setErrors(prev => ({ ...prev, preferredDate: "" }));
                      }}
                      placeholder="Select assessment date"
                      minDate={new Date(Date.now() + 86400000)}
                      hasError={!!errors.preferredDate}
                    />
                    <span className="field-hint-muted">
                      * Dates are subject to availability
                    </span>
                    {errors.preferredDate && (
                      <span className="error-hint">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.preferredDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Side Illustration & Rating */}
                <div className="course-image-col">
                  <div className="course-image-frame">
                    <img 
                      src="/safety_gear_course.png" 
                      alt="Construction Safety Gear" 
                    />
                  </div>
                  <div className="course-rating">
                    <div className="course-rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="course-rating-label">Awesome</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Terms and Conditions Consent Checkbox */}
            <div className="terms-block">
              <label className="terms-label">
                <input 
                  type="checkbox" 
                  checked={agreedToTerms} 
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setAgreedToTerms(checked);
                    if (errors.agreedToTerms) setErrors(prev => ({ ...prev, agreedToTerms: "" }));
                    if (checked) {
                      void syncEnquiry({
                        enquiry_type: "course_book",
                        product: deliveryMode === "centre"
                          ? `H&S Course - Classroom${courseLocation ? ` (${courseLocation})` : ""}`
                          : "H&S Course - Online",
                        source_path: "/course-book",
                        title: title || null,
                        first_name: firstName || null,
                        middle_name: middleName || null,
                        last_name: lastName || null,
                        email: emailAddress || null,
                        phone: phoneNumber ? `${phonePrefix} ${phoneNumber}` : null,
                        status: "in_progress",
                        agreed_to_terms: true,
                        payload: {
                          trigger: "terms_accepted",
                          deliveryMode,
                          courseLocation,
                          preferredDate,
                          niNumber,
                        },
                      });
                    }
                  }}
                />
                <span>
                  I agree to the Terms and Conditions and Privacy Policy
                </span>
              </label>
              {errors.agreedToTerms && (
                <span className="error-hint">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.agreedToTerms}
                </span>
              )}
            </div>

            {/* 5. Footer Buttons */}
            <div className="form-actions">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-back"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn-submit"
              >
                {loading ? "Submitting..." : "Submit"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default function CourseBookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading form...</div>}>
      <CourseBookForm />
    </Suspense>
  );
}

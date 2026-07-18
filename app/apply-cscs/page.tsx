"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, Calendar, ClipboardCheck, ArrowLeft, Send } from "lucide-react";

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
  applicationType: z.enum(["new", "renew", "lost"], {
    errorMap: () => ({ message: "Please select an application type." }),
  }),
  occupation: z.string().min(2, { message: "Please enter your occupation." }),
  cardType: z.string().min(2, { message: "Please enter the required card type (e.g. Green, Blue)." }),
  agreedToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the Terms and Conditions and Privacy Policy." }),
  }),
});

type FormErrors = {
  [key in keyof z.infer<typeof cscsFormSchema>]?: string;
};

function ApplyCscsForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formSubmitted, setFormSubmitted] = useState(false);
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


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: val }));
    // Clear error for this field dynamically
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRadioChange = (val: "new" | "renew" | "lost") => {
    setFormData((prev) => ({ ...prev, applicationType: val }));
    if (errors.applicationType) {
      setErrors((prev) => ({ ...prev, applicationType: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = cscsFormSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: FormErrors = {};
      validation.error.errors.forEach((err) => {
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

    // Submit successful
    setErrors({});
    setFormSubmitted(true);
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
      
      <main className="flex-grow py-12 px-6">
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
        `}</style>

        <div className="form-container">
          <div className="form-header-box">
            <h1 className="form-title">Apply For CSCS Card</h1>
            <p className="form-subtitle">
              Please fill out this form carefully and ensure all information provided is accurate and complete.
            </p>
          </div>

          <div className="form-card">
            {formSubmitted ? (
              <div className="success-card">
                <div className="success-badge">
                  <ClipboardCheck size={36} />
                </div>
                <h2 className="form-title" style={{ fontSize: "24px" }}>Application Received!</h2>
                <p className="form-subtitle" style={{ maxWidth: "480px", margin: "12px auto 32px auto", fontSize: "15px" }}>
                  Your CSCS Card application has been successfully submitted and validated. Our processing team will review your qualifications and contact you shortly.
                </p>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                  <button onClick={() => router.push("/")} className="btn-back">
                    Return to Homepage
                  </button>
                  <button onClick={() => { setFormSubmitted(false); setFormData({
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
                  }); }} className="btn-submit">
                    Apply for Another Card
                  </button>
                </div>
              </div>
            ) : (
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
                        <option value="">Select A Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms</option>
                        <option value="Dr">Dr</option>
                      </select>
                      {errors.title && <div className="error-text">{errors.title}</div>}
                    </div>
                  </div>

                  <div className="form-row form-row-3">
                    <div>
                      <label className="field-label">First Name*</label>
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
                      <label className="field-label">Middle Name</label>
                      <input
                        type="text"
                        name="middleName"
                        placeholder="Middle Name"
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
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`input-control ${errors.lastName ? "has-error" : ""}`}
                        required
                      />
                      {errors.lastName && <div className="error-text">{errors.lastName}</div>}
                    </div>
                  </div>
                  <p className="field-note">
                    *Please enter your full name <strong>exactly as it appears on your photographic ID</strong> (e.g., passport or driving licence)
                  </p>

                  <div className="form-row" style={{ marginTop: "24px" }}>
                    <div>
                      <label className="field-label">Date of Birth*</label>
                      <div className="grid grid-cols-3 gap-3 form-row-dob">
                        <select
                          name="dobDay"
                          value={formData.dobDay}
                          onChange={handleInputChange}
                          className={`input-control ${errors.dobDay ? "has-error" : ""}`}
                          required
                        >
                          <option value="">Day</option>
                          {days.map((d) => (
                            <option key={d} value={d.padStart(2, "0")}>{d}</option>
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
                  <button type="submit" className="btn-submit">
                    <span>Submit Application</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
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

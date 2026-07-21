"use client";

import { useState, useEffect, Suspense } from "react";
import { TestCentre, fetchAllCentresWithCoords } from "../data/testCentres";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DatePickerField from "../components/DatePickerField";
import { syncEnquiry, getStoredEnquiryId } from "@/lib/enquiries";
import { isValidEmail, isValidPhone, isValidUkPostcode, normalizePostcode } from "@/lib/validation";
import {
  CITB_BASE_PRICE_GBP,
  CITB_MULTI_TEST_ADDON_GBP,
  citbTotalGbp,
} from "@/lib/citb-pricing";
import { 
  Lock, 
  CheckCircle, 
  HelpCircle, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  AlertCircle, 
  Loader2,
  ChevronRight,
  FileText,
  AlertTriangle
} from "lucide-react";

// Form validation schema
const citbFormSchema = z.object({
  title: z.string().min(1, { message: "Please select a title." }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  dobDay: z.string().min(1, { message: "Please select a birth day." }),
  dobMonth: z.string().min(1, { message: "Please select a birth month." }),
  dobYear: z.string().min(1, { message: "Please select a birth year." }),
  niNumber: z.string().optional(),
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
  addressLine1: z.string().min(3, { message: "Address line 1 must be at least 3 characters." }),
  locality: z.string().optional(),
  city: z.string().min(2, { message: "Town/City is required." }),
  county: z.string().min(2, { message: "County is required." }),
  postcode: z
    .string()
    .min(1, { message: "Postcode is required." })
    .refine((v) => isValidUkPostcode(v), {
      message: "Enter a valid UK postcode (e.g. SW1A 1AA).",
    }),
  agreedToTerms: z.literal(true, {
    message: "You must agree to the Terms and Conditions and Privacy Policy.",
  }),
});

type FormErrors = {
  [key in keyof z.infer<typeof citbFormSchema>]?: string;
};

// FAQ Type
interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

function BookCitbTestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Personal Info, 2: Test Details, 3: Confirm, 4: Success

  // Test Details (Step 2)
  const [testDetails, setTestDetails] = useState({
    testType: "",
    preferredLanguage: "",
    testCentrePostcode: "",
    testCentreCity: "",
    preferredDate: "",
    alternateDate: "",
    preferredTime: "",
    optInRetake: false,
  });
  const [testDetailErrors, setTestDetailErrors] = useState<Record<string, string>>({});
  const [allCentres, setAllCentres] = useState<TestCentre[]>([]);

  // Test Centre postcode search
  const [centreSearchQuery, setCentreSearchQuery] = useState("");
  const [centreSearchResults, setCentreSearchResults] = useState<{ name: string; address: string; distance: string }[]>([]);
  const [centreSearchLoading, setCentreSearchLoading] = useState(false);
  const [showCentreResults, setShowCentreResults] = useState(false);
  // Test Centre city fuzzy search (second field)
  const [citySearchResults, setCitySearchResults] = useState<{ name: string; address: string }[]>([]);
  const [showCityResults, setShowCityResults] = useState(false);
  const [testTypeTipOpen, setTestTypeTipOpen] = useState(false);

  // Form values
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
    addressLine1: "",
    locality: "",
    city: "",
    county: "",
    postcode: "",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [payError, setPayError] = useState("");

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const bookingTotal = citbTotalGbp(testDetails.optInRetake);

  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success") {
      setStep(4);
      sessionStorage.removeItem("cscs_temp_citb_test_data");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (payment === "cancelled") {
      setStep(3);
      setPayError("Payment was cancelled. You can try again when ready.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]);

  useEffect(() => {
  // Resolve real lat/lng for all centres (batched, respects 100-item API limit)
  fetchAllCentresWithCoords().then(setAllCentres).catch(console.error);

  // Clear session storage if page was reloaded
  if (typeof window !== "undefined") {
    const navs = performance.getEntriesByType("navigation");
    if (navs.length > 0 && (navs[0] as PerformanceNavigationTiming).type === "reload") {
      sessionStorage.removeItem("cscs_temp_citb_test_data");
    } else {
      const saved = sessionStorage.getItem("cscs_temp_citb_test_data");
      if (saved) {
        try {
          setFormData(JSON.parse(saved));
        } catch (e) {
          console.error("Error loading saved CITB form data", e);
        }
      }
    }
  }
}, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      // Auto-save to sessionStorage
      sessionStorage.setItem("cscs_temp_citb_test_data", JSON.stringify(updated));

      if (name === "agreedToTerms" && checked === true) {
        void syncEnquiry({
          enquiry_type: "citb_test",
          product: "CITB Health Safety & Environment Test",
          source_path: "/book-citb-test",
          title: updated.title || null,
          first_name: updated.firstName || null,
          middle_name: updated.middleName || null,
          last_name: updated.lastName || null,
          email: updated.emailAddress || null,
          phone: updated.phoneNumber || null,
          status: "open",
          agreed_to_terms: true,
          payload: {
            trigger: "terms_accepted",
            step: 1,
            form: updated,
          },
        });
      }

      return updated;
    });

    // Clear error
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleReset = () => {
    sessionStorage.removeItem("cscs_temp_citb_test_data");
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
      addressLine1: "",
      locality: "",
      city: "",
      county: "",
      postcode: "",
      agreedToTerms: false,
    });
    setTestDetails({ testType: "", preferredLanguage: "", testCentrePostcode: "", testCentreCity: "", preferredDate: "", alternateDate: "", preferredTime: "", optInRetake: false });
    setCentreSearchQuery("");
    setCentreSearchResults([]);
    setShowCentreResults(false);
    setStep(1);
    setErrors({});
    setTestDetailErrors({});
  };

  // Fuzzy score: higher = better match
  const fuzzyScore = (centre: TestCentre, q: string): number => {
    const name = centre.name.toLowerCase();
    const addr = centre.address.toLowerCase();
    if (name.startsWith(q)) return 3;
    if (name.includes(q)) return 2;
    if (addr.includes(q)) return 1;
    // Partial match: every char in q appears in order in name
    let j = 0;
    for (let k = 0; k < name.length && j < q.length; k++) {
      if (name[k] === q[j]) j++;
    }
    if (j === q.length) return 0.5;
    return 0;
  };

  // Live fuzzy filter — runs on every keystroke for city/name queries
  const handleLiveCitySearch = (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setCentreSearchResults([]);
      setShowCentreResults(false);
      return;
    }
    const scored = allCentres
      .map(c => ({ c, score: fuzzyScore(c, q) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(x => ({ name: x.c.name, address: x.c.address, distance: "" }));
    setCentreSearchResults(scored);
    setShowCentreResults(true);
  };

  // Postcode geocode — only called on Find button click
  const handleFindCentres = async () => {
    const query = centreSearchQuery.trim();
    if (!query) return;
    setCentreSearchLoading(true);
    setShowCentreResults(false);
    try {
      const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.status === 200 && data.result) {
        const lat = data.result.latitude;
        const lon = data.result.longitude;
        const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
          const R = 3958.8;
          const dLat = ((lat2 - lat1) * Math.PI) / 180;
          const dLon = ((lon2 - lon1) * Math.PI) / 180;
          const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
          return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        };
        const results = allCentres
          .map(c => ({ ...c, dist: haversine(lat, lon, c.lat, c.lng) }))
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 5)
          .map(c => ({ name: c.name, address: c.address, distance: `${c.dist.toFixed(1)} miles` }));
        setCentreSearchResults(results);
        setShowCentreResults(true);
      } else {
        setCentreSearchResults([]);
        setShowCentreResults(true);
      }
    } catch {
      setCentreSearchResults([]);
      setShowCentreResults(true);
    }
    setCentreSearchLoading(false);
  };

  const handleTestDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!testDetails.testType) errs.testType = "Please select a test type.";
    if (!testDetails.preferredDate) errs.preferredDate = "Please select a preferred date.";
    if (Object.keys(errs).length > 0) {
      setTestDetailErrors(errs);
      return;
    }
    setTestDetailErrors({});
    void syncEnquiry({
      enquiry_type: "citb_test",
      product: testDetails.testType
        ? `CITB Test - ${testDetails.testType}`
        : "CITB Health Safety & Environment Test",
      source_path: "/book-citb-test",
      title: formData.title || null,
      first_name: formData.firstName || null,
      middle_name: formData.middleName || null,
      last_name: formData.lastName || null,
      email: formData.emailAddress || null,
      phone: formData.phoneNumber || null,
      status: "open",
      agreed_to_terms: true,
      payload: {
        trigger: "step_advance",
        step: 3,
        form: formData,
        testDetails,
      },
    });
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate using Zod
    const validation = citbFormSchema.safeParse(formData);

    if (!validation.success) {
      const zErrors: FormErrors = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          zErrors[err.path[0] as keyof FormErrors] = err.message;
        }
      });
      setErrors(zErrors);
      
      // Scroll to first error
      const firstErrorKey = Object.keys(zErrors)[0];
      const errorEl = document.getElementsByName(firstErrorKey)[0];
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const normalizedForm = {
      ...formData,
      postcode: normalizePostcode(formData.postcode),
      emailAddress: formData.emailAddress.trim(),
    };
    setFormData(normalizedForm);

    // Go to test details step
    void syncEnquiry({
      enquiry_type: "citb_test",
      product: "CITB Health Safety & Environment Test",
      source_path: "/book-citb-test",
      title: normalizedForm.title || null,
      first_name: normalizedForm.firstName || null,
      middle_name: normalizedForm.middleName || null,
      last_name: normalizedForm.lastName || null,
      email: normalizedForm.emailAddress || null,
      phone: normalizedForm.phoneNumber || null,
      status: "open",
      agreed_to_terms: true,
      payload: {
        trigger: "step_advance",
        step: 2,
        form: normalizedForm,
      },
    });
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalConfirm = async () => {
    setLoading(true);
    setPayError("");

    const product = testDetails.testType
      ? `CITB Test - ${testDetails.testType}`
      : "CITB Health Safety & Environment Test";
    const fullName = [formData.title, formData.firstName, formData.middleName, formData.lastName]
      .filter(Boolean)
      .join(" ");

    await syncEnquiry({
      enquiry_type: "citb_test",
      product,
      source_path: "/book-citb-test",
      title: formData.title || null,
      first_name: formData.firstName || null,
      middle_name: formData.middleName || null,
      last_name: formData.lastName || null,
      email: formData.emailAddress || null,
      phone: formData.phoneNumber || null,
      status: "pending",
      agreed_to_terms: true,
      payload: {
        trigger: "checkout_started",
        step: 3,
        form: formData,
        testDetails,
        amount_gbp: bookingTotal,
        multi_test: testDetails.optInRetake,
      },
    });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkoutType: "citb_test",
          email: formData.emailAddress,
          fullName,
          product,
          multiTest: testDetails.optInRetake,
          enquiryId: getStoredEnquiryId() || undefined,
          successPath: "/book-citb-test?payment=success",
          cancelPath: "/book-citb-test?payment=cancelled",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.url) {
        setPayError(json.error || "Could not start payment. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = json.url as string;
    } catch {
      setPayError("Network error starting payment. Please try again.");
      setLoading(false);
    }
  };

  const faqs: FAQItem[] = [
    {
      question: "Where is the nearest CITB Health, Safety and Environment test centre to me?",
      answer: "You can take the CITB Health, Safety and Environment test in any of 300+ test centres across the UK. Visit our test centres page to find the nearest one for you (when filling in our form, we will select the nearest test centres to you based on your postcode)."
    },
    {
      question: "I need to book my test as soon as possible, can you help?",
      answer: "Our team will endeavour to book you the preferred appointment date at your selected test centre. Next day bookings are possible, but it’s more likely that it will be in the next 3 days. We recommend that you give us a call on 0203 769 9047 if you are looking to do the test ASAP."
    },
    {
      question: "I would not be able to make it to the test centre on my appointment date and time, can you help?",
      answer: "You can reschedule your test appointment free of cost if you inform us 96 hours proir to your test appointment time via call/email or fill the contact us form. If the test is within 96 hours, no reschedule or cancellation can be made."
    },
    {
      question: "What happens after I book the test?",
      answer: "You will receive an email with your confirmed date and time at your chosen test centre within 30 minutes. If for any reason you haven’t received an email from us, you can fill the form on the contact us page of the website. Alternatively you can contact our team with any questions or queries that you may have."
    },
    {
      question: "Do I have to take any Identification to the test centre?",
      answer: "Yes, you will need to take a valid UK Driving Licence or valid signed Passport to the test centre. If you do not have either of these documents, you can download the Waiver form here that you can fill out and use on the day."
    },
    {
      question: "What should I expect during the CITB Health, Safety and Environment Test?",
      answer: "The CITB Health, Safety and Environment Test is a multiple choice test that covers health and safety best practices in construction, along with environmental awareness issues."
    },
    {
      question: "Are there any revision guides or materials that will help me revise for the CITB Health, Safety and Environment Test?",
      answer: "You can call us on 0203 769 9047 to book the revision material for the CITB Health, Safety and Environment Test."
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        <style>{`
          .book-hero {
            background: transparent;
            color: #0f172a;
            padding: 48px 24px 16px 24px;
            text-align: center;
          }
          .book-hero-content {
            max-width: 850px;
            margin: 0 auto;
          }
          .book-hero-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 36px;
            font-weight: 850;
            letter-spacing: -0.02em;
            margin-bottom: 8px;
            color: #0f172a;
          }
          .book-hero-subtitle {
            font-size: 14px;
            color: #2563eb;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .book-container {
            max-width: 850px;
            width: 100%;
            margin: 16px auto 80px auto;
            padding: 0 24px;
            box-sizing: border-box;
          }

          .disclaimer-box {
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 12px;
            padding: 16px 20px;
            color: #1e3a8a;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 24px;
            display: flex;
            gap: 12px;
            align-items: flex-start;
          }

          .disclaimer-box strong {
            color: #1d4ed8;
          }

          .citb-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02);
            margin-bottom: 40px;
          }

          .citb-section-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 24px;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 12px;
          }

          .field-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 28px;
          }

          .name-fields-row {
            display: grid;
            grid-template-columns: 2fr 2fr 2fr;
            gap: 16px;
          }

          @media (max-width: 640px) {
            .name-fields-row {
              grid-template-columns: 1fr;
              gap: 12px;
            }
          }

          .dob-fields-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 12px;
            max-width: 320px;
          }

          .field-label {
            display: block;
            font-size: 14px;
            font-weight: 700;
            color: #475569;
            margin-bottom: 8px;
          }

          .field-desc {
            font-size: 12px;
            color: #64748b;
            margin-top: 6px;
            display: block;
          }

          .input-control {
            width: 100%;
            height: 48px;
            border: 1.5px solid #cbd5e1;
            border-radius: 8px;
            padding: 0 16px;
            font-size: 14px;
            color: #0f172a;
            outline: none;
            box-sizing: border-box;
            background: #ffffff;
            transition: all 0.2s ease;
          }

          .input-control:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }

          .input-control.has-error {
            border-color: #ef4444;
            background: #fef2f2;
          }

          .error-msg {
            color: #ef4444;
            font-size: 12px;
            font-weight: 600;
            margin-top: 4px;
            display: block;
          }

          .action-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #f1f5f9;
            padding-top: 24px;
            margin-top: 36px;
          }

          .btn-back {
            height: 46px;
            padding: 0 24px;
            background: #ffffff;
            color: #475569;
            font-weight: 700;
            font-size: 14px;
            border-radius: 8px;
            border: 1px solid #cbd5e1;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .btn-back:hover {
            background: #f8fafc;
            color: #0f172a;
          }

          .btn-proceed {
            height: 46px;
            padding: 0 32px;
            background: #10b981;
            color: #ffffff;
            font-weight: 700;
            font-size: 14px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .btn-proceed:hover {
            background: #059669;
          }
          .btn-proceed:disabled {
            background: #cbd5e1;
            cursor: not-allowed;
            opacity: 0.6;
          }

          /* Info section styles */
          .info-block {
            margin-bottom: 48px;
          }

          .section-header {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 24px;
            font-weight: 850;
            color: #0f172a;
            margin-bottom: 24px;
            letter-spacing: -0.02em;
          }
          .inner-pad{
            padding:12px
          }

          .info-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 48px;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02);
            margin-bottom: 40px;
            box-sizing: border-box;
          }
          @media (max-width: 640px) {
            .info-card {
              padding: 24px;
            }
          }

          /* FAQ item */
          .faq-item {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            margin-bottom: 12px;
            overflow: hidden;
            transition: all 0.2s ease;
          }
          .faq-item:hover {
            border-color: #cbd5e1;
          }

          .faq-trigger {
            width: 100%;
            padding: 20px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: none;
            border: none;
            text-align: left;
            cursor: pointer;
            font-weight: 700;
            font-size: 15px;
            color: #0f172a;
          }

          .faq-content {
            padding: 0 24px 20px 24px;
            font-size: 14px;
            color: #475569;
            line-height: 1.6;
            border-top: 1px solid #f1f5f9;
            padding-top: 16px;
          }

          /* ID requirement styles */
          .id-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 28px;
            margin-bottom: 20px;
            margin-top: 20px;
          }

          .id-badge {
            display: inline-block;
            font-size: 12px;
            font-weight: 800;
            padding: 4px 12px;
            border-radius: 6px;
            text-transform: uppercase;
            margin-bottom: 16px;
          }

          .id-badge.primary {
            background: #e0f2fe;
            color: #0369a1;
          }

          .id-badge.secondary {
            background: #fef3c7;
            color: #d97706;
          }

          .id-list {
            list-style: none;
            padding: 0;
            margin: 16px 0 0 0;
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
          }

          @media (min-width: 640px) {
            .id-list {
              grid-template-columns: 1fr 1fr;
            }
          }

          .id-item {
            font-size: 14px;
            color: #334155;
            padding-left: 24px;
            position: relative;
          }

          .id-item::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: 800;
          }

          /* Summary Box */
          .summary-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
          }

          .summary-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 32px;
          }

          @media (max-width: 640px) {
            .summary-grid {
              grid-template-columns: 1fr;
              gap: 16px;
            }
          }

          .summary-item-label {
            display: block;
            font-size: 12px;
            font-weight: 700;
            color: #0f172a;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 6px;
          }

          .summary-item-value {
            display: block;
            font-size: 15px;
            color: #0f172a;
            font-weight: 400;
            line-height: 1.4;
            word-break: break-word;
          }

          .payment-breakdown {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 32px;
          }

          .breakdown-row {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #475569;
            margin-bottom: 10px;
          }

          .breakdown-row.total {
            border-top: 1px solid #cbd5e1;
            padding-top: 12px;
            margin-top: 12px;
            font-size: 16px;
            color: #0f172a;
            font-weight: 800;
          }
        `}</style>

        <div className="book-hero">
          <div className="book-hero-content">
            <span className="book-hero-subtitle">CITB Touchscreen Test</span>
            <h1 className="book-hero-title">Book a CITB Health, Safety and Environment test</h1>
          </div>
        </div>

        <div className="book-container">
          
          {/* Top Notice */}
          <div className="disclaimer-box">
            <ShieldCheck size={20} className="text-blue-600 flex-shrink-0" style={{ marginTop: "2px" }} />
            <div>
              The CITB HS&amp;E test (commonly known as a CITB Touch Screen Test), is required for a CSCS Card (New/Renew). The price of a CITB HS&amp;E Test booking is <strong>£{CITB_BASE_PRICE_GBP}</strong>. You must have passed this test within the past two years in order to apply for a CSCS Card.
            </div>
          </div>

          {step === 1 && (
            <form onSubmit={handleFormSubmit} noValidate className="citb-card">
              {/* Section 1: Person Taking The Test */}
              <h2 className="citb-section-title">Person Taking The Test</h2>
              
              <div className="field-grid">
                <div>
                  <label className="field-label">Name*</label>
                  <div className="name-fields-row" style={{ marginBottom: "8px" }}>
                    <div>
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
                      </select>
                      {errors.title && <span className="error-msg">{errors.title}</span>}
                    </div>

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
                      {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="middleName"
                        placeholder="Middle Name (Optional)"
                        value={formData.middleName}
                        onChange={handleInputChange}
                        className="input-control"
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`input-control ${errors.lastName ? "has-error" : ""}`}
                      required
                    />
                    {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
                  </div>
                  <span className="field-desc">
                    *Please enter your full name exactly as it appears on your photographic ID (e.g., passport or driving licence)
                  </span>
                </div>

                <div>
                  <label className="field-label">Date of Birth*</label>
                  <div className="dob-fields-row">
                    <select
                      name="dobDay"
                      value={formData.dobDay}
                      onChange={handleInputChange}
                      className={`input-control ${errors.dobDay ? "has-error" : ""}`}
                      required
                    >
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")).map(day => (
                        <option key={day} value={day}>{day}</option>
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
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, idx) => (
                        <option key={m} value={String(idx + 1).padStart(2, "0")}>{m}</option>
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
                      {Array.from({ length: 80 }, (_, i) => String(new Date().getFullYear() - 16 - i)).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  {(errors.dobDay || errors.dobMonth || errors.dobYear) && (
                    <span className="error-msg">Please select a valid date of birth.</span>
                  )}
                </div>

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

              {/* Section 2: Contact Details */}
              <h2 className="citb-section-title">Contact Details</h2>
              <div className="field-grid">
                <div>
                  <label className="field-label">Phone Number*</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f1f5f9",
                      border: "1.5px solid #cbd5e1",
                      borderRadius: "8px",
                      padding: "0 12px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#475569"
                    }}>
                      +44
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="e.g. 07123456789"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`input-control ${errors.phoneNumber ? "has-error" : ""}`}
                      required
                    />
                  </div>
                  {errors.phoneNumber && <span className="error-msg">{errors.phoneNumber}</span>}
                </div>

                <div>
                  <label className="field-label">Email Address*</label>
                  <input
                    type="email"
                    name="emailAddress"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="yourname@domain.com"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className={`input-control ${errors.emailAddress ? "has-error" : ""}`}
                    required
                  />
                  {errors.emailAddress && <span className="error-msg">{errors.emailAddress}</span>}
                </div>
              </div>

              {/* Section 3: Address */}
              <h2 className="citb-section-title">Address</h2>
              <div className="field-grid" style={{ marginBottom: "16px" }}>
                <div>
                  <input
                    type="text"
                    name="addressLine1"
                    placeholder="House number and Street name..."
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className={`input-control ${errors.addressLine1 ? "has-error" : ""}`}
                    required
                  />
                  {errors.addressLine1 && <span className="error-msg">{errors.addressLine1}</span>}
                </div>

                <div>
                  <input
                    type="text"
                    name="locality"
                    placeholder="Locality (Optional)"
                    value={formData.locality}
                    onChange={handleInputChange}
                    className="input-control"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="Town/City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`input-control ${errors.city ? "has-error" : ""}`}
                    required
                  />
                  {errors.city && <span className="error-msg">{errors.city}</span>}
                </div>

                <div>
                  <input
                    type="text"
                    name="county"
                    placeholder="County"
                    value={formData.county}
                    onChange={handleInputChange}
                    className={`input-control ${errors.county ? "has-error" : ""}`}
                    required
                  />
                  {errors.county && <span className="error-msg">{errors.county}</span>}
                </div>

                <div>
                  <input
                    type="text"
                    name="postcode"
                    autoComplete="postal-code"
                    placeholder="e.g. SW1A 1AA"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    onBlur={() => {
                      if (formData.postcode.trim() && isValidUkPostcode(formData.postcode)) {
                        setFormData((prev) => ({ ...prev, postcode: normalizePostcode(prev.postcode) }));
                      }
                    }}
                    className={`input-control ${errors.postcode ? "has-error" : ""}`}
                    required
                  />
                  {errors.postcode && <span className="error-msg">{errors.postcode}</span>}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div style={{ marginTop: "24px" }}>
                <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer", fontSize: "14px", color: "#475569" }}>
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleInputChange}
                    style={{ marginTop: "3px", width: "16px", height: "16px", cursor: "pointer" }}
                    required
                  />
                  <span>
                    I have read and agree to the <a href="/terms-and-conditions" target="_blank" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="/privacy-policy" target="_blank" className="text-blue-600 hover:underline">Privacy Policy</a>.
                  </span>
                </label>
                {errors.agreedToTerms && <span className="error-msg" style={{ marginLeft: "28px" }}>{errors.agreedToTerms}</span>}
              </div>

              {/* Action Buttons */}
              <div className="action-bar">
                <button type="button" onClick={() => router.back()} className="btn-back">
                  Back
                </button>
                <button 
                  type="submit" 
                  className="btn-proceed" 
                  disabled={!formData.agreedToTerms}
                  style={{ opacity: formData.agreedToTerms ? 1 : 0.6, cursor: formData.agreedToTerms ? "pointer" : "not-allowed" }}
                >
                  <span>Proceed</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* ─── STEP 2: Test Details ─── */}
          {step === 2 && (
            <form onSubmit={handleTestDetailsSubmit}>
              <div className="citb-card">
                <h2 className="citb-section-title">Test Details</h2>

                {/* Test Type */}
                <div className="field-group" style={{ marginBottom: "24px" }}>
                  <label className="field-label">Test Type <span style={{ color: "#ef4444" }}>*</span></label>
                  <select
                    value={testDetails.testType}
                    onChange={e => { setTestDetails(p => ({ ...p, testType: e.target.value })); setTestDetailErrors(p => ({ ...p, testType: "" })); }}
                    className={`input-control ${testDetailErrors.testType ? "has-error" : ""}`}
                  >
                    <option value="">⊘ Test Type</option>
                    <option value="operative">Operatives Test (most common)</option>
                    <option value="managers">Managers &amp; Professionals Test</option>
                    <option value="supervisor">Supervisor Test</option>
                    <option value="plumbing">Plumbing / Gas Test</option>
                    <option value="demolition">Demolition Test</option>
                    <option value="highways">Highway Works Test</option>
                    <option value="height">Working at Height Test</option>
                    <option value="hvacr">HVACR Test</option>
                  </select>
                  {testDetailErrors.testType && <span className="error-msg">{testDetailErrors.testType}</span>}

                  {/* Not sure tip */}
                  <div style={{ marginTop: "10px", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
                    <button
                      type="button"
                      onClick={() => setTestTypeTipOpen(o => !o)}
                      style={{ width: "100%", background: "#f8fafc", border: "none", padding: "12px 16px", textAlign: "left", fontSize: "13px", color: "#2563eb", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <HelpCircle size={15} /> Not sure which test type to take?
                      {testTypeTipOpen ? <ChevronUp size={14} style={{ marginLeft: "auto" }} /> : <ChevronDown size={14} style={{ marginLeft: "auto" }} />}
                    </button>
                    {testTypeTipOpen && (
                      <div style={{ padding: "14px 16px", fontSize: "13px", color: "#475569", lineHeight: 1.6, borderTop: "1px solid #e2e8f0", background: "#ffffff" }}>
                        <p style={{ marginBottom: "8px" }}>The most common test is the <strong>Operatives Test</strong> — suitable for Labourers, Bricklayers, Carpenters, Painters, Groundworkers and more (Green, Blue, Gold, Red CSCS Cards).</p>
                        <p>Select a specialist test only if you are a Manager, Supervisor, Plumber, Demolition worker, Highways operative, Scaffolder/Roofer, or work in HVACR. Visit our <a href="/trade-wise-test" className="text-blue-600 underline">Trade Wise Test</a> guide for help.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preferred Language */}
                <div className="field-group" style={{ marginBottom: "24px" }}>
                  <label className="field-label">Preferred Language <span style={{ color: "#94a3b8", fontWeight: 500 }}>(Optional)</span></label>
                  <select
                    value={testDetails.preferredLanguage}
                    onChange={e => setTestDetails(p => ({ ...p, preferredLanguage: e.target.value }))}
                    className="input-control"
                  >
                    <option value="">Any special language preference</option>
                    <option value="english">English</option>
                    <option value="welsh">Welsh</option>
                    <option value="polish">Polish</option>
                    <option value="romanian">Romanian</option>
                    <option value="punjabi">Punjabi</option>
                    <option value="urdu">Urdu</option>
                    <option value="arabic">Arabic</option>
                    <option value="portuguese">Portuguese</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Nearest Test Centre */}
                <div className="field-group" style={{ marginBottom: "8px" }}>
                  <label className="field-label">Nearest Test Centre <span style={{ color: "#94a3b8", fontWeight: 500 }}>(Optional)</span></label>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input
                      type="text"
                      placeholder="City name or postcode"
                      value={centreSearchQuery}
                      onChange={e => {
                        const val = e.target.value;
                        setCentreSearchQuery(val);
                        // Detect postcode pattern — defer to Find button
                        const isPostcode = /^[A-Z]{1,2}[0-9]/i.test(val.trim());
                        if (!isPostcode) {
                          handleLiveCitySearch(val);
                        } else {
                          setShowCentreResults(false);
                        }
                      }}
                      onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleFindCentres(); } }}
                      className="input-control"
                      style={{ flex: 1 }}
                    />
                    {/* Show Find button only when input looks like a postcode */}
                    {/^[A-Z]{1,2}[0-9]/i.test(centreSearchQuery.trim()) && (
                      <button
                        type="button"
                        onClick={handleFindCentres}
                        disabled={centreSearchLoading}
                        style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", padding: "0 20px", height: "46px", fontWeight: 700, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", flexShrink: 0 }}
                      >
                        {centreSearchLoading ? <Loader2 size={15} className="animate-spin" /> : null}
                        Find
                      </button>
                    )}
                  </div>

                  {/* Results dropdown */}
                  {showCentreResults && (
                    <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", marginTop: "6px", overflow: "hidden", background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                      {centreSearchResults.length === 0 ? (
                        <div style={{ padding: "14px 16px", color: "#94a3b8", fontSize: "14px", textAlign: "center" }}>No results found</div>
                      ) : (
                        centreSearchResults.map((c, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setTestDetails(p => ({ ...p, testCentreCity: c.name }));
                              setShowCentreResults(false);
                              setCentreSearchQuery(c.name);
                            }}
                            style={{ width: "100%", background: "none", border: "none", borderBottom: i < centreSearchResults.length - 1 ? "1px solid #f1f5f9" : "none", padding: "12px 16px", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                            onMouseLeave={e => (e.currentTarget.style.background = "none")}
                          >
                            <div>
                              <div style={{ fontWeight: 700, fontSize: "14px", color: "#0f172a" }}>{c.name}</div>
                              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{c.address}</div>
                            </div>
                            {c.distance && <span style={{ fontSize: "12px", color: "#2563eb", fontWeight: 700, flexShrink: 0, marginLeft: "12px" }}>{c.distance}</span>}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Test Centre city/name with live fuzzy search */}
                <div className="field-group" style={{ marginBottom: "0", position: "relative" }}>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "16px", pointerEvents: "none" }}>📍</span>
                    <input
                      type="text"
                      placeholder="e.g. Manchester"
                      value={testDetails.testCentreCity}
                      onChange={e => {
                        const val = e.target.value;
                        setTestDetails(p => ({ ...p, testCentreCity: val }));
                        const q = val.trim().toLowerCase();
                        if (!q) { setCitySearchResults([]); setShowCityResults(false); return; }
                        const scored = allCentres
                          .map(c => ({ c, score: fuzzyScore(c, q) }))
                          .filter(x => x.score > 0)
                          .sort((a, b) => b.score - a.score)
                          .slice(0, 6)
                          .map(x => ({ name: x.c.name, address: x.c.address }));
                        setCitySearchResults(scored);
                        setShowCityResults(true);
                      }}
                      onBlur={() => setTimeout(() => setShowCityResults(false), 150)}
                      className="input-control"
                      style={{ paddingLeft: "38px" }}
                    />
                  </div>
                  {/* City fuzzy dropdown */}
                  {showCityResults && (
                    <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", marginTop: "6px", overflow: "hidden", background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", position: "relative", zIndex: 10 }}>
                      {citySearchResults.length === 0 ? (
                        <div style={{ padding: "14px 16px", color: "#94a3b8", fontSize: "14px", textAlign: "center" }}>No results found</div>
                      ) : (
                        citySearchResults.map((c, i) => (
                          <button
                            key={i}
                            type="button"
                            onMouseDown={() => {
                              setTestDetails(p => ({ ...p, testCentreCity: c.name }));
                              setShowCityResults(false);
                            }}
                            style={{ width: "100%", background: "none", border: "none", borderBottom: i < citySearchResults.length - 1 ? "1px solid #f1f5f9" : "none", padding: "12px 16px", textAlign: "left", cursor: "pointer" }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                            onMouseLeave={e => (e.currentTarget.style.background = "none")}
                          >
                            <div style={{ fontWeight: 700, fontSize: "14px", color: "#0f172a" }}>{c.name}</div>
                            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{c.address}</div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Test Slot Details */}
              <div className="citb-card">
                <h2 className="citb-section-title">Test Slot Details</h2>

                {/* Preferred & Alternate Date */}
                <div className="field-grid" style={{ marginBottom: "8px" }}>
                  <div className="field-group">
                    <label className="field-label">Preferred Date <span style={{ color: "#ef4444" }}>*</span></label>
                    <DatePickerField
                      value={testDetails.preferredDate}
                      minDate={new Date(Date.now() + 86400000)}
                      onChange={(value) => {
                        setTestDetails(p => ({ ...p, preferredDate: value }));
                        setTestDetailErrors(p => ({ ...p, preferredDate: "" }));
                      }}
                      placeholder="Select preferred date"
                      hasError={!!testDetailErrors.preferredDate}
                    />
                    {testDetailErrors.preferredDate && <span className="error-msg">{testDetailErrors.preferredDate}</span>}
                  </div>
                  <div className="field-group">
                    <label className="field-label">Alternate Date</label>
                    <DatePickerField
                      value={testDetails.alternateDate}
                      minDate={new Date(Date.now() + 86400000)}
                      onChange={(value) => setTestDetails(p => ({ ...p, alternateDate: value }))}
                      placeholder="Select alternate date"
                    />
                  </div>
                </div>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "24px", marginTop: "4px" }}>
                  * Dates are subject to availability, please select the alternate date in case your preferred date is not available.
                </p>

                {/* Preferred Time */}
                <div className="field-group" style={{ marginBottom: "20px" }}>
                  <label className="field-label">Preferred Time</label>
                  <select
                    value={testDetails.preferredTime}
                    onChange={e => setTestDetails(p => ({ ...p, preferredTime: e.target.value }))}
                    className="input-control"
                    disabled={!testDetails.testType || !testDetails.testCentreCity}
                  >
                    <option value="">⊙ Preferred Time Slot</option>
                    <option value="morning">Morning (9:00 AM – 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM – 3:00 PM)</option>
                    <option value="late-afternoon">Late Afternoon (3:00 PM – 5:30 PM)</option>
                  </select>
                  {(!testDetails.testType || !testDetails.testCentreCity) && (
                    <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "6px" }}>Select a Test Type and Location to continue</p>
                  )}
                </div>

                {/* Multi-test / retake Opt-in */}
                <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", cursor: "pointer", fontSize: "14px", color: "#475569" }}>
                  <input
                    type="checkbox"
                    checked={testDetails.optInRetake}
                    onChange={e => setTestDetails(p => ({ ...p, optInRetake: e.target.checked }))}
                    style={{ marginTop: "3px", width: "16px", height: "16px", cursor: "pointer" }}
                  />
                  <span>
                    Book multiple tests / include a retake{" "}
                    <em style={{ fontSize: "12px", color: "#94a3b8" }}>
                      (+£{CITB_MULTI_TEST_ADDON_GBP})
                    </em>
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="action-bar">
                <button type="button" onClick={() => setStep(1)} className="btn-back">Back</button>
                <button type="submit" className="btn-proceed">
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* ─── STEP 3 (was 2): Confirm ─── */}
          {step === 3 && (
            <div className="summary-card">
              <h2 className="citb-section-title" style={{ fontSize: "24px" }}>Confirm Details</h2>
              <p style={{ fontSize: "15px", color: "#64748b", marginTop: "-16px", marginBottom: "32px" }}>
                Please review your test details below before booking.
              </p>

              <div className="summary-grid">
                <div>
                  <span className="summary-item-label">Name</span>
                  <span className="summary-item-value">{formData.title} {formData.firstName} {formData.middleName} {formData.lastName}</span>
                </div>
                <div>
                  <span className="summary-item-label">Date of Birth</span>
                  <span className="summary-item-value">{formData.dobDay}/{formData.dobMonth}/{formData.dobYear}</span>
                </div>
                <div>
                  <span className="summary-item-label">Phone Number</span>
                  <span className="summary-item-value">+44 {formData.phoneNumber}</span>
                </div>
                <div>
                  <span className="summary-item-label">Email Address</span>
                  <span className="summary-item-value">{formData.emailAddress}</span>
                </div>
                {formData.niNumber && (
                  <div>
                    <span className="summary-item-label">National Insurance Number</span>
                    <span className="summary-item-value">{formData.niNumber}</span>
                  </div>
                )}
                <div>
                  <span className="summary-item-label">Address</span>
                  <span className="summary-item-value">
                    {formData.addressLine1}, {formData.locality ? formData.locality + ", " : ""}{formData.city}, {formData.county}, {formData.postcode}
                  </span>
                </div>
              </div>

              <div className="payment-breakdown">
                <h3 style={{ fontWeight: 800, fontSize: "15px", color: "#0f172a", marginBottom: "16px" }}>Booking Fees</h3>
                <div className="breakdown-row">
                  <span>CITB HS&amp;E Test Booking</span>
                  <span>£{CITB_BASE_PRICE_GBP.toFixed(2)}</span>
                </div>
                {testDetails.optInRetake && (
                  <div className="breakdown-row">
                    <span>Multiple tests / retake</span>
                    <span>£{CITB_MULTI_TEST_ADDON_GBP.toFixed(2)}</span>
                  </div>
                )}
                <div className="breakdown-row total">
                  <span>Total Amount</span>
                  <span>£{bookingTotal.toFixed(2)}</span>
                </div>
              </div>

              {payError && (
                <p className="error-msg" style={{ marginBottom: "16px", display: "block" }}>
                  {payError}
                </p>
              )}

              <div className="action-bar">
                <button type="button" onClick={() => setStep(2)} className="btn-back">
                  Edit Details
                </button>
                <button 
                  type="button" 
                  onClick={() => void handleFinalConfirm()} 
                  className="btn-proceed" 
                  disabled={loading}
                  style={{ background: "#2563eb" }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      <span>Redirecting to Stripe...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Confirm and Pay £{bookingTotal.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ─── STEP 4 (was 3): Success ─── */}
          {step === 4 && (
            <div className="summary-card" style={{ textAlign: "center", padding: "48px 32px" }}>
              <div style={{
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
              }}>
                <CheckCircle size={40} />
              </div>
              <h2 className="book-hero-title" style={{ color: "#0f172a", fontSize: "28px" }}>Booking Request Received!</h2>
              <p style={{ fontSize: "15px", color: "#64748b", maxWidth: "480px", margin: "12px auto 32px auto", lineHeight: 1.6 }}>
                Thank you! Your CITB Health, Safety &amp; Environment test booking request has been received. Our processing team will book your test at the nearest test centre based on your postcode.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left mb-8 text-sm text-slate-600 space-y-2 max-w-md mx-auto">
                <p><strong>Candidate Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>Email Address:</strong> {formData.emailAddress}</p>
                <p><strong>Phone Number:</strong> +44 {formData.phoneNumber}</p>
                <p><strong>Postcode Selected:</strong> {formData.postcode}</p>
              </div>

              <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                <button onClick={() => router.push("/")} className="btn-back">
                  Go to Homepage
                </button>
                <button onClick={handleReset} className="btn-proceed" style={{ background: "#2563eb" }}>
                  Book Another Test
                </button>
              </div>
            </div>
          )}

          {/* Information Guide Card */}
          <div className="info-card" style={{ marginTop: "40px" }}>
            {/* Section 4: FAQs */}
            <div className="info-block" style={{ marginTop: 0 }}>
              <h2 className="section-header">Frequently Asked Questions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {faqs.map((faq, idx) => (
                  <div key={idx} className="faq-item">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="faq-trigger"
                    >
                      <span>{faq.question}</span>
                      {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {openFaq === idx && (
                      <div className="faq-content">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: What is CITB Test */}
            <div className="info-block">
              <h2 className="section-header">What is CITB Health, Safety and Environment Test?</h2>
              <div className="inner-pad bg-slate-50 border border-slate-200 rounded-2xl p-6 text-slate-600 text-sm leading-relaxed space-y-4">
                <p>
                  The CITB Test (Touchscreen test) is required to qualify for a CSCS Card. The official name for the test is <strong>CITB Health, Safety, and Environment Test</strong>. To book a CITB test you need to fill the above form and your test booking confirmation will be sent to you via email and phone. <strong>Construction Card Assistance</strong> works exclusively with the construction industry and helps workers with proper guidance to achieve their construction cards.
                </p>
              </div>
            </div>

            {/* Section 6: Identification Requirements */}
            <div className="info-block" style={{ marginBottom: 0 }}>
              <h2 className="section-header">Identification (ID) Requirements for HS&amp;E Tests</h2>
              
              <div className="inner-pad bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-5 mb-6 text-sm flex gap-3" style={{ marginBottom: "20px" }}>
                <AlertTriangle className="flex-shrink-0" size={20} />
                <div>
                  <strong>IMPORTANT:</strong> Candidates will not be admitted for a test if the required forms of ID are not provided and the test fee will not be reimbursed.
                </div>
              </div>

              <div className=" inner-pad border border-slate-200 rounded-2xl p-8 space-y-6">
                <div className="text-slate-600 text-sm leading-relaxed">
                  <p className="mb-4">All documents presented by the candidate as identification must:</p>
                  <ul className=" inner-pad list-disc pl-5 space-y-2 mb-6">
                    <li>be originals (no photocopies or digital copies – with exception of an e-Visa)</li>
                    <li>be in date (valid) at the time of being provided (not expired)</li>
                    <li>be in the candidate’s name (which must match the name on the test booking)*</li>
                  </ul>
                  <p className="text-xs text-slate-500 italic mb-10px">
                    *Candidates must provide additional evidence if their name has changed since the ID document was issued. This additional evidence must be original and show a clear link between the name shown on the candidate’s ID and their current name, such as a marriage or civil partnership certificate, a decree absolute or decree nisi papers or a deed poll.
                  </p>
                </div>

                {/* Primary ID */}
                <div className="id-card" style={{ borderLeft: "4px solid #0369a1" }}>
                  <span className="id-badge primary">Primary ID Requirements</span>
                  <p className="text-sm text-slate-600 mb-4">
                    Candidates must provide <strong>one form of Primary ID</strong>. The Primary ID must include the candidate’s full name, a recognisable photograph, and a signature (with exception of an e-Visa).
                  </p>
                  <ul className="id-list">
                    <li className="id-item">Passport (UK or International)</li>
                    <li className="id-item">Photocard Driving Licence (UK or European)</li>
                    <li className="id-item">eVisa (using View &amp; Prove via UKVI account)</li>
                  </ul>
                </div>

                {/* Secondary ID */}
                <div className="id-card" style={{ borderLeft: "4px solid #d97706" }}>
                  <span className="id-badge secondary">Secondary ID Requirements</span>
                  <p className="text-sm text-slate-600 mb-4">
                    If candidates do not have the required form of Primary ID, they may present **two forms of Secondary ID** (one from List A and one from List B).
                  </p>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px", marginTop: "16px" }}>
                    <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px" }}>
                      <strong style={{ fontSize: "13px", display: "block", marginBottom: "8px", color: "#0f172a" }}>List A (Must contain photo)</strong>
                      <ul style={{ listStyle: "circle", paddingLeft: "20px", fontSize: "13px", color: "#475569" }} className="space-y-1">
                        <li>Passport without signature</li>
                        <li>European National Identity Card UK</li>
                        <li>CitizenCard (PASS hologram)</li>
                        <li>Young Scot Card (PASS hologram)</li>
                        <li>CSCS Card or CSCS Partner Card</li>
                        <li>UK Armed Forces ID / Veteran ID Card</li>
                        <li>UK Home Office Travel Document</li>
                      </ul>
                    </div>

                    <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px" }}>
                      <strong style={{ fontSize: "13px", display: "block", marginBottom: "8px", color: "#0f172a" }}>List B (Must contain signature)</strong>
                      <ul style={{ listStyle: "circle", paddingLeft: "20px", fontSize: "13px", color: "#475569" }} className="space-y-1">
                        <li>Credit Card</li>
                        <li>Debit Card</li>
                        <li>Paper Driving Licence (issued before 31 March 2000)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Other ID options */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px", paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: "15px", color: "#0f172a", marginBottom: "8px" }}>HS&amp;E Test ID Waiver Form</h4>
                    <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5 }}>
                      Only to be used in exceptional circumstances where the candidate cannot provide the required Primary or Secondary ID. The HS&amp;E Test ID Waiver Form must include a countersigned photograph of the candidate and their signature.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: "15px", color: "#0f172a", marginBottom: "8px" }}>Under 16 Confirmation of Identification Form</h4>
                    <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5 }}>
                      Only to be used where the candidate is under 16 and cannot provide the required ID. This form must be completed together with the parental consent form and be signed by someone in a position of responsibility at the school or college that the candidate attends.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BookCitbTestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-slate-500">Loading form...</div>}>
      <BookCitbTestForm />
    </Suspense>
  );
}

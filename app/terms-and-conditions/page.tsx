"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShieldAlert, FileText, Calendar, CheckSquare, RefreshCw, MessageSquare, CreditCard, Mail, Info } from "lucide-react";

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        <style>{`
          .terms-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
            padding: 80px 24px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .terms-hero-content {
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
          }

          .terms-hero-badge {
            display: inline-block;
            background: rgba(99, 102, 241, 0.15);
            color: #818cf8;
            font-size: 13px;
            font-weight: 700;
            padding: 6px 16px;
            border-radius: 99px;
            margin-bottom: 20px;
            border: 1px solid rgba(99, 102, 241, 0.2);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .terms-hero-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 42px;
            font-weight: 800;
            letter-spacing: -0.03em;
            margin-bottom: 16px;
          }

          .terms-hero-desc {
            font-size: 16px;
            color: #94a3b8;
            line-height: 1.6;
          }

          .terms-content-container {
            max-width: 900px;
            width: 100%;
            margin: 60px auto;
            padding: 0 24px;
            box-sizing: border-box;
          }

          .terms-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 24px;
            padding: 48px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02), 0 10px 15px -3px rgba(0,0,0,0.03);
          }

          .terms-section {
            margin-bottom: 40px;
          }
          .terms-section:last-child {
            margin-bottom: 0;
          }

          .terms-section-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 18px;
            letter-spacing: -0.01em;
            border-left: 4px solid #2563eb;
            padding-left: 12px;
            line-height: 1.3;
          }

          .terms-card a {
            word-break: break-all;
            overflow-wrap: break-word;
          }

          .terms-p {
            font-size: 15px;
            color: #475569;
            line-height: 1.8;
            margin-bottom: 16px;
          }
          .terms-p:last-child {
            margin-bottom: 0;
          }

          .terms-list {
            margin-bottom: 16px;
            padding-left: 20px;
            list-style-type: disc;
          }

          .terms-li {
            font-size: 15px;
            color: #475569;
            line-height: 1.8;
            margin-bottom: 8px;
          }
          .terms-li:last-child {
            margin-bottom: 0;
          }

          .terms-highlight-box {
            background: #f8fafc;
            border-left: 4px solid #6366f1;
            padding: 20px;
            border-radius: 0 12px 12px 0;
            margin-bottom: 20px;
          }

          @media (max-width: 640px) {
            .terms-hero {
              padding: 60px 16px;
            }
            .terms-hero-title {
              font-size: 32px;
            }
            .terms-content-container {
              margin: 24px auto;
              padding: 0 16px;
            }
            .terms-card {
              padding: 24px;
              width: 100%;
              box-sizing: border-box;
            }
          }
        `}</style>

        <div className="terms-hero">
          <div className="terms-hero-content">
            <span className="terms-hero-badge">Policy & Agreement</span>
            <h1 className="terms-hero-title">Terms & Conditions</h1>
            <p className="terms-hero-desc">
              Please read these terms and conditions carefully before booking any tests or cards.
            </p>
          </div>
        </div>

        <div className="terms-content-container">
          <div className="terms-card">

            {/* Section 1 */}
            <div className="terms-section">
              <h2 className="terms-section-title">Ownership and Website Access</h2>
              <p className="terms-p">
                <strong>Construction Card Assistance</strong> is owned and operated by <strong>Construction Card Assistance Ltd</strong> (www.constructionworkersupport.com).
              </p>
              <div className="terms-highlight-box">
                <p className="terms-p" style={{ margin: 0 }}>
                  <strong>Terminology for Construction Card Assistance:</strong> The terms “we”, “our”, “us” and “ours” refer to Construction Card Assistance within these terms and conditions.
                </p>
              </div>
              <p className="terms-p">
                <strong>Terminology for Customer:</strong> The terms “you”, “your”, “yours”, “candidate”, and “customer” refer to users of the www.constructionworkersupport.com website and people that have accessed any of our services.
              </p>
            </div>

            {/* Section 2 */}
            <div className="terms-section">
              <h2 className="terms-section-title">Booking for a Business</h2>
              <p className="terms-p">
                If you are using our service on behalf of a business that you work for, by paying for our services you confirm that you have authority from the business owner and they have authorised you to make payment for the services offered by Construction Card Assistance via our website.
              </p>
            </div>

            {/* Section 3 */}
            <div className="terms-section">
              <h2 className="terms-section-title">Application and Edits to Terms</h2>
              <p className="terms-p">
                Our terms and conditions are applicable to any company or individual that makes single (individual) or multiple bookings with Construction Card Assistance. You confirm that by accessing our services and using www.constructionworkersupport.com, you agree to our Terms and Conditions.
              </p>
              <p className="terms-p">
                Construction Card Assistance reserves the right to edit or amend any of our Terms and conditions whenever it is appropriate, without providing notice to the customer. Any new terms created or edited existing terms will apply only to the bookings made after the new terms are added to the website and bookings policy. The terms on the Construction Card Assistance website when you place your booking will be the terms which apply to you.
              </p>
              <p className="terms-p">
                It is the responsibility of our customers to ensure that they agree and comply with our terms and conditions before they place their booking.
              </p>
            </div>

            {/* Section 4 */}
            <div className="terms-section">
              <h2 className="terms-section-title">Age Restrictions & Payments</h2>
              <ul className="terms-list">
                <li className="terms-li">
                  <strong>Age Restrictions:</strong> We cannot book tests for any persons under the age of 16.
                </li>
                <li className="terms-li">
                  <strong>Payment Currencies:</strong> All payments are processed in GBP (Great British Pounds).
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="terms-section">
              <h2 className="terms-section-title">Terms & Conditions of Bookings</h2>
              <p className="terms-p">
                All bookings that are made are on a “subject to availability” basis. Our team will always endeavour to secure you the time and date that you requested, however, this cannot always be achieved.
              </p>
              <p className="terms-p">
                In the rare cases where we cannot secure you the date and time that you requested, our team will always look to book the nearest available time and date.
              </p>
            </div>

            {/* Section 6 */}
            <div className="terms-section">
              <h2 className="terms-section-title">Booking Communication</h2>
              <p className="terms-p">
                Construction Card Assistance forwards all customers a confirmation email and text to your mobile within 48 working hours from the time the booking is made. The customer can also receive confirmation via text to confirm their date and time, if he specifically requests for the same.
              </p>
              <p className="terms-p">
                If the customer has not received any correspondence from Construction Card Assistance within 48 hours, they are advised to email our support team at <a href="mailto:support@constructioncardassistance.co.uk" style={{ color: "#2563eb", fontWeight: 700 }}>support@constructioncardassistance.co.uk</a>.
              </p>
            </div>

            {/* Section 7 */}
            <div className="terms-section">
              <h2 className="terms-section-title">Rescheduling or Cancelling a Test Booking</h2>
              <p className="terms-p">
                You can reschedule your test before it takes place when the request is made at minimum of four working days (96 hours) prior to the scheduled test date. Construction Card Assistance will reschedule tests free of charge in these cases.
              </p>
              <p className="terms-p">
                Any requests to reschedule inside 96 hours of the scheduled test date & time will result in a new booking being required and an additional testing fee will apply. Please note that if you wish to reschedule your test within 96 hours of the original test date that we provided, we have to wait 48 hours until your original test date has passed.
              </p>
              <p className="terms-p">
                Cancellation requests are subject to a <strong>£20.00 administration and cancellation fee</strong>; this fee covers and includes, but is not limited to, communication with the candidate, cancellation of requested tests with CITB and the refund process.
              </p>
              <p className="terms-p">
                In case of test + retake cancellation, an additional <strong>£10.00</strong> will be deducted along with the standard cancellation fee which is £20.00.
              </p>
              <p className="terms-p">
                <strong>Proof of Booking:</strong> After placing your booking you will receive a confirmation email sent by us, which acts as a receipt of payment and will serve as proof of the booking and payment made, along with your full acceptance of all terms & conditions as detailed here.
              </p>
              <p className="terms-p">
                We do not accept liability if payment is refused or declined by the credit/debit card supplier.
              </p>
            </div>

            {/* Section 8 */}
            <div className="terms-section">
              <h2 className="terms-section-title">Booking Your Test via Construction Card Assistance</h2>
              <p className="terms-p">
                By booking your test with us, you fully acknowledge that your booking is for the arrangement of the test and not for the date that you selected (which are always sold “subject to availability”). The fee that you pay is inclusive of the £22 test fee and our booking and support fee.
              </p>
              <p className="terms-p">
                The details that you provide us with when filling out the form will be used to process your booking. We are not responsible if your booking is placed with any incorrect details that you have provided us. If any error is made on our behalf, such as incorrectly submitting the exact details that you have provided us with, it is our responsibility and we will not charge for any amendments.
              </p>
              <p className="terms-p">
                The Construction Card Assistance team is tasked to review any inaccuracies for every booking submitted. If we require any additional information from you, or believe that you may have booked the wrong test or test centre, we will contact you via email to confirm that all your details are correct before booking your test. Please contact us if there are any errors or inaccurate details in your order at <a href="mailto:support@constructioncardassistance.co.uk" style={{ color: "#2563eb", fontWeight: 700 }}>support@constructioncardassistance.co.uk</a>.
              </p>
              <p className="terms-p">
                It is your responsibility to attend the test centre to sit the test on the correct date and time. We cannot accept liability for your absence under any circumstance. It is also your responsibility to take the correct ID/documentation to the test centre.
              </p>
              <p className="terms-p">
                Construction Card Assistance will not be held responsible for any actions taken after the confirmed booking of the test, once the confirmation has forwarded to you by us. Your payment is fully inclusive of the fee for the test, along with an administration fee. As a third party booking agent, we charge a fee for the management service we provide. Our service includes the following:
              </p>
              <ul className="terms-list">
                <li className="terms-li">Reviewing each booking to ensure that our customers details appear correct and they are booking onto the correct test</li>
                <li className="terms-li">Securing the time, date and venue requested by the customer (or nearest date/time to that requested) for each booking</li>
                <li className="terms-li">Contacting the customer and informing them of their confirmed test dates via email and/or text message</li>
                <li className="terms-li">Dealing with any requests to reschedule a customers test and action cancellations when required.</li>
              </ul>
              <p className="terms-p">
                The price that you pay for our booking service will be the price that is displayed at the booking stage on the website. Construction Card Assistance requires the full cleared payment before we are able to book your test. The statutory rights that you have as a consumer are not affected by these terms and conditions.
              </p>
            </div>

            {/* Section 9 */}
            <div className="terms-section">
              <h2 className="terms-section-title">Other Rights When Booking</h2>
              <p className="terms-p">
                <strong>The right to cancel your test:</strong> You have a right to cancel a booked test and receive a partial refund. If you wish to cancel your test, you need to contact us via the email below:
                <br />
                <a href="mailto:support@constructioncardassistance.co.uk" style={{ color: "#2563eb", fontWeight: 700 }}>support@constructioncardassistance.co.uk</a>
                <br />
                <a href="https://www.constructionworkersupport.com/contact-us" target="_blank" style={{ color: "#2563eb", textDecoration: "underline" }}>https://www.constructionworkersupport.com/contact-us</a>
              </p>
              <p className="terms-p">
                <strong>The right to reschedule your test:</strong> If you need to reschedule a test, this must be done at least 96 hours before the scheduled test date. Please forward this request to <a href="mailto:support@constructioncardassistance.co.uk" style={{ color: "#2563eb", fontWeight: 700 }}>support@constructioncardassistance.co.uk</a>.
              </p>
              <p className="terms-p">
                You will be required to provide us with the following details:
              </p>
              <ul className="terms-list">
                <li className="terms-li">Your full name and booking reference number.</li>
                <li className="terms-li">At least 3 alternative test dates that you are available.</li>
              </ul>
              <p className="terms-p">
                To ensure that we can reschedule your test in time, we require these details at least 3 working days prior to your test date. If you fail to contact us with the details that we have outlined, we will be unable to reschedule your test until 48 hours after the original test date has passed.
              </p>
              <p className="terms-p">
                By agreeing to these Terms stipulated here, you thus agree to the terms of our Privacy Policy. Please see <a href="/privacy-policy" style={{ color: "#2563eb", textDecoration: "underline" }}>our Privacy Policy</a> for more details.
              </p>
            </div>

            {/* Section 10 */}
            <div className="terms-section">
              <h2 className="terms-section-title">One Day Courses Booking & Cancellation</h2>
              <p className="terms-p">
                The One day awareness course once booked cannot be cancelled and is non-refundable. Construction Card Assistance Ltd reserves the right to cancel or alter the Course Dates or the provision of Services or the Location and the individual or the organisation providing the Service or make reasonable variations to the courses without prior notice.
              </p>
              <p className="terms-p">
                In event of cancellation, the booking will normally be transferred to the next available Course unless the Customer specifically requests otherwise.
              </p>
              <p className="terms-p">
                <strong>Cancellation, reschedules and non-attendance policy:</strong> Construction Card Assistance will not be held responsible for any reason that a candidate cannot attend the course. Examples include bad weather, vehicle break down or any other reason that may stop the candidate from attending the day course.
              </p>
            </div>

            {/* Section 11 */}
            <div className="terms-section">
              <h2 className="terms-section-title">Card Booking & Cancellation Policy</h2>
              <p className="terms-p">
                On applying for your CSCS Card with us, you give permission to Construction Card Assistance Ltd to contact CSCS on your behalf to resolve any issues with your application.
              </p>
              <p className="terms-p">
                Cancellation requests are subject to a <strong>£24.00 administration and cancellation fee</strong>; this fee covers and includes, but is not limited to, communication with the candidate and communication with CSCS and the refund process.
              </p>
              <p className="terms-p">
                Once you have completed the booking for your Card, you will receive an email listing the documents required for applying for your Card within 48 hours. It is advised that you send a clear photograph of all relevant documents requested by the card processing team promptly via email. Not doing so can delay the Card processing.
              </p>
              <p className="terms-p">
                Please note that if you are unable to send the relevant requested documents within 60 days of booking, Construction Card Assistance Ltd reserves the right to cancel your Card booking. In this case, no refund can be issued.
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

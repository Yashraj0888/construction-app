"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShieldCheck, Eye, Lock, Globe, Server, Database, Info, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        <style>{`
          .privacy-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
            padding: 80px 24px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .privacy-hero-content {
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
          }

          .privacy-hero-badge {
            display: inline-block;
            background: rgba(16, 185, 129, 0.15);
            color: #34d399;
            font-size: 13px;
            font-weight: 700;
            padding: 6px 16px;
            border-radius: 99px;
            margin-bottom: 20px;
            border: 1px solid rgba(16, 185, 129, 0.2);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .privacy-hero-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 42px;
            font-weight: 800;
            letter-spacing: -0.03em;
            margin-bottom: 16px;
          }

          .privacy-hero-desc {
            font-size: 16px;
            color: #94a3b8;
            line-height: 1.6;
          }

          .privacy-content-container {
            max-width: 900px;
            width: 100%;
            margin: 60px auto;
            padding: 0 24px;
            box-sizing: border-box;
          }

          .privacy-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 24px;
            padding: 48px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02), 0 10px 15px -3px rgba(0,0,0,0.03);
          }

          .privacy-section {
            margin-bottom: 40px;
          }
          .privacy-section:last-child {
            margin-bottom: 0;
          }

          .privacy-section-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 18px;
            letter-spacing: -0.01em;
            border-left: 4px solid #10b981;
            padding-left: 12px;
            line-height: 1.3;
          }

          .privacy-card a {
            word-break: break-all;
            overflow-wrap: break-word;
          }

          .privacy-p {
            font-size: 15px;
            color: #475569;
            line-height: 1.8;
            margin-bottom: 16px;
          }
          .privacy-p:last-child {
            margin-bottom: 0;
          }

          .privacy-list {
            margin-bottom: 16px;
            padding-left: 20px;
            list-style-type: disc;
          }

          .privacy-li {
            font-size: 15px;
            color: #475569;
            line-height: 1.8;
            margin-bottom: 8px;
          }
          .privacy-li:last-child {
            margin-bottom: 0;
          }

          .privacy-highlight-box {
            background: #f0fdf4;
            border-left: 4px solid #34d399;
            padding: 20px;
            border-radius: 0 12px 12px 0;
            margin-bottom: 20px;
          }

          @media (max-width: 640px) {
            .privacy-hero {
              padding: 60px 16px;
            }
            .privacy-hero-title {
              font-size: 32px;
            }
            .privacy-content-container {
              margin: 24px auto;
              padding: 0 16px;
            }
            .privacy-card {
              padding: 24px;
              width: 100%;
              box-sizing: border-box;
            }
          }
        `}</style>

        <div className="privacy-hero">
          <div className="privacy-hero-content">
            <span className="privacy-hero-badge">Information Security</span>
            <h1 className="privacy-hero-title">Construction Card Assistance Privacy Policy</h1>
            <p className="privacy-hero-desc">
              Your security and privacy are of utmost importance to us. Learn how we handle your personal information.
            </p>
          </div>
        </div>

        <div className="privacy-content-container">
          <div className="privacy-card">

            {/* Intro */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">Introduction</h2>
              <p className="privacy-p">
                This privacy policy has been compiled to better serve those who are concerned with how their ‘Personally Identifiable Information’ (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context.
              </p>
              <p className="privacy-p">
                Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.
              </p>
            </div>

            {/* Section 1 */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">What Personal Information Do We Collect?</h2>
              <p className="privacy-p">
                When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, phone number or other details to help you with your experience.
              </p>
            </div>

            {/* Section 2 */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">When Do We Collect Information?</h2>
              <p className="privacy-p">
                We collect information from you when you place an order, fill out a form or enter information on our site.
              </p>
            </div>

            {/* Section 3 */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">How Do We Use Your Information?</h2>
              <p className="privacy-p">
                We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:
              </p>
              <ul className="privacy-list">
                <li className="privacy-li">To quickly process your transactions.</li>
                <li className="privacy-li">To follow up with them after correspondence (live chat, email or phone inquiries).</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">How Do We Protect Your Information?</h2>
              <p className="privacy-p">
                Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible.
              </p>
              <ul className="privacy-list">
                <li className="privacy-li">We use regular Malware Scanning.</li>
                <li className="privacy-li">Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.</li>
                <li className="privacy-li">In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</li>
                <li className="privacy-li">We implement a variety of security measures when a user places an order, enters, submits, or accesses their information to maintain the safety of your personal information.</li>
                <li className="privacy-li">All transactions are processed through a gateway provider and are not stored or processed on our servers.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">Do We Use Cookies?</h2>
              <p className="privacy-p">
                Yes. Cookies are small files that a site or its service provider transfers to your computer’s hard drive through your Web browser (if you allow) that enables the site’s or service provider’s systems to recognize your browser and capture and remember certain information.
              </p>
              <p className="privacy-p">
                For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.
              </p>
              <div className="privacy-highlight-box">
                <p className="privacy-p" style={{ margin: 0 }}>
                  <strong>We use cookies to:</strong> Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.
                </p>
              </div>
              <p className="privacy-p">
                You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since each browser is a little different, look at your browser’s Help Menu to learn the correct way to modify your cookies.
              </p>
              <p className="privacy-p">
                If you turn cookies off, some of the features that make your site experience more efficient may not function properly. It won’t affect the user’s experience that make your site experience more efficient and may not function properly.
              </p>
            </div>

            {/* Section 6 */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">Third-Party Disclosure & Links</h2>
              <p className="privacy-p">
                <strong>Third-Party Disclosure:</strong> We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information.
              </p>
              <p className="privacy-p">
                <strong>Third-Party Links:</strong> Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.
              </p>
            </div>

            {/* Section 7 */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">Google Advertising</h2>
              <p className="privacy-p">
                Google’s advertising requirements can be summed up by Google’s Advertising Principles. They are put in place to provide a positive experience for users. <a href="https://support.google.com/adspolicy/answer/6008942" target="_blank" style={{ color: "#10b981", textDecoration: "underline" }}>Google Advertising Policies</a>
              </p>
              <p className="privacy-p">
                We use Google Ads Advertising on our website. Google, as a third-party vendor, uses cookies to serve ads on our site. Google’s use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet. Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.
              </p>
              <div className="privacy-highlight-box">
                <p className="privacy-p" style={{ margin: 0, fontWeight: 700 }}>
                  We have implemented the following:
                </p>
                <p className="privacy-p" style={{ margin: 0, marginTop: "8px" }}>
                  We, along with third-party vendors such as Google use first-party cookies (such as the Google Analytics cookies) and third-party cookies (such as the DoubleClick cookie) or other third-party identifiers together to compile data regarding user interactions with ad impressions and other ad service functions as they relate to our website.
                </p>
              </div>
              <p className="privacy-p">
                <strong>Opting out:</strong> Users can set preferences for how Google advertises to you using the Google Ad Settings page. Alternatively, you can opt out by visiting the Network Advertising Initiative Opt Out page or by using the Google Analytics Opt Out Browser add on.
              </p>
            </div>

            {/* Section 8 */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">California Online Privacy Protection Act (CalOPPA)</h2>
              <p className="privacy-p">
                CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law’s reach stretches well beyond California to require any person or company in the United States (and conceivably the world) that operates websites collecting Personally Identifiable Information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals or companies with whom it is being shared.
              </p>
              <div className="privacy-highlight-box">
                <p className="privacy-p" style={{ margin: 0, fontWeight: 700 }}>
                  According to CalOPPA, we agree to the following:
                </p>
                <ul className="privacy-list" style={{ margin: 0, marginTop: "8px" }}>
                  <li className="privacy-li">Users can visit our site anonymously.</li>
                  <li className="privacy-li">Once this privacy policy is created, we will add a link to it on our home page or as a minimum, on the first significant page after entering our website.</li>
                  <li className="privacy-li">Our Privacy Policy link includes the word ‘Privacy’ and can easily be found on the page specified above.</li>
                  <li className="privacy-li">You will be notified of any Privacy Policy changes on our Privacy Policy Page.</li>
                  <li className="privacy-li">You can change your personal information by emailing us.</li>
                </ul>
              </div>
            </div>

            {/* Section 9 */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">Do Not Track & Behavioral Tracking</h2>
              <p className="privacy-p">
                <strong>How does our site handle Do Not Track signals?</strong> We honor Do Not Track signals and Do Not Track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place.
              </p>
              <p className="privacy-p">
                <strong>Does our site allow third-party behavioral tracking?</strong> It’s also important to note that we do not allow third-party behavioral tracking.
              </p>
            </div>

            {/* Section 10 */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">COPPA (Children Online Privacy Protection Act)</h2>
              <p className="privacy-p">
                When it comes to the collection of personal information from children under the age of 13 years old, the Children’s Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, United States’ consumer protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children’s privacy and safety online.
              </p>
              <p className="privacy-p">
                We do not specifically market to children under the age of 13 years old. We do not let third-parties, including ad networks or plug-ins collect PII from children under 13.
              </p>
            </div>

            {/* Section 11 */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">Fair Information Practices</h2>
              <p className="privacy-p">
                The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.
              </p>
              <div className="privacy-highlight-box">
                <p className="privacy-p" style={{ margin: 0, fontWeight: 700 }}>
                  In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:
                </p>
                <ul className="privacy-list" style={{ margin: 0, marginTop: "8px" }}>
                  <li className="privacy-li">We will notify you via email within 7 business days.</li>
                  <li className="privacy-li">We will notify the users via in-site notification within 7 business days.</li>
                </ul>
              </div>
              <p className="privacy-p">
                We also agree to the Individual Redress Principle which requires that individuals have the right to legally pursue enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and/or prosecute non-compliance by data processors.
              </p>
            </div>

            {/* Section 12 */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">CAN SPAM Act</h2>
              <p className="privacy-p">
                The CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial messages, gives recipients the right to have emails stopped from being sent to them, and spells out tough penalties for violations.
              </p>
              <div className="privacy-highlight-box">
                <p className="privacy-p" style={{ margin: 0, fontWeight: 700 }}>
                  To be in accordance with CANSPAM, we agree to the following:
                </p>
                <p className="privacy-p" style={{ margin: 0, marginTop: "8px" }}>
                  If at any time you would like to unsubscribe from receiving future emails, you can email us at <a href="mailto:support@constructioncardassistance.co.uk" style={{ color: "#10b981", fontWeight: 700 }}>support@constructioncardassistance.co.uk</a> and we will promptly remove you from <strong>all</strong> correspondence.
                </p>
              </div>
            </div>

            {/* Section 13 */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">Contacting Us</h2>
              <p className="privacy-p">
                If there are any questions regarding this privacy policy, you may contact us using the information below:
              </p>
              <div className="privacy-highlight-box" style={{ background: "#f8fafc", borderColor: "#cbd5e1" }}>
                <p className="privacy-p" style={{ margin: 0 }}>
                  <strong>Website:</strong> <a href="https://www.constructionworkersupport.com" target="_blank" style={{ color: "#2563eb" }}>www.constructionworkersupport.com</a>
                  <br />
                  <strong>Email Support:</strong> <a href="mailto:support@constructioncardassistance.co.uk" style={{ color: "#2563eb" }}>support@constructioncardassistance.co.uk</a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

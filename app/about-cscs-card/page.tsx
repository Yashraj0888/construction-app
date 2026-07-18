"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { ExternalLink, Check, ChevronRight, HelpCircle, AlertCircle } from "lucide-react";

export default function AboutCscsCardPage() {
  const router = useRouter();

  const cardList = [
    {
      name: "Red trainee card",
      test: "Operatives Test",
      training: "NVQ Level 2 (Enrollment)",
      style: { bgHex: "#b91c1c", subhead: "TRAINEE", isWhite: false, isGold: false, isBlack: false }
    },
    {
      name: "Red Experienced worker (Temporary card)",
      test: "Operatives Test",
      training: "NVQ Level 2 (Enrollment)",
      style: { bgHex: "#b91c1c", subhead: "EXPERIENCED WORKER", isWhite: false, isGold: false, isBlack: false }
    },
    {
      name: "Red Experienced technician, supervisor or manager",
      test: "Specialist OR Managers & Professionals Test",
      training: "NVQ Level 4 or above (Enrollment)",
      style: { bgHex: "#b91c1c", subhead: "EXPERIENCED WORKER", isWhite: false, isGold: false, isBlack: false }
    },
    {
      name: "Blue Skilled worker",
      test: "Operative OR Specialist Test",
      training: "NVQ Level 2",
      style: { bgHex: "#1d4ed8", subhead: "SKILLED WORKER", isWhite: false, isGold: false, isBlack: false }
    },
    {
      name: "Black Manager Card",
      test: "Managers & Professional Test",
      training: "NVQ Level 4",
      style: { bgHex: "#0f172a", subhead: "MANAGER", isWhite: false, isGold: false, isBlack: true }
    },
    {
      name: "Gold Advanced Craft supervisory",
      test: "Operative OR Specialists Test",
      training: "NVQ Level 3",
      style: { bgHex: "#b45309", subhead: "SUPERVISOR", isWhite: false, isGold: true, isBlack: false }
    },
    {
      name: "White Professionally Qualified Person",
      test: "Managers & Professionals Test",
      training: "Member of governing body",
      style: { bgHex: "#f1f5f9", subhead: "QUALIFIED PERSON", isWhite: true, isGold: false, isBlack: false }
    },
    {
      name: "Academically Qualified Person",
      test: "Managers & Professionals Test",
      training: "Construction related degrees, HNDs, HNCs, CIOB Certificates and NEBOSH diplomas.",
      style: { bgHex: "#f1f5f9", subhead: "ACADEMIC PERSON", isWhite: true, isGold: false, isBlack: false }
    },
    {
      name: "Labourer Card",
      test: "Operative Test",
      training: "Any of the below:\n• QCF Level 1/SCQF Level 4 Award in Health and Safety in a Construction Environment\n• Site Safety Plus\n• Safe-2-Site",
      style: { bgHex: "#047857", subhead: "LABOURER", isWhite: false, isGold: false, isBlack: false }
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        <style>{`
          .about-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
            padding: 80px 24px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .about-hero-content {
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
          }

          .about-hero-badge {
            display: inline-block;
            background: rgba(37, 99, 235, 0.15);
            color: #3b82f6;
            font-size: 13px;
            font-weight: 700;
            padding: 6px 16px;
            border-radius: 99px;
            margin-bottom: 20px;
            border: 1px solid rgba(37, 99, 235, 0.2);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .about-hero-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 42px;
            font-weight: 800;
            letter-spacing: -0.03em;
            margin-bottom: 16px;
          }

          .about-hero-desc {
            font-size: 16px;
            color: #94a3b8;
            line-height: 1.6;
          }

          .about-content-container {
            max-width: 1100px;
            margin: 60px auto;
            padding: 0 24px;
            box-sizing: border-box;
          }

          .about-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 24px;
            padding: 48px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02), 0 10px 15px -3px rgba(0,0,0,0.03);
          }

          .about-section {
            margin-bottom: 48px;
          }
          .about-section:last-child {
            margin-bottom: 0;
          }

          .about-section-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 20px;
            letter-spacing: -0.02em;
            border-left: 4px solid #2563eb;
            padding-left: 14px;
            line-height: 1.3;
          }

          .about-p {
            font-size: 16px;
            color: #475569;
            line-height: 1.8;
            margin-bottom: 18px;
          }
          .about-p:last-child {
            margin-bottom: 0;
          }

          /* Apply Button */
          .apply-banner-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #2563eb;
            color: #ffffff;
            font-weight: 700;
            font-size: 15px;
            padding: 14px 28px;
            border-radius: 12px;
            text-decoration: none;
            width: 100%;
            max-width: 320px;
            margin: 32px auto;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px rgba(37, 99, 235, 0.15);
          }
          .apply-banner-btn:hover {
            background: #1d4ed8;
            transform: translateY(-1px);
            box-shadow: 0 6px 12px rgba(37, 99, 235, 0.25);
          }

          /* Table Styles */
          .table-wrapper {
            width: 100%;
            overflow-x: auto;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            margin-bottom: 32px;
          }
          
          .cscs-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 15px;
          }

          .cscs-table th {
            background: #f8fafc;
            color: #0f172a;
            font-weight: 700;
            padding: 16px 20px;
            border-bottom: 1px solid #e2e8f0;
            white-space: nowrap;
          }

          .cscs-table td {
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: middle;
            color: #475569;
          }

          .cscs-table tr:last-child td {
            border-bottom: none;
          }

          /* Mini Mockup styles (similar to CSCS Card Grid) */
          .cscs-mockup {
            width: 110px;
            height: 70px;
            border-radius: 6px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.08);
            border: 1px solid rgba(0,0,0,0.05);
            flex-shrink: 0;
          }

          .mockup-header {
            height: 10px;
            padding: 2px 4px;
            display: flex;
            align-items: center;
          }
          .mockup-stripes {
            display: flex;
            gap: 2px;
          }
          .mockup-stripe {
            border-radius: 1px;
          }

          .mockup-body {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 0 4px 2px 4px;
            flex-grow: 1;
          }

          .mockup-left {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .mockup-chip {
            width: 10px;
            height: 8px;
            border-radius: 1px;
          }

          .mockup-name {
            font-size: 4px;
            font-weight: 900;
            letter-spacing: 0.02em;
          }

          .mockup-photo-box {
            width: 16px;
            height: 20px;
            background: #cbd5e1;
            border-radius: 1.5px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .mockup-photo {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .mockup-footer {
            height: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 4.5px;
            text-transform: uppercase;
            border-top: 1px solid rgba(0, 0, 0, 0.05);
          }

          .mockup-card-white .mockup-footer {
            border-top: 1px solid rgba(0, 0, 0, 0.08);
          }

          .about-link-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-weight: 700;
            color: #2563eb;
            text-decoration: none;
            transition: all 0.2s ease;
          }
          .about-link-btn:hover {
            color: #1d4ed8;
            gap: 8px;
          }

          .about-bullet-list {
            margin-top: 12px;
            padding-left: 20px;
            list-style-type: none;
          }

          .about-bullet-li {
            position: relative;
            font-size: 16px;
            color: #475569;
            line-height: 1.8;
            margin-bottom: 12px;
            padding-left: 24px;
          }
          .about-bullet-li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: 900;
          }

          @media (max-width: 640px) {
            .about-hero {
              padding: 60px 16px;
            }
            .about-hero-title {
              font-size: 32px;
            }
            .about-content-container {
              margin: 24px auto;
              padding: 0 16px;
            }
            .about-card {
              padding: 24px;
            }
          }
        `}</style>

        <div className="about-hero">
          <div className="about-hero-content">
            <span className="about-hero-badge">Information Center</span>
            <h1 className="about-hero-title">About CSCS Card</h1>
            <p className="about-hero-desc">
              Understand the CSCS card requirements, grading scale, and how it impacts your career on construction sites.
            </p>
          </div>
        </div>

        <div className="about-content-container">
          <div className="about-card">
            
            {/* Section 1: Overview */}
            <div className="about-section">
              <h2 className="about-section-title">What is a CSCS Card?</h2>
              <p className="about-p">
                CSCS cards provide proof that applicants working on construction sites have the appropriate training and qualifications for the job they do on site. By ensuring the workforce are appropriately qualified, the card plays its part in improving standards and safety on construction sites.
              </p>
              <p className="about-p">
                Every CSCS card has its own characteristic ranking from a qualified person working on the construction site, the managers, the supervisors.
              </p>
              <p className="about-p">
                The most commonly used card is the Green Labourers card which allows you to get a basic job. Non-construction workers can also apply for the CSCS Green Labourer card. The better CSCS card an applicant can have, the wages may impact as it comes with better skills and qualification proof.
              </p>
              <p className="about-p">
                The card structure is designed in a way that a new construction worker can easily grow wages with better cards and experience. Once the applicant is confident about the trade they work in, they can upgrade to higher ranking cards.
              </p>
              
              <a href="/apply-cscs" className="apply-banner-btn">
                <span>Apply Online</span>
                <ChevronRight size={18} />
              </a>
            </div>

            {/* Section 2: Structure Table */}
            <div className="about-section">
              <h2 className="about-section-title">CSCS Card Structures and Requirements</h2>
              
              <div className="table-wrapper">
                <table className="cscs-table">
                  <thead>
                    <tr>
                      <th>Card Type</th>
                      <th>Card Visual</th>
                      <th>Test Requirement</th>
                      <th>Training Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cardList.map((card, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700, color: "#0f172a" }}>{card.name}</td>
                        <td>
                          <div 
                            className={`cscs-mockup ${card.style.isWhite ? "mockup-card-white" : ""}`}
                            style={{ background: card.style.bgHex }}
                          >
                            <div className="mockup-header">
                              <div className="mockup-stripes">
                                <div className="mockup-stripe" style={{ background: card.style.isWhite ? "#000000" : "rgba(0,0,0,0.15)", width: "6px", height: "1.5px" }}></div>
                                <div className="mockup-stripe" style={{ background: card.style.isWhite ? "#000000" : "rgba(0,0,0,0.15)", width: "6px", height: "1.5px" }}></div>
                                <div className="mockup-stripe" style={{ background: card.style.isWhite ? "#000000" : "rgba(0,0,0,0.15)", width: "6px", height: "1.5px" }}></div>
                              </div>
                            </div>
                            <div className="mockup-body">
                              <div className="mockup-left">
                                <div className="mockup-chip" style={{ background: card.style.isWhite ? "#cbd5e1" : "rgba(255,255,255,0.4)" }}></div>
                                <div className="mockup-name" style={{ color: card.style.isWhite ? "#0f172a" : "#ffffff", transform: "scale(0.85)", transformOrigin: "left" }}>
                                  JOHN SMITH
                                </div>
                              </div>
                              <div className="mockup-photo-box">
                                <img src="/worker_portrait.png" alt="" className="mockup-photo" />
                              </div>
                            </div>
                            <div 
                              className="mockup-footer"
                              style={{ 
                                background: card.style.isWhite ? "#cbd5e1" : (card.style.isGold ? "#92400e" : (card.style.isBlack ? "#1e293b" : "rgba(255,255,255,0.25)")),
                                color: card.style.isWhite ? "#0f172a" : "#ffffff"
                              }}
                            >
                              {card.style.subhead}
                            </div>
                          </div>
                        </td>
                        <td>{card.test}</td>
                        <td style={{ whiteSpace: "pre-line" }}>{card.training}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ textAlign: "center" }}>
                <a href="/cscs-cards" className="about-link-btn">
                  <span>Know more about CSCS Card Types</span>
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>

            {/* Section 3: Why it is required */}
            <div className="about-section">
              <h2 className="about-section-title">Why a CSCS Card is Required</h2>
              <p className="about-p">
                Employers are making it now mandatory for every worker to have a CSCS card to work on construction sites. The CSCS card keeps you updated with the changing trends happening in the construction industry which is helpful for your betterment as well as for your career growth.
              </p>
              <p className="about-p">
                If you have the wrong card as per your job requirement, you should always opt in for the correct card as per the needs that will always help you grow your construction career.
              </p>
            </div>

            {/* Section 4: Renewal */}
            <div className="about-section">
              <h2 className="about-section-title">CSCS Card Renewal</h2>
              <p className="about-p">
                Every CSCS Card has a limited validity after which it can be renewed, with few exceptions.
              </p>
              <p className="about-p" style={{ fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                In order to be eligible to renew your CSCS Card, you must have:
              </p>
              <ul className="about-bullet-list">
                <li className="about-bullet-li">Passed the CITB Health, safety and environment test in the past 2 years.</li>
                <li className="about-bullet-li">Valid Proof of your qualification or updated certificate membership of a CSCS recognised governing body.</li>
              </ul>
            </div>

            {/* Section 5: Bottom CTA */}
            <div className="about-section" style={{ borderTop: "1px solid #e2e8f0", paddingTop: "32px", textAlign: "center" }}>
              <a href="/cscs-cards" className="about-link-btn" style={{ fontSize: "16px" }}>
                <span>Click here to know more about CSCS Card Types</span>
                <ChevronRight size={18} />
              </a>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

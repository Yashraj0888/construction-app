"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Shield, ArrowRight, Info, CheckCircle } from "lucide-react";

interface CardType {
  id: string;
  title: string;
  subhead: string;
  colorClass: string;
  bgHex: string;
  textHex: string;
  validity: string;
  description: string;
  knowMoreLink: string;
  cardName: string;
}

export default function CscsCardsPage() {
  const router = useRouter();

  const cardTypes: CardType[] = [
    {
      id: "green-labourer",
      title: "CSCS Green Card - Labourers Card",
      subhead: "LABOURER",
      colorClass: "green",
      bgHex: "#047857", // Green
      textHex: "#ffffff",
      validity: "Validity - 5 Years",
      description: "For General Labourers and Site Operatives. Requires CITB HS&E Operative Test and a Level 1 award in Health and Safety.",
      knowMoreLink: "#info-green",
      cardName: "Green Labourer Card",
    },
    {
      id: "blue-skilled",
      title: "Blue CSCS Card - Skilled Worker",
      subhead: "SKILLED WORKER",
      colorClass: "blue",
      bgHex: "#1d4ed8", // Blue
      textHex: "#ffffff",
      validity: "Validity - 5 Years",
      description: "For skilled workers who have achieved a construction related NVQ or SVQ Level 2, or completed an approved apprenticeship.",
      knowMoreLink: "#info-blue",
      cardName: "Blue Skilled Worker Card",
    },
    {
      id: "red-provisional",
      title: "Provisional - CSCS Temporary Card",
      subhead: "PROVISIONAL",
      colorClass: "red",
      bgHex: "#b91c1c", // Red
      textHex: "#ffffff",
      validity: "Validity - 6 Months",
      description: "For people who are working through a probationary period or gaining on-site experience. Non-renewable card.",
      knowMoreLink: "#info-provisional",
      cardName: "Provisional Temporary Card",
    },
    {
      id: "red-trainee",
      title: "Trainee Card",
      subhead: "TRAINEE",
      colorClass: "red",
      bgHex: "#b91c1c", // Red
      textHex: "#ffffff",
      validity: "Validity - 3 Years",
      description: "For trainees who are registered for an NVQ/SVQ or relevant construction award but have not completed it yet.",
      knowMoreLink: "#info-trainee",
      cardName: "Trainee Card",
    },
    {
      id: "red-experienced",
      title: "Experienced Worker Card",
      subhead: "EXPERIENCED WORKER",
      colorClass: "red",
      bgHex: "#b91c1c", // Red
      textHex: "#ffffff",
      validity: "Validity - 1 Year",
      description: "For experienced workers registered to complete a construction related NVQ or SVQ Level 2, 3 or higher.",
      knowMoreLink: "#info-experienced",
      cardName: "Experienced Worker Card",
    },
    {
      id: "red-technical",
      title: "Experienced Technical, Supervisor or Manager",
      subhead: "SUPERVISOR OR MANAGER",
      colorClass: "red",
      bgHex: "#b91c1c", // Red
      textHex: "#ffffff",
      validity: "Validity - 3 Years",
      description: "For experienced supervisors, managers, or technical staff registered for an NVQ/SVQ Level 3 or higher.",
      knowMoreLink: "#info-technical",
      cardName: "Experienced Technical/Supervisor Card",
    },
    {
      id: "gold-advanced",
      title: "CSCS Gold Card - Advanced Craft",
      subhead: "ADVANCED CRAFT",
      colorClass: "gold",
      bgHex: "#b45309", // Gold/Amber
      textHex: "#ffffff",
      validity: "Validity - 5 Years",
      description: "For highly skilled craftspeople who have achieved a construction related NVQ or SVQ Level 3.",
      knowMoreLink: "#info-gold-advanced",
      cardName: "Gold Advanced Craft Card",
    },
    {
      id: "gold-supervisor",
      title: "CSCS Gold Card - Supervisor",
      subhead: "SUPERVISOR",
      colorClass: "gold",
      bgHex: "#b45309", // Gold/Amber
      textHex: "#ffffff",
      validity: "Validity - 5 Years",
      description: "For professionals working in a supervisor role who have achieved a supervisory NVQ or SVQ Level 3 or 4.",
      knowMoreLink: "#info-gold-supervisor",
      cardName: "Gold Supervisor Card",
    },
    {
      id: "black-manager",
      title: "CSCS Black Card - Managers",
      subhead: "MANAGER",
      colorClass: "black",
      bgHex: "#0f172a", // Black/Dark Slate
      textHex: "#ffffff",
      validity: "Validity - 5 Years",
      description: "For senior manager occupations who have achieved a relevant management NVQ/SVQ Level 5, 6, or 7.",
      knowMoreLink: "#info-black",
      cardName: "Black Manager Card",
    },
    {
      id: "white-pqp",
      title: "CSCS White Card - Professionally Qualified Person",
      subhead: "PROFESSIONALLY QUALIFIED PERSON",
      colorClass: "white",
      bgHex: "#f1f5f9", // Light slate
      textHex: "#0f172a",
      validity: "Validity - 5 Years",
      description: "For professionals who are certified members of CSCS-approved professional bodies (e.g. CIOB, ICE, RIBA).",
      knowMoreLink: "#info-white-pqp",
      cardName: "White PQP Card",
    },
    {
      id: "white-aqp",
      title: "CSCS White Card - Academically Qualified Person CSCS Card",
      subhead: "ACADEMICALLY QUALIFIED PERSON",
      colorClass: "white",
      bgHex: "#f1f5f9", // Light slate
      textHex: "#0f172a",
      validity: "Validity - 5 Years",
      description: "For construction graduates who have completed construction degrees, HNDs, HNCs, or CIOB certificates.",
      knowMoreLink: "#info-white-aqp",
      cardName: "White AQP Card",
    },
  ];

  const handleApplyClick = (cardName: string) => {
    // Navigate to form and pass preselected card type as parameter
    router.push(`/apply-cscs?cardType=${encodeURIComponent(cardName)}`);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-6">
        <style>{`
          .cards-page-header {
            max-width: 1024px;
            margin: 0 auto 48px auto;
            text-align: center;
          }
          
          .cards-page-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 36px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 16px;
            letter-spacing: -0.03em;
          }
          
          .cards-page-desc {
            font-size: 15px;
            color: #64748b;
            max-width: 760px;
            margin: 0 auto;
            line-height: 1.6;
          }
          
          .cards-grid {
            max-width: 1024px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr;
            gap: 36px;
          }
          @media (min-width: 640px) {
            .cards-grid {
              grid-template-columns: 1fr 1fr;
            }
          }
          @media (min-width: 992px) {
            .cards-grid {
              grid-template-columns: 1fr 1fr 1fr;
            }
          }
          
          /* Single Card Container */
          .card-block {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.025);
            transition: all 0.25s ease;
          }
          .card-block:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
          }
          
          /* Visual Graphical Card Mockup Header */
          .mockup-wrapper {
            background: #f1f5f9;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #e2e8f0;
            height: 195px;
            position: relative;
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
          
          /* White card has custom black stripes */
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
          
          /* Card Info Text area */
          .card-details-box {
            padding: 24px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }
          
          .card-title {
            font-size: 17px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px;
            line-height: 1.35;
          }
          
          .validity-tag {
            font-size: 12px;
            font-weight: 700;
            color: #16a34a;
            margin-bottom: 12px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }
          
          .card-desc {
            font-size: 14px;
            color: #475569;
            line-height: 1.5;
            margin-bottom: 24px;
            flex-grow: 1;
          }
          
          .card-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: auto;
          }
          
          .action-btn-info {
            padding: 10px;
            border-radius: 10px;
            border: 1px solid #cbd5e1;
            font-weight: 700;
            font-size: 13.5px;
            background: #ffffff;
            color: #475569;
            text-align: center;
            text-decoration: none;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            cursor: pointer;
          }
          .action-btn-info:hover {
            background: #f8fafc;
            color: #0f172a;
            border-color: #94a3b8;
          }
          
          .action-btn-apply {
            padding: 10px;
            border-radius: 10px;
            background: #2563eb;
            color: #ffffff;
            border: none;
            font-weight: 700;
            font-size: 13.5px;
            text-align: center;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(37, 99, 235, 0.15);
          }
          .action-btn-apply:hover {
            background: #1d4ed8;
            box-shadow: 0 6px 12px rgba(37, 99, 235, 0.25);
          }
        `}</style>

        <div className="cards-page-header">
          <h1 className="cards-page-title">CSCS Card Types</h1>
          <p className="cards-page-desc">
            Choose the CSCS Card according to your occupation and qualifications. Please note that you are required to hold the relevant qualification or equivalent qualification for applying for a CSCS Card.
          </p>
        </div>

        <div className="cards-grid">
          {cardTypes.map((card) => {
            const isWhiteCard = card.colorClass === "white";
            const isGoldCard = card.colorClass === "gold";
            const isBlackCard = card.colorClass === "black";
            
            return (
              <div key={card.id} className="card-block">
                {/* Visual Card Representation */}
                <div className="mockup-wrapper">
                  <div 
                    className={`cscs-mockup ${isWhiteCard ? "mockup-card-white" : ""}`}
                    style={{ background: card.bgHex }}
                  >
                    <div className="mockup-header">
                      <div className="mockup-stripes">
                        <div className="mockup-stripe" style={{ background: isWhiteCard ? "#000000" : "rgba(0,0,0,0.15)", width: "10px", height: "3px" }}></div>
                        <div className="mockup-stripe" style={{ background: isWhiteCard ? "#000000" : "rgba(0,0,0,0.15)", width: "10px", height: "3px" }}></div>
                        <div className="mockup-stripe" style={{ background: isWhiteCard ? "#000000" : "rgba(0,0,0,0.15)", width: "10px", height: "3px" }}></div>
                      </div>
                    </div>
                    
                    <div className="mockup-body">
                      <div className="mockup-left">
                        <div className="mockup-chip" style={{ background: isWhiteCard ? "#cbd5e1" : "rgba(255,255,255,0.4)" }}></div>
                        <div className="mockup-name" style={{ color: isWhiteCard ? "#0f172a" : "#000000" }}>FIRSTNAME SURNAME</div>
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
                      {card.subhead}
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="card-details-box">
                  <h3 className="card-title">{card.title}</h3>
                  <div className="validity-tag">
                    <CheckCircle size={14} className="text-green-600" />
                    <span>{card.validity}</span>
                  </div>
                  <p className="card-desc">{card.description}</p>
                  
                  <div className="card-actions">
                    <a href={card.knowMoreLink} className="action-btn-info">
                      <Info size={14} />
                      <span>Info</span>
                    </a>
                    <button 
                      onClick={() => handleApplyClick(card.cardName)} 
                      className="action-btn-apply"
                    >
                      <span>Apply Now</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

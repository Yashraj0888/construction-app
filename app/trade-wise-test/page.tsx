"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, Info, HelpCircle, CheckCircle, ChevronRight, BookOpen, UserCheck, Calendar } from "lucide-react";

interface TradeItem {
  trade: string;
  test: string;
  cards: string;
}

const tradeData: TradeItem[] = [
  {
    trade: "Labourer, General Construction Operative",
    test: "Operative Test",
    cards: "Green Labourer"
  },
  {
    trade: "Access Flooring Operative",
    test: "Operative Test",
    cards: "Blue Skilled Worker, Gold Advanced Craft"
  },
  {
    trade: "Aerial and Satellite Installer",
    test: "Working at Height Test",
    cards: "Blue Skilled Worker, Gold Advanced Craft"
  },
  {
    trade: "Aerial Rescue",
    test: "Operative Test",
    cards: "WITHDRAWN: CRO"
  },
  {
    trade: "AHU Installer",
    test: "HVACR Test (Domestic Heating and Plumbing)",
    cards: "WITHDRAWN: CRO"
  },
  {
    trade: "Air Compressor Engineer",
    test: "HVACR Test (Domestic Heating and Plumbing)",
    cards: "WITHDRAWN: CRO"
  },
  {
    trade: "Air Testing of Buildings Operative",
    test: "HVACR Test (Domestic Heating and Plumbing)",
    cards: "WITHDRAWN: CRO"
  },
  {
    trade: "Aluminium TIG Welding & Fabrication",
    test: "Plumbing or Gas Test",
    cards: "WITHDRAWN: CRO"
  },
  {
    trade: "Amenity Manager",
    test: "Managers and Professionals Test",
    cards: "Black Manager"
  },
  {
    trade: "Amenity Supervisor",
    test: "Supervisors Test",
    cards: "Gold Supervisor"
  },
  {
    trade: "Amenity Worker",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Ansell Fire Suppression System Installer",
    test: "Operative Test",
    cards: "WITHDRAWN: CRO"
  },
  {
    trade: "Antenna Systems Installer",
    test: "Working at Height Test",
    cards: "Blue Skilled Worker, Gold Advanced Craft"
  },
  {
    trade: "Anti Graffiti Finishing Operative",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Arborist Manager",
    test: "Managers and Professionals Test",
    cards: "Black Manager"
  },
  {
    trade: "Arborist Supervisor",
    test: "Supervisors Test",
    cards: "Gold Supervisor"
  },
  {
    trade: "Arborist Worker - Chainsaw",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Archaeologist",
    test: "Managers and Professionals Test",
    cards: "White Academically Qualified Person, White Professionally Qualified Person"
  },
  {
    trade: "Archaeologist Technician",
    test: "Managers and Professionals Test",
    cards: "White Academically Qualified Person"
  },
  {
    trade: "Architect",
    test: "Managers and Professionals Test",
    cards: "White Professionally Qualified Person, White Academically Qualified Person"
  },
  {
    trade: "Architectural Lighting Control Systems Installer",
    test: "Operative Test",
    cards: "WITHDRAWN: CRO"
  },
  {
    trade: "Architectural Metalwork Paint Sprayer",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Architectural Technologist",
    test: "Managers and Professionals Test",
    cards: "White Academically Qualified Person, White Professionally Qualified Person, Black Manager"
  },
  {
    trade: "Asbestos Analyst - 4 Stage Clearance",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Asbestos Analyst - Asbestos Air Sampling",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Asbestos Analyst - Bulk Sampling",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Asbestos Inspector/ Surveyor",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Asbestos Removal Operative",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Asbestos Removal Supervisor",
    test: "Supervisors Test",
    cards: "Gold Supervisor"
  },
  {
    trade: "Autoclaved Aerated Concrete Frame Erector",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Automated People Mover Installer",
    test: "Lift and Escalators Test",
    cards: "Gold Advanced Craft"
  },
  {
    trade: "Automatic Irrigation System Installer",
    test: "Plumbing or Gas Test",
    cards: "WITHDRAWN: CRO"
  },
  {
    trade: "Bench Joiner",
    test: "Operative Test",
    cards: "Red Trainee, Blue Skilled Worker"
  },
  {
    trade: "Blast Cleaning Contractor",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Blind and Shutter Installer",
    test: "Working at Height Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Bricklayer",
    test: "Operative Test",
    cards: "Gold Advanced Craft, Blue Skilled Worker"
  },
  {
    trade: "Brise Soleil/Louvre Installer",
    test: "Working at Height Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Builders Cleaner",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Building Control Officer",
    test: "Managers and Professionals Test",
    cards: "White Academically Qualified Person, Black Manager, White Professionally Qualified Person"
  },
  {
    trade: "Building Control Surveyor",
    test: "Managers and Professionals Test",
    cards: "White Academically Qualified Person, White Professionally Qualified Person, Black Manager"
  },
  {
    trade: "Building Maintenance & Estates Manager",
    test: "Managers and Professionals Test",
    cards: "White Academically Qualified Person, Black Manager, White Professionally Qualified Person"
  },
  {
    trade: "Building Maintenance & Estates Supervisor",
    test: "Supervisors Test",
    cards: "White Academically Qualified Person, Gold Supervisor"
  },
  {
    trade: "Building Management Control Systems Engineer",
    test: "HVACR Test (Domestic Heating and Plumbing)",
    cards: "WITHDRAWN: CRO"
  },
  {
    trade: "Building Site Manager (Conservation)",
    test: "Managers and Professionals Test",
    cards: "White Academically Qualified Person, Black Manager, White Professionally Qualified Person"
  },
  {
    trade: "Building Surveying Assistant",
    test: "Supervisors Test",
    cards: "Gold Supervisor, White Academically Qualified Person, White Professionally Qualified Person"
  },
  {
    trade: "Built Up Felt Roofer",
    test: "Working at Height Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Cabinet Maker & Polisher",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Carpenter and Joiner",
    test: "Operative Test",
    cards: "Gold Advanced Craft, Blue Skilled Worker"
  },
  {
    trade: "Ceiling Fixer",
    test: "Working at Height Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Civil Engineer",
    test: "Managers and Professionals Test",
    cards: "White Academically Qualified Person, White Professionally Qualified Person"
  },
  {
    trade: "Civil Engineering Technician",
    test: "Supervisors Test",
    cards: "Gold Supervisor"
  },
  {
    trade: "Cleaner",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Clerk of Works",
    test: "Managers and Professionals Test",
    cards: "White Professionally Qualified Person, White Academically Qualified Person"
  },
  {
    trade: "Construction Project Manager",
    test: "Managers and Professionals Test",
    cards: "White Academically Qualified Person, Black Manager, White Professionally Qualified Person"
  },
  {
    trade: "Construction Site Supervisor",
    test: "Supervisors Test",
    cards: "Gold Supervisor, White Academically Qualified Person, White Professionally Qualified Person"
  },
  {
    trade: "Contracts Manager",
    test: "Managers and Professionals Test",
    cards: "White Academically Qualified Person, White Professionally Qualified Person, Black Manager"
  },
  {
    trade: "Demolition Manager",
    test: "Managers and Professionals Test",
    cards: "Black Manager"
  },
  {
    trade: "Demolition Site Operative (Trainee)",
    test: "Operative Test",
    cards: "Red Trainee"
  },
  {
    trade: "Demolition Site Operative / Topman",
    test: "Demolition Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Demolition Supervisor",
    test: "Supervisors Test",
    cards: "Gold Supervisor"
  },
  {
    trade: "Dry Liner: Finisher",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Dry Liner: Fixer",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Escalator Installer",
    test: "Lift and Escalators Test",
    cards: "Gold Advanced Craft"
  },
  {
    trade: "Environmental Manager (Construction)",
    test: "Managers and Professionals Test",
    cards: "Black Manager, White Academically Qualified Person, White Professionally Qualified Person"
  },
  {
    trade: "Fenestration Supervisor",
    test: "Supervisors Test",
    cards: "Gold Supervisor"
  },
  {
    trade: "Floorcoverer: Resilient/Impervious",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Floorcoverer: Timber",
    test: "Operative Test",
    cards: "Blue Skilled Worker"
  },
  {
    trade: "Glazier",
    test: "Operative Test",
    cards: "Blue Skilled Worker, Gold Advanced Craft"
  },
  {
    trade: "Kitchen/ Bathroom Fitter",
    test: "Operative Test",
    cards: "Blue Skilled Worker, Gold Advanced Craft"
  },
  {
    trade: "Landscape Architect",
    test: "Managers and Professionals Test",
    cards: "White Professionally Qualified Person"
  },
  {
    trade: "Landscape Supervisor",
    test: "Supervisors Test",
    cards: "Gold Supervisor"
  },
  {
    trade: "Painter and Decorator",
    test: "Operative Test",
    cards: "Gold Advanced Craft, Blue Skilled Worker, Green Labourer"
  },
  {
    trade: "Plasterer: Solid",
    test: "Operative Test",
    cards: "Blue Skilled Worker, Gold Advanced Craft"
  },
  {
    trade: "Plumber",
    test: "Plumbing or Gas Test",
    cards: "Blue Skilled Worker, Gold Advanced Craft"
  },
  {
    trade: "Quality Manager",
    test: "Managers and Professionals Test",
    cards: "Black Manager"
  },
  {
    trade: "Quantity Surveyor",
    test: "Managers and Professionals Test",
    cards: "White Academically Qualified Person, Black Manager, White Professionally Qualified Person"
  },
  {
    trade: "Roof Slater and Tiler",
    test: "Working at Height Test",
    cards: "Blue Skilled Worker, Gold Advanced Craft"
  },
  {
    trade: "Scaffolder / Roofer",
    test: "Working at Height Test",
    cards: "Blue Skilled Worker, Gold Advanced Craft"
  }
];

export default function TradeWiseTestPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<TradeItem[]>([]);
  const [selectedTrade, setSelectedTrade] = useState<TradeItem | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const defaultTrades = [...tradeData].sort((a, b) => a.trade.localeCompare(b.trade)).slice(0, 5);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 1) {
      const filtered = tradeData.filter(item =>
        item.trade.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (item: TradeItem) => {
    setSelectedTrade(item);
    setQuery(item.trade);
    setSuggestions([]);
    setHasSearched(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Direct match check
    const match = tradeData.find(
      item => item.trade.toLowerCase() === query.trim().toLowerCase()
    );

    if (match) {
      setSelectedTrade(match);
    } else {
      // Search keywords match
      const keywordMatch = tradeData.find(item =>
        item.trade.toLowerCase().includes(query.trim().toLowerCase())
      );

      if (keywordMatch) {
        setSelectedTrade(keywordMatch);
      } else {
        // Build fallback recommendation based on keyword
        const lowerQ = query.toLowerCase();
        let fallbackTest = "Operatives Test";
        let fallbackCards = "Red Trainee / Blue Skilled Worker";

        if (lowerQ.includes("manager") || lowerQ.includes("professional") || lowerQ.includes("director") || lowerQ.includes("engineer")) {
          fallbackTest = "Managers & Professionals Test";
          fallbackCards = "Black Manager / White Academically / White Professionally Cards";
        } else if (lowerQ.includes("supervisor") || lowerQ.includes("foreman") || lowerQ.includes("team leader")) {
          fallbackTest = "Supervisors Test";
          fallbackCards = "Gold Supervisor Card";
        } else if (lowerQ.includes("plumb") || lowerQ.includes("gas") || lowerQ.includes("heating")) {
          fallbackTest = "Plumbing / Gas Test";
          fallbackCards = "Blue Skilled Worker / Gold Advanced Craft Card";
        } else if (lowerQ.includes("demolition")) {
          fallbackTest = "Demolition Test";
          fallbackCards = "Red Trainee / Blue Skilled Worker / Gold Advanced Craft Card";
        } else if (lowerQ.includes("highway") || lowerQ.includes("road")) {
          fallbackTest = "Highway Works Test";
          fallbackCards = "Blue Skilled Worker Card";
        } else if (lowerQ.includes("scaffold") || lowerQ.includes("roof") || lowerQ.includes("height")) {
          fallbackTest = "Working at Height Test";
          fallbackCards = "Blue Skilled Worker / Gold Advanced Craft Card";
        } else if (lowerQ.includes("hvac") || lowerQ.includes("ventilation")) {
          fallbackTest = "HVACR Test";
          fallbackCards = "Blue Skilled Worker Card";
        }

        setSelectedTrade({
          trade: query,
          test: fallbackTest,
          cards: fallbackCards
        });
      }
    }
    setSuggestions([]);
    setHasSearched(true);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        <style>{`
          .trade-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
            padding: 80px 24px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .trade-hero-content {
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
          }

          .trade-hero-badge {
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

          .trade-hero-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 42px;
            font-weight: 800;
            letter-spacing: -0.03em;
            margin-bottom: 16px;
          }

          .trade-hero-desc {
            font-size: 16px;
            color: #94a3b8;
            line-height: 1.6;
          }

          .trade-container {
            max-width: 850px;
            width: 100%;
            margin: -40px auto 80px auto;
            padding: 0 24px;
            box-sizing: border-box;
            position: relative;
            z-index: 20;
          }

          .overview-box {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 32px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01);
            margin-bottom: 40px;
          }

          .overview-p {
            font-size: 15px;
            color: #475569;
            line-height: 1.7;
            margin-bottom: 20px;
          }

          .book-citb-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #2563eb;
            color: #ffffff;
            font-weight: 700;
            font-size: 14px;
            padding: 10px 20px;
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.2s ease;
            margin-bottom: 24px;
          }
          .book-citb-btn:hover {
            background: #1d4ed8;
          }

          .test-guide-title {
            font-size: 15px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 12px;
          }

          .test-guide-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .test-guide-item {
            font-size: 14px;
            color: #475569;
            line-height: 1.6;
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
          }
          .test-guide-item::before {
            content: "•";
            position: absolute;
            left: 6px;
            color: #94a3b8;
            font-weight: 700;
          }

          .search-section-heading {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            text-align: center;
            margin-bottom: 16px;
            line-height: 1.4;
          }

          .search-bar-wrapper {
            max-width: 100%;
            margin: 0 auto 32px auto;
            position: relative;
          }

          .search-form-row {
            display: flex;
            gap: 12px;
          }

          .input-container {
            position: relative;
            flex-grow: 1;
          }

          .search-bar-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
          }

          .search-bar-input {
            width: 100%;
            height: 50px;
            border: 1.5px solid #cbd5e1;
            border-radius: 10px;
            padding: 0 16px 0 48px;
            font-size: 15px;
            color: #0f172a;
            outline: none;
            box-sizing: border-box;
            transition: all 0.2s ease;
          }
          .search-bar-input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }

          .find-btn {
            height: 50px;
            padding: 0 24px;
            background: #2563eb;
            color: #ffffff;
            font-weight: 700;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .find-btn:hover {
            background: #1d4ed8;
          }

          /* Autocomplete Suggestions */
          .suggestions-dropdown {
            position: absolute;
            top: 54px;
            left: 0;
            right: 0;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            z-index: 50;
            overflow: hidden;
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .suggestion-item {
            padding: 12px 16px;
            font-size: 14px;
            color: #475569;
            cursor: pointer;
            border-bottom: 1px solid #f1f5f9;
            text-align: left;
            transition: background 0.15s ease;
          }
          .suggestion-item:last-child {
            border-bottom: none;
          }
          .suggestion-item:hover {
            background: #f8fafc;
            color: #0f172a;
          }

          /* Results Card */
          .result-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.01), 0 2px 4px -1px rgba(0,0,0,0.01);
            text-align: center;
            max-width: 100%;
            width: 100%;
            margin: 0 auto;
            box-sizing: border-box;
          }

          .results-heading {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 18px;
            font-weight: 800;
            color: #0f172a;
            margin: 32px 0 20px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .results-count-badge {
            font-size: 12px;
            font-weight: 700;
            background: #e0f2fe;
            color: #0369a1;
            padding: 4px 10px;
            border-radius: 99px;
          }

          .result-trade-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 20px;
            line-height: 1.4;
          }

          .result-field {
            margin-bottom: 16px;
          }

          .result-label {
            font-size: 12px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 4px;
            display: block;
          }

          .result-value {
            font-size: 15px;
            color: #0f172a;
            font-weight: 600;
          }

          .result-value.highlight {
            color: #2563eb;
            font-weight: 700;
          }

          .book-test-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #2563eb;
            color: #ffffff;
            font-weight: 700;
            font-size: 13px;
            padding: 10px 18px;
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.2s ease;
            margin-top: 16px;
          }
          .book-test-btn:hover {
            background: #1d4ed8;
          }

          @media (max-width: 640px) {
            .trade-hero {
              padding: 60px 16px;
            }
            .trade-hero-title {
              font-size: 32px;
            }
            .trade-container {
              padding: 0 16px;
            }
            .search-form-row {
              flex-direction: column;
              gap: 12px;
            }
            .find-btn {
              width: 100%;
            }
            .result-card {
              padding: 24px;
            }
          }
        `}</style>

        <div className="trade-hero">
          <div className="trade-hero-content">
            <span className="trade-hero-badge">Trade Guide</span>
            <h1 className="trade-hero-title">Find Your CITB Test</h1>
            <p className="trade-hero-desc">
              Discover the exact health, safety, and environment test and CSCS card required for your specific trade.
            </p>
          </div>
        </div>

        <div className="trade-container">
          
          {/* Section 1: Overview Box */}
          <div className="overview-box">
            <h2 className="test-guide-title" style={{ fontSize: "20px", marginBottom: "16px" }}>
              Find The Right Test and CSCS Card for you.
            </h2>
            <p className="overview-p">
              The most common test type is <strong>Operatives Test</strong>. The Operatives Test covers most trades &amp; CSCS Cards i.e. <strong>Labourers, Bricklayers, Carpenters, Painters &amp; Decorators, Groundworkers, Dry Liners, Floorers, Plasterers, Stone Fixers and many more</strong> and is suitable for: <strong>Green CSCS Card, Blue CSCS Card, Gold CSCS Card and Red CSCS Card</strong>.
            </p>
            
            <a href="/book-citb-test" className="book-citb-btn">
              <Calendar size={16} />
              <span>Book CITB Test</span>
            </a>

            <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
              <h3 className="test-guide-title">You may need to take another test if you are any of the below:</h3>
              <ul className="test-guide-list">
                <li className="test-guide-item"><strong>Manager or Professional:</strong> Managers &amp; Professionals Test (Black / White CSCS Cards)</li>
                <li className="test-guide-item"><strong>Supervisor:</strong> Supervisor Test (Gold CSCS Card)</li>
                <li className="test-guide-item"><strong>Plumber:</strong> Plumbing/Gas Test (Blue / Gold CSCS Card)</li>
                <li className="test-guide-item"><strong>Demolition:</strong> Demolition Test (Red / Blue / Gold CSCS Card)</li>
                <li className="test-guide-item"><strong>Highways:</strong> Highway Works Test (Blue / Gold CSCS Card)</li>
                <li className="test-guide-item"><strong>Scaffolder / Roofer:</strong> Working at Height Test (Blue / Gold CSCS Card)</li>
                <li className="test-guide-item"><strong>HVACR:</strong> HVACR Test</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Search */}
          <h2 className="search-section-heading">
            Please enter your trade below so we can find the appropriate test for your trade
          </h2>
          <p style={{ textAlign: "center", color: "#64748b", fontSize: "14px", marginTop: "-8px", marginBottom: "20px" }}>
            e.g. Labourer, Bricklayer, Quality Manager, etc
          </p>

          <div className="search-bar-wrapper">
            <form onSubmit={handleSearch} className="search-form-row">
              <div className="input-container">
                <Search className="search-bar-icon" size={18} />
                <input
                  type="text"
                  placeholder="Type your trade here..."
                  value={query}
                  onChange={handleInputChange}
                  className="search-bar-input"
                  required
                />
                
                {suggestions.length > 0 && (
                  <ul className="suggestions-dropdown">
                    {suggestions.map((item, idx) => (
                      <li
                        key={idx}
                        className="suggestion-item"
                        onClick={() => handleSelectSuggestion(item)}
                      >
                        {item.trade}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button type="submit" className="find-btn">
                <span>Find Test</span>
              </button>
            </form>
          </div>

          {/* Results card */}
          {hasSearched && selectedTrade && (
            <div className="result-card">
              <h3 className="result-trade-title">{selectedTrade.trade}</h3>
              
              <div className="result-field">
                <span className="result-label">Test Required</span>
                <span className="result-value highlight">{selectedTrade.test}</span>
              </div>

              <div className="result-field">
                <span className="result-label">Cards Available</span>
                <span className="result-value">{selectedTrade.cards}</span>
              </div>

              <div style={{ textAlign: "left" }}>
                <a href="/book-citb-test" className="book-test-btn">
                  <Calendar size={14} />
                  <span>Book Test</span>
                </a>
              </div>
            </div>
          )}

          {!hasSearched && (
            <div style={{ marginTop: "40px" }}>
              <h3 className="results-heading">
                <span>Featured Trades &amp; CITB Tests</span>
                <span className="results-count-badge">Default List</span>
              </h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                {defaultTrades.map((item, idx) => (
                  <div key={idx} className="result-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left", maxWidth: "100%", width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <h4 style={{ fontWeight: 700, color: "#0f172a", fontSize: "16px" }}>{item.trade}</h4>
                      <p style={{ fontSize: "13px", color: "#64748b" }}>
                        <strong>Test Required:</strong> <span style={{ color: "#2563eb", fontWeight: 700 }}>{item.test}</span>
                        <span style={{ margin: "0 10px", color: "#cbd5e1" }}>|</span>
                        <strong>Cards:</strong> {item.cards}
                      </p>
                    </div>

                    <a 
                      href="/book-citb-test"
                      className="book-test-btn"
                      style={{ marginTop: 0, whiteSpace: "nowrap" }}
                    >
                      <Calendar size={14} />
                      <span>Book Test</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

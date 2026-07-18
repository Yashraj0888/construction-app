"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, MapPin, Navigation, Calendar, Info, AlertCircle, Loader2 } from "lucide-react";

interface TestCentre {
  name: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
}

// Import raw list of CITB test centres (name, address, postcode)
import { fetchAllCentresWithCoords } from "../data/testCentres";

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface ResultCentre extends TestCentre {
  distance: number;
}

export default function FindTestCentrePage() {
  const [allCentres, setAllCentres] = useState<TestCentre[]>([]);

  // Fetch real coordinates once on mount (batched, respects API limit)
  useEffect(() => {
    fetchAllCentresWithCoords().then(setAllCentres).catch(console.error);
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [postcode, setPostcode] = useState("");
  const [results, setResults] = useState<ResultCentre[]>([]);

  const defaultCentres = [...allCentres].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 5);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) {
      setError("Please enter a valid UK postcode.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode.trim())}`);
      const data = await response.json();

      if (data.status === 200 && data.result) {
        const { latitude, longitude } = data.result;

        const calculated = allCentres.map((centre) => {
          const dist = calculateDistance(latitude, longitude, centre.lat, centre.lng);
          return { ...centre, distance: dist };
        });

        // Sort by distance ascending
        calculated.sort((a, b) => a.distance - b.distance);

        // Take nearest 5
        setResults(calculated.slice(0, 5));
      } else {
        setError("Could not find coordinates for this postcode. Please make sure it's a valid UK postcode.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while lookup. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        <style>{`
          .locator-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
            padding: 80px 24px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .locator-hero-content {
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
          }

          .locator-hero-badge {
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

          .locator-hero-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 42px;
            font-weight: 800;
            letter-spacing: -0.03em;
            margin-bottom: 16px;
          }

          .locator-hero-desc {
            font-size: 16px;
            color: #94a3b8;
            line-height: 1.6;
          }

          .locator-container {
            max-width: 850px;
            width: 100%;
            margin: -40px auto 80px auto;
            padding: 0 24px;
            box-sizing: border-box;
            position: relative;
            z-index: 20;
          }

          .locator-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02);
          }

          .search-form {
            display: flex;
            gap: 16px;
            margin-bottom: 24px;
          }

          .search-input-wrapper {
            position: relative;
            flex-grow: 1;
          }

          .search-icon {
            position: absolute;
            left: 18px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
          }

          .search-input {
            width: 100%;
            height: 54px;
            border: 1.5px solid #cbd5e1;
            border-radius: 12px;
            padding: 0 20px 0 54px;
            font-size: 16px;
            color: #0f172a;
            outline: none;
            transition: all 0.2s ease;
            box-sizing: border-box;
          }

          .search-input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
          }

          .search-btn {
            height: 54px;
            padding: 0 32px;
            background: #2563eb;
            color: #ffffff;
            font-weight: 700;
            font-size: 16px;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            white-space: nowrap;
          }

          .search-btn:hover {
            background: #1d4ed8;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          }

          .search-btn:disabled {
            background: #94a3b8;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          .alert-box {
            display: flex;
            gap: 12px;
            background: #fef2f2;
            border: 1px solid #fca5a5;
            color: #b91c1c;
            padding: 16px 20px;
            border-radius: 12px;
            font-size: 15px;
            line-height: 1.5;
            margin-bottom: 24px;
          }

          .info-note {
            display: flex;
            gap: 10px;
            color: #64748b;
            font-size: 14px;
            line-height: 1.5;
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

          .result-card {
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 16px;
            transition: all 0.2s ease;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 24px;
          }

          .result-card:hover {
            border-color: #cbd5e1;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.01), 0 2px 4px -1px rgba(0,0,0,0.01);
          }

          .result-left {
            display: flex;
            gap: 16px;
          }

          .map-icon-wrapper {
            width: 44px;
            height: 44px;
            background: #f1f5f9;
            color: #475569;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .result-name {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 16px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 6px;
          }

          .result-address {
            font-size: 14px;
            color: #64748b;
            line-height: 1.5;
            margin-bottom: 8px;
          }

          .result-postcode {
            font-size: 13px;
            font-weight: 700;
            color: #0f172a;
            background: #f1f5f9;
            padding: 2px 8px;
            border-radius: 4px;
            display: inline-block;
          }

          .result-right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 12px;
            flex-shrink: 0;
          }

          .distance-badge {
            background: #ecfdf5;
            color: #047857;
            font-size: 13px;
            font-weight: 700;
            padding: 6px 14px;
            border-radius: 99px;
            white-space: nowrap;
          }

          .action-btn-row {
            display: flex;
            gap: 8px;
          }

          .action-btn {
            height: 38px;
            padding: 0 16px;
            font-size: 13px;
            font-weight: 700;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            border: 1px solid #cbd5e1;
            background: #ffffff;
            color: #475569;
          }

          .action-btn:hover {
            border-color: #94a3b8;
            color: #0f172a;
          }

          .action-btn.primary {
            background: #2563eb;
            color: #ffffff;
            border: none;
          }

          .action-btn.primary:hover {
            background: #1d4ed8;
          }

          @media (max-width: 640px) {
            .locator-hero {
              padding: 60px 16px;
            }
            .locator-hero-title {
              font-size: 32px;
            }
            .locator-container {
              margin-top: -24px;
              padding: 0 16px;
            }
            .locator-card {
              padding: 24px;
            }
            .search-form {
              flex-direction: column;
              gap: 12px;
            }
            .search-btn {
              width: 100%;
            }
            .result-card {
              flex-direction: column;
              gap: 16px;
            }
            .result-right {
              align-items: flex-start;
              width: 100%;
            }
            .action-btn-row {
              width: 100%;
            }
            .action-btn {
              flex-grow: 1;
            }
          }
        `}</style>

        <div className="locator-hero">
          <div className="locator-hero-content">
            <span className="locator-hero-badge">Test Centre Finder</span>
            <h1 className="locator-hero-title">Find CITB Test Centre</h1>
            <p className="locator-hero-desc">
              Enter your postcode below to locate the nearest official CITB test centres near you.
            </p>
          </div>
        </div>

        <div className="locator-container">
          <div className="locator-card">
            <form onSubmit={handleSearch} className="search-form" noValidate>
              <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Enter your UK postcode (e.g. M12 6JH, WC1V 7BH)..."
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="search-input"
                  required
                />
              </div>
              <button type="submit" className="search-btn" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span>Search Centres</span>
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="alert-box">
                <AlertCircle size={20} className="flex-shrink-0" style={{ marginTop: "2px" }} />
                <span>{error}</span>
              </div>
            )}

            {!results.length && !loading && (
              <>
                <h3 className="results-heading">
                  <span>Official CITB Test Centres</span>
                  <span className="results-count-badge">Default List</span>
                </h3>

                <div>
                  {defaultCentres.map((centre, idx) => (
                    <div key={idx} className="result-card">
                      <div className="result-left">
                        <div className="map-icon-wrapper">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="result-name">{centre.name}</h4>
                          <p className="result-address">{centre.address}</p>
                          <span className="result-postcode">{centre.postcode}</span>
                        </div>
                      </div>

                      <div className="result-right">
                        <div className="action-btn-row">
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${centre.name} ${centre.postcode}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn"
                          >
                            <Navigation size={14} />
                            <span>Directions</span>
                          </a>
                          <a 
                            href="/book-citb-test"
                            className="action-btn primary"
                          >
                            <Calendar size={14} />
                            <span>Book Test</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="info-note" style={{ marginTop: "24px" }}>
                  <Info size={16} className="flex-shrink-0" style={{ marginTop: "2px" }} />
                  <span>Enter your postcode above to calculate the exact distance to your nearest test centre.</span>
                </div>
              </>
            )}

            {results.length > 0 && (
              <>
                <h3 className="results-heading">
                  <span>Nearest CITB Test Centres</span>
                  <span className="results-count-badge">{results.length} Found</span>
                </h3>

                <div>
                  {results.map((centre, idx) => (
                    <div key={idx} className="result-card">
                      <div className="result-left">
                        <div className="map-icon-wrapper">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="result-name">{centre.name}</h4>
                          <p className="result-address">{centre.address}</p>
                          <span className="result-postcode">{centre.postcode}</span>
                        </div>
                      </div>

                      <div className="result-right">
                        <span className="distance-badge">{centre.distance.toFixed(1)} miles away</span>
                        <div className="action-btn-row">
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${centre.name} ${centre.postcode}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn"
                          >
                            <Navigation size={14} />
                            <span>Directions</span>
                          </a>
                          <a 
                            href="/book-citb-test"
                            className="action-btn primary"
                          >
                            <Calendar size={14} />
                            <span>Book Test</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

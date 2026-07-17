"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    { id: "cscs", title: "CSCS Card" },
    { id: "citb", title: "CITB HS&E Test" },
    { id: "course", title: "Health & Safety Awareness Course" },
  ];

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col justify-center items-center overflow-hidden px-6" style={{ background: "#ffffff" }}>
      {/* Embedded style block for dynamic hero background animation */}
      <style>{`
        @keyframes slow-zoom-pan {
          0% {
            transform: scale(1) translate(0, 0);
          }
          50% {
            transform: scale(1.08) translate(-10px, -5px);
          }
          100% {
            transform: scale(1) translate(0, 0);
          }
        }
        .hero-bg-anim {
          animation: slow-zoom-pan 30s infinite ease-in-out;
          filter: blur(1px);
        }
      `}</style>

      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img 
          src="/hero_bg_construction_site.png" 
          alt="" 
          className="hero-bg-anim w-full h-full object-cover" 
          style={{ opacity: 0.45, transformOrigin: "center center" }}
        />
        {/* Soft Radial mask overlay for text readability */}
        <div 
          className="absolute inset-0 bg-white"
          style={{
            background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.85) 100%)"
          }}
        ></div>
      </div>



      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* V7 Typography Layout */}
        <h1 className="font-serif tracking-tight leading-[1.08] text-5xl sm:text-6xl md:text-7xl text-[#0F172A] mb-8">
          <span className="block font-light text-[#2563eb] mb-1">
            CSCS Cards & CITB Tests.
          </span>
          <span className="block font-bold">
            Booked Simple & Fast.
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="text-base sm:text-lg text-slate-500 max-w-lg leading-relaxed mb-12">
          Your secure online portal to schedule CITB touchscreen tests, submit CSCS card applications, and register for safety training courses.
        </p>

        {/* Action Button */}
        {/* Action Button & Dropdown Selector */}
        <div className="relative flex flex-col items-center gap-4">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="mt-2 bg-[#0F172A] hover:bg-gray-800 text-white font-bold text-base sm:text-lg rounded-full tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-[0.97] flex items-center gap-3 cursor-pointer"
            style={{ padding: "5px 20px",margin:"10px" }}
          >
            <span>Apply Now</span>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showOptions ? 'rotate-180' : ''}`} />
          </button>
          <span className="text-xs text-slate-400 font-medium tracking-wide">
            Takes 2 minutes — select your path
          </span>

          {showOptions && (
            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 mt-4 w-72 sm:w-80 md:w-[400px] bg-white border border-slate-200 rounded-2xl shadow-xl animate-fade-in z-20 overflow-hidden">
              <div className="flex flex-col pt-1 pb-1">
                {options.map((opt) => {
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelectedOption(opt.id);
                        setShowOptions(false);
                        if (opt.id === "cscs") {
                          router.push("/cscs-cards");
                        } else {
                          alert(`Redirecting to ${opt.title} application...`);
                        }
                      }}
                      className="w-full text-left text-[#0F172A] font-semibold text-sm sm:text-base hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-150 border-b border-slate-100 last:border-b-0 flex items-center justify-between group cursor-pointer"
                      style={{ padding: "15px 32px" }}
                    >
                      <span>{opt.title}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trust & Legal Footer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 text-center">
        <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed font-light">
          Disclaimer: Construction Card Assistance explicitly states that we are an independent booking service and are not directly part of, or officially associated with, the CSCS or CITB.
        </p>
      </div>
    </div>
  );
}

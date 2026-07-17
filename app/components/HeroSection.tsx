"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    { id: "cscs", title: "CSCS Card" },
    { id: "citb", title: "CITB HS&E Test" },
    { id: "course", title: "Health & Safety Awareness Course" },
  ];

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-white px-6">
      {/* V7-inspired dynamic wave lines and glowing amber nodes in light mode */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-60" aria-hidden="true">
        <svg
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[700px] h-[500px] text-slate-100"
          viewBox="0 0 700 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wave Lines */}
          <path d="M-100 100 C 150 150, 200 50, 400 250 C 500 350, 600 250, 800 300" stroke="currentColor" strokeWidth="1" />
          <path d="M-100 150 C 120 180, 250 100, 380 280 C 450 380, 580 320, 800 350" stroke="currentColor" strokeWidth="1" />
          <path d="M-100 200 C 180 220, 220 150, 420 320 C 520 400, 620 350, 800 380" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M-100 250 C 200 260, 280 200, 450 350 C 550 430, 650 380, 800 410" stroke="currentColor" strokeWidth="1" />
          <path d="M-100 300 C 220 310, 300 280, 480 380 C 580 460, 680 400, 800 440" stroke="currentColor" strokeWidth="1" />

          {/* Glowing Amber Nodes */}
          <circle cx="150" cy="120" r="3" className="fill-amber-500 shadow-sm animate-pulse" />
          <circle cx="280" cy="180" r="4.5" className="fill-amber-500 animate-pulse" style={{ animationDelay: "0.5s" }} />
          <circle cx="380" cy="280" r="3" className="fill-[#F59E0B] animate-pulse" style={{ animationDelay: "1s" }} />
          <circle cx="450" cy="350" r="4" className="fill-[#F59E0B] animate-pulse" style={{ animationDelay: "1.5s" }} />
          <circle cx="580" cy="320" r="3" className="fill-amber-500 animate-pulse" style={{ animationDelay: "0.2s" }} />
          <circle cx="220" cy="290" r="3.5" className="fill-amber-500 animate-pulse" style={{ animationDelay: "0.8s" }} />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* V7 Typography Layout */}
        <h1 className="font-serif tracking-tight leading-[1.08] text-5xl sm:text-6xl md:text-7xl text-[#0F172A] mb-8">
          <span className="block font-light text-slate-400/90 mb-1">
            Meet all your requirements.
          </span>
          <span className="block font-bold">
            To get on site.
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="text-base sm:text-lg text-slate-500 max-w-lg leading-relaxed mb-12">
          Apply for your CSCS Card, book your CITB Touchscreen Test, or register for training courses completely online.
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
                        alert(`Redirecting to ${opt.title} application...`);
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
          Disclaimer: Construction Worker Support explicitly states that we are an independent booking service and are not directly part of, or officially associated with, the CSCS or CITB.
        </p>
      </div>
    </div>
  );
}

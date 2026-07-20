"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate =0.5;
    }
  }, []);

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

      {/* Dynamic Background Video/Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/hero_bg_construction_site.png"
          className="w-full h-full object-cover"
          style={{ opacity: 0.60 }}
        >
          <source src="https://luskinconferencecenter.ucla.edu/wp-content/assets/luskin-timelapse-final_160807.mp4" type="video/mp4" />
          {/* Fallback image if video element is not supported */}
          <img 
            src="/hero_bg_construction_site.png" 
            alt="Construction Site Background" 
            className="hero-bg-anim w-full h-full object-cover" 
            style={{ opacity: 0.45, transformOrigin: "center center" }}
          />
        </video>
        {/* Soft Radial mask overlay for text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.8) 100%)"
          }}
        ></div>
      </div>



      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* V7 Typography Layout */}
        <h1 className="font-serif tracking-tight leading-[1.08] text-5xl sm:text-6xl md:text-7xl text-white mb-8">
          <span className="block font-light text-[#FBBF24] mb-1">
            CSCS Cards & CITB Tests.
          </span>
          <span className="block font-bold text-white">
            Booked Simple & Fast.
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="text-base sm:text-lg text-slate-200 max-w-lg leading-relaxed mb-12 font-medium">
          Your secure online portal to schedule CITB touchscreen tests, submit CSCS card applications, and register for safety training courses.
        </p>

        {/* Action Button */}
        {/* Action Button & Dropdown Selector */}
        <div className="relative flex flex-col items-center gap-4">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="mt-2 bg-white hover:bg-slate-100 text-[#0F172A] font-bold text-base sm:text-lg rounded-full tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-[0.97] flex items-center gap-3 cursor-pointer"
            style={{ padding: "5px 20px",margin:"10px" }}
          >
            <span>Apply Now</span>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showOptions ? 'rotate-180' : ''}`} />
          </button>
          <span className="text-xs text-slate-300 font-semibold tracking-wide">
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
                        } else if (opt.id === "citb") {
                          router.push("/book-citb-test");
                        } else if (opt.id === "course") {
                          router.push("/course-book");
                        } else {
                          router.push("/apply-cscs");
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
        <p className="text-[10px] sm:text-xs text-slate-100 leading-relaxed font-light">
          Disclaimer: Construction Card Assistance explicitly states that we are an independent booking service and are not directly part of, or officially associated with, the CSCS or CITB.
        </p>
      </div>
    </div>
  );
}

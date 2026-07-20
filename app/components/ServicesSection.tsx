"use client";

import { CreditCard, ClipboardCheck, GraduationCap, Users, ArrowUpRight } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Apply CSCS Card",
      description: "New applications, renewals, and replacements — handled in one place without the runaround.",
      cta: "Apply now",
      icon: CreditCard,
      link: "/cscs-cards",
      accent: "#0f172a",
    },
    {
      title: "Book CITB HS&E Test",
      description: "Pick a nearby test centre and a slot that fits your week. Study materials included.",
      cta: "Book a test",
      icon: ClipboardCheck,
      link: "/book-citb-test",
      accent: "#1d4ed8",
    },
    {
      title: "Course for Green Card",
      description: "Health & Safety Awareness online or in a classroom — the step most labourers still need.",
      cta: "View course",
      icon: GraduationCap,
      link: "/health-safety-awareness",
      accent: "#047857",
    },
    {
      title: "Group booking",
      description: "Book tests, courses, or cards for a whole crew. Ask about multi-delegate rates.",
      cta: "Enquire",
      icon: Users,
      link: "/group-booking",
      accent: "#b45309",
    },
  ];

  return (
    <section style={{ background: "#f1f5f9", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", paddingTop: "72px", paddingBottom: "72px" }}>
      <style>{`
        .services-wrap {
          max-width: 1024px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .services-intro {
          margin-bottom: 36px;
          max-width: 520px;
        }
        .services-kicker {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #64748b;
          margin: 0 0 8px 0;
        }
        .services-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.2;
        }
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: #cbd5e1;
          border: 1px solid #cbd5e1;
        }
        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .service-card {
          background: #ffffff;
          padding: 28px 28px 24px;
          display: flex;
          flex-direction: column;
          min-height: 220px;
          text-decoration: none;
          color: inherit;
          transition: background 0.15s ease;
          position: relative;
        }
        .service-card:hover {
          background: #f8fafc;
        }
        .service-card:focus-visible {
          outline: 2px solid #2563eb;
          outline-offset: -2px;
          z-index: 1;
        }
        .service-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }
        .service-index {
          font-size: 12px;
          font-weight: 700;
          color: #94a3b8;
          font-variant-numeric: tabular-nums;
        }
        .service-icon {
          color: #64748b;
          flex-shrink: 0;
        }
        .service-card:hover .service-icon {
          color: #0f172a;
        }
        .service-accent {
          width: 28px;
          height: 3px;
          margin-bottom: 14px;
        }
        .service-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 10px 0;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }
        .service-description {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin: 0 0 24px 0;
          flex-grow: 1;
        }
        .service-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          border-bottom: 1px solid #cbd5e1;
          padding-bottom: 2px;
          align-self: flex-start;
          transition: border-color 0.15s ease, color 0.15s ease;
        }
        .service-card:hover .service-cta {
          border-color: #0f172a;
          color: #0f172a;
        }
      `}</style>

      <div className="services-wrap">
        <div className="services-intro">
          <p className="services-kicker">What we handle</p>
          <h2 className="services-heading">Cards, tests, courses — sorted</h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a key={service.title} href={service.link} className="service-card">
                <div className="service-top">
                  <span className="service-index">0{index + 1}</span>
                  <Icon size={20} className="service-icon" strokeWidth={1.75} />
                </div>
                <div className="service-accent" style={{ background: service.accent }} />
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <span className="service-cta">
                  {service.cta}
                  <ArrowUpRight size={14} strokeWidth={2.25} />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

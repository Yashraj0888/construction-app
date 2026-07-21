"use client";

import { ArrowRight, CreditCard, ClipboardCheck, GraduationCap, Users } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Apply CSCS Card",
      description:
        "New applications, renewals, and replacements — handled in one place without the runaround.",
      cta: "Apply now",
      icon: CreditCard,
      link: "/cscs-cards",
    },
    {
      title: "Book CITB HS&E Test",
      description:
        "Pick a nearby test centre and a slot that fits your week. Study materials included.",
      cta: "Book a test",
      icon: ClipboardCheck,
      link: "/book-citb-test",
    },
    {
      title: "Course for Green Card",
      description:
        "Health & Safety Awareness online or in a classroom — the step most labourers still need.",
      cta: "View course",
      icon: GraduationCap,
      link: "/health-safety-awareness",
    },
    {
      title: "Group booking",
      description:
        "Book tests, courses, or cards for a whole crew. Ask about multi-delegate rates.",
      cta: "Enquire",
      icon: Users,
      link: "/group-booking",
    },
  ];

  return (
    <section className="svc-section">
      <style>{`
        .svc-section {
          --svc-ink: #12161c;
          --svc-muted: #5a6573;
          --svc-line: #c5ccd6;
          background: #f1f4f7;
          border-top: 1px solid var(--svc-line);
          border-bottom: 1px solid var(--svc-line);
          padding: 72px 0;
        }
        .svc-wrap {
          max-width: 1024px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .svc-intro {
          margin-bottom: 36px;
          max-width: 34rem;
        }
        .svc-kicker {
          margin: 0 0 10px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--svc-muted);
        }
        .svc-heading {
          margin: 0;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: clamp(1.65rem, 3.2vw, 2.1rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: var(--svc-ink);
        }
        .svc-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 720px) {
          .svc-grid {
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }
        }
        .svc-card {
          display: flex;
          flex-direction: column;
          min-height: 220px;
          padding: 26px 24px 22px;
          background: #fff;
          border: 1px solid var(--svc-line);
          border-radius: 10px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
        }
        .svc-card:hover {
          border-color: #8f99a8;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(18, 22, 28, 0.08);
        }
        .svc-card:focus-visible {
          outline: 2px solid var(--svc-ink);
          outline-offset: 2px;
        }
        .svc-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .svc-icon {
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--svc-line);
          border-radius: 8px;
          color: var(--svc-ink);
          background: #f7f8fa;
        }
        .svc-num {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 12px;
          font-weight: 600;
          color: var(--svc-muted);
        }
        .svc-title {
          margin: 0 0 10px;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.3;
          color: var(--svc-ink);
        }
        .svc-copy {
          margin: 0 0 22px;
          flex: 1;
          font-size: 14px;
          line-height: 1.55;
          color: var(--svc-muted);
        }
        .svc-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          color: var(--svc-ink);
        }
        .svc-cta-icon {
          display: inline-flex;
          transition: transform 0.18s ease;
        }
        .svc-card:hover .svc-cta-icon {
          transform: translateX(4px);
        }
      `}</style>

      <div className="svc-wrap">
        <div className="svc-intro">
          <p className="svc-kicker">What we handle</p>
          <h2 className="svc-heading">Cards, tests, courses — sorted</h2>
        </div>

        <div className="svc-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a key={service.title} href={service.link} className="svc-card">
                <div className="svc-card-top">
                  <span className="svc-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.85} />
                  </span>
                  <span className="svc-num">0{index + 1}</span>
                </div>
                <h3 className="svc-title">{service.title}</h3>
                <p className="svc-copy">{service.description}</p>
                <span className="svc-cta">
                  {service.cta}
                  <span className="svc-cta-icon">
                    <ArrowRight size={15} strokeWidth={2.25} />
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { CreditCard, ClipboardCheck, GraduationCap, Users } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Apply CSCS Card",
      description: "Get your CSCS Card online today. Fast-track application processing, renewals, and replacements for lost cards under one simple dashboard.",
      cta: "Apply Now",
      icon: CreditCard,
      link: "/cscs-cards",
    },
    {
      title: "Book CITB HS&E Test",
      description: "Schedule your CITB Touchscreen Test at a nearby official test centre. Flexible date selection with online study materials.",
      cta: "Book Now",
      icon: ClipboardCheck,
      link: "/book-citb-test",
    },
    {
      title: "Construction Course leading to Green Card",
      description: "Complete your Health & Safety Awareness Course online or in-person. The final step to qualifying for your Green CSCS Card.",
      cta: "Book Now",
      icon: GraduationCap,
      link: "/apply-cscs",
    },
    {
      title: "Group Book",
      description: "Coordinate bookings for multiple team members at once. Secure group test dates, card applications, and training with corporate discounts.",
      cta: "Enquire",
      icon: Users,
      link: "#group",
    },
  ];

  return (
    <section className="bg-slate-50 border-t border-b border-slate-200" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          max-width: 1024px;
          margin: 0 auto;
          padding: 0 24px;
        }
        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .service-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.025);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
          border-color: #2563eb;
        }
        .service-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
          margin-bottom: 24px;
          transition: all 0.3s ease;
        }
        .service-card:hover .service-icon-wrapper {
          background: #0f172a;
          color: #ffffff;
        }
        .service-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
          line-height: 1.4;
        }
        .service-description {
          font-size: 15px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 28px;
          flex-grow: 1;
        }
        .service-btn {
          width: 100%;
          padding: 14px 24px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          text-align: center;
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-block;
          box-sizing: border-box;
        }
        .btn-primary {
          background: #0f172a;
          color: #ffffff;
          border: 1px solid #0f172a;
        }
        .btn-primary:hover {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
        }
      `}</style>
      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="service-card">
              <div>
                <div className="service-icon-wrapper">
                  <Icon size={28} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
              <a href={service.link} className="service-btn btn-primary">
                {service.cta}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

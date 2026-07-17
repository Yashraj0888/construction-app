"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import HowToBookSection from "./components/HowToBookSection";
import ApplyCscsSection from "./components/ApplyCscsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <HowToBookSection />
      <ApplyCscsSection />
      <ContactSection />
      <Footer />
    </>
  );
}

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CompanyCarousel from "@/components/CompanyCarousel";
import EcoFriendlySection from "@/components/EcoFriendlySection";
import TrustMetrics from "@/components/TrustMetrics";
import MultiStepPickupForm from "@/components/MultiStepPickupForm";
import InitiativesSection from "@/components/InitiativesSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import CareerSection from "@/components/CareerSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <Header />
      <main>
        <HeroSection />
        <CompanyCarousel />
        <EcoFriendlySection />
        <TrustMetrics />
        <MultiStepPickupForm />
        <InitiativesSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <CareerSection />
      </main>
      <Footer />
    </div>
  );
}

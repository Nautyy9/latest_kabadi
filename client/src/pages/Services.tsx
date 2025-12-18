import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WhyChooseKabadi from "@/components/WhyChooseKabadi";
import vehicleImage from "@assets/generated_images/Vehicle_scrapping_service_facility_7aed18af.png";
import zeroWasteImage from "@assets/generated_images/Zero_waste_eco-friendly_community_ea9c04d6.png";
import paperImage from "@assets/generated_images/Professional_paper_shredding_service_2b5363e9.png";

import PageTransition from "@/components/PageTransition";
import SectionInView from "@/components/SectionInView";
import { useEffect } from "react";

export default function Services() {
  const services = [
    {
      title: "Vehicle Scrapping",
      image: vehicleImage,
      description: "Professional end-of-life vehicle disposal service ensuring environmental compliance and maximum value recovery. We handle all documentation and provide proper certificates for vehicle de-registration.",
      features: [
        "Free vehicle pickup from your location",
        "Environmentally safe dismantling process",
        "Best market rates for your old vehicle",
        "All legal documentation handled",
        "Certificate of destruction provided",
      ],
    },
    {
      title: "Zero Waste Society",
      image: zeroWasteImage,
      description: "Comprehensive waste management solutions helping communities and organizations achieve their zero-waste goals through systematic recycling and waste reduction programs.",
      features: [
        "Customized waste management plans",
        "Regular collection and sorting services",
        "Community education programs",
        "Waste audit and analytics",
        "Achievement tracking and reporting",
      ],
    },
    {
      title: "Paper Shredding",
      image: paperImage,
      description: "Secure document destruction services ensuring complete confidentiality while contributing to paper recycling. Perfect for businesses and individuals with sensitive documents.",
      features: [
        "On-site and off-site shredding options",
        "Certificate of destruction provided",
        "Secure chain of custody",
        "All shredded paper recycled responsibly",
        "Compliance with data protection regulations",
      ],
    },
    {
      title: "Dismantling Services",
      image: vehicleImage,
      description: "Expert dismantling and recycling of industrial equipment, machinery, and structures with focus on maximum material recovery and environmental safety.",
      features: [
        "Industrial equipment dismantling",
        "Machinery decommissioning",
        "Structural demolition",
        "Material segregation and recycling",
        "Site cleanup and restoration",
      ],
    },
  ];

  const scrollToContact = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // Smooth-scroll to hash on mount and on hash changes
  if (typeof window !== 'undefined') {
    // no-op here; handled in useEffect below
  }

  // Handle hash scrolling on mount and when hash changes (same-route navigation)
  useEffect(() => {
    const doScroll = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        // delay to ensure layout is stable
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      }
    };
    doScroll();
    window.addEventListener('hashchange', doScroll);
    return () => window.removeEventListener('hashchange', doScroll);
  }, []);

  return (
    <PageTransition className="min-h-screen">
      <Header />
      <main>
        <SectionInView>
          <section className="relative py-20 overflow-visible">
          <div className="absolute inset-0 -top-12 bg-gradient-to-b from-green-50 via-green-50/60 -z-10 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive eco-friendly solutions for all your scrap and waste management needs
            </p>
          </div>
        </section>
        </SectionInView>
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-20">
            {services.map((service, index) => (
        <SectionInView>
              
              <div
                key={service.title}
               id={`service-${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|--+/g, '-')}`}
                className={`scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`order-1 lg:order-none ${index % 2 === 1 ? "lg:order-2" : ""} hidden lg:block`}>
                  <Card className="overflow-hidden hover-elevate">
                    <div className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 p-4 sm:p-6 lg:p-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="rounded-2xl lg:rounded-3xl shadow-lg w-full max-h-64 lg:max-h-none lg:h-auto object-cover"
                      />
                    </div>
                  </Card>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""} order-1 lg:order-none`}>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 text-green-700 dark:text-green-400">{service.title}</h2>
                  <p className="text-base lg:text-lg text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  {/* Mobile/Tablet image placed under heading & subtext */}
                  <div className="lg:hidden mb-6">
                    <Card className="overflow-hidden hover-elevate">
                      <div className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 p-4 sm:p-6">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="rounded-2xl shadow-lg w-full max-h-64 object-cover"
                        />
                      </div>
                    </Card>
                  </div>

                  <Card className="p-4 sm:p-6 mb-6 bg-gradient-to-r from-green-50 via-green-50/50 to-white dark:bg-green-950/20 border-l-4 border-l-green-600">
                    <h3 className="font-semibold text-base lg:text-lg mb-4 text-foreground">Key Features:</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm lg:text-base">
                          <span className="text-green-600 dark:text-green-400 mt-1 font-bold flex-shrink-0">✓</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                  <Button
                    size="lg"
                    onClick={scrollToContact}
                    data-testid={`button-learn-more-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="w-full sm:w-auto"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </SectionInView>
            ))}
          </div>
        </section>

        {/* <section className="py-16 lg:py-20 bg-white dark:bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">Ready to Get Started?</h2>
            <p className="text-base lg:text-xl text-muted-foreground mb-6 lg:mb-8">
              Contact us today to learn more about our services or request a pickup
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
              <Button size="lg" onClick={scrollToContact} data-testid="button-contact-us" className="w-full sm:w-auto">
                Contact Us
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => (window.location.href = "/request-pickup")}
                data-testid="button-request-pickup-services"
                className="w-full sm:w-auto"
              >
                Request Pickup
              </Button>
            </div>
          </div>
        </section> */}

        
        {/* Why Choose Section */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WhyChooseKabadi />
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground">
            Have questions about our services? We're here to help
          </p>
        </div>
      </div>
    </section>
  );
}

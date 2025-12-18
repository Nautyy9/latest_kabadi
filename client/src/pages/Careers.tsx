import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CareerSection from "@/components/CareerSection";
import WhyChooseKabadi from "@/components/WhyChooseKabadi";
import { Card } from "@/components/ui/card";
import { Users, Heart, TrendingUp, Award } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import SectionInView from "@/components/SectionInView";

export default function Careers() {
  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Great Team",
      description: "Work with passionate people committed to environmental sustainability",
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Health Benefits",
      description: "Comprehensive health insurance and wellness programs for all employees",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Growth Opportunities",
      description: "Clear career paths and continuous learning opportunities",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Recognition",
      description: "Performance-based rewards and recognition programs",
    },
  ];

  return (
    <PageTransition className="min-h-screen">
      <Header />
      <main>
        <SectionInView>
          <section className="relative py-20 overflow-visible">
          <div className="absolute inset-0 -top-12  bg-gradient-to-b from-green-50 via-green-50/60  -z-10 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-muted-foreground">
              Build your career while making a positive impact on the environment
            </p>
          </div>
        </section>
          </SectionInView>

        <SectionInView>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Work With Us?</h2>
              <p className="text-xl text-muted-foreground">
                Be part of something bigger than yourself
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="p-6 text-center bg-white border-green-200 bg-gradient-to-br from-green-50/80">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        </SectionInView>

        <SectionInView>
        <CareerSection />
        </SectionInView>
        {/* Why Choose Section */}
        <SectionInView>
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WhyChooseKabadi />
          </div>
        </section>
        </SectionInView>
      </main>
      <Footer />
    </PageTransition>
  );
}

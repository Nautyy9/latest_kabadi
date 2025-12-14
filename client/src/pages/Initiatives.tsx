import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WhyChooseKabadi from "@/components/WhyChooseKabadi";
import treePlantingImage from "@assets/generated_images/Community_tree_planting_initiative_d175b108.png";
import educationImage from "@assets/generated_images/Recycling_education_workshop_initiative_c925daa6.png";
import waterCleanupImage from "@assets/generated_images/Water_body_cleanup_initiative_21b88d5c.png";

export default function Initiatives() {
  const initiatives = [
    {
      title: "Tree Plantation Drive",
      image: treePlantingImage,
      description:
        "We lead large-scale urban tree plantation drives to improve air quality, reduce heat islands, and create greener neighborhoods. Our community-first approach engages volunteers, schools, and local bodies for lasting impact.",
      features: [
        "5,000+ trees planted across the city",
        "Native species selected for sustainability",
        "Community maintenance and care programs",
        "Corporate CSR partnership opportunities",
        "Geo-tagging and survival tracking",
      ],
    },
    {
      title: "Recycling Education",
      image: educationImage,
      description:
        "Awareness is the foundation of sustainability. We conduct workshops and educational programs to help households, schools, and businesses adopt correct waste segregation and recycling practices.",
      features: [
        "Interactive workshops for schools and RWAs",
        "Waste segregation starter kits",
        "Training for facility staff and housekeeping",
        "Custom programs for offices and societies",
        "Impact reports and behavior change tracking",
      ],
    },
    {
      title: "Clean Water Initiative",
      image: waterCleanupImage,
      description:
        "We organize clean-up and restoration activities across lakes, ponds, and local water bodies, focusing on waste removal, awareness, and long-term community stewardship.",
      features: [
        "Water body clean-up and waste removal",
        "Citizen engagement and awareness drives",
        "On-ground segregation and safe disposal",
        "Partnership with local authorities and NGOs",
        "Ongoing monitoring and maintenance support",
      ],
    },
  ];

  const scrollToContact = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative py-20 overflow-visible">
          <div className="absolute inset-0 -top-12 bg-gradient-to-b from-green-50 via-green-50/60 -z-10 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Our Initiatives</h1>
            <p className="text-xl text-muted-foreground">
              Community action for a cleaner, greener future
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-20">
            {initiatives.map((initiative, index) => (
              <div
                key={initiative.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""} order-2 lg:order-none`}>
                  <Card className="overflow-hidden hover-elevate">
                    <div className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 p-4 sm:p-6 lg:p-0">
                      <img
                        src={initiative.image}
                        alt={initiative.title}
                        className="rounded-2xl lg:rounded-3xl shadow-lg w-full max-h-64 lg:max-h-none lg:h-auto object-cover"
                      />
                    </div>
                  </Card>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""} order-1 lg:order-none`}>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 text-green-700 dark:text-green-400">{initiative.title}</h2>
                  <p className="text-base lg:text-lg text-muted-foreground mb-6">
                    {initiative.description}
                  </p>
                  <Card className="p-4 sm:p-6 mb-6 bg-gradient-to-r from-green-50 via-green-50/50 to-white dark:bg-green-950/20 border-l-4 border-l-green-600">
                    <h3 className="font-semibold text-base lg:text-lg mb-4 text-foreground">Key Highlights:</h3>
                    <ul className="space-y-2">
                      {initiative.features.map((feature) => (
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
                    data-testid={`button-get-involved-${initiative.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="w-full sm:w-auto"
                  >
                    Get Involved
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WhyChooseKabadi />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

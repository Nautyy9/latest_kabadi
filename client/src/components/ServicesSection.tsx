import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Leaf, Scissors, Wrench } from "lucide-react";
import { Link } from "wouter";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card className="p-8 hover-elevate border-l-4 border-l-blue-500 bg-white dark:bg-slate-800">
      <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-blue-300 dark:border-blue-700">
        <div className="text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-4 text-sm">{description}</p>
      <Link href="/services">
        <Button variant="ghost" data-testid={`button-explore-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          Explore Service
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Button>
      </Link>
    </Card>
  );
}

export default function ServicesSection() {
  const services = [
    {
      icon: <Car className="h-8 w-8 stroke-[1.5]" />,
      title: "Vehicle Scrapping",
      description: "Professional end-of-life vehicle disposal with proper environmental standards.",
    },
    {
      icon: <Leaf className="h-8 w-8 stroke-[1.5]" />,
      title: "Zero Waste Society",
      description: "Comprehensive waste management solutions for sustainable communities.",
    },
    {
      icon: <Scissors className="h-8 w-8 stroke-[1.5]" />,
      title: "Paper Shredding",
      description: "Secure document destruction with responsible recycling practices.",
    },
    {
      icon: <Wrench className="h-8 w-8 stroke-[1.5]" />,
      title: "Dismantling Services",
      description: "Expert dismantling and recycling of industrial equipment.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-12 sm:px-12 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions for all your scrap needs - trusted by thousands for quality, professionalism, and fair rates
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Leaf, Scissors, Wrench } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card className="p-8 group relative hover:bg-gradient-to-r hover:from-green-50/80 hover:to-blue-50/80 transform transition-all duration-700 bg-white border-2 border-l-4  border-slate-200 border-l-primary   hover:border-green-200/50  overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover/btn:scale-110 group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 pointer-events-none"></div>
                  <div className="bg-kabadi-light w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-green-300 dark:border-green-600">
        <div className="text-kabadi-primary">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-4 text-sm">{description}</p>
      <Link href="/services">
        <Button 
          variant="ghost" 
          className="group/btn group-hover:bg-primary group-hover:text-white transition-all duration-300" 
          data-testid={`button-explore-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          Explore Service
          <svg className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Button>
      </Link>
    </Card>
  );
}

const sectionVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } } as const;
const listContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } } as const;
const listItem = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } } as const;

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
    <section className="py-20   dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-12">
        <motion.div className="text-center mb-16" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <h2 className="text-4xl md:text-5xl mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions for all your scrap needs - trusted by thousands for quality, professionalism, and fair rates
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={listContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {services.map((service) => (
            <motion.div key={service.title} variants={listItem} transition={{ duration: 0.4, ease: "easeOut" }}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

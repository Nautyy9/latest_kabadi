import { Card } from "@/components/ui/card";
import { Recycle, Wrench, FileText, Box, Smartphone, Lightbulb } from "lucide-react";

interface PriceCardProps {
  icon: React.ReactNode;
  name: string;
  rate: number;
  unit: string;
}

function PriceCard({ icon, name, rate, unit }: PriceCardProps) {
  return (
    <Card className="p-6 hover-elevate transform transition-transform hover:scale-105">
      <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <div className="text-3xl font-bold text-primary" data-testid={`price-${name.toLowerCase()}`}>
        ₹{rate}
        <span className="text-lg text-muted-foreground">/{unit}</span>
      </div>
    </Card>
  );
}

export default function PricingSection() {
  const prices = [
    { icon: <Recycle className="h-8 w-8 text-primary" />, name: "Plastic", rate: 20, unit: "kg" },
    { icon: <Wrench className="h-8 w-8 text-primary" />, name: "Metal", rate: 40, unit: "kg" },
    { icon: <FileText className="h-8 w-8 text-primary" />, name: "Paper", rate: 12, unit: "kg" },
    { icon: <Box className="h-8 w-8 text-primary" />, name: "Cardboard", rate: 15, unit: "kg" },
    { icon: <Smartphone className="h-8 w-8 text-primary" />, name: "Electronics", rate: 35, unit: "kg" },
    { icon: <Lightbulb className="h-8 w-8 text-primary" />, name: "Glass", rate: 8, unit: "kg" },
  ];

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Fair & Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground">
            Get the best rates for your scrap materials
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prices.map((price) => (
            <PriceCard key={price.name} {...price} />
          ))}
        </div>
      </div>
    </section>
  );
}

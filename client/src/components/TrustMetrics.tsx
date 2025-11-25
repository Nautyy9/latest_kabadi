import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Users, Scale, Trees, MapPin } from "lucide-react";

interface MetricProps {
  end: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

function AnimatedCounter({ end, suffix, label, icon }: MetricProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  const variants = [
    { bg: "bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/40 dark:to-blue-950/40", iconBg: "bg-green-100 dark:bg-green-900/50", border: "border-l-4 border-l-green-500" },
    { bg: "bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/40 dark:to-blue-950/40", iconBg: "bg-green-100 dark:bg-green-900/50", border: "border-l-4 border-l-green-600" },
    { bg: "bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/40 dark:to-green-950/40", iconBg: "bg-blue-100 dark:bg-blue-900/50", border: "border-l-4 border-l-blue-500" },
    { bg: "bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/40 dark:to-green-950/40", iconBg: "bg-blue-100 dark:bg-blue-900/50", border: "border-l-4 border-l-blue-600" },
  ];
  
  const variant = variants[Math.abs(label.charCodeAt(0)) % variants.length];

  return (
    <Card className={`p-8 text-center hover-elevate ${variant.bg} ${variant.border} border-0`}>
      <div className={`${variant.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
        {icon}
      </div>
      <div className="text-4xl font-semibold text-foreground mb-2" data-testid={`metric-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
    </Card>
  );
}

export default function TrustMetrics() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedCounter
            end={10000}
            suffix="+"
            label="Customers Served"
            icon={<Users className="h-8 w-8 text-primary" />}
          />
          <AnimatedCounter
            end={50000}
            suffix="+ Kg"
            label="Scrap Collected"
            icon={<Scale className="h-8 w-8 text-primary" />}
          />
          <AnimatedCounter
            end={5000}
            suffix="+"
            label="Trees Saved"
            icon={<Trees className="h-8 w-8 text-primary" />}
          />
          <AnimatedCounter
            end={150}
            suffix="+"
            label="Pickup Locations"
            icon={<MapPin className="h-8 w-8 text-primary" />}
          />
        </div>
      </div>
    </section>
  );
}

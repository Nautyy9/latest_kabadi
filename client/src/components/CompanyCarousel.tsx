import { Card } from "@/components/ui/card";
import { Building2, Factory, Leaf, Recycle, Truck, Zap, TreePine, Package, Cpu, Hammer } from "lucide-react";

export default function CompanyCarousel() {
  const companies = [
    { name: "TechCorp", icon: <Cpu className="h-12 w-12 text-primary" /> },
    { name: "GreenEnergy", icon: <Zap className="h-12 w-12 text-primary" /> },
    { name: "EcoSolutions", icon: <Leaf className="h-12 w-12 text-primary" /> },
    { name: "MetalWorks", icon: <Hammer className="h-12 w-12 text-primary" /> },
    { name: "PaperMills", icon: <Package className="h-12 w-12 text-primary" /> },
    { name: "PlasticIndustries", icon: <Recycle className="h-12 w-12 text-primary" /> },
    { name: "AutoParts", icon: <Truck className="h-12 w-12 text-primary" /> },
    { name: "BuildMart", icon: <Building2 className="h-12 w-12 text-primary" /> },
    { name: "RecycleHub", icon: <TreePine className="h-12 w-12 text-primary" /> },
    { name: "GreenFactory", icon: <Factory className="h-12 w-12 text-primary" /> },
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 pb-6 border-b-2 border-dashed border-slate-300 dark:border-slate-600">
          Over 75,000 Companies Use theKabadi to be More Productive
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 px-8 py-6 flex flex-col items-center gap-3 min-w-[200px]"
              >
                <div className="border border-green-300 dark:border-green-600 bg-kabadi-light p-4 rounded-2xl">
                  {company.icon}
                </div>
                <p className="text-lg font-bold text-foreground whitespace-nowrap">
                  {company.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

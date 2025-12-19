import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import treePlantingImage from "@assets/generated_images/Community_tree_planting_initiative_d175b108.png";
import educationImage from "@assets/generated_images/Recycling_education_workshop_initiative_c925daa6.png";
import waterCleanupImage from "@assets/generated_images/Water_body_cleanup_initiative_21b88d5c.png";

type InitiativeCardProps = {
  title: string;
  description: string;
  image: string;
  id: string;
}


function InitiativeCard({ title, description, image, id }: InitiativeCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate group bg-white dark:bg-slate-800 h-96 relative cursor-pointer">
      <img src={image} alt={title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" />
      
      {/* Dynamic overlay - darker by default, lighter on hover for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/20 group-hover:from-slate-900/80 group-hover:via-slate-900/40 group-hover:to-transparent transition-all duration-500" />
      
      {/* Animated shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full transform group-hover:translate-y-[-8px] transition-transform duration-300">
        {/* Glowing title with animated text shadow */}
        <h3 className="text-2xl font-bold mb-3 text-white relative">
          <span className="relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
            {title}
          </span>
          {/* Subtle glow behind text */}
          <span className="absolute inset-0 text-white/20 blur-sm group-hover:text-white/40 transition-all duration-300">
            {title}
          </span>
        </h3>
        
        {/* Enhanced description with better readability */}
        <p className="mb-4 text-sm line-clamp-2 text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]  transition-all duration-300 leading-relaxed">
          {description}
        </p>
        
        {/* Animated button with glow effect */}
        <Link href={`/initiatives`}>
          <Button 
            variant="ghost" 
            className="group/btn group-hover:translate-x-2 transition-all duration-300 p-0 h-auto text-white hover:text-white relative overflow-hidden" 
            data-testid={`button-learn-more-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <span className="relative z-10 flex items-center drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] group-hover:font-semibold group-hover:px-4 transition-all duration-300">
              Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </span>
            {/* Button glow background */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded transition-all duration-300" />
          </Button>
        </Link>
      </div>
      
      {/* Corner accent for visual appeal */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-kabadi-primary/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm" />
    </Card>
  );
}

const sectionVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } } as const;
const listContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } } as const;
const listItem = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } } as const;

export default function InitiativesSection() {
  const initiatives = [
    {
      id: "tree-plantation",
      title: "Tree Plantation Drive",
      description: "Over 5,000 trees planted across urban areas for a greener community.",
      image: treePlantingImage,
    },
    {
      id: "recycling-education",
      title: "Recycling Education",
      description: "Educating communities on proper waste segregation and sustainable practices.",
      image: educationImage,
    },
    {
      id: "clean-water",
      title: "Clean Water Initiative",
      description: "Cleaning rivers and water bodies for healthier aquatic ecosystems.",
      image: waterCleanupImage,
    },
  ];

  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-12">
        <motion.div className="text-center mb-12" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <h2 className="text-4xl md:text-5xl mb-4">Our Initiatives</h2>
          <p className="text-lg text-muted-foreground">
            Changing society for a sustainable future
          </p>
        </motion.div>
        {<InitiativeSectionMapper initiatives={initiatives} />}
      </div>
    </section>
  );
}

export function InitiativeSectionMapper({initiatives}  : {initiatives: InitiativeCardProps[]}) {
return (
  <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={listContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {initiatives.map((initiative) => (
            <motion.div key={initiative.title} variants={listItem} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <InitiativeCard {...initiative} />
            </motion.div>
          ))}
        </motion.div>
)
}

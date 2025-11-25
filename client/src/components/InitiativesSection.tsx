import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import treePlantingImage from "@assets/generated_images/Community_tree_planting_initiative_d175b108.png";
import educationImage from "@assets/generated_images/Recycling_education_workshop_initiative_c925daa6.png";
import waterCleanupImage from "@assets/generated_images/Water_body_cleanup_initiative_21b88d5c.png";

interface InitiativeCardProps {
  title: string;
  description: string;
  image: string;
  id: string;
}

function InitiativeCard({ title, description, image, id }: InitiativeCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate group bg-white dark:bg-slate-800 h-96 relative">
      <img src={image} alt={title} className="w-full h-full object-cover absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end h-full">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="mb-4 text-sm line-clamp-2">{description}</p>
        <Link href={`/initiatives/${id}`}>
          <Button variant="ghost" className="group-hover:translate-x-1 transition-transform p-0 h-auto text-white hover:text-white" data-testid={`button-learn-more-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

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
    <section className="py-20 bg-gradient-to-b from-gray-100 to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-12 sm:px-12 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="mb-4">Our Initiatives</h2>
          <p className="text-lg text-muted-foreground">
            Changing society for a sustainable future
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((initiative) => (
            <InitiativeCard key={initiative.title} {...initiative} />
          ))}
        </div>
      </div>
    </section>
  );
}

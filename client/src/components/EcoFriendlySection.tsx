import { Card } from "@/components/ui/card";
import { Leaf, Users, TrendingUp } from "lucide-react";
import communityImage from "@assets/generated_images/Eco-friendly_community_scene_51ba1731.png";
import transformImage from "@assets/generated_images/Environmental_transformation_comparison_7b4030b9.png";

export default function EcoFriendlySection() {
  const benefits = [
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Environmental Impact",
      description: "Reducing waste and carbon footprint through systematic recycling",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community Engagement",
      description: "Bringing communities together for a sustainable future",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Sustainable Growth",
      description: "Building a circular economy that benefits everyone",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-6">
            Making Society Eco-Friendly
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're committed to creating a cleaner, greener future for our communities through responsible scrap collection and recycling.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Our Vision for a Sustainable Future</h3>
            <p className="text-lg text-muted-foreground">
              Through responsible scrap collection and recycling, we're reducing waste, conserving resources, and protecting our environment for generations to come. Every pickup makes a difference in building a sustainable tomorrow.
            </p>
            <div className="grid gap-4">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="p-6 hover-elevate border-l-2 border-l-blue-500">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg flex-shrink-0">
                      <div className="text-blue-600 dark:text-blue-400">
                        {benefit.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{benefit.title}</h4>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={communityImage}
              alt="Eco-friendly community working together"
              className="rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>

        <div className="mt-16">
          <Card className="overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                <h3 className="text-3xl font-bold mb-4">The Change We're Creating</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Our impact extends beyond waste collection. We're transforming neighborhoods, creating green jobs, and inspiring environmental consciousness across communities.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full p-1">
                      <Leaf className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <p className="font-medium">Zero waste to landfills</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full p-1">
                      <Leaf className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <p className="font-medium">100% material recovery focus</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full p-1">
                      <Leaf className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <p className="font-medium">Community education programs</p>
                  </div>
                </div>
              </div>
              <div className="relative h-full min-h-[400px]">
                <img
                  src={transformImage}
                  alt="Environmental transformation"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

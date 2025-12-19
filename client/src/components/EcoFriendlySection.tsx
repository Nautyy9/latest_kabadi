import { Card } from "@/components/ui/card";
import { motion, MotionAdvancedProps, MotionValue } from "framer-motion";
import { Leaf, Users, TrendingUp } from "lucide-react";
import communityImage from "@assets/generated_images/Eco-friendly_community_scene_51ba1731.png";
import transformImage from "@assets/generated_images/Environmental_transformation_comparison_7b4030b9.png";

const leftVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};
const rightVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};
const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const listItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function EcoFriendlySection() {
  const benefits = [
    {
      icon: <Leaf className="h-6 w-6 text-primary" />,
      title: "Environmental Impact",
      description: "Reducing waste and carbon footprint through systematic recycling",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Community Engagement",
      description: "Bringing communities together for a sustainable future",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Sustainable Growth",
      description: "Building a circular economy that benefits everyone",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-6">
            Making Society Eco-Friendly
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're committed to creating a cleaner, greener future for our communities through responsible scrap collection and recycling.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <motion.div className="space-y-6" variants={leftVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <h3 className="text-3xl font-bold">Our Vision for a Sustainable Future</h3>
            <p className="text-lg text-muted-foreground">
              Through responsible scrap collection and recycling, we're reducing waste, conserving resources, and protecting our environment for generations to come. Every pickup makes a difference in building a sustainable tomorrow.
            </p>
            <motion.div className="grid gap-4"  >
              {benefits.map((benefit) => (
                <motion.div key={benefit.description} variants={listItem} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 1 }} >
                  <Card key={benefit.title} className="p-6 bg-white border-l-2 border-l-green-500">
                  <div className="flex items-center justify-start gap-4">
                    <div className=" p-3 rounded-lg flex-shrink-0">
                      <div className="border border-green-300 dark:border-green-600 bg-kabadi-light p-3 rounded-lg text-kabadi-primary">
                        {benefit.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{benefit.title}</h4>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div className="relative" variants={rightVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 ,  }} transition={{ type: "smooth", duration: 0.6, ease: "easeOut" }}>
            <img
              src={communityImage}
              alt="Eco-friendly community working together"
              className="rounded-3xl shadow-2xl w-full"
            />
          </motion.div>
        </div>

        <div className="mt-16">
            <Card className=" group relative bg-gradient-to-b lg:bg-gradient-to-r from-green-50  transform transition-all duration-700 bg-white border-2  border-slate-200    hover:border-green-200/50  overflow-hidden ">
                {/* <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 pointer-events-none"></div> */}
                
            <div className="grid lg:grid-cols-2 gap-0 border rounded-3xl border-green-200/50">
              <motion.div className="p-8 lg:p-12 flex flex-col justify-center" variants={leftVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6, ease: "easeOut" }} >
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
              </motion.div>
              <motion.div className="relative h-full min-h-[400px]" variants={rightVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 ,  }} transition={{  duration: 0.6, ease: "easeOut" }} >
                <img
                  src={transformImage}
                  alt="Environmental transformation"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

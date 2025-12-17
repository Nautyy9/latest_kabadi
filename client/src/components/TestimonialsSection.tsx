import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import testimonial1 from "@assets/generated_images/Customer_testimonial_portrait_male_1abbf207.png";
import testimonial2 from "@assets/generated_images/Customer_testimonial_portrait_female_090bd0b0.png";
import testimonial3 from "@assets/generated_images/Senior_customer_testimonial_portrait_7e947acc.png";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

function TestimonialCard({ name, location, rating, text, image }: TestimonialCardProps) {
  return (
    <Card className="p-6 h-60 w-fit hover-elevate">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={cn("h-5 w-5 stroke-amber-500  text-amber-500", i<rating ? "fill-amber-500" : "fill-white")} />
        ))}

      </div>
      <p className="text-muted-foreground italic mb-6">"{text}"</p>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold" data-testid={`testimonial-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>{name}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
    </Card>
  );
}

const sectionVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } } as const;
const listContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } } as const;
const listItem = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } } as const;

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      text: "The Kabadi made it so easy to sell my scrap. They picked it up from my doorstep and paid fair rates. Highly recommended!",
      image: testimonial1,
    },
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Excellent service! They're punctual, professional, and environmentally conscious. I feel good knowing my scrap is being recycled properly.",
      image: testimonial2,
    },
    {
      name: "Mohan Singh",
      location: "Bangalore",
      rating: 4,
      text: "Been using their service for months. The rates are the best in the market and the pickup is always on time. Great initiative for our environment!",
      image: testimonial3,
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <h2 className="mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of satisfied customers
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={listContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={listItem} transition={{ duration: 0.45, ease: "easeOut" }}>
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

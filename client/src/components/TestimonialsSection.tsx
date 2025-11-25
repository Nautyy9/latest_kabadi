import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import testimonial1 from "@assets/generated_images/Customer_testimonial_portrait_male_1abbf207.png";
import testimonial2 from "@assets/generated_images/Customer_testimonial_portrait_female_090bd0b0.png";
import testimonial3 from "@assets/generated_images/Senior_customer_testimonial_portrait_7e947acc.png";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

function TestimonialCard({ name, location, rating, text, image }: TestimonialCardProps) {
  return (
    <Card className="p-6 hover-elevate">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-primary text-primary" />
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
      rating: 5,
      text: "Been using their service for months. The rates are the best in the market and the pickup is always on time. Great initiative for our environment!",
      image: testimonial3,
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of satisfied customers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

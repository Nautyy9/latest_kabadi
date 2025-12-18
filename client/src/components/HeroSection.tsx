import { Button } from "@/components/ui/button";
import { Leaf, TrendingUp, Clock } from "lucide-react";
import heroImage from "@assets/generated_images/Eco-friendly_scrap_collection_hero_8318ec83.png";

export default function HeroSection() {
  const scrollToPickup = () => {
    const element = document.getElementById("request-pickup");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPricing = () => {
    window.location.href = "/rates"
  };

  return (
    
    <section className="relative overflow-visible">
      {/* Extended gradient background that covers header area but stays within hero section */}
      <div className="absolute inset-x-0 -top-12 bottom-0 bg-gradient-to-b from-green-50 via-green-50/30 to-transparent -z-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Sell Your Scrap at{" "}
              <span className="text-primary">Fair Rates</span> From Home
            </h1>
            <p className="text-xl text-muted-foreground">
              We collect plastic, metal, paper, cardboard, and more right from your doorstep. No more wandering to find the right rates.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={scrollToPickup} data-testid="button-schedule-pickup">
                Schedule Free Pickup
              </Button>
              <Button size="lg" variant="outline" className=""  onClick={scrollToPricing} data-testid="button-view-pricing">
                View Pricing
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg border border-primary-border dark:border-primary-border/10">
                  <Leaf className="text-primary h-6 w-6  stroke-[1.5]" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Eco-Friendly</p>
                  <p className="text-sm text-muted-foreground">100% Recyclable</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg border border-primary-border dark:border-primary-border/10">
                  <TrendingUp className="h-6 w-6 text-primary stroke-[1.5]" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Best Rates</p>
                  <p className="text-sm text-muted-foreground">Market Leading</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg border border-primary-border dark:border-primary-border/10">
                  <Clock className="h-6 w-6 text-primary stroke-[1.5]" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Quick Pickup</p>
                  <p className="text-sm text-muted-foreground">Within 24 Hours</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Eco-friendly scrap collection service"
              className="rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

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
          {/* Content Section */}
          <div className="space-y-6 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Sell Your Scrap at{" "}
              <span className="text-primary">Fair Rates</span> From Home
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We collect plastic, metal, paper, cardboard, and more right from your doorstep. No more wandering to find the right rates.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={scrollToPickup} data-testid="button-schedule-pickup " className="min-w-52 max-w-max">
                Schedule Free Pickup
              </Button>
              <Button size="lg" variant="outline" className="min-w-52 max-w-max"  onClick={scrollToPricing} data-testid="button-view-pricing" >
                View Pricing
              </Button>
            </div>
            
            {/* Feature Section - Clean Column Layout */}
            <div className="flex flex-wrap justify-between min-[800px]:justify-start gap-6  py-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg border border-primary-border dark:border-primary-border/10">
                  <Leaf className="text-primary h-6 w-6 stroke-[1.5]" />
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

          {/* Image Section - Enhanced for MD+ breakpoints */}
          <div className="relative lg:order-2 md:mx-auto md:max-w-lg lg:max-w-none">
            {/* Decorative Elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-3xl blur-2xl opacity-50 md:opacity-70 lg:opacity-60"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-300/30 to-blue-300/30 rounded-full blur-xl md:block hidden lg:w-32 lg:h-32 lg:-top-8 lg:-right-8"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-blue-300/20 to-green-300/20 rounded-full blur-xl md:block hidden lg:w-40 lg:h-40 lg:-bottom-8 lg:-left-8"></div>
            
            {/* Additional LG+ decorative elements */}
            <div className="absolute top-1/4 -left-8 w-20 h-20 bg-gradient-to-r from-purple-300/20 to-green-300/20 rounded-full blur-xl hidden lg:block"></div>
            <div className="absolute bottom-1/3 -right-8 w-16 h-16 bg-gradient-to-l from-blue-300/25 to-purple-300/25 rounded-full blur-lg hidden lg:block"></div>
            
            {/* Main Image with responsive sizing */}
            <div className="relative">
              <img
                src={heroImage}
                alt="Eco-friendly scrap collection service"
                className="rounded-3xl shadow-2xl w-full md:shadow-3xl lg:shadow-2xl transform md:scale-105 lg:scale-100 transition-transform duration-300 hover:scale-[1.02] lg:hover:scale-105"
              />
              
              {/* Live Service Badge - Now visible on MD+ */}
              <div className="absolute -top-4 left-4 block ">
                <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-green-200 dark:border-green-700 rounded-xl px-4 py-2 shadow-lg lg:px-5 lg:py-3 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse lg:w-2.5 lg:h-2.5"></div>
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300 lg:text-base">Live Service</span>
                  </div>
                </div>
              </div>
              
              {/* 24hr Pickup Badge - Now visible on MD+ */}
              <div className="absolute -bottom-4 right-4 block">
                <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 shadow-lg lg:px-5 lg:py-4 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 lg:text-3xl">24hr</p>
                    <p className="text-xs text-muted-foreground lg:text-sm">Pickup</p>
                  </div>
                </div>
              </div>

              {/* Additional LG+ floating element */}
              {/* <div className="absolute top-4 right-4 hidden lg:block">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <span className="text-xl">♻️</span>
                </div>
              </div> */}

              {/* Trust indicator for LG+ */}
              {/* <div className="absolute bottom-4 left-4 hidden lg:block">
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-purple-200 dark:border-purple-700 rounded-lg px-3 py-2 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full -ml-0.5"></div>
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full -ml-0.5"></div>
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full -ml-0.5"></div>
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full -ml-0.5"></div>
                    </div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Trusted</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

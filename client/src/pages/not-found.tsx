import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, Recycle, TreePine, Leaf } from "lucide-react";
import { Link } from "wouter";

import PageTransition from "@/components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition className="min-h-screen bg-gradient-to-br from-kabadi-blue-light via-white to-green-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Recycle Icons */}
        <div className="absolute top-20 left-10 opacity-10 animate-float">
          <Recycle className="h-16 w-16 text-kabadi-primary rotate-12" />
        </div>
        <div className="absolute top-40 right-20 opacity-10 animate-float-delayed">
          <TreePine className="h-12 w-12 text-kabadi-emphasis rotate-45" />
        </div>
        <div className="absolute bottom-32 left-20 opacity-10 animate-float">
          <Leaf className="h-20 w-20 text-kabadi-primary -rotate-12" />
        </div>
        <div className="absolute top-60 left-1/2 opacity-10 animate-float-delayed">
          <Recycle className="h-14 w-14 text-kabadi-emphasis rotate-90" />
        </div>
        
        {/* Animated Circles */}
        <div className="absolute top-32 right-40 w-32 h-32 bg-kabadi-primary/5 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-16 w-24 h-24 bg-kabadi-emphasis/5 rounded-full animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-16 w-40 h-40 bg-blue-500/5 rounded-full animate-pulse-slow"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Animated 404 Number */}
          <div className="mb-8 relative">
            <div className="text-9xl md:text-[12rem] font-black text-transparent bg-gradient-to-r from-kabadi-primary to-kabadi-emphasis bg-clip-text animate-bounce-gentle">
              404
            </div>
            {/* Glowing Shadow */}
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-kabadi-primary/10 blur-md -z-10 animate-pulse">
              404
            </div>
          </div>

          {/* Animated Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-br from-kabadi-primary to-kabadi-emphasis rounded-full flex items-center justify-center shadow-2xl animate-wiggle group-hover:animate-spin relative overflow-hidden">
                {/* White background circle for logo visibility */}
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <img src="/favicon.webp" alt="Kabadi Logo" className="w-16 h-16 object-contain" />
                </div>
                {/* Rotating highlight effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </div>
              {/* Pulsing Ring */}
              <div className="absolute inset-0 w-32 h-32 border-4 border-kabadi-primary/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 w-28 h-28 border-2 border-kabadi-emphasis/20 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Main Message */}
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-2xl mb-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-kabadi-primary/5 to-kabadi-emphasis/5"></div>
            <div className="relative p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r bg-primary-border bg-clip-text text-transparent pb-6 animate-fade-in">
                Oops! Page Not Found
              </h1>
              <p className="text-xl text-kabadi-blue-soft mb-6 animate-fade-in-delayed">
                Looks like this page got recycled! 🌱
              </p>
              <p className="text-kabadi-blue-medium max-w-md mx-auto leading-relaxed animate-fade-in-delayed-2">
                The page you're looking for doesn't exist, but don't worry – just like how we turn waste into value, 
                we can help you find what you're looking for.
              </p>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link href="/">
              <Button className="bg-gradient-to-r from-kabadi-primary to-kabadi-emphasis hover:from-kabadi-emphasis hover:to-kabadi-primary text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                <Home className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Back to Home
              </Button>
            </Link>
            
            <Link href="/services">
              <Button variant="outline" className="border-2 border-kabadi-primary text-primary hover:bg-kabadi-primary hover:text-white px-8 py-3 text-lg  shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
                <Search className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                <p>
                  Explore Services
                  </p>
              </Button>
            </Link>

            <Link href="/rates">
              <Button variant="ghost" className="text-kabadi-blue-medium hover:text-kabadi-emphasis hover:bg-kabadi-primary/10 px-6 py-3 transition-all duration-300 group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:animate-bounce-left" />
                View Rates
              </Button>
            </Link>
          </div>

          {/* Fun Fact */}
          <div className="mt-12 animate-fade-in-delayed-3">
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border border-kabadi-primary/20 p-6 shadow-lg">
              <p className="text-sm text-kabadi-blue-medium">
                <span className="font-semibold text-kabadi-emphasis">💡 Fun Fact:</span> 
                While you're here, did you know that recycling one ton of paper saves 17 trees? 
                <Link href="/services" className="text-kabadi-primary hover:underline font-medium ml-1">
                  Start recycling with us!
                </Link>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

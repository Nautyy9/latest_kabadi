import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLHeadElement>(null);

  // Handle scroll to change header background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Change background after scrolling past hero section (roughly 400-500px)
      const heroSectionHeight = window.innerHeight * 0.6; // 60% of viewport height
      setIsScrolled(scrollPosition > heroSectionHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/rates", label: "Rates" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };


  return (
    <header 
      ref={headerRef} 
      className={`sticky top-0 z-50 backdrop-blur-md border-b border-b-white/10 transition-colors duration-300 ${
        isScrolled 
          ? "bg-white/95 dark:bg-slate-900/95" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-max  gap-y-4">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 -ml-2 px-2 py-1 rounded-md">
            <div className="h-12 w-auto flex items-center overflow-hidden">
              <img src="/favicon.webp" alt="logo" className="h-8 w-8 object-contain "/>
            </div>
            <span className="text-xl  font-bold text-foreground ">The Kabadi</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={isActive(link.href) ? "bg-gradient-to-b from-primary/10  dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-primary-border dark:border-green-200/50" : ""}
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link href="#request-pickup">
              <Button data-testid="button-request-pickup">
                Request Pickup
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${isActive(link.href) ? "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-400 dark:border-slate-500" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <Link href="#request-pickup">
                <Button
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="button-mobile-request-pickup"
                >
                  Request Pickup
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

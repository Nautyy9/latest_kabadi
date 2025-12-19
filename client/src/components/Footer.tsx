import { Link, useLocation } from "wouter";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { SiFacebook, SiX, SiInstagram, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const [, navigate] = useLocation();

  const gotoService = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === "/services") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
      } else {
        // fallback: navigate so Services can scroll on mount
        navigate(`/services#${id}`);
      }
    } else {
      navigate(`/services#${id}`);
    }
  };

  return (
    <footer className=" border-t">
      <div className="border-t-4 border-primary" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary rounded-full p-1.5">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">The Kabadi</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Making society eco-friendly, one pickup at a time. Sell your scrap
              at fair rates from the comfort of your home.
            </p>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="hover-elevate active-elevate-2"
                data-testid="link-facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover-elevate active-elevate-2"
                data-testid="link-twitter"
              >
                <SiX className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover-elevate active-elevate-2"
                data-testid="link-instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover-elevate active-elevate-2"
                data-testid="link-linkedin"
              >
                <SiLinkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/rates"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Rates
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/services#service-vehicle-scrapping" onClick={gotoService('service-vehicle-scrapping')} className="hover:text-foreground transition-colors">Vehicle Scrapping</a>
              </li>
              <li>
                <a href="/services#service-zero-waste-society" onClick={gotoService('service-zero-waste-society')} className="hover:text-foreground transition-colors">Zero Waste Society</a>
              </li>
              <li>
                <a href="/services#service-paper-shredding" onClick={gotoService('service-paper-shredding')} className="hover:text-foreground transition-colors">Paper Shredding</a>
              </li>
              <li>
                <a href="/services#service-dismantling-services" onClick={gotoService('service-dismantling-services')} className="hover:text-foreground transition-colors">Dismantling Services</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3 text-muted-foreground mb-4">
              <div className="flex gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>123 Green Street, Eco City, 110001</span>
              </div>
              <div className="flex gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>contact@thekabadi.com</span>
              </div>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-newsletter-email"
              />
              <Button type="submit" data-testid="button-newsletter-submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 The Kabadi. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

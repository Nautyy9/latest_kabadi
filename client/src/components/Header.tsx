import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf, X, Home, Recycle, HeartHandshake, IndianRupee, Phone, Briefcase, Check, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { easeOut, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MobileLink from "./MobileLink";

function InteractiveCenter({ onIntroEnd }: { onIntroEnd?: () => void }) {
  const [showIntro, setShowIntro] = useState(true);
  const [hoverOpen, setHoverOpen] = useState(false);
  const [pinnedOpen, setPinnedOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowIntro(false);
      onIntroEnd?.();
    }, 2000);
    return () => clearTimeout(t);
  }, [onIntroEnd]);

  // Hide hover/pinned panel on scroll if open
  useEffect(() => {
    const onScroll = () => {
      if (hoverOpen || pinnedOpen) {
        setHoverOpen(false);
        setPinnedOpen(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hoverOpen, pinnedOpen]);


  const quickLinks = [
    { href: "/services", label: "Services" },
    { href: "/rates", label: "Rates" },
    { href: "/initiatives", label: "Initiatives" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="hidden md:flex absolute  left-1/2 -translate-x-1/2 items-center">
      {/* Intro links with left/right curtains sliding to center */}
      {showIntro && (
        <div className="relative">
          <div className="flex items-center gap-2 rounded-full px-3 py-1 border border-white/20 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
            {quickLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                <Button variant="ghost" size="sm" className="rounded-full px-3">
                  {l.label}
                </Button>
              </Link>
            ))}
          </div>
          {/* Curtains */}
          <div className="pointer-events-none absolute inset-0 flex">
            <div className="w-1/2 h-full bg-gradient-to-r from-white to-white/80 dark:from-slate-900 dark:to-slate-900/80 backdrop-blur-md animate-slide-in-left"></div>
            <div className="w-1/2 h-full bg-gradient-to-l from-white to-white/80 dark:from-slate-900 dark:to-slate-900/80 backdrop-blur-md animate-slide-in-right"></div>
          </div>
        </div>
      )}

      {/* Two-bar modern hamburger that reveals hover panel; click pins it open */}
      {!showIntro && (
        <div
          className="group relative"
          onMouseEnter={() => {
            setHoverOpen(true);
            setPinnedOpen(true); // stick open on hover
          }}
          onMouseLeave={() => {
            setHoverOpen(false);
          }}
        >
          <button
            className="rounded-full px-4 py-3 border border-white/20 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md transition animate-fade-in-slow hover:bg-green-600 hover:text-white hover:border-green-500"
            aria-label="Open navigation"
          >
            <div className="flex flex-col items-center justify-center gap-1.5">
              <span className="block h-[2px] w-7 bg-current rounded-full"></span>
              <span className="block h-[2px] w-5 bg-current rounded-full"></span>
            </div>
          </button>

          {/* Hover/pinned panel below header, narrower than top bar */}
          {(hoverOpen || pinnedOpen) && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[70vw] max-w-xl rounded-2xl bg-white text-slate-900 backdrop-blur-md p-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {quickLinks.map((l, idx) => (
                  <div
                    key={l.href}
                    className="animate-drop-in"
                    style={{ animationDelay: `${idx * 70}ms` }}
                  >
                    <Link href={l.href}>
                      <Button variant="ghost" size="sm" className="w-full justify-center rounded-xl">
                        {l.label}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [introDone, setIntroDone] = useState(false);
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
    { href: "/initiatives", label: "Initiatives" },
    { href: "/rates", label: "Rates" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };


  return (
    <motion.header 
      initial={false}
      animate={{ backgroundColor: introDone ? (isScrolled ? "white" : "rgba(255,255,255,1)") : "white" }}
      transition={{ duration: 0.4, ease: easeOut }}
      ref={headerRef} 
      className="sticky top-0 z-50 backdrop-blur-md border-b border-b-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: logo left, CTA right, with centered glass nav on lg+ */}
        <div className="relative flex items-center justify-between gap-3 py-2 min-h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 -ml-2 px-2 py-1 rounded-md flex-shrink-0">
            <div className="h-12 w-auto flex items-center overflow-hidden flex-shrink-0">
              <img src="/favicon.webp" alt="logo" className="h-8 w-8 object-contain"/>
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground flex-shrink-0">The Kabadi</span>
          </Link>

          {/* Center interactive center area (md+): intro links -> curtain hide -> two-bar hamburger */}
          <InteractiveCenter onIntroEnd={() => setIntroDone(true)} />

          {/* Right CTA (visible from md up), fallback to menu in mobile) */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <Link href="/request-pickup">
              <Button className="shadow-sm" data-testid="button-request-pickup">
                <Leaf className="h-4 w-4" />
                Request Pickup
              </Button>
            </Link>
          </div>

          {/* Mobile/Tablet menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
                aria-label="Open menu"
                data-testid="button-mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gradient-to-b from-white/95 to-green-50/90 dark:from-slate-900/95 dark:to-green-900/20 border-l border-primary/20 min-h-dvh md:min-h-[100dvh] flex flex-col [--radix-dialog-content-padding:1rem]">
              <motion.div 
                className="flex items-center gap-2 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              >
                <motion.div 
                  className="h-10 w-10 flex items-center overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <img src="/favicon.webp" alt="logo" className="h-8 w-8 object-contain" />
                </motion.div>
                <motion.span 
                  className="text-xl font-bold"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 }}
                >
                  The Kabadi
                </motion.span>
              </motion.div>

              <motion.nav 
                className="flex flex-col gap-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.3
                    }
                  }
                }}
              >
                <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
                  <MobileLink href="/" icon={<Home className='h-4 w-4' />} onClick={() => setMobileMenuOpen(false)} active={isActive("/")}>Home</MobileLink>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
                  <MobileLink href="/services" icon={<Recycle className='h-4 w-4' />} onClick={() => setMobileMenuOpen(false)} active={isActive("/services")}>
                    Services
                  </MobileLink>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
                  <MobileLink href="/initiatives" icon={<HeartHandshake className='h-4 w-4' />} onClick={() => setMobileMenuOpen(false)} active={isActive("/initiatives")}>Initiatives</MobileLink>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
                  <MobileLink href="/rates" icon={<IndianRupee className='h-4 w-4' />} onClick={() => setMobileMenuOpen(false)} active={isActive("/rates")}>Rates</MobileLink>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
                  <MobileLink href="/contact" icon={<Phone className='h-4 w-4' />} onClick={() => setMobileMenuOpen(false)} active={isActive("/contact")}>Contact</MobileLink>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
                  <MobileLink href="/careers" icon={<Briefcase className='h-4 w-4' />} onClick={() => setMobileMenuOpen(false)} active={isActive("/careers")}>Careers</MobileLink>
                </motion.div>
              </motion.nav>

              <motion.div 
                className="mt-2 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
              >
                <p className="text-sm text-muted-foreground mb-3">Sell your scrap at fair rates from the comfort of your home.</p>
                <Link href="/request-pickup">
                  <Button className="w-full">Request Pickup</Button>
                </Link>
              </motion.div>

              <motion.div 
                className="mt-2 grid grid-cols-2 gap-3 text-xs text-muted-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-green-100 via-green-50 to-emerald-50 dark:from-green-900/40 dark:via-green-800/30 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-600/30 shadow-sm flex items-center justify-between">
                  <span className="font-medium">Eco-friendly</span>
                  <div className="bg-green-600 rounded-full p-0.5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-50 dark:from-blue-900/40 dark:via-blue-800/30 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-600/30 shadow-sm flex items-center justify-between">
                  <span className="font-medium">Best rates</span>
                  <div className="bg-blue-600 rounded-full p-0.5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-100 via-purple-50 to-violet-50 dark:from-purple-900/40 dark:via-purple-800/30 dark:to-violet-900/20 border border-purple-200/50 dark:border-purple-600/30 shadow-sm flex items-center justify-between">
                  <span className="font-medium">Trusted service</span>
                  <div className="bg-purple-600 rounded-full p-0.5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 dark:from-orange-900/40 dark:via-orange-800/30 dark:to-amber-900/20 border border-orange-200/50 dark:border-orange-600/30 shadow-sm flex items-center justify-between">
                  <span className="font-medium">Quick pickup</span>
                  <div className="bg-orange-600 rounded-full p-0.5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>

          {/* MD-only scrollable pill nav */}
          {/* <div className="hidden md:block lg:hidden py-2">
            <div className="-mx-4 px-4 overflow-x-auto">
              <div className="flex gap-2 min-w-max  pr-4 [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]">
                {navLinks.map((link) => (
                  <Link key={`md-${link.href}`} href={link.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`rounded-full px-4 py-1 border ${
                        isActive(link.href)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-white/70 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 border-white/40 dark:border-white/10 hover:bg-white/90 dark:hover:bg-slate-800/70"
                      }`}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div> */}

      </div>
    </motion.header>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface WhyChooseKabadiProps {
  className?: string;
}

const leftVariants = { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } } as const;
const rightVariants = { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0 } } as const;
const listContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } } as const;
const listItem = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } } as const;

export default function WhyChooseKabadi({ className = "" }: WhyChooseKabadiProps) {
  return (
    <div className={`bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-2xl p-8 lg:p-12 border border-green-200/50 dark:border-green-800/50 ${className}`}>
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <motion.div variants={leftVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, ease: 'easeOut' }} >
          <h2 className="text-3xl lg:text-4xl font-bold text-kabadi-emphasis mb-4">
            Why Choose theKabadi?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Experience the difference with our premium scrap collection service that puts your needs first.
          </p>
          <motion.ul className="space-y-3" variants={listContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            <li className="flex items-start gap-3">
              <span className="text-kabadi-primary font-bold text-lg mt-0.5">✓</span>
              <span className="text-muted-foreground">Best prices updated daily with live market rates</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-kabadi-primary font-bold text-lg mt-0.5">✓</span>
              <span className="text-muted-foreground">Transparent pricing with no hidden charges</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-kabadi-primary font-bold text-lg mt-0.5">✓</span>
              <span className="text-muted-foreground">Free pickup from your location within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-kabadi-primary font-bold text-lg mt-0.5">✓</span>
              <span className="text-muted-foreground">Instant payment upon verification and weighing</span>
            </li>
          </motion.ul>
        </motion.div>
        <motion.div className="bg-white dark:bg-slate-900 w-full rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-800" variants={rightVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, ease: 'easeOut' }} >
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Sell?</h3>
          <p className="text-muted-foreground mb-6">
            Schedule a free pickup today and get paid the best rates in the market for your scrap materials.
          </p>
         {(() => {
           const isRequestPickup = typeof window !== 'undefined' && window.location.pathname === '/request-pickup';
           if (isRequestPickup) {
             return (
               <a
                 href="#pickup-form-top"
                 onClick={(e) => {
                   e.preventDefault();
                   const el = document.getElementById("pickup-form-top");
                   if (el) {
                     el.scrollIntoView({ behavior: "smooth", block: "start" });
                   } else {
                     window.scrollTo({ top: 0, behavior: "smooth" });
                   }
                 }}
                 className="group w-full [&_svg]:hover:animate-bounce flex items-center justify-center bg-kabadi-primary hover:bg-kabadi-emphasis text-white font-bold py-3 px-6 rounded-lg"
               >
                 <ArrowUp />
               </a>
             );
           }
           return (
             <button
               onClick={() => (window.location.href = "/request-pickup")}
               className="w-full bg-kabadi-primary hover:bg-kabadi-emphasis text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
               data-testid="button-schedule-pickup"
             >
               Schedule Free Pickup
             </button>
           );
         })()}
        </motion.div>
      </div>
    </div>
  );
}
import React from 'react';

interface WhyChooseKabadiProps {
  className?: string;
}

export default function WhyChooseKabadi({ className = "" }: WhyChooseKabadiProps) {
  return (
    <div className={`bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-2xl p-8 lg:p-12 border border-green-200/50 dark:border-green-800/50 ${className}`}>
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-kabadi-emphasis mb-4">
            Why Choose theKabadi?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Experience the difference with our premium scrap collection service that puts your needs first.
          </p>
          <ul className="space-y-3">
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
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Sell?</h3>
          <p className="text-muted-foreground mb-6">
            Schedule a free pickup today and get paid the best rates in the market for your scrap materials.
          </p>
          <button 
            onClick={() => window.location.href = "/request-pickup"}
            className="w-full bg-kabadi-primary hover:bg-kabadi-emphasis text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
            data-testid="button-schedule-pickup"
          >
            Schedule Free Pickup
          </button>
        </div>
      </div>
    </div>
  );
}
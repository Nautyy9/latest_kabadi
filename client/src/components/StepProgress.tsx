import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import LottieCircle from "@/components/LottieCircle";

export interface StepItem {
  number: number;
  title: string;
}

export default function StepProgress({ steps, currentStep, lottieMap }: { steps: StepItem[]; currentStep: number; lottieMap?: Record<number, any> }) {
  return (
    <div className="my-4 flex w-full ">
      <div className="flex items-center justify-center  w-full  relative ">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="grid grid-flow-col w-full justify-center  min-[960px]:w-fit h-full">
              {/* Step */}
              <div className="flex flex-col w-20 min-[700px]:w-28  min-[960px]:w-32 items-center">
                <div className="relative">
                  {/* Ripple while active */}
                  {isActive && lottieMap?.[step.number] ? (
                    <div className="absolute -inset-2 pointer-events-none">
                      <LottieCircle animationData={lottieMap[step.number]} playing size={56} />
                    </div>
                  ) : isActive ? (
                    <motion.div
                      aria-hidden
                      className="absolute -inset-2 rounded-full ring-2 ring-green-500/70 pointer-events-none"
                      initial={{ opacity: 0.6, scale: 0.95 }}
                      animate={{ opacity: [0.6, 0.2, 0.6], scale: [0.95, 1.1, 0.95] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : null}

                  {/* Step circle */}
                  <div
                    className={cn(
                      "relative w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-lg bg-white dark:bg-slate-900",
                      isCompleted && "ring-2 ring-green-500/50 text-green-600 dark:text-green-400",
                      isActive && "ring-2 ring-green-600 text-green-700 dark:text-green-300",
                      !isActive && !isCompleted && "border-2 border-slate-300 dark:border-slate-600 text-slate-400"
                    )}
                  >
                    {isCompleted ? <Check className="w-6 h-6" /> : step.number}
                  </div>
                </div>
                <div className="mt-4 text-center max-w-32">
                  <div className={cn("font-semibold text-sm mb-1 transition-colors duration-300", (isActive || isCompleted) ? "text-green-600 dark:text-green-400" : "text-slate-400")}>{step.title}</div>
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div 
                className={cn(
                  " mx-auto  w-16  min-[900px]:w-32  z-30 items-center  my-5 h-1 transition-colors duration-300 ",
                  isCompleted ? "bg-white" : "bg-slate-100"
                )
                
                }>
                  {/* Base line */}
                  {/* <div className="  rounded-full flex w-full  flex-1  z-10 h-1 " /> */}
                  {/* Animated fill (div width anim) */}
                  <motion.div
                    initial={false}
                    animate={{ width: isCompleted ? "100%" : "0%" , animationDirection : "reverse"}}
                    transition={{ duration: 0.6, ease: "easeOut" , }}
                    className="w-24  h-1 rounded-full bg-gradient-to-r from-green-600 to-sky-100 "
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

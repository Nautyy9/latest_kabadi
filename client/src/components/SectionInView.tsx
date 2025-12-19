import { motion, type Variants } from "framer-motion";
import { PropsWithChildren } from "react";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export type SectionInViewProps = PropsWithChildren<{
  className?: string;
  once?: boolean;
  amount?: number;
}>;

export default function SectionInView({ children, className, once = true, amount }: SectionInViewProps) {
  // Use responsive amount: lower threshold on mobile, higher on desktop
  const responsiveAmount = amount ?? (typeof window !== 'undefined' && window.innerWidth < 768 ? 0.1 : 0.3);
  
  return (
    <motion.div
      className={className}
      variants={defaultVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: responsiveAmount }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

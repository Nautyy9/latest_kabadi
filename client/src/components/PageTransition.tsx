import { motion, type Variants } from "framer-motion";
import { PropsWithChildren } from "react";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export type PageTransitionProps = PropsWithChildren<{
  className?: string;
  variants?: Variants;
}>;

export default function PageTransition({ children, className, variants = defaultVariants }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

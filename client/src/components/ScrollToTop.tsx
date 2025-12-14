import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  return null;
}

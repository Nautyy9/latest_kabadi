import { useLayoutEffect, useRef } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    // Always manage scroll manually for SPA routing
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // On initial mount, don't force scroll (stay where the browser is)
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    // If navigating to a hash on the same page, let browser handle it
    if (window.location.hash) return;

    // Immediately reset scroll BEFORE paint to avoid flashing previous position
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location]);

  return null;
}

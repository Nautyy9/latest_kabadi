import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Disable browser scroll restoration to prevent carrying scroll between routes
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Scroll to top on every route change (instant, no animation)
    const snapTop = () => {
      window.scrollTo(0, 0);
      // extra safety for some mobile browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Ensure it runs after the new route has rendered
    requestAnimationFrame(() => {
      snapTop();
      // Run twice to beat late layout shifts
      requestAnimationFrame(snapTop);
    });
  }, [location]);

  return null;
}

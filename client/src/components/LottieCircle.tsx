import React, { useEffect, useState } from "react";

interface LottieCircleProps {
  animationData: any;
  playing?: boolean;
  size?: number; // px
}

export default function LottieCircle({ animationData, playing = true, size = 56 }: LottieCircleProps) {
  const [Lottie, setLottie] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    let mounted = true;
    import("lottie-react")
      .then((mod) => {
        if (mounted) setLottie(() => mod.default || (mod as any));
      })
      .catch(() => {
        // lottie-react not installed; fail silently
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!Lottie) return null;

  return (
    <div style={{ width: size, height: size }} aria-hidden>
      <Lottie
        animationData={animationData}
        loop
        autoplay={playing}
        style={{ width: size, height: size }}
      />
    </div>
  );
}

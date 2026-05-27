import { useEffect, useRef } from "react";

export function FlareSVG({ className }: { className?: string }) {
  const seedRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      if (seedRef.current) {
        seedRef.current.setAttribute("seed", String((t * 0.3) % 200));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      className={className}
      preserveAspectRatio="none"
      viewBox="0 0 1000 1000"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="bandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22211F" />
          <stop offset="50%" stopColor="#22211F" />
          <stop offset="56%" stopColor="#3A0F05" />
          <stop offset="60%" stopColor="#7A1505" />
          <stop offset="63%" stopColor="#E8260F" />
          <stop offset="67%" stopColor="#FF6B1A" />
          <stop offset="72%" stopColor="#FFA94D" />
          <stop offset="78%" stopColor="#F5E8C8" />
          <stop offset="85%" stopColor="#F5F1E8" />
          <stop offset="100%" stopColor="#F5F1E8" />
        </linearGradient>

        <filter id="ridge" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            ref={seedRef}
            type="fractalNoise"
            baseFrequency="0.004 0.008"
            numOctaves="2"
            seed="0"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="220"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0.5 0"
          />
        </filter>
      </defs>

      <rect
        x="0"
        y="0"
        width="1000"
        height="1000"
        fill="url(#bandGrad)"
        filter="url(#ridge)"
      />

      <rect
        x="0"
        y="0"
        width="1000"
        height="1000"
        filter="url(#grain)"
        opacity="0.35"
        style={{ mixBlendMode: "overlay" }}
      />
    </svg>
  );
}

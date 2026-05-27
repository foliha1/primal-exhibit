import { useEffect, useState } from "react";

const SRC = "/exposure-flare-pingpong.mp4";

function useFlareSize() {
  const [size, setSize] = useState({ cssWidth: 0, cssHeight: 0 });
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (vw >= 768) {
        // Desktop/tablet: visual width = 100vw, visual height = 100vw * 16/9.
        // Rotation swaps axes, so CSS width = visual height, CSS height = visual width.
        setSize({ cssWidth: vw * (16 / 9), cssHeight: vw });
      } else {
        // Mobile: visual height = 120vh, scaled 1.6x so sides bleed past 100vw.
        const scale = 1.6;
        const visualH = vh * 1.2 * scale;
        const visualW = visualH * (9 / 16);
        setSize({ cssWidth: visualH, cssHeight: visualW });
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return size;
}


export function FlareVideo({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { cssWidth, cssHeight } = useFlareSize();

  return (
    <video
      muted
      playsInline
      autoPlay
      loop
      preload="auto"
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        objectFit: "cover",
        transformOrigin: "top left",
        transform: "rotate(90deg) translateY(-100%)",
        width: w ? `${w}px` : undefined,
        height: h ? `${h}px` : undefined,
        ...style,
      }}
    >
      <source src={SRC} type="video/mp4" />
    </video>
  );
}


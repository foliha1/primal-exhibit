import { useEffect, useRef, useState } from "react";

const SRC = "/exposure-flare-pingpong.mp4";

function useFlareSize() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Oversize generously; parent has overflow:hidden so excess is clipped.
      // 9:16 visual aspect (w:h) after rotation.
      const visualH = Math.max(vh, vw * 16 / 9) * 1.2;
      const visualW = visualH * 9 / 16;
      setSize({ w: visualH, h: visualW }); // CSS dims swap due to rotate(90deg)
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const { w, h } = useFlareSize();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const start = () => {
      video.playbackRate = 1;
      video.currentTime = 0;
      const p = video.play();
      if (p) p.catch(() => {});
    };

    if (video.readyState >= 1 && video.duration > 0) {
      start();
    } else {
      video.addEventListener("loadedmetadata", start, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", start);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
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


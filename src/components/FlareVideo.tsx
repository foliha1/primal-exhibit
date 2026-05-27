import { useEffect, useRef, useState } from "react";

const SRC = "/exposure-flare.mp4";

function useFlareSize() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // After rotate(90deg) + translateY(-100%) with origin top-left:
      //   visual_width  = CSS height
      //   visual_height = CSS width
      // We want visual_width >= vw AND visual_height >= vh, preserving 9:16 (visual w:h).
      const visualW = Math.max(vw, vh * 9 / 16);
      const visualH = Math.max(vh, visualW * 16 / 9);
      setSize({ w: visualH, h: visualW }); // CSS dims (swapped)
      console.log("[FlareVideo]", { vw, vh, cssW: visualH, cssH: visualW, visualW, visualH });
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

    let direction: "forward" | "reverse" = "forward";
    let rafId: number | null = null;
    let lastFrameTime = 0;
    let disposed = false;

    const stopRaf = () => {
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const reverseStep = (now: number) => {
      if (disposed) return;
      const deltaSec = (now - lastFrameTime) / 1000;
      lastFrameTime = now;
      const next = video.currentTime - deltaSec;
      if (next <= 0.05) {
        video.currentTime = 0;
        stopRaf();
        direction = "forward";
        video.playbackRate = 1;
        const p = video.play();
        if (p) p.catch(() => {});
        return;
      }
      video.currentTime = next;
      rafId = requestAnimationFrame(reverseStep);
    };

    const startReverse = () => {
      video.pause();
      direction = "reverse";
      lastFrameTime = performance.now();
      rafId = requestAnimationFrame(reverseStep);
    };

    const onTimeUpdate = () => {
      if (direction !== "forward") return;
      const d = video.duration;
      if (!isFinite(d) || d <= 0) return;
      if (video.currentTime >= d - 0.05) {
        startReverse();
      }
    };

    const start = () => {
      video.playbackRate = 1;
      video.currentTime = 0;
      const p = video.play();
      if (p) p.catch(() => {});
    };

    video.addEventListener("timeupdate", onTimeUpdate);

    if (video.readyState >= 1 && video.duration > 0) {
      start();
    } else {
      video.addEventListener("loadedmetadata", start, { once: true });
    }

    setTimeout(() => {
      if (videoRef.current) {
        const r = videoRef.current.getBoundingClientRect();
        const cs = getComputedStyle(videoRef.current);
        console.log("[FlareVideo rect]", { x: r.x, y: r.y, w: r.width, h: r.height, cssW: cs.width, cssH: cs.height, transform: cs.transform, transformOrigin: cs.transformOrigin });
      }
    }, 800);

    return () => {
      disposed = true;
      stopRaf();
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", start);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
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


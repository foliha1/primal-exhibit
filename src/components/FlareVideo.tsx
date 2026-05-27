import { useEffect, useRef } from "react";

const SRC = "/exposure-flare.mp4";

export function FlareVideo({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
      style={style}
    >
      <source src={SRC} type="video/mp4" />
    </video>
  );
}

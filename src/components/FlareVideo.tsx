import { useEffect, useRef } from "react";

const PRELOAD_LEAD_MS = 2000;
const SRC = "/exposure-flare.mp4";

export function FlareVideo({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    const videos = [a, b];
    let activeIdx = 0;
    const timers: number[] = [];
    let disposed = false;

    // Both videos fully opaque, always. Stacking handled by z-index.
    a.style.opacity = "1";
    b.style.opacity = "1";
    a.style.zIndex = "2";
    b.style.zIndex = "1";
    b.pause();
    b.currentTime = 0;

    const scheduleHandoff = (current: HTMLVideoElement) => {
      const duration = current.duration;
      if (!isFinite(duration) || duration <= 0) return;
      const remaining = (duration - current.currentTime) * 1000;
      const fireIn = Math.max(0, remaining - PRELOAD_LEAD_MS);

      const timer = window.setTimeout(() => {
        if (disposed) return;
        const incoming = videos[1 - activeIdx];
        const outgoing = videos[activeIdx];

        incoming.currentTime = 0;

        const onPlaying = () => {
          if (disposed) return;
          // Swap z-index so incoming sits on top. Since both videos show the
          // same content from t=0, this is visually seamless.
          incoming.style.zIndex = "2";
          outgoing.style.zIndex = "1";

          // After incoming has clearly taken over, reset the outgoing video.
          const resetTimer = window.setTimeout(() => {
            if (disposed) return;
            outgoing.pause();
            outgoing.currentTime = 0;
            activeIdx = 1 - activeIdx;
            scheduleHandoff(incoming);
          }, 200);
          timers.push(resetTimer);
        };

        incoming.addEventListener("playing", onPlaying, { once: true });

        const playPromise = incoming.play();
        if (playPromise) playPromise.catch(() => {});
      }, fireIn);
      timers.push(timer);
    };

    const onMetaA = () => {
      const playPromise = a.play();
      if (playPromise) playPromise.catch(() => {});
      scheduleHandoff(a);
    };

    if (a.readyState >= 1 && a.duration > 0) {
      onMetaA();
    } else {
      a.addEventListener("loadedmetadata", onMetaA, { once: true });
    }

    return () => {
      disposed = true;
      timers.forEach((t) => clearTimeout(t));
      a.removeEventListener("loadedmetadata", onMetaA);
    };
  }, []);

  const videoProps = {
    muted: true,
    playsInline: true,
    preload: "auto" as const,
    "aria-hidden": true,
    className,
    style,
  };

  return (
    <>
      <video ref={videoARef} {...videoProps}>
        <source src={SRC} type="video/mp4" />
      </video>
      <video ref={videoBRef} {...videoProps}>
        <source src={SRC} type="video/mp4" />
      </video>
    </>
  );
}

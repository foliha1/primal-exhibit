import { useEffect, useRef } from "react";

const CROSSFADE_MS = 1200;
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
    const rafs: number[] = [];
    let disposed = false;

    // Initial state
    a.style.opacity = "1";
    b.style.opacity = "0";
    b.pause();
    b.currentTime = 0;

    const tweenOpacity = (
      el: HTMLVideoElement,
      from: number,
      to: number,
      durationMs: number,
    ) => {
      const start = performance.now();
      const step = (now: number) => {
        if (disposed) return;
        const t = Math.min(1, (now - start) / durationMs);
        // ease-in-out cubic
        const eased =
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        el.style.opacity = String(from + (to - from) * eased);
        if (t < 1) {
          rafs.push(requestAnimationFrame(step));
        }
      };
      rafs.push(requestAnimationFrame(step));
    };

    const scheduleHandoff = (current: HTMLVideoElement) => {
      const duration = current.duration;
      if (!isFinite(duration) || duration <= 0) return;
      const remaining = (duration - current.currentTime) * 1000;
      const fireIn = Math.max(0, remaining - CROSSFADE_MS);

      const timer = window.setTimeout(() => {
        if (disposed) return;
        const incoming = videos[1 - activeIdx];
        const outgoing = videos[activeIdx];

        incoming.currentTime = 0;
        const playPromise = incoming.play();
        if (playPromise) playPromise.catch(() => {});

        tweenOpacity(outgoing, 1, 0, CROSSFADE_MS);
        tweenOpacity(incoming, 0, 1, CROSSFADE_MS);

        // After crossfade completes, reset the outgoing video to standby.
        const resetTimer = window.setTimeout(() => {
          if (disposed) return;
          outgoing.pause();
          outgoing.currentTime = 0;
          outgoing.style.opacity = "0";
          activeIdx = 1 - activeIdx;
          scheduleHandoff(incoming);
        }, CROSSFADE_MS + 50);
        timers.push(resetTimer);
      }, fireIn);
      timers.push(timer);
    };

    const onMetaA = () => {
      // Start the loop once we know the duration.
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
      rafs.forEach((r) => cancelAnimationFrame(r));
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

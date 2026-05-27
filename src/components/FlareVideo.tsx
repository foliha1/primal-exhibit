import { useEffect, useRef } from "react";

const SRC = "/exposure-flare-square.mp4";

export function FlareVideo({
  className,
  style,
  onReady,
}: {
  className?: string;
  style?: React.CSSProperties;
  onReady?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => {
      onReady?.();
    };

    video.addEventListener("canplay", handleReady, { once: true });

    if (video.readyState >= 3) {
      handleReady();
    }

    return () => {
      video.removeEventListener("canplay", handleReady);
    };
  }, [onReady]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      autoPlay
      loop
      preload="auto"
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...style,
      }}
    >
      <source src={SRC} type="video/mp4" />
    </video>
  );
}

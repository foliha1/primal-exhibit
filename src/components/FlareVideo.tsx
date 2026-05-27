const SRC = "/exposure-flare-square.mp4";

export function FlareVideo({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
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

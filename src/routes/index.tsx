import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FlareVideo } from "@/components/FlareVideo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EXPOSURE by 29029" },
      {
        name: "description",
        content:
          "EXPOSURE by 29029 — a leadership crucible. Not a course. A confrontation with what you've been avoiding.",
      },
      { property: "og:title", content: "EXPOSURE by 29029" },
      {
        property: "og:description",
        content:
          "A leadership crucible. Not a course. A confrontation with what you've been avoiding.",
      },
    ],
  }),
  component: Index,
});

const spring = { type: "spring" as const, stiffness: 60, damping: 18, mass: 1 };

function Index() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Video flare — full-bleed beneath the centered type column */}
      <div
        aria-hidden
        className="pointer-events-none absolute opacity-60 md:opacity-100"
        style={{
          left: 0,
          top: "50%",
          width: "132vw",
          height: "132vh",
          transform: "translateY(-50%)",
        }}
      >
        <FlareVideo className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* Grain overlay — above video, below type */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Top lockup — centered at top */}
      <motion.img
        src="/logos/EXPOSURE_Lockup_Light.svg"
        alt="EXPOSURE by 29029"
        className="absolute left-1/2 z-10 -translate-x-1/2 w-[140px] md:w-[180px]"
        style={{ top: 48 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
      />

      {/* Type column — centered horizontally and vertically */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 text-center">
        <div className="flex w-full max-w-[640px] flex-col items-center">
          <motion.h1
            className="font-serif text-[44px] uppercase md:text-[88px]"
            style={{ fontWeight: 300, lineHeight: 1, letterSpacing: "0.02em", color: "#F5F1E8", textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.35)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.4 }}
          >
            Most teams would{" "}
            <motion.span
              style={{ display: "inline-block", transform: "skewX(-12deg)", fontWeight: 300, color: "#F5F1E8", textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.35)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.6 }}
            >
              never
            </motion.span>{" "}
            do this.
          </motion.h1>


          <motion.p
            className="mt-8 max-w-[480px] font-sans text-[16px] leading-[1.6]"
            style={{ fontWeight: 500, color: "rgba(245,241,232,0.72)", textShadow: "0 1px 16px rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 1.0 }}
          >
            EXPOSURE is a confrontation built for the people who decide. A
            deliberate encounter with the questions you've been outpacing.
            Discomfort, structured. Clarity, earned. The work begins where the
            performance ends.
          </motion.p>
        </div>
      </div>

      {/* Bottom triangle mark — centered at bottom */}
      <motion.img
        src="/logos/29029_Triangle.svg"
        alt="29029"
        className="absolute left-1/2 z-10 -translate-x-1/2 w-[24px] md:w-[32px]"
        style={{ bottom: 48 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.4, ease: "easeOut" }}
      />

    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

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
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* The warm flare — heat bleeding from the upper-right */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] -top-[25%] h-[120vmax] w-[120vmax]"
        initial={{ scale: 1, rotate: 0, opacity: 0 }}
        animate={{
          opacity: [0, 1, 1],
          scale: [1, 1.04, 1],
          rotate: [0, 1.2, 0],
        }}
        transition={{
          opacity: { duration: 2.4, ease: "easeOut", times: [0, 0.4, 1] },
          scale: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          },
          rotate: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          },
        }}
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 75% 20%, #E8260F 0%, #FF6B1A 18%, #FFA94D 38%, rgba(245,241,232,0.35) 55%, rgba(10,10,10,0) 78%)",
          filter: "blur(40px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Secondary heat core for depth */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[5%] top-[-5%] h-[55vmax] w-[55vmax]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.6, 0.7] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.3, 0.65, 1],
        }}
        style={{
          background:
            "radial-gradient(circle at 70% 25%, #E8260F 0%, rgba(232,38,15,0.4) 30%, rgba(10,10,10,0) 65%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Vignette to anchor the dark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 30% 80%, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0) 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[640px] flex-col items-center text-center">
        <motion.h1
          className="font-serif text-[44px] leading-[1.04] tracking-[-0.02em] md:text-[88px]"
          style={{ color: "#F5F1E8" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.4 }}
        >
          What you{" "}
          <motion.em
            className="italic"
            style={{ fontStyle: "italic", color: "#F5F1E8" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.6 }}
          >
            avoid
          </motion.em>{" "}
          runs you.
        </motion.h1>

        <motion.p
          className="mt-8 max-w-[480px] font-sans text-[16px] font-light leading-[1.6]"
          style={{ color: "rgba(245,241,232,0.72)" }}
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

      {/* Logo lockup — bottom */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.4, ease: "easeOut" }}
      >
        <div
          className="font-sans text-[13px] font-medium uppercase tracking-[0.42em]"
          style={{ color: "#F5F1E8" }}
        >
          Exposure
        </div>
        <div
          className="mt-1.5 font-sans text-[9px] font-normal uppercase tracking-[0.52em]"
          style={{ color: "rgba(245,241,232,0.5)" }}
        >
          By 29029
        </div>
      </motion.div>
    </main>
  );
}

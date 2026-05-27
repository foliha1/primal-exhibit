import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FlareVideo } from "@/components/FlareVideo";
import { FlareSVG } from "@/components/FlareSVG";

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

const easeOut = [0.16, 1, 0.3, 1] as const;

function Index() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#22211F" }}
    >
      {/* SVG flare — banded gradient with organic displacement */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <FlareSVG />
      </div>

      {/* Video flare — rotated 90° CW, anchored to top of viewport */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-60 md:opacity-100"
        style={{ backgroundColor: "transparent" }}
      >
        <FlareVideo />
      </div>


      {/* Top lockup — centered at top */}
      <motion.div
        aria-label="EXPOSURE by 29029"
        role="img"
        className="absolute left-1/2 z-10 -translate-x-1/2 w-[140px] h-[60px] md:w-[180px] md:h-[76px]"
        style={{
          top: 48,
          backgroundColor: "#E7E6E1",
          WebkitMaskImage: "url(/logos/EXPOSURE_Lockup_Light.svg)",
          maskImage: "url(/logos/EXPOSURE_Lockup_Light.svg)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 3.2, ease: easeOut }}

      />


      {/* Type column — centered horizontally and vertically */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 text-center">
        <div className="flex w-full max-w-[640px] flex-col items-center">
          <h1
            className="font-serif text-[35px] uppercase md:text-[70px]"
            style={{ fontWeight: 300, lineHeight: 1, letterSpacing: "0.02em", color: "#E7E6E1", textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.35)" }}
          >

            <motion.span
              style={{ display: "block" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: easeOut }}
            >
              <span style={{ display: "block" }}>Most teams would</span>
              <span style={{ display: "block" }}>
                <em style={{ fontStyle: "italic" }}>Never</em> do this.
              </span>
            </motion.span>

          </h1>


          <motion.p
            className="mt-8 max-w-[480px] font-sans text-[18px]"
            style={{
              fontWeight: 500,
              color: "#E7E6E1",
              textShadow: "0 1px 16px rgba(0,0,0,0.5)",
              lineHeight: 1.6,
              letterSpacing: "0.03em",

            }}

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.8, ease: easeOut }}
          >
            Some moments don't build a team. They reveal one. By the time most
            leaders see what they're working with, the moment has already passed
            its verdict. EXPOSURE puts that revelation on your calendar, on your
            terms, before the stakes choose the timing for you.
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
        transition={{ duration: 1.0, delay: 3.6, ease: easeOut }}
      />

    </main>
  );
}

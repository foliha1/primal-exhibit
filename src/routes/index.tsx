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

const easeOut = [0.16, 1, 0.3, 1] as const;
const easePush = [0.36, 0.01, 0.39, 1] as const;

function Index() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#22211F" }}
    >
      {/* Video flare — rotated 90° CW, anchored to top of viewport */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <FlareVideo />
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
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-[60px] md:px-[72px] lg:px-6 text-center">
        <div className="flex w-full max-w-[900px] flex-col items-center">
          <h1
            className="font-serif text-[35px] uppercase md:text-[70px]"
            style={{ fontWeight: 300, lineHeight: 1, letterSpacing: "0.02em", color: "#E7E6E1", textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.35)" }}
          >

            <motion.span
              style={{ display: "block" }}
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, delay: 0.4, ease: easeOut }}
            >
              <span style={{ display: "block", whiteSpace: "nowrap" }}>Most teams would</span>
              <span style={{ display: "block", whiteSpace: "nowrap" }}>
                <em style={{ fontStyle: "italic" }}>Never</em> do this.
              </span>
            </motion.span>

          </h1>


          <motion.p
            className="mt-8 max-w-[560px] font-sans text-[16px]"
            style={{
              fontWeight: 500,
              color: "#E7E6E1",
              textShadow: "0 1px 16px rgba(0,0,0,0.5)",
              lineHeight: 1.6,
              letterSpacing: "0.03em",
              whiteSpace: "pre-line",
            }}

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 2.2, ease: easeOut }}
          >
            {`Some moments don't build a team. They reveal one.\n\n\nBy the time most leaders see what they're working with, the moment has already passed its verdict. EXPOSURE puts that revelation on your calendar, on your terms, before the stakes choose the timing for you.`}
          </motion.p>
        </div>
      </div>

      {/* Bottom triangle mark — centered at bottom */}
      <motion.div
        aria-label="29029"
        role="img"
        className="absolute left-1/2 z-10 -translate-x-1/2 w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
        style={{
          bottom: 48,
          backgroundColor: "#E7E6E1",
          WebkitMaskImage: "url(/logos/29029_Triangle.svg)",
          maskImage: "url(/logos/29029_Triangle.svg)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 3.6, ease: easeOut }}
      />

    </main>
  );
}

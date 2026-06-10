import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
const easePush = [0.71, 0.02, 0.29, 0.88] as const;

function Index() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [headlineOffset, setHeadlineOffset] = useState<number | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useLayoutEffect(() => {
    const compute = () => {
      if (bodyRef.current) {
        const bodyHeight = bodyRef.current.offsetHeight;
        setHeadlineOffset((bodyHeight + 32) / 2);
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setVideoReady(true), 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#22211F" }}
    >
      {/* Video flare — rotated 90° CW, anchored to top of viewport */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <FlareVideo onReady={() => setVideoReady(true)} />
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
        animate={videoReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2.0, delay: 3.25, ease: easeOut }}

      />


      {/* Type column — centered horizontally and vertically */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-12 sm:px-16 md:px-20 lg:px-6 text-center">
        <div className="flex w-full max-w-[900px] flex-col items-center">
          <h1
            className="font-serif text-[35px] uppercase md:text-[70px]"
            style={{ fontWeight: 300, lineHeight: 1, letterSpacing: "0.02em", color: "#E7E6E1", textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.35)" }}
          >

            {headlineOffset !== null && (
              <motion.span
                style={{ display: "block" }}
                initial={{ opacity: 0, filter: "blur(20px)", y: headlineOffset }}
                animate={videoReady ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(20px)", y: headlineOffset }}
                transition={{
                  opacity: { duration: 2.0, delay: 0.1, ease: easeOut },
                  filter: { duration: 2.0, delay: 0.1, ease: easeOut },
                  y: { duration: 1.5, delay: 2.5, ease: easePush },
                }}
              >
                <span style={{ display: "block" }}>Most teams would</span>
                <span style={{ display: "block" }}>
                  <em style={{ fontStyle: "italic" }}>Never</em> do this.
                </span>
              </motion.span>
            )}

          </h1>


          <div ref={bodyRef} className="flex flex-col items-center w-full">
            <motion.p
              className="mt-8 max-w-[560px] font-sans text-[14px] md:text-[16px]"
              style={{
                fontWeight: 500,
                color: "#E7E6E1",
                textShadow: "0 1px 16px rgba(0,0,0,0.5)",
                lineHeight: 1.6,
                letterSpacing: "0.03em",
                whiteSpace: "pre-line",
              }}
              initial={{ opacity: 0 }}
              animate={videoReady ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 2.0, delay: 3.25, ease: easeOut }}
            >
              {`EXPOSURE takes your team to the edge and brings them back transformed.\n\nThis is where teams find out what they're actually made of.`}
            </motion.p>

            <motion.div
              aria-hidden
              className="mt-10 md:mt-12"
              style={{ width: 64, height: 1, backgroundColor: "#E7E6E1", opacity: 0.7 }}
              initial={{ opacity: 0 }}
              animate={videoReady ? { opacity: 0.7 } : { opacity: 0 }}
              transition={{ duration: 2.0, delay: 3.25, ease: easeOut }}
            />

            <motion.p
              className="mt-6 md:mt-8 font-serif uppercase text-[24px] md:text-[32px]"
              style={{
                fontWeight: 300,
                color: "#E7E6E1",
                lineHeight: 1.1,
                letterSpacing: "0.02em",
                textShadow: "0 1px 16px rgba(0,0,0,0.5)",
              }}
              initial={{ opacity: 0 }}
              animate={videoReady ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 2.0, delay: 4.0, ease: easeOut }}
            >
              Coming <em style={{ fontStyle: "italic" }}>Soon</em>
            </motion.p>

            <motion.a
              href="mailto:lisabarnes@29029.co?subject=Tell%20me%20about%20Exposure"
              aria-label="Tell me more about EXPOSURE"
              className="group mt-3 md:mt-4 inline-flex items-center justify-center font-sans outline-none transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-[#FF3B2F] hover:shadow-[0_8px_24px_rgba(225,37,27,0.5)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E7E6E1] focus-visible:ring-offset-[#22211F]"
              style={{
                backgroundColor: "#E1251B",
                color: "#E7E6E1",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 24,
                paddingRight: 24,
                borderRadius: 3,
              }}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ y: 0, scale: 1 }}
              initial={{ opacity: 0 }}
              animate={videoReady ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 2.0, delay: 4.25, ease: easeOut }}
            >
              Tell Me More
            </motion.a>
          </div>
        </div>
      </div>


      <motion.div
        className="absolute left-1/2 z-10 -translate-x-1/2 font-sans flex flex-col items-center md:flex-row md:whitespace-nowrap"
        style={{
          bottom: 112,
          color: "#E7E6E1",
          fontWeight: 500,
          fontSize: 12,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          textShadow: "0 1px 12px rgba(0,0,0,0.5)",
        }}
        initial={{ opacity: 0 }}
        animate={videoReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2.0, delay: 3.25, ease: easeOut }}
      >
        <span>Commit</span>
        <span className="hidden md:inline">&nbsp;&nbsp;•&nbsp;&nbsp;</span>
        <span>Prepare</span>
        <span className="hidden md:inline">&nbsp;&nbsp;•&nbsp;&nbsp;</span>
        <span>Endure</span>
        <span className="hidden md:inline">&nbsp;&nbsp;•&nbsp;&nbsp;</span>
        <span>Evolve</span>
      </motion.div>


      {/* Bottom triangle mark — centered at bottom */}
      <motion.div
        aria-label="29029"
        role="img"
        className="absolute left-1/2 z-10 -translate-x-1/2 w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
        style={{
          bottom: 48,
          backgroundColor: "#E1251B",
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
        animate={videoReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2.0, delay: 3.25, ease: easeOut }}
      />

    </main>
  );
}

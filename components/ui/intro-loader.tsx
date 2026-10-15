"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 2300;

    const timeout = window.setTimeout(() => setVisible(false), delay);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.classList.remove("intro-pending");
        document.documentElement.classList.add("intro-complete");
      }}
    >
      {visible && (
        <motion.div
          className="intro-loader"
          aria-label="Youssef Maged portfolio"
          role="status"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.58, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="intro-lockup" aria-hidden="true">
            <Image
              src="/images/ym-logo.webp"
              alt=""
              width={828}
              height={828}
              preload
              className="intro-logo-mark"
            />
            <span className="intro-rule" />
            <span className="intro-name">Youssef Maged Hanna</span>
            <span className="intro-caption">FULL STACK DEVELOPER</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

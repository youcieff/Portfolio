"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let delay = 2180;
    try {
      if (
        sessionStorage.getItem("portfolio-intro-seen") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        delay = 0;
      } else {
        sessionStorage.setItem("portfolio-intro-seen", "1");
      }
    } catch {
      delay = 0;
    }

    const timeout = window.setTimeout(() => setVisible(false), delay);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-loader"
          aria-label="Youssef Maged portfolio"
          role="status"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.58, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="intro-lockup" aria-hidden="true">
            <span className="intro-monogram">
              <i>Y</i>
              <i>M</i>
              <b>.</b>
            </span>
            <span className="intro-rule" />
            <span className="intro-caption">FULL STACK DEVELOPER</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

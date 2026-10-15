"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 2200;

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
          exit={{ y: "-100%", transition: { duration: 0.44, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="intro-lockup" aria-hidden="true">
            <span className="intro-logo-stage">
              <Image
                src="/images/logo-light.webp"
                alt=""
                width={720}
                height={720}
                className="intro-logo-mark theme-logo-light"
              />
              <Image
                src="/images/logo-dark.webp"
                alt=""
                width={720}
                height={720}
                loading="eager"
                className="intro-logo-mark theme-logo-dark"
              />
            </span>
            <span className="intro-rule" />
            <span className="intro-name">Youssef Maged Hanna</span>
            <span className="intro-caption">FULL STACK DEVELOPER</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

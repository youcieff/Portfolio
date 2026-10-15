"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useState, type ReactNode } from "react";

type RevealProps = Omit<HTMLMotionProps<"div">, "children" | "onViewportEnter" | "onViewportLeave"> & {
  children: ReactNode;
  delay?: number;
  distance?: number;
};

export function Reveal({ children, className, delay = 0, distance = 16, ...props }: RevealProps) {
  const [inView, setInView] = useState(false);

  return (
    <motion.div
      className={`motion-reveal${className ? ` ${className}` : ""}`}
      data-in-view={inView ? "true" : "false"}
      initial={{ opacity: 0, y: distance, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-6% 0px" }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      onViewportEnter={() => {
        setInView(true);
      }}
      onViewportLeave={() => setInView(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

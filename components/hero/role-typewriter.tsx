"use client";

import { useEffect, useState } from "react";

const roles = ["Full Stack Developer", "MERN Stack Expert", "AI Integrator", "Creative Coder"];

export function RoleTypewriter() {
  const [text, setText] = useState(roles[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let roleIndex = 0;
    let length = roles[0].length;
    let deleting = true;
    let timer = 0;

    const tick = () => {
      const role = roles[roleIndex];
      if (deleting) {
        length -= 1;
        setText(role.slice(0, length));
        if (length === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          timer = window.setTimeout(tick, 380);
          return;
        }
        timer = window.setTimeout(tick, 38);
        return;
      }

      const nextRole = roles[roleIndex];
      length += 1;
      setText(nextRole.slice(0, length));
      if (length === nextRole.length) {
        deleting = true;
        timer = window.setTimeout(tick, roleIndex === 0 ? 5200 : 3600);
        return;
      }
      timer = window.setTimeout(tick, 82);
    };

    timer = window.setTimeout(tick, 6500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <span className="hero-role-value" aria-hidden="true">
        {text}
        <i className="type-cursor" />
      </span>
      <span className="sr-only">
        Full Stack Developer, MERN Stack Expert, AI Integrator, Creative Coder
      </span>
    </>
  );
}

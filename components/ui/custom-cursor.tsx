"use client";

import { useEffect, useRef } from "react";

export function CustomCursor({ inDialog = false }: { inDialog?: boolean }) {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    const root = document.documentElement;
    const element = cursor.current;
    if (!element) return;
    if (!inDialog) root.classList.add("has-custom-cursor");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let cursorX = targetX;
    let cursorY = targetY;
    let trailX = targetX;
    let trailY = targetY;
    let frame = 0;

    const animate = () => {
      cursorX += (targetX - cursorX) * 0.18;
      cursorY += (targetY - cursorY) * 0.18;
      trailX += (cursorX - trailX) * 0.14;
      trailY += (cursorY - trailY) * 0.14;
      element.style.setProperty("--cursor-x", `${cursorX}px`);
      element.style.setProperty("--cursor-y", `${cursorY}px`);
      element.style.setProperty("--trail-x", `${trailX}px`);
      element.style.setProperty("--trail-y", `${trailY}px`);
      if (Math.abs(targetX - cursorX) + Math.abs(targetY - cursorY) > 0.15) {
        frame = requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };
    const positionAt = (clientX: number, clientY: number, target: EventTarget | null) => {
      const dialog = inDialog ? element.closest("dialog") : null;
      const bounds = dialog?.getBoundingClientRect();
      targetX = clientX - (bounds?.left ?? 0);
      targetY = clientY - (bounds?.top ?? 0);
      element.dataset.visible = "true";
      const targetElement = target instanceof Element ? target : null;
      element.dataset.hover = String(
        Boolean(
          targetElement?.closest("a, button, [role='button'], input, textarea, select, label"),
        ),
      );
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const move = (event: PointerEvent) => {
      root.dataset.pointerX = String(event.clientX);
      root.dataset.pointerY = String(event.clientY);
      positionAt(event.clientX, event.clientY, event.target);
    };
    const hide = () => {
      element.dataset.visible = "false";
      element.dataset.hover = "false";
    };
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    const updatePointer = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        if (!inDialog) root.classList.remove("has-custom-cursor");
        hide();
      } else {
        if (!inDialog) root.classList.add("has-custom-cursor");
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    finePointer.addEventListener("change", updatePointer);
    const dialog = inDialog ? element.closest("dialog") : null;
    const observer = dialog
      ? new MutationObserver(() => {
          if (!dialog.open) {
            hide();
            return;
          }
          const clientX = Number(root.dataset.pointerX);
          const clientY = Number(root.dataset.pointerY);
          if (Number.isFinite(clientX) && Number.isFinite(clientY)) {
            positionAt(clientX, clientY, document.elementFromPoint(clientX, clientY));
          }
        })
      : null;
    if (dialog && observer) {
      observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
      if (dialog.open) {
        requestAnimationFrame(() => {
          const clientX = Number(root.dataset.pointerX);
          const clientY = Number(root.dataset.pointerY);
          if (Number.isFinite(clientX) && Number.isFinite(clientY)) {
            positionAt(clientX, clientY, document.elementFromPoint(clientX, clientY));
          }
        });
      }
    }
    return () => {
      if (!inDialog) root.classList.remove("has-custom-cursor");
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", onPointerOut);
      finePointer.removeEventListener("change", updatePointer);
      observer?.disconnect();
    };
  }, [inDialog]);

  return (
    <div
      className={`custom-cursor${inDialog ? " dialog-cursor" : ""}`}
      ref={cursor}
      data-visible="false"
      aria-hidden="true"
    >
      <span className="custom-cursor-orb" />
      <span className="custom-cursor-trail" />
    </div>
  );
}

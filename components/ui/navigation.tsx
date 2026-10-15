"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/data/site";
import { ThemeToggle } from "@/components/ui/theme-control";

export function Navigation() {
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileSheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = navigation
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-28% 0px -62% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = menuButton.current;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      mobileSheet.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [];
    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      if (event.shiftKey && document.activeElement === items[0]) {
        event.preventDefault();
        items[items.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === items[items.length - 1]) {
        event.preventDefault();
        items[0].focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="site-header shell" data-scrolled={scrolled}>
        <div className="nav-wrap">
          <a className="nav-brand" href="#hero" aria-label={`${site.name}, home`}>
            YM<span>.</span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            {navigation.map(({ label, href }) => (
              <a
                className="nav-link"
                href={href}
                key={href}
                aria-current={active === href.slice(1) ? "location" : undefined}
              >
                {label}
                {active === href.slice(1) && (
                  <motion.i className="nav-indicator" layoutId="nav-indicator" aria-hidden="true" />
                )}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="button button-primary nav-cta" href="#contact">
              Let&apos;s talk <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button
              ref={menuButton}
              className="menu-toggle"
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -40 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 40 }}
                  transition={{ duration: 0.16 }}
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>
      <div
        ref={mobileSheet}
        className="mobile-sheet"
        data-open={open}
        id="mobile-navigation"
        aria-hidden={!open}
        onClick={(event) => event.target === event.currentTarget && setOpen(false)}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map(({ label, href }) => (
            <a className="nav-link" href={href} key={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

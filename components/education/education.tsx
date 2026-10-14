"use client";

import Image from "next/image";
import { GraduationCap, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { education } from "@/data/education";
import { certification } from "@/data/certifications";

export function Education() {
  const dialog = useRef<HTMLDialogElement>(null);
  const open = () => dialog.current?.showModal();
  const close = () => dialog.current?.close();
  useEffect(() => {
    const element = dialog.current;
    const onBackdrop = (event: MouseEvent) => {
      if (event.target === element) close();
    };
    element?.addEventListener("click", onBackdrop);
    return () => element?.removeEventListener("click", onBackdrop);
  }, []);
  return (
    <section className="section shell" id="education" aria-labelledby="education-title">
      <div className="section-heading">
        <span className="eyebrow">Education</span>
        <div>
          <h2 className="section-title" id="education-title">
            The foundation.
          </h2>
          <p className="section-intro">Formal study and a practical full stack foundation.</p>
        </div>
      </div>
      <div className="education-grid">
        <Reveal className="education-card">
          <GraduationCap size={22} className="education-icon" aria-hidden="true" />
          <h3>{education.degree}</h3>
          <p>{education.school}</p>
          <p>{education.program}</p>
          <span className="resume-meta">{education.period}</span>
          <div className="dialog-block">
            <h3>Graduation project</h3>
            <p>{education.graduationProject}</p>
          </div>
        </Reveal>
        <Reveal className="certificate-card" delay={0.08}>
          <button
            className="certificate-open"
            type="button"
            aria-label="Open full certificate image"
            onClick={open}
          >
            <Image
              src={certification.thumbnail}
              width={800}
              height={566}
              alt="Kimmit Academy Full Stack Web Development certificate preview"
              sizes="(max-width: 760px) 90vw, 40vw"
            />
          </button>
          <span className="eyebrow">Certification · {certification.date}</span>
          <h3>{certification.title}</h3>
          <p>{certification.issuer}</p>
          <div className="topic-list">
            {certification.topics.map((topic) => (
              <span className="project-tag" key={topic}>
                {topic}
              </span>
            ))}
          </div>
          <button className="text-link" type="button" onClick={open} style={{ marginTop: "1rem" }}>
            View certificate <span aria-hidden="true">↗</span>
          </button>
        </Reveal>
      </div>
      <dialog
        className="project-dialog certificate-dialog"
        ref={dialog}
        aria-label="Certificate image"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
      >
        <button
          className="dialog-close"
          type="button"
          aria-label="Close certificate"
          onClick={close}
        >
          <X size={20} />
        </button>
        <Image
          src={certification.image}
          width={certification.width}
          height={certification.height}
          alt="Full Stack Web Development — MERN Stack certificate from Kimmit Academy"
          sizes="95vw"
          priority
        />
      </dialog>
    </section>
  );
}

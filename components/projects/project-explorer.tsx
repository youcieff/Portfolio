"use client";

import Image from "next/image";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, RotateCw, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Reveal } from "@/components/ui/reveal";

const filters = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "full-stack" },
  { label: "AI", value: "ai" },
  { label: "Frontend", value: "frontend" },
  { label: "Games", value: "games" },
  { label: "E-commerce", value: "e-commerce" },
];

function BrowserFrame({ project, priority = false }: { project: Project; priority?: boolean }) {
  const image = project.images[0];
  return (
    <div className={`project-media ${project.frame}`}>
      <div className={`project-media-inner ${project.frame}`}>
        {project.frame === "browser" && <BrowserChrome />}
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          unoptimized
          sizes={
            project.frame === "phone"
              ? "(max-width: 760px) 45vw, 20vw"
              : "(max-width: 760px) 90vw, 48vw"
          }
          priority={priority}
        />
      </div>
    </div>
  );
}

function BrowserChrome() {
  return (
    <div className="browser-bar" aria-hidden="true">
      <i className="browser-dot" />
      <i className="browser-dot" />
      <i className="browser-dot" />
      <i className="browser-address" />
      <span>PROJECT PREVIEW</span>
    </div>
  );
}

function VideoShowcase({
  videoId,
  title,
  onOpen,
}: {
  videoId: string;
  title: string;
  onOpen: () => void;
}) {
  return (
    <button
      className="video-preview"
      type="button"
      onClick={onOpen}
      aria-label={`Play ${title} demo video`}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(max-width: 760px) 90vw, 45vw"
        unoptimized
      />
      <span className="video-play">
        <Play size={22} fill="currentColor" aria-hidden="true" />
      </span>
      <span className="sr-only">Play demo</span>
    </button>
  );
}

function VideoModal({
  videoId,
  title,
  onClose,
}: {
  videoId: string;
  title: string;
  onClose: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const isPresent = useIsPresent();
  const overlayRef = useRef<HTMLDialogElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = () => onClose();
  useEffect(() => {
    const dialog = overlayRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);
  useEffect(() => {
    if (loaded || failed || !isPresent) return;
    const timeout = window.setTimeout(() => setFailed(true), 15000);
    return () => window.clearTimeout(timeout);
  }, [failed, isPresent, loaded, attempt]);
  const retry = () => {
    setFailed(false);
    setLoaded(false);
    setAttempt((current) => current + 1);
  };
  useEffect(() => closeRef.current?.focus(), []);
  return (
    <motion.dialog
      ref={overlayRef}
      className="video-overlay"
      aria-label={`${title} demo video`}
      onMouseDown={(event) => event.target === event.currentTarget && close()}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={modalRef}
        className="video-modal"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            close();
            return;
          }
          if (event.key !== "Tab") return;
          const items = modalRef.current?.querySelectorAll<HTMLElement>("button, iframe");
          if (!items?.length) return;
          const first = items[0];
          const last = items[items.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.22 }}
      >
        <div className="video-modal-header">
          <span>Project showcase</span>
          <strong>{title}</strong>
        </div>
        <button
          className="video-close"
          type="button"
          aria-label="Close video"
          ref={closeRef}
          onClick={close}
        >
          <X size={19} />
        </button>
        <div className="video-frame">
          {!loaded && !failed && (
            <div className="video-loading" role="status" aria-label="Loading video">
              <span className="video-spinner" />
              <span>Preparing your video</span>
            </div>
          )}
          {failed && (
            <div className="video-error" role="alert">
              <span>Video couldn’t be loaded.</span>
              <button className="video-retry" type="button" onClick={retry}>
                <RotateCw size={15} /> Try again
              </button>
            </div>
          )}
          {isPresent && !failed && (
            <iframe
              key={attempt}
              title={`${title} project demo`}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&fs=1`}
              loading="eager"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              referrerPolicy="origin"
              allowFullScreen
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          )}
        </div>
      </motion.div>
    </motion.dialog>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const touchStart = useRef<number | null>(null);
  const move = useCallback(
    (step: number) => {
      if (!project) return;
      setActiveImage((current) => (current + step + project.images.length) % project.images.length);
    },
    [project],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    else if (!project && dialog.open) dialog.close();
  }, [project]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const handleClose = () => onClose();
    dialog?.addEventListener("close", handleClose);
    return () => dialog?.removeEventListener("close", handleClose);
  }, [onClose]);

  useEffect(() => {
    if (!project) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") move(1);
      if (event.key === "ArrowRight") move(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [move, project]);

  return (
    <>
      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          if (videoOpen) setVideoOpen(false);
          else onClose();
        }}
        onClick={(event) => event.target === event.currentTarget && onClose()}
      >
        {project && <CustomCursor inDialog />}
        {project && (
          <>
            <button
              className="dialog-close"
              type="button"
              aria-label="Close project details"
              onClick={onClose}
            >
              <X size={20} />
            </button>
            <div className="dialog-layout">
              <motion.div
                className="dialog-gallery"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.42, delay: 0.05 }}
              >
                <div
                  className={`gallery-stage ${project.frame}`}
                  onTouchStart={(event) => {
                    touchStart.current = event.touches[0]?.clientX ?? null;
                  }}
                  onTouchEnd={(event) => {
                    if (touchStart.current === null) return;
                    const delta = event.changedTouches[0]?.clientX - touchStart.current;
                    if (delta > 45) move(-1);
                    if (delta < -45) move(1);
                    touchStart.current = null;
                  }}
                >
                  {project.frame === "browser" && <BrowserChrome />}
                  <Image
                    key={project.images[activeImage].src}
                    src={project.images[activeImage].src}
                    width={project.images[activeImage].width}
                    height={project.images[activeImage].height}
                    alt={project.images[activeImage].alt}
                    sizes="(max-width: 760px) 94vw, 65vw"
                    priority
                  />
                  {project.images.length > 1 && (
                    <>
                      <button
                        className="gallery-nav gallery-prev"
                        type="button"
                        aria-label="Previous image"
                        onClick={() => move(-1)}
                      >
                        <ArrowLeft size={18} />
                      </button>
                      <button
                        className="gallery-nav gallery-next"
                        type="button"
                        aria-label="Next image"
                        onClick={() => move(1)}
                      >
                        <ArrowRight size={18} />
                      </button>
                      <span className="gallery-count" aria-live="polite">
                        {activeImage + 1} / {project.images.length}
                      </span>
                    </>
                  )}
                </div>
                <div className="gallery-thumbs" aria-label="Project screenshots">
                  {project.images.map((image, index) => (
                    <button
                      className="gallery-thumb"
                      type="button"
                      key={image.src}
                      aria-label={`Show screenshot ${index + 1}`}
                      aria-current={index === activeImage}
                      onClick={() => setActiveImage(index)}
                    >
                      <Image
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt=""
                        sizes="76px"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
              <motion.article
                className="dialog-copy"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.42, delay: 0.1 }}
              >
                <header className="dialog-project-head">
                  <span className="eyebrow">{project.badge}</span>
                  <h2 id="project-dialog-title">{project.title}</h2>
                  <p className="dialog-subtitle">{project.subtitle}</p>
                  <p className="dialog-overview">{project.overview}</p>
                </header>
                {project.demoVideoId && (
                  <VideoShowcase
                    videoId={project.demoVideoId}
                    title={project.title}
                    onOpen={() => setVideoOpen(true)}
                  />
                )}
                <div className="dialog-block">
                  <h3>Highlights</h3>
                  <ul>
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="dialog-block">
                  <h3>Built with</h3>
                  <div className="project-tags">
                    {project.stack.map((item) => (
                      <span className="project-tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="dialog-block">
                  <h3>Features</h3>
                  <ul>
                    {project.features.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.desc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dialog-links">
                  <a
                    className="button button-primary"
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live demo <ArrowUpRight size={15} />
                  </a>
                  <a className="button" href={project.github} target="_blank" rel="noreferrer">
                    Source code <ArrowUpRight size={15} />
                  </a>
                </div>
              </motion.article>
            </div>
          </>
        )}
      </dialog>
      <AnimatePresence>
        {videoOpen && project?.demoVideoId && (
          <VideoModal
            videoId={project.demoVideoId}
            title={project.title}
            onClose={() => {
              setVideoOpen(false);
              window.setTimeout(
                () => document.querySelector<HTMLButtonElement>(".video-preview")?.focus(),
                0,
              );
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export function ProjectExplorer() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = useMemo(
    () =>
      projects.filter((project) => {
        const matchesFilter = filter === "all" || project.tags.includes(filter);
        const searchable =
          `${project.title} ${project.subtitle} ${project.overview} ${project.stack.join(" ")}`.toLowerCase();
        return matchesFilter && searchable.includes(query.trim().toLowerCase());
      }),
    [filter, query],
  );
  const close = useCallback(() => setSelected(null), []);

  return (
    <section className="section shell" id="projects" aria-labelledby="projects-title">
      <Reveal className="section-heading">
        <span className="eyebrow">Selected work · 2025–26</span>
        <div>
          <h2 className="section-title" id="projects-title">
            Made to be useful.
          </h2>
          <p className="section-intro">
            A selection of products and experiments, built from first sketch to something people can
            use.
          </p>
        </div>
      </Reveal>
      <Reveal className="project-controls-reveal">
        <div className="project-toolbar">
          <div className="filter-list" role="group" aria-label="Filter projects">
            {filters.map(({ label, value }) => (
              <button
                key={value}
                className="filter-chip"
                type="button"
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <label>
            <span className="sr-only">Search projects</span>
            <input
              className="project-search"
              type="search"
              placeholder="Search work…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
        <p className="project-result-count" aria-live="polite">
          Showing {visible.length} of {projects.length} projects
        </p>
      </Reveal>
      <motion.div className="project-grid" layout>
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <motion.article
              className={`project-card${index === 0 && filter === "all" && !query ? " project-card-featured" : ""}`}
              data-in-view="false"
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-8% 0px" }}
              onViewportEnter={(entry) => entry?.target.setAttribute("data-in-view", "true")}
              onViewportLeave={(entry) => entry?.target.setAttribute("data-in-view", "false")}
              exit={{ opacity: 0, y: 12, scale: 0.99 }}
              transition={{
                duration: 0.5,
                delay: Math.min(index * 0.09, 0.45),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                className="project-trigger"
                type="button"
                onClick={() => setSelected(project)}
                aria-label={`View ${project.title} project details`}
              >
                <BrowserFrame project={project} priority={index === 0} />
                <div className="project-content">
                  <div className="project-meta">
                    <span>{project.badge}</span>
                    <span>{String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="project-heading">
                    <h3>{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                  </div>
                  <p className="project-description">{project.overview}</p>
                  <div className="project-footer">
                    <div className="project-tech">
                      <span className="project-tech-label">Built with</span>
                      <div className="project-tags">
                        {project.stack.slice(0, 2).map((tag) => (
                          <span className="project-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                        {project.stack.length > 2 && (
                          <span className="project-tag project-tag-count">+{project.stack.length - 2}</span>
                        )}
                      </div>
                    </div>
                    <span className="project-view">
                      View project <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </AnimatePresence>
        {visible.length === 0 && (
          <p className="empty-results">
            No projects match that search. Try another term or filter.
          </p>
        )}
      </motion.div>
      <ProjectDialog key={selected?.slug ?? "closed"} project={selected} onClose={close} />
    </section>
  );
}

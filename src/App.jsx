import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "./data/projects.js";
import "./portfolio.css";

const EMAIL = "youssefmaged051@gmail.com";
const categories = ["All work", ...new Set(projects.map((project) => project.category))];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function IconLink({ href, children, label }) {
  return <a className="social-link" href={href} target="_blank" rel="noreferrer" aria-label={label}>{children}<Arrow diagonal /></a>;
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(range > 0 ? (window.scrollY / range) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return <>
    <div className="reading-progress" style={{ width: `${progress}%` }} />
    <header className="site-header">
      <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Youssef Maged, home">YM<span>.</span></a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
      <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
        <a href="#about" onClick={closeMenu}>About</a><a href="#work" onClick={closeMenu}>Selected work</a><a href="#toolkit" onClick={closeMenu}>Toolkit</a><a className="nav-contact" href="#contact" onClick={closeMenu}>Let’s talk <Arrow diagonal /></a>
      </nav>
    </header>
  </>;
}

function Hero() {
  return <section className="hero section-wrap" id="top" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="availability-dot" /> Full-stack developer · Giza, Egypt</p>
      <h1 id="hero-title">I make useful ideas<br />feel <span className="serif-accent">simple.</span></h1>
      <p className="hero-intro">Hey, I’m Youssef. I build thoughtful web products—from AI-powered learning tools to games you can play with a friend. I care about the small details that make the whole thing feel right.</p>
      <div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <Arrow /></a><a className="text-link" href={`mailto:${EMAIL}`}>Say hello <Arrow diagonal /></a></div>
      <div className="hero-socials"><IconLink href="https://github.com/youcieff" label="GitHub">GitHub</IconLink><IconLink href="https://www.linkedin.com/in/youssef-maged-664ab4396" label="LinkedIn">LinkedIn</IconLink><a className="social-link" href={`mailto:${EMAIL}`}>Email <Arrow diagonal /></a></div>
    </div>
    <div className="hero-aside" aria-label="A little about how I work">
      <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      <div className="hero-note"><span className="note-mark">“</span><p>I like making things that are both useful and a pleasure to use.</p><span className="note-byline">A small idea I try to bring to every project.</span></div>
      <div className="hero-index"><span>01 / 06</span><span>Curious by default</span></div>
    </div>
    <a href="#about" className="scroll-cue"><span /> Scroll a little</a>
  </section>;
}

function About() {
  return <section className="about section-wrap" id="about">
    <div className="section-kicker"><span>01</span><span>A bit about me</span></div>
    <div className="about-copy"><h2>Good software should make people’s day <span className="serif-accent">easier.</span></h2><div className="about-details"><p>I’m a computer science graduate and full-stack developer based in Giza. Most of my work lives around React, Node, and MongoDB, with a growing interest in bringing AI into products where it can genuinely help.</p><p>I learn by building. Each project gives me a chance to get a little better at the parts I enjoy most: solving the hard bit, shaping a clear interface, and making the details feel considered.</p><a className="text-link" href="#contact">A project in mind? Let’s talk <Arrow diagonal /></a></div></div>
    <div className="about-values"><div><span>01</span><strong>Make it useful</strong><p>Start with the person using it and the problem they came to solve.</p></div><div><span>02</span><strong>Care about the details</strong><p>Responsive layouts, clear language, and interactions that feel natural.</p></div><div><span>03</span><strong>Keep learning</strong><p>Build, listen, improve, and stay curious about what’s possible.</p></div></div>
  </section>;
}

function ProjectCard({ project, index, onOpen }) {
  return <article className={`project-card project-card-${index % 3}`}>
    <button type="button" className="project-image-trigger" onClick={() => onOpen(project)} aria-label={`View ${project.name} screenshots`}>
      <img className="project-image" src={project.images[0]} alt={`${project.name} interface`} loading="lazy"/>
      <span className="project-image-arrow"><Arrow diagonal /></span><span className="project-image-index">{String(index + 1).padStart(2, "0")}</span>
    </button>
    <div className="project-card-meta"><span>{project.category}</span><span>{project.year}</span></div>
    <h3><button type="button" className="project-title-trigger" onClick={() => onOpen(project)}>{project.name}</button></h3>
    <p>{project.intro}</p>
    <div className="project-tags">{project.stack.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
  </article>;
}

function Projects({ onOpen }) {
  const [activeCategory, setActiveCategory] = useState("All work");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => projects.filter((project) => {
    const matchesCategory = activeCategory === "All work" || project.category === activeCategory;
    const searchable = [project.name, project.category, project.intro, project.description, ...project.stack].join(" ").toLowerCase();
    return matchesCategory && searchable.includes(search.trim().toLowerCase());
  }), [activeCategory, search]);
  return <section className="work section-wrap" id="work">
    <div className="section-kicker"><span>02</span><span>Selected work</span></div>
    <div className="section-heading-row"><div><h2>Things I’ve <span className="serif-accent">made.</span></h2><p>A few problems I’ve enjoyed turning into real, usable products.</p></div><span className="work-count">{String(filtered.length).padStart(2, "0")} projects</span></div>
    <div className="project-controls"><div className="filter-list" aria-label="Filter projects">{categories.map((category) => <button key={category} type="button" className={activeCategory === category ? "filter-chip is-active" : "filter-chip"} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><label className="search-box"><span className="sr-only">Search projects</span><span aria-hidden="true">⌕</span><input type="search" placeholder="Find a project or tool" value={search} onChange={(event) => setSearch(event.target.value)} /></label></div>
    {filtered.length ? <div className="project-grid">{filtered.map((project) => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} onOpen={onOpen} />)}</div> : <p className="empty-results">Nothing found for that search. Try another word?</p>}
  </section>;
}

function Toolkit() {
  const skills = ["React", "Next.js", "JavaScript", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Socket.io", "WebRTC", "PeerJS", "AI integrations", "Git & GitHub"];
  return <section className="toolkit section-wrap" id="toolkit"><div className="section-kicker"><span>03</span><span>Tools I reach for</span></div><div className="toolkit-content"><h2>A practical <span className="serif-accent">toolkit.</span></h2><p>The stack changes with the problem. These are the tools I’ve spent time building with and can comfortably bring to a project.</p><div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></section>;
}

function Contact() {
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [sending, setSending] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_honey") || "").trim()) return;
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) return;
    setSending(true); setStatus("idle"); setStatusMessage("");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, _replyto: email, message, _subject: `Portfolio note from ${name}`, _honey: "" }),
      });
      const result = await response.json();
      if (!response.ok || ![true, "true"].includes(result?.success)) throw new Error("Message could not be sent.");
      setStatus("sent");
      setStatusMessage("Thanks for reaching out. Your message has been handed off to my inbox. If this is your first time using the form, I may need to confirm the email activation first.");
      form.reset();
    } catch {
      setStatus("error");
      setStatusMessage("That didn’t go through. You can email me directly and it’ll land in the same inbox.");
    } finally { setSending(false); }
  }
  return <section className="contact section-wrap" id="contact"><div className="section-kicker"><span>04</span><span>Get in touch</span></div><div className="contact-layout"><div className="contact-copy"><p className="eyebrow">Have something in mind?</p><h2>Let’s make a good thing <span className="serif-accent">happen.</span></h2><p>If you’re hiring, building something interesting, or just want to talk shop, I’d be glad to hear from you.</p><a className="email-address" href={`mailto:${EMAIL}`}>{EMAIL}<Arrow diagonal /></a><div className="contact-socials"><IconLink href="https://github.com/youcieff" label="GitHub">GitHub</IconLink><IconLink href="https://www.linkedin.com/in/youssef-maged-664ab4396" label="LinkedIn">LinkedIn</IconLink></div></div>
    <form className="message-form" onSubmit={handleSubmit}>
      <label>Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="What should I call you?" /></label>
      <label>Your email<input name="email" type="email" autoComplete="email" required maxLength={160} placeholder="you@example.com" /></label>
      <label>A little about it<textarea name="message" rows={5} required maxLength={3000} placeholder="What are you thinking about?" /></label>
      <label className="honeypot" aria-hidden="true">Leave this blank<input name="_honey" tabIndex={-1} autoComplete="off" /></label>
      <button className="button button-dark send-button" type="submit" disabled={sending}>{sending ? "Sending…" : "Send your note"}<Arrow /></button>
      <p className={`form-status ${status}`} aria-live="polite">{statusMessage || "Your message is sent to my email through FormSubmit. The first submission may ask me to activate the form from an email."}</p>
    </form></div></section>;
}

function ProjectDialog({ project, onClose }) {
  const [imageIndex, setImageIndex] = useState(0);
  const dialogRef = useRef(null);
  useEffect(() => { setImageIndex(0); }, [project]);
  useEffect(() => {
    if (!project) return undefined;
    const previousFocus = document.activeElement;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusable = [...(dialogRef.current?.querySelectorAll("a[href], button:not(:disabled)") || [])];
        if (!focusable.length) return;
        const first = focusable[0]; const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("dialog-open");
    requestAnimationFrame(() => dialogRef.current?.querySelector(".dialog-close")?.focus());
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.classList.remove("dialog-open"); if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus(); };
  }, [project, onClose]);
  if (!project) return null;
  const changeImage = (step) => setImageIndex((index) => (index + step + project.images.length) % project.images.length);
  return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section ref={dialogRef} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex={-1}>
    <div className="dialog-top"><span>{project.category} · {project.year}</span><button className="dialog-close" type="button" onClick={onClose} aria-label="Close project details">×</button></div>
    <div className="dialog-image"><img src={project.images[imageIndex]} alt={`${project.name} screen ${imageIndex + 1}`} /><button type="button" onClick={() => changeImage(-1)} aria-label="Previous screenshot">←</button><span>{imageIndex + 1} / {project.images.length}</span><button type="button" onClick={() => changeImage(1)} aria-label="Next screenshot">→</button></div>
    <div className="dialog-copy"><div><h2 id="dialog-title">{project.name}</h2><p>{project.description}</p><h3>What I focused on</h3><ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul><div className="project-tags dialog-tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div><div className="dialog-links"><a href={project.live} target="_blank" rel="noreferrer">Open live project <Arrow diagonal /></a><a href={project.github} target="_blank" rel="noreferrer">Source code <Arrow diagonal /></a></div></div>
  </section></div>;
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  return <div className="portfolio-app"><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><main id="main-content"><Hero /><About /><Projects onOpen={setSelectedProject} /><Toolkit /><Contact /></main><footer className="site-footer section-wrap"><a className="wordmark" href="#top">YM<span>.</span></a><p>Made with care in Giza, Egypt.</p><a href="#top">Back to top ↑</a><span>© {new Date().getFullYear()} Youssef Maged</span></footer><ProjectDialog project={selectedProject} onClose={closeProject} /></div>;
}

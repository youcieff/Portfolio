import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { GithubMark, LinkedinMark } from "@/components/ui/brand-icons";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="hero shell" id="hero" aria-labelledby="hero-title">
      <Reveal className="hero-copy">
        <div className="hero-kicker">
          <span className="status-dot" /> {site.role} <span aria-hidden="true">·</span>{" "}
          {site.location}
        </div>
        <h1 id="hero-title">
          I build useful <span>digital products.</span>
        </h1>
        <p className="hero-summary">{site.summary}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore selected work <ArrowDown size={16} aria-hidden="true" />
          </a>
          <a className="button button-quiet" href="#contact">
            Get in touch <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="hero-socials">
          <a href={site.github} target="_blank" rel="noreferrer">
            <GithubMark size={16} /> GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            <LinkedinMark size={16} /> LinkedIn
          </a>
          <a href={site.emailHref}>
            <Mail size={16} aria-hidden="true" /> Email
          </a>
        </div>
      </Reveal>
      <Reveal className="hero-aside" delay={0.12}>
        <div className="currently-card">
          <div className="currently-top">
            <p>At a glance</p>
            <span className="available-label">
              <span className="status-dot" /> {site.status}
            </span>
          </div>
          <dl className="currently-list">
            <div className="currently-item">
              <dt>Focus</dt>
              <dd>{site.specialization}</dd>
            </div>
            <div className="currently-item">
              <dt>Based in</dt>
              <dd>{site.location}</dd>
            </div>
            <div className="currently-item">
              <dt>Background</dt>
              <dd>B.Sc. Computer Science &amp; AI</dd>
            </div>
            <div className="currently-item">
              <dt>Building</dt>
              <dd>Web apps, learning tools, games</dd>
            </div>
          </dl>
          <span className="hero-index">
            01 / {String(projects.length).padStart(2, "0")} PROJECTS
          </span>
        </div>
      </Reveal>
    </section>
  );
}

import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { GithubMark, LinkedinMark } from "@/components/ui/brand-icons";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { RoleTypewriter } from "@/components/hero/role-typewriter";

export function Hero() {
  return (
    <section className="hero shell" id="hero" aria-labelledby="hero-title">
      <div className="hero-copy hero-entry">
        <p className="hero-kicker">
          <span className="status-dot" />
          <span className="hero-kicker-role">{site.role}</span>
          <span className="hero-kicker-divider" aria-hidden="true">&#183;</span>
          <span className="hero-kicker-location">{site.location}</span>
        </p>
        <h1 id="hero-title" className="hero-title">
          <span className="hero-title-intro">Hi, I&apos;m</span>
          <span className="hero-title-name">
            <span>Youssef</span>
            <span>Maged</span>
          </span>
          <span className="hero-role-line">
            <RoleTypewriter />
          </span>
        </h1>
        <p className="hero-summary">{site.summary}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            See My Work <ArrowDown size={16} aria-hidden="true" />
          </a>
          <a className="button button-quiet" href="#resume">
            View Resume <ArrowUpRight size={16} aria-hidden="true" />
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
      </div>

      <div className="hero-aside hero-entry hero-entry-aside">
        <div className="hero-card">
          <div className="hero-card-top" aria-hidden="true">
            <span />
            <span />
            <span />
            <small>developer.js</small>
          </div>
          <div className="hero-code" aria-label="Developer profile">
            <div>
              <span className="code-keyword">const</span> developer{" "}
              <span className="code-punctuation">=</span>{" "}
              <span className="code-punctuation">&#123;</span>
            </div>
            <div className="code-indent">
              <span className="code-property">name</span>:{" "}
              <span className="code-string">&quot;{site.name}&quot;</span>,
            </div>
            <div className="code-indent">
              <span className="code-property">role</span>:{" "}
              <span className="code-string">&quot;Full Stack Developer&quot;</span>,
            </div>
            <div className="code-indent">
              <span className="code-property">status</span>:{" "}
              <span className="code-string">&quot;{site.status}&quot;</span>,
            </div>
            <div className="code-indent">
              <span className="code-property">stack</span>: [
              <span className="code-string">&quot;MERN&quot;</span>,{" "}
              <span className="code-string">&quot;Next.js&quot;</span>,{" "}
              <span className="code-string">&quot;AI&quot;</span>],
            </div>
            <div>
              <span className="code-punctuation">&#125;</span>
              <span className="code-keyword">;</span>
            </div>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{String(projects.length).padStart(2, "0")}</strong>
              <span>Projects</span>
            </div>
            <div>
              <strong>MERN</strong>
              <span>Core stack</span>
            </div>
            <div>
              <strong>AI</strong>
              <span>Integration</span>
            </div>
          </div>
          <span className="hero-card-glow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

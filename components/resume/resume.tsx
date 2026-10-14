import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { resume } from "@/data/resume";
import { site } from "@/data/site";
import { PrintButton } from "@/components/resume/print-button";

export function Resume() {
  return (
    <section className="section shell" id="resume" aria-labelledby="resume-title">
      <div className="section-heading">
        <span className="eyebrow">Experience</span>
        <div>
          <h2 className="section-title" id="resume-title">
            A little more context.
          </h2>
          <p className="section-intro">
            A concise overview of the work, skills, and experience behind these projects.
          </p>
        </div>
      </div>
      <Reveal className="resume-card">
        <div className="resume-top">
          <div>
            <h3>{site.name}</h3>
            <p>{resume.role}</p>
            <p className="resume-print-only">
              {site.location} · {site.email} · {site.phone} · GitHub: {site.github} · LinkedIn:{" "}
              {site.linkedin}
            </p>
          </div>
          <PrintButton />
        </div>
        <div className="resume-section">
          <h4>Profile</h4>
          <p className="muted resume-screen-only">{resume.summary}</p>
          <p className="resume-print-only">{resume.printSummary}</p>
        </div>
        <div className="resume-section">
          <h4>Selected projects</h4>
          {resume.projects.map((project, index) => {
            const data = resume.projectData[index];
            return (
              <article className="resume-project" key={project.title}>
                <div>
                  <h5>{project.title}</h5>
                  <span className="resume-meta">{project.meta}</span>
                  <span className="resume-meta">
                    <a href={data.live} target="_blank" rel="noreferrer">
                      Live project
                    </a>{" "}
                    ·{" "}
                    <a href={data.github} target="_blank" rel="noreferrer">
                      Source code
                    </a>
                  </span>
                </div>
                <ul>
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <div className="resume-section">
          <h4>Experience</h4>
          {resume.workExperience.map((job) => (
            <article className="resume-job" key={job.title}>
              <div>
                <h5>{job.title}</h5>
                <span className="resume-meta">{job.period}</span>
              </div>
              <p>{job.description}</p>
            </article>
          ))}
        </div>
        <div className="resume-section resume-print-education">
          <h4>Education</h4>
          <article className="resume-job">
            <div>
              <h5>{resume.printEducation.degree}</h5>
              <span className="resume-meta">{resume.printEducation.period}</span>
            </div>
            <p>
              {resume.printEducation.school}
              <br />
              {resume.printEducation.project}
            </p>
          </article>
        </div>
        <div className="resume-section">
          <h4>Technical skills</h4>
          {resume.skillGroups.map((group) => (
            <p className="muted" key={group.title}>
              <strong>{group.title}:</strong> {group.skills.join(" · ")}
            </p>
          ))}
        </div>
        <div className="resume-section resume-print-certification">
          <h4>Certification · {resume.certification.date}</h4>
          <p className="muted">
            {resume.certification.title}, {resume.certification.issuer}. Topics:{" "}
            {resume.certification.topics.join(", ")}.
          </p>
        </div>
        <div className="resume-section">
          <h4>Languages &amp; interests</h4>
          <p className="muted">
            {resume.languages.join(" · ")}
            <br />
            {resume.printInterests}
          </p>
        </div>
        <div className="resume-section resume-print-only">
          <h4>Contact</h4>
          <p>
            {site.email} · {site.phone}
            <br />
            <a href={site.github}>{site.github}</a>
            <br />
            <a href={site.linkedin}>{site.linkedin}</a>
          </p>
        </div>
        <div className="resume-section resume-print-only">
          <a href={site.website}>
            Portfolio: {site.website} <ArrowUpRight size={12} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

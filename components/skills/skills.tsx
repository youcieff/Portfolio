import { Reveal } from "@/components/ui/reveal";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section className="section shell" id="skills" aria-labelledby="skills-title">
      <div className="section-heading">
        <span className="eyebrow">Toolkit</span>
        <div>
          <h2 className="section-title" id="skills-title">
            Tools for the whole build.
          </h2>
          <p className="section-intro">
            My current toolkit spans interface work, server-side systems, AI integrations, and the
            practical details of shipping.
          </p>
        </div>
      </div>
      <div className="skills-list">
        {skillGroups.map((group, index) => (
          <Reveal className="skill-row" key={group.title} delay={index * 0.06}>
            <h3>{group.title}</h3>
            <div className="skill-chips">
              {group.skills.map((skill) => (
                <span className="skill-chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

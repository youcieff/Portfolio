import { BrainCircuit, Code2, Server, Wrench } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { skillGroups } from "@/data/skills";

const categoryIcons = [Code2, Server, BrainCircuit, Wrench];

export function Skills() {
  return (
    <section className="section shell" id="skills" aria-labelledby="skills-title">
      <Reveal className="section-heading">
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
      </Reveal>
      <div className="skills-list">
        {skillGroups.map((group, index) => {
          const Icon = categoryIcons[index] ?? Code2;

          return (
            <Reveal className="skill-row" key={group.title} delay={index * 0.09}>
              <div className="skill-heading">
                <span className="skill-icon" aria-hidden="true">
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <div>
                  <span className="skill-index">0{index + 1} / TOOLKIT</span>
                  <h3>{group.title}</h3>
                </div>
                <span className="skill-count">{String(group.skills.length).padStart(2, "0")}</span>
              </div>
              <div className="skill-chips">
                {group.skills.map((skill) => (
                  <span className="skill-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Education } from "@/components/education/education";
import { Hero } from "@/components/hero/hero";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { Resume } from "@/components/resume/resume";
import { Skills } from "@/components/skills/skills";
import { SiteFooter } from "@/components/ui/site-footer";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <About />
      <ProjectExplorer />
      <Skills />
      <Resume />
      <Education />
      <Contact />
      <SiteFooter />
      <span className="sr-only">
        Contact {site.name} about full stack development opportunities.
      </span>
    </main>
  );
}

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/data/site";

export function About() {
  return (
    <section className="section shell" id="about" aria-labelledby="about-title">
      <div className="section-heading">
        <span className="eyebrow">About</span>
        <div>
          <h2 className="section-title" id="about-title">
            Thoughtful work,
            <br />
            built with people in mind.
          </h2>
        </div>
      </div>
      <div className="about-grid">
        <Reveal className="about-photo-frame">
          <Image
            className="profile-dark"
            src="/images/profile.webp"
            width={900}
            height={1024}
            alt="Portrait of Youssef Maged Hanna"
            sizes="(max-width: 760px) 90vw, 35vw"
            priority
          />
          <Image
            className="profile-light"
            src="/images/profile-light.webp"
            width={900}
            height={1024}
            alt="Portrait of Youssef Maged Hanna"
            sizes="(max-width: 760px) 90vw, 35vw"
          />
        </Reveal>
        <Reveal className="about-copy" delay={0.08}>
          <p>{site.about}</p>
          <p>{site.aboutBeforeSoftware}</p>
          <div className="about-note">
            <MapPin size={18} aria-hidden="true" />
            <span>
              Based in {site.location}. Open to full-time roles, freelance projects, and
              collaborations.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

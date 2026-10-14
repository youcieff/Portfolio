import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/data/site";
import { GithubMark, LinkedinMark } from "@/components/ui/brand-icons";

export function Contact() {
  return (
    <section className="section shell" id="contact" aria-labelledby="contact-title">
      <div className="contact-grid">
        <Reveal className="contact-copy">
          <span className="eyebrow">Contact</span>
          <h2 id="contact-title">Have something in mind?</h2>
          <p>{site.contactIntro}</p>
          <div className="contact-methods">
            <a className="contact-method" href={site.emailHref}>
              <Mail size={18} />
              <span>Email</span>
              <strong>{site.email}</strong>
              <ArrowUpRight size={15} />
            </a>
            <a className="contact-method" href={`tel:${site.phoneHref}`}>
              <Phone size={18} />
              <span>Phone</span>
              <strong>{site.phone}</strong>
              <ArrowUpRight size={15} />
            </a>
            <a className="contact-method" href={site.linkedin} target="_blank" rel="noreferrer">
              <LinkedinMark size={18} />
              <span>LinkedIn</span>
              <strong>{site.linkedinLabel}</strong>
              <ArrowUpRight size={15} />
            </a>
            <a className="contact-method" href={site.github} target="_blank" rel="noreferrer">
              <GithubMark size={18} />
              <span>GitHub</span>
              <strong>github.com/youcieff</strong>
              <ArrowUpRight size={15} />
            </a>
          </div>
          <p className="muted">
            <MapPin size={15} aria-hidden="true" /> {site.location}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

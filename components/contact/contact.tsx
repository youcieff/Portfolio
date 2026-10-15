import { Mail, MapPin, Phone } from "lucide-react";
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
            <a
              className="contact-method"
              href={site.emailHref}
              aria-label={`Email ${site.name} at ${site.email}`}
              title="Send an email"
            >
              <Mail size={18} />
              <span>Email</span>
            </a>
            <a
              className="contact-method"
              href={`tel:${site.phoneHref}`}
              aria-label={`Call ${site.name} at ${site.phone}`}
              title="Call by phone"
            >
              <Phone size={18} />
              <span>Phone</span>
            </a>
            <a
              className="contact-method"
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${site.name}'s LinkedIn profile`}
              title="Open LinkedIn"
            >
              <LinkedinMark size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              className="contact-method"
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${site.name}'s GitHub profile`}
              title="Open GitHub"
            >
              <GithubMark size={18} />
              <span>GitHub</span>
            </a>
          </div>
          <p className="contact-location muted">
            <MapPin size={15} aria-hidden="true" /> {site.location}
          </p>
        </Reveal>
        <Reveal className="contact-form-reveal" delay={0.14}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

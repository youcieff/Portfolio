import {
  Braces,
  BriefcaseBusiness,
  CalendarCheck,
  Coffee,
  Globe,
  GraduationCap,
  House,
  LayoutDashboard,
  Link,
  PanelsTopLeft,
  ShoppingCart,
  Smartphone,
  Sparkles,
  UserRound,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const services = [
  {
    title: "Custom Website Development",
    description: "Build a professional website from scratch tailored to your brand and goals.",
    Icon: Globe,
  },
  {
    title: "E-Commerce Store",
    description: "Full online store with cart, checkout, admin dashboard, and product management.",
    Icon: ShoppingCart,
  },
  {
    title: "Landing Page",
    description: "A fast, conversion-focused page to showcase your product, service, or brand.",
    Icon: PanelsTopLeft,
  },
  {
    title: "Business Web Application",
    description: "Custom web app for managing bookings, sales, inventory, or employees.",
    Icon: BriefcaseBusiness,
  },
  {
    title: "Restaurant / Café System",
    description: "Online menu, table reservations, and order management system.",
    Icon: Coffee,
  },
  {
    title: "Clinic Appointment Booking",
    description: "Patient registration, doctor schedules, and appointment management system.",
    Icon: CalendarCheck,
  },
  {
    title: "School / Course Platform",
    description: "Student enrollment, content delivery, quizzes, and progress tracking.",
    Icon: GraduationCap,
  },
  {
    title: "Real Estate Listings Site",
    description: "Property showcase with filters, search, and inquiry forms.",
    Icon: House,
  },
  {
    title: "Portfolio Website",
    description: "A stunning personal portfolio to showcase your work and attract clients or employers.",
    Icon: UserRound,
  },
  {
    title: "Admin Dashboard & CMS",
    description: "Full control panel to manage your website content, users, and data.",
    Icon: LayoutDashboard,
  },
  {
    title: "API & Backend Development",
    description: "Scalable REST API with auth, roles, and database integration.",
    Icon: Braces,
  },
  {
    title: "AI-Powered Features",
    description: "Add smart features to your product — chatbots, summarization, or automation.",
    Icon: Sparkles,
  },
  {
    title: "Mobile-Responsive Redesign",
    description: "Transform any outdated site into a pixel-perfect mobile-friendly experience.",
    Icon: Smartphone,
  },
  {
    title: "Link in Bio Page",
    description: "A sleek, branded page for content creators to share all their links in one place.",
    Icon: Link,
  },
  {
    title: "Maintenance & Support",
    description: "Ongoing updates, bug fixes, and performance improvements for your website.",
    Icon: Wrench,
  },
] as const;

export function Services() {
  return (
    <section className="section shell" id="services" aria-labelledby="services-title">
      <Reveal className="section-heading">
        <span className="eyebrow">Services</span>
        <div>
          <h2 className="section-title" id="services-title">
            From first idea to launch.
          </h2>
          <p className="section-intro">
            Thoughtful web experiences and reliable systems, shaped around what your business needs.
          </p>
        </div>
      </Reveal>
      <div className="service-grid">
        {services.map(({ title, description, Icon }, index) => (
          <Reveal className="service-card reveal" delay={index * 0.035} key={title}>
            <article className="service-card-body">
              <div className="service-card-topline">
                <span className="service-icon" aria-hidden="true">
                  <Icon size={21} strokeWidth={1.8} />
                </span>
                <span className="service-number">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i aria-hidden="true" />
                  15
                </span>
              </div>
              <span className="service-card-rule" aria-hidden="true" />
              <div className="service-card-copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <a className="service-cta" href="#contact" aria-label={`Discuss ${title}`}>
                <span>Discuss this service</span>
                <span className="service-arrow" aria-hidden="true">
                  <ArrowUpRight size={15} />
                </span>
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

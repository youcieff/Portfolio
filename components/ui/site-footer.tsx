import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <a href="#hero" className="footer-back">
          Back to top <ArrowUp size={15} aria-hidden="true" />
        </a>
        <a href={site.emailHref}>
          Say hello <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Reveal className="shell footer-inner">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <a href="#hero" className="footer-back">
          Back to top <ArrowUp size={15} aria-hidden="true" />
        </a>
      </Reveal>
    </footer>
  );
}

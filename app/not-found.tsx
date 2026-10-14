import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="shell section"
      style={{ minHeight: "70dvh", display: "grid", alignContent: "center" }}
    >
      <span className="eyebrow">404 · Not found</span>
      <h1 className="section-title" style={{ marginTop: "1rem" }}>
        This page isn&apos;t here.
      </h1>
      <p className="section-intro">The link may be old, or the page may have moved.</p>
      <Link
        className="button button-primary"
        href="/"
        style={{ width: "fit-content", marginTop: "1.4rem" }}
      >
        Back to portfolio
      </Link>
    </main>
  );
}

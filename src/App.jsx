import { useEffect, useState } from "react";

export default function App() {
  const [page, setPage] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/portfolio-template.html")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load portfolio content");
        return response.text();
      })
      .then((markup) => {
        const doc = new DOMParser().parseFromString(markup, "text/html");
        doc.body.querySelectorAll("script").forEach((script) => script.remove());
        if (active) setPage(doc.body.innerHTML);
      })
      .catch(() => active && setFailed(true));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!page) return undefined;
    let mainScript;
    const projectsScript = document.createElement("script");
    projectsScript.src = "/js/projects.js";
    projectsScript.onload = () => {
      mainScript = document.createElement("script");
      mainScript.src = "/js/main.js";
      document.body.appendChild(mainScript);
    };
    document.body.appendChild(projectsScript);
    return () => { projectsScript.remove(); mainScript?.remove(); };
  }, [page]);

  if (failed) return <main style={{ padding: "3rem", color: "#eeeef4", background: "#060608" }}>Portfolio failed to load. Please refresh.</main>;
  return page ? <div dangerouslySetInnerHTML={{ __html: page }} /> : <main aria-label="Loading portfolio" style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "#eeeef4", background: "#060608", font: "800 2rem Outfit, sans-serif" }}>YM<span style={{ color: "#8b7cf6" }}>.</span></main>;
}

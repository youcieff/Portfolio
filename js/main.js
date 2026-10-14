(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  let activeProject = null;
  let activeVideoModalClose = null;
  let activeCertificateClose = null;
  let projectReturnFocus = null;
  let galleryIndex = 0;
  let touchStartX = 0;

  /* Intro is static HTML/CSS so it can never hold the page behind JavaScript. */
  const hideLoader = () => {
    const loader = $("#loader");
    if (loader && document.documentElement.dataset.intro === "play") {
      loader.addEventListener("animationend", (event) => {
        if (event.target === loader && event.animationName === "loader-exit") loader.remove();
      });
      window.setTimeout(() => loader.remove(), 2600);
    } else loader?.remove();
  };
  hideLoader();

  /* ── Theme Toggle ── */
  const themeToggle = $("#themeToggle");
  const themeMeta = $$('meta[name="theme-color"]');
  const setThemeMeta = (theme) => themeMeta.forEach((meta, index) => {
    const isActive = (theme === "dark" && index === 0) || (theme === "light" && index === 1);
    meta.media = isActive ? "all" : "not all";
    meta.content = theme === "light" ? "#f6f5f1" : "#111110";
  });
  setThemeMeta(document.documentElement.dataset.theme || "dark");
  themeToggle?.setAttribute("aria-label", `Switch to ${document.documentElement.dataset.theme === "light" ? "dark" : "light"} theme`);
  themeToggle?.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const newTheme = isLight ? "dark" : "light";
    document.documentElement.classList.add("theme-changing");
    document.documentElement.dataset.theme = newTheme;
    themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "light" : "dark"} theme`);
    setThemeMeta(newTheme);
    try { localStorage.setItem("theme", newTheme); } catch { /* Storage may be disabled in private browsing. */ }
    window.setTimeout(() => document.documentElement.classList.remove("theme-changing"), 220);
  });

  /* ── Scroll progress ── */
  const progress = $(".scroll-progress");
  function onScroll() {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = max > 0 ? (scrolled / max) * 100 + "%" : "0%";
    $("#mainNav")?.classList.toggle("scrolled", scrolled > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── Mobile nav ── */
  const navToggle = $("#navToggle");
  const navMobile = $("#navMobile");
  const closeMobileNav = (restoreFocus = false) => {
    navToggle?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    navMobile?.classList.remove("open");
    document.body.classList.remove("nav-open");
    if (restoreFocus) navToggle?.focus({ preventScroll: true });
  };
  navToggle?.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navMobile?.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    if (open) navMobile?.querySelector("a")?.focus({ preventScroll: true });
  });
  $$(".nav-mobile a, .nav-links a").forEach((a) => {
    a.addEventListener("click", () => closeMobileNav());
  });
  document.addEventListener("click", (event) => {
    if (navMobile?.classList.contains("open") && !event.target.closest("#mainNav")) closeMobileNav();
  });

  /* ── Reveal on scroll ── */
  const revealNodes = $$(".reveal");
  let revealObs = null;
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-enabled");
    revealObs = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObs.unobserve(entry.target);
      }
    }), { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    revealNodes.forEach((el) => revealObs.observe(el));
    window.setTimeout(() => $$(".reveal").forEach((el) => el.classList.add("visible")), 2500);
  } else revealNodes.forEach((el) => el.classList.add("visible"));

  /* ── Nav spy ── */
  const sections = $$("section[id]");
  const navLinks = $$(".nav-links a, .nav-mobile a");

  const indicator = document.createElement("div");
  indicator.className = "nav-indicator";
  const navLinksUl = $(".nav-links");
  if (navLinksUl) navLinksUl.appendChild(indicator);

  function updateIndicator() {
    const activeDesktop = $(".nav-links a.active");
    if (activeDesktop && navLinksUl) {
      indicator.style.width = activeDesktop.offsetWidth + "px";
      indicator.style.transform = `translateX(${activeDesktop.offsetLeft}px)`;
      indicator.style.opacity = "1";
    } else {
      indicator.style.opacity = "0";
    }
  }

  let tickingSpy = false;
  function updateNavSpy() {
    let currentId = "";
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 50) {
      currentId = "contact";
    } else {
      sections.forEach((s) => {
        const top = s.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.45) {
          currentId = s.id;
        }
      });
    }

    if (currentId) {
      navLinks.forEach((a) => {
        const active = a.getAttribute("href") === "#" + currentId;
        a.classList.toggle("active", active);
        if (active) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
      updateIndicator();
    }
    tickingSpy = false;
  }

  window.addEventListener("scroll", () => {
    if (!tickingSpy) {
      window.requestAnimationFrame(updateNavSpy);
      tickingSpy = true;
    }
  }, { passive: true });
  window.addEventListener("resize", updateIndicator);
  setTimeout(updateNavSpy, 100);

  /* Contact form: send messages to the portfolio owner's inbox. */
  $("#contactForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const submitButton = form.querySelector('button[type="submit"]');
    const status = $("#contactFormStatus");
    const fields = new FormData(form);
    if (String(fields.get("_honey") || "").trim()) return;
    const payload = {
      name: String(fields.get("name") || "").trim(),
      email: String(fields.get("email") || "").trim(),
      phone: String(fields.get("phone") || "").trim(),
      subject: String(fields.get("subject") || "").trim(),
      _replyto: String(fields.get("email") || "").trim(),
      message: String(fields.get("message") || "").trim(),
      _subject: String(fields.get("subject") || "").trim() || `Portfolio message from ${String(fields.get("name") || "Visitor").trim()}`,
      _honey: ""
    };
    if (!payload.name || !payload.email || !payload.phone || !payload.message) return;
    if (submitButton) { submitButton.disabled = true; submitButton.textContent = "Sending…"; }
    if (status) { status.className = "contact-form-note is-sending"; status.textContent = "Sending your message…"; }
    try {
      const response = await fetch("https://formsubmit.co/ajax/youssefmaged051@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      let result;
      try { result = await response.json(); }
      catch { throw new Error("The email service returned an unreadable response."); }
      if (!response.ok || ![true, "true"].includes(result?.success)) {
        throw new Error(result?.message || result?.error || `The email service rejected the request (${response.status}).`);
      }
      form.reset();
      if (status) { status.className = "contact-form-note is-sent"; status.textContent = "Thanks! Your message has been sent. I’ll get back to you soon."; }
    } catch (error) {
      console.error("Portfolio contact form submission failed:", error);
      if (status) {
        status.className = "contact-form-note is-error";
        status.textContent = `Message didn’t send. ${error instanceof TypeError ? "Check your internet connection or try again." : error.message} You can also email me at `;
        const emailLink = document.createElement("a");
        emailLink.href = "mailto:youssefmaged051@gmail.com";
        emailLink.textContent = "youssefmaged051@gmail.com";
        status.append(emailLink, ".");
      }
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = "Send message"; }
    }
  });

  /* ── Build project rows ── */
  const projectsList = $("#projectsList");
  if (projectsList && typeof PROJECTS !== "undefined") {
    PROJECTS.forEach((p, i) => {
      const row = document.createElement("article");
      row.className = `project-row project-card reveal${i === 0 ? " project-card-featured" : ""}`;
      if (i > 0) row.style.transitionDelay = i * 0.06 + "s";
      row.dataset.id = p.id;
      row.dataset.tags = (p.tags || []).join(" ");
      row.setAttribute("role", "button");
      row.setAttribute("tabindex", "0");
      row.setAttribute("aria-label", `Open ${p.title} project details`);
      row.innerHTML = `
        <div class="project-thumb" style="--shot-aspect:${p.aspect || "2 / 1"}">
          <div class="project-browserbar" aria-hidden="true"><span></span><span></span><span></span><small>${p.title}</small></div>
          <div class="project-image-frame"><img src="/${encodeURI(p.images[0])}" alt="${p.title} project screenshot" width="1600" height="780" loading="${i === 0 ? "eager" : "lazy"}" decoding="async" ${i === 0 ? 'fetchpriority="high"' : ""}/></div>
        </div>
        <div class="project-card-content">
          <div class="project-card-meta"><span class="project-num">${p.num}</span><span class="project-tag">${p.badge}</span></div>
          <h3 class="project-row-title">${p.title}</h3>
          <p class="project-row-sub">${p.subtitle}</p>
          <p class="project-row-desc">${p.overview}</p>
          <div class="project-row-tech">${p.stack.slice(0, 4).map((tech) => `<span class="tech-chip">${tech}</span>`).join("")}${p.stack.length > 4 ? `<span class="tech-chip tech-more">+${p.stack.length - 4}</span>` : ""}</div>
          <span class="project-open-hint">View project <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></span>
        </div>`;
      row.addEventListener("click", () => openPanel(p.id, row));
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPanel(p.id, row);
        }
      });
      projectsList.appendChild(row);
      revealObs?.observe(row);
    });
  }

  const projectCount = PROJECTS?.length || 0;
  const heroProjectCount = $(".stat-num");
  if (heroProjectCount) heroProjectCount.textContent = projectCount;
  const initialCount = $("#projectResultCount");
  if (initialCount) initialCount.textContent = `${projectCount} projects`;

  /* Quick project search */
  const projectSearch = $("#projectSearch");
  const projectResultCount = $("#projectResultCount");
  let activeFilter = "all";
  if (projectSearch && projectsList && typeof PROJECTS !== "undefined") {
    const updateProjectSearch = () => {
      const query = projectSearch.value.trim().toLocaleLowerCase();
      let visibleCount = 0;
      $$(".project-row", projectsList).forEach((row) => {
        const project = PROJECTS.find((item) => item.id === row.dataset.id);
        const haystack = [project?.title, project?.subtitle, project?.badge, project?.overview, ...(project?.stack || [])]
          .join(" ").toLocaleLowerCase();
        const matchesSearch = !query || haystack.includes(query);
        const matchesFilter = activeFilter === "all" || (project?.tags || []).includes(activeFilter);
        const matches = matchesSearch && matchesFilter;
        if (matches) {
          row.hidden = false;
          row.classList.remove("filter-hidden");
        } else if (!row.hidden) {
          row.classList.add("filter-hidden");
          window.setTimeout(() => {
            if (row.classList.contains("filter-hidden")) row.hidden = true;
          }, 220);
        }
        if (matches) visibleCount++;
      });
      if (projectResultCount) projectResultCount.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
    };
    projectSearch.addEventListener("input", updateProjectSearch);
    $$(".filter-chip").forEach((chip) => chip.addEventListener("click", () => {
      activeFilter = chip.dataset.filter || "all";
      $$(".filter-chip").forEach((item) => {
        const selected = item === chip;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      updateProjectSearch();
    }));
  }

  /* ── Project panel ── */
  const overlay = $("#panelOverlay");
  const panel = $("#projectPanel");
  const panelBody = $(".panel-body");
  const scrollHint = $("#scrollHint");

  if (panelBody && scrollHint) {
    panelBody.addEventListener("scroll", () => {
      if (panelBody.scrollTop > 20) {
        scrollHint.classList.remove("show");
      } else {
        scrollHint.classList.add("show");
      }
    }, { passive: true });

    scrollHint.addEventListener("click", () => {
      panelBody.scrollTo({ top: window.innerHeight * 0.35, behavior: "smooth" });
    });
  }

  function openPanel(id, returnFocus = document.activeElement) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    projectReturnFocus = returnFocus;
    activeProject = p;
    galleryIndex = 0;
    renderPanel(p);
    document.body.style.overflow = "hidden";
    overlay?.classList.add("open");
    overlay?.setAttribute("aria-hidden", "false");
    panel?.classList.add("open");
    panel?.setAttribute("aria-hidden", "false");
    if (panel) panel.inert = false;
    $("#panelClose")?.focus({ preventScroll: true });
    if (panelBody) panelBody.scrollTop = 0;
    if (scrollHint) scrollHint.classList.add("show");
  }

  function closePanel() {
    overlay?.classList.remove("open");
    overlay?.setAttribute("aria-hidden", "true");
    panel?.classList.remove("open");
    panel?.setAttribute("aria-hidden", "true");
    if (panel) panel.inert = true;
    document.body.style.overflow = "";
    activeProject = null;
    if (scrollHint) scrollHint.classList.remove("show");
    projectReturnFocus?.focus?.({ preventScroll: true });
    projectReturnFocus = null;
  }

  function createVideoShowcase(project) {
    const section = document.createElement("section");
    section.className = "video-showcase";
    section.style.setProperty("--showcase-accent", project.accent || "var(--accent)");

    const heading = document.createElement("div");
    heading.className = "video-showcase-heading";
    heading.innerHTML = '<span class="video-showcase-kicker">PROJECT FILM</span><h3>See it in action</h3><p>A closer look at the experience, from start to finish.</p>';

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "video-showcase-trigger";
    trigger.setAttribute("aria-label", `Play ${project.title} product demo`);

    const thumbnail = document.createElement("img");
    thumbnail.className = "video-showcase-thumbnail";
    thumbnail.src = encodeURI(project.demoVideoThumbnail || project.images[0]);
    thumbnail.alt = `${project.title} product preview`;
    thumbnail.loading = "lazy";
    thumbnail.decoding = "async";
    thumbnail.width = 1600;
    thumbnail.height = 900;

    const shade = document.createElement("span");
    shade.className = "video-showcase-shade";
    shade.setAttribute("aria-hidden", "true");

    const play = document.createElement("span");
    play.className = "video-showcase-play";
    play.setAttribute("aria-hidden", "true");
    play.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.8c0-.8.87-1.28 1.54-.85l10.1 6.2a1 1 0 010 1.7l-10.1 6.2A1 1 0 018 18.2z"/></svg>';

    const caption = document.createElement("span");
    caption.className = "video-showcase-caption";
    caption.innerHTML = '<span><strong>Watch the product demo</strong><small>Guided walkthrough · opens here</small></span><span class="video-showcase-arrow" aria-hidden="true">↗</span>';

    trigger.append(thumbnail, shade, play, caption);
    trigger.addEventListener("click", () => openVideoModal(project, trigger));
    section.append(heading, trigger);
    return section;
  }

  function openVideoModal(project, returnFocus) {
    if (!/^[\w-]{11}$/.test(project.demoVideoId || "")) return;

    const modal = document.createElement("div");
    modal.className = "video-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "videoModalTitle");

    const dialog = document.createElement("div");
    dialog.className = "video-modal-dialog";

    const header = document.createElement("header");
    header.className = "video-modal-header";
    const titleWrap = document.createElement("div");
    titleWrap.className = "video-modal-title-wrap";
    titleWrap.innerHTML = '<span class="video-showcase-kicker">NOW PLAYING</span>';
    const title = document.createElement("h2");
    title.id = "videoModalTitle";
    title.textContent = `${project.title} · Product Demo`;
    titleWrap.append(title);

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "video-modal-close";
    closeButton.setAttribute("aria-label", "Close video");
    closeButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
    header.append(titleWrap, closeButton);

    const frame = document.createElement("div");
    frame.className = "video-modal-frame";
    const loading = document.createElement("div");
    loading.className = "video-modal-loading";
    loading.setAttribute("role", "status");
    loading.innerHTML = '<span class="video-modal-spinner" aria-hidden="true"></span><span>Preparing your demo…</span>';

    const clip = document.createElement("div");
    clip.className = "video-modal-clip";
    const iframe = document.createElement("iframe");
    iframe.title = `${project.title} product demo`;
    iframe.src = `https://www.youtube-nocookie.com/embed/${project.demoVideoId}?autoplay=1&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.addEventListener("load", () => modal.classList.add("is-ready"), { once: true });
    clip.append(iframe);
    frame.append(loading, clip);
    dialog.append(header, frame);
    modal.append(dialog);

    let closing = false;
    const close = () => {
      if (closing) return;
      closing = true;
      iframe.remove();
      modal.classList.remove("is-open");
      modal.classList.add("is-closing");
      if (activeVideoModalClose === close) activeVideoModalClose = null;
      window.setTimeout(() => modal.remove(), 320);
      returnFocus?.focus({ preventScroll: true });
    };
    activeVideoModalClose = close;
    closeButton.addEventListener("click", close);
    modal.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const focusable = [...modal.querySelectorAll('button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    modal.addEventListener("click", (event) => {
      if (event.target === modal) close();
    });
    document.body.append(modal);
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      closeButton.focus({ preventScroll: true });
    });
  }

  /* Certificate lightbox: keep the source image full-size and remove it on close. */
  const certificateModal = $("#certificateModal");
  function openCertificate(returnFocus) {
    if (!certificateModal) return;
    const dialog = document.createElement("div");
    dialog.className = "certificate-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "certificateDialogTitle");
    const heading = document.createElement("h2");
    heading.id = "certificateDialogTitle";
    heading.textContent = "Full Stack Web Development — MERN Stack";
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "certificate-close";
    closeButton.setAttribute("aria-label", "Close certificate");
    closeButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
    const image = document.createElement("img");
    image.src = "/certificates/kimmit-mern-certificate.webp";
    image.width = 1600;
    image.height = 1131;
    image.alt = "Kimmit Academy Full Stack Web Development — MERN Stack certificate, May 2025";
    image.decoding = "async";
    const caption = document.createElement("p");
    caption.textContent = "Kimmit Academy · May 2025";
    dialog.append(closeButton, heading, image, caption);
    certificateModal.replaceChildren(dialog);
    certificateModal.setAttribute("aria-hidden", "false");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let closing = false;
    const close = () => {
      if (closing) return;
      closing = true;
      certificateModal.classList.remove("is-open");
      certificateModal.classList.add("is-closing");
      if (activeCertificateClose === close) activeCertificateClose = null;
      window.setTimeout(() => {
        certificateModal.replaceChildren();
        certificateModal.classList.remove("is-closing");
        certificateModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = previousOverflow;
      }, 220);
      returnFocus?.focus({ preventScroll: true });
    };
    activeCertificateClose = close;
    closeButton.addEventListener("click", close);
    certificateModal.onclick = (event) => { if (event.target === certificateModal) close(); };
    certificateModal.onkeydown = (event) => {
      if (event.key !== "Tab") return;
      const focusable = [...dialog.querySelectorAll('button:not([disabled]), a[href]')];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    requestAnimationFrame(() => {
      certificateModal.classList.add("is-open");
      closeButton.focus({ preventScroll: true });
    });
  }
  $("#certificateOpen")?.addEventListener("click", (event) => openCertificate(event.currentTarget));
  $("#certificateView")?.addEventListener("click", (event) => openCertificate(event.currentTarget));

  overlay?.addEventListener("click", closePanel);
  $("#panelClose")?.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (navMobile?.classList.contains("open")) { closeMobileNav(true); return; }
      if (activeCertificateClose) { activeCertificateClose(); return; }
      if (activeVideoModalClose) activeVideoModalClose();
      else closePanel();
      return;
    }
    if (e.key === "Tab" && activeProject && !activeVideoModalClose) {
      const focusable = [...panel.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (focusable.length) {
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    if (e.key === "Tab" && navMobile?.classList.contains("open")) {
      const items = [...navMobile.querySelectorAll("a")];
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    }
    if (!activeProject) return;
    if (e.key === "ArrowRight") goGallery(1);
    if (e.key === "ArrowLeft") goGallery(-1);
  });

  function renderPanel(p) {
    $("#panelNum").textContent = p.num;
    $("#panelTitle").textContent = p.title;
    $("#panelSubtitle").textContent = p.subtitle + " · " + p.badge;
    $("#panelOverview").textContent = p.overview;
    const videoSlot = $("#panelVideoShowcase");
    videoSlot.replaceChildren();
    videoSlot.hidden = !p.demoVideoId;
    if (p.demoVideoId) videoSlot.append(createVideoShowcase(p));
    $("#panelLive").href = p.live;
    $("#panelGithub").href = p.github;

    const mainImg = $("#galleryMainImg");
    mainImg.src = encodeURI(p.images[0]);
    mainImg.alt = p.title;
    mainImg.width = 1600;
    mainImg.height = 780;

    $("#galleryCounter").textContent = "1 / " + p.images.length;

    const thumbs = $("#galleryThumbs");
    thumbs.innerHTML = p.images
      .map(
        (src, i) =>
          `<button class="gallery-thumb${i === 0 ? " active" : ""}" data-idx="${i}" aria-label="Image ${i + 1}">
            <img src="/${encodeURI(src)}" width="1600" height="780" alt="" loading="lazy" decoding="async"/>
          </button>`
      )
      .join("");
    thumbs.querySelectorAll(".gallery-thumb").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        setGallery(+btn.dataset.idx);
      });
    });

    $("#panelFeatures").innerHTML = p.features
      .map((f) => `<div class="feature-card"><h4>${f.title}</h4><p>${f.desc}</p></div>`)
      .join("");

    $("#panelStack").innerHTML = p.stack.map((s) => `<span class="stack-pill">${s}</span>`).join("");

    $("#panelHighlights").innerHTML = p.highlights.map((h) => `<li>${h}</li>`).join("");

    panel.style.setProperty("--panel-accent", p.accent);
  }

  function setGallery(idx) {
    if (!activeProject) return;
    const len = activeProject.images.length;
    galleryIndex = ((idx % len) + len) % len;
    const src = activeProject.images[galleryIndex];
    const img = $("#galleryMainImg");
    img.style.opacity = "0";
    setTimeout(() => {
      img.src = encodeURI(src);
      img.style.opacity = "1";
    }, 180);
    $("#galleryCounter").textContent = galleryIndex + 1 + " / " + len;
    $$(".gallery-thumb").forEach((t, i) => t.classList.toggle("active", i === galleryIndex));
  }

  function goGallery(dir) {
    setGallery(galleryIndex + dir);
  }

  $("#galleryPrev")?.addEventListener("click", (e) => {
    e.stopPropagation();
    goGallery(-1);
  });
  $("#galleryNext")?.addEventListener("click", (e) => {
    e.stopPropagation();
    goGallery(1);
  });

  /* touch swipe gallery */
  const galleryMain = $(".gallery-main");
  galleryMain?.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );
  galleryMain?.addEventListener(
    "touchend",
    (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 50) goGallery(diff < 0 ? 1 : -1);
    },
    { passive: true }
  );

  /* ── Print resume ── */
  $("#printResume")?.addEventListener("click", () => window.print());

  /* ── Smooth anchor offset ── */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#") return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ── Typewriter ── */
  const typedText = $("#typewriter");
  if (typedText && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const roles = ["Full Stack Developer", "MERN Stack Expert", "AI Integrator", "Creative Coder"];
    let roleIdx = 0, charIdx = roles[0].length, isDel = true;
    function type() {
      const current = roles[roleIdx];
      charIdx += isDel ? -1 : 1;
      typedText.textContent = current.substring(0, charIdx);
      let speed = isDel ? 40 : 100;
      if (!isDel && charIdx === current.length) { speed = 2500; isDel = true; }
      else if (isDel && charIdx === 0) { isDel = false; roleIdx = (roleIdx + 1) % roles.length; speed = 450; }
      setTimeout(type, speed);
    }
    setTimeout(type, 3000);
  }

  onScroll();
})();

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  let activeProject = null;
  let galleryIndex = 0;
  let touchStartX = 0;

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
  navToggle?.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navMobile?.classList.toggle("open");
  });
  $$(".nav-mobile a, .nav-links a").forEach((a) => {
    a.addEventListener("click", () => {
      navToggle?.classList.remove("open");
      navMobile?.classList.remove("open");
    });
  });

  /* ── Reveal on scroll ── */
  const revealObs = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => revealObs.observe(el));

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

  const spyObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
        });
        updateIndicator();
      });
    },
    { threshold: 0.35, rootMargin: "-20% 0px -55% 0px" }
  );
  sections.forEach((s) => spyObs.observe(s));
  window.addEventListener("resize", updateIndicator);

  /* ── Build project rows ── */
  const projectsList = $("#projectsList");
  if (projectsList && typeof PROJECTS !== "undefined") {
    PROJECTS.forEach((p, i) => {
      const row = document.createElement("article");
      row.className = "project-row reveal";
      if (i > 0) row.style.transitionDelay = i * 0.06 + "s";
      row.dataset.id = p.id;
      row.setAttribute("role", "button");
      row.setAttribute("tabindex", "0");
      row.setAttribute("aria-label", `Open ${p.title} project details`);
      row.innerHTML = `
        <div class="project-num">${p.num}</div>
        <div class="project-row-body">
          <div>
            <div class="project-row-meta">
              <span class="project-tag${i === 0 ? " featured" : ""}">${p.badge}</span>
            </div>
            <h3 class="project-row-title">${p.title}</h3>
            <p class="project-row-sub">${p.subtitle}</p>
            <p class="project-row-desc">${p.overview.slice(0, 160)}…</p>
            <div class="project-row-tech">${p.stack.slice(0, 5).map((t) => `<span class="tech-chip">${t}</span>`).join("")}</div>
            <span class="project-open-hint">Explore project <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg></span>
          </div>
          <div class="project-thumb">
            <img src="${encodeURI(p.images[0])}" alt="${p.title} preview" loading="lazy"/>
          </div>
        </div>`;
      row.addEventListener("click", () => openPanel(p.id));
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPanel(p.id);
        }
      });
      projectsList.appendChild(row);
      revealObs.observe(row);
    });
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
  }

  function openPanel(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    activeProject = p;
    galleryIndex = 0;
    renderPanel(p);
    document.body.style.overflow = "hidden";
    overlay?.classList.add("open");
    panel?.classList.add("open");
    if (panelBody) panelBody.scrollTop = 0;
    if (scrollHint) scrollHint.classList.add("show");
  }

  function closePanel() {
    overlay?.classList.remove("open");
    panel?.classList.remove("open");
    document.body.style.overflow = "";
    activeProject = null;
    if (scrollHint) scrollHint.classList.remove("show");
  }

  overlay?.addEventListener("click", closePanel);
  $("#panelClose")?.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanel();
    if (!activeProject) return;
    if (e.key === "ArrowRight") goGallery(1);
    if (e.key === "ArrowLeft") goGallery(-1);
  });

  function renderPanel(p) {
    $("#panelNum").textContent = p.num;
    $("#panelTitle").textContent = p.title;
    $("#panelSubtitle").textContent = p.subtitle + " · " + p.badge;
    $("#panelOverview").textContent = p.overview;
    $("#panelLive").href = p.live;
    $("#panelGithub").href = p.github;

    const mainImg = $("#galleryMainImg");
    mainImg.src = encodeURI(p.images[0]);
    mainImg.alt = p.title;

    $("#galleryCounter").textContent = "1 / " + p.images.length;

    const thumbs = $("#galleryThumbs");
    thumbs.innerHTML = p.images
      .map(
        (src, i) =>
          `<button class="gallery-thumb${i === 0 ? " active" : ""}" data-idx="${i}" aria-label="Image ${i + 1}">
            <img src="${encodeURI(src)}" alt="" loading="lazy"/>
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
  if (typedText) {
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

  /* ── Premium Mouse Effects (Desktop only) ── */
  if (window.matchMedia("(pointer: fine)").matches) {
    const cursor = $(".custom-cursor");
    let cX = window.innerWidth / 2, cY = window.innerHeight / 2, mX = cX, mY = cY;
    const orbs = $$(".orb");
    const hCard = $(".hero-card");

    window.addEventListener("mousemove", (e) => {
      mX = e.clientX; mY = e.clientY;
      const xR = (mX / window.innerWidth) - 0.5, yR = (mY / window.innerHeight) - 0.5;
      
      orbs.forEach((o, i) => { o.style.translate = `${xR * (i + 1) * 20}px ${yR * (i + 1) * 20}px`; });
      if (hCard) hCard.style.translate = `${xR * -15}px ${yR * -15}px`;
    });

    function animCursor() {
      cX += (mX - cX) * 0.15; cY += (mY - cY) * 0.15;
      if (cursor) cursor.style.transform = `translate(${cX}px, ${cY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animCursor);
    }
    animCursor();

    $$("a, button, .project-row").forEach(el => {
      el.addEventListener("mouseenter", () => cursor?.classList.add("active"));
      el.addEventListener("mouseleave", () => cursor?.classList.remove("active"));
    });

    $$(".hero-links a").forEach(link => {
      link.addEventListener("mousemove", (e) => {
        const r = link.getBoundingClientRect();
        link.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.25}px ${(e.clientY - r.top - r.height / 2) * 0.25}px`;
      });
      link.addEventListener("mouseleave", () => link.style.translate = `0px 0px`);
    });
  }

  onScroll();
})();

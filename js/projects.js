const PROJECTS = [
  {
    id: "eduvision",
    num: "01",
    title: "EduVisionAI",
    subtitle: "AI-Powered Adaptive Learning Platform",
    badge: "Graduation Project · 2026",
    accent: "#9d8cff",
    accentSoft: "rgba(157, 140, 255, 0.14)",
    overview:
      "A full-stack intelligent learning platform that transforms any educational video, YouTube link, or document into a complete interactive study experience — automatically. Built as my graduation project, it runs a real multimodal AI pipeline from transcription to quizzes, flashcards, and contextual chat.",
    features: [
      { title: "AI Video Processing", desc: "Paste a YouTube URL or upload a file — Whisper transcribes, LLaMA 3.3 70B generates summaries, quizzes, and flashcards." },
      { title: "Interactive AI Chat", desc: "Per-video contextual chatbot that answers strictly from the content you uploaded." },
      { title: "Spaced Repetition", desc: "Flashcard engine with SM-2 scheduling so due cards surface at the right moment." },
      { title: "Real-Time Study Rooms", desc: "Multiplayer synchronized rooms via Socket.io — watch together, chat live, sync playback." },
      { title: "Gamification", desc: "XP, levels, streaks, badges, and a global leaderboard to keep learners engaged." },
      { title: "Bilingual Interface", desc: "Full Arabic / English UI with dynamic RTL/LTR switching." },
      { title: "Admin Dashboard", desc: "User management, content moderation, and subscription oversight." },
      { title: "Production Security", desc: "Helmet, rate limiting, MongoDB sanitization, JWT refresh tokens, and Docker deployment." }
    ],
    stack: ["Next.js 15", "React 19", "Node.js", "Express 5", "MongoDB", "Socket.io", "Groq LLaMA 3.3", "Whisper", "Docker", "Zustand", "Framer Motion"],
    highlights: [
      "End-to-end AI pipeline — not just an API wrapper",
      "30-min lecture fully processed in under 130 seconds",
      "Offline-capable demo mode on Vercel with real DB data",
      "Multi-tier AI fallback with key rotation for 99%+ uptime"
    ],
    live: "https://edu-vision-ai-rho.vercel.app",
    github: "https://github.com/youcieff/EduVisionAi",
    images: [
      "projects/EduVisionAI/project_image1_HomePage.png",
      "projects/EduVisionAI/project_image9_uploadContent.png",
      "projects/EduVisionAI/project_image11_studyContent.png",
      "projects/EduVisionAI/project_image15_flashcards.png",
      "projects/EduVisionAI/project_image19_chatWithContent.png",
      "projects/EduVisionAI/project_image20_Notes.png",
      "projects/EduVisionAI/project_image24_DailyReview.png",
      "projects/EduVisionAI/project_image7_adminPortal.png",
      "projects/EduVisionAI/Screenshot 2026-06-13 200913.png",
      "projects/EduVisionAI/Screenshot 2026-06-13 201143.png",
      "projects/EduVisionAI/Screenshot 2026-06-13 201926.png",
      "projects/EduVisionAI/Screenshot 2026-06-13 203234.png"
    ]
  },
  {
    id: "bookthebest",
    num: "02",
    title: "BookTheBest",
    subtitle: "Luxury Hotel Booking System",
    badge: "Full-Stack · 2025",
    accent: "#e8c547",
    accentSoft: "rgba(232, 197, 71, 0.12)",
    overview:
      "A MERN-stack luxury hotel booking platform with a glassmorphic dark UI. Users browse premium properties and reserve rooms end-to-end; admins manage inventory, live bookings, and guest communication through a dedicated console.",
    features: [
      { title: "Glassmorphism UI", desc: "Immersive dark-luxury interface with Framer Motion micro-interactions." },
      { title: "JWT + RBAC", desc: "Stateless authentication with bcrypt hashing and role-separated Admin / User flows." },
      { title: "Admin Console", desc: "Manage hotels, rooms, image uploads, and live booking status in real time." },
      { title: "WhatsApp Integration", desc: "Direct guest communication from the admin dashboard." },
      { title: "Validation Layer", desc: "Global Joi schema validation on every API endpoint." },
      { title: "Demo Mode", desc: "Frontend runs standalone on Vercel when the backend is unreachable." }
    ],
    stack: ["React 19", "Vite", "Framer Motion", "Node.js", "Express.js", "MongoDB", "JWT", "Multer", "Joi", "RBAC"],
    highlights: [
      "Complete booking lifecycle from browse to confirmation",
      "Multer-powered image upload for room galleries",
      "Full Postman collection for every API endpoint"
    ],
    live: "https://project-23ruj.vercel.app",
    github: "https://github.com/youcieff/Book-The-Best-Luxury-Hotel-Booking-System-",
    images: [
      "projects/Booking-system/1.png",
      "projects/Booking-system/2.png",
      "projects/Booking-system/3.png",
      "projects/Booking-system/4.png",
      "projects/Booking-system/5.png"
    ]
  },
  {
    id: "velora",
    num: "03",
    title: "Velora",
    subtitle: "Luxury E-Commerce Platform",
    badge: "Monorepo · Full-Stack",
    accent: "#6eb5ff",
    accentSoft: "rgba(110, 181, 255, 0.12)",
    overview:
      "A production-grade e-commerce platform wrapped in a Midnight Sapphire glassmorphic aesthetic. Monorepo architecture with Express backend and Next.js 15 frontend — product discovery, cart, checkout, and admin CRUD with bilingual Arabic/English support.",
    features: [
      { title: "Glassmorphic Design System", desc: "Custom Tailwind v4 tokens, HSL variables, and Framer Motion micro-animations." },
      { title: "Bilingual Commerce", desc: "Full RTL/LTR switching with i18next — search works across Arabic and English keywords." },
      { title: "Smart Search", desc: "Client-side filtering against names, descriptions, and multilingual keyword arrays." },
      { title: "Global Cart", desc: "Context-powered cart with LocalStorage persistence and sliding glass drawer." },
      { title: "Admin Dashboard", desc: "Protected /admin area with full CRUD for products and categories." },
      { title: "JWT + RBAC", desc: "Secure auth separating USER and ADMIN roles with Joi validation on both layers." }
    ],
    stack: ["Next.js 15", "Tailwind CSS v4", "Framer Motion", "i18next", "Node.js", "Express.js", "MongoDB", "JWT", "Joi"],
    highlights: [
      "Zero-dependency multilingual search engine",
      "Fixed React lifecycle violations in cart state management",
      "Unified 127.0.0.1 API calls to avoid Windows IPv6 resolution issues"
    ],
    live: "https://velorea-e-commerce-website-vfdi.vercel.app",
    github: "https://github.com/youcieff/VELOREA_E_commerce_website",
    images: [
      "projects/velorea-e-commerce/1.png",
      "projects/velorea-e-commerce/2.png",
      "projects/velorea-e-commerce/3.png",
      "projects/velorea-e-commerce/4.png",
      "projects/velorea-e-commerce/5.png"
    ]
  },
  {
    id: "talabat",
    num: "04",
    title: "Talabat Junior",
    subtitle: "Neon-Cyberpunk Food Delivery",
    badge: "Full-Stack · Bilingual",
    accent: "#ff4fd8",
    accentSoft: "rgba(255, 79, 216, 0.12)",
    overview:
      "A high-performance bilingual food delivery platform with a striking Neon-Cyberpunk aesthetic. Glassmorphic UI, fluid animations, and a complete customer journey from discovery to checkout — plus a secure admin portal for restaurants, menus, and promo codes.",
    features: [
      { title: "Instant Localization", desc: "English ↔ Arabic toggle without page reload via Context-based translation." },
      { title: "Demo-Mode Architecture", desc: "Data fallback injects structural mock data when the API is unreachable — 100% uptime showcase." },
      { title: "Full E-Commerce Flow", desc: "Cart, checkout, and dynamic offers/promo code system via React Context." },
      { title: "Admin Dashboard", desc: "JWT + RBAC protected CRUD for restaurants, menu items, and promotions." },
      { title: "Cyberpunk UI", desc: "Glowing neon accents, deep dark modes, and Framer Motion engagement layers." }
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Node.js", "Express.js", "MongoDB", "JWT", "Context API"],
    highlights: [
      "Offline-first demo architecture for zero-downtime Vercel deployment",
      "Lucide icons + Axios with structured API layer",
      "Admin portal with full content management"
    ],
    live: "https://talabat-junior-delevery-website.vercel.app",
    github: "https://github.com/youcieff/Talabat_Junior-Delevery_website-",
    images: [
      "projects/talabat-junior-delevery/1.png",
      "projects/talabat-junior-delevery/2.png",
      "projects/talabat-junior-delevery/3.png",
      "projects/talabat-junior-delevery/4.png",
      "projects/talabat-junior-delevery/5.png"
    ]
  },
  {
    id: "flowboard",
    num: "05",
    title: "FlowBoard",
    subtitle: "Project Management SaaS",
    badge: "Frontend-First · UI Engineering",
    accent: "#34d399",
    accentSoft: "rgba(52, 211, 153, 0.12)",
    overview:
      "A sleek, zero-latency project management dashboard built frontend-first. Native HTML5 drag-and-drop Kanban, dynamic RBAC simulation, custom SVG data viz, and persistent local state — all without a backend database.",
    features: [
      { title: "Native Drag-and-Drop Kanban", desc: "HTML5 DnD API for fluid task transitions across To Do → Done columns." },
      { title: "RBAC Simulator", desc: "Real-time role switcher (Admin / Member / Viewer) that locks write ops for viewers." },
      { title: "Custom SVG Charts", desc: "Lightweight KPI gauges and workload viz — no heavy charting libraries." },
      { title: "Task Detail Modal", desc: "Subtasks, comments, editable fields, and automated audit trail." },
      { title: "Persistent State", desc: "BoardContext + localStorage sync survives hard reloads instantly." }
    ],
    stack: ["Next.js 15", "React", "Tailwind CSS v4", "HTML5 Drag & Drop", "Context API", "LocalStorage", "SVG"],
    highlights: [
      "Synchronized state across Dashboard, Kanban, Modals, and Activity feed",
      "Strict Dark Slate + Emerald Neon design system with 2px geometric borders",
      "GPU-accelerated micro-animations throughout"
    ],
    live: "https://project-management-team-collaborati-beta.vercel.app",
    github: "https://github.com/youcieff/Project-Management-Team-Collaboration",
    images: [
      "projects/project-management-team-collaboration/1.png",
      "projects/project-management-team-collaboration/2.png",
      "projects/project-management-team-collaboration/3.png"
    ]
  }
];

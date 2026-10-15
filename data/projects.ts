import type { Project } from "@/data/types";

export const projects = [
  {
    slug: "celia-games",
    title: "Celia Games",
    subtitle: "Arabic-first multiplayer game collection",
    badge: "React · WebRTC · 2026",
    year: "2026",
    tags: ["games", "full-stack"],
    overview:
      "A mobile-first collection of classic games, playable locally or online with friends through PeerJS and WebRTC. Built with an Arabic-first RTL interface, touch-friendly controls, and a polished dark visual style.",
    features: [
      {
        title: "Peer-to-Peer Multiplayer",
        desc: "Online matches connect through PeerJS and WebRTC without a custom game server.",
      },
      {
        title: "A Growing Game Collection",
        desc: "Includes Sea Battle, Dots & Boxes, Guess the Code, Memory Match, Ultimate Tic-Tac-Toe, Connect 4, Guess the Word, and Tic-Tac-Toe.",
      },
      {
        title: "Arabic RTL Interface",
        desc: "Native Arabic typography and right-to-left layouts across the game experience.",
      },
      {
        title: "Mobile-First Controls",
        desc: "Touch-friendly interactions, including swipe placement for Sea Battle.",
      },
      {
        title: "Local and Online Play",
        desc: "Play on one device or invite a friend to join an online match.",
      },
      {
        title: "Polished Visual Design",
        desc: "Dark glass panels, gradient lighting, and fluid animations.",
      },
    ],
    stack: ["React", "Vite", "Tailwind CSS v3", "PeerJS", "WebRTC"],
    highlights: [
      "Classic games gathered in one responsive platform",
      "Peer-to-peer online matches without a custom backend",
      "Arabic RTL experience designed for touch screens",
    ],
    live: "https://celia-games-nine.vercel.app/",
    github: "https://github.com/youcieff/Celia-Games-",
    demoVideoId: "39vIVc98_gQ",
    images: [
      {
        src: "/images/projects/celia-games/2.webp",
        width: 610,
        height: 1356,
        alt: "Celia Games screenshot 1",
      },
      {
        src: "/images/projects/celia-games/1.webp",
        width: 610,
        height: 1356,
        alt: "Celia Games screenshot 2",
      },
      {
        src: "/images/projects/celia-games/3.webp",
        width: 610,
        height: 1356,
        alt: "Celia Games screenshot 3",
      },
      {
        src: "/images/projects/celia-games/4.webp",
        width: 610,
        height: 1356,
        alt: "Celia Games screenshot 4",
      },
      {
        src: "/images/projects/celia-games/5.webp",
        width: 610,
        height: 1356,
        alt: "Celia Games screenshot 5",
      },
      {
        src: "/images/projects/celia-games/6.webp",
        width: 610,
        height: 1356,
        alt: "Celia Games screenshot 6",
      },
      {
        src: "/images/projects/celia-games/7.webp",
        width: 610,
        height: 1356,
        alt: "Celia Games screenshot 7",
      },
    ],
    frame: "phone",
  },
  {
    slug: "eduvisionai",
    title: "EduVisionAI",
    subtitle: "AI-Powered Adaptive Learning Platform",
    badge: "Graduation Project · 2026",
    year: "2026",
    tags: ["ai", "full-stack"],
    overview:
      "A full-stack intelligent learning platform that transforms any educational video, YouTube link, or document into a complete interactive study experience — automatically. Built as my graduation project, it runs a real multimodal AI pipeline from transcription to quizzes, flashcards, and contextual chat.",
    features: [
      {
        title: "AI Video Processing",
        desc: "Paste a YouTube URL or upload a file — Whisper transcribes, LLaMA 3.3 70B generates summaries, quizzes, and flashcards.",
      },
      {
        title: "Interactive AI Chat",
        desc: "Per-video contextual chatbot that answers strictly from the content you uploaded.",
      },
      {
        title: "Spaced Repetition",
        desc: "Flashcard engine with SM-2 scheduling so due cards surface at the right moment.",
      },
      {
        title: "Real-Time Study Rooms",
        desc: "Multiplayer synchronized rooms via Socket.io — watch together, chat live, sync playback.",
      },
      {
        title: "Gamification",
        desc: "XP, levels, streaks, badges, and a global leaderboard to keep learners engaged.",
      },
      {
        title: "Bilingual Interface",
        desc: "Full Arabic / English UI with dynamic RTL/LTR switching.",
      },
      {
        title: "Admin Dashboard",
        desc: "User management, content moderation, and subscription oversight.",
      },
      {
        title: "Production Security",
        desc: "Helmet, rate limiting, MongoDB sanitization, JWT refresh tokens, and Docker deployment.",
      },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "Node.js",
      "Express 5",
      "MongoDB",
      "Socket.io",
      "Groq LLaMA 3.3",
      "Whisper",
      "Docker",
      "Zustand",
      "Framer Motion",
    ],
    highlights: [
      "End-to-end AI pipeline — not just an API wrapper",
      "30-min lecture fully processed in under 130 seconds",
      "Offline-capable demo mode on Vercel with real DB data",
      "Multi-tier AI fallback with key rotation for 99%+ uptime",
    ],
    live: "https://edu-vision-ai-rho.vercel.app",
    github: "https://github.com/youcieff/EduVisionAi",
    demoVideoId: "pktlQBT3Zuk",
    images: [
      {
        src: "/images/projects/eduvisionai/project_image1_HomePage.webp",
        width: 1600,
        height: 774,
        alt: "EduVisionAI screenshot 1",
      },
      {
        src: "/images/projects/eduvisionai/project_image9_uploadContent.webp",
        width: 1600,
        height: 780,
        alt: "EduVisionAI screenshot 2",
      },
      {
        src: "/images/projects/eduvisionai/project_image11_studyContent.webp",
        width: 1600,
        height: 768,
        alt: "EduVisionAI screenshot 3",
      },
      {
        src: "/images/projects/eduvisionai/project_image15_flashcards.webp",
        width: 1123,
        height: 716,
        alt: "EduVisionAI screenshot 4",
      },
      {
        src: "/images/projects/eduvisionai/project_image19_chatWithContent.webp",
        width: 1162,
        height: 858,
        alt: "EduVisionAI screenshot 5",
      },
      {
        src: "/images/projects/eduvisionai/project_image20_Notes.webp",
        width: 1241,
        height: 808,
        alt: "EduVisionAI screenshot 6",
      },
      {
        src: "/images/projects/eduvisionai/project_image24_DailyReview.webp",
        width: 1488,
        height: 788,
        alt: "EduVisionAI screenshot 7",
      },
      {
        src: "/images/projects/eduvisionai/project_image7_adminPortal.webp",
        width: 1542,
        height: 902,
        alt: "EduVisionAI screenshot 8",
      },
      {
        src: "/images/projects/eduvisionai/Screenshot 2026-06-13 200913.webp",
        width: 902,
        height: 732,
        alt: "EduVisionAI screenshot 9",
      },
      {
        src: "/images/projects/eduvisionai/Screenshot 2026-06-13 201143.webp",
        width: 892,
        height: 718,
        alt: "EduVisionAI screenshot 10",
      },
      {
        src: "/images/projects/eduvisionai/Screenshot 2026-06-13 201926.webp",
        width: 862,
        height: 758,
        alt: "EduVisionAI screenshot 11",
      },
      {
        src: "/images/projects/eduvisionai/Screenshot 2026-06-13 203234.webp",
        width: 482,
        height: 768,
        alt: "EduVisionAI screenshot 12",
      },
    ],
    frame: "browser",
  },
  {
    slug: "bookthebest",
    title: "BookTheBest",
    subtitle: "Luxury Hotel Booking System",
    badge: "Full-Stack · 2025",
    year: "2025",
    tags: ["full-stack"],
    overview:
      "A MERN-stack luxury hotel booking platform with a glassmorphic dark UI. Users browse premium properties and reserve rooms end-to-end; admins manage inventory, live bookings, and guest communication through a dedicated console.",
    features: [
      {
        title: "Glassmorphism UI",
        desc: "Immersive dark-luxury interface with Framer Motion micro-interactions.",
      },
      {
        title: "JWT + RBAC",
        desc: "Stateless authentication with bcrypt hashing and role-separated Admin / User flows.",
      },
      {
        title: "Admin Console",
        desc: "Manage hotels, rooms, image uploads, and live booking status in real time.",
      },
      {
        title: "WhatsApp Integration",
        desc: "Direct guest communication from the admin dashboard.",
      },
      {
        title: "Validation Layer",
        desc: "Global Joi schema validation on every API endpoint.",
      },
      {
        title: "Demo Mode",
        desc: "Frontend runs standalone on Vercel when the backend is unreachable.",
      },
    ],
    stack: [
      "React 19",
      "Vite",
      "Framer Motion",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Multer",
      "Joi",
      "RBAC",
    ],
    highlights: [
      "Complete booking lifecycle from browse to confirmation",
      "Multer-powered image upload for room galleries",
      "Full Postman collection for every API endpoint",
    ],
    live: "https://project-23ruj.vercel.app",
    github: "https://github.com/youcieff/Book-The-Best-Luxury-Hotel-Booking-System-",
    images: [
      {
        src: "/images/projects/bookthebest/1.webp",
        width: 1600,
        height: 788,
        alt: "BookTheBest screenshot 1",
      },
      {
        src: "/images/projects/bookthebest/2.webp",
        width: 1600,
        height: 734,
        alt: "BookTheBest screenshot 2",
      },
      {
        src: "/images/projects/bookthebest/3.webp",
        width: 1600,
        height: 722,
        alt: "BookTheBest screenshot 3",
      },
      {
        src: "/images/projects/bookthebest/4.webp",
        width: 1600,
        height: 792,
        alt: "BookTheBest screenshot 4",
      },
      {
        src: "/images/projects/bookthebest/5.webp",
        width: 1600,
        height: 802,
        alt: "BookTheBest screenshot 5",
      },
    ],
    frame: "browser",
  },
  {
    slug: "velora",
    title: "Velora",
    subtitle: "Luxury E-Commerce Platform",
    badge: "Monorepo · Full-Stack",
    year: "2025",
    tags: ["full-stack", "e-commerce"],
    overview:
      "A production-grade e-commerce platform wrapped in a Midnight Sapphire glassmorphic aesthetic. Monorepo architecture with Express backend and Next.js 15 frontend — product discovery, cart, checkout, and admin CRUD with bilingual Arabic/English support.",
    features: [
      {
        title: "Glassmorphic Design System",
        desc: "Custom Tailwind v4 tokens, HSL variables, and Framer Motion micro-animations.",
      },
      {
        title: "Bilingual Commerce",
        desc: "Full RTL/LTR switching with i18next — search works across Arabic and English keywords.",
      },
      {
        title: "Smart Search",
        desc: "Client-side filtering against names, descriptions, and multilingual keyword arrays.",
      },
      {
        title: "Global Cart",
        desc: "Context-powered cart with LocalStorage persistence and sliding glass drawer.",
      },
      {
        title: "Admin Dashboard",
        desc: "Protected /admin area with full CRUD for products and categories.",
      },
      {
        title: "JWT + RBAC",
        desc: "Secure auth separating USER and ADMIN roles with Joi validation on both layers.",
      },
    ],
    stack: [
      "Next.js 15",
      "Tailwind CSS v4",
      "Framer Motion",
      "i18next",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Joi",
    ],
    highlights: [
      "Zero-dependency multilingual search engine",
      "Fixed React lifecycle violations in cart state management",
      "Unified 127.0.0.1 API calls to avoid Windows IPv6 resolution issues",
    ],
    live: "https://velorea-e-commerce-website-vfdi.vercel.app",
    github: "https://github.com/youcieff/VELOREA_E_commerce_website",
    images: [
      {
        src: "/images/projects/velora/1.webp",
        width: 1600,
        height: 782,
        alt: "Velora screenshot 1",
      },
      {
        src: "/images/projects/velora/2.webp",
        width: 1600,
        height: 728,
        alt: "Velora screenshot 2",
      },
      {
        src: "/images/projects/velora/3.webp",
        width: 1600,
        height: 680,
        alt: "Velora screenshot 3",
      },
      {
        src: "/images/projects/velora/4.webp",
        width: 1600,
        height: 732,
        alt: "Velora screenshot 4",
      },
      {
        src: "/images/projects/velora/5.webp",
        width: 1600,
        height: 764,
        alt: "Velora screenshot 5",
      },
    ],
    frame: "browser",
  },
  {
    slug: "talabat-junior",
    title: "Talabat Junior",
    subtitle: "Neon-Cyberpunk Food Delivery",
    badge: "Full-Stack · Bilingual",
    year: "2025",
    tags: ["full-stack", "e-commerce"],
    overview:
      "A high-performance bilingual food delivery platform with a striking Neon-Cyberpunk aesthetic. Glassmorphic UI, fluid animations, and a complete customer journey from discovery to checkout — plus a secure admin portal for restaurants, menus, and promo codes.",
    features: [
      {
        title: "Instant Localization",
        desc: "English ↔ Arabic toggle without page reload via Context-based translation.",
      },
      {
        title: "Demo-Mode Architecture",
        desc: "Data fallback injects structural mock data when the API is unreachable — 100% uptime showcase.",
      },
      {
        title: "Full E-Commerce Flow",
        desc: "Cart, checkout, and dynamic offers/promo code system via React Context.",
      },
      {
        title: "Admin Dashboard",
        desc: "JWT + RBAC protected CRUD for restaurants, menu items, and promotions.",
      },
      {
        title: "Cyberpunk UI",
        desc: "Glowing neon accents, deep dark modes, and Framer Motion engagement layers.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Context API",
    ],
    highlights: [
      "Offline-first demo architecture for zero-downtime Vercel deployment",
      "Lucide icons + Axios with structured API layer",
      "Admin portal with full content management",
    ],
    live: "https://talabat-junior-delevery-website.vercel.app",
    github: "https://github.com/youcieff/Talabat_Junior-Delevery_website-",
    images: [
      {
        src: "/images/projects/talabat-junior/1.webp",
        width: 1600,
        height: 782,
        alt: "Talabat Junior screenshot 1",
      },
      {
        src: "/images/projects/talabat-junior/2.webp",
        width: 1600,
        height: 784,
        alt: "Talabat Junior screenshot 2",
      },
      {
        src: "/images/projects/talabat-junior/3.webp",
        width: 1600,
        height: 796,
        alt: "Talabat Junior screenshot 3",
      },
      {
        src: "/images/projects/talabat-junior/4.webp",
        width: 1600,
        height: 790,
        alt: "Talabat Junior screenshot 4",
      },
      {
        src: "/images/projects/talabat-junior/5.webp",
        width: 1600,
        height: 714,
        alt: "Talabat Junior screenshot 5",
      },
    ],
    frame: "browser",
  },
  {
    slug: "flowboard",
    title: "FlowBoard",
    subtitle: "Project Management SaaS",
    badge: "Frontend-First · UI Engineering",
    year: "2025",
    tags: ["frontend"],
    overview:
      "A sleek, zero-latency project management dashboard built frontend-first. Native HTML5 drag-and-drop Kanban, dynamic RBAC simulation, custom SVG data viz, and persistent local state — all without a backend database.",
    features: [
      {
        title: "Native Drag-and-Drop Kanban",
        desc: "HTML5 DnD API for fluid task transitions across To Do → Done columns.",
      },
      {
        title: "RBAC Simulator",
        desc: "Real-time role switcher (Admin / Member / Viewer) that locks write ops for viewers.",
      },
      {
        title: "Custom SVG Charts",
        desc: "Lightweight KPI gauges and workload viz — no heavy charting libraries.",
      },
      {
        title: "Task Detail Modal",
        desc: "Subtasks, comments, editable fields, and automated audit trail.",
      },
      {
        title: "Persistent State",
        desc: "BoardContext + localStorage sync survives hard reloads instantly.",
      },
    ],
    stack: [
      "Next.js 15",
      "React",
      "Tailwind CSS v4",
      "HTML5 Drag & Drop",
      "Context API",
      "LocalStorage",
      "SVG",
    ],
    highlights: [
      "Synchronized state across Dashboard, Kanban, Modals, and Activity feed",
      "Strict Dark Slate + Emerald Neon design system with 2px geometric borders",
      "GPU-accelerated micro-animations throughout",
    ],
    live: "https://project-management-team-collaborati-beta.vercel.app",
    github: "https://github.com/youcieff/Project-Management-Team-Collaboration",
    images: [
      {
        src: "/images/projects/flowboard/1.webp",
        width: 1600,
        height: 782,
        alt: "FlowBoard screenshot 1",
      },
      {
        src: "/images/projects/flowboard/2.webp",
        width: 1600,
        height: 778,
        alt: "FlowBoard screenshot 2",
      },
      {
        src: "/images/projects/flowboard/3.webp",
        width: 1600,
        height: 780,
        alt: "FlowBoard screenshot 3",
      },
    ],
    frame: "browser",
  },
] satisfies Project[];

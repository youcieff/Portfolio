import { workExperience } from "@/data/experience";
import { education } from "@/data/education";
import { certification } from "@/data/certifications";
import { projects } from "@/data/projects";
import { resumeSkillGroups } from "@/data/skills";
import type { ResumeProject } from "@/data/types";

export const resume = {
  role: "Full Stack Developer · MERN Stack · AI Integration",
  summary:
    "Full Stack Developer with a B.Sc. in Computer Science & AI, focused on React, Node.js, and MongoDB. I’ve built web projects across AI-assisted learning, commerce, booking, food delivery, project management, and multiplayer games. Before software, customer-facing and hands-on technical roles taught me to listen closely, work carefully, and communicate clearly.",
  printSummary:
    "Full Stack Developer with a B.Sc. in Computer Science & AI, focused on React, Node.js, and MongoDB. Built web projects across AI-assisted learning, commerce, booking, food delivery, project management, and multiplayer games. Brings clear communication and careful execution from previous technical and customer-facing roles.",
  skillGroups: resumeSkillGroups,
  projectData: projects,
  projects: [
    {
      title: "Celia Games — Arabic-First Multiplayer Game Collection",
      meta: "Personal Project · 2026 · React, Vite, Tailwind CSS, PeerJS, WebRTC",
      bullets: [
        "Built a responsive collection of classic games with local play and real-time peer-to-peer matches through WebRTC.",
        "Designed Arabic RTL layouts and touch-friendly mobile controls, including swipe placement in Sea Battle.",
      ],
    },
    {
      title: "EduVisionAI — AI-Powered Adaptive Learning Platform",
      meta: "Graduation Project · 2026 · Next.js 15, Node.js, MongoDB, LLaMA-3 70B, Whisper, Socket.io, Docker",
      bullets: [
        "Built an end-to-end SaaS EdTech platform transforming YouTube links, videos, PDFs, and images into interactive study experiences (summaries, quizzes, flashcards, mind maps) via a multimodal AI pipeline — processing a 30-min lecture in under 130 seconds",
        "Engineered real-time collaborative study rooms (Socket.io), a gamification system (XP, skill tree, leaderboard), and spaced-repetition flashcards (SM-2 algorithm)",
        "Shipped production-grade security (Helmet, rate limiting, JWT refresh tokens, MongoDB sanitization) and a multi-tier AI fallback system with key rotation for 99%+ uptime",
      ],
    },
    {
      title: "BookTheBest — Luxury Hotel Booking System",
      meta: "Full-Stack · 2025 · React.js, Vite, Node.js, Express.js, MongoDB, JWT, Multer, Joi",
      bullets: [
        "Developed a complete hotel booking platform with dark-luxury glassmorphic UI, JWT + bcrypt auth, and RBAC separating Admin and User dashboards",
        "Built Admin Console with real-time inventory management, live booking tracking, WhatsApp guest integration, and Multer-powered image uploads",
        "Applied Joi global request validation, pagination on listing endpoints, and a full Postman API collection",
      ],
    },
    {
      title: "Velora — Luxury E-Commerce Platform",
      meta: "Full-Stack · 2025 · Next.js 15, Tailwind CSS v4, Node.js, MongoDB, JWT, Framer Motion, i18next",
      bullets: [
        "Built a bilingual (AR/EN) e-commerce platform with full RTL/LTR switching, glassmorphic design system, JWT auth, RBAC, and Admin Dashboard with full product/category CRUD",
        "Engineered multilingual smart search matching against bilingual keyword metadata; global cart with localStorage persistence and Framer Motion micro-animations",
      ],
    },
    {
      title: "Talabat Junior — Bilingual Food Delivery Platform",
      meta: "Full-Stack · 2025 · Next.js, Tailwind CSS, Node.js, MongoDB, JWT, Framer Motion",
      bullets: [
        "Full-stack food delivery app with bilingual support, Neon-Cyberpunk UI, complete cart/checkout/promo flow, and JWT + RBAC admin dashboard",
        "Engineered a Demo Mode with client-side data fallback mechanism ensuring 100% Vercel uptime without a live backend",
      ],
    },
    {
      title: "FlowBoard — Project Management SaaS Dashboard",
      meta: "Frontend · 2025 · Next.js 15, Tailwind CSS v4, React Context API, HTML5 Drag & Drop",
      bullets: [
        "Kanban dashboard with native HTML5 Drag & Drop, real-time RBAC Role Switcher (Admin/Member/Viewer), and full board state persisted via localStorage",
        "Designed bespoke SVG/CSS KPI charts and radial gauges for team workload visualization — no external charting libraries",
      ],
    },
  ] satisfies ResumeProject[],
  workExperience,
  education,
  certification,
  printEducation: {
    degree: "B.Sc. Computer Science & AI — Software Engineering",
    period: "Sep 2022 – May 2026",
    school: "Capital University · Faculty of Computer Science & AI · Cairo, Egypt",
    project: "EduVisionAI — AI-powered adaptive learning platform",
  },
  languages: ["Arabic — Native (C2)", "English — Intermediate (B1)"],
  interests: [
    "Artificial Intelligence & LLMs",
    "Full Stack Development",
    "EdTech",
    "Open Source",
    "UI/UX Design",
  ],
  printInterests:
    "Artificial Intelligence & LLMs · Full Stack Development · EdTech · Open Source · UI/UX Design",
} as const;

import type { SkillGroup } from "@/data/types";

export const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js 15",
      "JavaScript ES6+",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Flow",
      "Zustand",
      "Vite",
      "i18next",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "REST APIs",
      "JWT Auth",
      "WebSockets",
      "Socket.io",
      "RBAC",
      "Joi",
    ],
  },
  {
    title: "AI & Integrations",
    skills: [
      "LLaMA 3.3 (Groq)",
      "OpenAI Whisper",
      "ElevenLabs TTS",
      "Semantic Chunking",
      "SM-2 Algorithm",
      "RAG",
      "FFmpeg",
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      "Git & GitHub",
      "Docker",
      "Vercel",
      "Postman",
      "Linux",
      "Multer",
      "Helmet",
      "Rate Limiting",
    ],
  },
] satisfies SkillGroup[];

export const resumeSkillGroups = [
  {
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js 15",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS v4",
      "Framer Motion",
      "Zustand",
      "React Flow",
      "Vite",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "REST APIs",
      "JWT + Refresh Tokens",
      "Socket.io",
      "RBAC",
      "Joi",
      "Multer",
      "Nodemailer",
    ],
  },
  {
    title: "AI & ML",
    skills: [
      "LLaMA-3 70B (Groq LPU)",
      "OpenAI Whisper",
      "ElevenLabs TTS",
      "SM-2 Algorithm",
      "Semantic Chunking",
      "RAG",
    ],
  },
  {
    title: "DevOps",
    skills: ["Git", "GitHub", "Docker", "Vercel", "Postman", "Linux", "npm"],
  },
] satisfies SkillGroup[];

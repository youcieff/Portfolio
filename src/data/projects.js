const projectAssets = import.meta.glob("/projects/**/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const projectImage = (path) => projectAssets[`/projects/${path}`] || `/projects/${path}`;
const imageSet = (folder, count, extension = "webp") =>
  Array.from({ length: count }, (_, index) => projectImage(`${folder}/${index + 1}.${extension}`));

export const projects = [
  {
    id: "celia-games", name: "Celia Games", category: "Multiplayer", year: "2026",
    intro: "Eight Arabic-first games, ready for a quick match with a friend.",
    description: "A mobile-first collection of familiar games with online peer-to-peer matches, local play, and an interface designed from the start for Arabic and touch screens.",
    stack: ["React", "Vite", "Tailwind CSS", "PeerJS", "WebRTC"],
    highlights: ["Eight games in one place", "Peer-to-peer online matches", "Arabic RTL and touch-friendly controls"],
    live: "https://celia-games-nine.vercel.app/", github: "https://github.com/youcieff/Celia-Games-",
    images: imageSet("CeliaGames", 7, "webp"),
  },
  {
    id: "eduvision", name: "EduVisionAI", category: "AI · EdTech", year: "2026",
    intro: "Turn a lecture or document into a study session that works for you.",
    description: "An AI-powered learning platform that turns videos, YouTube links, and documents into summaries, quizzes, flashcards, and content-aware chat. Built as a graduation project.",
    stack: ["Next.js", "React", "Node.js", "Express", "MongoDB", "Socket.io", "Groq", "Whisper"],
    highlights: ["AI transcription and study materials", "Contextual chat and spaced-repetition cards", "Collaborative study rooms and Arabic/English UI"],
    live: "https://edu-vision-ai-rho.vercel.app", github: "https://github.com/youcieff/EduVisionAi",
    images: ["project_image1_HomePage.webp", "project_image9_uploadContent.webp", "project_image11_studyContent.webp", "project_image15_flashcards.webp", "project_image19_chatWithContent.webp", "project_image20_Notes.webp", "project_image24_DailyReview.webp", "project_image7_adminPortal.webp"].map((path) => projectImage(`EduVisionAI/${path}`)),
  },
  {
    id: "bookthebest", name: "BookTheBest", category: "Full stack", year: "2025",
    intro: "A hotel booking journey with a considered, luxury feel.",
    description: "A full-stack hotel booking platform for browsing properties and booking rooms, with a separate admin console for rooms, availability, and guest communication.",
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "JWT", "Joi"],
    highlights: ["Complete booking flow", "Role-based admin console", "Room image management and WhatsApp contact"],
    live: "https://project-23ruj.vercel.app", github: "https://github.com/youcieff/Book-The-Best-Luxury-Hotel-Booking-System-",
    images: imageSet("Booking-system", 5),
  },
  {
    id: "velora", name: "Velora", category: "E-commerce", year: "2025",
    intro: "A bilingual shopping experience with a little midnight-sapphire polish.",
    description: "A full-stack storefront with product search, persistent cart, checkout, protected admin tools, and Arabic/English support.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "i18next", "Express", "MongoDB"],
    highlights: ["Arabic and English shopping", "Persistent cart and product search", "Admin product and category management"],
    live: "https://velorea-e-commerce-website-vfdi.vercel.app", github: "https://github.com/youcieff/VELOREA_E_commerce_website",
    images: imageSet("velorea-e-commerce", 5),
  },
  {
    id: "talabat", name: "Talabat Junior", category: "E-commerce", year: "2025",
    intro: "A bilingual food-ordering demo with a bright cyberpunk streak.",
    description: "A food delivery experience covering restaurant discovery, menus, cart, checkout, offers, and a protected restaurant admin portal.",
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Express", "MongoDB"],
    highlights: ["Arabic/English switching", "Restaurant and menu management", "Demo mode for reliable previews"],
    live: "https://talabat-junior-delevery-website.vercel.app", github: "https://github.com/youcieff/Talabat_Junior-Delevery_website-",
    images: imageSet("talabat-junior-delevery", 5),
  },
  {
    id: "flowboard", name: "FlowBoard", category: "Productivity", year: "2025",
    intro: "A hands-on Kanban board for keeping a team’s work moving.",
    description: "A frontend-first project management dashboard with a draggable board, role-aware controls, activity history, and persistent local state.",
    stack: ["Next.js", "React", "Tailwind CSS", "Context API", "SVG"],
    highlights: ["Drag-and-drop Kanban board", "Role-based interface", "Persistent tasks and activity feed"],
    live: "https://project-management-team-collaborati-beta.vercel.app", github: "https://github.com/youcieff/Project-Management-Team-Collaboration",
    images: imageSet("project-management-team-collaboration", 3),
  },
];

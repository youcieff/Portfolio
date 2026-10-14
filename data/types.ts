export type ProjectImage = {
  src: `/projects/${string}`;
  width: number;
  height: number;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  year: string | null;
  tags: string[];
  overview: string;
  features: { title: string; desc: string }[];
  stack: string[];
  highlights: string[];
  live: string;
  github: string;
  demoVideoId?: string;
  images: ProjectImage[];
  frame: "browser" | "phone";
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type ResumeProject = {
  title: string;
  meta: string;
  bullets: string[];
};

import { PERSONAL_INFO, SERVICES, WORK_PROJECTS } from "./constants";

export type Entry = {
  title: string;
  href: string;
  summary: string;
  meta?: string;
  poem?: boolean;
};

export const site = {
  name: PERSONAL_INFO.name,
  initials: "SM",
  role: PERSONAL_INFO.role,
  location: PERSONAL_INFO.location,
  status: "Open to work",
  email: PERSONAL_INFO.email,
  links: {
    linkedin: PERSONAL_INFO.socials.linkedin,
    github: PERSONAL_INFO.socials.github,
    medium: PERSONAL_INFO.socials.medium,
  },
  footer: "Built for Backend Scale",
};

export const hero = {
  heading: "Hi, I’m Sahil. I build backend systems that hold up under load.",
  primaryCta: { label: "See my work", href: "#work" },
  secondaryCta: { label: "Work with me", href: "#services" },
};

export const skills = ["Java", "Go", "TypeScript", "PostgreSQL", "Kafka", "Kubernetes"];

export const serviceEntries: Entry[] = SERVICES.map((s) => ({
  title: s.title,
  href: "#connect",
  summary: s.shortDescription,
  meta: s.deliverables.join(" · "),
}));

export const servicesCard = {
  heading: "A custom architecture or audit?",
  blurb:
    "I work with startups and enterprise teams on performance bottlenecks, scalable backend services, and AI-assisted engineering workflows.",
  cta: "Discuss your needs",
};

export const mediumCard = {
  heading: "On Medium",
  blurb: "Write-ups on load, latency, and the systems that carry them.",
  cta: "Follow ↗",
  quote: "“Notes from production.”",
  allPosts: {
    title: "Read everything on Medium",
    summary: "New write-ups land there first. Follow to get them in your feed.",
  },
};

export const contact = {
  note: [
    "Have a role, a system to scale, or a bottleneck to chase?",
    "Write to me. I read everything, and I usually reply within a couple of days.",
  ],
  signoff: "— Sahil",
  postmark: "Kolkata",
  lines: [
    { label: "GitHub", href: site.links.github, display: "github.com/SahilsDevelopment" },
    { label: "LinkedIn", href: site.links.linkedin, display: "in/sahil-mishra-65500b212" },
    { label: "Medium", href: site.links.medium, display: "medium.com/@sahilmishra1408" },
  ],
};

export const about = {
  paragraphs: [
    "I’m Sahil Mishra, a software engineer designing and scaling backend systems in payments and fintech. Over the last two years that work has meant high-throughput, low-latency microservices — including a production effort that took throughput from 34 transactions a second to 2,400.",
    "I build mostly in Java, Go, and TypeScript, and I rely on test-driven development when the system has to stay correct under load. The stack around that is distributed: PostgreSQL, Kafka, Kubernetes, and the metrics that show whether a service is actually healthy.",
    "I also use AI tooling — MCP and prompt engineering — to take repetitive work off the team, which has shortened code review cycles by about 40%. I studied Computer Science and Engineering at Jadavpur University, and I work from Kolkata.",
  ],
  currently: [
    { label: "Working on", value: "Payments microservices at RS Software" },
    { label: "Building", value: "ForgeQueue, a distributed job processor" },
    { label: "Exploring", value: "MCP and AI workflow automation" },
    { label: "Based in", value: "Kolkata, India" },
  ],
};

export { WORK_PROJECTS };

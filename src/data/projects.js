// Single source of truth for the Projects showcase.
// Only facts from Pratik's profile document and the public repo READMEs/package.json files.
// `image: null` means no real screenshot yet -> the showcase renders a clearly-labelled placeholder.

export const PROJECT_FILTERS = ["All projects", "Full Stack", "AI / GenAI", "Web Development"];

export const projects = [
  {
    slug: "healthai-guardian",
    title: "HealthAI Guardian",
    tagline: "Predictive vital healthcare monitoring & anomaly detection",
    filters: ["Full Stack", "AI / GenAI"],
    accent: "#10b981",
    image: "/Project2.png",
    github: "https://github.com/krrish-cypto/HealthAI-Guardian",
    demo: "https://healthai-guardian.netlify.app",
    stack: ["React", "TypeScript", "Node.js", "Express", "OpenAI API", "MongoDB", "Tailwind CSS"],
    intro:
      "A predictive healthcare monitoring platform that records vital statistics and leverages AI models to provide actionable health insights and early anomaly warnings.",
    problem:
      "Patients and care teams lack a centralized, intelligent bridge between fragmented personal health metrics and actionable early anomaly detection.",
    solution:
      "A real-time health surveillance system that evaluates vital stats trends with AI models, generating proactive anomaly alerts and high-contrast trend visualizations.",
    steps: ["Record Vitals", "Trend Analysis", "AI Evaluation", "Anomaly Alert", "Actionable Plan"],
    features: [
      "Real-time vital statistics tracking and health parameter logs",
      "Predictive analytics assessing trend deviations in patient data",
      "Structured health record repository with privacy safeguards",
      "Automated summary insights translating raw stats into clear guidance",
      "Developed as a Top 10 Finalist project at Void Hacks 7.0 2025",
    ],
    note: "Top 10 Finalist at Void Hacks 7.0 (2025). Developed under competitive hackathon conditions.",
  },
  {
    slug: "haq-dwaar-ai",
    title: "HAQ-DWAAR AI",
    tagline: "From scheme discovery to application readiness",
    filters: ["Full Stack", "AI / GenAI"],
    accent: "#34d399",
    image: null,
    github: "https://github.com/pratikp23/HAQ-DWAAR-AI",
    demo: "https://haq-dwaar-ai.vercel.app",
    stack: ["React", "Node.js", "Express", "MongoDB", "Gemini", "Bhashini", "Zod", "JWT auth"],
    intro:
      "An AI-assisted public welfare platform that helps citizens, especially in rural and underserved communities of Madhya Pradesh, find government schemes they may be eligible for and get ready to apply.",
    problem:
      "Hundreds of welfare schemes go underused. Citizens meet fragmented department portals, hard-to-read eligibility language and middlemen who charge for basic information.",
    solution:
      "A citizen-side assistant that matches people to schemes, explains eligibility in plain language, checks documents and prepares applications. It is an independent tool, not a government portal, and applications are completed on the official portals.",
    steps: ["Discover", "Match", "Verify", "Prepare", "Apply", "Track"],
    features: [
      "Benefit Passport: one profile that drives scheme matching",
      "Gemini-assisted extraction of eligibility information, with deterministic eligibility rules stored in MongoDB",
      "Transparent match score: eligibility 40, documents 30, profile 15, verification 10, deadline 5",
      "Document verification and a personal document vault",
      "Voice and vernacular-language support through Bhashini, with English and Hindi",
    ],
    note: "Not a generic chatbot: the AI extracts information and the eligibility decisions come from fixed rules.",
  },
  {
    slug: "learnai",
    title: "LearnAI",
    tagline: "A MERN learning platform with AI built in",
    filters: ["Full Stack", "AI / GenAI"],
    accent: "#a78bfa",
    image: "/learnai.jpg",
    github: "https://github.com/pratikp23/LearnAI",
    demo: "https://learning-management-system-five-azure.vercel.app/",
    stack: ["React", "Vite", "Redux", "Node.js", "Express", "MongoDB", "Firebase", "Gemini API", "Razorpay"],
    intro:
      "An AI-powered learning platform built on the MERN stack, with authentication, file uploads and payments around the learning experience.",
    problem: "Standard learning platforms offer static, one-way course delivery without tailored recommendations or automated doubt resolution for students.",
    solution: "A complete full-stack web application combining course administration with AI-assisted learning paths and automated doubt clearing.",
    steps: ["Authenticate", "Explore Courses", "AI Doubt Resolution", "Track Progress", "Certify"],
    features: [
      "AI integration through the Google Generative AI SDK",
      "Payment integration with Razorpay",
      "Redux Toolkit state management on a Vite + React frontend",
      "Express and MongoDB backend with JWT authentication, Cloudinary uploads and email via Nodemailer",
    ],
    note: "Production deployed on Vercel with active student course workflows.",
  },
  {
    slug: "knot-ai",
    title: "Knot AI",
    tagline: "A multi-agent AI application",
    filters: ["Full Stack", "AI / GenAI"],
    accent: "#fbbf24",
    image: null,
    github: "https://github.com/pratikp23/Knot-AI",
    demo: "https://knot-ai.vercel.app",
    stack: ["React", "Redux", "Node.js", "Express", "MongoDB", "Redis", "Docker", "Firebase"],
    intro:
      "A MERN-based multi-agent AI application exploring agent architecture, authentication, sessions and frontend-backend integration.",
    problem: "Orchestrating autonomous multi-agent tasks requires persistent memory states, fast session validation, and resilient background task coordination.",
    solution: "Built a containerized multi-agent coordinator using Redis session stores and Express API micro-services with a responsive React management interface.",
    steps: ["Initialize Session", "Agent Dispatch", "Redis State Sync", "Result Aggregation"],
    features: [
      "Multi-agent architecture with dynamic task routing",
      "Authentication and session handling backed by Redis",
      "Dockerised setup for reproducible deployment environments",
      "React and Redux frontend wired to an Express backend",
    ],
    note: "Experimental multi-agent orchestration architecture.",
  },
  {
    slug: "nexuschat-rayflow",
    title: "NexusChat / RayFlow",
    tagline: "A team-built collaborative software project",
    filters: ["Full Stack", "Web Development"],
    accent: "#22d3ee",
    image: "/rayflow.jpg",
    github: "https://github.com/pratikp23/NexusChat",
    demo: "https://www.rayflow.in/",
    stack: ["Next.js", "Prisma", "Database integration", "Git branching"],
    intro:
      "A collaborative project built with a team on Next.js and Prisma, with backend development and a Git branching workflow.",
    problem: "Distributed team workspaces need instant bidirectional messaging and structured channel threads with atomic database persistence.",
    solution: "Engineered responsive team chat channels with Next.js server components and Prisma ORM schema models.",
    steps: ["Join Workspace", "Channel Subscription", "Real-Time Message", "Thread Archival"],
    features: [
      "Next.js application with Prisma-backed database integration",
      "Backend development and database indexing",
      "Team workflow with Git branching and code review conventions",
    ],
    note: "Collaborative team project built with modern Next.js patterns.",
  },
];

// Projects from the previous portfolio version, preserved verbatim. Not rendered in the showcase.
export const archivedProjects = [
  {
    id: "lms",
    title: "AI-Learning Management System",
    category: "Full Stack & AI",
    badge: "Core Project",
    image: "/lms.png",
    demo: "https://learning-management-system-five-azure.vercel.app/",
    github: "https://github.com/pratikp23/Learning-Management-System",
    problem:
      "Standard learning platforms offer static, one-way course delivery without tailored recommendations or automated doubt resolution for students.",
    whatIBuilt:
      "A complete full-stack web application combining course administration with AI-assisted learning paths and automated doubt clearing.",
    myContribution:
      "Architected the full MERN application, developed RESTful API endpoints with Express and Node.js, structured MongoDB collections for user and course records, built responsive frontend views in React and Tailwind CSS, and integrated AI evaluation models.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    features: [
      "Personalized course recommendation engine powered by AI models",
      "Interactive doubt resolution and automated resume review assistant",
      "Comprehensive course catalog with student progress tracking",
      "Secure user authentication and MongoDB state persistence",
      "Fast, responsive user interface engineered with Tailwind CSS",
    ],
  },
  {
    id: "healthai",
    title: "HealthAI Guardian",
    category: "Healthcare & AI",
    badge: "Top 10 Finalist Void Hacks 7.0",
    image: "/Project2.png",
    demo: "https://healthai-guardian.netlify.app",
    github: "https://github.com/krrish-cypto/HealthAI-Guardian",
    problem:
      "Patients and care teams lack a centralized, intelligent bridge between fragmented personal health metrics and actionable early anomaly detection.",
    whatIBuilt:
      "A predictive healthcare monitoring platform that records vital statistics and leverages AI models to provide actionable health insights.",
    myContribution:
      "Built client-side views using React and TypeScript, connected machine learning and OpenAI API endpoints for data evaluation, implemented secure health metrics forms, and styled high-contrast data visualization dashboards.",
    technologies: ["React", "TypeScript", "Node.js", "OpenAI API", "MongoDB"],
    features: [
      "Real-time vital statistics tracking and health parameter logs",
      "Predictive analytics assessing trend deviations in patient data",
      "Structured health record repository with privacy safeguards",
      "Automated summary insights translating raw stats into clear guidance",
      "Developed as a Top 10 Finalist project at Void Hacks 7.0 2025",
    ],
  },
];

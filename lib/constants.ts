export interface TechCategory {
  title: string;
  iconName: string;
  items: string[];
}

export interface WorkProject {
  id: string;
  title: string;
  subtitle: string;
  companyOrType: string;
  periodOrYear: string;
  description: string;
  highlightMetric?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  details?: WorkProjectDetails;
}

export interface WorkProjectDetails {
  status?: string;
  goalsTitle?: string;
  goals?: { title: string; text: string }[];
  diagrams?: { title: string; body: string }[];
  example?: { title: string; language: string; body: string }[];
  roadmap?: { label: string; done: boolean }[];
  note?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
}

export const PERSONAL_INFO = {
  name: "Sahil Mishra",
  role: "Software Engineer",
  tagline: "Backend Systems, Distributed Infrastructure & AI Automation",
  location: "Kolkata, India",
  education: "Bachelor of Engineering in Computer Science & Engineering — Jadavpur University",
  experienceYears: "2+",
  email: "prof.se.sahil@gmail.com",
  phone: "+91 7439-57-1462",
  socials: {
    github: "https://github.com/SahilsDevelopment",
    linkedin: "https://www.linkedin.com/in/sahil-mishra-65500b212/",
    medium: "https://medium.com/@sahilmishra1408",
  },
  bio: "Software Engineer with 2+ years of experience designing and scaling backend systems in the payments and fintech domain. Proven track record of delivering high-throughput, low-latency microservices — achieving a 70x throughput improvement (34 TPS → 2,400 TPS) in production. Proficient in Java, Golang, and TypeScript, with deep expertise in Test-Driven Development, distributed systems, and cloud-native infrastructure. Passionate about AI-driven automation — consistently integrating tools like MCP and prompt engineering to reduce manual effort, streamline code review cycles by 40%, and compound team productivity.",
  stats: [
    { label: "Throughput Boost", value: "70x", subtext: "34 → 2,400 TPS" },
    { label: "Code Review Reduction", value: "40%", subtext: "Via MCP & AI Workflows" },
    { label: "Fintech Experience", value: "2+ Yrs", subtext: "Payments Microservices" },
    { label: "Education", value: "Jadavpur Univ", subtext: "B.E. Computer Science" },
  ]
};

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Languages",
    iconName: "Code2",
    items: ["Java", "Golang", "TypeScript", "SQL"]
  },
  {
    title: "Testing & Quality",
    iconName: "CheckCircle2",
    items: ["JUnit", "Mockito", "TDD", "k6 (Load Testing)"]
  },
  {
    title: "Cloud & DevOps",
    iconName: "Cloud",
    items: ["AWS (EC2, S3)", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "CI/CD"]
  },
  {
    title: "Data & Messaging",
    iconName: "Database",
    items: ["PostgreSQL", "Apache Kafka", "Zookeeper", "Flyway", "MinIO"]
  },
  {
    title: "Observability & Security",
    iconName: "ShieldCheck",
    items: ["Jaeger", "Prometheus", "Grafana", "Keycloak", "RBAC"]
  },
  {
    title: "AI & Emerging Tech",
    iconName: "Sparkles",
    items: ["MCP (Model Context Protocol)", "Prompt Engineering", "AI Workflow Automation"]
  }
];

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "production-performance-engineering",
    title: "Production Performance Engineering",
    subtitle: "High-Throughput Optimization @ RS Software",
    companyOrType: "RS Software (Fintech / Payments)",
    periodOrYear: "Production Optimization",
    description: "Benchmarked 4 core microservices with k6 load testing and implemented targeted optimizations that scaled throughput from 34 TPS to 2,400 TPS (70x), significantly reducing P99 latency and enabling business growth without an infrastructure overhaul.",
    highlightMetric: "70x Throughput Scaling (34 → 2,400 TPS)",
    technologies: ["Java", "k6", "Go", "Prometheus", "Grafana", "PostgreSQL"],
    githubUrl: "https://github.com/SahilsDevelopment",
    details: {
      goalsTitle: "Highlights",
      goals: [
        { title: "Benchmark", text: "Load-tested 4 core microservices with k6 to find the real bottlenecks." },
        { title: "Optimize", text: "Applied targeted fixes that took throughput from 34 TPS to 2,400 TPS." },
        { title: "Impact", text: "Cut P99 latency and supported growth without an infrastructure overhaul." },
      ],
    },
  },
  {
    id: "core-mock",
    title: "Core-Mock — Mockito Framework Clone",
    subtitle: "Reflection & Dynamic Proxies in Java",
    companyOrType: "Open Source Engine",
    periodOrYear: "Independent Build",
    description: "Built a fully functional mocking library from scratch using Java dynamic proxies and reflection, replicating core Mockito behaviors including method stubbing (when/thenReturn) and behavioral verification — deepening expertise in framework internals and design patterns.",
    technologies: ["Java", "Dynamic Proxies", "Reflection", "JUnit", "TDD"],
    githubUrl: "https://github.com/SahilsDevelopment",
    details: {
      goalsTitle: "Highlights",
      goals: [
        { title: "Dynamic Proxies", text: "Mocks are generated at runtime with Java dynamic proxies and reflection." },
        { title: "Stubbing", text: "Supports Mockito-style when/thenReturn method stubbing." },
        { title: "Verification", text: "Verifies behavior by checking which calls a mock received." },
      ],
    },
  },
  {
    id: "task-orchestrator",
    title: "Hybrid TUI & Web Task Orchestrator",
    subtitle: "Concurrent Go Backend + React + Bubble Tea",
    companyOrType: "Full-Stack System",
    periodOrYear: "System Architecture",
    description: "Engineered a dual-interface task management system using Bubble Tea (TUI) and a React frontend, backed by a concurrent Go server; packaged and distributed via Docker Registry — demonstrating full-stack and DevOps capability.",
    technologies: ["Golang", "Bubble Tea", "React", "Docker", "REST API", "CI/CD"],
    githubUrl: "https://github.com/SahilsDevelopment",
    details: {
      goalsTitle: "Highlights",
      goals: [
        { title: "Terminal UI", text: "A Bubble Tea TUI for managing tasks from the command line." },
        { title: "Web UI", text: "A React frontend over the same concurrent Go server." },
        { title: "Distribution", text: "Packaged and shipped through a Docker registry." },
      ],
    },
  },
  {
    id: "forge-queue",
    title: "ForgeQueue",
    subtitle: "Distributed job processing with Java & Spring Boot",
    companyOrType: "Distributed Systems",
    periodOrYear: "In Progress",
    description: "A distributed job processing system built with Java and Spring Boot, developed incrementally from a simple database-backed worker into a distributed architecture using Kafka and multiple workers.",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Apache Kafka", "Docker"],
    githubUrl: "https://github.com/SahilsDevelopment",
    details: {
      status: "In progress",
      goals: [
        { title: "Job Creation", text: "Accept and persist jobs through a REST API." },
        { title: "Job Execution", text: "A worker picks up pending jobs and executes them." },
        { title: "Distributed Processing", text: "Use Kafka to distribute jobs across multiple workers." },
      ],
      diagrams: [
        {
          title: "Initial Architecture",
          body: "Client\n  │\n  │ POST /api/v1/jobs\n  ▼\nForgeQueue API\n  │\n  ▼\nPostgreSQL\n  │\n  ▼\nKafka\n  │\n  ├── Worker 1\n  ├── Worker 2\n  └── Worker 3",
        },
        {
          title: "Job Lifecycle",
          body: "CREATED\n   │\n   ▼\nRUNNING\n   │\n   ├──► COMPLETED\n   │\n   └──► FAILED",
        },
      ],
      example: [
        { title: "Create a Job", language: "http", body: "POST /api/v1/jobs\nContent-Type: application/json" },
        {
          title: "Request Body",
          language: "json",
          body: '{\n  "type": "EMAIL",\n  "payload": {\n    "to": "sahil@example.com",\n    "subject": "Welcome"\n  }\n}',
        },
        { title: "Response", language: "json", body: '{\n  "jobId": "job_123",\n  "status": "CREATED"\n}' },
      ],
      roadmap: [
        { label: "Project initialization", done: true },
        { label: "Job creation API", done: false },
        { label: "Job persistence", done: false },
        { label: "Basic job worker", done: false },
        { label: "Job execution", done: false },
        { label: "Kafka integration", done: false },
        { label: "Multiple workers", done: false },
        { label: "Idempotency", done: false },
        { label: "Retry & failure handling", done: false },
        { label: "Dead Letter Queue", done: false },
        { label: "Scheduling", done: false },
        { label: "Observability", done: false },
        { label: "Load testing", done: false },
        { label: "Kubernetes deployment", done: false },
      ],
      note: "The roadmap will be implemented incrementally. Each stage is designed to introduce and solve a specific distributed-systems problem.",
    },
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "backend-api-dev",
    title: "Backend & API Development",
    iconName: "Cpu",
    shortDescription: "Designing scalable microservices in Java/Go with clean architecture and TDD.",
    fullDescription: "Architecting resilient, event-driven microservices tailored for payments and fintech. I build clean, test-driven REST & gRPC APIs with robust error handling and high concurrent safety.",
    deliverables: ["Clean Architecture & Domain Driven Design", "High-Concurrency Java / Golang APIs", "Comprehensive Unit & Integration Test Suites"]
  },
  {
    id: "performance-engineering",
    title: "Performance Engineering",
    iconName: "Zap",
    shortDescription: "Load testing, profiling, and optimization to achieve production-grade throughput.",
    fullDescription: "Diagnostic benchmarking using k6 load testing, CPU/memory profiling, database query indexing, and lock contention elimination. Proven track record of boosting TPS by up to 70x.",
    deliverables: ["k6 Load & Stress Test Suites", "P99 Latency & Bottleneck Analysis", "Database Query & Threading Optimization"]
  },
  {
    id: "devops-cloud-infra",
    title: "DevOps & Cloud Infra",
    iconName: "Server",
    shortDescription: "CI/CD pipelines, containerization, and AWS/Kubernetes deployments.",
    fullDescription: "Automating cloud infrastructure delivery with Infrastructure-as-Code (Terraform), Docker containerization, Kubernetes orchestrations, and automated GitHub Actions deployment pipelines.",
    deliverables: ["Terraform IaC & AWS Cloud Setup", "Docker & Kubernetes Deployment Manifests", "Automate GitHub Actions CI/CD"]
  },
  {
    id: "ai-workflow-automation",
    title: "AI Workflow Automation",
    iconName: "Bot",
    shortDescription: "Integrating MCP and prompt engineering into engineering workflows to cut manual effort.",
    fullDescription: "Leveraging Model Context Protocol (MCP), custom tools, and automated AI agents to accelerate code reviews by 40%, automate repetitive engineering tasks, and supercharge team velocity.",
    deliverables: ["Model Context Protocol (MCP) Integrations", "Custom AI Agent Tooling & Workflows", "Automated Code Review & PR Assistant Pipelines"]
  },
  {
    id: "security-observability",
    title: "Security & Observability Setup",
    iconName: "Activity",
    shortDescription: "RBAC with Keycloak, distributed tracing with Jaeger, dashboards with Prometheus/Grafana.",
    fullDescription: "Full-stack observability and enterprise security setup. Implementing distributed request tracing across microservices, real-time metric dashboards, and enterprise RBAC identity management.",
    deliverables: ["Keycloak Identity & RBAC Authentication", "Prometheus & Grafana Real-Time Monitoring", "Distributed Tracing with Jaeger & OpenTelemetry"]
  }
];

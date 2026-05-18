export type Vector3Tuple = [number, number, number];

export type SectionId =
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "hobbies";

export type Section = {
  id: SectionId;
  title: string;
  position: Vector3Tuple;
  description: string;
  items: string[];
  experiencePeriods?: ExperiencePeriod[];
};

export type ExperiencePeriod = {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
};

export type CheckpointData = Pick<Section, "id" | "title" | "position">;

export const sections: Section[] = [
  {
    id: "about",
    title: "About",
    position: [0, 0, 0],
    description:
      "I am Martin Pham, a full-stack software engineer with 3 years of experience across backend architecture, cloud systems, AI integrations, and scalable React applications.",
    items: [
      "Specialise in Java Spring Boot and Node.js NestJS backend systems",
      "Reduced high-traffic database latency from 800ms to 200ms",
      "Built multi-tenant authentication, event-driven services, and production React workflows",
    ],
  },
  {
    id: "skills",
    title: "Technical Skills",
    position: [4.5, 0, -2.5],
    description:
      "A full-stack toolkit spanning backend services, frontend applications, cloud infrastructure, testing, and AI-enabled product features.",
    items: [
      "Languages: Java, JavaScript, TypeScript, Python, SQL",
      "Frameworks: Spring Boot, NestJS, React, Redux, Next.js",
      "Cloud and data: AWS, DynamoDB, PostgreSQL, MongoDB, Redis",
      "Systems: RabbitMQ, BullMQ, SQS, logging and monitoring",
      "Testing and tools: JUnit, Playwright, Cypress, Docker, CI/CD, Git, Jira, Postman",
    ],
  },
  {
    id: "experience",
    title: "Experience",
    position: [9, 0, -5.2],
    description:
      "I have worked across cloud, backend, and frontend engineering roles, contributing to production platforms used at scale.",
    items: [],
    experiencePeriods: [
      {
        role: "Cloud Engineer",
        company: "Starack",
        period: "Oct 2025 - Present",
        location: "Sydney, Australia",
        bullets: [
          "Optimised backend workflows using asynchronous processing (background jobs, queues) to improve system scalability and resilience.",
          "Leveraged S3, CloudFront, and Lambda to build an image delivery pipeline that dynamically serves images in multiple sizes, improving load performance.",
          "Optimised database queries by refining access patterns and introducing caching, reducing response times for high-traffic endpoints from 800ms to 200ms.",
          "Monitored system performance through logging, tracking API response times to identify bottlenecks.",
          "Participated in the migration of a legacy system into the new multi-tenant platform, handling large-scale data migration and ensuring data consistency with minimal downtime.",
          "Led development of a team of 4 software engineers over a 5-month period to date, coordinating tasks and technical decisions.",
        ],
      },
      {
        role: "Backend Engineer",
        company: "Starack",
        period: "Oct 2024 - Oct 2025",
        location: "Sydney, Australia",
        bullets: [
          "Designed and scaled microservices-based backend services using NestJS supporting 500,000+ users.",
          "Migrated from fully managed Auth0 login to a custom JWT-based multi-tenant authentication system with SSO support.",
          "Integrated OpenAI APIs, applying prompt engineering techniques to enable LLM-powered features such as translation, automated feedback, and question bank generation.",
          "Implemented comprehensive unit and integration tests, achieving over 90% test coverage.",
        ],
      },
      {
        role: "Frontend Engineer",
        company: "Starack",
        period: "Feb 2024 - Oct 2024",
        location: "Sydney, Australia",
        bullets: [
          "Developed scalable frontend applications using React, Redux, and Material UI, along with reusable internal npm packages shared across platform modules.",
          "Developed admin portal web applications using Next.js, supporting end-to-end user flows including product discovery, configuration, and payments integration with Stripe.",
          "Customised MUI DataGrid to support advanced business requirements, including simulated grouping, fixed columns, keyboard navigation, and enhanced editing interactions.",
        ],
      },
    ],
  },
  {
    id: "projects",
    title: "Product Impact",
    position: [13.5, 0, -7.8],
    description:
      "My work focuses on practical engineering outcomes: faster systems, stronger authentication, reusable frontend platforms, and AI features that are efficient enough for real use.",
    items: [
      "Migrated Auth0 login to a custom JWT multi-tenant authentication system with SSO",
      "Integrated OpenAI APIs for translation, automated feedback, and question bank generation",
      "Applied prompt engineering, batching, and caching to scale AI features",
      "Customised MUI DataGrid with grouping, fixed columns, keyboard navigation, and advanced editing",
      "Implemented tests with over 90% coverage across backend services",
    ],
  },
  {
    id: "hobbies",
    title: "Education",
    position: [18, 0, -10.6],
    description:
      "I studied Information Technology at the University of Technology Sydney and pair practical engineering experience with formal cloud certification.",
    items: [
      "Bachelor of Information Technology, University of Technology Sydney, 2022-2025",
      "GPA: 6.7/7",
      "Dean's List in 2024 and 2025",
      "Undergraduate Academic Excellence International Scholarship, 25%",
      "AWS Certified Cloud Practitioner",
    ],
  },
];

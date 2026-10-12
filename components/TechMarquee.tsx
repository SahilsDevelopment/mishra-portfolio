import type { IconType } from "react-icons";
import { FaAws, FaJava } from "react-icons/fa";
import {
  SiApachekafka,
  SiDocker,
  SiGo,
  SiGrafana,
  SiGraphql,
  SiKubernetes,
  SiPostgresql,
  SiPrometheus,
  SiRedis,
  SiSpringboot,
  SiTerraform,
} from "react-icons/si";

interface Tech {
  Icon: IconType;
  label: string;
}

const ROW_ONE: Tech[] = [
  { Icon: FaJava, label: "Java 21" },
  { Icon: SiGo, label: "Golang" },
  { Icon: SiSpringboot, label: "Spring Boot" },
  { Icon: SiPostgresql, label: "PostgreSQL" },
  { Icon: SiApachekafka, label: "Apache Kafka" },
  { Icon: SiKubernetes, label: "Kubernetes" },
  { Icon: FaAws, label: "AWS Infra" },
];

const ROW_TWO: Tech[] = [
  { Icon: SiDocker, label: "Docker" },
  { Icon: SiPrometheus, label: "Prometheus" },
  { Icon: SiGrafana, label: "Grafana Telemetry" },
  { Icon: SiTerraform, label: "Terraform IaC" },
  { Icon: SiGraphql, label: "gRPC & GraphQL" },
  { Icon: SiRedis, label: "Redis Caching" },
];

const ROWS = [
  { items: ROW_ONE, reverse: false, duration: 40 },
  { items: ROW_TWO, reverse: true, duration: 34 },
];

function MarqueeGroup({ items, hidden = false }: { items: Tech[]; hidden?: boolean }) {
  return (
    <ul className="flex shrink-0" aria-hidden={hidden}>
      {items.map(({ Icon, label }) => (
        <li
          key={label}
          className="mr-3 sm:mr-5 flex items-center gap-2.5 sm:gap-3.5 px-5 py-3 sm:px-8 sm:py-5 rounded-full bg-white border border-[#EEF0F2] shadow-[0_8px_24px_-10px_rgba(6,20,27,0.22)] whitespace-nowrap"
        >
          <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#06141B]" aria-hidden />
          <span className="text-base sm:text-xl font-bold tracking-tight text-[#06141B]">{label}</span>
        </li>
      ))}
    </ul>
  );
}

export function TechMarquee() {
  return (
    <div className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 mb-10 sm:mb-14 text-center">
        <h2 className="text-3xl sm:text-6xl font-extrabold tracking-[-0.03em] text-[#06141B]">
          Technology Ecosystem
        </h2>
        <p className="mt-4 text-base sm:text-lg font-medium text-[#4A5C6A]">
          High-performance tools, storage engines &amp; cloud microservice stacks
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="space-y-6">
          {ROWS.map((row) => (
            <div
              key={row.duration}
              className="animate-marquee py-3"
              style={{
                animationDuration: `${row.duration}s`,
                animationDirection: row.reverse ? "reverse" : "normal",
              }}
            >
              <MarqueeGroup items={row.items} />
              <MarqueeGroup items={row.items} hidden />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

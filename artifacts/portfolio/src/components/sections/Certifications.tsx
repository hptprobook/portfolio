import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, BadgeCheck, Cloud } from "lucide-react";
import {
  SiGooglecloud,
  SiMeta,
  SiMongodb,
  SiDocker,
} from "react-icons/si";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
  bgColor: string;
}

const certifications: Certification[] = [
  {
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "Mar 2024",
    credentialId: "AWS-DA-2024-0312",
    credentialUrl: "https://aws.amazon.com/certification",
    Icon: Cloud,
    iconColor: "#FF9900",
    bgColor: "hsl(38 100% 50% / 0.08)",
  },
  {
    title: "Google Professional Cloud Developer",
    issuer: "Google Cloud",
    date: "Nov 2023",
    credentialId: "GCP-PCD-2023-1142",
    credentialUrl: "https://cloud.google.com/certification",
    Icon: SiGooglecloud,
    iconColor: "#4285F4",
    bgColor: "hsl(219 90% 55% / 0.08)",
  },
  {
    title: "Meta Frontend Developer",
    issuer: "Meta",
    date: "Jul 2023",
    credentialId: "META-FE-2023-0789",
    credentialUrl: "https://coursera.org/professional-certificates/meta-front-end-developer",
    Icon: SiMeta,
    iconColor: "#0081FB",
    bgColor: "hsl(214 95% 55% / 0.08)",
  },
  {
    title: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    date: "Apr 2023",
    credentialId: "MDB-DEV-2023-0456",
    credentialUrl: "https://university.mongodb.com/certification",
    Icon: SiMongodb,
    iconColor: "#00ED64",
    bgColor: "hsl(145 100% 46% / 0.08)",
  },
  {
    title: "Docker Certified Associate",
    issuer: "Docker Inc.",
    date: "Jan 2023",
    credentialId: "DCA-2023-0221",
    credentialUrl: "https://training.mirantis.com/dca-certification-exam",
    Icon: SiDocker,
    iconColor: "#2496ED",
    bgColor: "hsl(210 85% 55% / 0.08)",
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="section-padding max-w-6xl mx-auto"
      data-testid="section-certifications"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-primary font-mono text-sm">05.</span>
        <span className="h-px flex-1 max-w-15 bg-border" />
        <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
          Certifications
        </span>
      </div>

      <motion.h2
        className="text-4xl md:text-5xl font-serif font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        data-testid="certifications-title"
      >
        My <span className="gradient-text">Credentials</span>
      </motion.h2>

      <motion.p
        className="text-muted-foreground mb-14 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Industry-recognised certifications validating my expertise across cloud, frontend, and backend technologies.
      </motion.p>

      {/* Cert cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.credentialId}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            data-testid={`cert-card-${i}`}
          >
            <motion.div
              className="relative h-full p-6 rounded-2xl border border-border/60 bg-card group cursor-default overflow-hidden"
              whileHover={{ y: -4, borderColor: cert.iconColor + "55" }}
              transition={{ duration: 0.25 }}
            >
              {/* Glow bg on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 20% 20%, ${cert.iconColor}12 0%, transparent 60%)` }}
              />

              {/* Icon badge */}
              <div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: cert.bgColor, border: `1px solid ${cert.iconColor}30` }}
              >
                <cert.Icon size={24} style={{ color: cert.iconColor }} />
              </div>

              {/* Title & issuer */}
              <h3 className="font-serif font-bold text-foreground text-base leading-snug mb-1 group-hover:text-primary transition-colors duration-300">
                {cert.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-4">{cert.issuer}</p>

              {/* Date + verified badge */}
              <div className="flex items-center gap-2 mb-5">
                <BadgeCheck size={13} className="text-primary shrink-0" />
                <span className="text-xs font-mono text-primary/80">Issued {cert.date}</span>
              </div>

              {/* Credential ID */}
              <p className="text-[11px] font-mono text-muted-foreground/60 truncate mb-4">
                ID: {cert.credentialId}
              </p>

              {/* Verify link */}
              <motion.a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-200 group/link"
                whileHover={{ x: 2 }}
                data-testid={`cert-verify-${i}`}
              >
                Verify credential
                <ExternalLink
                  size={11}
                  className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
                />
              </motion.a>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import {
  SiReact,
  SiNestjs,
  SiNodedotjs,
  SiAngular,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
} from "react-icons/si";

interface TechItem {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface Project {
  number: string;
  title: string;
  description: string;
  stack: TechItem[];
  github: string;
  live: string;
  featured: boolean;
  image: string;
}

const projects: Project[] = [
  {
    number: "01",
    title: "TaskFlow Pro",
    description:
      "A real-time project management platform with drag-and-drop boards, team collaboration, and analytics dashboards. Built with a NestJS microservices backend and React frontend.",
    stack: [
      { name: "React", icon: SiReact },
      { name: "NestJS", icon: SiNestjs },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "TypeScript", icon: SiTypescript },
    ],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    image: "https://placehold.co/800x500/0f172a/94a3b8?text=TaskFlow+Pro",
  },
  {
    number: "02",
    title: "ShopSphere API",
    description:
      "RESTful e-commerce API with authentication, product catalog, cart management, and order processing. Handles 10k+ requests/minute with Redis caching and JWT auth.",
    stack: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "MongoDB", icon: SiMongodb },
      { name: "TypeScript", icon: SiTypescript },
    ],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    image: "https://placehold.co/800x500/0f172a/94a3b8?text=ShopSphere+API",
  },
  {
    number: "03",
    title: "Angular Dashboard",
    description:
      "Feature-rich enterprise admin dashboard with role-based access control, data visualization, and real-time notification system. Uses Angular Material and RxJS.",
    stack: [
      { name: "Angular", icon: SiAngular },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Node.js", icon: SiNodedotjs },
    ],
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
    image: "https://placehold.co/800x500/0f172a/94a3b8?text=Angular+Dashboard",
  },
  {
    number: "04",
    title: "DevConnect",
    description:
      "A social platform for developers to share projects, collaborate on code, and find teammates. WebSocket-powered chat and GitHub OAuth integration.",
    stack: [
      { name: "React", icon: SiReact },
      { name: "NestJS", icon: SiNestjs },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
    image: "https://placehold.co/800x500/0f172a/94a3b8?text=DevConnect",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });

      setActiveIndex(closestIndex);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const active = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding max-w-7xl mx-auto"
      data-testid="section-projects"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-primary font-mono text-sm">03.</span>
        <span className="h-px flex-1 max-w-15 bg-border" />
        <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
          Projects
        </span>
      </div>

      <motion.h2
        className="text-4xl md:text-5xl font-serif font-bold mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        data-testid="projects-title"
      >
        What I've <span className="gradient-text">Built</span>
      </motion.h2>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* ── Left column: scrollable project visuals ── */}
        <div className="space-y-28">
          {projects.map((project, i) => (
            <motion.div
              key={project.number}
              ref={(el) => { itemRefs.current[i] = el; }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              data-testid={`project-card-${i}`}
            >
              {/* Title row */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-primary/60">{project.number}</span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="text-xs px-2 py-0.5 rounded-full border border-primary/30 text-primary font-mono ml-1">
                    featured
                  </span>
                )}
              </div>

              {/* Image with tilt hover */}
              <motion.div
                className="relative overflow-hidden rounded-xl border border-border/60 bg-card cursor-pointer"
                whileHover={{ rotate: -2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent z-10 pointer-events-none" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </motion.div>

              {/* Mobile-only links */}
              <div className="flex items-center gap-3 mt-4 lg:hidden">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                  data-testid={`project-${i}-github`}
                >
                  <Github size={16} />
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-primary/30 text-primary text-xs font-medium hover:bg-primary/10 transition-colors"
                  data-testid={`project-${i}-live`}
                >
                  Live <ArrowUpRight size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Right column: sticky description panel ── */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="p-8 rounded-2xl border border-border/60 bg-card"
              >
                {/* Progress dots */}
                <div className="flex items-center gap-2 mb-6">
                  {projects.map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 rounded-full transition-all duration-300 ${
                        i === activeIndex ? "w-8 bg-primary" : "w-3 bg-border"
                      }`}
                    />
                  ))}
                </div>

                <span className="font-mono text-xs text-primary/60 mb-2 block">
                  {active.number}
                </span>

                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                  {active.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {active.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {active.stack.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/50 border border-border/40"
                    >
                      <tech.icon size={12} className="text-muted-foreground" />
                      <span className="text-xs font-mono text-muted-foreground">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action links */}
                <div className="flex items-center gap-3">
                  <motion.a
                    href={active.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    data-testid={`project-${activeIndex}-github`}
                  >
                    <Github size={18} />
                  </motion.a>
                  <motion.a
                    href={active.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-primary/30 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid={`project-${activeIndex}-live`}
                  >
                    View Live <ArrowUpRight size={14} />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* More on GitHub */}
      <motion.div
        className="mt-16 flex justify-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
      >
        <motion.a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          whileHover={{ x: 4 }}
          data-testid="btn-more-projects"
        >
          More on GitHub
          <ExternalLink
            size={14}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </motion.a>
      </motion.div>
    </section>
  );
}

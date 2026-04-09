import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  X,
  Layers,
  GitBranch,
  ExternalLink,
} from 'lucide-react';
import AegonaImg from '@/assets/images/aegona.jpg';
import CuoiAgencyImg from '@/assets/images/cuoiagency.webp';
import FptEduImg from '@/assets/images/fptedu.jpg';
import { projects, type Project } from '@/data/projects';

const timeline = [
  {
    type: 'work',
    icon: Briefcase,
    title: 'From Intern to Junior Fullstack Developer',
    org: 'Software Company - Aegona',
    period: '2024 — Present',
    desc: 'Started as a fresher developer here. After 2 years building scalable web apps with ReactJS, Angular, NestJS; implementing REST APIs; managing MySQL; using Docker & Jenkins; and working in agile sprints.',
    tags: [
      'Angular',
      'React',
      'NestJS',
      'MySQL',
      'TypeScript',
      'Docker',
      'Jenkins',
    ],
    image: AegonaImg,
    imageAlt: 'My work in Aegona office',
    projectIndices: [0, 1],
    showProjects: true,
  },
  {
    type: 'work',
    icon: Briefcase,
    title: 'Nocode Developer Intern',
    org: 'Cuoi Agency',
    period: '2024 — 2024',
    desc: 'Interned here after meeting the requirements. Primarily developed websites using no-code technologies.',
    tags: ['React', 'JavaScript', 'REST APIs'],
    image: CuoiAgencyImg,
    imageAlt: 'Colorful code on a monitor',
    projectIndices: [],
    showProjects: false,
  },
  {
    type: 'edu',
    icon: GraduationCap,
    title: 'Website Developer & CS Student',
    org: 'FPT Polytechnic — Tay Nguyen',
    period: '2021 — 2023',
    desc: 'Focused on software engineering, algorithms, and web technologies. Built 10+ projects from full-stack apps to data structures implementations. Graduated with honors and a GPA of 9.0/10.0.',
    tags: ['Algorithms', 'Data Structures', 'Web Dev', 'Databases'],
    image: FptEduImg,
    imageAlt: 'University campus',
    projectIndices: [2],
    showProjects: true,
  },
];

/* ── Projects modal ─────────────────────────────────────────── */
function ProjectsModal({
  items,
  onClose,
}: {
  items: Project[];
  onClose: () => void;
}) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl border border-border/60 bg-background overflow-hidden shadow-2xl flex flex-col"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 shrink-0">
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <Layers size={14} className="text-primary" />
            <span>Projects</span>
            <span className="text-border">·</span>
            <span className="text-primary">{items.length}</span>
          </div>
          <button
            className="w-7 h-7 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors"
            onClick={onClose}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left — project list */}
          <div className="w-1/2 overflow-y-auto border-r border-border/40 p-4 space-y-4">
            {items.map((p, i) => (
              <motion.div
                key={p.number}
                className={`rounded-xl border cursor-pointer overflow-hidden transition-all duration-200 ${
                  i === active
                    ? 'border-primary/50 shadow-[0_0_12px_hsl(180_100%_50%/0.15)]'
                    : 'border-border/40 hover:border-border/80'
                }`}
                whileHover={{ scale: 1.01 }}
                onClick={() => setActive(i)}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ height: 140 }}
                >
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent z-10" />
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {p.featured && (
                    <span className="absolute top-2 right-2 z-20 text-xs px-2 py-0.5 rounded-full border border-primary/40 bg-background/70 text-primary font-mono">
                      featured
                    </span>
                  )}
                </div>
                <div className="px-3 py-2.5 bg-card">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary/50">
                      {p.number}
                    </span>
                    <h3 className="text-sm font-serif font-bold text-foreground line-clamp-1">
                      {p.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — detail panel */}
          <div className="w-1/2 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                {/* Progress dots */}
                <div className="flex items-center gap-2 mb-5">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`block h-1 rounded-full transition-all duration-300 ${
                        i === active
                          ? 'w-8 bg-primary'
                          : 'w-3 bg-border hover:bg-border/80'
                      }`}
                    />
                  ))}
                </div>

                <span className="font-mono text-xs text-primary/60 mb-1 block">
                  {current.number}
                </span>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                  {current.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {current.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {current.stack.map((tech) => (
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

                <div className="flex items-center gap-3">
                  {current.github && (
                    <a
                      href={current.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                    >
                      <GitBranch size={15} />
                    </a>
                  )}
                  {current.live && (
                    <a
                      href={current.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/30 text-primary text-xs font-medium hover:bg-primary/10 transition-colors"
                    >
                      Live <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Timeline card ──────────────────────────────────────────── */
function TimelineCard({
  item,
  side,
  inView,
  delay,
  onViewProjects,
}: {
  item: (typeof timeline)[number];
  side: 'left' | 'right';
  inView: boolean;
  delay: number;
  onViewProjects: () => void;
}) {
  const hasProjects = item.showProjects && item.projectIndices.length > 0;

  return (
    <motion.div
      className="w-full max-w-sm p-6 rounded-2xl border border-border/60 bg-card hover:border-primary/30 transition-all duration-300 group mb-4"
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-serif font-bold text-foreground text-lg group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{item.org}</p>
        </div>
        <span className="font-mono text-xs text-primary/70 whitespace-nowrap ml-4 mt-1">
          {item.period}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {item.desc}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-muted/60 border border-border/40 text-muted-foreground font-mono"
          >
            {tag}
          </span>
        ))}
      </div>
      {hasProjects && (
        <button
          onClick={onViewProjects}
          className="flex items-center gap-1.5 text-xs font-mono text-primary/60 hover:text-primary transition-colors group/btn mt-1"
        >
          <Layers
            size={12}
            className="group-hover/btn:scale-110 transition-transform"
          />
          view projects here
          <span className="text-primary/40 group-hover/btn:text-primary/70 transition-colors">
            ({item.projectIndices.length})
          </span>
        </button>
      )}
    </motion.div>
  );
}

/* ── Timeline image thumbnail ───────────────────────────────── */
function TimelineImage({
  item,
  side,
  inView,
  delay,
  onPreview,
}: {
  item: (typeof timeline)[number];
  side: 'left' | 'right';
  inView: boolean;
  delay: number;
  onPreview: () => void;
}) {
  const accent = side === 'left' ? 'right' : 'left';

  return (
    <motion.div
      className="hidden md:block w-full max-w-sm overflow-hidden rounded-2xl border border-border/50 shadow-lg self-center my-4 cursor-zoom-in relative group/img"
      style={{ height: 230 }}
      initial={{ opacity: 0, x: side === 'left' ? -24 : 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      onClick={onPreview}
    >
      <img
        src={item.image}
        alt={item.imageAlt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <span className="text-white/0 group-hover/img:text-white/90 text-xs font-mono tracking-widest transition-all duration-300 translate-y-2 group-hover/img:translate-y-0">
          click to preview
        </span>
      </div>
      <div
        className={`absolute ${accent}-0 top-0 bottom-0 w-0.5 bg-primary/50`}
      />
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [lineProgress, setLineProgress] = useState(0);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null,
  );
  const [projectsModal, setProjectsModal] = useState<Project[] | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox(null);
        setProjectsModal(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const totalScroll = vh * 0.5 + rect.height;
        const scrolled = vh * 0.8 - rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
        setLineProgress(progress);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative section-padding bg-muted/20 border-y border-border/40"
      data-testid="section-experience"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary font-mono text-sm">04.</span>
          <span className="h-px flex-1 max-w-15 bg-border" />
          <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
            Experience
          </span>
        </div>

        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          data-testid="experience-title"
        >
          My <span className="gradient-text">Journey</span>
        </motion.h2>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/30" />
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px pointer-events-none"
            style={{
              height: `${lineProgress * 100}%`,
              background:
                'linear-gradient(to bottom, hsl(180 100% 50% / 0.9), hsl(180 100% 50% / 0.3))',
              boxShadow:
                '0 0 8px hsl(180 100% 50% / 0.6), 0 0 20px hsl(180 100% 50% / 0.2)',
            }}
          />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              const cardLeft = i % 2 === 0;
              const iconThreshold = i / (timeline.length - 1);
              const isLit = lineProgress >= iconThreshold - 0.02;
              const itemProjects = item.projectIndices.map(
                (idx) => projects[idx],
              );

              return (
                <motion.div
                  key={i}
                  className="relative flex items-start gap-0"
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  data-testid={`experience-item-${i}`}
                >
                  {/* LEFT HALF */}
                  <div className="w-1/2 flex justify-end pr-8 md:pr-10">
                    {cardLeft ? (
                      <TimelineCard
                        item={item}
                        side="left"
                        inView={inView}
                        delay={i * 0.15 + 0.1}
                        onViewProjects={() => setProjectsModal(itemProjects)}
                      />
                    ) : (
                      <TimelineImage
                        item={item}
                        side="left"
                        inView={inView}
                        delay={i * 0.15 + 0.2}
                        onPreview={() =>
                          setLightbox({ src: item.image, alt: item.imageAlt })
                        }
                      />
                    )}
                  </div>

                  {/* CENTER dot */}
                  <div className="relative z-10 shrink-0 flex items-start pt-5">
                    <div
                      className="w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-500"
                      style={{
                        borderColor: isLit
                          ? 'hsl(180 100% 50%)'
                          : 'hsl(var(--border))',
                        backgroundColor: isLit
                          ? 'hsl(180 100% 50% / 0.12)'
                          : 'hsl(var(--background))',
                        boxShadow: isLit
                          ? '0 0 12px hsl(180 100% 50% / 0.8), 0 0 28px hsl(180 100% 50% / 0.35)'
                          : 'none',
                      }}
                    >
                      <Icon
                        size={13}
                        style={{
                          color: isLit
                            ? 'hsl(180 100% 50%)'
                            : 'hsl(var(--muted-foreground))',
                          transition: 'color 0.5s ease',
                        }}
                      />
                    </div>
                  </div>

                  {/* RIGHT HALF */}
                  <div className="w-1/2 flex justify-start pl-8 md:pl-10">
                    {!cardLeft ? (
                      <TimelineCard
                        item={item}
                        side="right"
                        inView={inView}
                        delay={i * 0.15 + 0.1}
                        onViewProjects={() => setProjectsModal(itemProjects)}
                      />
                    ) : (
                      <TimelineImage
                        item={item}
                        side="right"
                        inView={inView}
                        delay={i * 0.15 + 0.2}
                        onPreview={() =>
                          setLightbox({ src: item.image, alt: item.imageAlt })
                        }
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full h-full object-contain"
              />
              <button
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
                onClick={() => setLightbox(null)}
              >
                <X size={16} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects modal */}
      <AnimatePresence>
        {projectsModal && (
          <ProjectsModal
            items={projectsModal}
            onClose={() => setProjectsModal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  Globe2,
  ListChecks,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import { usePortfolio } from '@/lib/portfolio-context';
import type { Project } from '@/data/portfolio';

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { content } = usePortfolio();
  const demoUrl = project.detail.demoUrl || project.live;
  const DemoStatusIcon = project.detail.demoConfidential ? ShieldCheck : Globe2;
  useBodyScrollLock();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overscroll-contain"
      data-lenis-prevent=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${content.projects.modalTitle}: ${project.title}`}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-xl border border-border/60 bg-background shadow-2xl"
        initial={{ scale: 0.94, opacity: 0, y: 18 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 18 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border/40 px-5 py-4">
          <div className="min-w-0">
            <p className="font-mono text-xs text-primary/70">
              {content.projects.modalTitle}
            </p>
            <h3 className="mt-1 truncate text-xl font-serif font-bold text-foreground md:text-2xl">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            aria-label={content.projects.closeLabel}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/50 text-muted-foreground transition-colors hover:text-foreground"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid max-h-[calc(90vh-73px)] grid-cols-1 overflow-y-auto overscroll-contain lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex items-center justify-center border-b border-border/40 bg-muted/20 lg:border-b-0 lg:border-r">
            <img
              src={project.image}
              alt={project.title}
              className="block h-auto w-full object-contain"
            />
          </div>

          <div className="p-5 md:p-7">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-primary/70">
                {project.number}
              </span>
              <span className="text-xs text-muted-foreground">
                {project.period}
              </span>
              {project.featured && (
                <span className="rounded-full border border-primary/30 px-2 py-0.5 font-mono text-xs text-primary">
                  {content.projects.featuredLabel}
                </span>
              )}
            </div>

            <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              {project.detail.overview}
            </p>

            <div className="mb-6 rounded-xl border border-border/50 bg-card/70 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Globe2 size={16} className="text-primary" />
                {content.projects.demoLabel}
              </div>
              {demoUrl ? (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
                >
                  {demoUrl}
                  <ArrowUpRight size={12} />
                </a>
              ) : (
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <DemoStatusIcon
                    size={16}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>{project.detail.demoStatus}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                <ListChecks size={16} className="text-primary" />
                {content.projects.responsibilitiesLabel}
              </div>
              <ul className="space-y-2">
                {project.detail.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-1.5 rounded-lg border border-border/40 bg-muted/50 px-2.5 py-1"
                >
                  <tech.icon size={12} className="text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { content } = usePortfolio();
  const projects = content.projects.items;
  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    [projects],
  );
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  useEffect(() => {
    setActiveIndex(0);
  }, [featuredProjects]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const active = featuredProjects[activeIndex] ?? featuredProjects[0];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding max-w-7xl mx-auto"
      data-testid="section-projects"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-primary font-mono text-sm">03.</span>
        <span className="h-px flex-1 max-w-15 bg-border" />
        <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
          {content.sectionLabels.projects}
        </span>
      </div>

      <motion.h2
        className="text-4xl md:text-5xl font-serif font-bold mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        data-testid="projects-title"
      >
        {content.projects.titlePrefix}{' '}
        <span className="gradient-text">{content.projects.titleAccent}</span>
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-20 lg:space-y-28">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.number}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              data-testid={`project-card-${i}`}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-mono text-xs text-primary/60">
                  {project.number}
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="text-xs px-2 py-0.5 rounded-full border border-primary/30 text-primary font-mono">
                    {content.projects.featuredLabel}
                  </span>
                )}
              </div>

              <motion.div
                className="relative overflow-hidden rounded-xl border border-border/60 bg-card cursor-pointer"
                whileHover={{ rotate: -1.5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent z-10 pointer-events-none" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="block h-auto w-full object-contain"
                  loading="lazy"
                />
              </motion.div>

              <div className="mt-4 lg:hidden rounded-xl border border-border/50 bg-card/70 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-mono text-primary/70">
                    {content.projects.periodLabel}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {project.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech) => (
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
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-primary/30 text-primary text-xs font-medium hover:bg-primary/10 transition-colors"
                    onClick={() => setSelectedProject(project)}
                    data-testid={`project-${i}-detail`}
                  >
                    {content.projects.viewDetail}
                    <ArrowUpRight size={12} />
                  </button>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                      data-testid={`project-${i}-github`}
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-primary/30 text-primary text-xs font-medium hover:bg-primary/10 transition-colors"
                      data-testid={`project-${i}-live`}
                    >
                      {content.experience.live} <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="p-8 rounded-xl border border-border/60 bg-card"
              >
                <div className="flex items-center gap-2 mb-6">
                  {featuredProjects.map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 rounded-full transition-all duration-300 ${
                        i === activeIndex ? 'w-8 bg-primary' : 'w-3 bg-border'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="font-mono text-xs text-primary/60 block">
                    {active.number}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {active.period}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                  {active.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {active.description}
                </p>

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

                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg border border-primary/30 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                  onClick={() => setSelectedProject(active)}
                  data-testid={`project-${activeIndex}-detail-desktop`}
                >
                  {content.projects.viewDetail}
                  <ArrowUpRight size={14} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

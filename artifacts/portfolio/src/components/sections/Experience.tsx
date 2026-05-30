import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, Layers, GitBranch, ExternalLink, ListChecks } from 'lucide-react';
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import { usePortfolio } from '@/lib/portfolio-context';
import type { Project, TimelineItem } from '@/data/portfolio';

function ProjectsModal({
  items,
  onClose,
}: {
  items: Project[];
  onClose: () => void;
}) {
  const { content } = usePortfolio();
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];
  useBodyScrollLock();

  if (!current) return null;

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
        className="relative w-full max-w-4xl max-h-[90vh] min-h-0 rounded-xl border border-border/60 bg-background overflow-hidden shadow-2xl flex flex-col"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 shrink-0">
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <Layers size={14} className="text-primary" />
            <span>{content.experience.modalTitle}</span>
            <span className="text-border">
              {content.experience.modalCountSeparator}
            </span>
            <span className="text-primary">{items.length}</span>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors"
            onClick={onClose}
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
          <div className="max-h-72 min-h-0 overflow-y-auto overscroll-contain border-b border-border/40 p-4 space-y-4 md:w-1/2 md:max-h-none md:border-b-0 md:border-r">
            {items.map((p, i) => (
              <motion.div
                key={p.number}
                className={`rounded-xl border cursor-pointer overflow-hidden transition-all duration-200 ${
                  i === active
                    ? 'border-primary/50 shadow-[0_0_12px_hsl(var(--primary)/0.15)]'
                    : 'border-border/40 hover:border-border/80'
                }`}
                whileHover={{ scale: 1.01 }}
                onClick={() => setActive(i)}
              >
                <div className="relative overflow-hidden h-36">
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent z-10" />
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {p.featured && (
                    <span className="absolute top-2 right-2 z-20 text-xs px-2 py-0.5 rounded-full border border-primary/40 bg-background/80 text-primary font-mono">
                      {content.projects.featuredLabel}
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

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 md:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center gap-2 mb-5">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`block h-1 rounded-full transition-all duration-300 ${
                        i === active
                          ? 'w-8 bg-primary'
                          : 'w-3 bg-border hover:bg-border/80'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-mono text-xs text-primary/60 block">
                    {current.number}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {current.period}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                  {current.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {current.detail.overview || current.description}
                </p>

                <div className="mb-6 rounded-xl border border-border/50 bg-card/70 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                    <ListChecks size={16} className="text-primary" />
                    {content.projects.responsibilitiesLabel}
                  </div>
                  <ul className="space-y-2">
                    {current.detail.responsibilities.map((item) => (
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
                      {content.experience.live} <ExternalLink size={11} />
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

function TimelineDot({
  item,
  isLit,
}: {
  item: TimelineItem;
  isLit: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className="w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-500 shrink-0"
      style={{
        borderColor: isLit ? 'hsl(var(--primary))' : 'hsl(var(--border))',
        backgroundColor: isLit
          ? 'hsl(var(--primary) / 0.12)'
          : 'hsl(var(--background))',
        boxShadow: isLit
          ? '0 0 12px hsl(var(--primary) / 0.8), 0 0 28px hsl(var(--primary) / 0.35)'
          : 'none',
      }}
    >
      <Icon
        size={13}
        style={{
          color: isLit
            ? 'hsl(var(--primary))'
            : 'hsl(var(--muted-foreground))',
          transition: 'color 0.5s ease',
        }}
      />
    </div>
  );
}

function TimelineCard({
  item,
  side,
  inView,
  delay,
  onViewProjects,
}: {
  item: TimelineItem;
  side: 'left' | 'right';
  inView: boolean;
  delay: number;
  onViewProjects: () => void;
}) {
  const { content } = usePortfolio();
  const hasProjects = item.showProjects && item.projectIndices.length > 0;

  return (
    <motion.div
      className="w-full md:max-w-sm p-6 rounded-xl border border-border/60 bg-card hover:border-primary/30 transition-all duration-300 group mb-4"
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <h3 className="font-serif font-bold text-foreground text-lg group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{item.org}</p>
        </div>
        <span className="font-mono text-xs text-primary/70 whitespace-nowrap sm:ml-4 sm:mt-1">
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
          type="button"
          onClick={onViewProjects}
          className="flex items-center gap-1.5 text-xs font-mono text-primary/70 hover:text-primary transition-colors group/btn mt-1"
        >
          <Layers
            size={12}
            className="group-hover/btn:scale-110 transition-transform"
          />
          {content.experience.viewProjects}
          <span className="text-primary/40 group-hover/btn:text-primary/70 transition-colors">
            ({item.projectIndices.length})
          </span>
        </button>
      )}
    </motion.div>
  );
}

function TimelineImage({
  item,
  side,
  inView,
  delay,
  onPreview,
}: {
  item: TimelineItem;
  side: 'left' | 'right';
  inView: boolean;
  delay: number;
  onPreview: () => void;
}) {
  const { content } = usePortfolio();
  const accent = side === 'left' ? 'right' : 'left';

  return (
    <motion.div
      className="hidden md:block w-full max-w-sm overflow-hidden rounded-xl border border-border/50 shadow-lg self-center my-4 cursor-zoom-in relative group/img"
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
          {content.experience.preview}
        </span>
      </div>
      <div
        className={`absolute ${accent}-0 top-0 bottom-0 w-0.5 bg-primary/50`}
      />
    </motion.div>
  );
}

export default function Experience() {
  const { content } = usePortfolio();
  const timeline = content.experience.items;
  const projects = content.projects.items;
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [lineProgress, setLineProgress] = useState(0);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null,
  );
  const [projectsModal, setProjectsModal] = useState<Project[] | null>(null);
  useBodyScrollLock(Boolean(lightbox));

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
            {content.sectionLabels.experience}
          </span>
        </div>

        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          data-testid="experience-title"
        >
          {content.experience.titlePrefix}{' '}
          <span className="gradient-text">
            {content.experience.titleAccent}
          </span>
        </motion.h2>

        <div ref={timelineRef} className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/30" />
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px pointer-events-none"
            style={{
              height: `${lineProgress * 100}%`,
              background:
                'linear-gradient(to bottom, hsl(var(--primary) / 0.9), hsl(var(--primary) / 0.3))',
              boxShadow:
                '0 0 8px hsl(var(--primary) / 0.6), 0 0 20px hsl(var(--primary) / 0.2)',
            }}
          />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const cardLeft = i % 2 === 0;
              const iconThreshold = i / Math.max(1, timeline.length - 1);
              const isLit = lineProgress >= iconThreshold - 0.02;
              const itemProjects = item.projectIndices
                .map((idx) => projects[idx])
                .filter(Boolean);

              return (
                <motion.div
                  key={`${item.org}-${item.period}`}
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  data-testid={`experience-item-${i}`}
                >
                  <div className="md:hidden flex items-start gap-4">
                    <div className="pt-5">
                      <TimelineDot item={item} isLit={isLit} />
                    </div>
                    <TimelineCard
                      item={item}
                      side="right"
                      inView={inView}
                      delay={i * 0.15 + 0.1}
                      onViewProjects={() => setProjectsModal(itemProjects)}
                    />
                  </div>

                  <div className="hidden md:flex items-start gap-0">
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
                            setLightbox({
                              src: item.image,
                              alt: item.imageAlt,
                            })
                          }
                        />
                      )}
                    </div>

                    <div className="relative z-10 shrink-0 flex items-start pt-5">
                      <TimelineDot item={item} isLit={isLit} />
                    </div>

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
                            setLightbox({
                              src: item.image,
                              alt: item.imageAlt,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overscroll-contain"
            data-lenis-prevent=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] rounded-xl overflow-hidden shadow-2xl"
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
                type="button"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
                onClick={() => setLightbox(null)}
              >
                <X size={16} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import AegonaImg from '@/assets/images/aegona.jpg';
import CuoiAgencyImg from '@/assets/images/cuoiagency.webp';
import FptEduImg from '@/assets/images/fptedu.jpg';

const timeline = [
  {
    type: 'work',
    icon: Briefcase,
    title: 'Junior Fullstack Developer',
    org: 'Software Company - Aegona',
    period: '2024 — Present',
    desc: 'Building scalable web applications with Angular, React and NestJS. Implementing REST APIs, managing MySQL databases, and collaborating in agile sprints.',
    tags: ['Angular', 'React', 'NestJS', 'MySQL', 'TypeScript'],
    image: AegonaImg,
    imageAlt: 'Developer coding at a laptop',
  },
  {
    type: 'work',
    icon: Briefcase,
    title: 'Fullstack Developer Intern',
    org: 'Cuoi Agency',
    period: '2024 — 2024',
    desc: 'Developed responsive React applications, integrated third-party APIs, and improved load times by 40% through code optimization and lazy loading.',
    tags: ['React', 'JavaScript', 'REST APIs'],
    image: CuoiAgencyImg,
    imageAlt: 'Colorful code on a monitor',
  },
  {
    type: 'edu',
    icon: GraduationCap,
    title: 'Website Developer & CS Student',
    org: 'FPT Polytechnic — Tay Nguyen',
    period: '2021 — 2023',
    desc: 'Focused on software engineering, algorithms, and web technologies. Built 10+ projects from full-stack apps to CLI tools.',
    tags: ['Algorithms', 'Data Structures', 'Web Dev', 'Databases'],
    image: FptEduImg,
    imageAlt: 'University campus',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress = 0 when top of timeline hits 80% of viewport
        // progress = 1 when bottom of timeline hits 30% of viewport
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
          {/* Track (unfilled bg) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/30" />

          {/* Fill layer */}
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

              // icon lights up when the fill line has reached this icon's position
              const iconThreshold = i / (timeline.length - 1);
              const isLit = lineProgress >= iconThreshold - 0.02;

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
                      <motion.div
                        className="w-full max-w-sm p-6 rounded-2xl border border-border/60 bg-card hover:border-primary/30 transition-all duration-300 group"
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: i * 0.15 + 0.1 }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-serif font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {item.org}
                            </p>
                          </div>
                          <span className="font-mono text-xs text-primary/70 whitespace-nowrap ml-4 mt-1">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {item.desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded-full bg-muted/60 border border-border/40 text-muted-foreground font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="hidden md:block w-full max-w-sm overflow-hidden rounded-2xl border border-border/50 shadow-lg self-center"
                        style={{ height: 190 }}
                        initial={{ opacity: 0, x: -24 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: i * 0.15 + 0.2 }}
                      >
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-primary/50" />
                      </motion.div>
                    )}
                  </div>

                  {/* CENTER — icon dot with lighting */}
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
                      <motion.div
                        className="w-full max-w-sm p-6 rounded-2xl border border-border/60 bg-card hover:border-primary/30 transition-all duration-300 group"
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: i * 0.15 + 0.1 }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-serif font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {item.org}
                            </p>
                          </div>
                          <span className="font-mono text-xs text-primary/70 whitespace-nowrap ml-4 mt-1">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {item.desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded-full bg-muted/60 border border-border/40 text-muted-foreground font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="hidden md:block w-full max-w-sm overflow-hidden rounded-2xl border border-border/50 shadow-lg self-center"
                        style={{ height: 190 }}
                        initial={{ opacity: 0, x: 24 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: i * 0.15 + 0.2 }}
                      >
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/50" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

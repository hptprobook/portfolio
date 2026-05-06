import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SkillBallPit from './SkillBallPit';
import { usePortfolio } from '@/lib/portfolio-context';

function SkillBar({
  level,
  color,
  delay,
}: {
  level: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="h-1.5 bg-border/60 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}80` }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: 'easeOut' }}
      />
    </div>
  );
}

export default function Skills() {
  const { content } = usePortfolio();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={ref}
      className="section-padding bg-muted/20 border-y border-border/40"
      data-testid="section-skills"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary font-mono text-sm">02.</span>
          <span className="h-px flex-1 max-w-15 bg-border" />
          <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
            {content.sectionLabels.skills}
          </span>
        </div>

        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          data-testid="skills-title"
        >
          {content.skills.titlePrefix}{' '}
          <span className="gradient-text">{content.skills.titleAccent}</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-sm mb-10 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {content.skills.intro}
        </motion.p>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="w-full">
            <SkillBallPit />
          </div>

          <div className="space-y-8">
            {content.skills.groups.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + gi * 0.12 }}
                className="space-y-4 rounded-xl border border-border/50 bg-card/60 p-5"
                data-testid={`skill-group-${gi}`}
              >
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-2">
                  {group.category}
                </h3>
                {group.items.map((skill, si) => (
                  <div
                    key={skill.name}
                    className="group"
                    data-testid={`skill-${skill.name.toLowerCase().replace(/\./g, '').replace(/\s/g, '')}`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <skill.icon
                          size={14}
                          style={{ color: skill.color }}
                          className="transition-transform duration-300 group-hover:scale-125 shrink-0"
                        />
                        <span className="text-sm text-foreground font-medium truncate">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                        {skill.experience}
                      </span>
                    </div>
                    <SkillBar
                      level={skill.level}
                      color={skill.color}
                      delay={0.5 + gi * 0.1 + si * 0.07}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

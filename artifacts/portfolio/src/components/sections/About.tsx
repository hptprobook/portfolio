import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolio } from '@/lib/portfolio-context';

export default function About() {
  const { content } = usePortfolio();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding max-w-6xl mx-auto"
      data-testid="section-about"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary font-mono text-sm">01.</span>
          <span className="h-px flex-1 max-w-15 bg-border" />
          <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
            {content.sectionLabels.about}
          </span>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-start">
          <div>
            <motion.h2
              className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              data-testid="about-title"
            >
              {content.about.headingTop}
              <br />
              <span className="gradient-text">
                {content.about.headingAccent}
              </span>
            </motion.h2>

            <motion.div
              className="space-y-4 text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {content.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-3 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              {content.about.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-border/60 bg-muted/30 text-sm font-mono text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors duration-200"
                  data-testid={`tag-${tag.toLowerCase().replace(/\s|\./g, '-')}`}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.about.traits.map((trait, i) => (
              <motion.div
                key={trait.title}
                className="p-6 rounded-xl border border-border/60 bg-card hover:border-primary/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -4 }}
                data-testid={`about-trait-${i}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <trait.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-serif font-semibold text-foreground mb-2">
                  {trait.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {trait.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

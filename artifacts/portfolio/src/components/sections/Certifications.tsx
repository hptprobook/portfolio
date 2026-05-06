import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { usePortfolio } from '@/lib/portfolio-context';

export default function Certifications() {
  const { content } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="section-padding max-w-6xl mx-auto"
      data-testid="section-certifications"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-primary font-mono text-sm">05.</span>
        <span className="h-px flex-1 max-w-15 bg-border" />
        <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
          {content.sectionLabels.certifications}
        </span>
      </div>

      <motion.h2
        className="text-4xl md:text-5xl font-serif font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        data-testid="certifications-title"
      >
        {content.certifications.titlePrefix}{' '}
        <span className="gradient-text">
          {content.certifications.titleAccent}
        </span>
      </motion.h2>

      <motion.p
        className="text-muted-foreground mb-14 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {content.certifications.intro}
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {content.certifications.items.map((cert, i) => (
          <motion.div
            key={cert.credentialId}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
            data-testid={`cert-card-${i}`}
          >
            <motion.div
              className="relative h-full p-6 rounded-xl border border-border/60 bg-card group cursor-default overflow-hidden"
              whileHover={{ y: -4, borderColor: cert.iconColor + '55' }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 20% 20%, ${cert.iconColor}12 0%, transparent 60%)`,
                }}
              />

              <div
                className="relative w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                style={{
                  backgroundColor: cert.bgColor,
                  border: `1px solid ${cert.iconColor}30`,
                }}
              >
                <cert.Icon size={24} style={{ color: cert.iconColor }} />
              </div>

              <h3 className="font-serif font-bold text-foreground text-base leading-snug mb-1 group-hover:text-primary transition-colors duration-300">
                {cert.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                {cert.issuer}
              </p>

              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-xs font-mono text-primary/80">
                  {content.certifications.issued} {cert.date}
                </span>
              </div>

              <p className="text-[11px] font-mono text-muted-foreground/60 truncate mb-4">
                {content.certifications.idLabel}: {cert.credentialId}
              </p>

              {cert.credentialUrl !== '#' && (
                <motion.a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-200 group/link"
                  whileHover={{ x: 2 }}
                  data-testid={`cert-verify-${i}`}
                >
                  {content.certifications.verify}
                  <ExternalLink
                    size={11}
                    className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
                  />
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

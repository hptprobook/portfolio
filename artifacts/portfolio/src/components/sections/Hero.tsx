import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '@/lib/portfolio-context';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function TypingWord({ words }: { words: string[] }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setWordIdx(0);
    setDisplayed('');
    setDeleting(false);
  }, [words]);

  useEffect(() => {
    const word = words[wordIdx] ?? words[0] ?? '';
    if (!word) return undefined;

    if (!deleting && displayed.length < word.length) {
      const t = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)),
        80,
      );
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === word.length) {
      const t = setTimeout(() => setDeleting(true), 1500);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
      return undefined;
    }

    return undefined;
  }, [displayed, deleting, wordIdx, words]);

  return (
    <span className="gradient-text text-glow">
      {displayed}
      <span className="inline-block w-0.5 h-[0.9em] bg-primary ml-1 animate-pulse align-middle" />
    </span>
  );
}

export default function Hero() {
  const { content } = usePortfolio();
  const { profile, hero } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgGradientRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const snippetRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const setters = snippetRefs.current.map((el) =>
      el ? gsap.quickSetter(el, 'x', 'px') : null,
    );
    const bgSetter = bgGradientRef.current
      ? gsap.quickSetter(bgGradientRef.current, 'x', 'px')
      : null;

    let targetX = 0;
    let currentX = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 40;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.07;
      setters.forEach((set, i) => set?.(currentX * hero.snippets[i].depth));
      bgSetter?.(currentX * 0.15);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [hero.snippets]);

  useGSAP(
    () => {
      if (
        !titleRef.current ||
        !subtitleRef.current ||
        !ctaRef.current ||
        !scrollRef.current
      ) {
        return;
      }

      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      )
        .fromTo(
          subtitleRef.current,
          { y: 30 },
          { y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5',
        )
        .fromTo(
          ctaRef.current,
          { y: 20 },
          { y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.4',
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.2',
        );

      gsap.to(scrollRef.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(contentRef.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(bgGradientRef.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      snippetRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: -(80 * hero.snippets[i].depth),
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  const handleScrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div ref={bgGradientRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-b from-primary/8 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,hsla(180,100%,50%,0.1),transparent_60%)]" />
      </div>

      {hero.snippets.map((s, i) => (
        <motion.div
          key={s.code}
          ref={(el) => {
            snippetRefs.current[i] = el;
          }}
          className="absolute hidden lg:block font-mono text-xs text-primary/20 whitespace-nowrap select-none pointer-events-none"
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.2, 0.4] }}
          transition={{
            delay: s.delay + 1.5,
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {s.code}
        </motion.div>
      ))}

      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          data-testid="hero-badge"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {hero.badge}
        </motion.div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight tracking-tight mb-6 opacity-0"
          data-testid="hero-title"
        >
          <span className="block text-foreground">{profile.name}</span>
          <span className="block text-3xl md:text-5xl lg:text-6xl mt-2">
            <TypingWord words={hero.words} /> {hero.titleSuffix}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          data-testid="hero-subtitle"
        >
          {hero.subtitle}
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          data-testid="hero-cta"
        >
          <motion.button
            onClick={() =>
              document
                .querySelector('#projects')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            data-testid="btn-view-projects"
          >
            {hero.primaryCta}
          </motion.button>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector('#contact')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-7 py-3.5 rounded-full border border-border text-foreground font-medium text-sm tracking-wide hover:border-primary/50 hover:text-primary transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            data-testid="btn-contact"
          >
            {hero.secondaryCta}
          </motion.a>
          <motion.a
            href={profile.cvUrl}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-primary/40 text-primary font-medium text-sm tracking-wide hover:bg-primary/10 transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            data-testid="btn-download-cv"
          >
            <Download size={16} />
            {hero.cvCta}
          </motion.a>
        </div>

        <div className="flex items-center justify-center gap-5">
          {[
            {
              icon: Github,
              href: profile.github,
              label: 'GitHub',
            },
            {
              icon: Linkedin,
              href: profile.linkedin,
              label: 'LinkedIn',
            },
            {
              icon: Mail,
              href: `mailto:${profile.email}`,
              label: 'Email',
            },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              data-testid={`btn-social-${label.toLowerCase()}`}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-0"
        onClick={handleScrollDown}
        data-testid="hero-scroll-indicator"
      >
        <span className="text-muted-foreground text-xs font-mono tracking-widest uppercase">
          {hero.scroll}
        </span>
        <ArrowDown size={16} className="text-primary" />
      </div>
    </section>
  );
}

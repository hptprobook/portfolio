import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Zap, Globe, Coffee } from "lucide-react";

const traits = [
  { icon: Code2, title: "Clean Code", desc: "I write readable, maintainable code that scales with your team and product." },
  { icon: Zap, title: "Performance", desc: "Optimized builds, lazy loading, and efficient algorithms — every millisecond counts." },
  { icon: Globe, title: "Fullstack", desc: "From REST APIs in NestJS to pixel-perfect React UIs, I own the full stack." },
  { icon: Coffee, title: "Fast Learner", desc: "Technology moves fast. I move faster. Always shipping, always learning." },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
          <span className="h-px flex-1 max-w-[60px] bg-border" />
          <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">About Me</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              data-testid="about-title"
            >
              Building the web,
              <br />
              <span className="gradient-text">one commit at a time.</span>
            </motion.h2>

            <motion.div
              className="space-y-4 text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p>
                I'm a junior fullstack JavaScript developer with a passion for building
                fast, accessible, and visually compelling web applications. I work across
                the entire stack — from designing scalable REST APIs with Node.js and NestJS
                to crafting smooth UI components in React and Angular.
              </p>
              <p>
                My approach is simple: understand the problem deeply, write clean code,
                ship fast, and iterate. I care about the details — from pixel-perfect
                layouts to well-structured database schemas.
              </p>
              <p>
                When I'm not coding, I'm exploring new frameworks, contributing to open
                source, or learning something that will make me a better developer tomorrow.
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              {["TypeScript", "JavaScript", "React", "Angular", "Node.js", "NestJS", "PostgreSQL", "Git"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-border/60 bg-muted/30 text-sm font-mono text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors duration-200"
                  data-testid={`tag-${tag.toLowerCase()}`}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.title}
                className="p-6 rounded-2xl border border-border/60 bg-card hover:border-primary/30 hover:bg-card transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -4 }}
                data-testid={`about-trait-${i}`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <trait.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-serif font-semibold text-foreground mb-2">{trait.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{trait.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

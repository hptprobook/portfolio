import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SkillBallPit from "./SkillBallPit";
import {
  SiReact, SiAngular, SiNodedotjs, SiNestjs,
  SiTypescript, SiJavascript, SiGit, SiPostgresql,
  SiMongodb, SiDocker, SiTailwindcss, SiExpress
} from "react-icons/si";

const skillGroups = [
  {
    category: "Frontend",
    items: [
      { name: "React.js",    icon: SiReact,       color: "#61DAFB", level: 85 },
      { name: "Angular",     icon: SiAngular,     color: "#DD0031", level: 75 },
      { name: "TypeScript",  icon: SiTypescript,  color: "#3178C6", level: 82 },
      { name: "Tailwind",    icon: SiTailwindcss, color: "#06B6D4", level: 90 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js",    icon: SiNodedotjs,  color: "#339933", level: 83 },
      { name: "NestJS",     icon: SiNestjs,     color: "#E0234E", level: 78 },
      { name: "Express",    icon: SiExpress,    color: "#aaaaaa", level: 88 },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", level: 72 },
    ],
  },
  {
    category: "Tools & Infra",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 90 },
      { name: "Git",        icon: SiGit,        color: "#F05032", level: 85 },
      { name: "MongoDB",    icon: SiMongodb,    color: "#47A248", level: 68 },
      { name: "Docker",     icon: SiDocker,     color: "#2496ED", level: 60 },
    ],
  },
];

function SkillBar({ level, color, delay }: { level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="h-1.5 bg-border/60 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}80` }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="section-padding bg-muted/20 border-y border-border/40"
      data-testid="section-skills"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary font-mono text-sm">02.</span>
          <span className="h-px flex-1 max-w-[60px] bg-border" />
          <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Skills</span>
        </div>

        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          data-testid="skills-title"
        >
          My <span className="gradient-text">Tech Stack</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-sm mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Move your mouse through the pit — the cursor pushes the bubbles around.
        </motion.p>

        {/* Two-column layout: ball pit left, skill bars right */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* LEFT — ball pit */}
          <div className="w-full">
            <SkillBallPit />
          </div>

          {/* RIGHT — progress bars */}
          <div className="space-y-8">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + gi * 0.12 }}
                className="space-y-4"
                data-testid={`skill-group-${gi}`}
              >
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-2">
                  {group.category}
                </h3>
                {group.items.map((skill, si) => (
                  <div
                    key={skill.name}
                    className="group"
                    data-testid={`skill-${skill.name.toLowerCase().replace(/\./g, "").replace(/\s/g, "")}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <skill.icon
                          size={14}
                          style={{ color: skill.color }}
                          className="transition-transform duration-300 group-hover:scale-125"
                        />
                        <span className="text-sm text-foreground font-medium">{skill.name}</span>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
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

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding max-w-6xl mx-auto"
      data-testid="section-contact"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-primary font-mono text-sm">05.</span>
        <span className="h-px flex-1 max-w-[60px] bg-border" />
        <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Contact</span>
      </div>

      <motion.h2
        className="text-4xl md:text-5xl font-serif font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        data-testid="contact-title"
      >
        Let's <span className="gradient-text">Work Together</span>
      </motion.h2>

      <motion.p
        className="text-muted-foreground max-w-lg mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Have a project in mind or just want to chat? I'm always open to new opportunities and collaborations.
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "alex@devportfolio.io", href: "mailto:alex@devportfolio.io" },
              { icon: MapPin, label: "Location", value: "Available Worldwide — Remote", href: undefined },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm text-foreground hover:text-primary transition-colors" data-testid={`contact-${label.toLowerCase()}`}>{value}</a>
                  ) : (
                    <p className="text-sm text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4">Find me on</p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/60 bg-card text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 text-sm"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  data-testid={`contact-social-${label.toLowerCase()}`}
                >
                  <Icon size={15} />
                  {label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          data-testid="contact-form"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2 block">Name</label>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-border/60 bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                data-testid="input-name"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-border/60 bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                data-testid="input-email"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2 block">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 rounded-xl border border-border/60 bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
              data-testid="input-message"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            data-testid="btn-send-message"
          >
            {sent ? (
              <>
                <CheckCircle size={16} />
                Message Sent!
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </motion.button>
        </motion.form>
      </div>

      <motion.div
        className="mt-20 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <span>Designed & Built by Alex Dev — 2024</span>
        <span>React · NestJS · TypeScript</span>
      </motion.div>
    </section>
  );
}

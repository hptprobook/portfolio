import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { usePortfolio } from '@/lib/portfolio-context';

export default function Contact() {
  const { content } = usePortfolio();
  const { profile, contact } = content;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact - ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n${form.name}\n${form.email}`,
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
        <span className="text-primary font-mono text-sm">06.</span>
        <span className="h-px flex-1 max-w-[60px] bg-border" />
        <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
          {content.sectionLabels.contact}
        </span>
      </div>

      <motion.h2
        className="text-4xl md:text-5xl font-serif font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        data-testid="contact-title"
      >
        {contact.titlePrefix}{' '}
        <span className="gradient-text">{contact.titleAccent}</span>
      </motion.h2>

      <motion.p
        className="text-muted-foreground max-w-lg mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {contact.intro}
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Mail,
                label: contact.labels.email,
                value: profile.email,
                href: `mailto:${profile.email}`,
              },
              {
                icon: Phone,
                label: contact.labels.phone,
                value: profile.phone,
                href: `tel:${profile.phone}`,
              },
              {
                icon: Globe,
                label: contact.labels.website,
                value: profile.website,
                href: profile.websiteUrl,
              },
              {
                icon: MapPin,
                label: contact.labels.location,
                value: profile.location,
                href: undefined,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-mono">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-sm text-foreground hover:text-primary transition-colors break-words"
                      data-testid={`contact-${label.toLowerCase()}`}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4">
              {contact.labels.findMe}
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Github, href: profile.github, label: 'GitHub' },
                { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
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
              <label className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2 block">
                {contact.labels.name}
              </label>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder={contact.placeholders.name}
                className="w-full px-4 py-3 rounded-xl border border-border/60 bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                data-testid="input-name"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2 block">
                {contact.labels.email}
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder={contact.placeholders.email}
                className="w-full px-4 py-3 rounded-xl border border-border/60 bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                data-testid="input-email"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2 block">
              {contact.labels.message}
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder={contact.placeholders.message}
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
                {contact.sent}
              </>
            ) : (
              <>
                <Send size={16} />
                {contact.send}
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
        <span>{contact.footerLeft}</span>
        <span>{contact.footerRight}</span>
      </motion.div>
    </section>
  );
}

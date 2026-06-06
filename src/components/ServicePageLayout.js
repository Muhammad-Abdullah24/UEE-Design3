'use client';
import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// ─── HERO ─────────────────────────────────────────────────────────
function ServiceHero({ title, subtitle, description, accent, breadcrumb, badge, watermark }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);
  const words = title.split(' ');

  return (
    <section className="relative overflow-hidden flex items-center pt-24 pb-16 min-h-[65vh]"
      style={{ background: 'var(--void)' }}>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(0,230,118,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,230,118,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }} />

      {/* Watermark */}
      <motion.div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(50px, 10vw, 180px)',
        letterSpacing: '-0.06em',
        color: `${accent}08`,
        whiteSpace: 'nowrap',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        y,
      }}>{watermark || title.toUpperCase()}</motion.div>

      {/* Blob */}
      <div className="absolute top-[10%] right-[8%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}08 0%, transparent 70%)` }} />

      <motion.div style={{ opacity }}
        className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12 w-full relative z-[2]">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-10 font-body text-[13px]"
          style={{ color: 'var(--text-muted-dark)' }}
        >
          <Link href="/" style={{ color: 'var(--text-muted-dark)', textDecoration: 'none' }}>Home</Link>
          <span style={{ opacity: 0.4 }}>→</span>
          <Link href="/services" style={{ color: 'var(--text-muted-dark)', textDecoration: 'none' }}>Services</Link>
          <span style={{ opacity: 0.4 }}>→</span>
          <span style={{ color: accent }}>{breadcrumb}</span>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7"
          style={{ background: `${accent}12`, border: `1px solid ${accent}30` }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          <span className="font-body font-semibold text-[12px] tracking-widest uppercase"
            style={{ color: accent }}>{badge}</span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display font-bold leading-none tracking-tight mb-7"
          style={{ fontSize: 'clamp(36px, 6vw, 86px)', letterSpacing: '-0.04em', color: 'var(--text-dark)' }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'inline-block',
                marginRight: '0.22em',
                color: i === words.length - 1 ? accent : 'var(--text-dark)',
              }}
            >{word}</motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="font-body font-normal text-base md:text-lg leading-relaxed max-w-[580px]"
          style={{ color: 'var(--text-muted-dark)' }}
        >{description}</motion.p>
      </motion.div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-[3]">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }}>
          <path d="M0,20 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--offwhite)" />
        </svg>
      </div>
    </section>
  );
}

// ─── OVERVIEW SPLIT ───────────────────────────────────────────────
function ServiceOverview({ overview, capabilities, accent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--offwhite)' }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — prose */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-0.5" style={{ background: accent }} />
              <span className="font-body font-semibold text-[12px] tracking-[0.14em] uppercase"
                style={{ color: accent }}>Overview</span>
            </div>
            <h2 className="font-display font-bold leading-tight tracking-tight mb-6"
              style={{ fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
              What We Deliver
            </h2>
            {overview.map((para, i) => (
              <p key={i} className="font-body font-normal text-[15px] leading-relaxed mb-4"
                style={{ color: '#3A5A44' }}>{para}</p>
            ))}
          </motion.div>

          {/* Right — capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-0.5" style={{ background: accent }} />
              <span className="font-body font-semibold text-[12px] tracking-[0.14em] uppercase"
                style={{ color: accent }}>Capabilities</span>
            </div>
            <h2 className="font-display font-bold leading-tight tracking-tight mb-7"
              style={{ fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
              What's Included
            </h2>
            <div className="flex flex-col gap-3">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                  className="flex items-start gap-3 rounded-xl px-4 py-3.5 bg-white"
                  style={{ border: `1px solid ${accent}15` }}
                >
                  <div className="w-5 h-5 min-w-[20px] rounded-md flex items-center justify-center mt-0.5"
                    style={{ background: `${accent}15`, border: `1px solid ${accent}35` }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-body font-normal text-sm leading-relaxed"
                    style={{ color: '#3A5A44' }}>{cap}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SYSTEMS GRID ─────────────────────────────────────────────────
function SystemsGrid({ systems, accent }) {
  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--void)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5" style={{ background: accent }} />
            <span className="font-body font-semibold text-[12px] tracking-[0.14em] uppercase"
              style={{ color: accent }}>Systems & Technologies</span>
          </div>
          <h2 className="font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(26px, 3.5vw, 46px)', color: 'var(--text-dark)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Technologies We Deploy
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {systems.map((sys, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: '-40px' });
            return (
              <motion.div
                key={sys.name}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="rounded-2xl p-7 relative overflow-hidden"
                style={{ background: 'var(--void-2)', border: `1px solid ${accent}15` }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                <div className="font-display font-bold text-[13px] mb-2.5 opacity-70"
                  style={{ color: accent }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-display font-bold text-[19px] leading-tight mb-2.5"
                  style={{ color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>{sys.name}</h3>
                <p className="font-body font-normal text-[13px] leading-relaxed"
                  style={{ color: 'var(--text-muted-dark)' }}>{sys.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDY STRIP ─────────────────────────────────────────────
function CaseStudyStrip({ cases, accent }) {
  if (!cases || cases.length === 0) return null;
  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--offwhite)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3.5">
            <div className="w-8 h-0.5" style={{ background: accent }} />
            <span className="font-body font-semibold text-[12px] tracking-[0.14em] uppercase"
              style={{ color: accent }}>Real Projects</span>
          </div>
          <h2 className="font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Proven in the Field
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.client}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 relative overflow-hidden"
              style={{ border: `1px solid ${accent}18` }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              <div className="font-display font-bold text-[15px] mb-1.5"
                style={{ color: 'var(--ink)' }}>{c.client}</div>
              <div className="font-body font-semibold text-[12px] tracking-widest uppercase mb-3.5"
                style={{ color: accent }}>{c.location}</div>
              <p className="font-body font-normal text-sm leading-relaxed mb-5"
                style={{ color: '#3A5A44' }}>{c.detail}</p>
              {c.metric && (
                <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
                  style={{ background: `${accent}10`, border: `1px solid ${accent}25` }}>
                  <span className="font-display font-bold text-base"
                    style={{ color: accent, letterSpacing: '-0.02em' }}>{c.metric}</span>
                  <span className="font-body font-medium text-[12px]"
                    style={{ color: '#4A6054' }}>{c.metricLabel}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BOTTOM CTA ───────────────────────────────────────────────────
function ServiceCTA({ title, accent }) {
  return (
    <section className="py-20 md:py-28 px-6 text-center relative overflow-hidden"
      style={{ background: 'var(--void)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${accent}07 0%, transparent 70%)` }} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-[1] max-w-[640px] mx-auto"
      >
        <h2 className="font-display font-bold leading-tight mb-5"
          style={{ fontSize: 'clamp(26px, 4.5vw, 56px)', color: 'var(--text-dark)', letterSpacing: '-0.03em' }}>
          Need a {title} solution<br />
          <span style={{ color: accent }}>for your facility?</span>
        </h2>
        <p className="font-body font-normal text-base md:text-lg leading-relaxed mb-11 max-w-[480px] mx-auto"
          style={{ color: 'var(--text-muted-dark)' }}>
          Our engineers will review your requirements and provide a detailed proposal. Free consultation, no obligation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact"
            className="inline-flex items-center justify-center font-body font-bold text-[15px] text-void no-underline px-9 py-4 rounded-full transition-all duration-200"
            style={{ background: accent }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Request a Consultation →</Link>
          <Link href="/services"
            className="inline-flex items-center justify-center font-body font-semibold text-[15px] no-underline px-9 py-4 rounded-full transition-all duration-200"
            style={{ color: 'var(--text-dark)', border: '1.5px solid rgba(255,255,255,0.15)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
          >← All Services</Link>
        </div>
      </motion.div>
    </section>
  );
}

// ─── EXPORTED LAYOUT ASSEMBLER ────────────────────────────────────
export default function ServicePageLayout({ data }) {
  return (
    <main>
      <ServiceHero {...data.hero} />
      <ServiceOverview overview={data.overview} capabilities={data.capabilities} accent={data.hero.accent} />
      <SystemsGrid systems={data.systems} accent={data.hero.accent} />
      {data.cases && <CaseStudyStrip cases={data.cases} accent={data.hero.accent} />}
      <ServiceCTA title={data.hero.breadcrumb} accent={data.hero.accent} />
    </main>
  );
}
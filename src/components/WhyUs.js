'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const reasons = [
  {
    num: '01',
    title: 'Four Decades of Trust',
    body: 'Founded in 1980, UEE has delivered environmental engineering solutions across Malaysia, Pakistan, and 15+ countries. Governments and industry leaders rely on our track record.',
    accent: 'var(--lime)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L20 12L28 13L22 19L23.5 28L16 24L8.5 28L10 19L4 13L12 12L16 4Z" stroke="var(--lime)" strokeWidth="1.8" fill="rgba(0,230,118,0.1)" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'End-to-End Delivery',
    body: 'From concept to commissioning, operation to maintenance — we are the single point of accountability for your entire environmental infrastructure.',
    accent: 'var(--cyan)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="var(--cyan)" strokeWidth="1.8" fill="rgba(0,229,255,0.08)" />
        <path d="M10 16L14 20L22 12" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Proven at Scale',
    body: 'DAF systems processing 24,000 m³/day. Hospital food waste composters. Industrial incinerators. Our references speak in metric tons and cubic metres, not brochures.',
    accent: 'var(--lime)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="20" width="6" height="8" rx="1.5" fill="rgba(0,230,118,0.15)" stroke="var(--lime)" strokeWidth="1.5" />
        <rect x="13" y="14" width="6" height="14" rx="1.5" fill="rgba(0,230,118,0.1)" stroke="var(--lime)" strokeWidth="1.5" />
        <rect x="22" y="8" width="6" height="20" rx="1.5" fill="rgba(0,230,118,0.08)" stroke="var(--lime)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Technology + Service',
    body: 'We design proprietary systems like the HiWave Compo machine and back them with long-term service contracts, operator training, and 24/7 commissioning support.',
    accent: 'var(--cyan)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 16C8 11.582 11.582 8 16 8C20.418 8 24 11.582 24 16" stroke="var(--cyan)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 22H27" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 22V26M16 22V28M20 22V26" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function WhyUsC() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'var(--offwhite)' }}>

      {/* Background blobs */}
      <motion.div style={{ y: bgY }}
        className="absolute top-[10%] -left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        css={{ background: 'radial-gradient(circle, rgba(0,230,118,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1100px] mx-auto px-6 md:px-10 xl:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5" style={{ background: 'var(--lime-dim)' }} />
            <span className="font-body font-semibold text-[12px] tracking-[0.14em] uppercase"
              style={{ color: 'var(--lime-dim)' }}>Why Choose UEE</span>
            <div className="w-8 h-0.5" style={{ background: 'var(--lime-dim)' }} />
          </div>
          <h2 className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Built on Results,<br />
            <span style={{ color: 'var(--lime-dim)' }}>Not Promises</span>
          </h2>
        </motion.div>

        {/* Zigzag blocks */}
        <div className="flex flex-col gap-4">
          {reasons.map((r, i) => {
            const isEven = i % 2 === 0;
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: '-60px' });

            return (
              <motion.div
                key={r.num}
                ref={ref}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white rounded-2xl p-6 md:p-9 relative overflow-hidden"
                style={{
                  flexDirection: isEven ? undefined : undefined,
                  border: `1px solid ${isEven ? 'rgba(0,200,83,0.12)' : 'rgba(0,229,255,0.12)'}`,
                }}
              >
                {/* Giant number BG — hidden on mobile */}
                <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 font-display font-bold leading-none pointer-events-none select-none"
                  style={{
                    [isEven ? 'right' : 'left']: 24,
                    fontSize: 'clamp(80px, 10vw, 140px)',
                    color: isEven ? 'rgba(0,200,83,0.06)' : 'rgba(0,229,255,0.06)',
                    letterSpacing: '-0.05em',
                  }}>{r.num}</div>

                {/* Icon */}
                <div className="w-16 h-16 min-w-[64px] rounded-[18px] flex items-center justify-center relative z-[1]"
                  style={{
                    background: isEven ? 'rgba(0,200,83,0.08)' : 'rgba(0,229,255,0.08)',
                    border: `1.5px solid ${isEven ? 'rgba(0,200,83,0.2)' : 'rgba(0,229,255,0.2)'}`,
                  }}>
                  {r.icon}
                </div>

                {/* Text */}
                <div className="relative z-[1] flex-1">
                  <h3 className="font-display font-bold text-xl md:text-2xl mb-2.5"
                    style={{ color: 'var(--ink)', letterSpacing: '-0.02em' }}>{r.title}</h3>
                  <p className="font-body font-normal text-sm md:text-[15px] leading-relaxed max-w-[580px]"
                    style={{ color: '#4A6054' }}>{r.body}</p>
                </div>

                {/* Left/right accent bar */}
                <div className="absolute top-0 bottom-0 w-[3px] rounded-full"
                  style={{
                    [isEven ? 'left' : 'right']: 0,
                    background: `linear-gradient(180deg, ${r.accent}, transparent)`,
                  }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
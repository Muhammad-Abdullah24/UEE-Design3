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
        <path d="M16 4L20 12L28 13L22 19L23.5 28L16 24L8.5 28L10 19L4 13L12 12L16 4Z" stroke="var(--lime)" strokeWidth="1.8" fill="rgba(0,230,118,0.1)" strokeLinejoin="round"/>
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
        <circle cx="16" cy="16" r="10" stroke="var(--cyan)" strokeWidth="1.8" fill="rgba(0,229,255,0.08)"/>
        <path d="M10 16L14 20L22 12" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        <rect x="4" y="20" width="6" height="8" rx="1.5" fill="rgba(0,230,118,0.15)" stroke="var(--lime)" strokeWidth="1.5"/>
        <rect x="13" y="14" width="6" height="14" rx="1.5" fill="rgba(0,230,118,0.1)" stroke="var(--lime)" strokeWidth="1.5"/>
        <rect x="22" y="8" width="6" height="20" rx="1.5" fill="rgba(0,230,118,0.08)" stroke="var(--lime)" strokeWidth="1.5"/>
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
        <path d="M8 16C8 11.582 11.582 8 16 8C20.418 8 24 11.582 24 16" stroke="var(--cyan)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M5 22H27" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 22V26M16 22V28M20 22V26" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function WhyUsC() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section ref={sectionRef} style={{
      background: 'var(--offwhite)',
      padding: '120px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background decoration */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%', left: '-5%',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,230,118,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          y: bgY,
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%', right: '-5%',
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          y: bgY,
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 80, textAlign: 'center' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            marginBottom: 16,
          }}>
            <div style={{ width: 32, height: 2, background: 'var(--lime-dim)' }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--lime-dim)',
            }}>Why Choose UEE</span>
            <div style={{ width: 32, height: 2, background: 'var(--lime-dim)' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(32px, 4vw, 52px)',
            color: 'var(--ink)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}>
            Built on Results,<br />
            <span style={{ color: 'var(--lime-dim)' }}>Not Promises</span>
          </h2>
        </motion.div>

        {/* Zigzag blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
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
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 48,
                  flexDirection: isEven ? 'row' : 'row-reverse',
                  background: 'white',
                  border: `1px solid ${isEven ? 'rgba(0,200,83,0.12)' : 'rgba(0,229,255,0.12)'}`,
                  borderRadius: 20,
                  padding: '36px 40px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Giant number BG */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  [isEven ? 'right' : 'left']: 24,
                  transform: 'translateY(-50%)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 140,
                  lineHeight: 1,
                  color: isEven ? 'rgba(0,200,83,0.06)' : 'rgba(0,229,255,0.06)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  letterSpacing: '-0.05em',
                }}>{r.num}</div>

                {/* Icon box */}
                <div style={{
                  width: 72, height: 72, minWidth: 72,
                  background: isEven ? 'rgba(0,200,83,0.08)' : 'rgba(0,229,255,0.08)',
                  border: `1.5px solid ${isEven ? 'rgba(0,200,83,0.2)' : 'rgba(0,229,255,0.2)'}`,
                  borderRadius: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', zIndex: 1,
                }}>
                  {r.icon}
                </div>

                {/* Text */}
                <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 24,
                    color: 'var(--ink)',
                    marginBottom: 10,
                    letterSpacing: '-0.02em',
                  }}>{r.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: 15,
                    color: '#4A6054',
                    lineHeight: 1.7,
                    maxWidth: 580,
                  }}>{r.body}</p>
                </div>

                {/* Left accent border */}
                <div style={{
                  position: 'absolute',
                  [isEven ? 'left' : 'right']: 0,
                  top: 0, bottom: 0,
                  width: 3,
                  background: `linear-gradient(180deg, ${r.accent}, transparent)`,
                  borderRadius: isEven ? '20px 0 0 20px' : '0 20px 20px 0',
                }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
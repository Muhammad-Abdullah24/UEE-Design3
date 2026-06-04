'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const bentoItems = [
  {
    id: 'main',
    colSpan: 2,
    rowSpan: 2,
    bg: 'var(--offwhite)',
    border: 'rgba(0,230,118,0.15)',
    content: 'main',
  },
  {
    id: 'stat1',
    colSpan: 1,
    rowSpan: 1,
    bg: 'var(--lime)',
    content: 'stat1',
  },
  {
    id: 'stat2',
    colSpan: 1,
    rowSpan: 1,
    bg: 'var(--void-3)',
    content: 'stat2',
  },
  {
    id: 'mission',
    colSpan: 2,
    rowSpan: 1,
    bg: 'var(--void-2)',
    content: 'mission',
  },
];

function BentoCell({ item, children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: item.bg,
        border: `1px solid ${item.border || 'transparent'}`,
        borderRadius: 20,
        padding: 32,
        gridColumn: `span ${item.colSpan}`,
        gridRow: `span ${item.rowSpan}`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutC() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 40]);

  const checks = [
    'Integrated waste treatment and energy recovery systems',
    'ISO-certified processes, 40 years of proven delivery',
    'End-to-end: design, installation, commissioning, maintenance',
    'Projects across Malaysia, Pakistan, and 15+ countries',
  ];

  return (
    <section ref={sectionRef} style={{
      background: 'var(--void)',
      padding: '100px 0 120px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: '20%', right: '-10%',
        width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 48,
          }}
        >
          <div style={{ width: 32, height: 2, background: 'var(--lime)' }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--lime)',
          }}>About UEE</span>
        </motion.div>

        {/* Bento grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto',
          gap: 16,
        }}>

          {/* MAIN card */}
          <BentoCell item={{ bg: '#0C1A0F', border: 'rgba(0,230,118,0.12)', colSpan: 2, rowSpan: 2 }} delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 340 }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(30px, 3.5vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--text-dark)',
                marginBottom: 20,
              }}>
                One Stop Solution Center<br />
                <span style={{ color: 'var(--lime)' }}>for Treatment</span> &<br />
                Recycling of Waste
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: 15,
                lineHeight: 1.75,
                color: 'var(--text-muted-dark)',
                maxWidth: 460,
                marginBottom: 28,
              }}>
                Universal Environmental Engineering has been at the forefront of waste
                treatment technology since 1980. From wastewater systems to biogas recovery,
                we design, build, and maintain integrated solutions for industrial and
                municipal clients across Asia and beyond.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {checks.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
                  >
                    <div style={{
                      width: 18, height: 18, minWidth: 18,
                      background: 'rgba(0,230,118,0.15)',
                      border: '1px solid rgba(0,230,118,0.4)',
                      borderRadius: 4,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: 2,
                    }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 400,
                      fontSize: 14,
                      color: '#8DB89D',
                      lineHeight: 1.5,
                    }}>{c}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCell>

          {/* Stat card 1 — lime bg */}
          <BentoCell item={{ bg: 'var(--lime)', colSpan: 1, rowSpan: 1 }} delay={0.2}>
            <motion.div style={{ y: y1 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 64,
                lineHeight: 1,
                color: 'var(--void)',
                letterSpacing: '-0.04em',
              }}>40+</div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 14,
                color: 'rgba(6,13,8,0.7)',
                marginTop: 8,
                letterSpacing: '0.02em',
              }}>Years of<br />proven expertise</div>
              <div style={{
                position: 'absolute',
                bottom: 20, right: 24,
                width: 48, height: 48,
                border: '2px solid rgba(6,13,8,0.2)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L10 18M2 10L18 10" stroke="rgba(6,13,8,0.6)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </motion.div>
          </BentoCell>

          {/* Stat card 2 — dark */}
          <BentoCell item={{ bg: '#0A1F12', border: 'rgba(0,229,255,0.15)', colSpan: 1, rowSpan: 1 }} delay={0.3}>
            <motion.div style={{ y: y2 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 64,
                lineHeight: 1,
                color: 'var(--cyan)',
                letterSpacing: '-0.04em',
              }}>500+</div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 14,
                color: 'var(--text-muted-dark)',
                marginTop: 8,
              }}>Projects<br />completed worldwide</div>
            </motion.div>
          </BentoCell>

          {/* Mission strip */}
          <BentoCell item={{ bg: 'linear-gradient(135deg, #0A1F12 0%, #071814 100%)', border: 'rgba(0,230,118,0.1)', colSpan: 2, rowSpan: 1 }} delay={0.25}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{
                width: 48, height: 48, minWidth: 48,
                background: 'rgba(0,230,118,0.12)',
                borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--lime)" strokeWidth="1.5"/>
                  <path d="M12 6V12L16 14" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 18,
                  color: 'var(--text-dark)',
                  marginBottom: 4,
                }}>Our Mission</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 14,
                  color: 'var(--text-muted-dark)',
                  lineHeight: 1.6,
                }}>
                  "Towards a Safer and Cleaner World" — delivering integrated environmental engineering solutions with global reach and local expertise.
                </div>
              </div>
            </div>
          </BentoCell>

        </div>
      </div>
    </section>
  );
}
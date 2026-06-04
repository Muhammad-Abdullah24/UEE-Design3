'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: 'The DAF system installed by UEE has been running continuously since 2003 with over 90% suspended solids removal. Exceptional engineering and after-sales support.',
    name: 'Century Paper & Board Mills Ltd',
    role: 'Industrial Client, Pakistan',
    metric: '90%+ SS removal',
    metricLabel: 'since 2003',
    accent: 'var(--lime)',
  },
  {
    quote: 'UEE\'s HiWave Compo machine transformed our hospital food waste into fertilizer on-site. The system is reliable, odour-free, and completely automated.',
    name: 'Putrajaya Hospital',
    role: 'Healthcare Client, Malaysia',
    metric: '100%',
    metricLabel: 'waste diverted',
    accent: 'var(--cyan)',
  },
  {
    quote: 'From feasibility to commissioning, UEE handled everything professionally. The wastewater treatment plant has met all regulatory requirements from day one.',
    name: 'Leather Field (Pvt) Ltd',
    role: 'Industrial Client, Pakistan',
    metric: '100%',
    metricLabel: 'compliance',
    accent: 'var(--lime)',
  },
  {
    quote: 'A truly reliable partner for environmental compliance. Their technical knowledge of emissions regulations is unmatched in the region.',
    name: 'Pertubuhan Pengurusan',
    role: 'Municipal Client, Malaysia',
    metric: '20+',
    metricLabel: 'years partnership',
    accent: 'var(--cyan)',
  },
];

export default function TestimonialsC() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  const t = testimonials[active];

  return (
    <section style={{
      background: 'var(--void)',
      padding: '120px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 400,
        background: 'radial-gradient(ellipse, rgba(0,230,118,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 64, justifyContent: 'center',
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
          }}>Client Testimonials</span>
          <div style={{ width: 32, height: 2, background: 'var(--lime)' }} />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}>
          {/* LEFT — main featured card */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ position: 'relative', height: 340 }}
          >
            {/* Fan cards behind */}
            {testimonials.map((_, i) => {
              const offset = (i - active + testimonials.length) % testimonials.length;
              if (offset === 0) return null;
              const rotations = [0, -4, -8, -12];
              const scales = [1, 0.96, 0.92, 0.88];
              const zIndexes = [10, 7, 4, 1];
              const translateY = [0, 6, 12, 18];
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'var(--void-2)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 24,
                    transform: `rotate(${rotations[offset]}deg) scale(${scales[offset]}) translateY(${translateY[offset]}px)`,
                    zIndex: zIndexes[offset],
                    transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                    transformOrigin: 'bottom center',
                  }}
                />
              );
            })}

            {/* Active card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'var(--void-3)',
                  border: `1px solid ${t.accent}30`,
                  borderRadius: 24,
                  padding: '40px 36px',
                  zIndex: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: `0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px ${t.accent}10`,
                }}
              >
                {/* Quote mark */}
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 80,
                  lineHeight: 0.6,
                  color: t.accent,
                  opacity: 0.4,
                  marginBottom: 16,
                }}>"</div>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: '#B2CFB8',
                  flex: 1,
                }}>
                  {t.quote}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 32,
                  paddingTop: 24,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 15,
                      color: 'var(--text-dark)',
                      marginBottom: 3,
                    }}>{t.name}</div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13,
                      color: 'var(--text-muted-dark)',
                    }}>{t.role}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 22,
                      color: t.accent,
                      letterSpacing: '-0.03em',
                    }}>{t.metric}</div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 11,
                      color: 'var(--text-muted-dark)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}>{t.metricLabel}</div>
                  </div>
                </div>

                {/* Accent top line */}
                <div style={{
                  position: 'absolute', top: 0, left: 24, right: 24, height: 2,
                  background: `linear-gradient(90deg, ${t.accent}, transparent)`,
                  borderRadius: 2,
                }} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — heading + nav dots + list */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(30px, 3.5vw, 44px)',
                color: 'var(--text-dark)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              Trusted by Industry<br />
              <span style={{ color: 'var(--lime)' }}>Leaders Worldwide</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: 15,
                lineHeight: 1.75,
                color: 'var(--text-muted-dark)',
                marginBottom: 40,
              }}
            >
              From paper mills to hospitals, from Malaysia to Pakistan — our clients trust UEE to deliver compliant, reliable environmental systems that perform for decades.
            </motion.p>

            {/* Dot navigation */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 40 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? 32 : 8,
                    height: 8,
                    borderRadius: 100,
                    background: i === active ? 'var(--lime)' : 'rgba(255,255,255,0.15)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Client list */}
            {testimonials.map((t2, i) => (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  opacity: i === active ? 1 : 0.45,
                  transition: 'opacity 0.3s',
                }}
              >
                <div style={{
                  width: 6, height: 6,
                  borderRadius: '50%',
                  background: i === active ? t2.accent : 'rgba(255,255,255,0.2)',
                  transition: 'background 0.3s',
                }} />
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 14,
                    color: 'var(--text-dark)',
                  }}>{t2.name}</div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: 'var(--text-muted-dark)',
                  }}>{t2.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
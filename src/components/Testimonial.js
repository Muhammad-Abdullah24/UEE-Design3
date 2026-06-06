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
    quote: "UEE's HiWave Compo machine transformed our hospital food waste into fertilizer on-site. The system is reliable, odour-free, and completely automated.",
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
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'var(--void)' }}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,230,118,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16 justify-center"
        >
          <div className="w-8 h-0.5" style={{ background: 'var(--lime)' }} />
          <span className="font-body font-semibold text-[12px] tracking-[0.14em] uppercase"
            style={{ color: 'var(--lime)' }}>Client Testimonials</span>
          <div className="w-8 h-0.5" style={{ background: 'var(--lime)' }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT — fan deck card */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative h-[300px] sm:h-[340px]"
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
                <div key={i} className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'var(--void-2)',
                    border: '1px solid rgba(255,255,255,0.05)',
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
                className="absolute inset-0 rounded-3xl p-8 md:p-10 flex flex-col justify-between"
                style={{
                  background: 'var(--void-3)',
                  border: `1px solid ${t.accent}30`,
                  zIndex: 20,
                  boxShadow: `0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px ${t.accent}10`,
                }}
              >
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 64,
                  lineHeight: 0.6,
                  color: t.accent,
                  opacity: 0.4,
                  marginBottom: 12,
                }}>"</div>

                <p className="font-body font-normal text-sm md:text-base leading-relaxed flex-1"
                  style={{ color: '#B2CFB8' }}>{t.quote}</p>

                <div className="flex items-center justify-between mt-8 pt-6"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <div className="font-display font-bold text-[15px] mb-0.5" style={{ color: 'var(--text-dark)' }}>{t.name}</div>
                    <div className="font-body text-[13px]" style={{ color: 'var(--text-muted-dark)' }}>{t.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold text-xl" style={{ color: t.accent, letterSpacing: '-0.03em' }}>{t.metric}</div>
                    <div className="font-body text-[11px] tracking-widest uppercase" style={{ color: 'var(--text-muted-dark)' }}>{t.metricLabel}</div>
                  </div>
                </div>

                <div className="absolute top-0 left-6 right-6 h-0.5 rounded-sm"
                  style={{ background: `linear-gradient(90deg, ${t.accent}, transparent)` }} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — heading + nav + list */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', color: 'var(--text-dark)', letterSpacing: '-0.03em' }}
            >
              Trusted by Industry<br />
              <span style={{ color: 'var(--lime)' }}>Leaders Worldwide</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-body font-normal text-[15px] leading-relaxed mb-10"
              style={{ color: 'var(--text-muted-dark)' }}
            >
              From paper mills to hospitals, from Malaysia to Pakistan — our clients trust UEE to deliver compliant, reliable environmental systems that perform for decades.
            </motion.p>

            {/* Dot nav */}
            <div className="flex gap-2.5 mb-10">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className="h-2 rounded-full border-none cursor-pointer transition-all duration-300 p-0"
                  style={{
                    width: i === active ? 32 : 8,
                    background: i === active ? 'var(--lime)' : 'rgba(255,255,255,0.15)',
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
                className="flex items-center gap-3 py-3 cursor-pointer transition-opacity duration-300"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  opacity: i === active ? 1 : 0.45,
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                  style={{ background: i === active ? t2.accent : 'rgba(255,255,255,0.2)' }} />
                <div>
                  <div className="font-display font-semibold text-sm" style={{ color: 'var(--text-dark)' }}>{t2.name}</div>
                  <div className="font-body text-xs" style={{ color: 'var(--text-muted-dark)' }}>{t2.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
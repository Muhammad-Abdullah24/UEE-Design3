'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const services = [
  {
    num: '01',
    title: 'Wastewater Treatment',
    desc: 'Activated sludge systems, DAF, biological treatment for industrial and municipal clients. Proven capacity up to 24,000 m³/day.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4C18 4 8 12 8 20C8 25.523 12.477 30 18 30C23.523 30 28 25.523 28 20C28 12 18 4 18 4Z" stroke="var(--cyan)" strokeWidth="1.8" fill="rgba(0,229,255,0.08)"/>
        <path d="M12 20C12 20 14 16 18 16C22 16 24 20 24 20" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    accent: 'var(--cyan)',
    accentBg: 'rgba(0,229,255,0.08)',
  },
  {
    num: '02',
    title: 'Solid Waste & Biomass',
    desc: 'HiWave Compo composting machines, incineration systems, biomass-to-energy conversion. Hospital to industrial scale.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="8" y="14" width="20" height="14" rx="3" stroke="var(--lime)" strokeWidth="1.8" fill="rgba(0,230,118,0.08)"/>
        <path d="M13 14V11C13 9.343 14.343 8 16 8H20C21.657 8 23 9.343 23 11V14" stroke="var(--lime)" strokeWidth="1.8"/>
        <path d="M15 20H21M15 24H19" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    accent: 'var(--lime)',
    accentBg: 'rgba(0,230,118,0.08)',
  },
  {
    num: '03',
    title: 'Gaseous Waste Control',
    desc: 'Industrial scrubbers, thermal oxidizers, biofilters and emissions compliance systems designed for your process.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M10 28 Q12 20 18 18 Q24 16 26 8" stroke="var(--cyan)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M16 28 Q18 22 22 20 Q26 18 28 12" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="3 3"/>
        <circle cx="18" cy="18" r="3" fill="rgba(0,229,255,0.3)" stroke="var(--cyan)" strokeWidth="1.2"/>
      </svg>
    ),
    accent: 'var(--cyan)',
    accentBg: 'rgba(0,229,255,0.06)',
  },
  {
    num: '04',
    title: 'Renewable Energy',
    desc: 'Biogas recovery, waste-to-energy systems, and solar integration. Turning your waste stream into a power source.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="8" stroke="var(--lime)" strokeWidth="1.8" fill="rgba(0,230,118,0.08)"/>
        <path d="M18 6V10M18 26V30M6 18H10M26 18H30" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10.93 10.93L13.757 13.757M22.243 22.243L25.07 25.07" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    accent: 'var(--lime)',
    accentBg: 'rgba(0,230,118,0.08)',
  },
  {
    num: '05',
    title: 'Process Engineering',
    desc: 'Conceptual design, feasibility studies, and process simulation. From brief to blueprint with precision.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="7" y="7" width="10" height="10" rx="2" stroke="var(--cyan)" strokeWidth="1.8" fill="rgba(0,229,255,0.08)"/>
        <rect x="19" y="7" width="10" height="10" rx="2" stroke="var(--lime)" strokeWidth="1.8" fill="rgba(0,230,118,0.08)"/>
        <rect x="13" y="19" width="10" height="10" rx="2" stroke="var(--cyan)" strokeWidth="1.8" fill="rgba(0,229,255,0.06)"/>
        <path d="M17 12H19M12 19V17M24 19V17" stroke="rgba(180,220,200,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    accent: 'var(--cyan)',
    accentBg: 'rgba(0,229,255,0.06)',
  },
  {
    num: '06',
    title: 'After-Sales & Maintenance',
    desc: 'Commissioning support, operator training, and long-term service contracts. We stay with you long after handover.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M14 8L12 14L8 16L12 18L14 24L16 18L22 16L16 14L14 8Z" stroke="var(--lime)" strokeWidth="1.8" strokeLinejoin="round" fill="rgba(0,230,118,0.08)"/>
        <path d="M26 20L25 23L22 24L25 25L26 28L27 25L30 24L27 23L26 20Z" stroke="var(--cyan)" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(0,229,255,0.1)"/>
      </svg>
    ),
    accent: 'var(--lime)',
    accentBg: 'rgba(0,230,118,0.08)',
  },
];

function ServiceCard({ service, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        flex: '0 0 300px',
        background: hovered ? 'var(--void-3)' : 'var(--void-2)',
        border: `1px solid ${hovered ? service.accent : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 20,
        padding: '32px 28px',
        cursor: 'default',
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.2s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? `0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px ${service.accent}22` : '0 4px 24px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Number watermark */}
      <div style={{
        position: 'absolute',
        top: -10, right: 16,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 80,
        color: hovered ? `${service.accent}15` : 'rgba(255,255,255,0.03)',
        lineHeight: 1,
        transition: 'color 0.3s ease',
        userSelect: 'none',
      }}>{service.num}</div>

      {/* Icon */}
      <div style={{
        width: 60, height: 60,
        background: service.accentBg,
        border: `1px solid ${service.accent}30`,
        borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
        transition: 'border-color 0.3s, background 0.3s',
      }}>
        {service.icon}
      </div>

      {/* Top border reveal on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${service.accent}, transparent)`,
          transformOrigin: 'left',
        }}
      />

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 20,
        color: 'var(--text-dark)',
        marginBottom: 12,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      }}>{service.title}</h3>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 1.7,
        color: 'var(--text-muted-dark)',
      }}>{service.desc}</p>

      <a href="#" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        marginTop: 24,
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 13,
        color: service.accent,
        textDecoration: 'none',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.3s, transform 0.3s',
      }}>
        Learn more
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </motion.div>
  );
}

export default function ServicesC() {
  const trackRef = useRef(null);
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  const scrollLeft = () => trackRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
  const scrollRight = () => trackRef.current?.scrollBy({ left: 340, behavior: 'smooth' });

  return (
    <section style={{
      background: 'var(--void)',
      padding: '100px 0 120px',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <div ref={titleRef} style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 56,
          gap: 24,
          flexWrap: 'wrap',
        }}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
              }}
            >
              <div style={{ width: 32, height: 2, background: 'var(--cyan)' }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--cyan)',
              }}>Our Services</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(32px, 4vw, 48px)',
                letterSpacing: '-0.03em',
                color: 'var(--text-dark)',
                lineHeight: 1.1,
              }}
            >
              Integrated Solutions<br />
              <span style={{ color: 'var(--lime)' }}>for Every Challenge</span>
            </motion.h2>
          </div>

          {/* Scroll arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', gap: 10 }}
          >
            {[scrollLeft, scrollRight].map((fn, i) => (
              <button
                key={i}
                onClick={fn}
                style={{
                  width: 44, height: 44,
                  border: '1px solid rgba(0,230,118,0.3)',
                  borderRadius: '50%',
                  background: 'transparent',
                  color: 'var(--lime)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.color = 'var(--void)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--lime)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d={i === 0 ? 'M11 4L6 9L11 14' : 'M7 4L12 9L7 14'}
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Carousel track */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: 16,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            paddingBottom: 16,
            cursor: 'grab',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
'use client';
import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// ─── DATA ────────────────────────────────────────────────────────
const services = [
  {
    slug: 'wastewater',
    num: '01',
    title: 'Wastewater Treatment',
    short: 'Industrial & municipal wastewater systems from 50 m³/day to 24,000 m³/day.',
    tags: ['DAF Systems', 'Activated Sludge', 'Biological Treatment', 'Sewage Plants'],
    accent: 'var(--cyan)',
    size: 'large', // large card in bento
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 4C20 4 9 14 9 22C9 28.075 13.925 33 20 33C26.075 33 31 28.075 31 22C31 14 20 4 20 4Z" stroke="var(--cyan)" strokeWidth="1.8" fill="rgba(0,229,255,0.08)"/>
        <path d="M13 22C13 22 15.5 18 20 18C24.5 18 27 22 27 22" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="22" r="2.5" fill="var(--cyan)" opacity="0.6"/>
      </svg>
    ),
  },
  {
    slug: 'solid-waste',
    num: '02',
    title: 'Solid Waste & Biomass',
    short: 'Composting, incineration, and biomass conversion systems for hospitals to industrial plants.',
    tags: ['HiWave Compo', 'Incinerators', 'Biomass-to-Energy', 'Food Waste'],
    accent: 'var(--lime)',
    size: 'medium',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="10" y="18" width="20" height="14" rx="3" stroke="var(--lime)" strokeWidth="1.8" fill="rgba(0,230,118,0.08)"/>
        <path d="M15 18V14C15 11.791 16.791 10 19 10H21C23.209 10 25 11.791 25 14V18" stroke="var(--lime)" strokeWidth="1.8"/>
        <path d="M16 25H24M16 29H21" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    slug: 'gaseous-waste',
    num: '03',
    title: 'Gaseous Waste Control',
    short: 'Scrubbers, thermal oxidizers and biofilters engineered to meet stringent emissions standards.',
    tags: ['Wet Scrubbers', 'Thermal Oxidizers', 'Biofilters', 'Emissions Compliance'],
    accent: 'var(--cyan)',
    size: 'medium',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M12 34 Q15 24 20 22 Q25 20 28 10" stroke="var(--cyan)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M18 34 Q21 26 25 24 Q29 22 31 14" stroke="var(--lime)" strokeWidth="1.4" strokeLinecap="round" fill="none" strokeDasharray="3 3"/>
        <circle cx="20" cy="22" r="3.5" fill="rgba(0,229,255,0.2)" stroke="var(--cyan)" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    slug: 'renewable-energy',
    num: '04',
    title: 'Renewable Energy',
    short: 'Waste-to-energy systems: pyrolysis, gasification, anaerobic digestion, and biogas recovery.',
    tags: ['Pyrolysis', 'Gasification', 'Anaerobic Digestion', 'Biogas Recovery'],
    accent: 'var(--lime)',
    size: 'large',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="9" stroke="var(--lime)" strokeWidth="1.8" fill="rgba(0,230,118,0.08)"/>
        <path d="M20 7V12M20 28V33M7 20H12M28 20H33" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M11.5 11.5L15 15M25 25L28.5 28.5M11.5 28.5L15 25M25 15L28.5 11.5" stroke="var(--lime)" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    slug: 'process-engineering',
    num: '05',
    title: 'Process Engineering',
    short: 'Conceptual design, feasibility studies and full process simulation for complex environmental systems.',
    tags: ['Conceptual Design', 'Feasibility Studies', 'Process Simulation', 'Engineering Design'],
    accent: 'var(--cyan)',
    size: 'small',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="8" width="11" height="11" rx="2.5" stroke="var(--cyan)" strokeWidth="1.8" fill="rgba(0,229,255,0.08)"/>
        <rect x="21" y="8" width="11" height="11" rx="2.5" stroke="var(--lime)" strokeWidth="1.8" fill="rgba(0,230,118,0.08)"/>
        <rect x="14.5" y="21" width="11" height="11" rx="2.5" stroke="var(--cyan)" strokeWidth="1.8" fill="rgba(0,229,255,0.06)"/>
        <path d="M19 13.5H21M13.5 21V19M26.5 21V19" stroke="rgba(180,220,200,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    slug: 'maintenance',
    num: '06',
    title: 'After-Sales & Maintenance',
    short: 'Long-term service contracts, operator training, and 24/7 commissioning support.',
    tags: ['Commissioning', 'Operator Training', 'Service Contracts', '24/7 Support'],
    accent: 'var(--lime)',
    size: 'small',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M16 9L13.5 17L8 20L13.5 23L16 31L18.5 23L25 20L18.5 17L16 9Z" stroke="var(--lime)" strokeWidth="1.8" strokeLinejoin="round" fill="rgba(0,230,118,0.08)"/>
        <path d="M30 24L28.5 28.5L24 30L28.5 31.5L30 36L31.5 31.5L36 30L31.5 28.5L30 24Z" stroke="var(--cyan)" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(0,229,255,0.1)"/>
      </svg>
    ),
  },
];

// ─── SERVICE CARD ────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const isLarge = service.size === 'large';
  const isMedium = service.size === 'medium';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: isLarge ? 'span 2' : 'span 1',
        gridRow: isMedium ? 'span 1' : isLarge ? 'span 1' : 'span 1',
        background: hovered ? 'var(--void-3)' : 'var(--void-2)',
        border: `1px solid ${hovered ? service.accent + '50' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 24,
        padding: isLarge ? '44px 40px' : '36px 32px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px ${service.accent}20` : '0 4px 24px rgba(0,0,0,0.15)',
      }}
    >
      {/* Top border reveal */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${service.accent}, transparent)`,
          transformOrigin: 'left',
        }}
      />

      {/* Number watermark */}
      <div style={{
        position: 'absolute',
        bottom: -16, right: 16,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: isLarge ? 120 : 90,
        lineHeight: 1,
        color: hovered ? `${service.accent}12` : 'rgba(255,255,255,0.025)',
        userSelect: 'none',
        pointerEvents: 'none',
        letterSpacing: '-0.05em',
        transition: 'color 0.3s',
      }}>{service.num}</div>

      {/* Layout: large cards are horizontal, small/medium are vertical */}
      <div style={{
        display: 'flex',
        flexDirection: isLarge ? 'row' : 'column',
        alignItems: isLarge ? 'center' : 'flex-start',
        gap: isLarge ? 48 : 0,
        position: 'relative', zIndex: 1,
      }}>

        {/* Icon + title block */}
        <div style={{ flex: isLarge ? '0 0 auto' : undefined }}>
          <div style={{
            width: 64, height: 64,
            background: `${service.accent}10`,
            border: `1px solid ${service.accent}25`,
            borderRadius: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: isLarge ? 0 : 20,
            transition: 'border-color 0.3s, background 0.3s',
          }}>
            {service.icon}
          </div>
        </div>

        {/* Text block */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: service.accent,
            marginBottom: 10,
            opacity: 0.8,
          }}>{service.num} — Service</div>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: isLarge ? 28 : 22,
            color: 'var(--text-dark)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: 12,
          }}>{service.title}</h3>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 1.7,
            color: 'var(--text-muted-dark)',
            marginBottom: 20,
            maxWidth: isLarge ? 400 : undefined,
          }}>{service.short}</p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {service.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: 11,
                color: service.accent,
                background: `${service.accent}10`,
                border: `1px solid ${service.accent}20`,
                borderRadius: 100,
                padding: '3px 10px',
                letterSpacing: '0.02em',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Arrow — only visible on hover */}
        {isLarge && (
          <motion.div
            animate={{ x: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ flex: '0 0 auto' }}
          >
            <div style={{
              width: 52, height: 52,
              border: `1.5px solid ${service.accent}`,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke={service.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        )}
      </div>

      {/* Non-large arrow */}
      {!isLarge && (
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.25 }}
          style={{
            marginTop: 20,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 13,
            color: service.accent,
            position: 'relative', zIndex: 1,
          }}
        >
          Explore service
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      )}

      {/* Wrap whole card in Link */}
      <Link href={`/services/${service.slug}`} style={{
        position: 'absolute', inset: 0,
        zIndex: 2,
      }} aria-label={service.title} />
    </motion.div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────
function ServicesHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section style={{
      background: 'var(--void)',
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 100,
      paddingBottom: 60,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,230,118,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,230,118,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      {/* Watermark */}
      <motion.div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(80px, 16vw, 220px)',
        letterSpacing: '-0.06em',
        color: 'rgba(0,230,118,0.025)',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        y,
      }}>SERVICES</motion.div>

      {/* Blobs */}
      <div style={{
        position: 'absolute', top: '15%', right: '10%',
        width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', left: '5%',
        width: 250, height: 250,
        background: 'radial-gradient(circle, rgba(0,230,118,0.06) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <motion.div
        style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', width: '100%', position: 'relative', zIndex: 2, opacity }}
      >
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            marginBottom: 40,
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--text-muted-dark)',
          }}
        >
          <Link href="/" style={{ color: 'var(--text-muted-dark)', textDecoration: 'none' }}>Home</Link>
          <span style={{ opacity: 0.4 }}>→</span>
          <span style={{ color: 'var(--lime)' }}>Services</span>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 640 }}>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}
            >
              <div style={{ width: 32, height: 2, background: 'var(--lime)' }} />
              <span style={{
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12,
                letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--lime)',
              }}>What We Do</span>
            </motion.div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(44px, 6.5vw, 88px)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: 'var(--text-dark)',
              marginBottom: 28,
            }}>
              {['Integrated', 'Environmental', 'Solutions.'].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'block',
                    color: word === 'Solutions.' ? 'var(--lime)' : 'var(--text-dark)',
                  }}
                >{word}</motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: 17,
                lineHeight: 1.75,
                color: 'var(--text-muted-dark)',
                maxWidth: 520,
              }}
            >
              From wastewater to waste-to-energy — UEE designs, builds, commissions, and maintains the full spectrum of environmental engineering systems. One partner, end to end.
            </motion.p>
          </div>

          {/* Stats pill stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {[
              { num: '6', label: 'Core Services', color: 'var(--lime)' },
              { num: '500+', label: 'Projects Delivered', color: 'var(--cyan)' },
              { num: '40+', label: 'Years Experience', color: 'var(--lime)' },
            ].map(({ num, label, color }) => (
              <motion.div
                key={label}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: Math.random() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${color}25`,
                  borderRadius: 100,
                  padding: '10px 20px',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 22, color, letterSpacing: '-0.03em',
                }}>{num}</span>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 13,
                  color: 'var(--text-muted-dark)', fontWeight: 500,
                }}>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}>
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }}>
          <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="var(--void)" />
        </svg>
      </div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────
export default function ServicesHubPage() {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true });

  return (
    <>
      <main>
      <ServicesHero />

      {/* Bento grid */}
      <section style={{ background: 'var(--void)', padding: '80px 0 120px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}
          >
            <div style={{ width: 32, height: 2, background: 'var(--cyan)' }} />
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)',
            }}>All Services</span>
          </motion.div>

          {/* Bento grid — 4 cols */}
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
            }}
          >
            {/* Row 1: large (spans 2) + medium + medium */}
            {/* wastewater — large */}
            <ServiceCard service={services[0]} index={0} />
            {/* solid-waste — medium */}
            <ServiceCard service={services[1]} index={1} />
            {/* gaseous — medium */}
            <ServiceCard service={services[2]} index={2} />

            {/* Row 2: small + small + large (spans 2) */}
            {/* process */}
            <ServiceCard service={services[4]} index={4} />
            {/* maintenance */}
            <ServiceCard service={services[5]} index={5} />
            {/* renewable — large */}
            <ServiceCard service={services[3]} index={3} />
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section style={{
        background: 'var(--offwhite)',
        padding: '100px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 600, height: 300,
          background: 'radial-gradient(ellipse, rgba(0,180,60,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(30px, 4.5vw, 58px)',
            color: 'var(--ink)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: 20,
          }}>
            Not sure which service<br />
            <span style={{ color: 'var(--lime-dim)' }}>fits your project?</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            color: '#4A6054',
            marginBottom: 40,
            maxWidth: 440,
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            Our engineers will assess your requirements and recommend the right solution. No obligation.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              background: 'var(--lime)',
              color: 'var(--void)',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: 15,
              padding: '15px 36px',
              borderRadius: 100,
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              display: 'inline-block',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--cyan)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--lime)'; }}
            >Talk to an Engineer →</Link>
            <Link href="/projects" style={{
              background: 'transparent',
              color: 'var(--ink)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 15,
              padding: '15px 36px',
              borderRadius: 100,
              textDecoration: 'none',
              border: '1.5px solid rgba(13,31,18,0.2)',
              transition: 'all 0.25s ease',
              display: 'inline-block',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--lime-dim)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(13,31,18,0.2)'}
            >View Case Studies</Link>
          </div>
        </motion.div>
      </section>
    </main>
    </>
  );
}
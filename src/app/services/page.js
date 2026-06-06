'use client';
import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    slug: 'wastewater',
    num: '01',
    title: 'Wastewater Treatment',
    short: 'Industrial & municipal wastewater systems from 50 m³/day to 24,000 m³/day.',
    tags: ['DAF Systems', 'Activated Sludge', 'Biological Treatment', 'Sewage Plants'],
    accent: 'var(--cyan)',
    size: 'large',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 4C20 4 9 14 9 22C9 28.075 13.925 33 20 33C26.075 33 31 28.075 31 22C31 14 20 4 20 4Z" stroke="var(--cyan)" strokeWidth="1.8" fill="rgba(0,229,255,0.08)" />
        <path d="M13 22C13 22 15.5 18 20 18C24.5 18 27 22 27 22" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="22" r="2.5" fill="var(--cyan)" opacity="0.6" />
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
        <rect x="10" y="18" width="20" height="14" rx="3" stroke="var(--lime)" strokeWidth="1.8" fill="rgba(0,230,118,0.08)" />
        <path d="M15 18V14C15 11.791 16.791 10 19 10H21C23.209 10 25 11.791 25 14V18" stroke="var(--lime)" strokeWidth="1.8" />
        <path d="M16 25H24M16 29H21" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" />
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
        <path d="M12 34 Q15 24 20 22 Q25 20 28 10" stroke="var(--cyan)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M18 34 Q21 26 25 24 Q29 22 31 14" stroke="var(--lime)" strokeWidth="1.4" strokeLinecap="round" fill="none" strokeDasharray="3 3" />
        <circle cx="20" cy="22" r="3.5" fill="rgba(0,229,255,0.2)" stroke="var(--cyan)" strokeWidth="1.4" />
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
        <circle cx="20" cy="20" r="9" stroke="var(--lime)" strokeWidth="1.8" fill="rgba(0,230,118,0.08)" />
        <path d="M20 7V12M20 28V33M7 20H12M28 20H33" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M11.5 11.5L15 15M25 25L28.5 28.5M11.5 28.5L15 25M25 15L28.5 11.5" stroke="var(--lime)" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
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
        <rect x="8" y="8" width="11" height="11" rx="2.5" stroke="var(--cyan)" strokeWidth="1.8" fill="rgba(0,229,255,0.08)" />
        <rect x="21" y="8" width="11" height="11" rx="2.5" stroke="var(--lime)" strokeWidth="1.8" fill="rgba(0,230,118,0.08)" />
        <rect x="14.5" y="21" width="11" height="11" rx="2.5" stroke="var(--cyan)" strokeWidth="1.8" fill="rgba(0,229,255,0.06)" />
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
        <path d="M16 9L13.5 17L8 20L13.5 23L16 31L18.5 23L25 20L18.5 17L16 9Z" stroke="var(--lime)" strokeWidth="1.8" strokeLinejoin="round" fill="rgba(0,230,118,0.08)" />
        <path d="M30 24L28.5 28.5L24 30L28.5 31.5L30 36L31.5 31.5L36 30L31.5 28.5L30 24Z" stroke="var(--cyan)" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(0,229,255,0.1)" />
      </svg>
    ),
  },
];

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const isLarge = service.size === 'large';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-2xl p-8 md:p-10 ${isLarge ? 'sm:col-span-2' : 'col-span-1'}`}
      style={{
        background: hovered ? 'var(--void-3)' : 'var(--void-2)',
        border: `1px solid ${hovered ? service.accent + '50' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px ${service.accent}20` : '0 4px 24px rgba(0,0,0,0.15)',
      }}
    >
      {/* Top border reveal */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)`, transformOrigin: 'left' }}
      />

      {/* Number watermark */}
      <div className="absolute bottom-[-16px] right-4 font-display font-bold leading-none pointer-events-none select-none"
        style={{
          fontSize: isLarge ? 120 : 90,
          color: hovered ? `${service.accent}12` : 'rgba(255,255,255,0.025)',
          transition: 'color 0.3s',
          letterSpacing: '-0.05em',
        }}>{service.num}</div>

      {/* Layout: large = row on md+, small = always column */}
      <div className={`flex gap-6 relative z-[1] ${isLarge ? 'flex-col md:flex-row md:items-center' : 'flex-col'}`}>

        {/* Icon */}
        <div className="w-16 h-16 min-w-[64px] rounded-[18px] flex items-center justify-center"
          style={{
            background: `${service.accent}10`,
            border: `1px solid ${service.accent}25`,
          }}>
          {service.icon}
        </div>

        {/* Text */}
        <div className="flex-1">
          <div className="font-body font-semibold text-[11px] tracking-widest uppercase mb-2.5 opacity-80"
            style={{ color: service.accent }}>{service.num} — Service</div>
          <h3 className="font-display font-bold leading-tight mb-3"
            style={{ fontSize: isLarge ? 'clamp(20px, 2.5vw, 28px)' : 22, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
            {service.title}
          </h3>
          <p className="font-body font-normal text-sm leading-relaxed mb-5"
            style={{ color: 'var(--text-muted-dark)', maxWidth: isLarge ? 400 : undefined }}>
            {service.short}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {service.tags.map(tag => (
              <span key={tag} className="font-body font-medium text-[11px] rounded-full px-2.5 py-1"
                style={{ color: service.accent, background: `${service.accent}10`, border: `1px solid ${service.accent}20` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow for large cards */}
        {isLarge && (
          <motion.div
            animate={{ x: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="hidden md:flex w-13 h-13 rounded-full items-center justify-center flex-shrink-0"
            style={{ border: `1.5px solid ${service.accent}`, width: 52, height: 52 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke={service.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Arrow for small cards */}
      {!isLarge && (
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.25 }}
          className="inline-flex items-center gap-1.5 font-body font-semibold text-[13px] mt-5 relative z-[1]"
          style={{ color: service.accent }}
        >
          Explore service
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}

      {/* Full card link */}
      <Link href={`/services/${service.slug}`}
        className="absolute inset-0 z-[2]"
        aria-label={service.title}
      />
    </motion.div>
  );
}

function ServicesHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section className="relative overflow-hidden flex items-center pt-24 pb-16 min-h-[60vh]"
      style={{ background: 'var(--void)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0,230,118,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.03) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      <motion.div style={{ y, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', userSelect: 'none' }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(60px, 14vw, 220px)',
          letterSpacing: '-0.06em', color: 'rgba(0,230,118,0.025)',
          whiteSpace: 'nowrap', lineHeight: 1,
        }}>SERVICES</div>
      </motion.div>

      <div className="absolute top-[15%] right-[8%] w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)' }} />

      <motion.div style={{ opacity }}
        className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12 w-full relative z-[2]">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-10 font-body text-[13px]"
          style={{ color: 'var(--text-muted-dark)' }}
        >
          <Link href="/" style={{ color: 'var(--text-muted-dark)', textDecoration: 'none' }}>Home</Link>
          <span style={{ opacity: 0.4 }}>→</span>
          <span style={{ color: 'var(--lime)' }}>Services</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
          <div className="max-w-full lg:max-w-[640px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-0.5" style={{ background: 'var(--lime)' }} />
              <span className="font-body font-semibold text-[12px] tracking-[0.14em] uppercase" style={{ color: 'var(--lime)' }}>What We Do</span>
            </motion.div>

            <h1 className="font-display font-bold leading-none tracking-tight mb-7" style={{ fontSize: 'clamp(40px, 6.5vw, 88px)', letterSpacing: '-0.04em', color: 'var(--text-dark)' }}>
              {['Integrated', 'Environmental', 'Solutions.'].map((word, i) => (
                <motion.span key={word}
                  initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'block', color: word === 'Solutions.' ? 'var(--lime)' : 'var(--text-dark)' }}
                >{word}</motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-body font-normal text-base md:text-lg leading-relaxed max-w-[520px]"
              style={{ color: 'var(--text-muted-dark)' }}
            >
              From wastewater to waste-to-energy — UEE designs, builds, commissions, and maintains the full spectrum of environmental engineering systems.
            </motion.p>
          </div>

          {/* Stat pills — hidden on small mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="hidden sm:flex flex-col gap-3"
          >
            {[
              { num: '6', label: 'Core Services', color: 'var(--lime)' },
              { num: '500+', label: 'Projects Delivered', color: 'var(--cyan)' },
              { num: '40+', label: 'Years Experience', color: 'var(--lime)' },
            ].map(({ num, label, color }) => (
              <div key={label} className="flex items-center gap-3 rounded-full px-5 py-2.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}25` }}>
                <span className="font-display font-bold text-xl" style={{ color, letterSpacing: '-0.03em' }}>{num}</span>
                <span className="font-body text-[13px] font-medium" style={{ color: 'var(--text-muted-dark)' }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-[3]">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }}>
          <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="var(--void)" />
        </svg>
      </div>
    </section>
  );
}

export default function ServicesHubPage() {
  return (
    <main>
      <ServicesHero />

      <section className="py-20 md:py-28" style={{ background: 'var(--void)' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="w-8 h-0.5" style={{ background: 'var(--cyan)' }} />
            <span className="font-body font-semibold text-[12px] tracking-[0.14em] uppercase" style={{ color: 'var(--cyan)' }}>All Services</span>
          </motion.div>

          {/* Responsive grid — 1 col mobile, 2 col sm+, large cards span 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ServiceCard service={services[0]} index={0} />
            <ServiceCard service={services[1]} index={1} />
            <ServiceCard service={services[2]} index={2} />
            <ServiceCard service={services[4]} index={4} />
            <ServiceCard service={services[5]} index={5} />
            <ServiceCard service={services[3]} index={3} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden" style={{ background: 'var(--offwhite)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,180,60,0.06) 0%, transparent 70%)' }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-[1] max-w-[600px] mx-auto"
        >
          <h2 className="font-display font-bold leading-tight mb-5"
            style={{ fontSize: 'clamp(28px, 4.5vw, 58px)', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Not sure which service<br />
            <span style={{ color: 'var(--lime-dim)' }}>fits your project?</span>
          </h2>
          <p className="font-body text-base md:text-lg leading-relaxed mb-10 max-w-[440px] mx-auto" style={{ color: '#4A6054' }}>
            Our engineers will assess your requirements and recommend the right solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="font-body font-bold text-[15px] text-void no-underline px-9 py-4 rounded-full transition-all duration-200"
              style={{ background: 'var(--lime)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--cyan)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--lime)'}
            >Talk to an Engineer →</Link>
            <Link href="/projects"
              className="font-body font-semibold text-[15px] text-ink no-underline px-9 py-4 rounded-full transition-all duration-200"
              style={{ border: '1.5px solid rgba(13,31,18,0.2)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--lime-dim)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(13,31,18,0.2)'}
            >View Case Studies</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
'use client';
import { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ─── PROJECT DATA ────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    name: 'Century Paper & Board Mills Effluent Treatment',
    category: 'wastewater',
    country: 'Pakistan',
    flag: '🇵🇰',
    year: '2003',
    metric: '24,000 m³/day',
    metricLabel: 'Treatment Capacity',
    desc: 'Complete DAF-based effluent treatment plant for one of Pakistan\'s largest paper mills. Commissioned in 2003 and operating continuously with 90%+ suspended solids removal.',
    tags: ['DAF System', 'Industrial', 'Paper & Pulp'],
    accent: 'var(--cyan)',
    size: 'large',
  },
  {
    id: 2,
    name: 'Putrajaya Hospital Food Waste Composting',
    category: 'solid-waste',
    country: 'Malaysia',
    flag: '🇲🇾',
    year: '2007',
    metric: '100%',
    metricLabel: 'Waste Diverted from Landfill',
    desc: 'HiWave™ Compo machine converting hospital food waste into MARDI-certified organic fertilizer within 7 days. Automated, odour-free, zero auxiliary chemicals.',
    tags: ['HiWave™ Compo', 'Healthcare', 'Food Waste'],
    accent: 'var(--lime)',
    size: 'medium',
  },
  {
    id: 3,
    name: 'Leather Field Wastewater Treatment Plant',
    category: 'wastewater',
    country: 'Pakistan',
    flag: '🇵🇰',
    year: '2010',
    metric: '100%',
    metricLabel: 'Regulatory Compliance',
    desc: 'Industrial wastewater treatment plant for leather processing effluent. Successfully commissioned meeting all local discharge standards. Secondary treatment added in subsequent phase.',
    tags: ['Industrial', 'Leather & Textile', 'ETP'],
    accent: 'var(--cyan)',
    size: 'medium',
  },
  {
    id: 4,
    name: 'Jelutong Crematorium Incinerator',
    category: 'solid-waste',
    country: 'Malaysia',
    flag: '🇲🇾',
    year: '2015',
    metric: '2nd Unit',
    metricLabel: 'Delivered Under Partnership',
    desc: 'Supply, installation and commissioning of BHC 100 crematorium incinerator for Pertubuhan Pengurusan Rumah Pembakaran Mayat. Second unit delivered under long-term client relationship.',
    tags: ['BHC Incinerator', 'Municipal', 'Crematorium'],
    accent: 'var(--lime)',
    size: 'small',
  },
  {
    id: 5,
    name: 'Vietnam-Singapore Industrial Park Effluent System',
    category: 'wastewater',
    country: 'Vietnam',
    flag: '🇻🇳',
    year: '2008',
    metric: '15+',
    metricLabel: 'Tenant Industries Served',
    desc: 'Full effluent treatment planning and implementation for a multi-tenant industrial park, handling mixed industrial wastewater streams from diverse manufacturing operations.',
    tags: ['Industrial Park', 'Mixed Effluent', 'Planning'],
    accent: 'var(--cyan)',
    size: 'medium',
  },
  {
    id: 6,
    name: 'Mingaladon Industrial Park Wastewater',
    category: 'wastewater',
    country: 'Myanmar',
    flag: '🇲🇲',
    year: '2012',
    metric: '5,000 m³/day',
    metricLabel: 'Design Capacity',
    desc: 'Centralised wastewater treatment system for the Mingaladon Industrial Park. Designed to handle variable effluent from mixed industrial tenants while meeting Myanmar\'s discharge regulations.',
    tags: ['Industrial Park', 'Centralised Treatment'],
    accent: 'var(--cyan)',
    size: 'small',
  },
  {
    id: 7,
    name: 'Municipal Sewage Treatment Plant',
    category: 'wastewater',
    country: 'Malaysia',
    flag: '🇲🇾',
    year: '2005',
    metric: '2,500 m³/day',
    metricLabel: 'Population Equivalent',
    desc: 'Activated sludge sewage treatment plant for a residential township. Full design, supply, installation, and commissioning including sludge dewatering and effluent reuse system.',
    tags: ['Sewage', 'Municipal', 'Activated Sludge'],
    accent: 'var(--cyan)',
    size: 'small',
  },
  {
    id: 8,
    name: 'Food Processing Biogas Recovery System',
    category: 'renewable',
    country: 'Malaysia',
    flag: '🇲🇾',
    year: '2018',
    metric: '800 kWe',
    metricLabel: 'Power Generation Capacity',
    desc: 'Anaerobic digestion system treating high-strength food processing wastewater with biogas recovery and CHP power generation. Waste stream converted to grid electricity.',
    tags: ['Anaerobic Digestion', 'Biogas', 'CHP'],
    accent: 'var(--lime)',
    size: 'large',
  },
  {
    id: 9,
    name: 'Agricultural Biomass Gasification Plant',
    category: 'renewable',
    country: 'Malaysia',
    flag: '🇲🇾',
    year: '2019',
    metric: '1.2 MWe',
    metricLabel: 'Output Capacity',
    desc: 'Biomass gasification system converting agricultural residue (palm kernel shells and empty fruit bunches) into syngas for electricity generation. Full turn-key EPC delivery.',
    tags: ['Gasification', 'Biomass', 'Agriculture'],
    accent: 'var(--lime)',
    size: 'medium',
  },
  {
    id: 10,
    name: 'Factory Exhaust Scrubbing System',
    category: 'gaseous',
    country: 'Malaysia',
    flag: '🇲🇾',
    year: '2014',
    metric: '99%+',
    metricLabel: 'Acid Gas Removal Efficiency',
    desc: 'PE-Scrub wet scrubber installation for a chemical manufacturing facility. Removes acidic gases and particulates from process exhaust, achieving full DOE compliance.',
    tags: ['PE-Scrub', 'Chemical Industry', 'Acid Gas'],
    accent: 'var(--cyan)',
    size: 'medium',
  },
  {
    id: 11,
    name: 'Composting Facility Odour Control',
    category: 'gaseous',
    country: 'Malaysia',
    flag: '🇲🇾',
    year: '2016',
    metric: '95%',
    metricLabel: 'Odour Reduction',
    desc: 'Biofilter system for a large municipal composting facility. Treats exhaust air from enclosed composting halls, achieving 95%+ odour reduction and full regulatory compliance.',
    tags: ['Biofilter', 'Municipal', 'Odour Control'],
    accent: 'var(--cyan)',
    size: 'small',
  },
  {
    id: 12,
    name: 'Noi Bai Industrial Zone Wastewater',
    category: 'wastewater',
    country: 'Vietnam',
    flag: '🇻🇳',
    year: '2011',
    metric: '3,000 m³/day',
    metricLabel: 'Treatment Capacity',
    desc: 'Centralised effluent treatment system for Noi Bai Industrial Zone, handling mixed wastewater from electronics, garment, and light manufacturing industries.',
    tags: ['Industrial Zone', 'Mixed Effluent', 'Vietnam'],
    accent: 'var(--cyan)',
    size: 'small',
  },
];

// ─── CATEGORY FILTERS ─────────────────────────────────────────────
const filters = [
  { key: 'all', label: 'All Projects' },
  { key: 'wastewater', label: 'Wastewater' },
  { key: 'solid-waste', label: 'Solid Waste' },
  { key: 'renewable', label: 'Renewable Energy' },
  { key: 'gaseous', label: 'Gaseous Waste' },
  { key: 'process', label: 'Process Engineering' },
];

// ─── SVG PATTERN BACKGROUNDS ──────────────────────────────────────
function CardPattern({ category, accent }) {
  if (category === 'wastewater') return (
    <svg style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.07 }} width="160" height="160" viewBox="0 0 160 160" fill="none">
      <path d="M80 10C80 10 30 50 30 90C30 117 52 140 80 140C108 140 130 117 130 90C130 50 80 10 80 10Z" stroke={accent} strokeWidth="1.5" fill="none"/>
      <path d="M80 40C80 40 55 60 55 85C55 99 66 110 80 110C94 110 105 99 105 85C105 60 80 40 80 40Z" stroke={accent} strokeWidth="1.5" fill="none"/>
      <path d="M80 65C80 65 68 74 68 83C68 90 73 96 80 96C87 96 92 90 92 83C92 74 80 65 80 65Z" stroke={accent} strokeWidth="1" fill="none"/>
    </svg>
  );
  if (category === 'solid-waste') return (
    <svg style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.07 }} width="160" height="160" viewBox="0 0 160 160" fill="none">
      <rect x="20" y="60" width="120" height="80" rx="8" stroke={accent} strokeWidth="1.5" fill="none"/>
      <path d="M50 60V45C50 32 60 22 73 22H87C100 22 110 32 110 45V60" stroke={accent} strokeWidth="1.5" fill="none"/>
      <path d="M40 90H120M40 110H100" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
  if (category === 'renewable') return (
    <svg style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.07 }} width="160" height="160" viewBox="0 0 160 160" fill="none">
      <circle cx="80" cy="80" r="40" stroke={accent} strokeWidth="1.5" fill="none"/>
      <path d="M80 20V40M80 120V140M20 80H40M120 80H140" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M38 38L52 52M108 108L122 122M38 122L52 108M108 52L122 38" stroke={accent} strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
  if (category === 'gaseous') return (
    <svg style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.07 }} width="160" height="160" viewBox="0 0 160 160" fill="none">
      <path d="M30 130 Q50 80 80 70 Q110 60 120 20" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M55 130 Q70 90 90 82 Q110 74 118 40" stroke={accent} strokeWidth="1.2" strokeLinecap="round" fill="none" strokeDasharray="4 4"/>
      <path d="M80 130 Q88 100 100 94 Q112 88 116 60" stroke={accent} strokeWidth="1" strokeLinecap="round" fill="none" strokeDasharray="3 5" opacity="0.6"/>
    </svg>
  );
  return (
    <svg style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.07 }} width="160" height="160" viewBox="0 0 160 160" fill="none">
      <rect x="20" y="20" width="50" height="50" rx="6" stroke={accent} strokeWidth="1.5" fill="none"/>
      <rect x="90" y="20" width="50" height="50" rx="6" stroke={accent} strokeWidth="1.5" fill="none"/>
      <rect x="55" y="90" width="50" height="50" rx="6" stroke={accent} strokeWidth="1.5" fill="none"/>
      <path d="M70 45H90M45 90V70M115 90V70" stroke={accent} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--void-3)' : 'var(--void-2)',
        border: `1px solid ${hovered ? project.accent + '45' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 22,
        padding: '32px 28px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.35), 0 0 0 1px ${project.accent}15` : '0 4px 20px rgba(0,0,0,0.15)',
        cursor: 'default',
        breakInside: 'avoid',
        marginBottom: 16,
      }}
    >
      {/* Pattern bg */}
      <CardPattern category={project.category} accent={project.accent} />

      {/* Top accent line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          transformOrigin: 'left',
        }}
      />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 18 }}>{project.flag}</span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: 12,
            color: 'var(--text-muted-dark)',
          }}>{project.country}</span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 12 }}>·</span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: 12,
            color: 'var(--text-muted-dark)',
          }}>{project.year}</span>
        </div>

        {/* Metric pill */}
        <div style={{
          background: `${project.accent}12`,
          border: `1px solid ${project.accent}25`,
          borderRadius: 100,
          padding: '4px 12px',
          textAlign: 'right',
          flexShrink: 0,
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 14,
            color: project.accent,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}>{project.metric}</div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            color: 'var(--text-muted-dark)',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}>{project.metricLabel}</div>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 18,
        color: 'var(--text-dark)',
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        marginBottom: 10,
        position: 'relative', zIndex: 1,
      }}>{project.name}</h3>

      {/* Desc */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 1.7,
        color: 'var(--text-muted-dark)',
        marginBottom: 18,
        position: 'relative', zIndex: 1,
      }}>{project.desc}</p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, position: 'relative', zIndex: 1 }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: 11,
            color: project.accent,
            background: `${project.accent}10`,
            border: `1px solid ${project.accent}20`,
            borderRadius: 100,
            padding: '3px 10px',
          }}>{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────
function ProjectsHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section style={{
      background: 'var(--void)',
      minHeight: '62vh',
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
          linear-gradient(rgba(0,230,118,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,230,118,0.025) 1px, transparent 1px)
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
      }}>PROJECTS</motion.div>

      {/* Blobs */}
      <div style={{
        position: 'absolute', top: '15%', right: '8%',
        width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(0,230,118,0.05) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '5%',
        width: 280, height: 280,
        background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)',
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
          <span style={{ color: 'var(--lime)' }}>Projects</span>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 620 }}>
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
              }}>Portfolio</span>
            </motion.div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(44px, 6.5vw, 86px)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: 'var(--text-dark)',
              marginBottom: 28,
            }}>
              {['500+', 'Projects.', 'One', 'Standard.'].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: i < 2 ? 'inline-block' : 'inline-block',
                    marginRight: '0.22em',
                    color: word === '500+' ? 'var(--lime)' : word === 'Standard.' ? 'var(--cyan)' : 'var(--text-dark)',
                  }}
                >{word}{i === 1 ? <br /> : ''}</motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.75,
                color: 'var(--text-muted-dark)',
                maxWidth: 500,
              }}
            >
              From small composting machines to 24,000 m³/day industrial treatment plants — delivered across Malaysia, Pakistan, Vietnam, Myanmar, and beyond.
            </motion.p>
          </div>

          {/* Country count pills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {[
              { num: '15+', label: 'Countries', color: 'var(--lime)' },
              { num: '500+', label: 'Projects', color: 'var(--cyan)' },
              { num: '40+', label: 'Years', color: 'var(--lime)' },
            ].map(({ num, label, color }) => (
              <motion.div
                key={label}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.5 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
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
          <path d="M0,30 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" fill="var(--void)" />
        </svg>
      </div>
    </section>
  );
}

// ─── FILTER + GRID ────────────────────────────────────────────────
function ProjectsGrid() {
  const [active, setActive] = useState('all');

  const filtered = useMemo(() =>
    active === 'all' ? projects : projects.filter(p => p.category === active),
    [active]
  );

  // Split into 3 columns for masonry
  const columns = useMemo(() => {
    const cols = [[], [], []];
    filtered.forEach((p, i) => cols[i % 3].push(p));
    return cols;
  }, [filtered]);

  return (
    <section style={{ background: 'var(--void)', padding: '60px 0 120px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        {/* Filter bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 56,
          flexWrap: 'wrap',
        }}>
          {filters.map(f => (
            <motion.button
              key={f.key}
              onClick={() => setActive(f.key)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: active === f.key ? 'var(--lime)' : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${active === f.key ? 'var(--lime)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 100,
                padding: '9px 20px',
                fontFamily: 'var(--font-body)',
                fontWeight: active === f.key ? 700 : 500,
                fontSize: 13,
                color: active === f.key ? 'var(--void)' : 'var(--text-muted-dark)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                letterSpacing: '0.01em',
              }}
            >{f.label}</motion.button>
          ))}

          {/* Result count */}
          <motion.div
            key={filtered.length}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--text-muted-dark)',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 18,
              color: 'var(--lime)',
              marginRight: 6,
            }}>{filtered.length}</span>
            {filtered.length === 1 ? 'project' : 'projects'}
          </motion.div>
        </div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
              alignItems: 'start',
            }}
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex}>
                {col.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={colIndex + i * 3}
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '80px 0' }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 20,
              color: 'var(--text-muted-dark)',
              marginBottom: 8,
            }}>No projects in this category yet</div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'rgba(122,184,138,0.4)',
            }}>Check back soon or view all projects.</div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── CTA BAND ─────────────────────────────────────────────────────
function ProjectsCTA() {
  return (
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
          Want your project<br />
          <span style={{ color: 'var(--lime-dim)' }}>on this list?</span>
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          color: '#4A6054',
          marginBottom: 44,
          maxWidth: 420,
          margin: '0 auto 44px',
          lineHeight: 1.7,
        }}>
          Tell us about your environmental challenge and we'll design a solution that works.
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
            onMouseEnter={e => e.currentTarget.style.background = 'var(--cyan)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--lime)'}
          >Start Your Project →</Link>
          <Link href="/services" style={{
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
          >View Our Services</Link>
        </div>
      </motion.div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────
export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero />
      <ProjectsGrid />
      <ProjectsCTA />
    </main>
  );
}
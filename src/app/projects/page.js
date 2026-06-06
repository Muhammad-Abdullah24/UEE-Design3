'use client';
import { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const projects = [
  {
    id: 1, name: 'Century Paper & Board Mills Effluent Treatment',
    category: 'wastewater', country: 'Pakistan', flag: '🇵🇰', year: '2003',
    metric: '24,000 m³/day', metricLabel: 'Treatment Capacity',
    desc: 'Complete DAF-based effluent treatment plant for one of Pakistan\'s largest paper mills. Operating continuously with 90%+ SS removal since 2003.',
    tags: ['DAF System', 'Industrial', 'Paper & Pulp'], accent: 'var(--cyan)',
  },
  {
    id: 2, name: 'Putrajaya Hospital Food Waste Composting',
    category: 'solid-waste', country: 'Malaysia', flag: '🇲🇾', year: '2007',
    metric: '100%', metricLabel: 'Waste Diverted',
    desc: 'HiWave™ Compo machine converting hospital food waste into MARDI-certified organic fertilizer. Automated, odour-free, zero auxiliary chemicals.',
    tags: ['HiWave™ Compo', 'Healthcare', 'Food Waste'], accent: 'var(--lime)',
  },
  {
    id: 3, name: 'Leather Field Wastewater Treatment Plant',
    category: 'wastewater', country: 'Pakistan', flag: '🇵🇰', year: '2010',
    metric: '100%', metricLabel: 'Regulatory Compliance',
    desc: 'Industrial wastewater treatment plant for leather processing effluent. Successfully commissioned meeting all local discharge standards.',
    tags: ['Industrial', 'Leather & Textile', 'ETP'], accent: 'var(--cyan)',
  },
  {
    id: 4, name: 'Jelutong Crematorium Incinerator',
    category: 'solid-waste', country: 'Malaysia', flag: '🇲🇾', year: '2015',
    metric: '2nd Unit', metricLabel: 'Delivered Under Partnership',
    desc: 'Supply, installation and commissioning of BHC 100 crematorium incinerator. Second unit delivered under long-term client relationship.',
    tags: ['BHC Incinerator', 'Municipal', 'Crematorium'], accent: 'var(--lime)',
  },
  {
    id: 5, name: 'Vietnam-Singapore Industrial Park Effluent System',
    category: 'wastewater', country: 'Vietnam', flag: '🇻🇳', year: '2008',
    metric: '15+', metricLabel: 'Tenant Industries Served',
    desc: 'Full effluent treatment planning and implementation for a multi-tenant industrial park handling mixed industrial wastewater streams.',
    tags: ['Industrial Park', 'Mixed Effluent', 'Planning'], accent: 'var(--cyan)',
  },
  {
    id: 6, name: 'Mingaladon Industrial Park Wastewater',
    category: 'wastewater', country: 'Myanmar', flag: '🇲🇲', year: '2012',
    metric: '5,000 m³/day', metricLabel: 'Design Capacity',
    desc: 'Centralised wastewater treatment system for the Mingaladon Industrial Park handling variable effluent from mixed industrial tenants.',
    tags: ['Industrial Park', 'Centralised Treatment'], accent: 'var(--cyan)',
  },
  {
    id: 7, name: 'Municipal Sewage Treatment Plant',
    category: 'wastewater', country: 'Malaysia', flag: '🇲🇾', year: '2005',
    metric: '2,500 m³/day', metricLabel: 'Population Equivalent',
    desc: 'Activated sludge sewage treatment plant for a residential township. Full design, supply, installation, and commissioning.',
    tags: ['Sewage', 'Municipal', 'Activated Sludge'], accent: 'var(--cyan)',
  },
  {
    id: 8, name: 'Food Processing Biogas Recovery System',
    category: 'renewable', country: 'Malaysia', flag: '🇲🇾', year: '2018',
    metric: '800 kWe', metricLabel: 'Power Generation Capacity',
    desc: 'Anaerobic digestion treating high-strength food processing wastewater with biogas recovery and CHP power generation.',
    tags: ['Anaerobic Digestion', 'Biogas', 'CHP'], accent: 'var(--lime)',
  },
  {
    id: 9, name: 'Agricultural Biomass Gasification Plant',
    category: 'renewable', country: 'Malaysia', flag: '🇲🇾', year: '2019',
    metric: '1.2 MWe', metricLabel: 'Output Capacity',
    desc: 'Biomass gasification system converting agricultural residue into syngas for electricity generation. Full turn-key EPC delivery.',
    tags: ['Gasification', 'Biomass', 'Agriculture'], accent: 'var(--lime)',
  },
  {
    id: 10, name: 'Factory Exhaust Scrubbing System',
    category: 'gaseous', country: 'Malaysia', flag: '🇲🇾', year: '2014',
    metric: '99%+', metricLabel: 'Acid Gas Removal',
    desc: 'PE-Scrub wet scrubber for a chemical manufacturing facility. Removes acidic gases and particulates achieving full DOE compliance.',
    tags: ['PE-Scrub', 'Chemical Industry', 'Acid Gas'], accent: 'var(--cyan)',
  },
  {
    id: 11, name: 'Composting Facility Odour Control',
    category: 'gaseous', country: 'Malaysia', flag: '🇲🇾', year: '2016',
    metric: '95%', metricLabel: 'Odour Reduction',
    desc: 'Biofilter system for a large municipal composting facility achieving 95%+ odour reduction and full regulatory compliance.',
    tags: ['Biofilter', 'Municipal', 'Odour Control'], accent: 'var(--cyan)',
  },
  {
    id: 12, name: 'Noi Bai Industrial Zone Wastewater',
    category: 'wastewater', country: 'Vietnam', flag: '🇻🇳', year: '2011',
    metric: '3,000 m³/day', metricLabel: 'Treatment Capacity',
    desc: 'Centralised effluent treatment for Noi Bai Industrial Zone handling mixed wastewater from electronics, garment, and light manufacturing.',
    tags: ['Industrial Zone', 'Mixed Effluent', 'Vietnam'], accent: 'var(--cyan)',
  },
];

const filters = [
  { key: 'all', label: 'All Projects' },
  { key: 'wastewater', label: 'Wastewater' },
  { key: 'solid-waste', label: 'Solid Waste' },
  { key: 'renewable', label: 'Renewable Energy' },
  { key: 'gaseous', label: 'Gaseous Waste' },
];

function CardPattern({ category, accent }) {
  if (category === 'wastewater') return (
    <svg className="absolute bottom-0 right-0 opacity-[0.07]" width="140" height="140" viewBox="0 0 160 160" fill="none">
      <path d="M80 10C80 10 30 50 30 90C30 117 52 140 80 140C108 140 130 117 130 90C130 50 80 10 80 10Z" stroke={accent} strokeWidth="1.5" fill="none" />
      <path d="M80 40C80 40 55 60 55 85C55 99 66 110 80 110C94 110 105 99 105 85C105 60 80 40 80 40Z" stroke={accent} strokeWidth="1.5" fill="none" />
    </svg>
  );
  if (category === 'renewable') return (
    <svg className="absolute bottom-0 right-0 opacity-[0.07]" width="140" height="140" viewBox="0 0 160 160" fill="none">
      <circle cx="80" cy="80" r="40" stroke={accent} strokeWidth="1.5" fill="none" />
      <path d="M80 20V40M80 120V140M20 80H40M120 80H140" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg className="absolute bottom-0 right-0 opacity-[0.07]" width="140" height="140" viewBox="0 0 160 160" fill="none">
      <path d="M30 130 Q50 80 80 70 Q110 60 120 20" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M55 130 Q70 90 90 82 Q110 74 118 40" stroke={accent} strokeWidth="1.2" strokeLinecap="round" fill="none" strokeDasharray="4 4" />
    </svg>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-7 relative overflow-hidden transition-all duration-300"
      style={{
        background: hovered ? 'var(--void-3)' : 'var(--void-2)',
        border: `1px solid ${hovered ? project.accent + '45' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.35)` : '0 4px 20px rgba(0,0,0,0.15)',
      }}
    >
      <CardPattern category={project.category} accent={project.accent} />

      <motion.div animate={{ scaleX: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)`, transformOrigin: 'left' }} />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4 relative z-[1]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg">{project.flag}</span>
          <span className="font-body font-medium text-[12px]" style={{ color: 'var(--text-muted-dark)' }}>{project.country}</span>
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
          <span className="font-body font-medium text-[12px]" style={{ color: 'var(--text-muted-dark)' }}>{project.year}</span>
        </div>
        <div className="rounded-full px-3 py-1 text-right flex-shrink-0"
          style={{ background: `${project.accent}12`, border: `1px solid ${project.accent}25` }}>
          <div className="font-display font-bold text-sm leading-tight"
            style={{ color: project.accent, letterSpacing: '-0.02em' }}>{project.metric}</div>
          <div className="font-body text-[10px] whitespace-nowrap" style={{ color: 'var(--text-muted-dark)' }}>{project.metricLabel}</div>
        </div>
      </div>

      <h3 className="font-display font-bold text-lg leading-tight mb-2.5 relative z-[1]"
        style={{ color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>{project.name}</h3>

      <p className="font-body font-normal text-[13px] leading-relaxed mb-4 relative z-[1]"
        style={{ color: 'var(--text-muted-dark)' }}>{project.desc}</p>

      <div className="flex flex-wrap gap-1.5 relative z-[1]">
        {project.tags.map(tag => (
          <span key={tag} className="font-body font-medium text-[11px] rounded-full px-2.5 py-1"
            style={{ color: project.accent, background: `${project.accent}10`, border: `1px solid ${project.accent}20` }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ProjectsHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section className="relative overflow-hidden flex items-center pt-24 pb-16 min-h-[62vh]" style={{ background: 'var(--void)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0,230,118,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.025) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      <motion.div style={{ y }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(60px, 14vw, 220px)',
          letterSpacing: '-0.06em', color: 'rgba(0,230,118,0.025)',
          whiteSpace: 'nowrap', lineHeight: 1,
        }}>PROJECTS</div>
      </motion.div>

      <div className="absolute top-[15%] right-[8%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,230,118,0.05) 0%, transparent 70%)' }} />

      <motion.div style={{ opacity }}
        className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12 w-full relative z-[2]">

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-10 font-body text-[13px]" style={{ color: 'var(--text-muted-dark)' }}>
          <Link href="/" style={{ color: 'var(--text-muted-dark)', textDecoration: 'none' }}>Home</Link>
          <span style={{ opacity: 0.4 }}>→</span>
          <span style={{ color: 'var(--lime)' }}>Projects</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
          <div className="max-w-full lg:max-w-[620px]">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5" style={{ background: 'var(--lime)' }} />
              <span className="font-body font-semibold text-[12px] tracking-[0.14em] uppercase" style={{ color: 'var(--lime)' }}>Portfolio</span>
            </motion.div>

            <h1 className="font-display font-bold leading-none tracking-tight mb-7"
              style={{ fontSize: 'clamp(40px, 6.5vw, 86px)', letterSpacing: '-0.04em', color: 'var(--text-dark)' }}>
              {['500+', 'Projects.', 'One', 'Standard.'].map((word, i) => (
                <motion.span key={word}
                  initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'inline-block', marginRight: '0.22em',
                    color: word === '500+' ? 'var(--lime)' : word === 'Standard.' ? 'var(--cyan)' : 'var(--text-dark)',
                  }}
                >{word}{i === 1 ? <br /> : ''}</motion.span>
              ))}
            </h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-body font-normal text-base md:text-lg leading-relaxed max-w-[500px]"
              style={{ color: 'var(--text-muted-dark)' }}>
              From small composting machines to 24,000 m³/day industrial treatment plants — across Malaysia, Pakistan, Vietnam, Myanmar, and beyond.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="hidden sm:flex flex-col gap-3">
            {[
              { num: '15+', label: 'Countries', color: 'var(--lime)' },
              { num: '500+', label: 'Projects', color: 'var(--cyan)' },
              { num: '40+', label: 'Years', color: 'var(--lime)' },
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
          <path d="M0,30 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" fill="var(--void)" />
        </svg>
      </div>
    </section>
  );
}

function ProjectsGrid() {
  const [active, setActive] = useState('all');
  const filtered = useMemo(() =>
    active === 'all' ? projects : projects.filter(p => p.category === active), [active]);

  return (
    <section className="py-16 md:py-24 pb-28" style={{ background: 'var(--void)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12">

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-14 items-center">
          {filters.map(f => (
            <motion.button key={f.key} onClick={() => setActive(f.key)}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="rounded-full px-5 py-2.5 font-body text-[13px] cursor-pointer transition-all duration-200"
              style={{
                background: active === f.key ? 'var(--lime)' : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${active === f.key ? 'var(--lime)' : 'rgba(255,255,255,0.1)'}`,
                fontWeight: active === f.key ? 700 : 500,
                color: active === f.key ? 'var(--void)' : 'var(--text-muted-dark)',
                letterSpacing: '0.01em',
              }}
            >{f.label}</motion.button>
          ))}

          <motion.div key={filtered.length} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            className="ml-auto font-body text-[13px]" style={{ color: 'var(--text-muted-dark)' }}>
            <span className="font-display font-bold text-xl mr-1.5" style={{ color: 'var(--lime)' }}>{filtered.length}</span>
            {filtered.length === 1 ? 'project' : 'projects'}
          </motion.div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="font-display font-bold text-xl mb-2" style={{ color: 'var(--text-muted-dark)' }}>No projects in this category yet</div>
            <div className="font-body text-sm" style={{ color: 'rgba(122,184,138,0.4)' }}>Check back soon or view all projects.</div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero />
      <ProjectsGrid />

      {/* CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden" style={{ background: 'var(--offwhite)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,180,60,0.06) 0%, transparent 70%)' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }} className="relative z-[1] max-w-[560px] mx-auto">
          <h2 className="font-display font-bold leading-tight mb-5"
            style={{ fontSize: 'clamp(28px, 4.5vw, 58px)', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Want your project<br /><span style={{ color: 'var(--lime-dim)' }}>on this list?</span>
          </h2>
          <p className="font-body text-base md:text-lg leading-relaxed mb-10 max-w-[420px] mx-auto" style={{ color: '#4A6054' }}>
            Tell us about your environmental challenge and we'll design a solution that works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="font-body font-bold text-[15px] text-void no-underline px-9 py-4 rounded-full transition-all duration-200"
              style={{ background: 'var(--lime)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--cyan)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--lime)'}
            >Start Your Project →</Link>
            <Link href="/services"
              className="font-body font-semibold text-[15px] text-ink no-underline px-9 py-4 rounded-full transition-all duration-200"
              style={{ border: '1.5px solid rgba(13,31,18,0.2)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--lime-dim)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(13,31,18,0.2)'}
            >View Our Services</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
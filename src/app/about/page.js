'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

function SectionLabel({ text, color = 'var(--lime-dim)', align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'center' ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-3 mb-5 ${align === 'center' ? 'justify-center' : ''}`}
    >
      <div className="w-8 h-0.5" style={{ background: color }} />
      <span className="font-body font-semibold text-[12px] tracking-[0.14em] uppercase" style={{ color }}>{text}</span>
      {align === 'center' && <div className="w-8 h-0.5" style={{ background: color }} />}
    </motion.div>
  );
}

// ─── HERO ───────────────────────────────────────────────────────
function AboutHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const words = ['We', 'Engineer', 'a', 'Better', 'World.'];

  return (
    <section className="relative overflow-hidden flex items-center pt-24 pb-20 min-h-[70vh]"
      style={{ background: 'var(--void)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0,230,118,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.03) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      <motion.div style={{ y }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(80px, 18vw, 280px)',
          letterSpacing: '-0.06em', color: 'rgba(0,230,118,0.03)',
          whiteSpace: 'nowrap', lineHeight: 1,
        }}>ABOUT</div>
      </motion.div>

      <div className="absolute top-[20%] right-[15%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)' }} />

      <motion.div style={{ opacity }}
        className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12 w-full relative z-[2]">

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-10 font-body text-[13px]" style={{ color: 'var(--text-muted-dark)' }}>
          <Link href="/" style={{ color: 'var(--text-muted-dark)', textDecoration: 'none' }}>Home</Link>
          <span style={{ opacity: 0.4 }}>→</span>
          <span style={{ color: 'var(--lime)' }}>About</span>
        </motion.div>

        <h1 className="font-display font-bold leading-none tracking-tight mb-9"
          style={{ fontSize: 'clamp(44px, 7vw, 96px)', letterSpacing: '-0.04em', color: 'var(--text-dark)' }}>
          {words.map((word, i) => (
            <motion.span key={i}
              initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'inline-block', marginRight: '0.25em',
                color: word === 'Better' ? 'var(--lime)' : word === 'World.' ? 'var(--cyan)' : 'var(--text-dark)',
              }}
            >{word}</motion.span>
          ))}
        </h1>

        <div className="flex flex-col sm:flex-row items-start gap-10 lg:gap-16">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
            className="font-body font-normal text-base md:text-lg leading-relaxed max-w-[480px]"
            style={{ color: 'var(--text-muted-dark)' }}>
            Universal Environmental Engineering has been designing and delivering waste treatment and environmental solutions since 1980 — for governments, industries, and municipalities across Asia and beyond.
          </motion.p>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-row sm:flex-col gap-3">
            {[
              { val: '1980', label: 'Founded', color: 'var(--lime)' },
              { val: '15+', label: 'Countries', color: 'var(--cyan)' },
              { val: '500+', label: 'Projects', color: 'var(--lime)' },
            ].map(({ val, label, color }) => (
              <motion.div key={label}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-2.5 rounded-full px-4 py-2"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${color}30` }}>
                <span className="font-display font-bold text-lg" style={{ color, letterSpacing: '-0.03em' }}>{val}</span>
                <span className="font-body text-[13px] font-medium hidden sm:block" style={{ color: 'var(--text-muted-dark)' }}>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-[-1px] left-0 right-0 z-[3]">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }}>
          <path d="M0,20 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="var(--offwhite)" />
        </svg>
      </div>
    </section>
  );
}

// ─── TIMELINE ───────────────────────────────────────────────────
const milestones = [
  { year: '1980', title: 'Founded', desc: 'UEE established in Malaysia as an environmental technology provider.' },
  { year: '1990', title: 'First Export', desc: 'Expanded beyond Malaysia — first international wastewater project delivered.' },
  { year: '2000', title: 'Wastewater Scale-Up', desc: 'DAF system for Century Paper & Board: 24,000 m³/day capacity, Pakistan.' },
  { year: '2007', title: 'HiWave Compo', desc: 'Proprietary composting machine deployed at Putrajaya Hospital.' },
  { year: '2012', title: 'Renewable Energy', desc: 'Launched waste-to-energy division. Biogas recovery systems added.' },
  { year: '2020', title: '500+ Projects', desc: 'Crossed 500 successfully completed projects across 15+ countries.' },
  { year: 'Now', title: 'Global Reach', desc: 'Delivering integrated environmental solutions across Asia and growing internationally.' },
];

function Timeline() {
  return (
    <section className="pt-20 pb-0 overflow-hidden" style={{ background: 'var(--offwhite)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12 mb-12">
        <SectionLabel text="Our Journey" />
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold leading-tight"
          style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
          Four Decades of<br /><span style={{ color: 'var(--lime-dim)' }}>Proven Delivery</span>
        </motion.h2>
      </div>

      <div className="relative px-6 md:px-10 xl:px-12 pb-16">
        <div className="absolute top-8 left-0 right-0 h-0.5 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,200,83,0.2) 5%, rgba(0,200,83,0.2) 95%, transparent)' }} />
        <div className="flex gap-0 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
          {milestones.map((m, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true });
            const isLast = i === milestones.length - 1;
            return (
              <motion.div key={m.year} ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex-none w-[160px] sm:w-[200px] pt-4 pr-6 relative z-[1]"
              >
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                  className="w-4 h-4 rounded-full mb-5"
                  style={{
                    background: isLast ? 'var(--lime)' : 'white',
                    border: `2px solid ${isLast ? 'var(--lime)' : 'rgba(0,180,60,0.3)'}`,
                    boxShadow: isLast ? '0 0 16px rgba(0,230,118,0.5)' : 'none',
                  }} />
                <div className="font-display font-bold text-2xl mb-1.5"
                  style={{ color: isLast ? 'var(--lime-dim)' : 'var(--ink)', letterSpacing: '-0.03em' }}>{m.year}</div>
                <div className="font-display font-semibold text-sm mb-2" style={{ color: 'var(--ink)' }}>{m.title}</div>
                <div className="font-body font-normal text-[13px] leading-relaxed" style={{ color: '#4A6054' }}>{m.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── VISION & MISSION ───────────────────────────────────────────
function VisionMission() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'var(--void)' }}>
      <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,230,118,0.04) 0%, transparent 70%)' }} />

      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12">
        <div className="text-center mb-16">
          <SectionLabel text="Purpose & Direction" color="var(--lime)" align="center" />
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 50px)', color: 'var(--text-dark)', letterSpacing: '-0.03em' }}>
            What Drives Us Forward
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              letter: 'V', label: 'Vision Statement', color: 'var(--lime)', borderColor: 'rgba(0,230,118,0.12)',
              quote: '"To be the leader in the environmental industry within our own specialised technologies."',
              body: 'We pursue technical leadership in every domain we operate — setting the standard for reliability, performance, and environmental compliance.',
              delay: 0.2, dir: -40,
            },
            {
              letter: 'M', label: 'Mission Statement', color: 'var(--cyan)', borderColor: 'rgba(0,229,255,0.12)',
              quote: '"To provide the most efficient and economical solution for a cleaner environment."',
              body: 'Every system we design is optimised for performance, cost-efficiency, and long-term operation — because a cleaner world should also be an affordable one.',
              delay: 0.3, dir: 40,
            },
          ].map((card) => (
            <motion.div key={card.letter}
              initial={{ opacity: 0, x: card.dir }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-10 md:p-12 relative overflow-hidden"
              style={{ background: 'var(--void-2)', border: `1px solid ${card.borderColor}` }}
            >
              <div className="absolute bottom-[-20px] right-2.5 font-display font-bold leading-none pointer-events-none select-none"
                style={{ fontSize: 180, color: `${card.color}04`, letterSpacing: '-0.06em' }}>{card.letter}</div>

              <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-7"
                style={{ background: `${card.color}10`, border: `1px solid ${card.color}25` }}>
                <div className="w-3 h-3 rounded-full" style={{ background: card.color }} />
              </div>

              <div className="font-body font-semibold text-[11px] tracking-[0.14em] uppercase mb-3.5"
                style={{ color: card.color }}>{card.label}</div>

              <h3 className="font-display font-bold leading-tight mb-5"
                style={{ fontSize: 'clamp(18px, 2.2vw, 26px)', color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
                {card.quote}
              </h3>
              <p className="font-body font-normal text-sm leading-relaxed" style={{ color: 'var(--text-muted-dark)' }}>{card.body}</p>

              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── VALUES & INDUSTRIES ────────────────────────────────────────
const industries = [
  { icon: '🏭', label: 'Industrial Plants' },
  { icon: '🏛️', label: 'Government & Municipal' },
  { icon: '🏥', label: 'Healthcare Facilities' },
  { icon: '📄', label: 'Paper & Pulp Mills' },
  { icon: '🧴', label: 'Leather & Textile' },
  { icon: '⚡', label: 'Power & Energy' },
  { icon: '🌾', label: 'Agro-Industry' },
  { icon: '🏗️', label: 'Industrial Parks' },
];

const values = [
  { title: 'Technical Excellence', body: 'Every solution is engineered to the highest standard — from concept design to commissioning.', accent: 'var(--lime)' },
  { title: 'Reliability', body: 'Our systems run for decades. The Century Paper DAF has been operating continuously since 2003.', accent: 'var(--cyan)' },
  { title: 'Environmental Integrity', body: "We don't greenwash. Every project meets or exceeds local and international regulatory standards.", accent: 'var(--lime)' },
  { title: 'Client Partnership', body: 'We stay beyond handover — with long-term service contracts, training, and 24/7 support.', accent: 'var(--cyan)' },
  { title: 'Proven at Scale', body: 'From small hospital food-waste composters to 24,000 m³/day industrial treatment plants.', accent: 'var(--lime)' },
  { title: 'Global Experience', body: 'Projects in Malaysia, Pakistan, Vietnam, Myanmar and beyond — 15+ countries and counting.', accent: 'var(--cyan)' },
];

function ValuesAndIndustries() {
  return (
    <section className="py-24 md:py-32 relative" style={{ background: 'var(--offwhite)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12">

        {/* Values */}
        <div className="mb-24">
          <SectionLabel text="Core Values" />
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold leading-tight mb-12"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            The Principles Behind<br /><span style={{ color: 'var(--lime-dim)' }}>Every Project We Build</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {values.map((v, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: '-40px' });
              return (
                <motion.div key={v.title} ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}
                  className="bg-white rounded-[18px] p-7 relative overflow-hidden"
                  style={{ border: `1px solid ${v.accent}18` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, ${v.accent}, transparent)` }} />
                  <h3 className="font-display font-bold text-lg mb-2.5" style={{ color: 'var(--ink)', letterSpacing: '-0.02em' }}>{v.title}</h3>
                  <p className="font-body font-normal text-sm leading-relaxed" style={{ color: '#4A6054' }}>{v.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Industries */}
        <div>
          <SectionLabel text="Industries Served" />
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold leading-tight mb-11"
            style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            We Serve Every Sector<br /><span style={{ color: 'var(--lime-dim)' }}>That Generates Waste</span>
          </motion.h2>
          <div className="flex flex-wrap gap-3">
            {industries.map((ind, i) => (
              <motion.div key={ind.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-2.5 bg-white rounded-full px-5 py-2.5"
                style={{ border: '1px solid rgba(0,180,60,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <span className="text-lg">{ind.icon}</span>
                <span className="font-body font-medium text-sm" style={{ color: 'var(--ink)' }}>{ind.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ────────────────────────────────────────────────────────
function AboutCTA() {
  return (
    <section className="py-24 px-6 text-center relative overflow-hidden" style={{ background: 'var(--void)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,230,118,0.06) 0%, transparent 70%)' }} />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.7 }} className="relative z-[1] max-w-[600px] mx-auto">
        <h2 className="font-display font-bold leading-tight mb-6"
          style={{ fontSize: 'clamp(28px, 5vw, 64px)', color: 'var(--text-dark)', letterSpacing: '-0.04em' }}>
          Ready to work with<br /><span style={{ color: 'var(--lime)' }}>40 years of expertise?</span>
        </h2>
        <p className="font-body font-normal text-base md:text-lg leading-relaxed mb-11 max-w-[480px] mx-auto"
          style={{ color: 'var(--text-muted-dark)' }}>
          Tell us about your project and we'll get back within 24 hours with a tailored proposal.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact"
            className="font-body font-bold text-[15px] text-void no-underline px-9 py-4 rounded-full transition-all duration-200"
            style={{ background: 'var(--lime)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--cyan)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >Start a Project →</Link>
          <Link href="/services"
            className="font-body font-semibold text-[15px] no-underline px-9 py-4 rounded-full transition-all duration-200"
            style={{ color: 'var(--text-dark)', border: '1.5px solid rgba(255,255,255,0.15)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
          >View Our Services</Link>
        </div>
      </motion.div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <Timeline />
      <VisionMission />
      <ValuesAndIndustries />
      <AboutCTA />
    </main>
  );
}
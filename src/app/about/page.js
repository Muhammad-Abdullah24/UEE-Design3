'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import NavbarC from '@/components/Navbar';

// ─── SHARED SECTION LABEL ───────────────────────────────────────
function SectionLabel({ text, color = 'var(--lime)', align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'center' ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
        justifyContent: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      {align !== 'center' && <div style={{ width: 32, height: 2, background: color }} />}
      <span style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color,
      }}>{text}</span>
      {align === 'center' && <div style={{ width: 32, height: 2, background: color }} />}
      {align === 'center' && <div style={{ width: 32, height: 2, background: color, order: -1 }} />}
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
    <section style={{
      background: 'var(--void)',
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 100,
      paddingBottom: 80,
    }}>
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,230,118,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,230,118,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      {/* Giant watermark */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(120px, 20vw, 280px)',
          letterSpacing: '-0.06em',
          color: 'rgba(0,230,118,0.03)',
          whiteSpace: 'nowrap',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          y,
        }}
      >ABOUT</motion.div>

      {/* Ambient blobs */}
      <div style={{
        position: 'absolute', top: '20%', right: '15%',
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '10%',
        width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(0,230,118,0.07) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
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
          <a href="/" style={{ color: 'var(--text-muted-dark)', textDecoration: 'none' }}>Home</a>
          <span style={{ opacity: 0.4 }}>→</span>
          <span style={{ color: 'var(--lime)' }}>About</span>
        </motion.div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(48px, 7vw, 96px)',
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          color: 'var(--text-dark)',
          marginBottom: 36,
        }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'inline-block',
                marginRight: '0.25em',
                color: word === 'Better' ? 'var(--lime)' : word === 'World.' ? 'var(--cyan)' : 'var(--text-dark)',
              }}
            >{word}</motion.span>
          ))}
        </h1>

        {/* Sub row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 48, flexWrap: 'wrap' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 17,
              lineHeight: 1.75,
              color: 'var(--text-muted-dark)',
              maxWidth: 480,
            }}
          >
            Universal Environmental Engineering has been designing and delivering waste treatment
            and environmental solutions since 1980 — for governments, industries, and municipalities
            across Asia and beyond.
          </motion.p>

          {/* Floating stat pills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {[
              { val: '1980', label: 'Founded', color: 'var(--lime)' },
              { val: '15+', label: 'Countries', color: 'var(--cyan)' },
              { val: '500+', label: 'Projects', color: 'var(--lime)' },
            ].map(({ val, label, color }) => (
              <motion.div
                key={label}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${color}30`,
                  borderRadius: 100,
                  padding: '8px 18px',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 20,
                  color,
                  letterSpacing: '-0.03em',
                }}>{val}</span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'var(--text-muted-dark)',
                  fontWeight: 500,
                }}>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Wave bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}>
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }}>
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="var(--offwhite)" />
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
  { year: '2007', title: 'HiWave Compo', desc: 'Proprietary composting machine deployed at Putrajaya Hospital — food waste to fertilizer.' },
  { year: '2012', title: 'Renewable Energy', desc: 'Launched waste-to-energy division. Biogas recovery and W-t-E systems added to portfolio.' },
  { year: '2020', title: '500+ Projects', desc: 'Crossed 500 successfully completed projects across 15+ countries.' },
  { year: 'Now', title: 'Global Reach', desc: 'Delivering integrated environmental solutions across Asia and growing internationally.' },
];

function Timeline() {
  const trackRef = useRef(null);

  return (
    <section style={{
      background: 'var(--offwhite)',
      padding: '100px 0 0',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', marginBottom: 48 }}>
        <SectionLabel text="Our Journey" color="var(--lime-dim)" />
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(32px, 4vw, 52px)',
            color: 'var(--ink)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          Four Decades of<br />
          <span style={{ color: 'var(--lime-dim)' }}>Proven Delivery</span>
        </motion.h2>
      </div>

      {/* Horizontal timeline */}
      <div style={{ position: 'relative', padding: '0 48px 80px' }}>
        {/* Connecting line */}
        <div style={{
          position: 'absolute',
          top: 32, left: 0, right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(0,200,83,0.2) 5%, rgba(0,200,83,0.2) 95%, transparent)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{
          display: 'flex',
          gap: 0,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          paddingBottom: 16,
        }}>
          {milestones.map((m, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true });
            const isLast = i === milestones.length - 1;

            return (
              <motion.div
                key={m.year}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                style={{
                  flex: '0 0 200px',
                  paddingTop: 16,
                  paddingRight: isLast ? 0 : 32,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Dot */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                  style={{
                    width: 16, height: 16,
                    borderRadius: '50%',
                    background: isLast ? 'var(--lime)' : 'white',
                    border: `2px solid ${isLast ? 'var(--lime)' : 'rgba(0,180,60,0.3)'}`,
                    boxShadow: isLast ? '0 0 16px rgba(0,230,118,0.5)' : 'none',
                    marginBottom: 20,
                  }}
                />
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 26,
                  color: isLast ? 'var(--lime-dim)' : 'var(--ink)',
                  letterSpacing: '-0.03em',
                  marginBottom: 6,
                }}>{m.year}</div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 14,
                  color: 'var(--ink)',
                  marginBottom: 8,
                }}>{m.title}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: '#4A6054',
                }}>{m.desc}</div>
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
    <section style={{
      background: 'var(--void)',
      padding: '120px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(0,230,118,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <SectionLabel text="Purpose & Direction" color="var(--lime)" align="center" />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(30px, 4vw, 50px)',
              color: 'var(--text-dark)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >What Drives Us Forward</motion.h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* VISION */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--void-2)',
              border: '1px solid rgba(0,230,118,0.12)',
              borderRadius: 24,
              padding: '48px 44px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* BG letter */}
            <div style={{
              position: 'absolute',
              bottom: -20, right: 10,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 180,
              lineHeight: 1,
              color: 'rgba(0,230,118,0.04)',
              userSelect: 'none',
              pointerEvents: 'none',
              letterSpacing: '-0.06em',
            }}>V</div>

            <div style={{
              width: 52, height: 52,
              background: 'rgba(0,230,118,0.1)',
              border: '1px solid rgba(0,230,118,0.25)',
              borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 28,
            }}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <circle cx="13" cy="13" r="9" stroke="var(--lime)" strokeWidth="1.8" fill="rgba(0,230,118,0.08)"/>
                <path d="M13 6V13L17 16" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M4 4L8 8M22 4L18 8M4 22L8 18M22 22L18 18" stroke="var(--lime)" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
              </svg>
            </div>

            <div style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--lime)',
              marginBottom: 14,
            }}>Vision Statement</div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              color: 'var(--text-dark)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}>
              "To be the leader in the environmental industry within our own specialised technologies."
            </h3>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.75,
              color: 'var(--text-muted-dark)',
            }}>
              We pursue technical leadership in every domain we operate — from wastewater to waste-to-energy — setting the standard for reliability, performance, and environmental compliance.
            </p>

            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: 3,
              background: 'linear-gradient(90deg, var(--lime), transparent)',
              borderRadius: '24px 24px 0 0',
            }} />
          </motion.div>

          {/* MISSION */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--void-2)',
              border: '1px solid rgba(0,229,255,0.12)',
              borderRadius: 24,
              padding: '48px 44px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* BG letter */}
            <div style={{
              position: 'absolute',
              bottom: -20, right: 10,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 180,
              lineHeight: 1,
              color: 'rgba(0,229,255,0.04)',
              userSelect: 'none',
              pointerEvents: 'none',
              letterSpacing: '-0.06em',
            }}>M</div>

            <div style={{
              width: 52, height: 52,
              background: 'rgba(0,229,255,0.1)',
              border: '1px solid rgba(0,229,255,0.25)',
              borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 28,
            }}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M5 20L10 12L14 16L18 9L21 13" stroke="var(--cyan)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="21" cy="7" r="3" fill="rgba(0,229,255,0.2)" stroke="var(--cyan)" strokeWidth="1.5"/>
              </svg>
            </div>

            <div style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--cyan)',
              marginBottom: 14,
            }}>Mission Statement</div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              color: 'var(--text-dark)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}>
              "To provide the most efficient and economical solution for a cleaner environment."
            </h3>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.75,
              color: 'var(--text-muted-dark)',
            }}>
              Every system we design is optimised for performance, cost-efficiency, and long-term operation — because a cleaner world should also be an affordable one.
            </p>

            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: 3,
              background: 'linear-gradient(90deg, var(--cyan), transparent)',
              borderRadius: '24px 24px 0 0',
            }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── INDUSTRIES SERVED ──────────────────────────────────────────
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
  {
    title: 'Technical Excellence',
    body: 'Every solution is engineered to the highest standard — from concept design to commissioning.',
    accent: 'var(--lime)',
    bg: '#0A1F10',
  },
  {
    title: 'Reliability',
    body: 'Our systems run for decades. The Century Paper DAF has been operating continuously since 2003.',
    accent: 'var(--cyan)',
    bg: '#071820',
  },
  {
    title: 'Environmental Integrity',
    body: 'We don\'t greenwash. Every project meets or exceeds local and international regulatory standards.',
    accent: 'var(--lime)',
    bg: '#0A1F10',
  },
  {
    title: 'Client Partnership',
    body: 'We stay beyond handover — with long-term service contracts, training, and 24/7 support.',
    accent: 'var(--cyan)',
    bg: '#071820',
  },
  {
    title: 'Proven at Scale',
    body: 'From small hospital food-waste composters to 24,000 m³/day industrial treatment plants.',
    accent: 'var(--lime)',
    bg: '#0A1F10',
  },
  {
    title: 'Global Experience',
    body: 'Projects in Malaysia, Pakistan, Vietnam, Myanmar and beyond — 15+ countries and counting.',
    accent: 'var(--cyan)',
    bg: '#071820',
  },
];

function ValuesAndIndustries() {
  return (
    <section style={{
      background: 'var(--offwhite)',
      padding: '120px 0',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        {/* Values */}
        <div style={{ marginBottom: 100 }}>
          <SectionLabel text="Core Values" color="var(--lime-dim)" />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(30px, 4vw, 48px)',
              color: 'var(--ink)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 48,
            }}
          >
            The Principles Behind<br />
            <span style={{ color: 'var(--lime-dim)' }}>Every Project We Build</span>
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {values.map((v, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: '-40px' });
              return (
                <motion.div
                  key={v.title}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  style={{
                    background: 'white',
                    border: `1px solid ${v.accent}18`,
                    borderRadius: 18,
                    padding: '28px 26px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  whileHover={{ y: -4, boxShadow: `0 16px 40px rgba(0,0,0,0.08)` }}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, ${v.accent}, transparent)`,
                  }} />
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 18,
                    color: 'var(--ink)',
                    marginBottom: 10,
                    letterSpacing: '-0.02em',
                  }}>{v.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: '#4A6054',
                  }}>{v.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Industries */}
        <div>
          <SectionLabel text="Industries Served" color="var(--lime-dim)" />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              color: 'var(--ink)',
              letterSpacing: '-0.03em',
              marginBottom: 44,
            }}
          >We Serve Every Sector<br />
            <span style={{ color: 'var(--lime-dim)' }}>That Generates Waste</span>
          </motion.h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {industries.map((ind, i) => (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ scale: 1.04 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'white',
                  border: '1px solid rgba(0,180,60,0.12)',
                  borderRadius: 100,
                  padding: '10px 22px',
                  cursor: 'default',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <span style={{ fontSize: 18 }}>{ind.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: 14,
                  color: 'var(--ink)',
                }}>{ind.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── CTA BAND ───────────────────────────────────────────────────
function AboutCTA() {
  return (
    <section style={{
      background: 'var(--void)',
      padding: '100px 48px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 300,
        background: 'radial-gradient(ellipse, rgba(0,230,118,0.06) 0%, transparent 70%)',
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
          fontSize: 'clamp(32px, 5vw, 64px)',
          color: 'var(--text-dark)',
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          marginBottom: 24,
        }}>
          Ready to work with<br />
          <span style={{ color: 'var(--lime)' }}>40 years of expertise?</span>
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 17,
          color: 'var(--text-muted-dark)',
          marginBottom: 44,
          maxWidth: 480,
          margin: '0 auto 44px',
        }}>
          Tell us about your project and we'll get back within 24 hours with a tailored proposal.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/contact" style={{
            background: 'var(--lime)',
            color: 'var(--void)',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: 15,
            padding: '15px 36px',
            borderRadius: 100,
            textDecoration: 'none',
            transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--cyan)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >Start a Project →</a>
          <a href="/services" style={{
            background: 'transparent',
            color: 'var(--text-dark)',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 15,
            padding: '15px 36px',
            borderRadius: 100,
            textDecoration: 'none',
            border: '1.5px solid rgba(255,255,255,0.15)',
            transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
          >View Our Services</a>
        </div>
      </motion.div>
    </section>
  );
}

// ─── PAGE ASSEMBLY ───────────────────────────────────────────────
export default function AboutPage() {
  useEffect(() => {
    // Custom cursor
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let mouseX = 0, mouseY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      if (dot) {
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
      }
      if (ring) {
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    const addHover = () => document.body.classList.add('cursor-hover');
    const removeHover = () => document.body.classList.remove('cursor-hover');
    const interactives = document.querySelectorAll('a, button, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
      <main>
        <NavbarC />
        <AboutHero />
        <Timeline />
        <VisionMission />
        <ValuesAndIndustries />
        <AboutCTA />
      </main>
    </>
  );
}
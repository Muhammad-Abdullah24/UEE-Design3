'use client';
import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// ─── HERO ─────────────────────────────────────────────────────────
function ServiceHero({ title, subtitle, description, accent, breadcrumb, badge, watermark }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  const words = title.split(' ');

  return (
    <section style={{
      background: 'var(--void)',
      minHeight: '65vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 100,
      paddingBottom: 70,
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
        fontSize: 'clamp(60px, 12vw, 180px)',
        letterSpacing: '-0.06em',
        color: `${accent}08`,
        whiteSpace: 'nowrap',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        y,
      }}>{watermark || title.toUpperCase()}</motion.div>

      {/* Blobs */}
      <div style={{
        position: 'absolute', top: '10%', right: '8%',
        width: 400, height: 400,
        background: `radial-gradient(circle, ${accent}08 0%, transparent 70%)`,
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
          <Link href="/services" style={{ color: 'var(--text-muted-dark)', textDecoration: 'none' }}>Services</Link>
          <span style={{ opacity: 0.4 }}>→</span>
          <span style={{ color: accent }}>{breadcrumb}</span>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: `${accent}12`,
            border: `1px solid ${accent}30`,
            borderRadius: 100,
            padding: '6px 16px',
            marginBottom: 28,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
          <span style={{
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: accent,
          }}>{badge}</span>
        </motion.div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(44px, 6vw, 86px)',
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          color: 'var(--text-dark)',
          marginBottom: 28,
        }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'inline-block',
                marginRight: '0.22em',
                color: i === words.length - 1 ? accent : 'var(--text-dark)',
              }}
            >{word}</motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            lineHeight: 1.75,
            color: 'var(--text-muted-dark)',
            maxWidth: 580,
          }}
        >{description}</motion.p>
      </motion.div>

      {/* Wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}>
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }}>
          <path d="M0,20 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--offwhite)" />
        </svg>
      </div>
    </section>
  );
}

// ─── OVERVIEW SPLIT ───────────────────────────────────────────────
function ServiceOverview({ overview, capabilities, accent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section style={{ background: 'var(--offwhite)', padding: '100px 0' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>

          {/* Left — prose */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 2, background: accent }} />
              <span style={{
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12,
                letterSpacing: '0.14em', textTransform: 'uppercase', color: accent,
              }}>Overview</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(26px, 3vw, 38px)',
              color: 'var(--ink)',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 24,
            }}>What We Deliver</h2>
            {overview.map((para, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: 15,
                lineHeight: 1.8,
                color: '#3A5A44',
                marginBottom: 16,
              }}>{para}</p>
            ))}
          </motion.div>

          {/* Right — capabilities list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 2, background: accent }} />
              <span style={{
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12,
                letterSpacing: '0.14em', textTransform: 'uppercase', color: accent,
              }}>Capabilities</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(26px, 3vw, 38px)',
              color: 'var(--ink)',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 28,
            }}>What's Included</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    background: 'white',
                    border: `1px solid ${accent}15`,
                    borderRadius: 12,
                    padding: '14px 18px',
                  }}
                >
                  <div style={{
                    width: 20, height: 20, minWidth: 20,
                    background: `${accent}15`,
                    border: `1px solid ${accent}35`,
                    borderRadius: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: 1,
                  }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: 14,
                    color: '#3A5A44',
                    lineHeight: 1.5,
                  }}>{cap}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SYSTEMS GRID ─────────────────────────────────────────────────
function SystemsGrid({ systems, accent }) {
  return (
    <section style={{ background: 'var(--void)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 56 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 2, background: accent }} />
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: accent,
            }}>Systems & Technologies</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 46px)',
            color: 'var(--text-dark)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}>
            Technologies We Deploy
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {systems.map((sys, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: '-40px' });
            return (
              <motion.div
                key={sys.name}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                style={{
                  background: 'var(--void-2)',
                  border: `1px solid ${accent}15`,
                  borderRadius: 20,
                  padding: '32px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${accent}, transparent)`,
                }} />
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 13,
                  color: accent,
                  letterSpacing: '0.02em',
                  marginBottom: 10,
                  opacity: 0.7,
                }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 19,
                  color: 'var(--text-dark)',
                  letterSpacing: '-0.02em',
                  marginBottom: 10,
                  lineHeight: 1.2,
                }}>{sys.name}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: 'var(--text-muted-dark)',
                }}>{sys.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDY STRIP ─────────────────────────────────────────────
function CaseStudyStrip({ cases, accent }) {
  if (!cases || cases.length === 0) return null;
  return (
    <section style={{ background: 'var(--offwhite)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 32, height: 2, background: accent }} />
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: accent,
            }}>Real Projects</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(26px, 3.5vw, 44px)',
            color: 'var(--ink)',
            letterSpacing: '-0.03em',
          }}>Proven in the Field</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {cases.map((c, i) => (
            <motion.div
              key={c.client}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: 'white',
                border: `1px solid ${accent}18`,
                borderRadius: 20,
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${accent}, transparent)`,
              }} />
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 15,
                color: 'var(--ink)',
                marginBottom: 6,
              }}>{c.client}</div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: accent,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}>{c.location}</div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                lineHeight: 1.7,
                color: '#3A5A44',
                marginBottom: 20,
              }}>{c.detail}</p>
              {c.metric && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `${accent}10`,
                  border: `1px solid ${accent}25`,
                  borderRadius: 100,
                  padding: '6px 14px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 16,
                    color: accent,
                    letterSpacing: '-0.02em',
                  }}>{c.metric}</span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: '#4A6054',
                    fontWeight: 500,
                  }}>{c.metricLabel}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BOTTOM CTA ───────────────────────────────────────────────────
function ServiceCTA({ title, accent }) {
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
        transform: 'translate(-50%,-50%)',
        width: 600, height: 300,
        background: `radial-gradient(ellipse, ${accent}07 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}
      >
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(28px, 4.5vw, 56px)',
          color: 'var(--text-dark)',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          marginBottom: 20,
        }}>
          Need a {title} solution<br />
          <span style={{ color: accent }}>for your facility?</span>
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          color: 'var(--text-muted-dark)',
          marginBottom: 44,
          lineHeight: 1.7,
        }}>
          Our engineers will review your requirements and provide a detailed proposal. Free consultation, no obligation.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" style={{
            background: accent,
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
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Request a Consultation →</Link>
          <Link href="/services" style={{
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
            display: 'inline-block',
          }}>← All Services</Link>
        </div>
      </motion.div>
    </section>
  );
}

// ─── EXPORTED LAYOUT ASSEMBLER ────────────────────────────────────
export default function ServicePageLayout({ data }) {
  return (
    <main>
      <ServiceHero {...data.hero} />
      <ServiceOverview overview={data.overview} capabilities={data.capabilities} accent={data.hero.accent} />
      <SystemsGrid systems={data.systems} accent={data.hero.accent} />
      {data.cases && <CaseStudyStrip cases={data.cases} accent={data.hero.accent} />}
      <ServiceCTA title={data.hero.breadcrumb} accent={data.hero.accent} />
    </main>
  );
}
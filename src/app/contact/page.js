'use client';
import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import NavbarC from '@/components/Navbar';

// ─── FLOATING LABEL INPUT ───────────────────────────────────────
function FloatInput({ label, type = 'text', name, required = false, textarea = false }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  const active = focused || filled;

  const base = {
    width: '100%',
    background: focused ? 'rgba(0,230,118,0.04)' : 'rgba(255,255,255,0.03)',
    border: `1.5px solid ${focused ? 'var(--lime)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 14,
    padding: textarea ? '28px 20px 14px' : '26px 20px 10px',
    fontFamily: 'var(--font-body)',
    fontWeight: 400,
    fontSize: 15,
    color: 'var(--text-dark)',
    outline: 'none',
    transition: 'all 0.25s ease',
    resize: textarea ? 'vertical' : undefined,
    minHeight: textarea ? 130 : undefined,
    boxSizing: 'border-box',
    caretColor: 'var(--lime)',
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <motion.label
        animate={{
          top: active ? 10 : '50%',
          fontSize: active ? 11 : 15,
          color: focused ? 'var(--lime)' : active ? 'var(--text-muted-dark)' : 'rgba(255,255,255,0.3)',
          y: active ? 0 : textarea ? -48 : '-50%',
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          left: 20,
          pointerEvents: 'none',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          letterSpacing: active ? '0.08em' : '0.01em',
          textTransform: active ? 'uppercase' : 'none',
          zIndex: 1,
          top: textarea ? '18px' : '50%',
          transform: textarea ? 'none' : active ? 'none' : 'translateY(-50%)',
        }}
      >{label}{required && <span style={{ color: 'var(--lime)', marginLeft: 2 }}>*</span>}</motion.label>

      {textarea ? (
        <textarea
          name={name}
          style={base}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); setFilled(e.target.value.length > 0); }}
          onChange={e => setFilled(e.target.value.length > 0)}
        />
      ) : (
        <input
          type={type}
          name={name}
          style={base}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); setFilled(e.target.value.length > 0); }}
          onChange={e => setFilled(e.target.value.length > 0)}
        />
      )}
    </div>
  );
}

// ─── SERVICE SELECTOR ───────────────────────────────────────────
const serviceOptions = [
  'Wastewater Treatment',
  'Solid Waste & Biomass',
  'Gaseous Waste Control',
  'Renewable Energy',
  'Process Engineering',
  'After-Sales & Maintenance',
  'Other / Not Sure',
];

function ServiceSelector({ selected, onToggle }) {
  return (
    <div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        fontSize: 12,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted-dark)',
        marginBottom: 12,
      }}>Service of Interest</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {serviceOptions.map(s => {
          const isSelected = selected.includes(s);
          return (
            <button
              key={s}
              type="button"
              onClick={() => onToggle(s)}
              style={{
                background: isSelected ? 'rgba(0,230,118,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${isSelected ? 'var(--lime)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 100,
                padding: '7px 16px',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: 13,
                color: isSelected ? 'var(--lime)' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >{s}</button>
          );
        })}
      </div>
    </div>
  );
}

// ─── CONTACT HERO ───────────────────────────────────────────────
function ContactHero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, -80]);

  return (
    <section style={{
      background: 'var(--mint)',
      minHeight: '52vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 110,
      paddingBottom: 0,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,230,118,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,230,118,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      {/* Right blob */}
      <div style={{
        position: 'absolute', top: '10%', right: '-5%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <motion.div
        style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', width: '100%', y, opacity, position: 'relative', zIndex: 2 }}
      >
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            marginBottom: 36,
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--muted-dark)',
          }}
        >
          <a href="/" style={{ color: 'var(--muted-dark)', textDecoration: 'none' }}>Home</a>
          <span style={{ opacity: 0.4 }}>→</span>
          <span style={{ color: 'var(--lime-dim)' }}>Contact</span>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(44px, 7vw, 88px)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: 'var(--ink)',
              marginBottom: 24,
            }}>
              {'Let\'s Build'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block', marginRight: char === ' ' ? '0.25em' : 0 }}
                >{char}</motion.span>
              ))}
              <br />
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{ color: 'var(--lime-dim)', display: 'inline-block' }}
              >Something Clean.</motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                color: 'var(--muted-dark)',
                maxWidth: 400,
                lineHeight: 1.7,
              }}
            >
              Tell us about your project. Our engineering team will review your requirements and respond within 24 hours.
            </motion.p>
          </div>

          {/* Response time pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            style={{
              background: 'rgba(0,200,83,0.1)',
              border: '1px solid rgba(0,200,83,0.25)',
              borderRadius: 16,
              padding: '20px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: 180,
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--lime)' }}
              />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--lime-dim)',
              }}>Response Time</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 28,
              color: 'var(--ink)',
              letterSpacing: '-0.03em',
            }}>{'< 24hrs'}</div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: 'var(--muted-dark)',
            }}>Mon–Fri, 9am–6pm MYT</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Wave */}
      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, zIndex: 3 }}>
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }}>
          <path d="M0,20 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="var(--void)" />
        </svg>
      </div>
    </section>
  );
}

// ─── CONTACT FORM + INFO ─────────────────────────────────────────
function ContactBody() {
  const [services, setServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (s) => {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const infoCards = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2C7.686 2 5 4.686 5 8C5 12.5 11 20 11 20C11 20 17 12.5 17 8C17 4.686 14.314 2 11 2Z" stroke="var(--lime)" strokeWidth="1.6" fill="rgba(0,230,118,0.08)"/>
          <circle cx="11" cy="8" r="2.5" stroke="var(--lime)" strokeWidth="1.4"/>
        </svg>
      ),
      label: 'Headquarters',
      lines: ['Kuala Lumpur, Malaysia', 'Regional offices in Pakistan'],
      accent: 'var(--lime)',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M4 4H8L10 9L7.5 10.5C8.571 12.674 9.326 13.429 11.5 14.5L13 12L18 14V18C18 18 16 20 11 18C6 16 4 8 4 4Z" stroke="var(--cyan)" strokeWidth="1.6" fill="rgba(0,229,255,0.08)" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Phone',
      lines: ['+60 3-XXXX XXXX', '+92 XX-XXXXXXX (PK)'],
      accent: 'var(--cyan)',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="5" width="16" height="12" rx="2" stroke="var(--lime)" strokeWidth="1.6" fill="rgba(0,230,118,0.08)"/>
          <path d="M3 8L11 13L19 8" stroke="var(--lime)" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      ),
      label: 'Email',
      lines: ['info@uee.com.my', 'projects@uee.com.my'],
      accent: 'var(--lime)',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="8" stroke="var(--cyan)" strokeWidth="1.6" fill="rgba(0,229,255,0.08)"/>
          <path d="M11 5V11L14.5 13.5" stroke="var(--cyan)" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      ),
      label: 'Business Hours',
      lines: ['Monday – Friday', '9:00am – 6:00pm MYT'],
      accent: 'var(--cyan)',
    },
  ];

  return (
    <section style={{
      background: 'var(--void)',
      padding: '80px 0 120px',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 48px',
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: 56,
        alignItems: 'start',
      }}>

        {/* LEFT — Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            background: 'var(--void-2)',
            border: '1px solid rgba(0,230,118,0.1)',
            borderRadius: 28,
            padding: '48px 44px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Top accent */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, var(--lime), var(--cyan), transparent)',
            }} />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    textAlign: 'center',
                    padding: '60px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 20,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                      width: 72, height: 72,
                      background: 'rgba(0,230,118,0.12)',
                      border: '2px solid var(--lime)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M8 16L13 21L24 11" stroke="var(--lime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 28,
                    color: 'var(--text-dark)',
                    letterSpacing: '-0.02em',
                  }}>Message Received</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    color: 'var(--text-muted-dark)',
                    maxWidth: 340,
                    lineHeight: 1.7,
                  }}>
                    Our engineering team will review your inquiry and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      background: 'rgba(0,230,118,0.1)',
                      border: '1px solid rgba(0,230,118,0.3)',
                      borderRadius: 100,
                      padding: '10px 24px',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: 14,
                      color: 'var(--lime)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >Send Another Message</button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                >
                  <div>
                    <h2 style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 26,
                      color: 'var(--text-dark)',
                      letterSpacing: '-0.02em',
                      marginBottom: 6,
                    }}>Send Us a Message</h2>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: 'var(--text-muted-dark)',
                      marginBottom: 8,
                    }}>All fields marked with * are required.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <FloatInput label="Full Name" name="name" required />
                    <FloatInput label="Company / Organisation" name="company" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <FloatInput label="Email Address" type="email" name="email" required />
                    <FloatInput label="Phone Number" type="tel" name="phone" />
                  </div>
                  <FloatInput label="Country / Location" name="country" />

                  <ServiceSelector selected={services} onToggle={toggleService} />

                  <FloatInput label="Tell us about your project..." name="message" textarea required />

                  <button
                    type="submit"
                    style={{
                      background: 'var(--lime)',
                      color: 'var(--void)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      fontSize: 15,
                      padding: '16px 32px',
                      borderRadius: 100,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--cyan)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    Submit Enquiry
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8H14M14 8L10 4M14 8L10 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* RIGHT — Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          {/* Map placeholder */}
          <div style={{
            background: 'var(--void-2)',
            border: '1px solid rgba(0,230,118,0.1)',
            borderRadius: 20,
            height: 200,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Stylised map grid */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `
                linear-gradient(rgba(0,230,118,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,230,118,0.06) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0,230,118,0.06) 0%, transparent 70%)',
            }} />
            {/* Pin */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
                  <path d="M18 2C10.268 2 4 8.268 4 16C4 27 18 42 18 42C18 42 32 27 32 16C32 8.268 25.732 2 18 2Z" fill="rgba(0,230,118,0.15)" stroke="var(--lime)" strokeWidth="2"/>
                  <circle cx="18" cy="16" r="5" fill="var(--lime)"/>
                </svg>
              </motion.div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 13,
                color: 'var(--lime)',
                marginTop: 8,
              }}>Kuala Lumpur, Malaysia</div>
            </div>
          </div>

          {/* Info cards */}
          {infoCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: 'var(--void-2)',
                border: `1px solid ${card.accent}18`,
                borderRadius: 16,
                padding: '20px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div style={{
                width: 44, height: 44, minWidth: 44,
                background: `${card.accent}12`,
                border: `1px solid ${card.accent}25`,
                borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {card.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: card.accent,
                  marginBottom: 4,
                }}>{card.label}</div>
                {card.lines.map(line => (
                  <div key={line} style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: 14,
                    color: 'var(--text-dark)',
                    lineHeight: 1.5,
                  }}>{line}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── BOTTOM DARK BAND ───────────────────────────────────────────
function ContactFooterBand() {
  return (
    <section style={{
      background: 'var(--void-2)',
      borderTop: '1px solid rgba(0,230,118,0.08)',
      padding: '48px 48px',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 24,
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 16,
            color: 'var(--text-dark)',
            marginBottom: 4,
          }}>Universal Environmental Engineering</div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--text-muted-dark)',
          }}>Towards a Safer and Cleaner World — since 1980.</div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { label: 'LinkedIn', href: '#' },
            { label: 'Facebook', href: '#' },
            { label: 'YouTube', href: '#' },
          ].map(s => (
            <a key={s.label} href={s.href} style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 13,
              color: 'var(--text-muted-dark)',
              textDecoration: 'none',
              border: '1px solid rgba(0,230,118,0.15)',
              borderRadius: 100,
              padding: '8px 18px',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--lime)'; e.currentTarget.style.borderColor = 'var(--lime)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted-dark)'; e.currentTarget.style.borderColor = 'rgba(0,230,118,0.15)'; }}
            >{s.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ASSEMBLY ───────────────────────────────────────────────
export default function ContactPage() {
  return (
    <main>
      <NavbarC />
      <ContactHero />
      <ContactBody />
      <ContactFooterBand />
    </main>
  );
}
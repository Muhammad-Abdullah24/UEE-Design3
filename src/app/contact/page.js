'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

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
    <div className="relative w-full">
      <motion.label
        animate={{
          top: active ? 10 : textarea ? '18px' : '50%',
          fontSize: active ? 11 : 15,
          color: focused ? 'var(--lime)' : active ? 'var(--text-muted-dark)' : 'rgba(255,255,255,0.3)',
          y: active ? 0 : textarea ? 0 : '-50%',
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute', left: 20,
          pointerEvents: 'none',
          fontFamily: 'var(--font-body)', fontWeight: 500,
          letterSpacing: active ? '0.08em' : '0.01em',
          textTransform: active ? 'uppercase' : 'none',
          zIndex: 1,
          transform: textarea ? 'none' : active ? 'none' : 'translateY(-50%)',
        }}
      >{label}{required && <span style={{ color: 'var(--lime)', marginLeft: 2 }}>*</span>}</motion.label>

      {textarea ? (
        <textarea name={name} style={base}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); setFilled(e.target.value.length > 0); }}
          onChange={e => setFilled(e.target.value.length > 0)}
        />
      ) : (
        <input type={type} name={name} style={base}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); setFilled(e.target.value.length > 0); }}
          onChange={e => setFilled(e.target.value.length > 0)}
        />
      )}
    </div>
  );
}

const serviceOptions = [
  'Wastewater Treatment', 'Solid Waste & Biomass', 'Gaseous Waste Control',
  'Renewable Energy', 'Process Engineering', 'After-Sales & Maintenance', 'Other / Not Sure',
];

function ServiceSelector({ selected, onToggle }) {
  return (
    <div>
      <div className="font-body font-medium text-[12px] tracking-widest uppercase mb-3"
        style={{ color: 'var(--text-muted-dark)' }}>Service of Interest</div>
      <div className="flex flex-wrap gap-2">
        {serviceOptions.map(s => {
          const isSelected = selected.includes(s);
          return (
            <button key={s} type="button" onClick={() => onToggle(s)}
              className="rounded-full px-4 py-1.5 font-body font-medium text-[13px] cursor-pointer transition-all duration-200"
              style={{
                background: isSelected ? 'rgba(0,230,118,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${isSelected ? 'var(--lime)' : 'rgba(255,255,255,0.1)'}`,
                color: isSelected ? 'var(--lime)' : 'rgba(255,255,255,0.5)',
              }}
            >{s}</button>
          );
        })}
      </div>
    </div>
  );
}

function ContactHero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, -80]);

  return (
    <section className="relative overflow-hidden flex items-center pt-24 pb-0 min-h-[52vh]"
      style={{ background: 'var(--mint)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0,230,118,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.04) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      <div className="absolute top-[10%] right-[-5%] w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)' }} />

      <motion.div style={{ y, opacity }}
        className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12 w-full relative z-[2] pb-16">

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-9 font-body text-[13px]" style={{ color: 'var(--muted-dark)' }}>
          <Link href="/" style={{ color: 'var(--muted-dark)', textDecoration: 'none' }}>Home</Link>
          <span style={{ opacity: 0.4 }}>→</span>
          <span style={{ color: 'var(--lime-dim)' }}>Contact</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-10">
          <div>
            <h1 className="font-display font-bold leading-none tracking-tight mb-6"
              style={{ fontSize: 'clamp(40px, 7vw, 88px)', letterSpacing: '-0.04em', color: 'var(--ink)' }}>
              {"Let's Build".split('').map((char, i) => (
                <motion.span key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block', marginRight: char === ' ' ? '0.25em' : 0 }}
                >{char}</motion.span>
              ))}
              <br />
              <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{ color: 'var(--lime-dim)', display: 'inline-block' }}>
                Something Clean.
              </motion.span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="font-body text-base md:text-lg leading-relaxed max-w-[400px]" style={{ color: 'var(--muted-dark)' }}>
              Tell us about your project. Our engineering team will review your requirements and respond within 24 hours.
            </motion.p>
          </div>

          {/* Response time pill */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="rounded-2xl p-5 md:p-6 min-w-[160px] flex-shrink-0"
            style={{ background: 'rgba(0,200,83,0.1)', border: '1px solid rgba(0,200,83,0.25)' }}>
            <div className="flex items-center gap-2 mb-1">
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full" style={{ background: 'var(--lime)' }} />
              <span className="font-body font-semibold text-[11px] tracking-widest uppercase"
                style={{ color: 'var(--lime-dim)' }}>Response Time</span>
            </div>
            <div className="font-display font-bold text-2xl md:text-3xl mb-1"
              style={{ color: 'var(--ink)', letterSpacing: '-0.03em' }}>{'< 24hrs'}</div>
            <div className="font-body text-[12px]" style={{ color: 'var(--muted-dark)' }}>Mon–Fri, 9am–6pm MYT</div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-[-1px] left-0 right-0 z-[3]">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }}>
          <path d="M0,20 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="var(--void)" />
        </svg>
      </div>
    </section>
  );
}

function ContactBody() {
  const [services, setServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const toggleService = (s) => setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  const infoCards = [
    {
      label: 'Headquarters', lines: ['Kuala Lumpur, Malaysia', 'Regional offices in Pakistan'], accent: 'var(--lime)',
      icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2C7.686 2 5 4.686 5 8C5 12.5 11 20 11 20C11 20 17 12.5 17 8C17 4.686 14.314 2 11 2Z" stroke="var(--lime)" strokeWidth="1.6" fill="rgba(0,230,118,0.08)" /><circle cx="11" cy="8" r="2.5" stroke="var(--lime)" strokeWidth="1.4" /></svg>,
    },
    {
      label: 'Phone', lines: ['+60 3-XXXX XXXX', '+92 XX-XXXXXXX (PK)'], accent: 'var(--cyan)',
      icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4H8L10 9L7.5 10.5C8.571 12.674 9.326 13.429 11.5 14.5L13 12L18 14V18C18 18 16 20 11 18C6 16 4 8 4 4Z" stroke="var(--cyan)" strokeWidth="1.6" fill="rgba(0,229,255,0.08)" strokeLinejoin="round" /></svg>,
    },
    {
      label: 'Email', lines: ['info@uee.com.my', 'projects@uee.com.my'], accent: 'var(--lime)',
      icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="5" width="16" height="12" rx="2" stroke="var(--lime)" strokeWidth="1.6" fill="rgba(0,230,118,0.08)" /><path d="M3 8L11 13L19 8" stroke="var(--lime)" strokeWidth="1.4" strokeLinecap="round" /></svg>,
    },
    {
      label: 'Business Hours', lines: ['Monday – Friday', '9:00am – 6:00pm MYT'], accent: 'var(--cyan)',
      icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="var(--cyan)" strokeWidth="1.6" fill="rgba(0,229,255,0.08)" /><path d="M11 5V11L14.5 13.5" stroke="var(--cyan)" strokeWidth="1.6" strokeLinecap="round" /></svg>,
    },
  ];

  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--void)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl p-7 md:p-12 relative overflow-hidden"
            style={{ background: 'var(--void-2)', border: '1px solid rgba(0,230,118,0.1)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: 'linear-gradient(90deg, var(--lime), var(--cyan), transparent)' }} />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center py-16 gap-5">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,230,118,0.12)', border: '2px solid var(--lime)' }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M8 16L13 21L24 11" stroke="var(--lime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <h3 className="font-display font-bold text-3xl" style={{ color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>Message Received</h3>
                  <p className="font-body text-[15px] leading-relaxed max-w-[340px]" style={{ color: 'var(--text-muted-dark)' }}>
                    Our engineering team will review your inquiry and respond within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)}
                    className="font-body font-semibold text-sm rounded-full px-6 py-2.5 cursor-pointer transition-all duration-200"
                    style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', color: 'var(--lime)' }}>
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl mb-1.5"
                      style={{ color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>Send Us a Message</h2>
                    <p className="font-body text-sm" style={{ color: 'var(--text-muted-dark)' }}>Fields marked * are required.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatInput label="Full Name" name="name" required />
                    <FloatInput label="Company / Organisation" name="company" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatInput label="Email Address" type="email" name="email" required />
                    <FloatInput label="Phone Number" type="tel" name="phone" />
                  </div>
                  <FloatInput label="Country / Location" name="country" />
                  <ServiceSelector selected={services} onToggle={toggleService} />
                  <FloatInput label="Tell us about your project..." name="message" textarea required />
                  <button type="submit"
                    className="w-full font-body font-bold text-[15px] text-void py-4 rounded-full flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
                    style={{ background: 'var(--lime)', border: 'none', letterSpacing: '0.01em' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--cyan)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    Submit Enquiry
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8H14M14 8L10 4M14 8L10 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Map placeholder */}
            <div className="rounded-2xl h-40 md:h-[200px] overflow-hidden relative flex items-center justify-center"
              style={{ background: 'var(--void-2)', border: '1px solid rgba(0,230,118,0.1)' }}>
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(0,230,118,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.06) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
              }} />
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,230,118,0.06) 0%, transparent 70%)' }} />
              <div className="relative z-[2] text-center">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                  <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
                    <path d="M18 2C10.268 2 4 8.268 4 16C4 27 18 42 18 42C18 42 32 27 32 16C32 8.268 25.732 2 18 2Z" fill="rgba(0,230,118,0.15)" stroke="var(--lime)" strokeWidth="2" />
                    <circle cx="18" cy="16" r="5" fill="var(--lime)" />
                  </svg>
                </motion.div>
                <div className="font-body font-semibold text-[13px] mt-2" style={{ color: 'var(--lime)' }}>Kuala Lumpur, Malaysia</div>
              </div>
            </div>

            {/* Info cards */}
            {infoCards.map((card, i) => (
              <motion.div key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl p-5 flex items-center gap-4"
                style={{ background: 'var(--void-2)', border: `1px solid ${card.accent}18` }}
              >
                <div className="w-11 h-11 min-w-[44px] rounded-xl flex items-center justify-center"
                  style={{ background: `${card.accent}12`, border: `1px solid ${card.accent}25` }}>
                  {card.icon}
                </div>
                <div>
                  <div className="font-body font-semibold text-[11px] tracking-widest uppercase mb-1"
                    style={{ color: card.accent }}>{card.label}</div>
                  {card.lines.map(line => (
                    <div key={line} className="font-body font-normal text-sm leading-snug"
                      style={{ color: 'var(--text-dark)' }}>{line}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactFooterBand() {
  return (
    <section className="py-12 px-6 md:px-10 xl:px-12"
      style={{ background: 'var(--void-2)', borderTop: '1px solid rgba(0,230,118,0.08)' }}>
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="font-display font-bold text-base mb-1" style={{ color: 'var(--text-dark)' }}>
            Universal Environmental Engineering
          </div>
          <div className="font-body text-[13px]" style={{ color: 'var(--text-muted-dark)' }}>
            Towards a Safer and Cleaner World — since 1980.
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {['LinkedIn', 'Facebook', 'YouTube'].map(s => (
            <a key={s} href="#"
              className="font-body font-semibold text-[13px] no-underline rounded-full px-4 py-2 transition-all duration-200"
              style={{ color: 'var(--text-muted-dark)', border: '1px solid rgba(0,230,118,0.15)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--lime)'; e.currentTarget.style.borderColor = 'var(--lime)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted-dark)'; e.currentTarget.style.borderColor = 'rgba(0,230,118,0.15)'; }}
            >{s}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactBody />
      <ContactFooterBand />
    </main>
  );
}
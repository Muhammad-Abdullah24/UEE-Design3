'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

// ─── CLIENTS ────────────────────────────────────────────────────────
const clients = [
  'Putrajaya Hospital',
  'Century Paper & Board',
  'Leather Field (Pvt) Ltd',
  'Pertubuhan Pengurusan',
  'Jelutong Melaka',
  'Government of Malaysia',
];

export function ClientsC() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 md:py-28 overflow-hidden" style={{ background: 'var(--offwhite)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5" style={{ background: 'var(--lime-dim)' }} />
            <span className="font-body font-semibold text-[12px] tracking-[0.14em] uppercase"
              style={{ color: 'var(--lime-dim)' }}>Trusted By</span>
            <div className="w-8 h-0.5" style={{ background: 'var(--lime-dim)' }} />
          </div>
          <h2 className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Industry Leaders, Governments,<br />
            <span style={{ color: 'var(--lime-dim)' }}>and Municipal Authorities</span>
          </h2>
        </motion.div>

        {/* Scrolling marquee */}
        <div className="relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-24 z-[2] pointer-events-none"
            style={{ background: 'linear-gradient(90deg, var(--offwhite), transparent)' }} />
          <div className="absolute top-0 right-0 bottom-0 w-24 z-[2] pointer-events-none"
            style={{ background: 'linear-gradient(-90deg, var(--offwhite), transparent)' }} />

          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="flex w-max"
          >
            {[...clients, ...clients].map((c, i) => (
              <div key={i} className="px-2">
                <div className="font-display font-semibold text-sm text-ink whitespace-nowrap px-9 py-4 bg-white rounded-full mx-2"
                  style={{
                    border: '1px solid rgba(0,180,60,0.1)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    letterSpacing: '-0.01em',
                  }}>{c}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(0,200,83,0.08) 0%, rgba(0,229,255,0.06) 100%)',
            border: '1px solid rgba(0,200,83,0.15)',
          }}
        >
          <div>
            <h3 className="font-display font-bold text-2xl md:text-[26px] mb-2"
              style={{ color: 'var(--ink)', letterSpacing: '-0.02em' }}>Ready to start your project?</h3>
            <p className="font-body text-[15px]" style={{ color: '#4A6054' }}>
              Join 500+ projects delivered across 15+ countries.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link href="/contact"
              className="font-body font-bold text-sm text-void no-underline px-7 py-3.5 rounded-full text-center transition-all duration-200 whitespace-nowrap"
              style={{ background: 'var(--lime)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--lime-dim)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--lime)'}
            >Get a Free Consultation</Link>
            <Link href="/projects"
              className="font-body font-semibold text-sm text-ink no-underline px-7 py-3.5 rounded-full text-center transition-all duration-200 whitespace-nowrap"
              style={{ border: '1.5px solid rgba(13,31,18,0.2)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--lime-dim)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(13,31,18,0.2)'}
            >View Case Studies</Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────
export function FooterC() {
  const links = {
    Services: ['Wastewater Treatment', 'Solid Waste & Biomass', 'Gaseous Waste', 'Renewable Energy', 'Process Engineering', 'Maintenance'],
    Company: ['About UEE', 'Our Team', 'Case Studies', 'Careers', 'News'],
    Contact: ['Kuala Lumpur, Malaysia', 'info@uee.com.my', '+60 3-XXXX XXXX', 'Mon – Fri, 9am – 6pm'],
  };

  const serviceHrefs = ['/services/wastewater', '/services/solid-waste', '/services/gaseous-waste', '/services/renewable-energy', '/services/process-engineering', '/services/maintenance'];

  return (
    <footer className="relative overflow-hidden pt-20 pb-10"
      style={{ background: 'var(--void)', borderTop: '1px solid rgba(0,230,118,0.08)' }}>

      {/* Giant watermark */}
      <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 font-display font-bold leading-none whitespace-nowrap select-none pointer-events-none"
        style={{
          fontSize: 'clamp(80px, 18vw, 220px)',
          letterSpacing: '-0.05em',
          color: 'rgba(0,230,118,0.025)',
        }}>UEE</div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12 relative z-[1]">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--lime), var(--cyan))' }}>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2C9 2 4 6.5 4 10.5C4 13.538 6.239 16 9 16C11.761 16 14 13.538 14 10.5C14 6.5 9 2 9 2Z" fill="#060D08" />
                </svg>
              </div>
              <span className="font-display font-bold text-xl text-text-dark" style={{ letterSpacing: '-0.02em', color: 'var(--text-dark)' }}>UEE</span>
            </div>
            <p className="font-body font-normal text-sm leading-relaxed mb-7 max-w-[280px]"
              style={{ color: 'var(--text-muted-dark)' }}>
              Universal Environmental Engineering — delivering integrated waste treatment and environmental solutions since 1980.
            </p>
            <div className="flex gap-2.5">
              {['LI', 'TW', 'FB'].map(s => (
                <a key={s} href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-[11px] no-underline transition-all duration-200"
                  style={{ border: '1px solid rgba(0,230,118,0.2)', color: 'var(--text-muted-dark)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lime)'; e.currentTarget.style.color = 'var(--lime)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,230,118,0.2)'; e.currentTarget.style.color = 'var(--text-muted-dark)'; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items], colIdx) => (
            <div key={heading}>
              <div className="font-display font-bold text-[13px] tracking-[0.08em] uppercase mb-5"
                style={{ color: 'var(--lime)' }}>{heading}</div>
              <div className="flex flex-col gap-2.5">
                {items.map((item, itemIdx) => (
                  <a key={item}
                    href={colIdx === 0 ? serviceHrefs[itemIdx] : '#'}
                    className="font-body font-normal text-sm no-underline transition-colors duration-200 leading-snug"
                    style={{ color: 'var(--text-muted-dark)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-dark)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted-dark)'}
                  >{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-7"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="font-body text-[13px]" style={{ color: 'rgba(122,184,138,0.5)' }}>
            © 2025 Universal Environmental Engineering. All rights reserved.
          </span>
          <div className="flex gap-6 flex-wrap">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(l => (
              <a key={l} href="#"
                className="font-body text-[13px] no-underline transition-colors duration-200"
                style={{ color: 'rgba(122,184,138,0.4)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--lime)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(122,184,138,0.4)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── CLIENTS ────────────────────────────────────────────────────
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
    <section style={{
      background: 'var(--offwhite)',
      padding: '100px 0 110px',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            marginBottom: 16,
          }}>
            <div style={{ width: 32, height: 2, background: 'var(--lime-dim)' }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--lime-dim)',
            }}>Trusted By</span>
            <div style={{ width: 32, height: 2, background: 'var(--lime-dim)' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            color: 'var(--ink)',
            letterSpacing: '-0.03em',
          }}>
            Industry Leaders, Governments,<br />
            <span style={{ color: 'var(--lime-dim)' }}>and Municipal Authorities</span>
          </h2>
        </motion.div>

        {/* Scrolling marquee */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Fade edges */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 120,
            background: 'linear-gradient(90deg, var(--offwhite), transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 120,
            background: 'linear-gradient(-90deg, var(--offwhite), transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: 0, width: 'max-content' }}
          >
            {[...clients, ...clients].map((c, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 0,
              }}>
                <div style={{
                  padding: '16px 36px',
                  background: 'white',
                  border: '1px solid rgba(0,180,60,0.1)',
                  borderRadius: 100,
                  margin: '0 8px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 14,
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}>
                  {c}
                </div>
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
          style={{
            marginTop: 64,
            background: 'linear-gradient(135deg, rgba(0,200,83,0.08) 0%, rgba(0,229,255,0.06) 100%)',
            border: '1px solid rgba(0,200,83,0.15)',
            borderRadius: 24,
            padding: '40px 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 26,
              color: 'var(--ink)',
              marginBottom: 8,
              letterSpacing: '-0.02em',
            }}>Ready to start your project?</h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: '#4A6054',
            }}>Join 500+ projects delivered across 15+ countries.</p>
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            <a href="#" style={{
              background: 'var(--lime)',
              color: 'var(--void)',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: 14,
              padding: '13px 28px',
              borderRadius: 100,
              textDecoration: 'none',
              transition: 'all 0.2s',
              letterSpacing: '0.01em',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--lime-dim)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--lime)'}
            >
              Get a Free Consultation
            </a>
            <a href="#" style={{
              background: 'transparent',
              color: 'var(--ink)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 14,
              padding: '13px 28px',
              borderRadius: 100,
              textDecoration: 'none',
              border: '1.5px solid rgba(13,31,18,0.2)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--lime-dim)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(13,31,18,0.2)'}
            >
              View Case Studies
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────
export function FooterC() {
  const links = {
    Services: ['Wastewater Treatment', 'Solid Waste & Biomass', 'Gaseous Waste', 'Renewable Energy', 'Process Engineering', 'Maintenance'],
    Company: ['About UEE', 'Our Team', 'Case Studies', 'Careers', 'News'],
    Contact: ['Kuala Lumpur, Malaysia', 'info@uee.com.my', '+60 3-XXXX XXXX', 'Mon – Fri, 9am – 6pm'],
  };

  return (
    <footer style={{
      background: 'var(--void)',
      padding: '80px 0 40px',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(0,230,118,0.08)',
    }}>

      {/* Giant watermark text */}
      <div style={{
        position: 'absolute',
        bottom: -40, left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(100px, 18vw, 220px)',
        letterSpacing: '-0.05em',
        color: 'rgba(0,230,118,0.025)',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>UEE</div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr 1fr 1fr',
          gap: 48,
          marginBottom: 64,
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 34, height: 34,
                background: 'linear-gradient(135deg, var(--lime), var(--cyan))',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2C9 2 4 6.5 4 10.5C4 13.538 6.239 16 9 16C11.761 16 14 13.538 14 10.5C14 6.5 9 2 9 2Z" fill="#060D08"/>
                </svg>
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 20,
                color: 'var(--text-dark)',
                letterSpacing: '-0.02em',
              }}>UEE</span>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.75,
              color: 'var(--text-muted-dark)',
              maxWidth: 280,
              marginBottom: 28,
            }}>
              Universal Environmental Engineering — delivering integrated waste treatment and environmental solutions since 1980.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {['LI', 'TW', 'FB'].map((s, i) => (
                <a key={s} href="#" style={{
                  width: 36, height: 36,
                  border: '1px solid rgba(0,230,118,0.2)',
                  borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 11,
                  color: 'var(--text-muted-dark)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lime)'; e.currentTarget.style.color = 'var(--lime)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,230,118,0.2)'; e.currentTarget.style.color = 'var(--text-muted-dark)'; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--lime)',
                marginBottom: 20,
              }}>{heading}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map(item => (
                  <a key={item} href="#" style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: 14,
                    color: 'var(--text-muted-dark)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    lineHeight: 1.4,
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-dark)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted-dark)'}
                  >{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'rgba(122,184,138,0.5)',
          }}>© 2025 Universal Environmental Engineering. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(l => (
              <a key={l} href="#" style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'rgba(122,184,138,0.4)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
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
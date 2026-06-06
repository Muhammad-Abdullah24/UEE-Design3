'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function AboutC() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 40]);

  const checks = [
    'Integrated waste treatment and energy recovery systems',
    'ISO-certified processes, 40 years of proven delivery',
    'End-to-end: design, installation, commissioning, maintenance',
    'Projects across Malaysia, Pakistan, and 15+ countries',
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-28 relative overflow-hidden" style={{ background: 'var(--void)' }}>
      {/* Ambient */}
      <div className="absolute top-1/4 -right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-0.5" style={{ background: 'var(--lime)' }} />
          <span className="font-body font-semibold text-[12px] tracking-[0.14em] uppercase"
            style={{ color: 'var(--lime)' }}>About UEE</span>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {/* MAIN card — spans 2 cols on md+ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-1 md:col-span-2 rounded-2xl p-8 relative overflow-hidden min-h-[340px] flex flex-col"
            style={{ background: '#0C1A0F', border: 'rgba(0,230,118,0.12) 1px solid' }}
          >
            <h2 className="font-display font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', letterSpacing: '-0.03em', color: 'var(--text-dark)' }}>
              One Stop Solution Center<br />
              <span style={{ color: 'var(--lime)' }}>for Treatment</span> &<br />
              Recycling of Waste
            </h2>
            <p className="font-body font-normal text-[15px] leading-relaxed mb-7 max-w-[460px]"
              style={{ color: 'var(--text-muted-dark)' }}>
              Universal Environmental Engineering has been at the forefront of waste treatment technology since 1980.
              From wastewater systems to biogas recovery, we design, build, and maintain integrated solutions for
              industrial and municipal clients across Asia and beyond.
            </p>
            <div className="flex flex-col gap-2.5 mt-auto">
              {checks.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-2.5"
                >
                  <div className="w-[18px] h-[18px] min-w-[18px] rounded flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(0,230,118,0.15)', border: '1px solid rgba(0,230,118,0.4)' }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-body font-normal text-sm leading-relaxed" style={{ color: '#8DB89D' }}>{c}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stat card 1 — lime */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{ background: 'var(--lime)' }}
          >
            <motion.div style={{ y: y1 }}>
              <div className="font-display font-bold leading-none tracking-tight text-6xl md:text-7xl mb-2"
                style={{ color: 'var(--void)', letterSpacing: '-0.04em' }}>40+</div>
              <div className="font-body font-semibold text-sm leading-snug"
                style={{ color: 'rgba(6,13,8,0.7)' }}>Years of<br />proven expertise</div>
            </motion.div>
            <div className="absolute bottom-5 right-6 w-12 h-12 rounded-full flex items-center justify-center"
              style={{ border: '2px solid rgba(6,13,8,0.2)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L10 18M2 10L18 10" stroke="rgba(6,13,8,0.6)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </motion.div>

          {/* Stat card 2 — dark */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{ background: '#0A1F12', border: '1px solid rgba(0,229,255,0.15)' }}
          >
            <motion.div style={{ y: y2 }}>
              <div className="font-display font-bold leading-none tracking-tight text-6xl md:text-7xl mb-2"
                style={{ color: 'var(--cyan)', letterSpacing: '-0.04em' }}>500+</div>
              <div className="font-body font-semibold text-sm leading-snug"
                style={{ color: 'var(--text-muted-dark)' }}>Projects<br />completed worldwide</div>
            </motion.div>
          </motion.div>

          {/* Mission strip — spans 2 cols on md+ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="col-span-1 md:col-span-2 xl:col-span-2 rounded-2xl p-7 flex items-center gap-6"
            style={{
              background: 'linear-gradient(135deg, #0A1F12 0%, #071814 100%)',
              border: '1px solid rgba(0,230,118,0.1)',
            }}
          >
            <div className="w-12 h-12 min-w-[48px] rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,230,118,0.12)', borderRadius: 12 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--lime)" strokeWidth="1.5" />
                <path d="M12 6V12L16 14" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="font-display font-bold text-lg mb-1" style={{ color: 'var(--text-dark)' }}>Our Mission</div>
              <div className="font-body font-normal text-sm leading-relaxed" style={{ color: 'var(--text-muted-dark)' }}>
                "Towards a Safer and Cleaner World" — delivering integrated environmental engineering solutions with global reach and local expertise.
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
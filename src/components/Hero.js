'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function GlobeMesh({ mouse }) {
  const tiltX = (mouse.y - 0.5) * 12;
  const tiltY = (mouse.x - 0.5) * -12;

  return (
    <motion.div
      style={{
        width: 340, height: 340,
        position: 'relative',
        transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transition: 'transform 0.4s ease',
      }}
    >
      {/* Outer glow */}
      <div style={{
        position: 'absolute', inset: -30,
        background: 'radial-gradient(circle, rgba(0,230,118,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(20px)',
      }} />

      <svg viewBox="0 0 200 200" width="340" height="340" style={{ position: 'relative', zIndex: 1 }}>
        <defs>
          <radialGradient id="globeGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="rgba(0,230,118,0.12)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.04)" />
          </radialGradient>
          <clipPath id="globeClip">
            <circle cx="100" cy="100" r="90" />
          </clipPath>
        </defs>

        <circle cx="100" cy="100" r="90" fill="url(#globeGrad)" />

        <g clipPath="url(#globeClip)" fill="none" strokeWidth="0.6">
          {[30, 55, 75, 90, 105, 125, 145, 165].map((cy, i) => {
            const dist = Math.abs(cy - 100);
            const ry = Math.sqrt(Math.max(0, 90 * 90 - dist * dist)) * 0.25;
            return (
              <ellipse key={`lat-${i}`} cx="100" cy={cy} rx="90" ry={ry} stroke="rgba(0,230,118,0.35)" />
            );
          })}
          {[0, 30, 60, 90, 120, 150].map((angle, i) => (
            <ellipse
              key={`lon-${i}`}
              cx="100" cy="100"
              rx={Math.abs(Math.cos((angle * Math.PI) / 180)) * 90 + 4}
              ry="90"
              stroke="rgba(0,229,255,0.25)"
              transform={`rotate(${angle}, 100, 100)`}
            />
          ))}
        </g>

        <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0,230,118,0.5)" strokeWidth="0.8" />

        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 100 * Math.cos(rad);
          const y = 100 + 26 * Math.sin(rad);
          return (
            <motion.circle
              key={`orbit-${i}`}
              cx={x} cy={y} r="3.5"
              fill={i % 2 === 0 ? 'var(--lime)' : 'var(--cyan)'}
              animate={{ cx: [x, 100 + 100 * Math.cos(rad + 0.05), x], cy: [y, 100 + 26 * Math.sin(rad + 0.05), y] }}
              transition={{ duration: 8 + i, repeat: Infinity, ease: 'linear' }}
            />
          );
        })}

        <motion.circle
          cx="100" cy="100" r="6"
          fill="var(--lime)"
          animate={{ r: [6, 10, 6], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="100" cy="100" r="3" fill="var(--void)" />
      </svg>

      {[
        { label: 'Wastewater', angle: -30, color: 'var(--lime)' },
        { label: 'Biomass', angle: 60, color: 'var(--cyan)' },
        { label: 'Clean Air', angle: 150, color: 'var(--lime)' },
        { label: 'Renewables', angle: 240, color: 'var(--cyan)' },
      ].map(({ label, angle, color }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 170 + 175 * Math.cos(rad);
        const y = 170 + 175 * Math.sin(rad);
        return (
          <motion.div
            key={label}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: x, top: y,
              transform: 'translate(-50%, -50%)',
              background: 'rgba(6,13,8,0.85)',
              border: `1px solid ${color}`,
              borderRadius: 100,
              padding: '5px 12px',
              fontSize: 11,
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              color,
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(8px)',
              zIndex: 10,
            }}
          >{label}</motion.div>
        );
      })}
    </motion.div>
  );
}

function AmbientParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    color: i % 3 === 0 ? 'var(--lime)' : i % 3 === 1 ? 'var(--cyan)' : 'rgba(0,230,118,0.3)',
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ y: [0, -40, 0], x: [0, Math.random() * 20 - 10, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
}

export default function HeroC() {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(40);

  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, -120]);
  const yGlobe = useTransform(scrollY, [0, 600], [0, -60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const handleMove = (e) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      setMouse({ x: nx, y: ny });
      setSpotX(nx * 100);
      setSpotY(ny * 100);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const headline = ['Engineering', 'a', 'Cleaner', 'World.'];
  const sub = 'Waste treatment, renewable energy, and environmental solutions — built for a sustainable tomorrow.';

  return (
    <motion.section
      ref={containerRef}
      className="min-h-screen relative overflow-hidden flex items-center pt-20 pb-16"
      style={{ background: 'var(--mint)' }}
    >
      {/* Mouse spotlight */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(600px circle at ${spotX}% ${spotY}%, rgba(0,230,118,0.08) 0%, transparent 70%)`,
        pointerEvents: 'none',
        transition: 'background 0.1s linear',
        zIndex: 1,
      }} />

      {/* Diagonal tint */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background: 'linear-gradient(160deg, rgba(0,230,118,0.04) 0%, rgba(0,229,255,0.06) 100%)',
          clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
      />

      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(0,230,118,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,230,118,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        zIndex: 0,
      }} />

      <AmbientParticles />

      {/* Main layout */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-12 w-full flex flex-col lg:flex-row items-center justify-between gap-10 relative z-[2]">

        {/* LEFT — Text */}
        <motion.div
          style={{ y: yText, opacity }}
          className="flex-1 w-full max-w-full lg:max-w-[580px] text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-8"
            style={{
              background: 'rgba(0,230,118,0.1)',
              border: '1px solid rgba(0,230,118,0.3)',
            }}
          >
            <span className="font-display font-bold text-[10px] tracking-widest text-void px-2 py-0.5 rounded-full"
              style={{ background: 'var(--lime)' }}>EST. 1980</span>
            <span className="font-body font-medium text-[13px]" style={{ color: 'var(--muted-dark)' }}>
              40+ Years of Excellence
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display font-bold leading-none tracking-tight mb-7"
            style={{ fontSize: 'clamp(44px, 8vw, 80px)', letterSpacing: '-0.03em', color: 'var(--ink)' }}>
            {headline.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.65, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'inline-block',
                  marginRight: '0.22em',
                  color: word === 'Cleaner' ? 'var(--lime-dim)' : 'var(--ink)',
                }}
              >{word}</motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="font-body font-normal text-base md:text-lg leading-relaxed mb-11 mx-auto lg:mx-0 max-w-[460px]"
            style={{ color: 'var(--muted-dark)' }}
          >{sub}</motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
          >
            <a href="#" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-body font-bold text-[15px] text-void no-underline px-7 py-3.5 rounded-full transition-all duration-200"
              style={{ background: 'var(--lime)', letterSpacing: '0.01em' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--cyan)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Explore Solutions
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-body font-semibold text-[15px] no-underline py-3.5 px-2 transition-all duration-200"
              style={{ color: 'var(--ink)', borderBottom: '1.5px solid var(--ink)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--lime-dim)'; e.currentTarget.style.borderColor = 'var(--lime-dim)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--ink)'; }}
            >View Projects →</a>
          </motion.div>

          {/* Scroll hint — hidden on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="hidden md:flex items-center gap-2.5 mt-14"
            style={{ color: 'var(--muted-light)', fontSize: 12, fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 20, height: 32, border: '1.5px solid var(--muted-light)', borderRadius: 10, display: 'flex', justifyContent: 'center', paddingTop: 6 }}
            >
              <div style={{ width: 3, height: 6, background: 'var(--lime)', borderRadius: 2 }} />
            </motion.div>
            Scroll to explore
          </motion.div>
        </motion.div>

        {/* RIGHT — Globe: hidden on mobile, visible from lg */}
        <motion.div
          className="hidden lg:flex relative"
          style={{ y: yGlobe }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlobeMesh mouse={mouse} />
        </motion.div>

      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-[3]">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 80 }}>
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#060D08" />
        </svg>
      </div>
    </motion.section>
  );
}
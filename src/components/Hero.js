'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Globe mesh SVG paths — equator + meridian lines as ellipses
function GlobeMesh({ mouse }) {
  const lines = [
    // Horizontal latitude lines (ellipses, varying compression)
    { rx: 90, ry: 8,  cy: 100 },
    { rx: 90, ry: 22, cy: 100 },
    { rx: 90, ry: 42, cy: 100 },
    { rx: 90, ry: 62, cy: 100 },
    { rx: 90, ry: 80, cy: 100 },
    { rx: 90, ry: 90, cy: 100 },
    { rx: 90, ry: 80, cy: 100, flip: true },
    { rx: 90, ry: 62, cy: 100, flip: true },
    { rx: 90, ry: 42, cy: 100, flip: true },
    { rx: 90, ry: 22, cy: 100, flip: true },
    { rx: 90, ry: 8,  cy: 100, flip: true },
  ];

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

        {/* Globe fill */}
        <circle cx="100" cy="100" r="90" fill="url(#globeGrad)" />

        {/* Grid lines — clipped to circle */}
        <g clipPath="url(#globeClip)" fill="none" strokeWidth="0.6">
          {/* Latitude lines */}
          {[30, 55, 75, 90, 105, 125, 145, 165].map((cy, i) => {
            const dist = Math.abs(cy - 100);
            const ry = Math.sqrt(Math.max(0, 90*90 - dist*dist)) * 0.25;
            return (
              <ellipse
                key={`lat-${i}`}
                cx="100" cy={cy}
                rx="90" ry={ry}
                stroke="rgba(0,230,118,0.35)"
              />
            );
          })}
          {/* Longitude lines */}
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

        {/* Outer ring */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0,230,118,0.5)" strokeWidth="0.8" />

        {/* Orbiting dots */}
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

        {/* Center pulse */}
        <motion.circle
          cx="100" cy="100" r="6"
          fill="var(--lime)"
          animate={{ r: [6, 10, 6], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="100" cy="100" r="3" fill="var(--void)" />
      </svg>

      {/* Service icon tags orbiting */}
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

// Floating ambient particles
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
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
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
      style={{
        minHeight: '100vh',
        background: 'var(--mint)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 90,
      }}
    >
      {/* Mouse spotlight */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(600px circle at ${spotX}% ${spotY}%, rgba(0,230,118,0.08) 0%, transparent 70%)`,
        pointerEvents: 'none',
        transition: 'background 0.1s linear',
        zIndex: 1,
      }} />

      {/* Diagonal divider — right half tinted */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0,
        width: '52%',
        height: '100%',
        background: 'linear-gradient(160deg, rgba(0,230,118,0.04) 0%, rgba(0,229,255,0.06) 100%)',
        clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Background grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,230,118,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,230,118,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        zIndex: 0,
      }} />

      <AmbientParticles />

      {/* Main layout */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 48px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 40,
        position: 'relative',
        zIndex: 2,
      }}>

        {/* LEFT — Text */}
        <motion.div style={{ flex: 1, maxWidth: 580, y: yText, opacity }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(0,230,118,0.1)',
              border: '1px solid rgba(0,230,118,0.3)',
              borderRadius: 100,
              padding: '6px 16px 6px 8px',
              marginBottom: 32,
            }}
          >
            <span style={{
              background: 'var(--lime)',
              color: 'var(--void)',
              fontSize: 10,
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              padding: '2px 8px',
              borderRadius: 100,
              letterSpacing: '0.08em',
            }}>EST. 1980</span>
            <span style={{
              fontSize: 13,
              fontFamily: 'var(--font-body)',
              color: 'var(--muted-dark)',
              fontWeight: 500,
            }}>40+ Years of Excellence</span>
          </motion.div>

          {/* Headline — word by word */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(48px, 6vw, 80px)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: 'var(--ink)',
            marginBottom: 28,
          }}>
            {headline.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.65, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'inline-block',
                  marginRight: word === 'a' || word === 'Cleaner' ? '0.28em' : '0.22em',
                  color: word === 'Cleaner' ? 'var(--lime-dim)' : word === 'World.' ? 'var(--ink)' : 'var(--ink)',
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 17,
              lineHeight: 1.7,
              color: 'var(--muted-dark)',
              maxWidth: 460,
              marginBottom: 44,
            }}
          >{sub}</motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
          >
            <a href="#" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'var(--lime)',
              color: 'var(--void)',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: 15,
              padding: '14px 30px',
              borderRadius: 100,
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'all 0.25s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--cyan)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Explore Solutions
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--ink)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              padding: '14px 8px',
              borderBottom: '1.5px solid var(--ink)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--lime-dim)'; e.currentTarget.style.borderColor = 'var(--lime-dim)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--ink)'; }}
            >
              View Projects →
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 56,
              color: 'var(--muted-light)',
              fontSize: 12,
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
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

        {/* RIGHT — Globe */}
        <motion.div
          style={{ position: 'relative', y: yGlobe }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlobeMesh mouse={mouse} />
        </motion.div>

      </div>

      {/* Bottom wave divider */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}>
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 80 }}>
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#060D08" />
        </svg>
      </div>
    </motion.section>
  );
}
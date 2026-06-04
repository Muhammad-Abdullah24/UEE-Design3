'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function CountUp({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 40, suffix: '+', label: 'Years of Experience' },
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 15, suffix: '+', label: 'Countries Served' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 40, suffix: '+', label: 'Years of Experience' },
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 15, suffix: '+', label: 'Countries Served' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

const dividers = ['◆', '◇', '◆', '◇', '◆', '◇', '◆', '◇'];

export default function StatsC() {
  return (
    <section style={{
      background: 'var(--void)',
      padding: '0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Top gradient fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent, var(--lime), var(--cyan), transparent)',
      }} />

      {/* Ticker */}
      <div style={{ position: 'relative', padding: '48px 0' }}>
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            whiteSpace: 'nowrap',
            width: 'max-content',
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <div style={{
                padding: '0 56px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 52,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  background: i % 2 === 0
                    ? 'linear-gradient(135deg, var(--lime), var(--lime-dim))'
                    : 'linear-gradient(135deg, var(--cyan), var(--cyan-dim))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted-dark)',
                }}>{stat.label}</span>
              </div>
              <span style={{
                color: i % 2 === 0 ? 'rgba(0,230,118,0.3)' : 'rgba(0,229,255,0.3)',
                fontSize: 14,
                userSelect: 'none',
              }}>{dividers[i]}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent, var(--cyan), var(--lime), transparent)',
      }} />
    </section>
  );
}
'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function CountUp({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

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
    <section className="relative overflow-hidden py-10 md:py-12" style={{ background: 'var(--void)' }}>
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--lime), var(--cyan), transparent)' }} />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex items-center whitespace-nowrap w-max"
      >
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1 px-8 md:px-14">
              <span className="font-display font-bold leading-none tracking-tight text-4xl md:text-5xl lg:text-6xl"
                style={{
                  background: i % 2 === 0
                    ? 'linear-gradient(135deg, var(--lime), var(--lime-dim))'
                    : 'linear-gradient(135deg, var(--cyan), var(--cyan-dim))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.04em',
                }}>
                <CountUp target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="font-body font-medium text-[11px] md:text-[13px] tracking-widest uppercase"
                style={{ color: 'var(--text-muted-dark)' }}>{stat.label}</span>
            </div>
            <span className="text-sm" style={{
              color: i % 2 === 0 ? 'rgba(0,230,118,0.3)' : 'rgba(0,229,255,0.3)',
              userSelect: 'none',
            }}>{dividers[i]}</span>
          </div>
        ))}
      </motion.div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--cyan), var(--lime), transparent)' }} />
    </section>
  );
}
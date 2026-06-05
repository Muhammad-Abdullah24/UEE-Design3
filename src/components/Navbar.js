'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function NavbarC() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setScrolled(v > 0.02));
    return unsub;
  }, [scrollYProgress]);

  const links = [
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Clients', href: '/#clients' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: scrolled ? '14px 48px' : '22px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(240, 247, 244, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(13,31,18,0.08)' : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34,
          background: 'linear-gradient(135deg, #00E676, #00E5FF)',
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
          fontSize: 18,
          color: 'var(--ink)',
          letterSpacing: '-0.02em',
        }}>UEE</span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
          >
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
              className="nav-hover"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: 14,
                color: 'var(--ink)',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                opacity: 0.7,
                transition: 'opacity 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
            >{link.label}</motion.a>
          </Link>
        ))}

        <Link href="/contact">
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 13,
              color: 'var(--void)',
              textDecoration: 'none',
              background: 'var(--lime)',
              padding: '9px 22px',
              borderRadius: 100,
              letterSpacing: '0.02em',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--cyan)';
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--lime)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >Get in Touch</motion.a>
        </Link>
    </motion.nav>
  );
}
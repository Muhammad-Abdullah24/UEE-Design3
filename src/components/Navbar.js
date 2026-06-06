'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function NavbarC() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setScrolled(v > 0.02));
    return unsub;
  }, [scrollYProgress]);

  const links = ['Services', 'About', 'Projects', 'Clients', 'Contact'];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          background: scrolled ? 'rgba(240, 247, 244, 0.92)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(13,31,18,0.08)' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="fixed top-0 left-0 right-0 z-[1000] px-6 md:px-10 xl:px-12 py-4 md:py-5 flex items-center justify-between"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00E676, #00E5FF)' }}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M9 2C9 2 4 6.5 4 10.5C4 13.538 6.239 16 9 16C11.761 16 14 13.538 14 10.5C14 6.5 9 2 9 2Z" fill="#060D08" />
            </svg>
          </div>
          <span className="font-display font-bold text-lg text-ink tracking-tight">UEE</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-9">
          {links.map((link, i) => (
            <motion.a
              key={link}
              href={`/${link.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
              className="font-body font-medium text-sm text-ink no-underline transition-opacity duration-200 hover:opacity-100"
              style={{ opacity: 0.7 }}
            >{link}</motion.a>
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.a
          href="/contact"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="hidden lg:inline-flex font-body font-semibold text-[13px] text-void no-underline px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-[1.04]"
          style={{ background: 'var(--lime)', letterSpacing: '0.02em' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--cyan)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--lime)'}
        >Get in Touch</motion.a>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="flex lg:hidden flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg border border-white/10 bg-white/5 cursor-pointer"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-px bg-ink rounded-full"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-px bg-ink rounded-full"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-px bg-ink rounded-full"
          />
        </button>
      </motion.nav>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[64px] left-0 right-0 z-[999] flex flex-col gap-1 p-5 lg:hidden"
            style={{
              background: 'rgba(240, 247, 244, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(13,31,18,0.08)',
            }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link}
                href={`/${link.toLowerCase()}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                className="font-body font-medium text-base text-ink no-underline py-3 px-4 rounded-xl hover:bg-black/5 transition-colors duration-150"
              >{link}</motion.a>
            ))}

            <div className="h-px bg-black/8 my-2" />

            <a
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="font-body font-bold text-sm text-void no-underline px-5 py-3.5 rounded-full text-center transition-all duration-200 mt-1"
              style={{ background: 'var(--lime)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--cyan)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--lime)'}
            >Get in Touch</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
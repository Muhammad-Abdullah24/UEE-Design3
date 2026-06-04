'use client';
import { useEffect } from 'react';
import NavbarC from '@/components/Navbar';
import HeroC from '@/components/Hero';
import StatsC from '@/components/Stats';
import AboutC from '@/components/About';
import ServicesC from '@/components/Services';
import WhyUsC from '@/components/WhyUs';
import TestimonialsC from '@/components/Testimonial';
import { ClientsC, FooterC } from '@/components/Clients';

export default function WebsiteC() {
  useEffect(() => {
    // Custom cursor
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let mouseX = 0, mouseY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const animate = () => {
      // Ring lags behind
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      if (dot) {
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
      }
      if (ring) {
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    // Hover state
    const addHover = () => document.body.classList.add('cursor-hover');
    const removeHover = () => document.body.classList.remove('cursor-hover');
    const interactives = document.querySelectorAll('a, button, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    // Scroll progress
    const bar = document.getElementById('scroll-progress');
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrolled / total : 0;
      if (bar) bar.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      {/* Cursor elements */}
      <div id="cursor-dot" />
      <div id="cursor-ring" />
      {/* Scroll progress */}
      <div id="scroll-progress" />

      <main>
        <NavbarC />
        <HeroC />
        <StatsC />
        <AboutC />
        <ServicesC />
        <WhyUsC />
        <TestimonialsC />
        <ClientsC />
        <FooterC />
      </main>
    </>
  );
}

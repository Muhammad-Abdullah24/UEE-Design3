'use client';
import { } from 'react';
import NavbarC from '@/components/Navbar';
import HeroC from '@/components/Hero';
import StatsC from '@/components/Stats';
import AboutC from '@/components/About';
import ServicesC from '@/components/Services';
import WhyUsC from '@/components/WhyUs';
import TestimonialsC from '@/components/Testimonial';
import { ClientsC, FooterC } from '@/components/Clients';

export default function WebsiteC() {
  return (
    <>
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

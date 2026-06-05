// ─────────────────────────────────────────────────────────────────
// GASEOUS WASTE — src/app/services/gaseous-waste/page.js
// ─────────────────────────────────────────────────────────────────
// PASTE THIS CONTENT INTO: src/app/services/gaseous-waste/page.js

'use client';
import ServicePageLayout from '@/components/ServicePageLayout';

const data = {
  hero: {
    title: 'Gaseous Waste Control',
    subtitle: 'Air Pollution Control Systems',
    description: 'Industrial scrubbers, thermal oxidizers, and biofilters engineered to meet the most stringent local and international air emission standards.',
    accent: 'var(--cyan)',
    breadcrumb: 'Gaseous Waste Control',
    badge: 'Service 03',
    watermark: 'GASEOUS',
  },
  overview: [
    'Gaseous emissions are subject to increasingly stringent regulatory standards across Asia. UEE\'s air pollution control systems are designed to meet — and exceed — these requirements.',
    'Starting with our development of the PE-Scrub wet scrubber system, we have expanded into a full suite of air treatment technologies in collaboration with leading global technology partners.',
    'From factory exhaust cleaning to odour control at composting facilities, our systems are deployed across healthcare, industrial, and municipal applications throughout Malaysia and internationally.',
  ],
  capabilities: [
    'Wet scrubber systems (Blower Scrubber and PE-Scrub series)',
    'Thermal oxidizers for VOC and hazardous air pollutant destruction',
    'Biofilters for organic odour control at composting and waste facilities',
    'Activated carbon adsorption systems for trace contaminants',
    'Electrostatic precipitators for particulate matter removal',
    'Acid gas scrubbing for industrial processes',
    'Emission monitoring and compliance reporting systems',
    'Stack testing and regulatory submission support',
  ],
  systems: [
    {
      name: 'PE-Scrub Wet Scrubber',
      desc: 'UEE\'s proprietary wet scrubber system. Removes particulate matter and acidic gases from industrial exhaust streams using water or chemical scrubbing solutions.',
    },
    {
      name: 'Blower Scrubber System',
      desc: 'Compact, high-efficiency scrubbing system for smaller exhaust volumes. Designed for ease of maintenance and consistent performance across variable flow rates.',
    },
    {
      name: 'Thermal Oxidizer (TO)',
      desc: 'High-temperature combustion of VOCs and hazardous air pollutants. Achieves 99%+ destruction efficiency with recuperative heat recovery option.',
    },
    {
      name: 'Regenerative Thermal Oxidizer (RTO)',
      desc: 'Energy-efficient VOC destruction with ceramic media heat recovery. Suitable for large-volume, low-concentration exhaust streams in continuous operation.',
    },
    {
      name: 'Biofilter System',
      desc: 'Biological odour control through microbial degradation of odorous compounds. Ideal for composting facilities, wastewater plants, and food processing exhaust.',
    },
    {
      name: 'Activated Carbon Adsorber',
      desc: 'Physical adsorption of trace contaminants from process exhaust. Used as polishing stage after primary treatment or standalone for low-concentration streams.',
    },
  ],
  cases: [],
};

export default function GaseousWastePage() {
  return <ServicePageLayout data={data} />;
}
'use client';
import ServicePageLayout from '@/components/ServicePageLayout';

const data = {
  hero: {
    title: 'Renewable Energy Systems',
    subtitle: 'Waste-to-Energy Technologies',
    description: 'Turning waste into power — UEE\'s waste-to-energy systems recover energy from waste streams through pyrolysis, gasification, and anaerobic digestion.',
    accent: 'var(--lime)',
    breadcrumb: 'Renewable Energy',
    badge: 'Service 04',
    watermark: 'ENERGY',
  },
  overview: [
    'As fossil fuel dependency becomes increasingly untenable, waste-to-energy technologies offer a compelling dual benefit: responsible waste disposal and clean energy generation.',
    'Building on our decades of incinerator design and manufacturing experience, UEE has developed a suite of W-t-E technologies that cater for different waste types, scales, and energy output requirements.',
    'Our systems have been deployed across industrial, municipal, and agricultural applications — recovering energy from municipal solid waste, agricultural residue, industrial sludge, and purpose-grown biomass.',
  ],
  capabilities: [
    'Pyrolysis and carbonization systems for plastics, biomass, and sludge',
    'Gasification systems for biomass and refuse-derived fuel (RDF)',
    'Anaerobic digestion for wet organic waste with biogas recovery',
    'Biogas upgrading to biomethane or direct power generation',
    'Combined heat and power (CHP) integration',
    'Agricultural biomass energy systems',
    'Waste characterisation and energy yield assessment',
    'Grid connection feasibility and power purchase agreement support',
  ],
  systems: [
    {
      name: 'Pyrolysis / Carbonization System',
      desc: 'Thermochemical conversion of organic materials in an oxygen-free environment. Produces biochar, syngas, and bio-oil from plastics, biomass, sludge, and mixed waste.',
    },
    {
      name: 'Gasification System',
      desc: 'Partial oxidation of carbonaceous feedstock to produce syngas (CO + H₂). Syngas can be used for electricity generation, heat, or as a chemical feedstock.',
    },
    {
      name: 'Anaerobic Digestion (AD)',
      desc: 'Biological decomposition of organic waste in the absence of oxygen. Produces biogas (60–70% methane) for power and heat, with digestate as a soil conditioner.',
    },
    {
      name: 'Dry Anaerobic Digestion',
      desc: 'High-solid-content AD system for food waste and agricultural residue. Lower water consumption and higher volumetric biogas productivity.',
    },
    {
      name: 'Biogas Power Generation',
      desc: 'Gas engines and micro-turbines converting biogas to electricity and heat. Modular systems from 50 kWe to multi-MW scale with CHP options.',
    },
    {
      name: 'Refuse-Derived Fuel (RDF) Systems',
      desc: 'Processing of municipal solid waste into high-calorific fuel pellets for co-firing in cement kilns, power plants, and dedicated RDF boilers.',
    },
  ],
  cases: [],
};

export default function RenewableEnergyPage() {
  return <ServicePageLayout data={data} />;
}
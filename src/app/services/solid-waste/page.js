'use client';
import ServicePageLayout from '@/components/ServicePageLayout';

const data = {
  hero: {
    title: 'Solid Waste & Biomass',
    subtitle: 'Composting, Incineration & Biomass Conversion',
    description: 'From hospital food waste composting to large-scale industrial incineration — UEE\'s solid waste systems convert your waste stream into value.',
    accent: 'var(--lime)',
    breadcrumb: 'Solid Waste & Biomass',
    badge: 'Service 02',
    watermark: 'SOLID WASTE',
  },
  overview: [
    'Solid waste is one of the most complex environmental challenges — it\'s bulky, heterogeneous, and often malodorous. UEE has spent decades developing systems that turn this challenge into opportunity.',
    'Our flagship HiWave Compo machine converts organic food waste into high-quality dry granular fertilizer within 7 days — no auxiliary enzymes or chemicals required. Deployed at Putrajaya Hospital since 2007.',
    'For non-recyclable waste streams, our incineration systems have been proven across healthcare, crematorium, veterinary, and industrial applications with over 100 units delivered in Malaysia and internationally.',
  ],
  capabilities: [
    'HiWave Compo composting machines for food waste to fertilizer',
    'High-rate composting systems for large-scale organic waste',
    'Medical and clinical waste incinerators (healthcare compliance)',
    'Crematorium incinerators with full emission controls',
    'Industrial and veterinary incineration systems',
    'Food waste to animal feed conversion systems',
    'Dry anaerobic digestion for organic solid waste',
    'Biomass collection, preparation, and handling systems',
    'Landfill diversion and waste minimization consulting',
  ],
  systems: [
    {
      name: 'HiWave™ Compo Machine',
      desc: 'Proprietary UEE technology. Converts hospital, restaurant, and industrial food waste into dry granular organic fertilizer in 7 days. No enzymes or chemicals required. MARDI certified.',
    },
    {
      name: 'High-Rate Composting System',
      desc: 'Forced-aeration in-vessel composting for large-scale organic waste processing. Controlled temperature, moisture, and aeration for consistent compost quality.',
    },
    {
      name: 'BHC Series Incinerators',
      desc: 'Multi-chamber controlled-air incinerators for medical, veterinary, and general waste. Fully compliant with local and international emission standards. Over 100 units deployed.',
    },
    {
      name: 'Food Waste to Feed Meal',
      desc: 'Thermal processing system that converts canteen and restaurant food waste into high-protein animal feed meal — closing the loop from waste to nutrition.',
    },
    {
      name: 'Biomass Dryer & Shredder Systems',
      desc: 'Pre-treatment equipment for biomass feedstock preparation — shredding, drying, and sizing biomass for downstream energy conversion processes.',
    },
    {
      name: 'Waste Sorting & Segregation Systems',
      desc: 'Upstream waste segregation and sorting infrastructure to maximise recovery rates and ensure only non-recoverable fractions enter thermal treatment.',
    },
  ],
  cases: [
    {
      client: 'Putrajaya Hospital',
      location: 'Kuala Lumpur, Malaysia',
      detail: 'HiWave™ Compo machine converting hospital food waste into certified organic fertilizer since 2007. Completely automated, odour-free operation with MARDI-certified output.',
      metric: '100%',
      metricLabel: 'Waste Diverted',
    },
    {
      client: 'Pertubuhan Pengurusan Rumah Pembakaran Mayat',
      location: 'Jelutong, Melaka',
      detail: 'Supply, installation and commissioning of BHC 100 crematorium incinerator. Second unit delivered under long-term partnership. Fully tested and operational.',
      metric: '2nd',
      metricLabel: 'Unit Delivered',
    },
  ],
};

export default function SolidWastePage() {
  return <ServicePageLayout data={data} />;
}
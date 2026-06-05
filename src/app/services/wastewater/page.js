// ─────────────────────────────────────────────────────────────────
// WASTEWATER — src/app/services/wastewater/page.js
// ─────────────────────────────────────────────────────────────────
'use client';
import ServicePageLayout from '@/components/ServicePageLayout';

const data = {
  hero: {
    title: 'Wastewater Treatment',
    subtitle: 'Industrial & Municipal Systems',
    description: 'From small sewage plants to 24,000 m³/day industrial treatment systems — we design, build, and maintain wastewater solutions that meet every discharge standard.',
    accent: 'var(--cyan)',
    breadcrumb: 'Wastewater Treatment',
    badge: 'Service 01',
    watermark: 'WASTEWATER',
  },
  overview: [
    'UEE has completed over 500 wastewater projects across Malaysia, Pakistan, Vietnam, Myanmar and beyond. Our systems handle everything from small housing scheme sewage to large-scale industrial effluent treatment.',
    'We design for the full treatment cycle — screening, primary settlement, biological treatment, secondary clarification, and sludge handling — tailored to each client\'s discharge requirements and site conditions.',
    'Our DAF (Dissolved Air Flotation) systems are among our most deployed technologies, proven to achieve 90%+ suspended solids removal in continuous operation since 2003.',
  ],
  capabilities: [
    'Activated sludge systems for industrial and municipal scale',
    'Dissolved Air Flotation (DAF) for high-SS effluents',
    'Biological treatment: aerobic and anaerobic processes',
    'Sewage treatment plants for housing schemes to centralised systems',
    'Water recycling and reuse management systems',
    'International industrial park planning and effluent compliance',
    'Membrane Bioreactor (MBR) systems for high-quality effluent',
    'Sludge dewatering, thickening, and disposal systems',
    'Full commissioning, training, and long-term O&M contracts',
  ],
  systems: [
    {
      name: 'Dissolved Air Flotation (DAF)',
      desc: 'High-efficiency solids separation using micro-bubbles. Proven to remove 90%+ suspended solids. Deployed at Century Paper & Board Mills at 24,000 m³/day since 2003.',
    },
    {
      name: 'Activated Sludge Systems',
      desc: 'Biological oxidation of organic matter using suspended microbial cultures. Suitable for both domestic sewage and industrial effluents of varying strength.',
    },
    {
      name: 'Sequencing Batch Reactor (SBR)',
      desc: 'Time-based fill-and-draw biological treatment ideal for variable flow rates. Lower footprint than conventional systems, excellent for space-constrained sites.',
    },
    {
      name: 'Moving Bed Biofilm Reactor (MBBR)',
      desc: 'High-rate biological treatment using plastic carrier media. Efficient upgrading solution for existing plants with capacity constraints.',
    },
    {
      name: 'Membrane Bioreactor (MBR)',
      desc: 'Combines biological treatment with ultrafiltration for high-quality effluent reuse. Compact footprint, suitable for water reclamation applications.',
    },
    {
      name: 'Anaerobic Treatment Systems',
      desc: 'Upflow Anaerobic Sludge Blanket (UASB) and anaerobic lagoon systems for high-strength organic industrial wastewater, with biogas recovery as a bonus.',
    },
  ],
  cases: [
    {
      client: 'Century Paper & Board Mills Ltd',
      location: 'Pakistan',
      detail: 'Complete DAF-based effluent treatment plant with 24,000 m³/day capacity. Successfully commissioned in 2003 and operating continuously with 90%+ SS removal.',
      metric: '90%+',
      metricLabel: 'SS Removal',
    },
    {
      client: 'Leather Field (Pvt) Ltd',
      location: 'Pakistan',
      detail: 'Industrial wastewater treatment plant for leather processing effluent. Successfully commissioned meeting all local regulatory discharge standards.',
      metric: '100%',
      metricLabel: 'Compliance',
    },
    {
      client: 'Vietnam-Singapore Industrial Park',
      location: 'Vietnam',
      detail: 'Full effluent treatment planning and implementation for a multi-tenant industrial park, handling mixed industrial wastewater streams.',
      metric: null,
      metricLabel: null,
    },
  ],
};

export default function WastewaterPage() {
  return <ServicePageLayout data={data} />;
}
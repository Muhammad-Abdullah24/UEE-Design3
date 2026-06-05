'use client';
import ServicePageLayout from '@/components/ServicePageLayout';

const data = {
  hero: {
    title: 'After-Sales & Maintenance',
    subtitle: 'Long-Term Service Partnerships',
    description: 'We don\'t disappear after handover. Comprehensive commissioning support, operator training, and long-term service contracts that keep your systems running for decades.',
    accent: 'var(--lime)',
    breadcrumb: 'After-Sales & Maintenance',
    badge: 'Service 06',
    watermark: 'SERVICE',
  },
  overview: [
    'The value of an environmental system is measured over its operating life, not just at commissioning. UEE\'s after-sales team ensures the performance promised at design is maintained year after year.',
    'From commissioning through to long-term operation, we offer structured maintenance contracts, operator training, spare parts supply, and rapid-response technical support.',
    'Our long-term relationships — including Century Paper & Board Mills whose DAF system has operated continuously since 2003 — are the proof.',
  ],
  capabilities: [
    'Commissioning management and performance verification',
    'Operator training programmes (classroom and on-site)',
    'Annual and bi-annual preventive maintenance contracts',
    'Emergency breakdown response and rapid repair',
    'Genuine spare parts supply and inventory management',
    'System performance audits and optimisation recommendations',
    'Control system upgrades and SCADA integration',
    'Regulatory compliance monitoring and reporting support',
    'Plant expansion and capacity upgrade engineering',
  ],
  systems: [
    { name: 'Preventive Maintenance Contracts', desc: 'Structured programmes covering inspection, cleaning, calibration, and wear-item replacement — preventing failures before they occur.' },
    { name: 'Operator Training Programmes', desc: 'Training on system fundamentals, daily operating procedures, troubleshooting, and emergency response. In-person and documentation packages.' },
    { name: 'Performance Audits', desc: 'Periodic independent review against design targets including effluent quality testing, energy benchmarking, and improvement recommendations.' },
    { name: 'Emergency Response Service', desc: 'Rapid-response technical support for system failures. Remote diagnosis and on-site response with dedicated service engineers.' },
    { name: 'Spare Parts Supply', desc: 'Genuine OEM spare parts with fast turnaround. Managed inventory service for critical components to minimise downtime risk.' },
    { name: 'System Upgrades & Expansion', desc: 'Capacity expansion, technology upgrades, and control system modernisation — handled by the same engineers who built your original system.' },
  ],
  cases: [
    {
      client: 'Century Paper & Board Mills Ltd',
      location: 'Pakistan',
      detail: 'Continuous operation and after-sales support since commissioning in 2003. Over two decades of maintained performance at 90%+ SS removal.',
      metric: '20+',
      metricLabel: 'Years Service',
    },
    {
      client: 'Putrajaya Hospital',
      location: 'Malaysia',
      detail: 'Long-term O&M contract for the HiWave™ Compo machine since 2007. Fully automated, continuously monitored, zero downtime incidents.',
      metric: '15+',
      metricLabel: 'Years Running',
    },
  ],
};

export default function MaintenancePage() {
  return <ServicePageLayout data={data} />;
}
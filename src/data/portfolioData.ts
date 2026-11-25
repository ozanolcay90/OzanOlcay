export type CertificateCategory =
  | 'all'
  | 'project-management'
  | 'business-analysis'
  | 'operational-excellence'
  | 'supply-chain-ai';

export interface CertificateItem {
  id: string;
  title: string;
  subtitle?: string;
  issuer: string;
  issuerShort: 'PMI' | 'IIBA' | 'NASBA' | 'TAÜ-DDUAM';
  platform: string;
  category: Exclude<CertificateCategory, 'all'>;
  categoryLabel: string;
  completedDate: string;
  completedYear: number;
  creditSummary: string;
  credentialId: string;
  providerMeta: string;
  skills: string[];
  previewImage: string;
  pdfPath: string;
}

export interface ProjectCaseStudy {
  id: 'sirius' | 'lot';
  name: string;
  shortTitle: string;
  kicker: string;
  headlineMetric: string;
  headlineMetricLabel: string;
  summary: string;
  context: string;
  pagesCount: number;
  dataSize: {
    rows: string;
    sourcePages: string;
    graphics: number;
  };
  restrictions: string;
  dataSecurity: string;
  users: string[];
  includedData: string[];
  sources: string[];
  automatedProcesses: string[];
  outputs: string[];
  highlights: string[];
}

export interface CareerMilestone {
  id: string;
  period: string;
  company: string;
  location: string;
  role: string;
  summary: string;
  capabilities: string[];
  focusAreas: string[];
}

export interface RecognitionItem {
  id: string;
  title: string;
  context: string;
  detail: string;
}

export interface StrategicPillar {
  id: string;
  index: string;
  title: string;
  points: string[];
}

export const PROFILE = {
  fullName: 'Ozan Olcay',
  roleTitle: 'TR Local Distribution Platform Inspector',
  organization: 'B/S/H/ Home Appliances',
  targetFocus: 'Logistics Expert & Supply Chain Digitalization',
  location: 'Ankara & Çerkezköy, Türkiye',
  email: 'ozanolcay90@gmail.com',
  portraitPath: '/assets/ozan-portrait.jpg',
  interviewDeckPdf: '/assets/aistudio/Interview_for_REM_Region_Logistics_Expert_63a3e085.pdf',
  certificatesArchiveUrl:
    'https://drive.google.com/drive/folders/1_IiDiDvj4-KIJrXgSC1JMSAU0HIVCzFc?usp=sharing',
  linkedinSearchUrl: 'https://www.linkedin.com/search/results/all/?keywords=Ozan%20Olcay%20BSH',
  education: {
    institution: 'Ufuk University',
    degree: 'B.A. in Political Science and International Relations',
    honors: 'Full Scholarship',
    gpa: '3.33 GPA',
    distinction: '3rd Highest GPA in the Faculty',
    highSchool: 'Yıldırım Beyazıt High School',
  },
  militaryService: {
    role: 'Reserve Officer (Second Lieutenant)',
    distinction: '1st Place On Training Camp',
  },
  languages: [
    { language: 'Turkish', level: 'Native' },
    { language: 'English', level: 'Professional Working' },
    { language: 'German', level: 'A2' },
    { language: 'Spanish', level: 'A2' },
  ],
  coreValues: ['Honest', 'Responsible', 'Fast Learner', 'Proactive'],
  fieldFormula: ['Analyze', 'Coding', 'Field'],
  digitalizationNodes: ['LSP Management', 'KPI Tracking', 'Logistic Management'],
  personalNote:
    'Beyond distribution platforms and in-house code, I am a father, a musician who plays guitar and saz, an avid podcast listener, and an active learner of new languages.',
} as const;

export const HERO_METRICS = [
  {
    value: '12 MTL',
    label: 'Yearly cost avoidance',
    detail: 'Delivered through Sirius process automation',
  },
  {
    value: '600K+',
    label: 'Operational rows analyzed',
    detail: '11K pages unified into 253 graphics across 11 views in L.O.T.',
  },
  {
    value: '3rd Place',
    label: 'BSH LO WC Idea Competition',
    detail: 'Recognized for field digitalization & Sirius impact',
  },
  {
    value: '11',
    label: 'Verified credentials',
    detail: 'PMI, IIBA, NASBA & Turkish-German University',
  },
] as const;

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'lot',
    name: 'L.O.T. (Local Operations Tracking)',
    shortTitle: 'L.O.T. Control Tower',
    kicker: 'Control Tower Architecture · B/S/H/ Local Distribution',
    headlineMetric: '600K rows · 253 graphics',
    headlineMetricLabel: '11K pages synthesized into 11 live views',
    summary:
      'An end-to-end operational intelligence platform expanding Sirius from 4 to 11 report pages across 8 functional teams—combining RPA stock feeds, purchasing and travel costing, primary/secondary quality, POS savings, and mobile real-time tracking secured on BSH Server with role-based page restrictions.',
    context:
      'Built in-house on BSH Server to eliminate fragmented spreadsheets across local distribution platforms, uniting 8 data sources and 16 operational datasets into a single secure source of truth for 8 stakeholder teams.',
    pagesCount: 11,
    dataSize: {
      rows: '600,000 rows',
      sourcePages: '11,000 pages',
      graphics: 253,
    },
    restrictions: 'Role-Based Page Restrictions',
    dataSecurity: 'BSH Server',
    users: [
      'Operational Control',
      'Cluster Control',
      'Claim Management',
      'Logistics Management',
      'Local Distribution Management',
      'Logistics Purchasing',
      'Logistics Quality',
      'Local Distribution Quality',
    ],
    includedData: [
      'Operation Control Data',
      'Cluster Control Data',
      'Hidden Damage Data',
      'Customer Service Install Data',
      'Local Distribution Home Delivery KPIs Data',
      'Detailed Platform Data',
      'Platform Purchasing Data',
      'Platform Purchasing Cost Data',
      'Local Distribution Primary Quality Data',
      'Local Distribution Secondary Quality Data',
      'POS Data',
      'POS Saving Data',
      'DOM Data',
      'Detailed Travel Cost Data',
      'Platform Stock Data',
      'Product Master Data',
    ],
    sources: [
      'MS Access Database',
      'Customer Service COSMOS',
      'MOP Master Data',
      'Local Distribution Home Delivery KPIs',
      'Stock Data With RPA',
      'Local Distribution Quality Data',
      'LOD-DOM Portal Data',
      'Logistics Purchasing Data',
    ],
    automatedProcesses: [
      'Operational Control Misfit Rate Calculations',
      'Area Leader Control Score Calculations',
      'Hidden Damage Calculations',
      'Local Distribution Home Delivery KPI Calculations',
      'Daily Stock and Utilization Calculations',
      'Weekly Local Quality Quantity and Cost Calculations',
      'Local Purchasing Cost and Simulations',
      'Personnel Cost and Performance Calculations',
      'POS Calculations',
    ],
    outputs: [
      '360-degree overview of all Local Distribution operations across 8 user teams',
      'Role-Based Page Restrictions hosted securely on BSH Server',
      'Real-time operational tracking directly on mobile devices',
      'Unified ingestion across 8 data sources and 16 operational datasets',
      '600,000 data rows and 11,000 pages distilled into 253 graphics across 11 pages',
    ],
    highlights: [
      'Expanded from 4 to 11 report pages serving 8 operational, purchasing & quality teams',
      'Unifies 16 datasets including Hidden Damage, Customer Service Install, Platform Stock, POS Savings & DOM',
      '600,000 rows and 253 graphics protected with Role-Based Page Restrictions on BSH Server',
    ],
  },
  {
    id: 'sirius',
    name: 'Sirius System',
    shortTitle: 'Sirius Audit Engine',
    kicker: 'In-House Automation · Featured in Çerkezköy Postası',
    headlineMetric: '12 MTL / year',
    headlineMetricLabel: '128K rows · 2,500 source pages',
    summary:
      'Custom in-house coded logistics audit and KPI automation suite engineered across 4 report pages for 4 core operational teams—processing 128,000 rows and 2,500 source pages into 25 graphics with application-based access hosted on BSH Server.',
    context:
      'Designed directly from field auditing needs to replace manual reconciliation across COSMOS, MOP master data, and Access databases—delivering rapid adaptation without external vendor bottlenecks.',
    pagesCount: 4,
    dataSize: {
      rows: '128,000 rows',
      sourcePages: '2,500 pages',
      graphics: 25,
    },
    restrictions: 'Application Based',
    dataSecurity: 'BSH Server',
    users: [
      'Operational Control',
      'Cluster Control',
      'Claim Management',
      'Local Distribution Management',
    ],
    includedData: [
      'Operation Control Data',
      'Cluster Control Data',
      'Hidden Damage',
      'Local Distribution Home Delivery KPIs',
    ],
    sources: [
      'MS Access Database',
      'Customer Service COSMOS',
      'MOP Master Data',
      'Local Distribution Home Delivery KPIs',
    ],
    automatedProcesses: [
      'Operational Control Misfit Rate Calculations',
      'Area Leader Control Score Calculations',
      'Hidden Damage Calculations',
      'Local Distribution Home Delivery KPI Calculations',
      'Daily Scorecard Data Share',
      'Weekly Platform-Based and LSP-Based Progress Reports',
    ],
    outputs: [
      '12 MTL yearly cost avoidance through automation and audit control',
      '128,000 rows and 2,500 pages synthesized into 25 graphics across 4 pages',
      'Application-based access control hosted securely on BSH Server',
      'Granular visibility into Local Distribution Home Delivery KPIs for 4 core teams',
      'Actionable view of platform improvement points with in-house code flexibility',
    ],
    highlights: [
      '12 MTL yearly cost avoidance validated in live operations',
      'Serves 4 core teams across 4 report pages (128,000 rows · 25 graphics)',
      'Application-based access control hosted on BSH Server · Featured in Çerkezköy Postası',
    ],
  },
];

export const RECOGNITIONS: RecognitionItem[] = [
  {
    id: 'bsh-competition',
    title: 'BSH LO WC Idea Creation Competition — 3rd Place',
    context: 'Corporate Innovation Recognition',
    detail: 'Awarded 3rd place for practical logistics digitalization and process improvement.',
  },
  {
    id: 'cerkezkoy-postasi',
    title: 'Sirius Project Featured in Çerkezköy Postası',
    context: 'Media & Community Feature',
    detail: 'Highlighted for bringing in-house coding and measurable automation to industrial logistics.',
  },
  {
    id: 'direct-wh',
    title: 'B/S/H/ Direct Warehouse Operational Support',
    context: 'Field Governance & Standards',
    detail: 'Supported Direct WH operational setup, handover discipline, and quality standard compliance.',
  },
];

export const STRATEGIC_PILLARS: StrategicPillar[] = [
  {
    id: 'control-tower',
    index: '01',
    title: 'Data-Based Control Tower',
    points: [
      'Building transparent, data-backed digital monitoring systems',
      'Tracking operational improvements continuously in real time',
      'Embedding hands-on training during active working periods',
      'Scaling proven Turkish distribution solutions to the REM region',
    ],
  },
  {
    id: 'audit-quality',
    index: '02',
    title: 'Audit, Quality & AI Decision Support',
    points: [
      'Raising efficiency and accountability by implementing BSH standards across LSPs',
      'Developing stronger, more resilient logistics teams inside partner LSPs',
      'Elevating end-consumer home appliance delivery service quality',
      'Creating AI-assisted decision helpers for faster operational responses',
    ],
  },
];

export const CAREER_MILESTONES: CareerMilestone[] = [
  {
    id: 'bsh-cerkezkoy',
    period: '2020 – Present',
    company: 'B/S/H/',
    location: 'Çerkezköy, Türkiye',
    role: 'TR Local Distribution Platform Inspector',
    summary:
      'Leading local distribution platform audits, LSP quality governance, and in-house logistics digitalization. Built an extended audit and counting team, managed budgets and schedules, led LSP handovers, and architected both Sirius and L.O.T.',
    capabilities: [
      'Power BI',
      'Automation',
      'Digitalization',
      'Six Sigma – FMEA',
      'KPI Tracking',
      'Project Management',
      'Process Improvement',
      'Business Analysis',
      'Team Management',
      'Budget Management',
      'Schedule Management',
      'Quality',
      'Delivery',
      'Customer Relations & Focus',
    ],
    focusAreas: [
      'Built and scaled an extended audit and inventory counting team',
      'Engineered bespoke reporting and tracking tools for field auditors',
      'Implemented BSH operational standards and handover protocols across LSPs',
      'Coordinated cross-functional stakeholders across LSPs, Sales, CS, and BC teams',
    ],
  },
  {
    id: 'bsh-ankara',
    period: '2019 – 2020',
    company: 'B/S/H/ Ankara RDC',
    location: 'Ankara, Türkiye',
    role: 'Primary Operation Responsible',
    summary:
      'Directed primary regional distribution center execution, full-truck-load (FTL) planning, 3PL partner oversight, and SAP-driven operational reporting under strict service timelines.',
    capabilities: [
      'FTL Truck Load',
      'Planner',
      '3PL Management',
      'SAP',
      'Reporting',
      'Time Management',
      'MS Office',
    ],
    focusAreas: [
      'Planned and balanced primary FTL shipments across regional distribution hubs',
      'Managed day-to-day 3PL execution and schedule adherence',
      'Standardized SAP and MS Office operational reporting cadences',
    ],
  },
  {
    id: 'hay-zek',
    period: '2017 – 2018',
    company: 'Hay-Zek DTM / 3T Arıtma Sistemleri',
    location: 'Ankara, Türkiye',
    role: 'Area Sales Responsible',
    summary:
      'Managed regional commercial operations for water purification systems alongside purchasing, import coordination, stock control, and early in-house web development initiatives.',
    capabilities: [
      'Sales',
      'Stock Control',
      'Purchasing',
      'Import Operations',
      'Web Development',
    ],
    focusAreas: [
      'Owned regional customer accounts and commercial delivery targets',
      'Coordinated import workflows, purchasing, and physical stock control',
      'Built foundational web development skills later applied to logistics automation',
    ],
  },
];

export const CHALLENGES_AND_LEARNINGS = {
  challenges: [
    'Building up an extended field audit and counting team from the ground up',
    'Designing in-house reporting and tracking tools tailored to audit workflows',
    'Managing team budget, schedules, and multi-stakeholder alignment',
    'Leading LSP handover processes and enforcing BSH standards in the field',
  ],
  learnings: [
    'Consumer-focused home appliance delivery demands end-to-end visibility',
    'Cross-functional alignment across LSPs, Sales, Customer Service, and Business Continuity',
    'Proactive, data-backed decision making anchored in LD quality processes',
    'Disciplined time, budget, business case (BC), and schedule governance',
  ],
} as const;

export const CERTIFICATE_CATEGORIES: { id: CertificateCategory; label: string }[] = [
  { id: 'all', label: 'All Credentials' },
  { id: 'project-management', label: 'Project Management' },
  { id: 'business-analysis', label: 'Business Analysis' },
  { id: 'operational-excellence', label: 'Operational Excellence' },
  { id: 'supply-chain-ai', label: 'Supply Chain & AI' },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'ai-supply-chain',
    title: 'Yapay Zeka Çağında Tedarik Zinciri Yönetimi',
    subtitle: 'Supply Chain Management in the Age of Artificial Intelligence',
    issuer: 'Türk-Alman Üniversitesi (TAÜ-DDUAM)',
    issuerShort: 'TAÜ-DDUAM',
    platform: 'Digital Transformation Application & Research Center',
    category: 'supply-chain-ai',
    categoryLabel: 'Supply Chain & AI',
    completedDate: 'Nov 18, 2026',
    completedYear: 2026,
    creditSummary: 'Certificate of Achievement · Prof. Dr. Müge Klein',
    credentialId: 'UN_0410653924785756650',
    providerMeta: 'ID No: 39247857566',
    skills: ['AI in Supply Chain', 'Digital Transformation', 'Supply Chain Strategy'],
    previewImage: '/assets/certs/ai-supply-chain.jpg',
    pdfPath: '/assets/aistudio/Yapay_Zeka__a__nda_Tedarik_Zincii_Y_netimi_b6f73204.pdf',
  },
  {
    id: 'pm-requirements',
    title: 'Project Management Foundations: Requirements',
    issuer: 'National Association of State Boards of Accountancy (NASBA)',
    issuerShort: 'NASBA',
    platform: 'LinkedIn Learning',
    category: 'project-management',
    categoryLabel: 'Project Management',
    completedDate: 'Jul 17, 2026',
    completedYear: 2026,
    creditSummary: '1.40 CPE Credits · Management Services',
    credentialId: 'a5cf635eb05cd5b7e9243d08911d45badf1210040ced382a72cd878ebb6e4087',
    providerMeta: 'NASBA Registry ID: #140940',
    skills: ['Requirements Management', 'Project Management'],
    previewImage: '/assets/certs/pm-requirements.jpg?v=2',
    pdfPath:
      '/assets/aistudio/CertificateOfCompletion_Project_Management_Foundations_Requirements_NASBA__14ee9664.pdf',
  },
  {
    id: 'pm-ethics',
    title: 'Project Management Foundations: Ethics',
    issuer: 'National Association of State Boards of Accountancy (NASBA)',
    issuerShort: 'NASBA',
    platform: 'LinkedIn Learning',
    category: 'project-management',
    categoryLabel: 'Project Management',
    completedDate: 'Jul 17, 2026',
    completedYear: 2026,
    creditSummary: '2.20 CPE Credits · Behavioral Ethics',
    credentialId: 'b4d478e2cc02b883fcfe4da0f3da43b8dae0939e130235bfaebf218d953283c8',
    providerMeta: 'NASBA Registry ID: #140940',
    skills: ['Business Ethics', 'Project Management'],
    previewImage: '/assets/certs/pm-ethics.jpg?v=2',
    pdfPath:
      '/assets/aistudio/CertificateOfCompletion_Project_Management_Foundations_Ethics_dca86d2b.pdf',
  },
  {
    id: 'pm-nasba',
    title: 'Project Management Foundations (NASBA)',
    issuer: 'National Association of State Boards of Accountancy (NASBA)',
    issuerShort: 'NASBA',
    platform: 'LinkedIn Learning',
    category: 'project-management',
    categoryLabel: 'Project Management',
    completedDate: 'Jul 17, 2026',
    completedYear: 2026,
    creditSummary: '9.40 CPE Credits · Business Management',
    credentialId: 'b152ae69cb84742d4fc54f213368aefeb911d41c60f8940e96419a05a16fe2b8',
    providerMeta: 'NASBA Registry ID: #140940',
    skills: ['Project Management', 'Governance'],
    previewImage: '/assets/certs/pm-nasba.jpg?v=2',
    pdfPath:
      '/assets/aistudio/CertificateOfCompletion_Project_Management_Foundations_NASBA_2b0f46bf.pdf',
  },
  {
    id: 'pm-pmi',
    title: 'Project Management Foundations (PMI)',
    issuer: 'Project Management Institute (PMI®)',
    issuerShort: 'PMI',
    platform: 'LinkedIn Learning',
    category: 'project-management',
    categoryLabel: 'Project Management',
    completedDate: 'Jul 17, 2026',
    completedYear: 2026,
    creditSummary: '3.25 PDUs · Activity #41015ZTOKN',
    credentialId: 'ec377d97730e0451ec64a34543d2fea5375cc0d5ef77661500423f02bfa94e1e',
    providerMeta: 'PMI Provider ID: #4101',
    skills: ['Project Management', 'Schedule & Scope Control'],
    previewImage: '/assets/certs/pm-pmi.jpg?v=2',
    pdfPath:
      '/assets/aistudio/CertificateOfCompletion_Project_Management_Foundations_PMI_534b6ed1.pdf',
  },
  {
    id: 'operational-excellence',
    title: 'Operational Excellence Foundations',
    issuer: 'Project Management Institute (PMI®)',
    issuerShort: 'PMI',
    platform: 'LinkedIn Learning',
    category: 'operational-excellence',
    categoryLabel: 'Operational Excellence',
    completedDate: 'Dec 29, 2024',
    completedYear: 2024,
    creditSummary: '1.50 PDUs · Activity #4101TD6K8I',
    credentialId: 'd4667a5a3a414216b4126c639bf84c50a255772f0722aa3f617dc6e7e31faf7d',
    providerMeta: 'PMI Provider ID: #4101',
    skills: ['Operational Excellence', 'Continuous Improvement'],
    previewImage: '/assets/certs/operational-excellence.jpg',
    pdfPath:
      '/assets/aistudio/CertificateOfCompletion_Operational_Excellence_Foundations_e9a8e3ac.pdf',
  },
  {
    id: 'agile-requirements',
    title: 'Agile Requirements Foundations',
    issuer: 'International Institute of Business Analysis (IIBA®)',
    issuerShort: 'IIBA',
    platform: 'LinkedIn Learning',
    category: 'business-analysis',
    categoryLabel: 'Business Analysis',
    completedDate: 'Mar 07, 2022',
    completedYear: 2022,
    creditSummary: '2.50 CDUs · Activity #2145',
    credentialId: 'ff4577ce85812881c08759e40d8b0674a646dfd76b135ab3971dca3c462c7358',
    providerMeta: 'IIBA Provider ID: #189294',
    skills: ['Agile Methodologies', 'Requirements Analysis'],
    previewImage: '/assets/certs/agile-requirements.jpg?v=2',
    pdfPath:
      '/assets/aistudio/CertificateOfCompletion_Agile_Requirements_Foundations_02191cd8.pdf',
  },
  {
    id: 'ba-iiba',
    title: 'Business Analysis Foundations (IIBA)',
    issuer: 'International Institute of Business Analysis (IIBA®)',
    issuerShort: 'IIBA',
    platform: 'LinkedIn Learning',
    category: 'business-analysis',
    categoryLabel: 'Business Analysis',
    completedDate: 'Dec 23, 2021',
    completedYear: 2021,
    creditSummary: '2.00 CDUs · BABOK Aligned',
    credentialId: 'ASoC-9ZAZ-Bp9eAOuC0VmC8xr0QN',
    providerMeta: 'IIBA Provider ID: #189294',
    skills: ['Business Analysis', 'Stakeholder Discovery'],
    previewImage: '/assets/certs/ba-iiba.jpg',
    pdfPath:
      '/assets/aistudio/CertificateOfCompletion_Business_Analysis_Foundations__IIBA__a6e708ce.pdf',
  },
  {
    id: 'ba-pmi',
    title: 'Business Analysis Foundations (PMI)',
    issuer: 'Project Management Institute (PMI®)',
    issuerShort: 'PMI',
    platform: 'LinkedIn Learning',
    category: 'business-analysis',
    categoryLabel: 'Business Analysis',
    completedDate: 'Dec 23, 2021',
    completedYear: 2021,
    creditSummary: '1.25 PDUs · Activity #4101TMPCAV',
    credentialId: 'ASoC-9ZAZ-Bp9eAOuC0VmC8xr0QN',
    providerMeta: 'PMI Provider ID: #4101',
    skills: ['Business Analysis', 'Process Mapping'],
    previewImage: '/assets/certs/ba-pmi.jpg',
    pdfPath:
      '/assets/aistudio/CertificateOfCompletion_Business_Analysis_Foundations__PMI__abf8873d.pdf',
  },
  {
    id: 'six-sigma',
    title: 'Six Sigma Foundations',
    issuer: 'Project Management Institute (PMI®)',
    issuerShort: 'PMI',
    platform: 'LinkedIn Learning',
    category: 'operational-excellence',
    categoryLabel: 'Operational Excellence',
    completedDate: 'Dec 06, 2021',
    completedYear: 2021,
    creditSummary: '1.75 PDUs · Activity #4101OTJBPP',
    credentialId: 'AfsXmmlXlDlr0w1ubDon3U2OXR8_',
    providerMeta: 'PMI Provider ID: #4101',
    skills: ['Six Sigma', 'FMEA', 'Quality Control'],
    previewImage: '/assets/certs/six-sigma.jpg',
    pdfPath: '/assets/aistudio/CertificateOfCompletion_Six_Sigma_Foundations_e4ab7534.pdf',
  },
  {
    id: 'managing-logistics',
    title: 'Managing Logistics',
    issuer: 'National Association of State Boards of Accountancy (NASBA)',
    issuerShort: 'NASBA',
    platform: 'LinkedIn Learning',
    category: 'supply-chain-ai',
    categoryLabel: 'Supply Chain & AI',
    completedDate: 'Sep 01, 2021',
    completedYear: 2021,
    creditSummary: '1.60 CPE Credits · Management Services',
    credentialId: 'AdfbBzVeikJne1ktnvUS1EKJ57K6',
    providerMeta: 'NASBA Registry ID: #140940',
    skills: ['Logistics Management', 'Distribution Operations'],
    previewImage: '/assets/certs/managing-logistics.jpg',
    pdfPath: '/assets/aistudio/CertificateOfCompletion_Managing_Logistics_3605e335.pdf',
  },
];


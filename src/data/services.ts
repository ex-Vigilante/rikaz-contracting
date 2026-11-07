import type { Bi } from '../lib/i18n';
import type { ImgKey } from './images';

export interface Service {
  id: string;
  title: Bi;
  blurb: Bi;
  includes: Bi<string[]>;
  timeline: Bi;
  img: ImgKey;
}

export const services: Service[] = [
  {
    id: 'commercial',
    title: { ar: 'إنشاءات تجارية', en: 'Commercial Construction' },
    blurb: { ar: 'أبراج مكتبية ومجمعات تجارية ومبانٍ متعددة الاستخدامات، من الأساسات إلى التسليم.', en: 'Office towers, retail parks and mixed-use buildings, from foundations to handover.' },
    includes: {
      ar: ['الحفر والأساسات العميقة', 'الهياكل الخرسانية والفولاذية', 'الواجهات والكسوات', 'الأنظمة الكهروميكانيكية وأنظمة السلامة', 'الاختبار والتشغيل والتسليم'],
      en: ['Excavation and deep foundations', 'Concrete and steel structures', 'Facades and cladding', 'MEP and life-safety systems', 'Testing, commissioning and handover'],
    },
    timeline: { ar: 'من 18 إلى 36 شهراً بحسب المساحة والتعقيد', en: '18 to 36 months depending on size and complexity' },
    img: 'towers',
  },
  {
    id: 'villas',
    title: { ar: 'فلل ومجمعات سكنية', en: 'Villas and Residential Compounds' },
    blurb: { ar: 'فلل خاصة ومجمعات سكنية تُسلَّم على مراحل مع ضمان على الهيكل والتشطيب.', en: 'Private villas and residential compounds delivered in phases, with structural and finishing warranties.' },
    includes: {
      ar: ['أعمال الموقع والبنية التحتية الداخلية', 'الهيكل والعزل الحراري والمائي', 'المسابح والمناظر الطبيعية', 'تشطيب كامل بنماذج معتمدة', 'التسليم المرحلي وفترة الضمان'],
      en: ['Site works and internal infrastructure', 'Structure with thermal and waterproofing', 'Pools and landscaping', 'Full finishing against approved samples', 'Phased handover and defects period'],
    },
    timeline: { ar: 'من 10 إلى 24 شهراً', en: '10 to 24 months' },
    img: 'villaPool',
  },
  {
    id: 'fitout',
    title: { ar: 'تشطيبات وديكور', en: 'Fit-out and Interiors' },
    blurb: { ar: 'تشطيب مكاتب وفنادق ومحال تجارية، مع جداول عمل ليلية عند الحاجة لتقليل أثر الأعمال.', en: 'Offices, hotels and retail interiors, with night-shift schedules where needed to limit disruption.' },
    includes: {
      ar: ['الجدران الخفيفة والأسقف المعلّقة', 'الأرضيات والنجارة المخصصة', 'الإضاءة والتكييف والشبكات', 'غرف نموذجية قبل التنفيذ الشامل', 'فحص جودة لكل مساحة'],
      en: ['Partitions and suspended ceilings', 'Flooring and bespoke joinery', 'Lighting, HVAC and data', 'Show rooms ahead of full roll-out', 'A quality inspection for every space'],
    },
    timeline: { ar: 'من 3 إلى 12 شهراً', en: '3 to 12 months' },
    img: 'lobbyChandelier',
  },
  {
    id: 'infrastructure',
    title: { ar: 'بنية تحتية', en: 'Infrastructure' },
    blurb: { ar: 'طرق داخلية وشبكات مياه وصرف وكهرباء للمناطق الصناعية والمجمعات والمواقع النائية.', en: 'Internal roads and water, drainage and power networks for industrial zones, compounds and remote sites.' },
    includes: {
      ar: ['الأعمال الترابية وتحسين التربة', 'الطرق والأرصفة', 'شبكات المياه والصرف المطري', 'الكابلات والإنارة', 'خطة سلامة مرورية ولوجستية'],
      en: ['Earthworks and soil improvement', 'Roads and kerbs', 'Water and storm-drainage networks', 'Cables and street lighting', 'Traffic safety and logistics plan'],
    },
    timeline: { ar: 'من 8 إلى 24 شهراً', en: '8 to 24 months' },
    img: 'roller',
  },
  {
    id: 'pm',
    title: { ar: 'إدارة مشاريع', en: 'Project Management' },
    blurb: { ar: 'تمثيل المالك في الموقع: جدولة وتكاليف وجودة ومخاطر، بتقارير أسبوعية واضحة.', en: 'Owner representation on site: schedule, cost, quality and risk, with clear weekly reporting.' },
    includes: {
      ar: ['دراسة الجدوى الفنية وتقدير التكاليف', 'إعداد جداول التنفيذ ومراقبتها', 'إدارة المقاولين من الباطن', 'مراجعة المخططات والمواد', 'تقارير أسبوعية وتسليم موثّق'],
      en: ['Technical feasibility and cost estimating', 'Programme preparation and monitoring', 'Subcontractor management', 'Drawing and material review', 'Weekly reports and documented handover'],
    },
    timeline: { ar: 'يمتد على عمر المشروع', en: 'Runs for the life of the project' },
    img: 'drawing',
  },
  {
    id: 'maintenance',
    title: { ar: 'صيانة', en: 'Maintenance' },
    blurb: { ar: 'عقود صيانة وقائية وتصحيحية للمباني بعد التسليم، مع فريق استجابة في الرياض وجدة.', en: 'Preventive and corrective maintenance contracts after handover, with response teams in Riyadh and Jeddah.' },
    includes: {
      ar: ['فحص دوري للهيكل والواجهات', 'صيانة الأنظمة الميكانيكية والكهربائية', 'أعمال الترميم والعزل', 'استجابة للطوارئ', 'سجل صيانة رقمي للمالك'],
      en: ['Periodic structure and facade inspection', 'Mechanical and electrical upkeep', 'Repair and waterproofing works', 'Emergency response', 'A digital maintenance log for the owner'],
    },
    timeline: { ar: 'عقود سنوية قابلة للتجديد', en: 'Annual renewable contracts' },
    img: 'workers',
  },
];

import type { Bi } from '../lib/i18n';
import type { ImgKey } from './images';

export type Category = 'commercial' | 'residential' | 'hospitality' | 'infrastructure';
export type CityKey = 'riyadh' | 'jeddah' | 'dammam' | 'alula' | 'northwest';
export type Status = 'completed' | 'ongoing';

export const categories: Record<Category, Bi> = {
  commercial: { ar: 'تجاري', en: 'Commercial' },
  residential: { ar: 'سكني', en: 'Residential' },
  hospitality: { ar: 'ضيافة', en: 'Hospitality' },
  infrastructure: { ar: 'بنية تحتية', en: 'Infrastructure' },
};
export const statuses: Record<Status, Bi> = {
  completed: { ar: 'مكتمل', en: 'Completed' },
  ongoing: { ar: 'قيد التنفيذ', en: 'Ongoing' },
};
export const cities: Record<CityKey, { name: Bi; lat: number; lng: number }> = {
  riyadh: { name: { ar: 'الرياض', en: 'Riyadh' }, lat: 24.7136, lng: 46.6753 },
  jeddah: { name: { ar: 'جدة', en: 'Jeddah' }, lat: 21.5433, lng: 39.1728 },
  dammam: { name: { ar: 'الدمام', en: 'Dammam' }, lat: 26.4207, lng: 50.0888 },
  alula: { name: { ar: 'العلا', en: 'AlUla' }, lat: 26.6085, lng: 37.9233 },
  northwest: { name: { ar: 'شمال غرب المملكة', en: 'North-West Region' }, lat: 28.3, lng: 36.5 },
};

export interface Project {
  slug: string;
  title: Bi;
  category: Category;
  city: CityKey;
  year: number;
  area: number;
  value: [number, number];
  status: Status;
  months: number;
  sector: Bi;
  cover: ImgKey;
  gallery: ImgKey[];
  summary: Bi;
  scope: Bi<string[]>;
  beforeAfter?: { before: ImgKey; after: ImgKey; beforeLabel: Bi; afterLabel: Bi };
}

const ba = {
  structure: { ar: 'مرحلة الهيكل', en: 'Structure stage' },
  handover: { ar: 'عند التسليم', en: 'At handover' },
};

export const projects: Project[] = [
  {
    slug: 'al-nakheel-business-tower',
    title: { ar: 'برج النخيل للأعمال', en: 'Al Nakheel Business Tower' },
    category: 'commercial', city: 'riyadh', year: 2023, area: 38000, value: [100, 250],
    status: 'completed', months: 30,
    sector: { ar: 'تطوير عقاري', en: 'Real estate development' },
    cover: 'towers',
    gallery: ['towers', 'glassUp', 'whiteFacade', 'officeGlass'],
    summary: {
      ar: 'برج مكتبي من أربعة وعشرين طابقاً على محور تجاري رئيسي في الرياض، سُلّم بواجهة زجاجية مزدوجة وأنظمة ميكانيكية موفّرة للطاقة.',
      en: 'A twenty-four storey office tower on a main commercial corridor in Riyadh, delivered with a double-glazed facade and energy-efficient mechanical systems.',
    },
    scope: {
      ar: ['أعمال الحفر والأساسات العميقة', 'الهيكل الخرساني والبلاطات المسبقة الإجهاد', 'الواجهات الزجاجية المزدوجة', 'الأنظمة الكهروميكانيكية وأنظمة السلامة', 'التشطيبات الداخلية للمناطق المشتركة'],
      en: ['Excavation and deep foundations', 'Reinforced concrete frame and post-tensioned slabs', 'Double-glazed curtain wall facade', 'MEP and life-safety systems', 'Interior finishes for common areas'],
    },
    beforeAfter: { before: 'frame', after: 'whiteFacade', beforeLabel: ba.structure, afterLabel: ba.handover },
  },
  {
    slug: 'al-yasmin-villa-compound',
    title: { ar: 'مجمّع فلل الياسمين', en: 'Al Yasmin Villa Compound' },
    category: 'residential', city: 'riyadh', year: 2022, area: 21500, value: [50, 100],
    status: 'completed', months: 22,
    sector: { ar: 'سكني خاص', en: 'Private residential' },
    cover: 'villaPool',
    gallery: ['villaPool', 'villaPool2', 'villaPalms', 'livingA'],
    summary: {
      ar: 'ست عشرة فيلا سكنية بمسابح خاصة ومرافق مشتركة، نُفذت على مراحل متتابعة مع تسليم أول الوحدات خلال أربعة عشر شهراً.',
      en: 'Sixteen private villas with pools and shared amenities, built in successive phases with the first units handed over within fourteen months.',
    },
    scope: {
      ar: ['تجهيز الموقع والبنية التحتية الداخلية', 'الهياكل الخرسانية والعزل الحراري', 'المسابح وأعمال المناظر الطبيعية', 'التشطيبات الداخلية الكاملة', 'التسليم المرحلي وفترة الضمان'],
      en: ['Site preparation and internal infrastructure', 'Concrete structures and thermal insulation', 'Pools and landscaping', 'Full interior finishing', 'Phased handover and defects period'],
    },
    beforeAfter: { before: 'siteAerial', after: 'villaPool', beforeLabel: { ar: 'الموقع قبل البدء', en: 'Site before works' }, afterLabel: ba.handover },
  },
  {
    slug: 'corniche-boutique-hotel',
    title: { ar: 'فندق بوتيك الكورنيش', en: 'Corniche Boutique Hotel' },
    category: 'hospitality', city: 'jeddah', year: 2024, area: 12800, value: [50, 100],
    status: 'completed', months: 16,
    sector: { ar: 'ضيافة وسياحة', en: 'Hospitality and tourism' },
    cover: 'lobbyChandelier',
    gallery: ['lobbyChandelier', 'lobbyA', 'hallway', 'livingOrange'],
    summary: {
      ar: 'إعادة تأهيل شاملة لفندق من ثمانٍ وستين غرفة، مع بهو جديد وممرات وغرف نموذجية سُلّمت دون إيقاف التشغيل الكامل للمبنى.',
      en: 'A full renovation of a sixty-eight room hotel with a new lobby, corridors and show rooms, delivered without a complete shutdown of the building.',
    },
    scope: {
      ar: ['الهدم الانتقائي وإعادة توزيع الفراغات', 'بهو الاستقبال والأسقف الزخرفية', 'تجديد الغرف والممرات', 'الإضاءة وأنظمة التحكم', 'غرف نموذجية قبل التنفيذ الشامل'],
      en: ['Selective demolition and space re-planning', 'Reception lobby and decorative ceilings', 'Room and corridor refurbishment', 'Lighting and control systems', 'Show rooms ahead of full roll-out'],
    },
    beforeAfter: { before: 'hallway', after: 'lobbyA', beforeLabel: { ar: 'قبل التجديد', en: 'Before refurbishment' }, afterLabel: { ar: 'بعد التسليم', en: 'After handover' } },
  },
  {
    slug: 'eastern-industrial-roads-utilities',
    title: { ar: 'طرق ومرافق المنطقة الصناعية الشرقية', en: 'Eastern Industrial Roads and Utilities' },
    category: 'infrastructure', city: 'dammam', year: 2023, area: 460000, value: [100, 250],
    status: 'completed', months: 20,
    sector: { ar: 'صناعي ولوجستي', en: 'Industrial and logistics' },
    cover: 'roller',
    gallery: ['roller', 'road', 'siteCity'],
    summary: {
      ar: 'شبكة طرق داخلية وخطوط مياه وصرف وكهرباء لمنطقة صناعية جديدة، نُفذت مع الحفاظ على حركة الشاحنات اليومية.',
      en: 'Internal road network with water, drainage and power lines for a new industrial zone, built while keeping daily truck movement flowing.',
    },
    scope: {
      ar: ['الأعمال الترابية وتحسين التربة', 'الطبقات الإسفلتية والأرصفة', 'شبكات المياه والصرف المطري', 'الكابلات الكهربائية والإنارة', 'لوحات الإرشاد والسلامة المرورية'],
      en: ['Earthworks and soil improvement', 'Asphalt layers and kerbs', 'Water and storm-drainage networks', 'Power cables and street lighting', 'Signage and traffic safety'],
    },
  },
  {
    slug: 'financial-services-hq-fit-out',
    title: { ar: 'تشطيب المقر الرئيسي لشركة خدمات مالية', en: 'Financial Services HQ Fit-out' },
    category: 'commercial', city: 'riyadh', year: 2024, area: 9200, value: [10, 50],
    status: 'completed', months: 9,
    sector: { ar: 'خدمات مالية', en: 'Financial services' },
    cover: 'officeGlass',
    gallery: ['officeGlass', 'lobbyA', 'livingA'],
    summary: {
      ar: 'تشطيب ثلاثة طوابق إدارية بمساحات عمل مفتوحة وقاعات اجتماعات، سُلّمت في تسعة أشهر ضمن جدول عمل ليلي لتقليل أثره على المبنى.',
      en: 'Fit-out of three office floors with open workspaces and meeting suites, handed over in nine months using night shifts to limit disruption to the building.',
    },
    scope: {
      ar: ['الجدران الخفيفة والأسقف المعلّقة', 'الأرضيات المرتفعة وأعمال الأرضيات', 'النجارة المخصصة وقاعات الاجتماعات', 'الكهرباء والتكييف والشبكات', 'الاختبارات والتشغيل التجريبي'],
      en: ['Partitions and suspended ceilings', 'Raised floors and flooring', 'Bespoke joinery and meeting suites', 'Electrical, HVAC and data networks', 'Testing and commissioning'],
    },
    beforeAfter: { before: 'blueprint', after: 'officeGlass', beforeLabel: { ar: 'المخططات', en: 'Design drawings' }, afterLabel: ba.handover },
  },
  {
    slug: 'al-rawabi-residences',
    title: { ar: 'مجمّع الروابي السكني', en: 'Al Rawabi Residences' },
    category: 'residential', city: 'jeddah', year: 2025, area: 54000, value: [250, 500],
    status: 'ongoing', months: 34,
    sector: { ar: 'تطوير عقاري', en: 'Real estate development' },
    cover: 'frame',
    gallery: ['frame', 'brickModern', 'cranesDusk', 'nightBuild'],
    summary: {
      ar: 'أربع عمارات سكنية بإجمالي ثلاثمئة وعشرين وحدة، تجري حالياً أعمال الهيكل الخرساني للمبنيين الأول والثاني.',
      en: 'Four residential blocks with a total of three hundred and twenty units; structural works on blocks one and two are currently under way.',
    },
    scope: {
      ar: ['الأساسات والقبو', 'الهياكل الخرسانية', 'الواجهات والطوب والعزل', 'الأعمال الكهروميكانيكية', 'التشطيبات وتسليم الوحدات'],
      en: ['Foundations and basement', 'Reinforced concrete structures', 'Facades, masonry and insulation', 'MEP works', 'Finishing and unit handover'],
    },
  },
  {
    slug: 'alula-desert-lodge',
    title: { ar: 'نُزل الصحراء في العلا', en: 'AlUla Desert Lodge' },
    category: 'hospitality', city: 'alula', year: 2025, area: 7400, value: [50, 100],
    status: 'ongoing', months: 18,
    sector: { ar: 'ضيافة وسياحة', en: 'Hospitality and tourism' },
    cover: 'redCurve',
    gallery: ['redCurve', 'whiteFacade', 'lobbyA'],
    summary: {
      ar: 'نُزل من اثنين وأربعين جناحاً بواجهات من الحجر المحلي والخرسانة المصبوبة في الموقع، يراعي طبيعة الموقع والظروف المناخية.',
      en: 'A lodge of forty-two suites with local stone and cast-in-place concrete facades, designed around the site and its climate.',
    },
    scope: {
      ar: ['أعمال الموقع بأقل أثر بيئي', 'الخرسانة المصبوبة في الموقع', 'كسوة الحجر المحلي', 'أنظمة التبريد وإدارة المياه', 'التشطيبات والأثاث الثابت'],
      en: ['Low-impact site works', 'Cast-in-place concrete', 'Local stone cladding', 'Cooling and water management systems', 'Finishes and fixed furniture'],
    },
  },
  {
    slug: 'al-waha-retail-park',
    title: { ar: 'مجمّع الواحة التجاري', en: 'Al Waha Retail Park' },
    category: 'commercial', city: 'dammam', year: 2025, area: 41000, value: [100, 250],
    status: 'ongoing', months: 26,
    sector: { ar: 'تجزئة', en: 'Retail' },
    cover: 'cranesDusk',
    gallery: ['cranesDusk', 'siteCity', 'nightBuild', 'cranesBirds'],
    summary: {
      ar: 'مجمع تجاري مفتوح بمحال ومطاعم ومواقف متعددة الطوابق، مع تنسيق مباشر مع المستأجرين لتسليم المحال جاهزة للتجهيز.',
      en: 'An open-air retail park with shops, restaurants and multi-storey parking, coordinating directly with tenants to hand over units ready for fit-out.',
    },
    scope: {
      ar: ['الأساسات والهيكل الخرساني والفولاذي', 'مواقف السيارات متعددة الطوابق', 'الواجهات والمظلات', 'الخدمات الميكانيكية والكهربائية', 'تسليم المحال بمواصفات المستأجرين'],
      en: ['Foundations with concrete and steel frame', 'Multi-storey car parking', 'Facades and canopies', 'Mechanical and electrical services', 'Unit handover to tenant specifications'],
    },
  },
  {
    slug: 'al-narjis-villas-interiors',
    title: { ar: 'تشطيب فلل النرجس', en: 'Al Narjis Villas Interior Finishing' },
    category: 'residential', city: 'riyadh', year: 2024, area: 16000, value: [10, 50],
    status: 'completed', months: 12,
    sector: { ar: 'سكني خاص', en: 'Private residential' },
    cover: 'livingArch',
    gallery: ['livingArch', 'livingA', 'livingOrange', 'villaPalms'],
    summary: {
      ar: 'تشطيبات داخلية وديكور لاثنتي عشرة فيلا، مع نماذج مواد معتمدة من المالك قبل بدء التنفيذ ونظام فحص جودة لكل غرفة.',
      en: 'Interior finishing and decoration for twelve villas, with owner-approved material samples before work began and a quality check for every room.',
    },
    scope: {
      ar: ['الجبس والدهانات', 'الأرضيات الرخامية والباركيه', 'النجارة والمطابخ', 'الإضاءة الزخرفية', 'فحص الجودة والتسليم'],
      en: ['Plasterwork and paint', 'Marble and parquet flooring', 'Joinery and kitchens', 'Decorative lighting', 'Quality inspection and handover'],
    },
  },
  {
    slug: 'north-west-workforce-village',
    title: { ar: 'مدينة سكنية للعاملين ومرافقها', en: 'Workforce Village and Utilities' },
    category: 'infrastructure', city: 'northwest', year: 2025, area: 120000, value: [100, 250],
    status: 'ongoing', months: 15,
    sector: { ar: 'مشاريع حكومية وشبه حكومية', en: 'Public and semi-public projects' },
    cover: 'siteAerial',
    gallery: ['siteAerial', 'roller', 'hardHat'],
    summary: {
      ar: 'سكن جاهز لألفي عامل مع مرافق المياه والكهرباء والطرق الداخلية، في موقع بعيد يتطلب سلسلة إمداد مخططة بدقة.',
      en: 'Ready-to-occupy housing for two thousand workers with water, power and internal roads, on a remote site that demands a tightly planned supply chain.',
    },
    scope: {
      ar: ['تجهيز الموقع والطرق الداخلية', 'مبانٍ سكنية ومرافق خدمية', 'شبكات المياه والصرف', 'محطات الكهرباء الفرعية', 'خطة لوجستية وسلامة للموقع النائي'],
      en: ['Site preparation and internal roads', 'Accommodation blocks and service buildings', 'Water and drainage networks', 'Electrical substations', 'Logistics and safety plan for a remote site'],
    },
  },
];

export const byCategory = (c: Category) => projects.filter((p) => p.category === c);
export const valueText = (p: Project, lang: 'ar' | 'en') =>
  lang === 'ar' ? `${p.value[0]}–${p.value[1]} مليون ر.س` : `SAR ${p.value[0]}–${p.value[1]}M`;

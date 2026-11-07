import type { Bi } from '../lib/i18n';
import type { CityKey } from './projects';

export type Dept = 'engineering' | 'site' | 'hse' | 'procurement' | 'admin';
export const depts: Record<Dept, Bi> = {
  engineering: { ar: 'الهندسة', en: 'Engineering' },
  site: { ar: 'إدارة المواقع', en: 'Site Management' },
  hse: { ar: 'السلامة والجودة', en: 'Safety and Quality' },
  procurement: { ar: 'المشتريات', en: 'Procurement' },
  admin: { ar: 'الإدارة والمالية', en: 'Admin and Finance' },
};
export interface Job { id: string; title: Bi; dept: Dept; city: CityKey; exp: Bi; blurb: Bi }
export const jobs: Job[] = [
  { id: 'civil-eng', title: { ar: 'مهندس مدني', en: 'Civil Engineer' }, dept: 'engineering', city: 'riyadh', exp: { ar: '3 – 6 سنوات', en: '3 – 6 years' }, blurb: { ar: 'متابعة الأعمال الإنشائية ومراجعة المخططات وحصر الكميات لمشاريع تجارية.', en: 'Follow structural works, review drawings and prepare quantities on commercial projects.' } },
  { id: 'site-manager', title: { ar: 'مدير موقع', en: 'Site Manager' }, dept: 'site', city: 'jeddah', exp: { ar: '10 سنوات فأكثر', en: '10+ years' }, blurb: { ar: 'قيادة فريق الموقع وإدارة الجدول والمقاولين من الباطن في مشروع سكني.', en: 'Lead the site team, programme and subcontractors on a residential development.' } },
  { id: 'qs', title: { ar: 'مهندس كميات وعقود', en: 'Quantity Surveyor' }, dept: 'engineering', city: 'riyadh', exp: { ar: '5 – 8 سنوات', en: '5 – 8 years' }, blurb: { ar: 'إعداد المستخلصات وأوامر التغيير وتقارير التكلفة الشهرية.', en: 'Prepare payment certificates, variation orders and monthly cost reports.' } },
  { id: 'hse-officer', title: { ar: 'مسؤول سلامة وصحة مهنية', en: 'HSE Officer' }, dept: 'hse', city: 'dammam', exp: { ar: '4 – 7 سنوات', en: '4 – 7 years' }, blurb: { ar: 'تطبيق خطة السلامة في الموقع وإجراء التفتيش والتدريب الأسبوعي.', en: 'Apply the site safety plan, run inspections and deliver weekly toolbox training.' } },
  { id: 'qa-engineer', title: { ar: 'مهندس ضبط جودة', en: 'QA/QC Engineer' }, dept: 'hse', city: 'jeddah', exp: { ar: '3 – 5 سنوات', en: '3 – 5 years' }, blurb: { ar: 'فحص الأعمال ومطابقة المواد وإصدار تقارير عدم المطابقة.', en: 'Inspect works, verify materials and issue non-conformance reports.' } },
  { id: 'procurement', title: { ar: 'أخصائي مشتريات', en: 'Procurement Specialist' }, dept: 'procurement', city: 'riyadh', exp: { ar: '4 – 6 سنوات', en: '4 – 6 years' }, blurb: { ar: 'التفاوض مع الموردين وإدارة أوامر الشراء وجداول التوريد.', en: 'Negotiate with suppliers and manage purchase orders and delivery schedules.' } },
  { id: 'accountant', title: { ar: 'محاسب مشاريع', en: 'Project Accountant' }, dept: 'admin', city: 'riyadh', exp: { ar: '3 – 5 سنوات', en: '3 – 5 years' }, blurb: { ar: 'متابعة تكاليف المشاريع والفواتير والتدفقات النقدية الشهرية.', en: 'Track project costs, invoicing and monthly cash flow.' } },
];

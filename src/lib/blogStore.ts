// ─────────────────────────────────────────────────────────
// Blog store — persists to localStorage
// ─────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;          // internal key
  categoryLabel: string;     // display label
  date: string;
  author: string;
  image: string;             // base64 or URL
  attachment?: string;       // base64 data URL (optional)
  attachmentName?: string;
}

const STORAGE_KEY = 'lexbridge_posts';

export const CAT_MAP: Record<string, string> = {
  'أخبار الصفحة':     'أخبار الصفحة',
  'مقالات قانونية':   'مقالات قانونية',
  'أخبار قانونية':    'أخبار قانونية',
  'المحتوى التعليمي': 'المحتوى التعليمي',
  'الكل':             'الكل',
};

// Static posts (original)
const STATIC_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'أهم التعديلات في قانون العقوبات المصري',
    excerpt: 'تعرف على أبرز التعديلات التي طرأت على قانون العقوبات وكيف تؤثر على القضايا المنظورة حالياً أمام المحاكم.',
    content: '', // served by BlogPost static
    category: 'أخبار الصفحة',
    categoryLabel: 'أخبار الصفحة',
    date: '24/2/2026',
    author: 'مصطفى فؤاد',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'لا دليل بلا مشروعيه',
    excerpt: 'لحجر الزاوية في صرح العدالة الجنائية الحديثة.',
    content: '',
    category: 'أخبار الصفحة',
    categoryLabel: 'أخبار الصفحة',
    date: '2/3/2026',
    author: 'مصطفى فؤاد',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'حقوق الزوجة في قانون الأحوال الشخصية الجديد',
    excerpt: 'شرح مفصل للحقوق والواجبات المترتبة على عقد الزواج والطلاق في ضوء التعديلات التشريعية الأخيرة.',
    content: '',
    category: 'المحتوى التعليمي',
    categoryLabel: 'المحتوى التعليمي',
    date: '2024-05-05',
    author: 'محمد علي',
    image: 'https://images.unsplash.com/photo-1591115765373-520b7a217294?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'الجرائم الإلكترونية: كيف تحمي نفسك قانونياً؟',
    excerpt: 'مع زيادة الاعتماد على التكنولوجيا، زادت الجرائم الإلكترونية. تعرف على سبل الوقاية والتحرك القانوني الصحيح.',
    content: '',
    category: 'مقالات قانونية',
    categoryLabel: 'مقالات قانونية',
    date: '2024-04-28',
    author: 'أحمد الجسر',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
  },
];

export function getAllPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const dynamic: BlogPost[] = raw ? JSON.parse(raw) : [];
    return [...STATIC_POSTS, ...dynamic];
  } catch { return STATIC_POSTS; }
}

export function getDynamicPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function savePost(post: BlogPost): void {
  const posts = getDynamicPosts();
  posts.push(post);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function deletePost(id: number): boolean {
  // Can't delete static
  if (id <= 4) return false;
  const posts = getDynamicPosts().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return true;
}

export function getPostById(id: number): BlogPost | undefined {
  return getAllPosts().find(p => p.id === id);
}

export function generateId(): number {
  const posts = getDynamicPosts();
  if (posts.length === 0) return 100;
  return Math.max(...posts.map(p => p.id)) + 1;
}

export const DASHBOARD_PASSWORD = 'lexbridge@1608';

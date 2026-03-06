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

// Static posts (original) — cleared, manage via Dashboard
const STATIC_POSTS: BlogPost[] = [];

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

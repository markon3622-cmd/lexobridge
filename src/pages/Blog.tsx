import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const categories = ['الكل', 'القانون الجنائي', 'القانون المدني', 'قضايا الأسرة', 'نصائح قانونية'];
  const posts = [
    { id: 1, title: 'أهم التعديلات في قانون العقوبات المصري', excerpt: 'تعرف على أبرز التعديلات التي طرأت على قانون العقوبات وكيف تؤثر على القضايا المنظورة حالياً أمام المحاكم.', category: 'القانون الجنائي', date: '24/2/2026', author: 'مصطفى فؤاد', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, title: 'لا دليل بلا مشروعيه', excerpt: 'لحجر الزاوية في صرح العدالة الجنائية الحديثة.', category: 'القانون الجنائي', date: '2/3/2026', author: 'مصطفى فؤاد', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, title: 'حقوق الزوجة في قانون الأحوال الشخصية الجديد', excerpt: 'شرح مفصل للحقوق والواجبات المترتبة على عقد الزواج والطلاق في ضوء التعديلات التشريعية الأخيرة.', category: 'قضايا الأسرة', date: '2024-05-05', author: 'محمد علي', image: 'https://images.unsplash.com/photo-1591115765373-520b7a217294?q=80&w=2070&auto=format&fit=crop' },
    { id: 4, title: 'الجرائم الإلكترونية: كيف تحمي نفسك قانونياً؟', excerpt: 'مع زيادة الاعتماد على التكنولوجيا، زادت الجرائم الإلكترونية. تعرف على سبل الوقاية والتحرك القانوني الصحيح.', category: 'نصائح قانونية', date: '2024-04-28', author: 'أحمد الجسر', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop' },
  ];
  const filteredPosts = posts.filter(p => {
    const ms = p.title.includes(searchQuery) || p.excerpt.includes(searchQuery);
    const mc = selectedCategory === 'الكل' || p.category === selectedCategory;
    return ms && mc;
  });

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', background: 'transparent', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-badge mb-4">المحتوى القانوني</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, marginTop: '1rem', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            المدونة <span className="text-silver-gradient">القانونية</span>
          </h1>
          <p style={{ color: 'rgba(192,192,192,0.6)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
            مقالات وتحليلات قانونية تهدف إلى نشر الوعي القانوني وتوضيح التشريعات الحديثة.
          </p>
        </div>

        {/* Search + filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(192,192,192,0.4)', pointerEvents: 'none' }} />
            <input type="text" placeholder="ابحث عن مقال قانوني..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: 'rgba(0,31,63,0.4)', border: '1px solid rgba(192,192,192,0.12)', borderRadius: '0.875rem', padding: '0.875rem 3rem 0.875rem 1.25rem', color: '#E2E6EC', outline: 'none', fontSize: '0.9rem', transition: 'border-color 0.2s' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                style={{ padding: '0.5rem 1.25rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', border: selectedCategory === cat ? 'none' : '1px solid rgba(192,192,192,0.15)', background: selectedCategory === cat ? 'linear-gradient(135deg, #C8CDD6, #C0C0C0)' : 'transparent', color: selectedCategory === cat ? '#001F3F' : 'rgba(192,192,192,0.6)' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, i) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="glass card-shine" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s' }}
              whileHover={{ y: -6 }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                <img src={post.image} alt={post.title} referrerPolicy="no-referrer"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                  <span className="tag-pill">{post.category}</span>
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,13,26,0.6) 100%)' }} />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'rgba(192,192,192,0.5)', marginBottom: '0.875rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={12} />{post.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><User size={12} />{post.author}</span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#F0F2F5', marginBottom: '0.75rem', lineHeight: 1.4 }}>{post.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(192,192,192,0.55)', lineHeight: 1.7, flex: 1, marginBottom: '1.25rem' }}>{post.excerpt}</p>
                <Link to={`/blog/${post.id}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#C0C0C0', fontSize: '0.8rem', fontWeight: 700, transition: 'gap 0.2s, color 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#E2E6EC'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#C0C0C0'; }}
                >
                  اقرأ المقال كاملاً <ArrowLeft size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'rgba(192,192,192,0.4)' }}>لم يتم العثور على مقالات تطابق بحثك.</div>
        )}
      </div>
    </div>
  );
}

import { useState, useCallback, Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, User, ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllPosts, DASHBOARD_PASSWORD, type BlogPost } from '../lib/blogStore';
import BlogDashboard from '../components/BlogDashboard';

const CAT_LABELS: Record<string, string> = {
  'الكل':             'الكل',
  'أخبار الصفحة':     'أخبار الصفحة',
  'مقالات قانونية':   'مقالات قانونية',
  'أخبار قانونية':    'أخبار قانونية',
  'المحتوى التعليمي': 'المحتوى التعليمي',
};

const CATEGORIES = ['الكل', 'أخبار الصفحة', 'مقالات قانونية', 'أخبار قانونية', 'المحتوى التعليمي'];

const GLASS: React.CSSProperties = {
  background: 'rgba(2,8,20,0.82)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1px solid rgba(0,80,160,0.35)',
  borderRadius: '1.25rem',
};

export default function Blog() {
  const [searchQuery, setSearchQuery]       = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [posts, setPosts]                   = useState<BlogPost[]>(() => getAllPosts());
  const [refresh, setRefresh]               = useState(0);

  // Dashboard gate
  const [showPwModal, setShowPwModal]   = useState(false);
  const [pw, setPw]                     = useState('');
  const [pwErr, setPwErr]               = useState('');
  const [showDash, setShowDash]         = useState(false);

  const handleRefresh = useCallback(() => {
    setPosts(getAllPosts());
    setRefresh(r => r + 1);
  }, []);

  const handlePwSubmit = () => {
    if (pw === DASHBOARD_PASSWORD) {
      setShowPwModal(false); setPw(''); setPwErr('');
      setShowDash(true);
    } else {
      setPwErr('كلمة المرور غير صحيحة');
    }
  };

  const parseDate = (d: string) => {
    // formats: dd/mm/yyyy or yyyy-mm-dd
    if (d.includes('-')) return new Date(d).getTime();
    const [day, month, year] = d.split('/');
    return new Date(Number(year), Number(month)-1, Number(day)).getTime();
  };

  const filteredPosts = posts
    .filter(p => {
      const ms = p.title.includes(searchQuery) || p.excerpt.includes(searchQuery);
      const mc = selectedCategory === 'الكل' || p.category === selectedCategory;
      return ms && mc;
    })
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));

  return (
    <Fragment>
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', background: 'transparent', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(192,192,192,0.4)', pointerEvents: 'none' }} />
            <input type="text" placeholder="ابحث عن مقال قانوني..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: 'rgba(0,31,63,0.4)', border: '1px solid rgba(192,192,192,0.12)', borderRadius: '0.875rem', padding: '0.875rem 3rem 0.875rem 1.25rem', color: '#E2E6EC', outline: 'none', fontSize: '0.9rem', transition: 'border-color 0.2s' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat, i) => {
              const active = selectedCategory === cat;
              return (
                <motion.button key={cat} onClick={() => setSelectedCategory(cat)}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  style={{
                    position: 'relative', padding: '0.55rem 1.35rem', borderRadius: '999px',
                    fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.25s',
                    border: '1px solid rgba(192,192,192,0.4)',
                    background: active ? 'linear-gradient(135deg,#C8CDD6,#C0C0C0)' : 'rgba(192,192,192,0.08)',
                    color: active ? '#001F3F' : 'rgba(200,205,214,0.85)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: active ? '0 0 0 1px rgba(192,192,192,0.1),0 4px 16px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.08)' : '0 2px 8px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                  }}>

                  {CAT_LABELS[cat]}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <motion.article key={post.id} layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ delay: i * 0.07 }}
                className="glass card-shine"
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', textDecoration: 'none' }}
                whileHover={{ y: -6 }}
                onClick={() => window.location.href = `/blog/${post.id}`}>
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img src={post.image} alt={post.title}
                    referrerPolicy="no-referrer"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                    <span style={{ display: 'inline-block', padding: '0.28rem 0.75rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, background: 'rgba(0,10,25,0.65)', backdropFilter: 'blur(12px)', border: '1px solid rgba(192,192,192,0.2)', color: 'rgba(220,224,230,0.85)', letterSpacing: '0.02em' }}>
                      {CAT_LABELS[post.category] ?? post.category}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 50%,rgba(0,13,26,0.6) 100%)' }} />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'rgba(192,192,192,0.5)', marginBottom: '0.875rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={12} />{post.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><User size={12} />{post.author}</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#F0F2F5', marginBottom: '0.75rem', lineHeight: 1.4 }}>{post.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(192,192,192,0.55)', lineHeight: 1.7, flex: 1, marginBottom: '1.25rem' }}>{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#C0C0C0', fontSize: '0.8rem', fontWeight: 700, transition: 'color 0.2s', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#E2E6EC'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#C0C0C0'}>
                    اقرأ المقال كاملاً <ArrowLeft size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '5rem 0', color: 'rgba(192,192,192,0.4)' }}>
            لم يتم العثور على مقالات تطابق بحثك.
          </motion.div>
        )}

        {/* ── Admin button bottom-left ── */}
        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-start' }}>
          <button onClick={() => { setShowPwModal(true); setPw(''); setPwErr(''); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.4rem 0.9rem', borderRadius: '999px',
              fontSize: '0.7rem', fontWeight: 600, fontFamily: 'inherit',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(192,192,192,0.1)',
              color: 'rgba(192,192,192,0.3)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(192,192,192,0.6)'; el.style.borderColor = 'rgba(192,192,192,0.25)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(192,192,192,0.3)'; el.style.borderColor = 'rgba(192,192,192,0.1)'; }}>
            <Lock size={10} />
            المدونة
          </button>
        </div>
      </div>

      {/* ── Password modal ── */}
      <AnimatePresence>
        {showPwModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowPwModal(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', zIndex: 200 }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 201, width: '90vw', maxWidth: '380px', ...GLASS, padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '2.2rem', height: '2.2rem', borderRadius: '0.625rem', background: 'rgba(0,40,100,0.6)', border: '1px solid rgba(0,80,160,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={14} style={{ color: '#93c5fd' }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#F8F9FA' }}>🔒 مغلق</h3>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(192,192,192,0.4)' }}>أدخل كلمة المرور للمتابعة</p>
                </div>
              </div>
              <input type="password" placeholder="كلمة المرور..." value={pw}
                onChange={e => { setPw(e.target.value); setPwErr(''); }}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handlePwSubmit(); } }}
                autoFocus
                style={{ width: '100%', background: 'rgba(0,20,50,0.55)', border: `1px solid ${pwErr ? 'rgba(248,113,113,0.5)' : 'rgba(192,192,192,0.15)'}`, borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#E2E6EC', outline: 'none', fontSize: '0.875rem', fontFamily: 'inherit', marginBottom: '0.5rem' }} />
              {pwErr && <p style={{ fontSize: '0.75rem', color: '#f87171', marginBottom: '0.5rem' }}>{pwErr}</p>}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <button onClick={handlePwSubmit}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg,#C8CDD6,#C0C0C0)', color: '#001F3F', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
                  دخول
                </button>
                <button onClick={() => setShowPwModal(false)}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(192,192,192,0.15)', color: 'rgba(192,192,192,0.7)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  إلغاء
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Dashboard ── */}
      <AnimatePresence>
        {showDash && (
          <BlogDashboard
            onClose={() => setShowDash(false)}
            onRefresh={handleRefresh} />
        )}
      </AnimatePresence>
    </Fragment>
  );
}

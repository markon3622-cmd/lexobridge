import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowRight, Share2, Bookmark, Trash2, Lock, Paperclip } from 'lucide-react';
import { getPostById, deletePost, DASHBOARD_PASSWORD, CAT_MAP } from '../lib/blogStore';

const GLASS: React.CSSProperties = {
  background: 'rgba(2,8,20,0.85)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1px solid rgba(0,80,160,0.35)',
  borderRadius: '1.25rem',
};

export default function BlogPost() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const post       = getPostById(Number(id));

  const [showDelModal, setShowDelModal] = useState(false);
  const [delPw, setDelPw]               = useState('');
  const [delErr, setDelErr]             = useState('');

  if (!post) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">المقال غير موجود</h1>
        <Link to="/blog" className="text-silver-300 hover:underline">العودة للمدونة</Link>
      </div>
    );
  }

  // Use static content for original posts, dynamic content for new ones
  const content = post.content;

  const handleDelete = () => {
    if (delPw !== DASHBOARD_PASSWORD) { setDelErr('كلمة المرور غير صحيحة'); return; }
    const ok = deletePost(post.id);
    if (ok) navigate('/blog');
    else { setDelErr('لا يمكن حذف المقالات الأصلية'); }
  };

  return (
    <div className="pt-32 pb-24 px-6" style={{ position: 'relative', zIndex: 1 }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">

          {/* Back */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-silver-400 hover:text-silver-300 mb-8 transition-colors"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(192,192,192,0.6)', marginBottom: '2rem', textDecoration: 'none', fontSize: '0.875rem' }}>
            <ArrowRight size={18} /> العودة للمدونة
          </Link>

          {/* Cover */}
          <div className="aspect-video w-full rounded-3xl overflow-hidden mb-8 border border-silver-300/20 shadow-2xl"
            style={{ borderRadius: '1.5rem', overflow: 'hidden', marginBottom: '2rem', border: '1px solid rgba(192,192,192,0.15)', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}>
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>

          {/* Meta */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(192,192,192,0.55)', fontSize: '0.875rem' }}>
              <Calendar size={16} style={{ color: 'rgba(192,192,192,0.4)' }} />{post.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(192,192,192,0.55)', fontSize: '0.875rem' }}>
              <User size={16} style={{ color: 'rgba(192,192,192,0.4)' }} />{post.author}
            </span>
            <span style={{ display: 'inline-block', padding: '0.3rem 0.9rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(192,192,192,0.08)', border: '1px solid rgba(192,192,192,0.2)', color: 'rgba(220,224,230,0.8)' }}>
              {CAT_MAP[post.category] ?? post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-silver-gradient"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.25, marginBottom: '2rem', background: 'linear-gradient(135deg,#F8F9FA,#C0C0C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {post.title}
          </h1>

          {/* Actions bar */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', paddingBlock: '1rem', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(192,192,192,0.55)', fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                <Share2 size={16} /> مشاركة
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(192,192,192,0.55)', fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                <Bookmark size={16} /> حفظ
              </button>
            </div>
            {/* Delete */}
            <button onClick={() => { setShowDelModal(true); setDelPw(''); setDelErr(''); }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(248,113,113,0.55)', fontSize: '0.75rem', background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)', borderRadius: '0.5rem', padding: '0.35rem 0.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                <Trash2 size={13} /> حذف المقال
              </button>
          </div>

          {/* Attachment */}
          {post.attachment && (
            <a href={post.attachment} download={post.attachmentName}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', borderRadius: '0.75rem', marginBottom: '2rem', background: 'rgba(0,40,100,0.3)', border: '1px solid rgba(0,80,160,0.3)', color: 'rgba(147,197,253,0.8)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
              <Paperclip size={14} /> تحميل الملف المرفق — {post.attachmentName}
            </a>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none leading-relaxed space-y-6"
            style={{ color: 'rgba(192,192,192,0.75)', lineHeight: 1.9, fontSize: '1rem' }}
            dangerouslySetInnerHTML={{ __html: content }} />

        </motion.div>
      </div>

      {/* Delete modal */}
      <AnimatePresence>
        {showDelModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDelModal(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 200 }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
              style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 201, width: '90vw', maxWidth: '360px', ...GLASS, padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Lock size={16} style={{ color: '#f87171' }} />
                <h3 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#F8F9FA' }}>🔒 مغلق</h3>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(192,192,192,0.5)', marginBottom: '1rem' }}>أدخل كلمة المرور لتأكيد الحذف — لا يمكن التراجع</p>
              <input type="password" placeholder="كلمة المرور..." value={delPw}
                onChange={e => { setDelPw(e.target.value); setDelErr(''); }}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleDelete(); } }}
                autoFocus
                style={{ width: '100%', background: 'rgba(0,20,50,0.55)', border: `1px solid ${delErr ? 'rgba(248,113,113,0.5)' : 'rgba(192,192,192,0.15)'}`, borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#E2E6EC', outline: 'none', fontSize: '0.875rem', fontFamily: 'inherit', marginBottom: '0.4rem' }} />
              {delErr && <p style={{ fontSize: '0.75rem', color: '#f87171', marginBottom: '0.5rem' }}>{delErr}</p>}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.875rem' }}>
                <button onClick={handleDelete}
                  style={{ flex: 1, padding: '0.7rem', borderRadius: '0.75rem', background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  حذف
                </button>
                <button onClick={() => setShowDelModal(false)}
                  style={{ flex: 1, padding: '0.7rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(192,192,192,0.15)', color: 'rgba(192,192,192,0.7)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  إلغاء
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

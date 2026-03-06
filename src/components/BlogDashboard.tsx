import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Upload, FileText, Eye, Trash2, ChevronDown, Image as ImageIcon, Lock } from 'lucide-react';
import {
  savePost, getDynamicPosts, deletePost,
  generateId, DASHBOARD_PASSWORD, CAT_MAP,
  type BlogPost,
} from '../lib/blogStore';

const CATEGORIES = ['أخبار الصفحة', 'مقالات قانونية', 'أخبار قانونية', 'المحتوى التعليمي', 'الكل'];

const GLASS: React.CSSProperties = {
  background: 'rgba(2,8,20,0.82)',
  backdropFilter: 'blur(28px) saturate(150%)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1px solid rgba(0,80,160,0.35)',
  borderRadius: '1.25rem',
};

const INPUT: React.CSSProperties = {
  width: '100%', background: 'rgba(0,20,50,0.55)',
  border: '1px solid rgba(192,192,192,0.12)',
  borderRadius: '0.75rem', padding: '0.75rem 1rem',
  color: '#E2E6EC', outline: 'none', fontSize: '0.875rem',
  fontFamily: 'inherit', transition: 'border-color 0.2s',
};

const LABEL: React.CSSProperties = {
  display: 'block', fontSize: '0.78rem', fontWeight: 600,
  color: 'rgba(192,192,192,0.55)', marginBottom: '0.4rem',
};

interface Props { onClose: () => void; onRefresh: () => void; }

type View = 'list' | 'add';

export default function BlogDashboard({ onClose, onRefresh }: Props) {
  const [view, setView]           = useState<View>('list');
  const [posts, setPosts]         = useState(() => getDynamicPosts());
  const [delPwModal, setDelPwModal] = useState<number | null>(null);
  const [delPw, setDelPw]         = useState('');
  const [delErr, setDelErr]       = useState('');

  // Form state
  const [title, setTitle]         = useState('');
  const [excerpt, setExcerpt]     = useState('');
  const [content, setContent]     = useState('');
  const [category, setCategory]   = useState('أخبار الصفحة');
  const [author, setAuthor]       = useState('مصطفى فؤاد');
  const [imagePreview, setImagePreview] = useState('');
  const [imageBase64, setImageBase64]   = useState('');
  const [attachBase64, setAttachBase64] = useState('');
  const [attachName, setAttachName]     = useState('');
  const [catOpen, setCatOpen]     = useState(false);
  const [saving, setSaving]       = useState(false);
  const [formErr, setFormErr]     = useState('');

  const imgRef    = useRef<HTMLInputElement>(null);
  const attachRef = useRef<HTMLInputElement>(null);

  // ── File readers ──
  const readFile = useCallback((file: File, cb: (b64: string) => void) => {
    const r = new FileReader();
    r.onload = () => cb(r.result as string);
    r.readAsDataURL(file);
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    readFile(f, b64 => { setImageBase64(b64); setImagePreview(b64); });
  };

  const handleAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setAttachName(f.name);
    readFile(f, b64 => setAttachBase64(b64));
  };

  // ── Save post ──
  const handleSave = () => {
    if (!title.trim())   { setFormErr('عنوان المقال مطلوب'); return; }
    if (!excerpt.trim()) { setFormErr('ملخص المقال مطلوب'); return; }
    if (!content.trim()) { setFormErr('نص المقال مطلوب'); return; }
    if (!imageBase64)    { setFormErr('صورة الغلاف مطلوبة'); return; }
    setFormErr('');
    setSaving(true);

    const now = new Date();
    const post: BlogPost = {
      id: generateId(),
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category,
      categoryLabel: CAT_MAP[category] ?? category,
      date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
      author: author.trim() || 'مكتب LEXBRIDGE',
      image: imageBase64,
      attachment: attachBase64 || undefined,
      attachmentName: attachName || undefined,
    };

    savePost(post);
    setPosts(getDynamicPosts());
    onRefresh();
    setSaving(false);
    setView('list');
    resetForm();
  };

  const resetForm = () => {
    setTitle(''); setExcerpt(''); setContent('');
    setCategory('أخبار الصفحة'); setAuthor('مصطفى فؤاد');
    setImageBase64(''); setImagePreview('');
    setAttachBase64(''); setAttachName('');
    setFormErr('');
  };

  // ── Delete ──
  const confirmDelete = () => {
    if (delPw !== DASHBOARD_PASSWORD) { setDelErr('كلمة المرور غير صحيحة'); return; }
    if (delPwModal !== null) {
      deletePost(delPwModal);
      setPosts(getDynamicPosts());
      onRefresh();
    }
    setDelPwModal(null); setDelPw(''); setDelErr('');
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 200 }}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, x: 60, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 60 }}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          zIndex: 201, width: '92vw', maxWidth: '680px',
          maxHeight: '88vh', overflowY: 'auto',
          ...GLASS,
          padding: '2rem',
          boxShadow: '0 0 80px rgba(0,40,120,0.35), 0 32px 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#F8F9FA' }}>
              {view === 'list' ? 'إدارة المدونة' : 'إضافة مقال جديد'}
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'rgba(192,192,192,0.45)', marginTop: '0.2rem' }}>
              {view === 'list' ? `${posts.length} مقال منشور` : 'أكمل البيانات ثم اضغط نشر'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {view === 'list' && (
              <button onClick={() => setView('add')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg,#C8CDD6,#C0C0C0)', color: '#001F3F', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
                <Plus size={14} /> مقال جديد
              </button>
            )}
            {view === 'add' && (
              <button onClick={() => { setView('list'); resetForm(); }}
                style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(192,192,192,0.15)', color: 'rgba(192,192,192,0.7)', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                رجوع
              </button>
            )}
            <button onClick={onClose}
              style={{ width: '2rem', height: '2rem', borderRadius: '0.625rem', border: '1px solid rgba(192,192,192,0.15)', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(192,192,192,0.5)', cursor: 'pointer' }}>
              <X size={15} />
            </button>
          </div>
        </div>

        {/* ══ LIST VIEW ══ */}
        {view === 'list' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {posts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(192,192,192,0.3)', fontSize: '0.875rem' }}>
                لا توجد مقالات منشورة بعد
              </div>
            )}
            {posts.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem', borderRadius: '0.875rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(192,192,192,0.08)' }}>
                <img src={p.image} alt="" style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.625rem', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#E8EAED', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</p>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(192,192,192,0.45)', marginTop: '0.2rem' }}>{p.categoryLabel} · {p.date}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                  <a href={`/blog/${p.id}`} target="_blank" rel="noreferrer"
                    style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', border: '1px solid rgba(192,192,192,0.12)', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(192,192,192,0.55)', textDecoration: 'none' }}>
                    <Eye size={13} />
                  </a>
                  <button onClick={() => { setDelPwModal(p.id); setDelPw(''); setDelErr(''); }}
                    style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', border: '1px solid rgba(248,113,113,0.2)', background: 'rgba(248,113,113,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(248,113,113,0.7)', cursor: 'pointer' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══ ADD VIEW ══ */}
        {view === 'add' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

            {/* Title */}
            <div>
              <label style={LABEL}>عنوان المقال *</label>
              <input type="text" placeholder="أدخل عنوان المقال..." value={title}
                onChange={e => setTitle(e.target.value)} style={INPUT} />
            </div>

            {/* Excerpt */}
            <div>
              <label style={LABEL}>الوصف / الملخص *</label>
              <textarea rows={2} placeholder="ملخص يظهر في قائمة المدونة..." value={excerpt}
                onChange={e => setExcerpt(e.target.value)} style={{ ...INPUT, resize: 'vertical' }} />
            </div>

            {/* Author + Category row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
              <div>
                <label style={LABEL}>اسم الكاتب</label>
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} style={INPUT} />
              </div>
              <div style={{ position: 'relative' }}>
                <label style={LABEL}>التصنيف</label>
                <button type="button" onClick={() => setCatOpen(o => !o)}
                  style={{ ...INPUT, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'right' }}>
                  <span>{category}</span>
                  <ChevronDown size={14} style={{ flexShrink: 0, opacity: 0.5, transform: catOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                <AnimatePresence>
                  {catOpen && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '0.25rem', borderRadius: '0.75rem', background: 'rgba(0,10,30,0.95)', border: '1px solid rgba(0,80,160,0.35)', zIndex: 10, overflow: 'hidden' }}>
                      {CATEGORIES.map(c => (
                        <button key={c} type="button"
                          onClick={() => { setCategory(c); setCatOpen(false); }}
                          style={{ display: 'block', width: '100%', textAlign: 'right', padding: '0.6rem 1rem', fontSize: '0.82rem', background: category === c ? 'rgba(192,192,192,0.08)' : 'transparent', color: category === c ? '#E8EAED' : 'rgba(192,192,192,0.6)', cursor: 'pointer', border: 'none', fontFamily: 'inherit', transition: 'background 0.15s' }}>
                          {c}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Cover image */}
            <div>
              <label style={LABEL}>صورة الغلاف *</label>
              <input ref={imgRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
              {imagePreview ? (
                <div style={{ position: 'relative', borderRadius: '0.75rem', overflow: 'hidden', aspectRatio: '16/7', cursor: 'pointer' }} onClick={() => imgRef.current?.click()}>
                  <img src={imagePreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0'}>
                    <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>تغيير الصورة</span>
                  </div>
                </div>
              ) : (
                <button type="button" onClick={() => imgRef.current?.click()}
                  style={{ ...INPUT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', aspectRatio: '16/5', color: 'rgba(192,192,192,0.4)', flexDirection: 'column', border: '1px dashed rgba(192,192,192,0.2)' }}>
                  <ImageIcon size={24} style={{ opacity: 0.4 }} />
                  <span style={{ fontSize: '0.78rem' }}>اضغط لرفع صورة الغلاف</span>
                </button>
              )}
            </div>

            {/* Attachment */}
            <div>
              <label style={LABEL}>ملف مرفق (اختياري)</label>
              <input ref={attachRef} type="file" onChange={handleAttach} style={{ display: 'none' }} />
              <button type="button" onClick={() => attachRef.current?.click()}
                style={{ ...INPUT, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: attachName ? '#E2E6EC' : 'rgba(192,192,192,0.4)' }}>
                <Upload size={15} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem' }}>{attachName || 'ارفع ملف PDF أو Word'}</span>
              </button>
            </div>

            {/* Article content */}
            <div>
              <label style={LABEL}>نص المقال الكامل * (يدعم HTML)</label>
              <textarea rows={10}
                placeholder="<p>اكتب نص المقال هنا...</p>&#10;<h2>عنوان فرعي</h2>&#10;<p>فقرة أخرى</p>"
                value={content} onChange={e => setContent(e.target.value)}
                style={{ ...INPUT, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.6 }} />
              <p style={{ fontSize: '0.68rem', color: 'rgba(192,192,192,0.3)', marginTop: '0.3rem' }}>
                يمكن استخدام HTML: &lt;p&gt; &lt;h2&gt; &lt;h3&gt; &lt;ul&gt; &lt;li&gt; &lt;strong&gt;
              </p>
            </div>

            {formErr && (
              <p style={{ fontSize: '0.78rem', color: '#f87171', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
                ⚠️ {formErr}
              </p>
            )}

            <button type="button" onClick={handleSave} disabled={saving}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.9rem', borderRadius: '0.875rem', background: 'linear-gradient(135deg,#C8CDD6,#C0C0C0)', color: '#001F3F', fontWeight: 800, fontSize: '0.95rem', cursor: saving ? 'not-allowed' : 'pointer', border: 'none', fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}>
              <FileText size={16} />
              {saving ? 'جاري النشر...' : 'نشر المقال'}
            </button>
          </div>
        )}
      </motion.div>

      {/* ══ Delete password modal ══ */}
      <AnimatePresence>
        {delPwModal !== null && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setDelPwModal(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
              style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 301, width: '90vw', maxWidth: '360px', ...GLASS, padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <Lock size={18} style={{ color: '#f87171' }} />
                <h3 style={{ fontWeight: 800, fontSize: '1rem', color: '#F8F9FA' }}>تأكيد الحذف</h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(192,192,192,0.55)', marginBottom: '1rem' }}>أدخل كلمة المرور لتأكيد حذف المقال</p>
              <input type="password" placeholder="كلمة المرور" value={delPw}
                onChange={e => { setDelPw(e.target.value); setDelErr(''); }}
                onKeyDown={e => e.key === 'Enter' && confirmDelete()}
                style={{ ...INPUT, marginBottom: '0.5rem' }} autoFocus />
              {delErr && <p style={{ fontSize: '0.75rem', color: '#f87171', marginBottom: '0.75rem' }}>{delErr}</p>}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <button onClick={confirmDelete}
                  style={{ flex: 1, padding: '0.7rem', borderRadius: '0.75rem', background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.35)', color: '#f87171', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  حذف
                </button>
                <button onClick={() => { setDelPwModal(null); setDelPw(''); setDelErr(''); }}
                  style={{ flex: 1, padding: '0.7rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(192,192,192,0.15)', color: 'rgba(192,192,192,0.7)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  إلغاء
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

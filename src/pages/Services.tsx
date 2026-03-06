import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Users, Briefcase, FileText, Globe, Gavel, Scale, ArrowLeft, X, Send } from 'lucide-react';
import { ToastContainer } from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { sendEmail, validateEmail, validateEgyptianPhone } from '../lib/emailjs';

interface BookingForm { name: string; phone: string; email: string; message: string; }
interface BookingErrors { name?: string; phone?: string; email?: string; }

const INPUT_BASE: React.CSSProperties = {
  width: '100%', background: 'rgba(0,31,63,0.5)', border: '1px solid rgba(192,192,192,0.12)',
  borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#E2E6EC',
  outline: 'none', fontSize: '0.875rem', transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'inherit',
};
const LABEL_STYLE: React.CSSProperties = {
  display: 'block', fontSize: '0.8rem', fontWeight: 600,
  color: 'rgba(192,192,192,0.6)', marginBottom: '0.5rem',
};

export default function Services() {
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const [modal, setModal] = useState<string | null>(null); // stores service title
  const [form, setForm] = useState<BookingForm>({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [sending, setSending] = useState(false);

  const set = (field: keyof BookingForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(f => ({ ...f, [field]: e.target.value }));
      setErrors(err => ({ ...err, [field]: undefined }));
    };

  function openModal(serviceTitle: string) {
    setModal(serviceTitle);
    setForm({ name: '', phone: '', email: '', message: '' });
    setErrors({});
  }

  function closeModal() { setModal(null); }

  function validate(): boolean {
    const errs: BookingErrors = {};
    if (!form.name.trim()) errs.name = 'الاسم مطلوب';
    if (!validateEmail(form.email)) errs.email = 'البريد الإلكتروني غير صحيح';
    if (!validateEgyptianPhone(form.phone))
      errs.phone = 'رقم الهاتف غير مكتمل — يرجى إدخال الرقم كاملاً';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      await sendEmail({
        name:    form.name,
        email:   form.email,
        phone:   form.phone,
        message: form.message || `طلب خدمة: ${modal}`,
        service: modal ?? '',
      });
      showSuccess('تم إرسال طلبك بنجاح ✓', 'سنتواصل معكم في أقرب وقت ممكن.');
      closeModal();
    } catch {
      showError('فشل الإرسال', 'حدث خطأ أثناء الإرسال. يرجى المحاولة مجدداً.');
    } finally {
      setSending(false);
    }
  }

  const errStyle = (f: keyof BookingErrors): React.CSSProperties => ({
    ...INPUT_BASE,
    ...(errors[f] ? { borderColor: 'rgba(248,113,113,0.55)', boxShadow: '0 0 0 3px rgba(248,113,113,0.1)' } : {}),
  });

  const services = [
    { title: 'القانون الجنائي', icon: <Shield size={28} />, desc: 'تمثيل قانوني قوي في قضايا الجنايات والجنح، مع التركيز على حماية حقوق المتهم وضمان محاكمة عادلة.', features: ['قضايا الأموال العامة', 'الجرائم الإلكترونية', 'قضايا المخدرات', 'النقض الجنائي'] },
    { title: 'القانون المدني', icon: <Briefcase size={28} />, desc: 'حل النزاعات المتعلقة بالعقود، الملكية، والتعويضات المدنية، وضمان تنفيذ الأحكام القضائية.', features: ['المنازعات العقارية', 'قضايا التعويضات', 'فسخ العقود', 'دعاوى صحة ونفاذ'] },
    { title: 'قضايا الأسرة', icon: <Users size={28} />, desc: 'تقديم الدعم القانوني في قضايا الأحوال الشخصية بخصوصية تامة وحلول تراعي الجوانب الإنسانية.', features: ['الخلع والطلاق', 'قضايا النفقة', 'حضانة الأطفال', 'إعلام الوراثة'] },
    { title: 'صياغة العقود', icon: <FileText size={28} />, desc: 'إعداد ومراجعة كافة أنواع العقود التجارية والمدنية لضمان أقصى حماية قانونية للأطراف.', features: ['عقود الشركات', 'عقود البيع والإيجار', 'اتفاقيات الشراكة', 'عقود العمل'] },
    { title: 'الاستشارات الأونلاين', icon: <Globe size={28} />, desc: 'خدمة استشارية سريعة وموثوقة عبر الإنترنت للعملاء من أي مكان في العالم.', features: ['استشارات فيديو', 'تقارير قانونية مكتوبة', 'مراجعة مستندات', 'دعم قانوني فوري'] },
    { title: 'القانون التجاري', icon: <Gavel size={28} />, desc: 'دعم الشركات والمؤسسات في كافة الجوانب القانونية المتعلقة بالنشاط التجاري والاستثمار.', features: ['تأسيس الشركات', 'العلامات التجارية', 'الإفلاس والتصفية', 'التحكيم التجاري'] },
  ];

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div style={{ paddingTop: '8rem', paddingBottom: '6rem', background: 'rgba(0,10,20,0.3)', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="section-badge mb-4">خبراتنا القانونية</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, marginTop: '1rem', marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
              خدمات قانونية <span className="text-silver-gradient">متكاملة</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ color: 'rgba(192,192,192,0.6)', maxWidth: '560px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.75 }}>
              نقدم مجموعة واسعة من الخدمات القانونية المتخصصة التي تلبي احتياجات الأفراد والشركات على حد سواء.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, ease: [0.22,1,0.36,1] }}
                className="glass glass-hover card-shine"
                style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column' }}
              >
                <div className="icon-box mb-6">{service.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F0F2F5', marginBottom: '0.75rem' }}>{service.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(192,192,192,0.6)', lineHeight: 1.75, marginBottom: '1.5rem', flex: 1 }}>{service.desc}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
                  {service.features.map((f, fi) => (
                    <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', color: 'rgba(192,192,192,0.55)' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(192,192,192,0.5)', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openModal(service.title)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(192,192,192,0.15)', color: '#C0C0C0', fontSize: '0.875rem', fontWeight: 700, transition: 'all 0.25s', background: 'transparent', cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(192,192,192,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(192,192,192,0.35)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(192,192,192,0.15)'; }}
                >
                  طلب الخدمة <ArrowLeft size={15} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Booking Modal ── */}
      <AnimatePresence>
        {modal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', zIndex: 100 }}
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              style={{
                position: 'fixed', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 101, width: '90vw', maxWidth: '480px',
                maxHeight: '90vh', overflowY: 'auto',
              }}
            >
              <div className="glass" style={{ padding: '2rem', border: '1px solid rgba(0,80,160,0.35)', boxShadow: '0 0 60px rgba(0,40,100,0.3), 0 24px 80px rgba(0,0,0,0.7)' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F8F9FA' }}>احجز استشارة</h3>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(192,192,192,0.5)', marginTop: '0.2rem' }}>{modal}</p>
                  </div>
                  <button onClick={closeModal}
                    style={{ width: '2rem', height: '2rem', borderRadius: '0.625rem', border: '1px solid rgba(192,192,192,0.15)', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(192,192,192,0.6)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(192,192,192,0.35)'; (e.currentTarget as HTMLElement).style.color = '#E8EAED'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(192,192,192,0.15)'; (e.currentTarget as HTMLElement).style.color = 'rgba(192,192,192,0.6)'; }}
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Name */}
                  <div>
                    <label style={LABEL_STYLE}>الاسم بالكامل</label>
                    <input type="text" placeholder="أدخل اسمك الكامل" name="from_name"
                      value={form.name} onChange={set('name')} style={errStyle('name')} />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={LABEL_STYLE}>رقم الهاتف</label>
                    <input type="tel" placeholder="01xxxxxxxxx" name="phone" dir="ltr"
                      value={form.phone} onChange={set('phone')} style={errStyle('phone')} />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={LABEL_STYLE}>البريد الإلكتروني</label>
                    <input type="email" placeholder="example@mail.com" name="from_email" dir="ltr"
                      value={form.email} onChange={set('email')} style={errStyle('email')} />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>

                  {/* Message */}
                  <div>
                    <label style={LABEL_STYLE}>تفاصيل إضافية (اختياري)</label>
                    <textarea rows={3} placeholder="أضف أي تفاصيل تود مشاركتها..." name="message"
                      value={form.message} onChange={set('message')}
                      style={{ ...INPUT_BASE, resize: 'vertical' }} />
                  </div>

                  <button type="submit" className="btn-primary" disabled={sending}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', marginTop: '0.25rem', opacity: sending ? 0.7 : 1, cursor: sending ? 'not-allowed' : 'pointer' }}>
                    {sending ? (
                      <>
                        <svg style={{ width: '1rem', height: '1rem', animation: 'spin-slow 1s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                        </svg>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>احجز استشارة <Send size={16} /></>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

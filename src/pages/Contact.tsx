import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { ToastContainer } from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { sendEmail, validateEmail, validateEgyptianPhone } from '../lib/emailjs';

interface FormState {
  name: string;
  phone: string;
  email: string;
  caseType: string;
  address: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const FIELD_STYLE = {
  width: '100%',
  background: 'rgba(0,31,63,0.5)',
  border: '1px solid rgba(192,192,192,0.12)',
  borderRadius: '0.75rem',
  padding: '0.75rem 1rem',
  color: '#E2E6EC',
  outline: 'none',
  fontSize: '0.875rem',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

export default function Contact() {
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<FormState>({
    name: '', phone: '', email: '', caseType: 'قانون جنائي', address: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(f => ({ ...f, [field]: e.target.value }));
      setErrors(err => ({ ...err, [field]: undefined }));
    };

  function validate(): boolean {
    const errs: FormErrors = {};
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
        address: form.address,
        service: form.caseType,
        message: form.message,
      });
      showSuccess('تم الإرسال بنجاح ✓', 'سنتواصل معكم في أقرب وقت ممكن.');
      setForm({ name: '', phone: '', email: '', caseType: 'قانون جنائي', address: '', message: '' });
      setErrors({});
    } catch {
      showError('فشل الإرسال', 'حدث خطأ أثناء الإرسال. يرجى المحاولة مجدداً.');
    } finally {
      setSending(false);
    }
  }

  const fieldStyle = (field: keyof FormErrors) => ({
    ...FIELD_STYLE,
    ...(errors[field] ? {
      borderColor: 'rgba(248,113,113,0.55)',
      boxShadow: '0 0 0 3px rgba(248,113,113,0.1)',
    } : {}),
  });

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div style={{ paddingTop: '8rem', paddingBottom: '6rem', background: 'transparent', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-badge mb-4">تواصل معنا</span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, marginTop: '1rem', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
              تواصل <span className="text-silver-gradient">معنا</span>
            </h1>
            <p style={{ color: 'rgba(192,192,192,0.6)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
              نحن هنا للإجابة على استفساراتكم وتقديم الدعم القانوني الذي تحتاجونه. لا تتردد في الاتصال بنا.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* ── Form ── */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="glass" style={{ padding: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '2rem', color: '#F0F2F5' }}>أرسل لنا رسالة</h3>

              <form ref={formRef} onSubmit={handleSubmit} noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(192,192,192,0.6)', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                      الاسم بالكامل
                    </label>
                    <input type="text" placeholder="أدخل اسمك" name="from_name"
                      value={form.name} onChange={set('name')}
                      style={fieldStyle('name')} />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(192,192,192,0.6)', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                      رقم الهاتف
                    </label>
                    <input type="tel" placeholder="01xxxxxxxxx" name="phone"
                      value={form.phone} onChange={set('phone')}
                      style={fieldStyle('phone')} dir="ltr" />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(192,192,192,0.6)', marginBottom: '0.5rem' }}>
                    البريد الإلكتروني
                  </label>
                  <input type="email" placeholder="example@mail.com" name="from_email"
                    value={form.email} onChange={set('email')}
                    style={fieldStyle('email')} dir="ltr" />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                {/* Case type + Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(192,192,192,0.6)', marginBottom: '0.5rem' }}>
                      نوع القضية
                    </label>
                    <select name="service_type"
                      value={form.caseType} onChange={set('caseType')}
                      style={FIELD_STYLE}>
                      <option>قانون جنائي</option>
                      <option>قانون مدني</option>
                      <option>قضايا أسرة</option>
                      <option>أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(192,192,192,0.6)', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                      العنوان
                    </label>
                    <input type="text" placeholder="المدينة / المنطقة" name="address"
                      value={form.address} onChange={set('address')}
                      style={FIELD_STYLE} />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(192,192,192,0.6)', marginBottom: '0.5rem' }}>
                    تفاصيل الاستفسار
                  </label>
                  <textarea rows={4} placeholder="اكتب تفاصيل قضيتك هنا..." name="message"
                    value={form.message} onChange={set('message')}
                    style={{ ...FIELD_STYLE, resize: 'vertical' }} />
                </div>

                <button type="submit" className="btn-primary" disabled={sending}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', opacity: sending ? 0.7 : 1, cursor: sending ? 'not-allowed' : 'pointer' }}>
                  {sending ? (
                    <>
                      <svg style={{ width: '1rem', height: '1rem', animation: 'spin-slow 1s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                      </svg>
                      جاري الإرسال...
                    </>
                  ) : (
                    <>إرسال الرسالة <Send size={16} /></>
                  )}
                </button>
              </form>
            </motion.div>

            {/* ── Info panel (unchanged) ── */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { Icon: Phone, title: 'اتصل بنا', text: '+201240033362', dir: 'ltr' as const },
                  { Icon: Mail,  title: 'البريد الإلكتروني', text: 'lexbridgez@gmail.com', dir: undefined },
                ].map(({ Icon, title, text, dir }) => (
                  <div key={title} className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.875rem', background: 'rgba(192,192,192,0.07)', border: '1px solid rgba(192,192,192,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.875rem', color: '#C0C0C0' }}>
                      <Icon size={20} />
                    </div>
                    <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem', color: '#F0F2F5' }}>{title}</h4>
                    <p dir={dir} style={{ color: 'rgba(192,192,192,0.6)', fontSize: '0.875rem' }}>{text}</p>
                  </div>
                ))}
              </div>

              <div className="glass" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.875rem', background: 'rgba(192,192,192,0.07)', border: '1px solid rgba(192,192,192,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#C0C0C0', marginTop: '2px' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem', color: '#F0F2F5' }}>موقعنا</h4>
                    <p style={{ color: 'rgba(192,192,192,0.6)', fontSize: '0.875rem', lineHeight: 1.6 }}>مصر، الإسكندرية، الشاطبي، شارع الزهراء.</p>
                  </div>
                </div>
                <div style={{ borderRadius: '1rem', overflow: 'hidden', aspectRatio: '16/9', position: 'relative', background: 'rgba(0,31,63,0.4)', border: '1px solid rgba(192,192,192,0.1)' }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(192,192,192,0.2)', fontSize: '0.875rem' }}>Google Maps Placeholder</div>
                  <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover" style={{ opacity: 0.12 }} referrerPolicy="no-referrer" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                {/* WhatsApp */}
                <a href="https://wa.me/201240033362" target="_blank" rel="noopener noreferrer" className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '1rem', borderRadius: '1rem', fontSize: '0.9rem', textDecoration: 'none' }}>
                  <MessageCircle size={20} />
                  تواصل عبر واتساب
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/lexbridge_/" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                    padding: '1rem', borderRadius: '1rem', fontSize: '0.9rem', fontWeight: 700,
                    textDecoration: 'none', cursor: 'pointer',
                    background: 'rgba(0, 20, 50, 0.55)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(80, 160, 255, 0.25)',
                    color: 'rgba(180, 220, 255, 0.9)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
                    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(100, 180, 255, 0.5)';
                    el.style.background = 'rgba(0, 35, 80, 0.7)';
                    el.style.boxShadow = '0 8px 28px rgba(0,60,150,0.35), 0 0 0 1px rgba(80,160,255,0.2)';
                    el.style.transform = 'translateY(-2px)';
                    el.style.color = 'rgba(210, 235, 255, 1)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(80, 160, 255, 0.25)';
                    el.style.background = 'rgba(0, 20, 50, 0.55)';
                    el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)';
                    el.style.transform = 'translateY(0)';
                    el.style.color = 'rgba(180, 220, 255, 0.9)';
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{ width: '20px', height: '20px', flexShrink: 0 }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
                  </svg>
                  انستاجرام
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

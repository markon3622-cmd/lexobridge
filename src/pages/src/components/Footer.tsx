import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const SocialBtn = ({ Icon }: { Icon: React.ElementType }) => (
  <a href="#"
    style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(192,192,192,0.05)', border: '1px solid rgba(192,192,192,0.1)', color: 'rgba(192,192,192,0.55)', transition: 'all 0.25s', cursor: 'pointer', textDecoration: 'none' }}
    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,64,128,0.4)'; el.style.borderColor = 'rgba(0,100,200,0.5)'; el.style.color = '#C0C0C0'; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 6px 20px rgba(0,64,128,0.3)'; }}
    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(192,192,192,0.05)'; el.style.borderColor = 'rgba(192,192,192,0.1)'; el.style.color = 'rgba(192,192,192,0.55)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
  >
    <Icon size={15} />
  </a>
);

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link to={to}
      style={{ color: 'rgba(192,192,192,0.5)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#E8EAED'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(192,192,192,0.5)'}
    >
      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0,100,200,0.5)', flexShrink: 0 }} />
      {children}
    </Link>
  </li>
);

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #000000 0%, #000810 100%)', borderTop: '1px solid rgba(192,192,192,0.07)', paddingTop: '5rem', paddingBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', bottom: 0, right: '10%', width: '400px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,31,63,0.2) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <img src="/logo.png" alt="LEXBRIDGE Logo" style={{ height: '2.5rem', width: 'auto', transition: 'filter 0.3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = 'drop-shadow(0 0 12px rgba(0,100,200,0.55))'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = 'none'}
              />
              <img src="/logtext.png" alt="LEXBRIDGE" style={{ height: '2rem', width: 'auto', opacity: 0.75 }} />
            </Link>
            <p style={{ color: 'rgba(192,192,192,0.5)', lineHeight: 1.8, fontSize: '0.875rem', maxWidth: '240px' }}>
              رابطك القانوني للعدالة. نحن نؤمن بأن الدفاع ليس مجرد مرافعة، بل هو إدارة معركة قانونية باحترافية عالية لحماية حقوقكم.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <SocialBtn Icon={Facebook} />
              <SocialBtn Icon={Twitter} />
              <SocialBtn Icon={Linkedin} />
              <SocialBtn Icon={Instagram} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(192,192,192,0.35)', marginBottom: '1.25rem' }}>روابط سريعة</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none' }}>
              <FooterLink to="/about">عن المكتب</FooterLink>
              <FooterLink to="/services">خدماتنا القانونية</FooterLink>
              <FooterLink to="/blog">المدونة القانونية</FooterLink>
              <FooterLink to="/ai-assistant">المحامي الذكي</FooterLink>
              <FooterLink to="/contact">اتصل بنا</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(192,192,192,0.35)', marginBottom: '1.25rem' }}>خدماتنا</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none' }}>
              {['القانون الجنائي','القانون المدني','قضايا الأسرة','صياغة العقود','الاستشارات الأونلاين'].map(s => (
                <FooterLink key={s} to="/services">{s}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(192,192,192,0.35)', marginBottom: '1.25rem' }}>معلومات التواصل</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none' }}>
              {[
                { Icon: MapPin, text: 'مصر، الإسكندرية، الشاطبي، شارع الزهراء' },
                { Icon: Phone, text: '+201240033362', dir: 'ltr' as const },
                { Icon: Mail, text: 'lexbridgez@gmail.com' },
              ].map(({ Icon, text, dir }) => (
                <li key={text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '0.5rem', background: 'rgba(0,31,63,0.5)', border: '1px solid rgba(0,100,200,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                    <Icon size={13} style={{ color: 'rgba(0,150,255,0.7)' }} />
                  </div>
                  <span dir={dir} style={{ color: 'rgba(192,192,192,0.55)', fontSize: '0.85rem', lineHeight: 1.6 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(192,192,192,0.06)', paddingTop: '1.75rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)', marginBottom: '0.6rem', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto 0.6rem' }}>
            إخلاء مسؤولية: المعلومات المعروضة في هذا الموقع هي لأغراض إعلامية فقط ولا تُعد استشارة قانونية ملزمة. يرجى التواصل مع محامٍ مختص لمناقشة تفاصيل قضيتكم.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(192,192,192,0.3)' }}>
            © {new Date().getFullYear()} LEXBRIDGE. جميع الحقوق محفوظة. تصميم وتطوير باحترافية.
          </p>
        </div>
      </div>
    </footer>
  );
}

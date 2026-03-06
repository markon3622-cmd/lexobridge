import { motion, useScroll, useTransform } from 'motion/react';
import { Scale, ArrowLeft, Shield, Users, Briefcase, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const services = [
    { title: 'القانون الجنائي', icon: <Shield size={22} />, desc: 'دفاع قوي وخبرة واسعة في القضايا الجنائية المعقدة.' },
    { title: 'القانون المدني', icon: <Briefcase size={22} />, desc: 'حماية حقوقكم المالية والعقارية والتعويضات المدنية.' },
    { title: 'قضايا الأسرة', icon: <Users size={22} />, desc: 'حلول قانونية إنسانية لقضايا الأحوال الشخصية والنفقة.' },
    { title: 'صياغة العقود', icon: <Scale size={22} />, desc: 'صياغة قانونية دقيقة تضمن حقوقكم وتمنع النزاعات.' },
  ];

  const stats = [
    { label: 'قضية ناجحة', value: '1500+' },
    { label: 'سنة خبرة', value: '25+' },
    { label: 'عميل راضٍ', value: '3000+' },
    { label: 'مستشار قانوني', value: '15+' },
  ];

  const whyUs = [
    { icon: <Award size={20} />, title: 'التميز والاحترافية', desc: 'نلتزم بأعلى معايير المهنية والسرية في التعامل مع كافة القضايا.' },
    { icon: <Scale size={20} />, title: 'استراتيجيات قانونية مبتكرة', desc: 'لا نكتفي بالحلول التقليدية، بل نبحث عن ثغرات قانونية تخدم مصلحة موكلينا.' },
    { icon: <Users size={20} />, title: 'فريق عمل متكامل', desc: 'نضم نخبة من المحامين والمستشارين في مختلف التخصصات القانونية.' },
  ];

  return (
    <div style={{ position: 'relative' }}>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Parallax background */}
        <motion.div style={{ y: heroY, position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop"
            alt="bg" referrerPolicy="no-referrer"
            style={{ width: '100%', height: '110%', objectFit: 'cover', opacity: 0.08, objectPosition: 'center top' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 50%, #000000 100%)' }} />
          {/* Hero glow */}
          <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,31,63,0.35) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          {/* Grid lines */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(192,192,192,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(192,192,192,0.025) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.4) 80%, transparent 100%)' }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 1.5rem', maxWidth: '56rem', margin: '0 auto' }}>
          {/* Logo */}
          <motion.div {...fadeUp(0)} style={{ marginBottom: '2rem', display: 'inline-flex', justifyContent: 'center' }}>
            <motion.img
              src="/logo.png" alt="LEXBRIDGE Logo"
              className="animate-float-y"
              style={{ height: 'clamp(6rem, 12vw, 10rem)', width: 'auto' }}
              whileHover={{ filter: 'drop-shadow(0 0 28px rgba(0,100,200,0.6))' }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          <motion.div {...fadeUp(0.12)} style={{ marginBottom: '1rem' }}>
            <span className="section-badge">مكتب LEXBRIDGE للمحاماة والاستشارات</span>
          </motion.div>

          <motion.h1 {...fadeUp(0.22)} style={{ fontSize: 'clamp(1.9rem, 5vw, 4.2rem)', fontWeight: 900, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
            الدفاع ليس مجرد مرافعة… <br />
            <span className="text-silver-gradient">بل إدارة معركة قانونية باحتراف.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.34)} style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(192,192,192,0.65)', marginBottom: '2.5rem', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            LEXBRIDGE: رابطك القانوني للعدالة. نقدم حلولاً قانونية مبتكرة وشاملة تحمي مصالحكم وتضمن حقوقكم.
          </motion.p>

          <motion.div {...fadeUp(0.46)} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
            <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>احجز استشارة</Link>
            <Link to="/ai-assistant" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              اسأل المحامي الذكي <ArrowLeft size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}
        >
          <div style={{ width: '1px', height: '44px', background: 'linear-gradient(180deg, transparent, rgba(192,192,192,0.5))', margin: '0 auto' }} />
        </motion.div>
      </section>

      {/* ═══ STATS ═══ */}
      <section style={{ padding: '4rem 1.5rem', borderTop: '1px solid rgba(192,192,192,0.06)', borderBottom: '1px solid rgba(192,192,192,0.06)', background: 'rgba(0,10,20,0.5)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }} className="md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ textAlign: 'center', padding: '2rem 1rem', borderLeft: i % 2 !== 0 ? '1px solid rgba(192,192,192,0.08)' : 'none' }}
                className={i >= 2 ? 'border-t border-white/5 md:border-t-0' : ''}
              >
                <div style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 900, background: 'linear-gradient(135deg, #F8F9FA, #C0C0C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(192,192,192,0.5)', marginTop: '0.4rem', letterSpacing: '0.04em' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>خبراتنا القانونية</span>
            <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', fontWeight: 900, marginTop: '1rem', letterSpacing: '-0.025em' }}>خدماتنا القانونية الرائدة</h2>
            <div style={{ width: '3rem', height: '2px', background: 'linear-gradient(90deg, transparent, #C0C0C0, transparent)', margin: '1rem auto 0', borderRadius: '99px' }} />
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {services.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, ease: [0.16,1,0.3,1] }}
                className="glass glass-hover card-shine"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div className="icon-box">{s.icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F8F9FA' }}>{s.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(192,192,192,0.6)', lineHeight: 1.75, flex: 1 }}>{s.desc}</p>
                <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'rgba(192,192,192,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#E8EAED'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(192,192,192,0.7)'}>
                  اقرأ المزيد <ArrowLeft size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-silver" style={{ margin: '0 1.5rem' }} />

      {/* ═══ WHY US ═══ */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ ease: [0.16,1,0.3,1] }}>
            <span className="section-badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>لماذا LEXBRIDGE</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, margin: '1rem 0 2.5rem', letterSpacing: '-0.025em' }}>
              لماذا يختار العملاء <span className="text-silver-gradient">LEXBRIDGE</span> لتمثيلهم قانونياً؟
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {whyUs.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass"
                  style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.25rem 1.5rem', transition: 'border-color 0.3s, background 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,100,200,0.35)'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,20,45,0.65)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(192,192,192,0.10)'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,10,20,0.55)'; }}
                >
                  <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.875rem', background: 'linear-gradient(135deg, #C8CDD6, #9BA3AF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#001F3F', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '1rem', color: '#F8F9FA', marginBottom: '0.3rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(192,192,192,0.6)', lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ position: 'relative' }}>
            <div style={{ borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid rgba(192,192,192,0.1)', boxShadow: '0 40px 100px rgba(0,0,0,0.7)', aspectRatio: '16/9' }}>
              <img src="/justice.jpg" alt="تمثال العدالة" className="w-full h-full object-cover" style={{ objectPosition: 'center center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.45) 100%)' }} />
            </div>
            <div className="glass hidden md:block" style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', padding: '1.25rem 1.75rem', minWidth: '200px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, background: 'linear-gradient(135deg, #F8F9FA, #C0C0C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, whiteSpace: 'nowrap' }}>التحول القانوني في مصر</div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="divider-silver" style={{ margin: '0 1.5rem' }} />

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass"
            style={{ padding: 'clamp(2.5rem,5vw,4rem)', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'rgba(0,15,32,0.6)', borderColor: 'rgba(0,100,200,0.2)' }}
          >
            <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,64,128,0.2) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,45,92,0.25) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.025em', position: 'relative' }}>هل تواجه تحدياً قانونياً؟</h2>
            <p style={{ fontSize: '1.05rem', color: 'rgba(192,192,192,0.6)', marginBottom: '2.5rem', lineHeight: 1.8, position: 'relative' }}>
              نحن هنا لنقف بجانبك ونحمي حقوقك. تواصل معنا الآن للحصول على استشارة فورية.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>تحدث معنا الآن</Link>
              <Link to="/services" className="btn-outline" style={{ textDecoration: 'none' }}>استكشف خدماتنا</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

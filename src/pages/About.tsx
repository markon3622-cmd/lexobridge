import { motion } from 'motion/react';
import { Scale, Target, Eye, Award, History } from 'lucide-react';

export default function About() {
  const timeline = [
    { year: '2026', title: 'التأسيس', desc: 'تأسيس المكتب وانطلاق الهوية القانونية الجديدة في قلب العاصمة.' },
    { year: '2026', title: 'إطلاق المنصة الرقمية', desc: 'تدشين المنصة الرقمية المتكاملة لتسهيل التواصل مع الموكلين وإدارة القضايا.' },
    { year: '2026', title: 'إدخال أدوات الذكاء الاصطناعي', desc: 'دمج تقنيات الذكاء الاصطناعي في عمليات التحليل القانوني واستقراء الأحكام.' },
    { year: '2026', title: 'التوسع في الاستشارات أونلاين', desc: 'إتاحة خدمات الاستشارات القانونية عن بُعد لتغطية كافة أنحاء الجمهورية والشرق الأوسط.' },
  ];

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', background: 'transparent', position: 'relative', zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ ease: [0.22,1,0.36,1] }}>
            <span className="section-badge mb-5">عن المكتب</span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, marginTop: '1rem', marginBottom: '2rem', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
              نحن <span className="text-silver-gradient">LEXBRIDGE</span> <br />رابطك القانوني للعدالة.
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'rgba(192,192,192,0.65)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              <p>تأسس مكتب LEXBRIDGE ليكون صرحاً قانونياً يجمع بين عراقة التقاليد القضائية المصرية وبين حداثة العصر الرقمي. نحن نؤمن بأن المحاماة ليست مجرد مهنة للدفاع، بل هي استراتيجية متكاملة لإدارة المعارك القانونية بذكاء وحكمة.</p>
              <p>تتبلور رؤيتنا في تقديم نموذج قانوني مؤسسي يتجاوز الحلول التقليدية، حيث نعتمد في تحليل القضايا على منهجيات علمية دقيقة واستراتيجيات استباقية.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2.5rem' }}>
              {[{ v: '25+', l: 'سنة خبرة تراكمية' }, { v: '15+', l: 'مستشار خبير' }, { v: '3k+', l: 'قضية ناجحة' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1.25rem', borderRadius: '1rem', background: 'rgba(0,31,63,0.4)', border: '1px solid rgba(192,192,192,0.1)' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, background: 'linear-gradient(135deg, #F0F2F5, #C0C0C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.v}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(192,192,192,0.5)', marginTop: '0.25rem', letterSpacing: '0.04em' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }} style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '4/5', borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid rgba(192,192,192,0.12)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
              <img src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop" alt="Founder" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,13,26,0.7) 100%)' }} />
            </div>
            <div className="glass" style={{ position: 'absolute', bottom: '-1.25rem', left: '-1.25rem', padding: '1.25rem 1.75rem' }}>
              <div style={{ fontWeight: 800, color: '#F0F2F5', marginBottom: '0.2rem' }}>المستشار/ مصطفي فؤاد</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(192,192,192,0.6)' }}>المؤسس والشريك المدير</div>
            </div>
          </motion.div>
        </div>

        <div className="divider-silver mb-24" />

        {/* Philosophy cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {[
            { icon: <Target size={36} />, title: 'الريادة التكنولوجية', desc: 'ندرك في LEXBRIDGE أن المستقبل ينتمي لمن يمتلك أدواته، ولذلك قمنا بدمج تقنيات الذكاء الاصطناعي والتحليل الرقمي في منظومتنا القانونية.' },
            { icon: <Eye size={36} />, title: 'المسؤولية المهنية', desc: 'إن احترافيتنا تنبع من إيماننا العميق بأن العدالة هي الركيزة الأساسية لاستقرار المجتمع وازدهار الاستثمار.' },
          ].map((card, i) => (
            <motion.div key={i} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass card-shine" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(192,192,192,0.04) 0%, transparent 70%)', borderRadius: '50%', transform: 'translate(30px, -30px)' }} />
              <div style={{ color: '#C0C0C0', marginBottom: '1.5rem' }}>{card.icon}</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#F0F2F5' }}>{card.title}</h3>
              <p style={{ color: 'rgba(192,192,192,0.6)', lineHeight: 1.8 }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <History style={{ color: '#C0C0C0', margin: '0 auto 1rem' }} size={36} />
            <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em' }}>انطلاقة LEXBRIDGE</h2>
          </div>
          <div style={{ borderRight: '1px solid rgba(192,192,192,0.15)', paddingRight: '2rem', marginRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {timeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ position: 'relative' }}>
                <div className="timeline-dot" style={{ position: 'absolute', top: '4px', right: 'calc(-2rem - 8px)' }} />
                <div style={{ fontSize: '1.5rem', fontWeight: 900, background: 'linear-gradient(135deg, #F0F2F5, #C0C0C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.4rem' }}>{item.year}</div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F0F2F5', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p style={{ color: 'rgba(192,192,192,0.6)', maxWidth: '480px', lineHeight: 1.75, fontSize: '0.9rem' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Philosophy quote */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ background: 'linear-gradient(135deg, rgba(0,46,92,0.4) 0%, rgba(0,31,63,0.5) 100%)', border: '1px solid rgba(192,192,192,0.12)', borderRadius: '1.5rem', padding: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center' }}>
          <Award style={{ color: '#C0C0C0', margin: '0 auto 1.5rem' }} size={48} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.5rem' }}>فلسفتنا القانونية</h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(192,192,192,0.65)', fontStyle: 'italic', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
            "العدالة ليست غاية نصل إليها، بل هي ممارسة يومية تتطلب شجاعة في الحق ودقة في التنفيذ."
          </p>
        </motion.div>
      </div>
    </div>
  );
}

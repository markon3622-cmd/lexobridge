import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scale, ChevronDown, Calculator, Clock, FileText,
  AlertCircle, CheckCircle, XCircle, Loader2, Printer,
  Copy, Check, Users, Gavel, TrendingUp, HelpCircle,
  ArrowLeft, Building
} from 'lucide-react';
import { Link } from 'react-router-dom';

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function Disclaimer({ text }: { text: string }) {
  return (
    <div className="flex gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mt-4">
      <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
      <p className="text-xs text-amber-300/80 leading-relaxed">{text}</p>
    </div>
  );
}

function ResultCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-6 rounded-2xl border border-silver-300/20 bg-white/5">
      {children}
    </motion.div>
  );
}

function InputField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-silver-300">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full bg-navy-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-silver-300 outline-none transition-colors placeholder-white/20";
const selectClass = "w-full bg-navy-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-silver-300 outline-none transition-colors";

function CalcButton({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <button onClick={onClick} disabled={loading}
      className="w-full btn-silver py-3 flex items-center justify-center gap-2 disabled:opacity-50">
      {loading ? <><Loader2 size={16} className="animate-spin" /> جاري الحساب...</> : <><Calculator size={16} /> احسب الآن</>}
    </button>
  );
}

// Tool 1
function NafaqaCalc() {
  const [form, setForm] = useState({ income: '', children: '0', housing: 'ملك', wifeWorking: 'لا', standard: 'متوسط', privateSchool: 'لا' });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const calculate = async () => {
    if (!form.income) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const income = parseFloat(form.income);
    const net = income * 0.85;
    const children = parseInt(form.children);
    const basePerc = [20, 25, 30, 35, 40][Math.min(children, 4)];
    let adj = 0;
    if (form.housing === 'إيجار') adj += 10;
    if (form.standard === 'مرتفع') adj += 5;
    if (form.privateSchool === 'نعم') adj += 5;
    if (form.wifeWorking === 'نعم') adj -= 5;
    const finalPerc = Math.min(basePerc + adj, 45);
    const nafaqa = net * (finalPerc / 100);
    setResult({ net: net.toFixed(0), perc: finalPerc, nafaqa: nafaqa.toFixed(0), basePerc, adj });
    setLoading(false);
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="الدخل الشهري (ج.م)"><input type="number" className={inputClass} placeholder="مثال: 15000" value={form.income} onChange={e => setForm({ ...form, income: e.target.value })} /></InputField>
        <InputField label="عدد الأطفال"><select className={selectClass} value={form.children} onChange={e => setForm({ ...form, children: e.target.value })}>{[0,1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}</select></InputField>
        <InputField label="نوع السكن"><select className={selectClass} value={form.housing} onChange={e => setForm({ ...form, housing: e.target.value })}><option>ملك</option><option>إيجار</option><option>مع أهل الزوج</option></select></InputField>
        <InputField label="هل الزوجة تعمل؟"><select className={selectClass} value={form.wifeWorking} onChange={e => setForm({ ...form, wifeWorking: e.target.value })}><option>لا</option><option>نعم</option></select></InputField>
        <InputField label="المستوى المعيشي"><select className={selectClass} value={form.standard} onChange={e => setForm({ ...form, standard: e.target.value })}><option>متوسط</option><option>مرتفع</option></select></InputField>
        <InputField label="مدارس خاصة؟"><select className={selectClass} value={form.privateSchool} onChange={e => setForm({ ...form, privateSchool: e.target.value })}><option>لا</option><option>نعم</option></select></InputField>
      </div>
      <CalcButton onClick={calculate} loading={loading} />
      {result && (
        <ResultCard>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-white/5 rounded-xl"><div className="text-2xl font-black text-silver-300">{Number(result.net).toLocaleString()}</div><div className="text-xs text-silver-400 mt-1">صافي الدخل</div></div>
            <div className="text-center p-4 bg-white/5 rounded-xl"><div className="text-2xl font-black text-silver-300">{result.perc}%</div><div className="text-xs text-silver-400 mt-1">النسبة النهائية</div></div>
            <div className="text-center p-4 bg-silver-300/10 border border-silver-300/30 rounded-xl"><div className="text-2xl font-black text-silver-200">{Number(result.nafaqa).toLocaleString()}</div><div className="text-xs text-silver-300 mt-1">النفقة التقديرية</div></div>
          </div>
          <div className="text-xs text-silver-400 space-y-1 bg-white/5 rounded-xl p-4">
            <div>• نسبة أساسية: {result.basePerc}%</div>
            {result.adj !== 0 && <div>• تعديلات: {result.adj > 0 ? '+' : ''}{result.adj}%</div>}
            <div>• الحد الأقصى المطبق: 45%</div>
          </div>
          <Disclaimer text="التقدير استرشادي وفقاً لقضاء محكمة الأسرة. القيمة النهائية تخضع لتقدير المحكمة بناءً على ظروف القضية." />
        </ResultCard>
      )}
    </div>
  );
}

// Tool 2
function ArrearsCalc() {
  const [form, setForm] = useState({ monthly: '', months: '', hasIncrease: 'لا', increasePerc: '' });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const calculate = async () => {
    if (!form.monthly || !form.months) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const monthly = parseFloat(form.monthly);
    const months = parseInt(form.months);
    const base = monthly * months;
    let adjusted = base;
    if (form.hasIncrease === 'نعم' && form.increasePerc) adjusted = base + (base * parseFloat(form.increasePerc) / 100);
    setResult({ base: base.toFixed(0), adjusted: adjusted.toFixed(0) });
    setLoading(false);
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="النفقة الشهرية (ج.م)"><input type="number" className={inputClass} placeholder="مثال: 3000" value={form.monthly} onChange={e => setForm({ ...form, monthly: e.target.value })} /></InputField>
        <InputField label="عدد الأشهر غير المدفوعة"><input type="number" className={inputClass} placeholder="مثال: 12" value={form.months} onChange={e => setForm({ ...form, months: e.target.value })} /></InputField>
        <InputField label="هل صدر حكم بزيادة؟"><select className={selectClass} value={form.hasIncrease} onChange={e => setForm({ ...form, hasIncrease: e.target.value })}><option>لا</option><option>نعم</option></select></InputField>
        {form.hasIncrease === 'نعم' && <InputField label="نسبة الزيادة (%)"><input type="number" className={inputClass} placeholder="مثال: 20" value={form.increasePerc} onChange={e => setForm({ ...form, increasePerc: e.target.value })} /></InputField>}
      </div>
      <CalcButton onClick={calculate} loading={loading} />
      {result && (
        <ResultCard>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 bg-white/5 rounded-xl"><div className="text-2xl font-black text-silver-300">{Number(result.base).toLocaleString()}</div><div className="text-xs text-silver-400 mt-1">المبلغ الأصلي</div></div>
            <div className="text-center p-4 bg-silver-300/10 border border-silver-300/30 rounded-xl"><div className="text-2xl font-black text-silver-200">{Number(result.adjusted).toLocaleString()}</div><div className="text-xs text-silver-300 mt-1">إجمالي المتجمد</div></div>
          </div>
          <Disclaimer text="يحق للمحكمة الأمر بالحبس عند الامتناع عن سداد النفقة المتجمدة. يُنصح بتقديم دعوى تنفيذ فورية." />
        </ResultCard>
      )}
    </div>
  );
}

// Tool 3
function MahrCalc() {
  const [form, setForm] = useState({ amount: '', marriageYear: '', divorceYear: '', paid: '' });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const calculate = async () => {
    if (!form.amount || !form.marriageYear || !form.divorceYear) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const amount = parseFloat(form.amount);
    const years = parseInt(form.divorceYear) - parseInt(form.marriageYear);
    const fv = amount * Math.pow(1.07, years);
    const paid = parseFloat(form.paid || '0');
    const due = fv - paid;
    setResult({ fv: fv.toFixed(0), due: Math.max(due, 0).toFixed(0), years, original: amount });
    setLoading(false);
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="قيمة المهر الأصلي (ج.م)"><input type="number" className={inputClass} placeholder="مثال: 50000" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} /></InputField>
        <InputField label="سنة الزواج"><input type="number" className={inputClass} placeholder="مثال: 2015" value={form.marriageYear} onChange={e => setForm({ ...form, marriageYear: e.target.value })} /></InputField>
        <InputField label="سنة الطلاق"><input type="number" className={inputClass} placeholder="مثال: 2024" value={form.divorceYear} onChange={e => setForm({ ...form, divorceYear: e.target.value })} /></InputField>
        <InputField label="المبلغ المدفوع مسبقاً (اختياري)"><input type="number" className={inputClass} placeholder="مثال: 10000" value={form.paid} onChange={e => setForm({ ...form, paid: e.target.value })} /></InputField>
      </div>
      <CalcButton onClick={calculate} loading={loading} />
      {result && (
        <ResultCard>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-white/5 rounded-xl"><div className="text-lg font-black text-silver-300">{Number(result.original).toLocaleString()}</div><div className="text-xs text-silver-400 mt-1">الأصلي</div></div>
            <div className="text-center p-3 bg-white/5 rounded-xl"><div className="text-lg font-black text-silver-300">{Number(result.fv).toLocaleString()}</div><div className="text-xs text-silver-400 mt-1">القيمة المعدلة</div></div>
            <div className="text-center p-3 bg-silver-300/10 border border-silver-300/30 rounded-xl"><div className="text-lg font-black text-silver-200">{Number(result.due).toLocaleString()}</div><div className="text-xs text-silver-300 mt-1">المستحق</div></div>
          </div>
          <div className="text-xs text-silver-400 bg-white/5 rounded-xl p-3">احتساب بمعدل تضخم 7% سنوياً لمدة {result.years} سنة</div>
          <Disclaimer text="القيمة النهائية تخضع لتقدير المحكمة ولا تُعد التزاماً قانونياً مؤكداً." />
        </ResultCard>
      )}
    </div>
  );
}

// Tool 4
function PrescriptionCalc() {
  const [form, setForm] = useState({ caseType: 'مدني عادي', date: '' });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const limits: Record<string, number> = { 'مدني عادي': 15, 'شيك': 3, 'تعويض': 3, 'جنحة': 3, 'جناية': 10 };
  const calculate = async () => {
    if (!form.date) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const diffYears = (Date.now() - new Date(form.date).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    const limit = limits[form.caseType];
    const expired = diffYears >= limit;
    setResult({ diffYears: diffYears.toFixed(1), limit, expired, remaining: (limit - diffYears).toFixed(1) });
    setLoading(false);
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="نوع القضية"><select className={selectClass} value={form.caseType} onChange={e => setForm({ ...form, caseType: e.target.value })}>{Object.keys(limits).map(k => <option key={k}>{k}</option>)}</select></InputField>
        <InputField label="تاريخ الواقعة"><input type="date" className={inputClass} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></InputField>
      </div>
      <CalcButton onClick={calculate} loading={loading} />
      {result && (
        <ResultCard>
          <div className="flex items-center gap-4 mb-4">
            {result.expired ? <XCircle size={40} className="text-red-400 shrink-0" /> : <CheckCircle size={40} className="text-green-400 shrink-0" />}
            <div>
              <div className={cn('text-xl font-black', result.expired ? 'text-red-400' : 'text-green-400')}>
                {result.expired ? 'سقط الحق بالتقادم' : 'لا يزال الحق قائماً'}
              </div>
              <div className="text-sm text-silver-400">
                {result.expired ? `مرّ ${result.diffYears} سنة — تجاوز حد التقادم (${result.limit} سنة)` : `مرّ ${result.diffYears} سنة — متبقي ${result.remaining} سنة`}
              </div>
            </div>
          </div>
          <Disclaimer text="حساب تقريبي. قد يتوقف التقادم بسبب إجراءات قضائية أو اعتراف — راجع محامياً للتأكيد." />
        </ResultCard>
      )}
    </div>
  );
}

// Tool 5
function DismissalCalc() {
  const [form, setForm] = useState({ salary: '', years: '', contractType: 'غير محدد', reasonProvided: 'نعم' });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const calculate = async () => {
    if (!form.salary || !form.years) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const salary = parseFloat(form.salary);
    const years = parseFloat(form.years);
    let base = salary * 2 * years;
    let extra = form.reasonProvided === 'لا' ? salary * 3 : 0;
    setResult({ comp: (base + extra).toFixed(0), extra: extra.toFixed(0), base: base.toFixed(0) });
    setLoading(false);
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="الراتب الشهري (ج.م)"><input type="number" className={inputClass} placeholder="مثال: 8000" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} /></InputField>
        <InputField label="سنوات الخدمة"><input type="number" className={inputClass} placeholder="مثال: 5" value={form.years} onChange={e => setForm({ ...form, years: e.target.value })} /></InputField>
        <InputField label="نوع العقد"><select className={selectClass} value={form.contractType} onChange={e => setForm({ ...form, contractType: e.target.value })}><option>غير محدد</option><option>محدد</option></select></InputField>
        <InputField label="هل أُعطي سبب للفصل؟"><select className={selectClass} value={form.reasonProvided} onChange={e => setForm({ ...form, reasonProvided: e.target.value })}><option>نعم</option><option>لا</option></select></InputField>
      </div>
      <CalcButton onClick={calculate} loading={loading} />
      {result && (
        <ResultCard>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 bg-white/5 rounded-xl"><div className="text-xl font-black text-silver-300">{Number(result.base).toLocaleString()}</div><div className="text-xs text-silver-400 mt-1">التعويض الأساسي</div></div>
            <div className="text-center p-4 bg-silver-300/10 border border-silver-300/30 rounded-xl"><div className="text-xl font-black text-silver-200">{Number(result.comp).toLocaleString()}</div><div className="text-xs text-silver-300 mt-1">إجمالي التعويض</div></div>
          </div>
          {parseFloat(result.extra) > 0 && <div className="text-xs text-amber-300 bg-amber-500/10 rounded-xl p-3 mb-2">+ {Number(result.extra).toLocaleString()} ج.م تعويض إضافي لعدم إبداء سبب مشروع</div>}
          <Disclaimer text="تقدير استرشادي بموجب قانون العمل المصري. التعويض النهائي يحدده القضاء." />
        </ResultCard>
      )}
    </div>
  );
}

// Tool 6
function CaseStrength() {
  const questions = [
    { id: 'contract', text: 'هل يوجد عقد أو مستند رسمي؟', weight: 2, isNegative: false },
    { id: 'witnesses', text: 'هل يوجد شهود؟', weight: 2, isNegative: false },
    { id: 'notice', text: 'هل تم إرسال إنذار رسمي؟', weight: 2, isNegative: false },
    { id: 'written', text: 'هل هناك دليل مكتوب؟', weight: 2, isNegative: false },
    { id: 'time', text: 'هل مرّ أكثر من 3 سنوات على الواقعة؟', weight: -3, isNegative: true },
  ];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const handleAnswer = (id: string, val: string) => {
    const newAnswers = { ...answers, [id]: val };
    setAnswers(newAnswers);
    if (step < questions.length - 1) setStep(step + 1);
  };

  const calculate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    let score = 0;
    questions.forEach(q => { if (answers[q.id] === 'نعم') score += q.weight; });
    let level, color, rec;
    if (score <= 3) { level = 'موقف ضعيف'; color = 'text-red-400'; rec = 'يُنصح بالتسوية الودية أو تعزيز الأدلة قبل رفع الدعوى.'; }
    else if (score <= 6) { level = 'موقف متوسط'; color = 'text-amber-400'; rec = 'هناك فرصة معقولة. يُنصح باستشارة محامٍ لتقييم نقاط القوة والضعف.'; }
    else { level = 'موقف قوي'; color = 'text-green-400'; rec = 'ملفك يبدو قوياً. يُنصح بالمضي قدماً بعد مراجعة قانونية متخصصة.'; }
    setResult({ score, level, color, rec });
    setLoading(false);
  };

  const reset = () => { setAnswers({}); setResult(null); setStep(0); };

  return (
    <div className="space-y-4">
      {!result ? (
        <>
          <div className="space-y-3">
            {questions.map((q, i) => (
              <motion.div key={q.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: i <= step ? 1 : 0.3, x: 0 }}
                className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-silver-300 mb-3 font-medium">{i + 1}. {q.text}</p>
                <div className="flex gap-3">
                  {['نعم', 'لا'].map(val => (
                    <button key={val} onClick={() => i <= step && handleAnswer(q.id, val)}
                      className={cn('flex-1 py-2 rounded-lg text-sm font-bold transition-all',
                        answers[q.id] === val ? 'bg-silver-300 text-navy-900' : 'bg-white/5 text-silver-400 hover:bg-white/10')}>
                      {val}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          {Object.keys(answers).length === questions.length && <CalcButton onClick={calculate} loading={loading} />}
        </>
      ) : (
        <ResultCard>
          <div className="text-center mb-6">
            <div className={cn('text-4xl font-black mb-2', result.color)}>{result.level}</div>
            <div className="text-5xl font-black text-silver-300 mb-1">{result.score}</div>
            <div className="text-xs text-silver-400">نقاط من أصل 8</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl text-sm text-silver-300 leading-relaxed mb-4">{result.rec}</div>
          <button onClick={reset} className="btn-outline w-full py-2 text-sm border-silver-300/30">إعادة التقييم</button>
          <Disclaimer text="هذا التقييم استرشادي فقط ولا يغني عن الاستشارة القانونية المتخصصة." />
        </ResultCard>
      )}
    </div>
  );
}

// Tool 7
function LegalNoticeGen() {
  const [form, setForm] = useState({ name: '', nationalId: '', address: '', opponent: '', reason: '', amount: '' });
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const generate = async () => {
    if (!form.name || !form.opponent || !form.reason) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const today = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    setOutput(`إنـــذار قانوني رسمي\n═══════════════════════════════\n\nالتاريخ: ${today}\n\nأنا المُنذِر / ${form.name}\nالرقم القومي: ${form.nationalId || '................'}\nالمقيم في: ${form.address || '................'}\n\nأُنذِر السيد / ${form.opponent}\n\nتحريراً لهذا الإنذار القانوني الرسمي بخصوص:\n${form.reason}${form.amount ? `\n\nوالمبلغ المطالب به: ${Number(form.amount).toLocaleString()} جنيه مصري.` : ''}\n\nوعليه، أطلب منكم التزام حقوقي القانونية المشروعة خلال خمسة عشر يوماً من تاريخ إعلان هذا الإنذار، وإلا سيكون لي الحق في اتخاذ كافة الإجراءات القانونية المقررة بما فيها رفع دعوى قضائية وطلب التعويض.\n\nوقد حُرِّر هذا الإنذار إثباتاً للحق وقطعاً للحجة.\n\nالمُنذِر\n${form.name}\n═══════════════════════════════\nإعداد: مكتب LEXBRIDGE للمحاماة والاستشارات القانونية`);
    setLoading(false);
  };
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="اسم المُنذِر (أنت)"><input type="text" className={inputClass} placeholder="الاسم بالكامل" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></InputField>
        <InputField label="الرقم القومي (اختياري)"><input type="text" className={inputClass} placeholder="14 رقم" value={form.nationalId} onChange={e => setForm({ ...form, nationalId: e.target.value })} /></InputField>
        <InputField label="عنوان المُنذِر"><input type="text" className={inputClass} placeholder="العنوان التفصيلي" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></InputField>
        <InputField label="اسم المُنذَر (الخصم)"><input type="text" className={inputClass} placeholder="اسم الطرف الآخر" value={form.opponent} onChange={e => setForm({ ...form, opponent: e.target.value })} /></InputField>
        <InputField label="المبلغ المطالب به (اختياري)"><input type="number" className={inputClass} placeholder="بالجنيه المصري" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} /></InputField>
      </div>
      <InputField label="سبب الإنذار"><textarea rows={3} className={inputClass} placeholder="اكتب سبب الإنذار بالتفصيل..." value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} /></InputField>
      <button onClick={generate} disabled={loading} className="w-full btn-silver py-3 flex items-center justify-center gap-2">
        {loading ? <><Loader2 size={16} className="animate-spin" /> جاري الإنشاء...</> : <><FileText size={16} /> إنشاء الإنذار</>}
      </button>
      {output && (
        <ResultCard>
          <pre className="text-xs text-silver-300 leading-relaxed whitespace-pre-wrap font-mono bg-navy-900 p-4 rounded-xl mb-4 border border-white/10 overflow-auto max-h-64">{output}</pre>
          <div className="flex gap-3">
            <button onClick={copy} className="flex-1 btn-silver py-2 text-sm flex items-center justify-center gap-2">{copied ? <><Check size={14} /> تم النسخ!</> : <><Copy size={14} /> نسخ النص</>}</button>
            <button onClick={() => window.print()} className="flex-1 btn-outline py-2 text-sm flex items-center justify-center gap-2 border-silver-300/30"><Printer size={14} /> طباعة</button>
          </div>
          <Disclaimer text="هذا النص مسودة أولية للاسترشاد. يجب مراجعة محامٍ قبل إرسال أي إنذار قانوني رسمي." />
        </ResultCard>
      )}
    </div>
  );
}

// Tool 8
function LawsuitDraft() {
  const [form, setForm] = useState({ courtType: 'محكمة الأسرة', plaintiff: '', defendant: '', facts: '', requests: '' });
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const generate = async () => {
    if (!form.plaintiff || !form.defendant || !form.facts || !form.requests) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const today = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    setOutput(`صحيفة دعوى قضائية (مسودة أولية)\n═══════════════════════════════════\n\nإلى السيد المستشار / رئيس ${form.courtType}\n                            تحية طيبة وبعد،\n\nمقدمه لسيادتكم:\nالطـرف الأول (المدعي): ${form.plaintiff}\n\nضـد\n\nالطـرف الثاني (المدعى عليه): ${form.defendant}\n\n═══════════════════════════════════\nأولاً: وقائع الدعوى\n═══════════════════════════════════\n${form.facts}\n\n═══════════════════════════════════\nثانياً: الأساس القانوني\n═══════════════════════════════════\nتأسيساً على أحكام القانون المدني المصري وما يقرره من حقوق، وعلى مبدأ المسؤولية التعاقدية والتقصيرية، وما استقر عليه قضاء محكمة النقض من مبادئ راسخة في هذا الشأن.\n\n═══════════════════════════════════\nثالثاً: الطلبات\n═══════════════════════════════════\nلذلك يلتمس المدعي من عدالة المحكمة الموقرة الحكم بـ:\n${form.requests}\n\nوأحتفظ بحق تقديم مذكرات وحوافظ مستندات لاحقاً.\n\nتحريراً في: ${today}\nالمدعي / ${form.plaintiff}\n\n═══════════════════════════════════\nإعداد: مكتب LEXBRIDGE للمحاماة والاستشارات القانونية`);
    setLoading(false);
  };
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="نوع المحكمة"><select className={selectClass} value={form.courtType} onChange={e => setForm({ ...form, courtType: e.target.value })}><option>محكمة الأسرة</option><option>محكمة جنح</option><option>محكمة ابتدائية مدنية</option><option>محكمة تجارية</option><option>محكمة عمالية</option></select></InputField>
        <InputField label="اسم المدعي (أنت)"><input type="text" className={inputClass} placeholder="الاسم الكامل" value={form.plaintiff} onChange={e => setForm({ ...form, plaintiff: e.target.value })} /></InputField>
        <InputField label="اسم المدعى عليه"><input type="text" className={inputClass} placeholder="اسم الطرف الآخر" value={form.defendant} onChange={e => setForm({ ...form, defendant: e.target.value })} /></InputField>
      </div>
      <InputField label="وقائع الدعوى"><textarea rows={4} className={inputClass} placeholder="اسرد الوقائع بالتسلسل الزمني..." value={form.facts} onChange={e => setForm({ ...form, facts: e.target.value })} /></InputField>
      <InputField label="الطلبات القضائية"><textarea rows={3} className={inputClass} placeholder="مثال: إلزام المدعى عليه بسداد مبلغ... / الحكم بالطلاق..." value={form.requests} onChange={e => setForm({ ...form, requests: e.target.value })} /></InputField>
      <button onClick={generate} disabled={loading} className="w-full btn-silver py-3 flex items-center justify-center gap-2">
        {loading ? <><Loader2 size={16} className="animate-spin" /> جاري الإنشاء...</> : <><FileText size={16} /> إنشاء صحيفة الدعوى</>}
      </button>
      {output && (
        <ResultCard>
          <pre className="text-xs text-silver-300 leading-relaxed whitespace-pre-wrap font-mono bg-navy-900 p-4 rounded-xl mb-4 border border-white/10 overflow-auto max-h-72">{output}</pre>
          <div className="flex gap-3">
            <button onClick={copy} className="flex-1 btn-silver py-2 text-sm flex items-center justify-center gap-2">{copied ? <><Check size={14} /> تم النسخ!</> : <><Copy size={14} /> نسخ النص</>}</button>
            <button onClick={() => window.print()} className="flex-1 btn-outline py-2 text-sm flex items-center justify-center gap-2 border-silver-300/30"><Printer size={14} /> طباعة</button>
          </div>
          <Disclaimer text="هذه مسودة أولية للاسترشاد فقط. لا ترفعها دون مراجعة محامٍ متخصص." />
        </ResultCard>
      )}
    </div>
  );
}

// Collapsible card
function ToolCard({ icon, title, badge, children, index = 0 }: { icon: React.ReactNode; title: string; badge?: string; children: React.ReactNode; index?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
      whileHover={!open ? { y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(192,192,192,0.12)' } : {}}
      className={cn('glass border-silver-300/20 overflow-hidden', open && 'shadow-lg shadow-silver-300/5')}
      style={{ transition: 'box-shadow 0.3s' }}
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 text-right">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ scale: open ? 1.1 : 1, background: open ? 'rgba(192,192,192,0.18)' : 'rgba(192,192,192,0.08)' }}
            transition={{ duration: 0.25 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-silver-300 shrink-0"
          >{icon}</motion.div>
          <div className="text-right">
            <h3 className="text-base font-bold text-white">{title}</h3>
            {badge && <span className="text-xs text-silver-400">{badge}</span>}
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
          <ChevronDown size={20} className="text-silver-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-6 border-t border-white/5 pt-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-10 h-10 bg-silver-300/10 rounded-xl flex items-center justify-center text-silver-300">{icon}</div>
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-xs text-silver-400">{subtitle}</p>
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-silver-300/20 mr-4" />
    </div>
  );
}

export default function LegalTools() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen" style={{ position: 'relative', zIndex: 1 }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">أدوات <span className="text-silver-gradient">قانونية</span> تفاعلية</h1>
          <p className="text-silver-400 max-w-2xl mx-auto">احسب حقوقك، قيّم موقفك، وأنشئ مستنداتك القانونية بسهولة تامة.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
          <SectionHeader icon={<Users size={20} />} title="أحوال شخصية" subtitle="حسابات قانون الأسرة والأحوال الشخصية" />
          <div className="space-y-4">
            <ToolCard index={0} icon={<Calculator size={22} />} title="حاسبة النفقة الشرعية" badge="يحتسب بناءً على قضاء محكمة الأسرة"><NafaqaCalc /></ToolCard>
            <ToolCard index={1} icon={<TrendingUp size={22} />} title="حاسبة متجمد النفقة" badge="احسب المبالغ المتراكمة غير المدفوعة"><ArrearsCalc /></ToolCard>
            <ToolCard index={2} icon={<Scale size={22} />} title="حاسبة مؤخر الصداق" badge="تقدير القيمة الحقيقية بعد التضخم"><MahrCalc /></ToolCard>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
          <SectionHeader icon={<Building size={20} />} title="مدني وتجاري" subtitle="أدوات القانون المدني والتجاري وقانون العمل" />
          <div className="space-y-4">
            <ToolCard index={3} icon={<Clock size={22} />} title="حاسبة التقادم القانوني" badge="هل سقط حقك بالتقادم؟"><PrescriptionCalc /></ToolCard>
            <ToolCard index={4} icon={<Gavel size={22} />} title="حاسبة تعويض الفصل التعسفي" badge="تقدير تعويض إنهاء الخدمة"><DismissalCalc /></ToolCard>
            <ToolCard index={5} icon={<HelpCircle size={22} />} title="هل قضيتك قابلة للكسب؟" badge="قيّم قوة موقفك القانوني"><CaseStrength /></ToolCard>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16">
          <SectionHeader icon={<FileText size={20} />} title="خدمات سريعة" subtitle="إنشاء مستندات قانونية جاهزة للاسترشاد" />
          <div className="space-y-4">
            <ToolCard index={6} icon={<FileText size={22} />} title="مولد الإنذار القانوني" badge="أنشئ إنذاراً قانونياً رسمياً"><LegalNoticeGen /></ToolCard>
            <ToolCard index={7} icon={<Scale size={22} />} title="صيغة صحيفة دعوى مبدئية" badge="مسودة أولية لصحيفة الدعوى"><LawsuitDraft /></ToolCard>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="glass p-8 text-center border-silver-300/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-48 h-48 bg-silver-300/5 blur-3xl rounded-full -ml-24 -mt-24" />
            <AlertCircle className="text-silver-300 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold mb-3">هل تحتاج استشارة أعمق؟</h3>
            <p className="text-silver-400 text-sm mb-6 max-w-md mx-auto">الأدوات أعلاه تقدم تقديرات استرشادية فقط. للحصول على رأي قانوني قاطع يناسب قضيتك، تواصل مع محامٍ متخصص.</p>
            <Link to="/contact" className="btn-silver inline-flex items-center gap-2">احجز استشارة قانونية متخصصة <ArrowLeft size={16} /></Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Share2, Bookmark } from 'lucide-react';

const postsData: Record<number, any> = {
  1: {
    title: 'أهم التعديلات في قانون العقوبات المصري',
    date: '24/2/2026',
    author: 'مصطفى فؤاد',
    category: 'القانون الجنائي',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
    content: `
      <p>شهدت المنظومة الجنائية في مصر تحولات جذرية ومفصلية خلال العامين الأخيرين (2024-2025)، تُوجت بصدور قانون الإجراءات الجنائية الجديد رقم 174 لسنة 2025، والذي يُعد التغيير الأضخم منذ عام 1950. هذا القانون ليس مجرد تعديل لمواد، بل هو إعادة صياغة كاملة "لدستور المحاكم" بما يتماشى مع الجمهورية الجديدة.</p>
      
      <p>إليك مقال يلخص أبرز هذه التعديلات:</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4 text-silver-gradient">ثورة في العدالة: ملامح التعديلات الجنائية الجديدة في مصر</h2>
      
      <p>تأتي التعديلات الأخيرة لتعالج ملفات شائكة طالما كانت محل نقاش حقوقي وقانوني، وعلى رأسها قضية الحبس الاحتياطي وحقوق الدفاع. ومن المقرر أن يبدأ العمل رسمياً بالقانون الجديد في أول أكتوبر 2026.</p>
      
      <h3 className="text-xl font-bold mt-8 mb-4 text-silver-300">1. تقليص الحبس الاحتياطي واستحداث بدائل (أهم التعديلات)</h3>
      <p>كان الحبس الاحتياطي هو الشاغل الأكبر، وقد جاء القانون الجديد ليعيد تعريفه كإجراء احترازي وليس عقوبة:</p>
      <ul className="list-disc list-inside space-y-2 text-silver-400 my-4">
        <li><strong>زيادة البدائل:</strong> ارتفع عدد بدائل الحبس الاحتياطي من 3 إلى 7 بدائل.</li>
        <li><strong>أمثلة للبدائل:</strong> إلزام المتهم بعدم مغادرة نطاق جغرافي معين، أو منعه من ارتياد أماكن محددة، أو استخدامه للوسائل التقنية في التتبع (المراقبة الإلكترونية).</li>
        <li><strong>تحديد المدد:</strong> وضع القانون سقفاً زمنياً صارماً ومدداً أقل للحبس الاحتياطي لا يجوز تجاوزها، مع تنظيم حق التعويض المادي والمعنوي عن الحبس الخاطئ.</li>
      </ul>

      <h3 className="text-xl font-bold mt-8 mb-4 text-silver-300">2. إقرار نظام "استئناف الجنايات" (تطبيق فعلي منذ 2024)</h3>
      <p>بموجب القانون رقم 1 لسنة 2024، أصبح التقاضي في الجنايات على درجتين (جنايات أول درجة وجنايات مستأنفة).</p>
      <p><strong>الهدف:</strong> إتاحة الفرصة للمحكوم عليهم في قضايا الجنايات للطعن على الأحكام أمام دائرة أخرى قبل اللجوء لمحكمة النقض، وهو ما يعزز ضمانات العدالة ويقلل من احتمالات الخطأ القضائي.</p>

      <h3 className="text-xl font-bold mt-8 mb-4 text-silver-300">3. تعزيز حقوق الدفاع وحرمة المنازل</h3>
      <ul className="list-disc list-inside space-y-2 text-silver-400 my-4">
        <li><strong>حضور المحامي:</strong> أوجب القانون حضور محامٍ مع المتهم في جميع مراحل التحقيق في الجنايات والجنح المعاقب عليها بالحبس وجوباً.</li>
        <li><strong>حرمة المسكن:</strong> وضع ضوابط أكثر صرامة لدخول المنازل، بحيث لا يجوز دخولها أو تفتيشها إلا بأمر قضائي مسبب، مع استثناء حالات الاستغاثة القصوى (حريق، غرق).</li>
        <li><strong>حماية الشهود والمبلغين:</strong> تضمن القانون نصوصاً صريحة لحماية بيانات الشهود والمجني عليهم لضمان سير العدالة دون ترهيب.</li>
      </ul>

      <h3 className="text-xl font-bold mt-8 mb-4 text-silver-300">4. التحول الرقمي والعدالة الناجزة</h3>
      <ul className="list-disc list-inside space-y-2 text-silver-400 my-4">
        <li><strong>التقاضي عن بُعد:</strong> أجاز القانون استخدام تقنيات الاتصال الحديثة في بعض مراحل التحقيق والمحاكمة، بشرط عدم الإخلال بحقوق الدفاع وضمان خصوصية التواصل بين المتهم ومحاميه.</li>
        <li><strong>منع تشابه الأسماء:</strong> ألزم مأموري الضبط القضائي بضرورة إثبات بيانات الرقم القومي للمتهمين فور تحديد هويتهم للقضاء نهائياً على أزمة تشابه الأسماء.</li>
      </ul>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse border border-white/10">
          <thead>
            <tr className="bg-white/5">
              <th className="border border-white/10 p-4 text-right">المجال</th>
              <th className="border border-white/10 p-4 text-right">التعديل الأبرز</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-white/10 p-4">الحبس الاحتياطي</td>
              <td className="border border-white/10 p-4 text-silver-400">زيادة البدائل لـ 7 وتخفيض المدد القصوى.</td>
            </tr>
            <tr>
              <td className="border border-white/10 p-4">درجات التقاضي</td>
              <td className="border border-white/10 p-4 text-silver-400">تفعيل محاكم الجنايات المستأنفة (درجتان بدلاً من واحدة).</td>
            </tr>
            <tr>
              <td className="border border-white/10 p-4">حرمة المساكن</td>
              <td className="border border-white/10 p-4 text-silver-400">تشديد ضوابط الدخول والتفتيش إلا بأمر مسبب.</td>
            </tr>
            <tr>
              <td className="border border-white/10 p-4">الوسائل التقنية</td>
              <td className="border border-white/10 p-4 text-silver-400">إجازة المحاكمات والتحقيقات عن بُعد وفق ضوابط تقنية.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-silver-300">ختاماً</h2>
      <p>تمثل هذه التعديلات نقلة نوعية تهدف إلى الموازنة بين "حق الدولة في العقاب" و"حق المواطن في الحرية والكرامة". يبقى التحدي الأكبر هو التطبيق الفعلي على أرض الواقع عند دخول القانون حيز التنفيذ في 2026.</p>
    `
  },
  2: {
    title: 'لا دليل بلا مشروعية',
    date: '2/3/2026',
    author: 'مصطفى فؤاد',
    category: 'القانون الجنائي',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop',
    content: `
      <p>في عالم الجريمة، غالباً ما تبرر الغاية الوسيلة لدى الجاني، لكن في عالم القضاء، الوسيلة هي التي تمنح الغاية شرعيتها. فلا قيمة لحقيقة يتم الوصول إليها عبر انتهاك كرامة الإنسان أو مخالفة أحكام القانون. هذا هو جوهر مبدأ "مشروعية الدليل".</p>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-silver-gradient">لا دليل بلا مشروعية: السياج الأخلاقي والقانوني للعدالة الجنائية</h2>

      <h3 className="text-xl font-bold mt-8 mb-4 text-silver-300">1. مفهوم مشروعية الدليل الجنائي</h3>
      <p>يقصد بمشروعية الدليل وجوب أن يكون الدليل المستمد ضد المتهم قد تم الحصول عليه بطرق تتفق مع الدستور والقانون. فإذا كان الدليل صحيحاً في ذاته (مثل اعتراف صادق) ولكنه استخلص بطريق غير مشروع (مثل التعذيب أو التهديد)، فإنه يفقد قيمته القانونية ويصبح "عدماً".</p>

      <h3 className="text-xl font-bold mt-8 mb-4 text-silver-300">2. القاعدة الذهبية: "ما بُني على باطل فهو باطل"</h3>
      <p>هذه القاعدة هي العمود الفقري للمبدأ، وتتفرع عنها نتائج قانونية حاسمة:</p>
      <ul className="list-disc list-inside space-y-2 text-silver-400 my-4">
        <li><strong>بطلان الدليل الأصلي:</strong> إذا قام ضابط بتفتيش مسكن دون إذن قضائي وضبط "مخدرات"، فإن هذا الضبط باطل قانوناً.</li>
        <li><strong>بطلان الدليل المُستمد:</strong> إذا أدى التفتيش الباطل إلى اعتراف المتهم، فإن الاعتراف يبطل أيضاً لأنه "ثمرة لشجرة مسمومة".</li>
      </ul>

      <h3 className="text-xl font-bold mt-8 mb-4 text-silver-300">3. الضمانات الدستورية والقانونية (النموذج المصري)</h3>
      <p>حرص المشرع المصري في الدستور وقانون الإجراءات الجنائية الجديد على ترسيخ هذا المبدأ من خلال:</p>
      <ul className="list-disc list-inside space-y-2 text-silver-400 my-4">
        <li><strong>حرمة الجسد:</strong> بطلان أي اعتراف يثبت صدوره تحت وطأة تعذيب مادي أو معنوي.</li>
        <li><strong>حرمة المسكن والحياة الخاصة:</strong> منع التنصت أو مراقبة المراسلات أو تفتيش المنازل إلا بأمر قضائي مسبب ولمدة محددة.</li>
        <li><strong>حق الدفاع:</strong> اعتبار أي إجراء يتم في غيبة المحامي (في الحالات التي يوجب فيها القانون حضوره) إجراءً مشوباً بالبطلان.</li>
      </ul>

      <h3 className="text-xl font-bold mt-8 mb-4 text-silver-300">4. لماذا نضحي بالحقيقة من أجل "المشروعية"؟</h3>
      <p>قد يتساءل البعض: لماذا يفرج القضاء عن مجرم ثبتت تهمته لمجرد خطأ في إذن التفتيش؟ الرد القانوني والفلسفي يرتكز على ثلاث نقاط:</p>
      <ul className="list-disc list-inside space-y-2 text-silver-400 my-4">
        <li><strong>حماية المجتمع من الاستبداد:</strong> التغاضي عن الأخطاء الإجرائية يفتح الباب أمام تجاوزات قد تطال الأبرياء مستقبلاً.</li>
        <li><strong>نزاهة القضاء:</strong> لا يجوز للدولة أن تطلب من المواطن احترام القانون وهي تخالفه أثناء جمع الأدلة.</li>
        <li><strong>دقة الدليل:</strong> الوسائل غير المشروعة (كالتعذيب) غالباً ما تؤدي إلى أدلة مضللة أو اعترافات كاذبة تحت الضغط.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-silver-300">خلاصة القول</h2>
      <p>إن مبدأ "لا دليل بلا مشروعية" ليس ثغرة قانونية يستغلها المجرمون كما يظن البعض، بل هو صمام أمان يضمن أن تظل "الحقيقة القضائية" ناصعة ومحترمة. فالعدالة لا تكتمل بمجرد معاقبة المذنب، بل بضمان أن الطريق نحو هذه العقوبة كان عادلاً، أخلاقياً، وقانونياً بامتياز.</p>
    `
  }
};

export default function BlogPost() {
  const { id } = useParams();
  const post = postsData[Number(id)];

  if (!post) {
    return (
      <div className="pt-32 pb-24 px-6 bg-navy-900 text-center">
        <h1 className="text-2xl font-bold mb-4">المقال غير موجود</h1>
        <Link to="/blog" className="text-silver-300 hover:underline">العودة للمدونة</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-navy-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-silver-400 hover:text-silver-300 mb-8 transition-colors">
            <ArrowRight size={20} />
            العودة للمدونة
          </Link>

          <div className="aspect-video w-full rounded-3xl overflow-hidden mb-8 border border-silver-300/20 shadow-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-silver-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-silver-300" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <User size={18} className="text-silver-300" />
              {post.author}
            </div>
            <div className="bg-silver-300/10 text-silver-300 px-4 py-1 rounded-full text-sm font-bold">
              {post.category}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight text-silver-gradient">
            {post.title}
          </h1>

          <div className="flex gap-4 mb-12 border-y border-white/10 py-4">
            <button className="flex items-center gap-2 text-silver-400 hover:text-silver-300 transition-colors text-sm">
              <Share2 size={18} />
              مشاركة
            </button>
            <button className="flex items-center gap-2 text-silver-400 hover:text-silver-300 transition-colors text-sm">
              <Bookmark size={18} />
              حفظ
            </button>
          </div>

          <div 
            className="prose prose-invert prose-silver max-w-none text-silver-400 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>
      </div>
    </div>
  );
}

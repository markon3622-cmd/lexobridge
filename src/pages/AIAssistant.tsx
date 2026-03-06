import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, User, Loader2, Scale, AlertCircle, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// ── Vite env variable ──
const GEMINI_API_KEY = 'AIzaSyBxeGyDCRkYWP951VD6jKguAC0L2bYLI1c';

// ── System instruction (updated per requirements) ──
const SYSTEM_PROMPT = `You are LexBridge AI, a legal assistant specialized in Egyptian law.
Answer in clear Arabic. Explain the law simply. Mention legal articles if possible.
Always clarify that the answer is general legal information and not legal advice.
If unsure, say the information may require consulting a lawyer.
NEVER respond to questions that are illegal, racist, offensive, or contain swear words.
Politely refuse to answer such questions.
Always encourage the user to book a consultation with a specialized lawyer at LEXBRIDGE office.`;

type Message = { role: 'user' | 'assistant'; content: string };

const WELCOME: Message = {
  role: 'assistant',
  content: 'مرحباً بك في مكتب LEXBRIDGE 👋\nأنا المحامي الذكي، كيف يمكنني مساعدتك قانونياً اليوم؟',
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput]       = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input on mount
  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    // No API key
    if (!GEMINI_API_KEY) {
      setMessages(prev => [...prev,
        { role: 'user', content: text },
        { role: 'assistant', content: '⚠️ مفتاح API غير موجود — تأكد من إضافة VITE_GEMINI_API_KEY في Netlify ثم أعد الـ deploy' },
      ]);
      setInput('');
      return;
    }

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);

    try {
      // Build conversation history for multi-turn
      const history = messages
        .filter(m => m.content !== WELCOME.content)
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }));

      const body = {
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\nسؤال المستخدم: ' + (history.length ? history.map((m: any) => m.role + ': ' + m.parts[0].text).join('\n') + '\n' : '') + text }] },
        ],
      };

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'الخدمة حالياً غير متوفرة';

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      console.error('Gemini error:', err);
      const errMsg = err?.message ? `خطأ: ${err.message}` : 'الخدمة حالياً غير متوفرة';
      setMessages(prev => [...prev, { role: 'assistant', content: errMsg }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleClear = () => {
    setMessages([WELCOME]);
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen text-white" style={{ position: 'relative', zIndex: 1 }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8">
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '4rem', height: '4rem', borderRadius: '1.25rem', marginBottom: '1rem',
            background: 'linear-gradient(135deg, rgba(0,40,100,0.9), rgba(0,80,180,0.7))',
            border: '1px solid rgba(0,100,200,0.4)',
            boxShadow: '0 8px 32px rgba(0,60,160,0.4)',
          }}>
            <Bot size={30} style={{ color: '#93c5fd' }} />
          </div>
          <h1 className="text-3xl font-bold mb-2">المحامي الذكي</h1>
          <p style={{ color: 'rgba(192,192,192,0.5)', fontSize: '0.85rem' }}>
            مدعوم بتقنية Google Gemini AI
          </p>
        </motion.div>

        {/* Chat card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            borderRadius: '1.5rem', display: 'flex', flexDirection: 'column',
            height: '600px', overflow: 'hidden',
            background: 'rgba(0,8,18,0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(192,192,192,0.1)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,80,160,0.08)',
          }}
        >
          {/* Top bar */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1 }}>
              <AlertCircle size={14} style={{ color: '#f59e0b', flexShrink: 0 }} />
              <p style={{ fontSize: '0.7rem', color: 'rgba(192,192,192,0.45)', lineHeight: 1.5 }}>
                هذا المساعد يقدم معلومات قانونية عامة ولا يغني عن الاستشارة مع محامٍ مختص.
              </p>
            </div>
            {/* Clear button */}
            <button onClick={handleClear} title="مسح المحادثة"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.35rem 0.75rem', borderRadius: '0.5rem',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(192,192,192,0.4)', fontSize: '0.7rem', cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.2s', flexShrink: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(248,113,113,0.8)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(248,113,113,0.25)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(192,192,192,0.4)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              <Trash2 size={12} /> مسح
            </button>
          </div>

          {/* Messages area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem',
            scrollbarWidth: 'thin', scrollbarColor: 'rgba(192,192,192,0.1) transparent' }}>
            {messages.map((msg, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', gap: '0.75rem', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}
              >
                {/* Avatar */}
                <div style={{
                  width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #1d4ed8, #2563eb)'
                    : 'rgba(0,31,63,0.8)',
                  border: msg.role === 'user'
                    ? '1px solid rgba(96,165,250,0.3)'
                    : '1px solid rgba(0,100,200,0.3)',
                  boxShadow: msg.role === 'user'
                    ? '0 4px 12px rgba(37,99,235,0.3)'
                    : '0 4px 12px rgba(0,60,160,0.2)',
                }}>
                  {msg.role === 'user'
                    ? <User size={14} style={{ color: '#bfdbfe' }} />
                    : <Scale size={14} style={{ color: '#93c5fd' }} />
                  }
                </div>

                {/* Bubble */}
                <div style={{
                  padding: '0.875rem 1.1rem',
                  borderRadius: msg.role === 'user' ? '1.25rem 0.4rem 1.25rem 1.25rem' : '0.4rem 1.25rem 1.25rem 1.25rem',
                  fontSize: '0.875rem', lineHeight: 1.75, maxWidth: '80%',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, rgba(29,78,216,0.85), rgba(37,99,235,0.75))'
                    : 'rgba(255,255,255,0.04)',
                  border: msg.role === 'user'
                    ? '1px solid rgba(96,165,250,0.2)'
                    : '1px solid rgba(255,255,255,0.07)',
                  color: msg.role === 'user' ? '#e0f2fe' : '#d1d5db',
                  backdropFilter: 'blur(8px)',
                }}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{
                  width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,31,63,0.8)', border: '1px solid rgba(0,100,200,0.3)',
                }}>
                  <Loader2 size={14} style={{ color: '#93c5fd', animation: 'spin 1s linear infinite' }} />
                </div>
                <div style={{
                  padding: '0.875rem 1.25rem', borderRadius: '0.4rem 1.25rem 1.25rem 1.25rem',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', gap: '5px', alignItems: 'center',
                }}>
                  {[0, 1, 2].map(d => (
                    <span key={d} style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: 'rgba(147,197,253,0.6)',
                      animation: `bounce 1.2s ease-in-out ${d * 0.2}s infinite`,
                      display: 'inline-block',
                    }} />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div style={{
            padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(0,4,12,0.6)',
          }}>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="اسأل المحامي الذكي عن أي مسألة قانونية..."
                disabled={isLoading}
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.875rem', padding: '0.8rem 1.1rem',
                  color: '#e2e8f0', fontSize: '0.875rem', outline: 'none',
                  fontFamily: 'inherit', transition: 'border-color 0.2s, box-shadow 0.2s',
                  opacity: isLoading ? 0.6 : 1,
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,100,200,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,64,128,0.15)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
              />
              <button
                type="button"
                onClick={e => { e.preventDefault(); handleSend(); }}
                disabled={isLoading || !input.trim()}
                style={{
                  width: '2.85rem', height: '2.85rem', borderRadius: '0.875rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: input.trim() && !isLoading
                    ? 'linear-gradient(135deg, #1d4ed8, #2563eb)'
                    : 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(96,165,250,0.2)',
                  color: input.trim() && !isLoading ? '#fff' : 'rgba(192,192,192,0.3)',
                  cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                  boxShadow: input.trim() && !isLoading ? '0 4px 16px rgba(37,99,235,0.35)' : 'none',
                }}
                onMouseEnter={e => { if (input.trim() && !isLoading) (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick suggestions */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
          {['ما هي عقوبة السرقة في مصر؟', 'كيف أرفع دعوى نفقة؟', 'ما هي حقوق المتهم؟', 'كيف أسجل شركة؟'].map(q => (
            <button key={q} onClick={() => { setInput(q); inputRef.current?.focus(); }}
              style={{
                padding: '0.45rem 1rem', borderRadius: '999px',
                fontSize: '0.75rem', fontWeight: 600, fontFamily: 'inherit',
                background: 'rgba(0,20,50,0.5)', border: '1px solid rgba(0,80,160,0.3)',
                color: 'rgba(147,197,253,0.75)', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,40,100,0.6)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,100,200,0.5)'; (e.currentTarget as HTMLElement).style.color = '#bfdbfe'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,20,50,0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,80,160,0.3)'; (e.currentTarget as HTMLElement).style.color = 'rgba(147,197,253,0.75)'; }}
            >
              {q}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Book consultation CTA — silver style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, ease: [0.22,1,0.36,1] }}
          style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
          <a href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.6rem', padding: '0.75rem 2.25rem',
              borderRadius: '999px', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.875rem', fontFamily: 'inherit',
              background: 'linear-gradient(135deg, rgba(220,224,230,0.15), rgba(192,192,192,0.08))',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(192,192,192,0.35)',
              color: 'rgba(220,224,230,0.9)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)',
              transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
              position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'linear-gradient(135deg, rgba(240,242,245,0.22), rgba(192,192,192,0.14))';
              el.style.borderColor = 'rgba(220,224,230,0.55)';
              el.style.boxShadow = '0 8px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)';
              el.style.transform = 'translateY(-2px)';
              el.style.color = '#F0F2F5';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'linear-gradient(135deg, rgba(220,224,230,0.15), rgba(192,192,192,0.08))';
              el.style.borderColor = 'rgba(192,192,192,0.35)';
              el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)';
              el.style.transform = 'translateY(0)';
              el.style.color = 'rgba(220,224,230,0.9)';
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            احجز استشارة الآن
          </a>
        </motion.div>

      {/* Bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

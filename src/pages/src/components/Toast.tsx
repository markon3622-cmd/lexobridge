import { useEffect, useRef } from 'react';

export type ToastType = 'success' | 'error';

export interface ToastData {
  id: number;
  type: ToastType;
  title: string;
  message: string;
}

interface ToastProps {
  toast: ToastData;
  onRemove: (id: number) => void;
}

export function Toast({ toast, onRemove }: ToastProps) {
  const isSuccess = toast.type === 'success';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => onRemove(toast.id)}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 9998,
          animation: 'toast-backdrop-in 0.35s ease both',
        }}
      />

      {/* Modal card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-live="polite"
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          width: '90vw',
          maxWidth: '440px',
          animation: 'toast-modal-in 0.5s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* Glass card */}
        <div style={{
          background: 'rgba(2, 8, 20, 0.72)',
          backdropFilter: 'blur(32px) saturate(160%)',
          WebkitBackdropFilter: 'blur(32px)',
          border: isSuccess
            ? '1px solid rgba(0, 90, 180, 0.45)'
            : '1px solid rgba(200, 50, 50, 0.45)',
          borderRadius: '1.5rem',
          padding: '2.5rem 2rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: isSuccess
            ? '0 0 0 1px rgba(0,80,160,0.12), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(0,40,120,0.25)'
            : '0 0 0 1px rgba(200,50,50,0.12), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(180,0,0,0.2)',
        }}>

          {/* Top shimmer line */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: '1.5px',
            background: isSuccess
              ? 'linear-gradient(90deg, transparent, rgba(100,180,255,0.6), rgba(192,192,192,0.8), rgba(100,180,255,0.6), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(248,113,113,0.7), transparent)',
            borderRadius: '999px',
          }} />

          {/* Background glow blob */}
          <div style={{
            position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)',
            width: '200px', height: '200px', borderRadius: '50%',
            background: isSuccess
              ? 'radial-gradient(circle, rgba(0,50,120,0.35) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(180,0,0,0.25) 0%, transparent 70%)',
            filter: 'blur(20px)', pointerEvents: 'none',
          }} />

          {/* Icon ring */}
          <div style={{
            width: '5rem', height: '5rem',
            borderRadius: '50%',
            margin: '0 auto 1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            background: isSuccess
              ? 'rgba(0,31,63,0.7)'
              : 'rgba(60,0,0,0.6)',
            border: isSuccess
              ? '1.5px solid rgba(0,100,200,0.4)'
              : '1.5px solid rgba(200,50,50,0.4)',
            boxShadow: isSuccess
              ? '0 0 0 8px rgba(0,50,120,0.12), 0 0 24px rgba(0,80,180,0.3)'
              : '0 0 0 8px rgba(180,0,0,0.1), 0 0 24px rgba(200,50,50,0.25)',
            animation: 'toast-icon-pulse 2.5s ease-in-out 0.6s infinite',
          }}>
            {isSuccess ? (
              <svg viewBox="0 0 52 52" fill="none" style={{ width: '2.5rem', height: '2.5rem' }}>
                <path
                  className="toast-check-path"
                  d="M12 26 L21 35 L40 16"
                  stroke="#C0C0C0" strokeWidth="3"
                  strokeLinecap="round" strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 52 52" fill="none" style={{ width: '2.5rem', height: '2.5rem' }}>
                <path
                  className="toast-x-path"
                  d="M16 16 L36 36 M36 16 L16 36"
                  stroke="#f87171" strokeWidth="3"
                  strokeLinecap="round" fill="none"
                />
              </svg>
            )}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '1.35rem', fontWeight: 900,
            color: '#F8F9FA',
            letterSpacing: '-0.02em',
            marginBottom: '0.6rem',
            lineHeight: 1.25,
          }}>
            {toast.title}
          </h3>

          {/* Message */}
          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(192,192,192,0.65)',
            lineHeight: 1.7,
            marginBottom: '2rem',
            maxWidth: '320px',
            margin: '0 auto 2rem',
          }}>
            {toast.message}
          </p>

          {/* Confirm button */}
          <button
            onClick={() => onRemove(toast.id)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 2.5rem',
              borderRadius: '0.875rem',
              fontWeight: 700, fontSize: '0.95rem',
              fontFamily: 'inherit',
              cursor: 'pointer',
              border: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
              background: isSuccess
                ? 'linear-gradient(135deg, #D1D5DB 0%, #C0C0C0 50%, #9BA3AF 100%)'
                : 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
              color: isSuccess ? '#001F3F' : '#fff',
              boxShadow: isSuccess
                ? '0 4px 20px rgba(192,192,192,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
                : '0 4px 20px rgba(248,113,113,0.3)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = isSuccess
                ? '0 8px 28px rgba(192,192,192,0.35)'
                : '0 8px 28px rgba(248,113,113,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = isSuccess
                ? '0 4px 20px rgba(192,192,192,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
                : '0 4px 20px rgba(248,113,113,0.3)';
            }}
          >
            {isSuccess ? (
              <>
                <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '1.1rem', height: '1.1rem' }}>
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                تم، شكراً لك
              </>
            ) : (
              'حسناً، سأحاول مجدداً'
            )}
          </button>

          {/* Bottom glow line */}
          <div style={{
            position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '1px',
            background: isSuccess
              ? 'linear-gradient(90deg, transparent, rgba(0,80,160,0.4), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(200,50,50,0.3), transparent)',
          }} />
        </div>
      </div>
    </>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onRemove: (id: number) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;
  // Show only the latest toast as modal
  const latest = toasts[toasts.length - 1];
  return <Toast key={latest.id} toast={latest} onRemove={onRemove} />;
}

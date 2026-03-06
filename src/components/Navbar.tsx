import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const links = [
    { name: 'الرئيسية', path: '/' },
    { name: 'عن المكتب', path: '/about' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'المدونة', path: '/blog' },
    { name: 'المحامي الذكي', path: '/ai-assistant' },
    { name: 'أدوات قانونية', path: '/tools' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  return (
    <>
      {/* Overlay when mobile open */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', zIndex: 48 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, width: '100%', zIndex: 50,
          padding: scrolled ? '0.6rem 1.5rem' : '1.1rem 1.5rem',
          background: scrolled ? 'rgba(0,4,10,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(28px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(192,192,192,0.07)' : 'none',
          boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.5)' : 'none',
          transition: 'padding 0.4s ease, background 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <div style={{ maxWidth: '82rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none', flexShrink: 0 }}>
            <motion.img
              src="/logo.png" alt="LEXBRIDGE Logo"
              style={{ height: '2.2rem', width: 'auto' }}
              whileHover={{ filter: 'drop-shadow(0 0 16px rgba(0,100,200,0.6))' }}
              transition={{ duration: 0.3 }}
            />
            <img src="/logtext.png" alt="LEXBRIDGE" style={{ height: '1.65rem', width: 'auto', opacity: 0.88 }} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '1.75rem' }}>
            {links.map((link, i) => (
              <motion.div key={link.path} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i, duration: 0.5 }}>
                <Link to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.64 }}>
              <Link to="/contact" className="btn-primary" style={{ padding: '0.6rem 1.3rem', fontSize: '0.85rem', borderRadius: '0.75rem', textDecoration: 'none' }}>
                احجز استشارة
              </Link>
            </motion.div>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(v => !v)}
            style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.75rem', border: '1px solid rgba(192,192,192,0.15)', background: 'rgba(255,255,255,0.04)', color: '#C0C0C0', transition: 'border-color 0.2s, background 0.2s' }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={mobileOpen ? 'x' : 'm'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile slide-in */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '80%', maxWidth: '320px', height: '100%',
              background: 'rgba(0,6,14,0.97)', backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              borderLeft: '1px solid rgba(192,192,192,0.08)',
              zIndex: 49, padding: '5rem 1.5rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '0.25rem',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
            }}
          >
            {links.map((link, i) => (
              <motion.div key={link.path} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 + 0.1 }}>
                <Link to={link.path}
                  style={{
                    display: 'block', padding: '0.875rem 1rem', borderRadius: '0.875rem',
                    fontSize: '1rem', fontWeight: 600, textDecoration: 'none',
                    color: location.pathname === link.path ? '#F8F9FA' : 'rgba(192,192,192,0.65)',
                    background: location.pathname === link.path ? 'rgba(0,31,63,0.6)' : 'transparent',
                    borderLeft: location.pathname === link.path ? '2px solid rgba(0,100,200,0.7)' : '2px solid transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ marginTop: '1.5rem' }}>
              <Link to="/contact" className="btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                احجز استشارة
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

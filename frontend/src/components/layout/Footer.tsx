import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, Music } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm pt-16 pb-8 relative overflow-hidden">
      {}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {}
          <div className="space-y-5 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative h-9 w-9 rounded-xl bg-black border border-border flex items-center justify-center overflow-hidden">
                <img src="/eventu-logo.png" alt="Event.u Logo" className="h-full w-full object-cover" />
              </div>
              <span className="text-2xl font-black tracking-wider text-gradient font-display">EVENT.U</span>
            </Link>
            <p className="text-foreground/50 text-sm leading-relaxed">
              La piattaforma italiana per connettere artisti talentuosi con i migliori organizzatori di eventi.
            </p>
            <div className="flex items-center gap-3">
              <motion.a
                href="#"
                title="Instagram"
                whileHover={{ scale: 1.15, y: -2 }}
                className="h-9 w-9 rounded-xl bg-black border border-border flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/30 transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                title="YouTube"
                whileHover={{ scale: 1.15, y: -2 }}
                className="h-9 w-9 rounded-xl bg-black border border-border flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/30 transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163c-.272-1.016-1.07-1.817-2.088-2.088C19.578 3.53 12 3.53 12 3.53s-7.578 0-9.41.545c-1.018.271-1.816 1.072-2.088 2.088C0 8.003 0 12.007 0 12.007s0 4.004.49 5.845c.272 1.015 1.07 1.816 2.088 2.086 1.832.547 9.41.547 9.41.547s7.578 0 9.41-.547c1.018-.27 1.816-1.071 2.088-2.086.49-1.841.49-5.845.49-5.845s0-4.004-.49-5.844zM9.545 15.568V8.444L15.818 12l-6.273 3.568z"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                title="X"
                whileHover={{ scale: 1.15, y: -2 }}
                className="h-9 w-9 rounded-xl bg-black border border-border flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/30 transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground/40 mb-5">Piattaforma</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/events', label: 'Scopri Eventi', Icon: CalendarDays },
                { to: '/artists', label: 'Artisti in Vetrina', Icon: Music },
                { to: '/register', label: 'Registrati', Icon: null },
                { to: '/login', label: 'Accedi', Icon: null },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-foreground/55 hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground/40 mb-5">Per Te</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/register', label: '🎵 Sei un Artista?' },
                { to: '/register', label: '🏢 Sei un Organizzatore?' },
                { to: '/dashboard', label: '📊 La Tua Dashboard' },
                { to: '/profile', label: '⚙️ Impostazioni Profilo' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-foreground/55 hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground/40 mb-5">Generi in Trend</h4>
            <div className="flex flex-wrap gap-2">
              {['Hip Hop', 'Rap', 'House', 'Techno', 'R&B', 'Trap', 'Jazz', 'Rock'].map(g => (
                <span
                  key={g}
                  className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary/80 border border-primary/15 font-medium"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/40">
          <p>© {new Date().getFullYear()} Event.u S.r.l. — Tutti i diritti riservati.</p>
          <div className="flex items-center gap-5">
            <Link to="#" className="hover:text-foreground/70 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-foreground/70 transition-colors">Termini di Servizio</Link>
            <Link to="#" className="hover:text-foreground/70 transition-colors">Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

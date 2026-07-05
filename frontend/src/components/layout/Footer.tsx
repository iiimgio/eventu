import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, Music } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-white pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          <div className="space-y-5 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="relative h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden shadow-sm">
                <img src="/eventu-logo.svg" alt="Event.u Logo" className="h-full w-full object-contain p-1" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-primary font-sans">EVENT.U</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              La piattaforma italiana per connettere artisti talentuosi con i migliori organizzatori di eventi.
            </p>
            <div className="flex items-center gap-3">
              {['Instagram', 'YouTube', 'X'].map((name) => (
                <motion.a
                  key={name}
                  href="#"
                  title={name}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
                >
                  <span className="text-[10px] font-bold">{name[0]}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-5">Piattaforma</h4>
            <ul className="space-y-3 text-sm font-medium">
              {[
                { to: '/events', label: 'Scopri Eventi', Icon: CalendarDays },
                { to: '/artists', label: 'Artisti in Vetrina', Icon: Music },
                { to: '/register', label: 'Registrati', Icon: null },
                { to: '/login', label: 'Accedi', Icon: null },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-foreground/75 hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-5">Per Te</h4>
            <ul className="space-y-3 text-sm font-medium">
              {[
                { to: '/register', label: 'Sei un Artista?' },
                { to: '/register', label: 'Sei un Organizzatore?' },
                { to: '/dashboard', label: 'La Tua Dashboard' },
                { to: '/profile', label: 'Impostazioni Profilo' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-foreground/75 hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-5">Generi in Trend</h4>
            <div className="flex flex-wrap gap-2">
              {['Hip Hop', 'Rap', 'House', 'Techno', 'R&B', 'Trap', 'Jazz', 'Rock'].map(g => (
                <span
                  key={g}
                  className="text-xs px-3 py-1 rounded-full bg-surface text-primary border border-primary/10 font-semibold"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted font-medium">
          <p>© {new Date().getFullYear()} Event.u S.r.l. — Tutti i diritti riservati.</p>
          <div className="flex items-center gap-5">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Termini di Servizio</Link>
            <Link to="#" className="hover:text-primary transition-colors">Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

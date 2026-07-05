import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard, User, Settings, CalendarDays, Music } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const isHome = location.pathname === '/';

  const links = [
    { name: 'Eventi', path: '/events', icon: CalendarDays },
    { name: 'Artisti', path: '/artists', icon: Music },
  ];

  React.useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navTextClass = isHome
    ? 'text-white/90 hover:text-white'
    : 'text-foreground/70 hover:text-primary';

  const navActiveClass = isHome ? 'text-white' : 'text-primary';

  const indicatorClass = isHome ? 'bg-white' : 'bg-primary';

  return (
    <nav className={`fixed top-0 z-50 w-full ${isHome ? 'pt-4' : 'border-b border-border bg-card/95 backdrop-blur-md shadow-[0_8px_24px_-18px_rgba(0,0,0,0.75)]'}`}>
      <div className={`${isHome ? 'container mx-auto px-4 sm:px-6' : 'container mx-auto px-4 sm:px-6'}`}>
        <div className={`${isHome ? 'glass-nav rounded-full shadow-nav mx-auto max-w-5xl px-4 sm:px-6' : ''}`}>
          <div className="flex h-14 items-center justify-between">
            
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center"
              >
                <div className={`relative h-9 w-9 rounded-xl flex items-center justify-center overflow-hidden shadow-sm ${isHome ? 'bg-white/15' : 'bg-primary/10'}`}>
                  <img src="/eventu-logo.svg" alt="Event.u Logo" className="h-full w-full object-contain p-1" />
                </div>
              </motion.div>
              <span className={`text-lg font-extrabold tracking-tight font-sans ${isHome ? 'text-white' : 'text-primary'}`}>
                EVENT.U
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {links.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative text-sm font-semibold transition-colors py-1.5 flex items-center gap-1.5 ${isActive ? navActiveClass : navTextClass}`}
                    >
                      <link.icon className="h-4 w-4 opacity-75" />
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-indicator"
                          className={`absolute bottom-0 left-0 h-0.5 w-full rounded-full ${indicatorClass}`}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                {user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all select-none cursor-pointer ${
                        isHome
                          ? 'bg-white/15 hover:bg-white/25 border-white/20 text-white'
                          : 'bg-surface hover:bg-secondary border-border text-foreground/80'
                      }`}
                    >
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center ${isHome ? 'bg-white/20 text-white' : 'bg-primary-light text-primary'}`}>
                        <User className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm font-semibold max-w-[120px] truncate">
                        {user.displayName}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${isHome ? 'bg-white/20 text-white' : 'bg-primary-light text-primary'}`}>
                        {user.role === 'ARTISTA' ? 'Artista' : 'Org'}
                      </span>
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-52 rounded-2xl border border-border bg-card p-1.5 shadow-lg"
                        >
                          <Link
                            to="/dashboard"
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-surface hover:text-primary transition-colors"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                          </Link>
                          <Link
                            to="/profile"
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-surface hover:text-primary transition-colors"
                          >
                            <Settings className="h-4 w-4" />
                            Impostazioni Profilo
                          </Link>
                          <hr className="border-border my-1" />
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <LogOut className="h-4 w-4" />
                            Esci
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      {isHome ? (
                        <button className="btn-pill-white h-9 px-5 text-sm font-semibold">
                          Accedi
                        </button>
                      ) : (
                        <Button variant="ghost" size="sm" className="text-foreground hover:text-primary font-semibold">
                          Accedi
                        </Button>
                      )}
                    </Link>
                    {!isHome && (
                      <Link to="/register">
                        <Button variant="primary" size="sm" className="font-semibold shadow-sm rounded-full">
                          Inizia Ora
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>

            <button
              className={`md:hidden transition-colors p-1 ${isHome ? 'text-white hover:text-white/80' : 'text-foreground/85 hover:text-primary'}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t px-4 py-6 overflow-hidden ${isHome ? 'border-white/20 bg-primary' : 'border-border bg-card/95'}`}
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-bold transition-colors flex items-center gap-2 py-1 ${isHome ? 'text-white hover:text-white/80' : 'text-foreground/85 hover:text-primary'}`}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="h-5 w-5 opacity-75" />
                  {link.name}
                </Link>
              ))}
              
              <hr className={`my-2 ${isHome ? 'border-white/20' : 'border-border'}`} />
              
              {user ? (
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 px-1 text-sm ${isHome ? 'text-white/70' : 'text-foreground/60'}`}>
                    <User className={`h-4.5 w-4.5 ${isHome ? 'text-white' : 'text-primary'}`} />
                    <span className={`font-semibold ${isHome ? 'text-white' : 'text-foreground/85'}`}>{user.displayName}</span>
                  </div>
                  
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block">
                    <Button variant="ghost" className="justify-start gap-2.5 w-full font-medium">
                      <LayoutDashboard className="h-4.5 w-4.5" /> Dashboard
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="block">
                    <Button variant="ghost" className="justify-start gap-2.5 w-full font-medium">
                      <Settings className="h-4.5 w-4.5" /> Impostazioni Profilo
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={handleLogout} className="justify-start gap-2.5 text-red-500 w-full font-medium">
                    <LogOut className="h-4.5 w-4.5" /> Esci
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 pt-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    {isHome ? (
                      <button className="btn-pill-white w-full h-11 text-sm font-semibold">Accedi</button>
                    ) : (
                      <Button variant="outline" className="w-full rounded-full">Accedi</Button>
                    )}
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" className="w-full rounded-full">Inizia Ora</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

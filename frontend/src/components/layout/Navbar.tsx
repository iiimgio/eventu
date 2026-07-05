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

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/60 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          
          {}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center"
            >
              {}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-xl blur-md opacity-45 group-hover:opacity-80 transition-opacity duration-300" />
              
              {}
              <div className="relative h-10 w-10 rounded-xl bg-black border border-border flex items-center justify-center overflow-hidden">
                <img src="/eventu-logo.png" alt="Event.u Logo" className="h-full w-full object-cover" />
              </div>
            </motion.div>
            <span className="text-2xl font-black tracking-wider text-gradient font-display">
              EVENT.U
            </span>
          </Link>

          {}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative text-sm font-medium transition-colors hover:text-primary py-1.5 flex items-center gap-1.5 ${
                      isActive ? 'text-primary' : 'text-foreground/70'
                    }`}
                  >
                    <link.icon className="h-4 w-4 opacity-70" />
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card hover:bg-card/80 border border-border hover:border-primary/30 transition-all select-none cursor-pointer"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                      <User className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-semibold text-foreground/80 max-w-[120px] truncate">
                      {user.displayName}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] uppercase font-bold">
                      {user.role}
                    </span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-52 rounded-2xl border border-border bg-card/95 backdrop-blur-lg p-2 shadow-xl"
                      >
                        <Link
                          to="/dashboard"
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-background/60 hover:text-primary transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-background/60 hover:text-primary transition-colors"
                        >
                          <Settings className="h-4 w-4" />
                          Impostazioni Profilo
                        </Link>
                        <hr className="border-border my-1.5" />
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
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
                    <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-primary">
                      Accedi
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="relative group overflow-hidden">
                      <span className="relative z-10">Inizia Ora</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {}
          <button
            className="md:hidden text-foreground/80 hover:text-primary transition-colors p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card/95 backdrop-blur-lg px-4 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-lg font-semibold text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="h-5 w-5 opacity-60" />
                  {link.name}
                </Link>
              ))}
              
              <hr className="border-border my-2" />
              
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1 text-sm text-foreground/60">
                    <User className="h-4.5 w-4.5 text-primary" />
                    <span className="font-semibold text-foreground/85">{user.displayName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                      {user.role}
                    </span>
                  </div>
                  
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block">
                    <Button variant="ghost" className="justify-start gap-2.5 w-full">
                      <LayoutDashboard className="h-4.5 w-4.5" /> Dashboard
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="block">
                    <Button variant="ghost" className="justify-start gap-2.5 w-full">
                      <Settings className="h-4.5 w-4.5" /> Impostazioni Profilo
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={handleLogout} className="justify-start gap-2.5 text-red-400 w-full">
                    <LogOut className="h-4.5 w-4.5" /> Esci
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 pt-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Accedi</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary">Inizia Ora</Button>
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

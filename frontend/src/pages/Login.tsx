import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Errore di login.');
    }
  };

  const inputBase = "w-full h-12 pl-11 pr-4 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-20 px-4 relative overflow-hidden">
      {}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-10 right-10 w-[280px] h-[280px] bg-secondary/10 rounded-full blur-[90px] -z-10" />
      {}
      <div className="absolute inset-0 -z-10 opacity-15"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="glass-panel rounded-3xl p-8 shadow-2xl border border-border">
          {}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border mb-4"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="10" width="2.5" height="8" rx="1" fill="url(#login-g)" />
                <rect x="7.5" y="6" width="2.5" height="12" rx="1" fill="url(#login-g)" />
                <rect x="12" y="12" width="2.5" height="6" rx="1" fill="url(#login-g)" />
                <rect x="16.5" y="8" width="2.5" height="10" rx="1" fill="url(#login-g)" />
                <defs>
                  <linearGradient id="login-g" x1="3" y1="6" x2="19" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ec4899" /><stop offset="1" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <h1 className="text-3xl font-black mb-1">Bentornato!</h1>
            <p className="text-foreground/50 text-sm">Accedi al tuo account Event.u</p>
          </div>

          {}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/70 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/35" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="la-tua@email.com"
                  className={inputBase}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground/70 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/35" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputBase + ' pr-11'}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/35 hover:text-foreground/70 transition-colors">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full h-12 gap-2 mt-2" size="lg">
              <LogIn className="h-4 w-4" /> Accedi
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-border text-center">
            <p className="text-sm text-foreground/50">
              Non hai un account?{' '}
              <Link to="/register" className="text-primary hover:text-primary/80 font-bold transition-colors">
                Registrati gratis
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

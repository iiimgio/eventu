import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Music, Building2, AlertCircle, ArrowLeft, ArrowRight, Camera, Link as LinkIcon, Video, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import type { RegisterArtistaData, RegisterOrganizzatoreData } from '../context/AuthContext';

type Role = 'ARTISTA' | 'ORGANIZZATORE' | null;

export const Register = () => {
  const [step, setStep] = useState<'role' | 'form'>('role');
  const [role, setRole] = useState<Role>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nomeArtista, setNomeArtista] = useState('');
  const [genereMusicale, setGenereMusicale] = useState('');
  const [citta, setCitta] = useState('');
  const [cachet, setCachet] = useState('');
  const [fotoProfilo, setFotoProfilo] = useState('');
  const [linkSocial, setLinkSocial] = useState('');
  const [linkVideo, setLinkVideo] = useState('');
  const [tipo, setTipo] = useState<'PERSONA_FISICA' | 'AZIENDA' | 'ASSOCIAZIONE'>('PERSONA_FISICA');
  const [descrizione, setDescrizione] = useState('');
  const [cittaOrg, setCittaOrg] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sitoWeb, setSitoWeb] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    let data: RegisterArtistaData | RegisterOrganizzatoreData;
    if (role === 'ARTISTA') {
      data = { role: 'ARTISTA', nome, cognome, email, password, nomeArtista: nomeArtista || nome, genereMusicale, citta, cachet: parseFloat(cachet) || 0, disponibile: true, fotoProfilo, linkSocial, linkVideo };
    } else {
      data = { role: 'ORGANIZZATORE', nome, cognome, email, password, tipo, descrizione, citta: cittaOrg, telefono, sitoWeb };
    }
    const result = await register(data);
    setIsLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Errore durante la registrazione.');
    }
  };

  const inputClass = "w-full h-11 px-4 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-primary/45 focus:border-primary/40 transition-all text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg"
      >
        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary-light border border-primary/10 text-primary mb-4">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold mb-1 text-foreground">Crea Account</h1>
            <p className="text-muted text-sm font-medium">
              {step === 'role' ? 'Scegli come vuoi usare Event.u' : `Registrati come ${role === 'ARTISTA' ? 'Artista' : 'Organizzatore'}`}
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="flex gap-2 mb-7">
            <div className="flex-1 h-1 rounded-full bg-primary" />
            <div className={`flex-1 h-1 rounded-full transition-colors ${step === 'form' ? 'bg-primary' : 'bg-border'}`} />
          </div>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-55 border border-red-100 text-red-650 text-sm mb-6"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-red-650" /><span>{error}</span>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 'role' ? (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="grid grid-cols-1 gap-4"
              >
                {[
                  {
                    r: 'ARTISTA' as const,
                    icon: Music,
                    title: 'Sono un Artista',
                    desc: 'Crea il tuo profilo, carica video, trova eventi e candidati per esibirti.',
                    color: 'border-border hover:border-primary/45 bg-white',
                    iconBg: 'bg-primary-light text-primary border border-primary/10',
                  },
                  {
                    r: 'ORGANIZZATORE' as const,
                    icon: Building2,
                    title: 'Sono un Organizzatore',
                    desc: 'Pubblica eventi, cerca artisti per la tua lineup e gestisci tutto da un unico posto.',
                    color: 'border-border hover:border-primary/45 bg-white',
                    iconBg: 'bg-primary-light text-primary border border-primary/10',
                  },
                ].map(({ r, icon: Icon, title, desc, color, iconBg }) => (
                  <button
                    key={r}
                    onClick={() => { setRole(r); setStep('form'); }}
                    className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${color}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`h-11 w-11 rounded-lg flex items-center justify-center shrink-0 border ${iconBg}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
                        <p className="text-sm text-muted leading-relaxed font-normal">{desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <button type="button" onClick={() => setStep('role')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-primary uppercase tracking-wider transition-colors mb-1 cursor-pointer">
                  <ArrowLeft className="h-3.5 w-3.5" /> Cambia ruolo
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Nome *</label>
                    <input type="text" required value={nome} onChange={e => setNome(e.target.value)} placeholder="Mario" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Cognome *</label>
                    <input type="text" required value={cognome} onChange={e => setCognome(e.target.value)} placeholder="Rossi" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Email *</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="la-tua@email.com" className={inputClass} />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Password *</label>
                  <div className="relative">
                    <input type={showPass ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className={inputClass + ' pr-10'} />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-4">
                    {role === 'ARTISTA' ? 'Dettagli Artista' : 'Dettagli Organizzatore'}
                  </p>
                </div>

                {role === 'ARTISTA' ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Nome d'Arte</label>
                      <input type="text" value={nomeArtista} onChange={e => setNomeArtista(e.target.value)} placeholder="Es: DJ Shadow, MC Flow..." className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Genere Musicale</label>
                        <input type="text" value={genereMusicale} onChange={e => setGenereMusicale(e.target.value)} placeholder="Hip Hop, House, Rap..." className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Città</label>
                        <input type="text" value={citta} onChange={e => setCitta(e.target.value)} placeholder="Milano" className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Cachet Richiesto (€)</label>
                      <input type="number" min="0" step="50" value={cachet} onChange={e => setCachet(e.target.value)} placeholder="500" className={inputClass} />
                    </div>
                    <div className="border-t border-border pt-3 pb-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Link Facoltativi</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5 flex items-center gap-1.5"><Camera className="h-3 w-3 text-primary" /> Foto Profilo (URL)</label>
                      <input type="url" value={fotoProfilo} onChange={e => setFotoProfilo(e.target.value)} placeholder="https://..." className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5 flex items-center gap-1.5"><LinkIcon className="h-3 w-3 text-primary" /> Instagram / Social</label>
                      <input type="url" value={linkSocial} onChange={e => setLinkSocial(e.target.value)} placeholder="https://instagram.com/..." className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5 flex items-center gap-1.5"><Video className="h-3 w-3 text-primary" /> Video YouTube</label>
                      <input type="url" value={linkVideo} onChange={e => setLinkVideo(e.target.value)} placeholder="https://youtube.com/watch?v=..." className={inputClass} />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Tipo Organizzazione *</label>
                      <select value={tipo} onChange={e => setTipo(e.target.value as any)} className="w-full h-11 px-3.5 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm">
                        <option value="PERSONA_FISICA">Persona Fisica</option>
                        <option value="AZIENDA">Azienda / Società</option>
                        <option value="ASSOCIAZIONE">Associazione Culturale</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Descrizione</label>
                      <input type="text" value={descrizione} onChange={e => setDescrizione(e.target.value)} placeholder="Chi sei e cosa organizzi..." className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Città</label>
                        <input type="text" value={cittaOrg} onChange={e => setCittaOrg(e.target.value)} placeholder="Roma" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Telefono</label>
                        <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="+39 ..." className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Sito Web</label>
                      <input type="url" value={sitoWeb} onChange={e => setSitoWeb(e.target.value)} placeholder="https://..." className={inputClass} />
                    </div>
                  </>
                )}

                <Button type="submit" isLoading={isLoading} className="w-full h-11 gap-2 mt-4 font-semibold shadow-sm"
                  variant="primary" size="lg">
                  <UserPlus className="h-4 w-4" />
                  Crea Account {role === 'ARTISTA' ? 'Artista' : 'Organizzatore'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-5 pt-5 border-t border-border text-center">
            <p className="text-sm text-muted font-medium">
              Hai già un account?{' '}
              <Link to="/login" className="text-primary hover:text-primary-hover font-bold transition-colors">Accedi</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

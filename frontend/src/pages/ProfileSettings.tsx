import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Camera, Link as LinkIcon, Video, CheckCircle2, AlertCircle, Loader2, Phone, Globe, FileText, MapPin, DollarSign, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import type { ArtistaDto, OrganizzatoreDto } from '../types';

export const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const [nomeArtista, setNomeArtista] = useState('');
  const [genereMusicale, setGenereMusicale] = useState('');
  const [citta, setCitta] = useState('');
  const [cachet, setCachet] = useState('');
  const [disponibile, setDisponibile] = useState(true);
  const [fotoProfilo, setFotoProfilo] = useState('');
  const [linkSocial, setLinkSocial] = useState('');
  const [linkVideo, setLinkVideo] = useState('');

  
  const [tipo, setTipo] = useState<'PERSONA_FISICA' | 'AZIENDA' | 'ASSOCIAZIONE'>('PERSONA_FISICA');
  const [descrizione, setDescrizione] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sitoWeb, setSitoWeb] = useState('');
  const [cittaOrg, setCittaOrg] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfileData = async () => {
      try {
        const endpoint = user.role === 'ARTISTA' ? `/artisti/${user.id}` : `/organizzatori/${user.id}`;
        const res = await fetch(endpoint);
        if (res.ok) {
          if (user.role === 'ARTISTA') {
            const data: ArtistaDto = await res.json();
            setNome(data.nome || '');
            setCognome(data.cognome || '');
            setEmail(data.email || '');
            setNomeArtista(data.nomeArtista || '');
            setGenereMusicale(data.genereMusicale || '');
            setCitta(data.citta || '');
            setCachet(data.cachet ? String(data.cachet) : '');
            setDisponibile(data.disponibile !== false);
            setFotoProfilo(data.fotoProfilo || '');
            setLinkSocial(data.linkSocial || '');
            setLinkVideo(data.linkVideo || '');
          } else {
            const data: OrganizzatoreDto = await res.json();
            setNome(data.nome || '');
            setCognome(data.cognome || '');
            setEmail(data.email || '');
            setTipo(data.tipo || 'PERSONA_FISICA');
            setDescrizione(data.descrizione || '');
            setCittaOrg(data.citta || '');
            setTelefono(data.telefono || '');
            setSitoWeb(data.sitoWeb || '');
          }
        } else {
          setError('Impossibile caricare i dati del profilo.');
        }
      } catch (err) {
        console.error('Fetch profile error:', err);
        setError('Errore di connessione al server.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const endpoint = user.role === 'ARTISTA' ? `/artisti/${user.id}` : `/organizzatori/${user.id}`;
      
      let payload: any = {
        id: user.id,
        nome,
        cognome,
        email,
        role: user.role,
      };

      if (password) {
        payload.password = password; 
      }

      if (user.role === 'ARTISTA') {
        payload = {
          ...payload,
          nomeArtista: nomeArtista || nome,
          cognomeArtista: '',
          genereMusicale,
          citta,
          cachet: parseFloat(cachet) || 0,
          disponibile,
          fotoProfilo,
          linkSocial,
          linkVideo,
        };
      } else {
        payload = {
          ...payload,
          tipo,
          descrizione,
          citta: cittaOrg,
          telefono,
          sitoWeb,
        };
      }

      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const savedData = await res.json();
        setSuccess(true);
        
        setPassword('');
        
        const newDisplayName = user.role === 'ARTISTA' 
          ? (savedData.nomeArtista || `${nome} ${cognome}`.trim())
          : `${nome} ${cognome}`.trim();
        updateUser({
          nome,
          cognome,
          displayName: newDisplayName,
        });
      } else {
        const text = await res.text();
        setError(`Errore durante il salvataggio (${res.status}): ${text || 'Verifica i campi.'}`);
      }
    } catch (err) {
      console.error('Save profile exception:', err);
      setError('Impossibile connettersi al server per salvare.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full h-11 px-4 rounded-lg bg-background/50 border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all";
  const textareaClass = "w-full px-4 py-3 rounded-lg bg-background/50 border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 container mx-auto max-w-2xl relative">
      {}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-secondary/15 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Impostazioni Profilo</h1>
            <p className="text-foreground/60 text-sm">Aggiorna le tue informazioni personali e di visibilità.</p>
          </div>
        </div>

        {}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div>
              <span className="font-semibold">Profilo aggiornato!</span> Le modifiche sono state salvate correttamente nel database.
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="h-4 w-4" /> Informazioni Personali
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Nome *</label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Cognome *</label>
                <input
                  type="text"
                  required
                  value={cognome}
                  onChange={e => setCognome(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
                <input
                  type="email"
                  required
                  value={email}
                  disabled 
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-background/30 border border-border text-foreground/50 cursor-not-allowed text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Modifica Password</label>
              <input
                type="password"
                placeholder="Lascia vuoto per non cambiarla"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {}
          {user?.role === 'ARTISTA' && (
            <div className="border-t border-border pt-6 space-y-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> Profilo Artista
              </h3>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Nome d'Arte *</label>
                <input
                  type="text"
                  required
                  value={nomeArtista}
                  onChange={e => setNomeArtista(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">Genere Musicale</label>
                  <input
                    type="text"
                    value={genereMusicale}
                    onChange={e => setGenereMusicale(e.target.value)}
                    placeholder="Hip Hop, Rap, House, Rock..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">Città</label>
                  <input
                    type="text"
                    value={citta}
                    onChange={e => setCitta(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">Cachet Richiesto (€)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                    <input
                      type="number"
                      min="0"
                      value={cachet}
                      onChange={e => setCachet(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-lg bg-background/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center h-full pt-6">
                  <label className="relative flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={disponibile}
                      onChange={e => setDisponibile(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-background border border-border rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-foreground/50 after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500/20 peer-checked:border-green-500/50 peer-checked:after:bg-green-400 relative"></div>
                    <span className="text-sm font-medium text-foreground/80">
                      Disponibile per Eventi
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1 flex items-center gap-1.5">
                  <Camera className="h-4 w-4 text-foreground/50" /> URL Foto Profilo
                </label>
                <input
                  type="url"
                  value={fotoProfilo}
                  onChange={e => setFotoProfilo(e.target.value)}
                  className={inputClass}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1 flex items-center gap-1.5">
                  <LinkIcon className="h-4 w-4 text-foreground/50" /> URL Social Link
                </label>
                <input
                  type="url"
                  value={linkSocial}
                  onChange={e => setLinkSocial(e.target.value)}
                  className={inputClass}
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1 flex items-center gap-1.5">
                  <Video className="h-4 w-4 text-foreground/50" /> URL Video Youtube/SoundCloud
                </label>
                <input
                  type="url"
                  value={linkVideo}
                  onChange={e => setLinkVideo(e.target.value)}
                  className={inputClass}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>
          )}

          {/* Sezione Specifica per Organizzatore */}
          {user?.role === 'ORGANIZZATORE' && (
            <div className="border-t border-border pt-6 space-y-4">
              <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="h-4 w-4" /> Informazioni Organizzatore
              </h3>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Tipologia di Organizzatore *</label>
                <select
                  value={tipo}
                  onChange={e => setTipo(e.target.value as any)}
                  className={inputClass}
                >
                  <option value="PERSONA_FISICA">Persona Fisica</option>
                  <option value="AZIENDA">Azienda / Società</option>
                  <option value="ASSOCIAZIONE">Associazione Culturale</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Descrizione</label>
                <textarea
                  rows={4}
                  value={descrizione}
                  onChange={e => setDescrizione(e.target.value)}
                  className={textareaClass}
                  placeholder="Descrivi chi sei, la tipologia di eventi che organizzi..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-foreground/50" /> Città Sede
                  </label>
                  <input
                    type="text"
                    value={cittaOrg}
                    onChange={e => setCittaOrg(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1 flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-foreground/50" /> Telefono Contatto
                  </label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1 flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-foreground/50" /> Sito Web / Portfolio
                </label>
                <input
                  type="url"
                  value={sitoWeb}
                  onChange={e => setSitoWeb(e.target.value)}
                  className={inputClass}
                  placeholder="https://..."
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            isLoading={saving}
            disabled={saving}
            className="w-full h-11 gap-2 mt-4"
            size="lg"
            variant={user?.role === 'ARTISTA' ? 'primary' : 'secondary'}
          >
            <FileText className="h-4 w-4" /> Salva Modifiche
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

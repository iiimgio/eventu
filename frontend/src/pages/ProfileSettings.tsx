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

  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 container mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-border bg-white rounded-2xl p-6 md:p-8 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-primary-light flex items-center justify-center text-primary border border-primary/10 shadow-sm shrink-0">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">Impostazioni Profilo</h1>
            <p className="text-muted text-sm font-medium">Aggiorna le tue informazioni personali e di visibilità.</p>
          </div>
        </div>

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-100 text-green-605 text-sm mb-6"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-605" />
            <div>
              <span className="font-bold">Profilo aggiornato!</span> Le modifiche sono state salvate correttamente nel database.
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-650 text-sm mb-6"
          >
            <AlertCircle className="h-5 w-5 shrink-0 text-red-655" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5 border-b border-border pb-2">
              <Shield className="h-4 w-4 text-primary" /> Informazioni Personali
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Nome *</label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Cognome *</label>
                <input
                  type="text"
                  required
                  value={cognome}
                  onChange={e => setCognome(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted/50" />
                <input
                  type="email"
                  required
                  value={email}
                  disabled 
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface border border-border text-muted/60 cursor-not-allowed text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Modifica Password</label>
              <input
                type="password"
                placeholder="Lascia vuoto per non cambiarla"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
              />
            </div>
          </div>

          {user?.role === 'ARTISTA' && (
            <div className="border-t border-border pt-6 space-y-4">
              <h3 className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5 border-b border-border pb-2">
                <Sparkles className="h-4 w-4 text-primary" /> Profilo Artista
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Nome d'Arte *</label>
                <input
                  type="text"
                  required
                  value={nomeArtista}
                  onChange={e => setNomeArtista(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Genere Musicale</label>
                  <input
                    type="text"
                    value={genereMusicale}
                    onChange={e => setGenereMusicale(e.target.value)}
                    placeholder="Hip Hop, Rap, House, Rock..."
                    className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Città</label>
                  <input
                    type="text"
                    value={citta}
                    onChange={e => setCitta(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Cachet Richiesto (€)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted/65" />
                    <input
                      type="number"
                      min="0"
                      value={cachet}
                      onChange={e => setCachet(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
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
                    <div className="w-11 h-6 bg-secondary border border-border rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-muted/80 after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500/20 peer-checked:border-green-500 peer-checked:after:bg-green-600 relative"></div>
                    <span className="text-sm font-semibold text-foreground/80">
                      Disponibile per Eventi
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5 flex items-center gap-1.5">
                  <Camera className="h-4 w-4 text-primary" /> URL Foto Profilo
                </label>
                <input
                  type="url"
                  value={fotoProfilo}
                  onChange={e => setFotoProfilo(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5 flex items-center gap-1.5">
                  <LinkIcon className="h-4 w-4 text-primary" /> URL Social Link
                </label>
                <input
                  type="url"
                  value={linkSocial}
                  onChange={e => setLinkSocial(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5 flex items-center gap-1.5">
                  <Video className="h-4 w-4 text-primary" /> URL Video Youtube
                </label>
                <input
                  type="url"
                  value={linkVideo}
                  onChange={e => setLinkVideo(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>
          )}

          {user?.role === 'ORGANIZZATORE' && (
            <div className="border-t border-border pt-6 space-y-4">
              <h3 className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5 border-b border-border pb-2">
                <Globe className="h-4 w-4 text-primary" /> Informazioni Organizzatore
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Tipologia di Organizzatore *</label>
                <select
                  value={tipo}
                  onChange={e => setTipo(e.target.value as any)}
                  className="w-full h-11 px-3.5 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                >
                  <option value="PERSONA_FISICA">Persona Fisica</option>
                  <option value="AZIENDA">Azienda / Società</option>
                  <option value="ASSOCIAZIONE">Associazione Culturale</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Descrizione</label>
                <textarea
                  rows={4}
                  value={descrizione}
                  onChange={e => setDescrizione(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
                  placeholder="Descrivi chi sei, la tipologia di eventi che organizzi..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-primary" /> Città Sede
                  </label>
                  <input
                    type="text"
                    value={cittaOrg}
                    onChange={e => setCittaOrg(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5 flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-primary" /> Telefono Contatto
                  </label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5 flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-primary" /> Sito Web / Portfolio
                </label>
                <input
                  type="url"
                  value={sitoWeb}
                  onChange={e => setSitoWeb(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            isLoading={saving}
            disabled={saving}
            className="w-full h-11 gap-2 mt-4 font-semibold shadow-sm"
            size="lg"
            variant="primary"
          >
            <FileText className="h-4 w-4" /> Salva Modifiche
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

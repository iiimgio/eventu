import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarDays, MapPin, ArrowLeft, Loader2, AlertCircle,
  Music, Send, CheckCircle2, Clock, DollarSign, ExternalLink,
  ChevronLeft, ChevronRight, Building2, User
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { getEventPhotos, getMapsLinkUrl } from '../utils/photoStore';
import type { EventoDto, CandidaturaDto, OrganizzatoreDto } from '../types';

const getCategoryPhoto = (tipoEvento?: string, title?: string): string => {
  const t = (tipoEvento || '').toLowerCase();
  const s = (title || '').toLowerCase();
  if (t.includes('rap') || s.includes('rap')) return '/event-rap.png';
  if (t.includes('house') || s.includes('house')) return '/event-house.png';
  if (t.includes('hip') || s.includes('hip') || t.includes('hop') || s.includes('hop')) return '/event-hiphop.png';
  return '/event-festival.png';
};

export const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventoDto | null>(null);
  const [organizer, setOrganizer] = useState<OrganizzatoreDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [myCandidature, setMyCandidature] = useState<CandidaturaDto[]>([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/eventi/${id}`);
        if (!res.ok) throw new Error('Evento non trovato');
        const data: EventoDto = await res.json();
        setEvent(data);
        setPhotos(getEventPhotos(data.id));

        
        if (data.organizzatoreId) {
          const orgRes = await fetch(`/organizzatori/${data.organizzatoreId}`);
          if (orgRes.ok) setOrganizer(await orgRes.json());
        }
      } catch {
        setError("Impossibile caricare l'evento.");
      }
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (user?.role === 'ARTISTA') {
      fetch(`/candidature/artista/${user.id}`)
        .then(r => r.ok ? r.json() : [])
        .then(setMyCandidature)
        .catch(() => {});
    }
  }, [user]);

  const alreadyApplied = myCandidature.some(c => c.eventoId === Number(id));

  const handleApply = async () => {
    if (!user) { navigate('/login'); return; }
    setSending(true);
    try {
      const res = await fetch('/candidature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          utentePresentazione: message,
          artistaId: user.id,
          eventoId: Number(id),
        }),
      });
      if (res.ok) setSent(true);
    } catch {  }
    setSending(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );

  if (error || !event) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-16 gap-4">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <p className="text-foreground/70">{error || 'Evento non trovato'}</p>
      <Link to="/events"><Button variant="outline">← Torna agli eventi</Button></Link>
    </div>
  );

  return (
    <div className="pt-24 pb-20 container mx-auto px-4 min-h-screen max-w-4xl relative">
      {}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <Link to="/events" className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Torna agli eventi
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-border"
      >
        {}
        {photos.length > 0 ? (
          <div className="relative h-72 md:h-96 w-full overflow-hidden bg-black">
            <img
              src={photos[currentPhoto]}
              alt={`${event.titolo} - foto ${currentPhoto + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {photos.length > 1 && (
              <>
                <button onClick={() => setCurrentPhoto(p => p === 0 ? photos.length - 1 : p - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-sm flex items-center justify-center text-white transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => setCurrentPhoto(p => p === photos.length - 1 ? 0 : p + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-sm flex items-center justify-center text-white transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {photos.map((_, i) => (
                    <button key={i} onClick={() => setCurrentPhoto(i)}
                      className={`h-1.5 rounded-full transition-all ${i === currentPhoto ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />
                  ))}
                </div>
              </>
            )}

            {event.tipoEvento && (
              <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 glass-panel rounded-full border border-border/50 text-white">
                {event.tipoEvento}
              </span>
            )}
            <span className="absolute top-4 right-4 text-xs glass-panel px-2.5 py-1 rounded-full text-white/70">
              {currentPhoto + 1} / {photos.length}
            </span>
          </div>
        ) : (
          <div className="relative h-72 md:h-96 bg-black overflow-hidden">
            <img
              src={getCategoryPhoto(event.tipoEvento, event.titolo)}
              alt={event.titolo}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {event.tipoEvento && (
              <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 glass-panel rounded-full border border-border/50 text-white">
                {event.tipoEvento}
              </span>
            )}
          </div>
        )}

        {}
        {photos.length > 1 && (
          <div className="flex gap-2 p-3 bg-black/30 overflow-x-auto">
            {photos.map((src, i) => (
              <button key={i} onClick={() => setCurrentPhoto(i)}
                className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === currentPhoto ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {}
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-black mb-6">{event.titolo}</h1>

          {}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="flex items-center gap-3 bg-background/50 rounded-2xl p-4 border border-border">
              <CalendarDays className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-foreground/40 font-bold">Data</p>
                <p className="text-sm font-semibold">{event.data}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/50 rounded-2xl p-4 border border-border">
              <Clock className="h-5 w-5 text-secondary shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-foreground/40 font-bold">Orario</p>
                <p className="text-sm font-semibold">{event.orarioInizio?.slice(0, 5)} – {event.orarioFine?.slice(0, 5)}</p>
              </div>
            </div>
            <a href={getMapsLinkUrl(event.luogo)} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-background/50 rounded-2xl p-4 border border-border hover:border-primary/40 transition-colors group">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-foreground/40 font-bold">Luogo</p>
                <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{event.luogo}</p>
              </div>
              <ExternalLink className="h-3 w-3 text-foreground/30 group-hover:text-primary shrink-0" />
            </a>
          </div>

          {event.budget && (
            <div className="flex items-center gap-2 mb-6 text-green-400 font-bold text-lg">
              <DollarSign className="h-5 w-5" /> Budget offerto: €{event.budget}
            </div>
          )}

          {event.artistaCercato && (
            <div className="mb-6 flex items-center gap-2 px-4 py-3 rounded-2xl bg-secondary/10 border border-secondary/20 text-sm">
              <Music className="h-4 w-4 text-secondary shrink-0" />
              <span className="text-foreground/70">Artista cercato: </span>
              <span className="font-semibold text-secondary">{event.artistaCercato}</span>
            </div>
          )}

          {event.descrizione && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-2">Descrizione</h2>
              <p className="text-foreground/65 leading-relaxed">{event.descrizione}</p>
            </div>
          )}

          {}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> Posizione
            </h2>
            <div className="rounded-2xl overflow-hidden border border-border h-56">
              <iframe
                title="Mappa evento"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(event.luogo)}&output=embed`}
              />
            </div>
            <a href={getMapsLinkUrl(event.luogo)} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2">
              <ExternalLink className="h-3 w-3" /> Apri su Google Maps
            </a>
          </div>

          {}
          {organizer && (
            <div className="mb-8 p-5 rounded-2xl bg-background/50 border border-border">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/40 mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Organizzatore
              </h2>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                  <Building2 className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">{organizer.nome} {organizer.cognome}</p>
                  <p className="text-xs text-foreground/50">{organizer.citta} · {organizer.tipo?.replace('_', ' ')}</p>
                </div>
                <Link to={`/organizers/${organizer.id}`}>
                  <Button size="sm" variant="outline" className="gap-1.5">
                    <User className="h-3.5 w-3.5" /> Profilo
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {}
          {user?.role === 'ARTISTA' && (
            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Music className="h-5 w-5 text-primary" /> Candidati per questo Evento
              </h2>
              {alreadyApplied || sent ? (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <div>
                    <span className="font-bold">Candidatura inviata!</span>
                    <p className="text-sm opacity-80">L'organizzatore valuterà la tua candidatura a breve.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Presentati: descrivi il tuo sound, la tua esperienza live, perché sei perfetto per questo evento..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl bg-background/50 border border-border text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none text-sm"
                  />
                  <Button onClick={handleApply} isLoading={sending} className="gap-2" size="lg">
                    <Send className="h-4 w-4" /> Invia Candidatura
                  </Button>
                </div>
              )}
            </div>
          )}

          {}
          {!user && (
            <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-foreground/55 text-sm">Sei un artista? Accedi per candidarti a questo evento.</p>
              <Link to="/login">
                <Button variant="secondary" className="gap-2 shrink-0">
                  <Music className="h-4 w-4" /> Accedi come Artista
                </Button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

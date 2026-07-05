import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  CalendarPlus, Music, CheckCircle2, XCircle, Clock, Send,
  MapPin, CalendarDays, Loader2, Trash2, Eye, Users, ImagePlus, X,
  ExternalLink, Edit2, User, TrendingUp
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { saveEventPhotos, getEventPhotos, fileToDataUrl, getMapsLinkUrl } from '../utils/photoStore';
import type { EventoDto, CandidaturaDto } from '../types';

const getCategoryPhoto = (tipoEvento?: string, title?: string): string => {
  const t = (tipoEvento || '').toLowerCase();
  const s = (title || '').toLowerCase();
  if (t.includes('rap') || s.includes('rap')) return '/event-rap.png';
  if (t.includes('house') || s.includes('house')) return '/event-house.png';
  if (t.includes('hip') || s.includes('hip') || t.includes('hop') || s.includes('hop')) return '/event-hiphop.png';
  return '/event-festival.png';
};

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!user) navigate('/login'); }, [user, navigate]);
  if (!user) return null;
  return user.role === 'ORGANIZZATORE'
    ? <OrganizerDashboard userId={user.id} displayName={user.displayName} />
    : <ArtistDashboard userId={user.id} displayName={user.displayName} />;
};


function OrganizerDashboard({ userId, displayName }: { userId: number; displayName: string }) {
  const [events, setEvents] = useState<EventoDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventoDto | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventoDto | null>(null);
  const [candidature, setCandidature] = useState<CandidaturaDto[]>([]);
  const [loadingCand, setLoadingCand] = useState(false);

  const [titolo, setTitolo] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [luogo, setLuogo] = useState('');
  const [tipoEvento, setTipoEvento] = useState('');
  const [budget, setBudget] = useState('');
  const [data, setData] = useState('');
  const [orarioInizio, setOrarioInizio] = useState('');
  const [orarioFine, setOrarioFine] = useState('');
  const [artistaCercato, setArtistaCercato] = useState('');
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/eventi/getAll');
      if (res.ok) {
        const all: EventoDto[] = await res.json();
        setEvents(all.filter(e => e.organizzatoreId === userId));
      }
    } catch {  }
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, [userId]);

  const resetForm = () => {
    setTitolo(''); setDescrizione(''); setLuogo(''); setTipoEvento('');
    setBudget(''); setData(''); setOrarioInizio(''); setOrarioFine('');
    setArtistaCercato(''); setPhotoPreviews([]); setFormError(null); setEditingEvent(null);
  };

  const openEdit = (ev: EventoDto) => {
    setEditingEvent(ev);
    setTitolo(ev.titolo || '');
    setDescrizione(ev.descrizione || '');
    setLuogo(ev.luogo || '');
    setTipoEvento(ev.tipoEvento || '');
    setBudget(ev.budget ? String(ev.budget) : '');
    setData(ev.data || '');
    setOrarioInizio(ev.orarioInizio?.slice(0, 5) || '');
    setOrarioFine(ev.orarioFine?.slice(0, 5) || '');
    setArtistaCercato(ev.artistaCercato || '');
    setPhotoPreviews(getEventPhotos(ev.id));
    setShowForm(true);
  };

  const handlePhotoAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newP: string[] = [];
    for (let i = 0; i < files.length && photoPreviews.length + newP.length < 5; i++) {
      newP.push(await fileToDataUrl(files[i]));
    }
    setPhotoPreviews(prev => [...prev, ...newP]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);
    const inizio = orarioInizio.length === 5 ? orarioInizio + ':00' : orarioInizio;
    const fine = orarioFine.length === 5 ? orarioFine + ':00' : orarioFine;
    const body = {
      titolo, descrizione, luogo, tipoEvento,
      budget: parseFloat(budget) || 0, data, orarioInizio: inizio, orarioFine: fine,
      artistaCercato: artistaCercato || null,
    };
    try {
      let res: Response;
      if (editingEvent) {
        res = await fetch(`/eventi/${editingEvent.id}/organizzatore/${userId}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
      } else {
        res = await fetch(`/eventi/organizzatore/${userId}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
      }
      if (res.ok) {
        const saved: EventoDto = await res.json();
        if (photoPreviews.length > 0) saveEventPhotos(saved.id, photoPreviews);
        setShowForm(false);
        resetForm();
        fetchEvents();
      } else {
        setFormError(`Errore dal server (${res.status}). Verifica i dati inseriti.`);
      }
    } catch {
      setFormError('Impossibile connettersi al server.');
    }
    setSaving(false);
  };

  const handleDelete = async (ev: EventoDto) => {
    if (!confirm('Eliminare questo evento?')) return;
    await fetch(`/eventi/${ev.id}/organizzatore/${userId}`, { method: 'DELETE' });
    fetchEvents();
  };

  const viewCandidature = async (ev: EventoDto) => {
    setSelectedEvent(ev);
    setLoadingCand(true);
    try {
      const res = await fetch(`/candidature/evento/${ev.id}`);
      if (res.ok) setCandidature(await res.json());
    } catch {  }
    setLoadingCand(false);
  };

  const updateStato = async (candId: number, stato: 'ACCETTATA' | 'RIFIUTATA') => {
    await fetch(`/candidature/${candId}/stato?stato=${stato}`, { method: 'PUT' });
    if (selectedEvent) viewCandidature(selectedEvent);
  };

  const inputClass = "w-full h-10 px-3 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm transition-all";

  const statoColors: Record<string, string> = {
    IN_ATTESA: 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20',
    ACCETTATA: 'text-green-400 bg-green-500/10 border border-green-500/20',
    RIFIUTATA: 'text-red-400 bg-red-500/10 border border-red-500/20',
  };

  return (
    <div className="pt-24 pb-20 container mx-auto px-4 min-h-screen relative">
      {}
      <div className="absolute top-32 right-0 w-[350px] h-[350px] bg-secondary/6 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">Dashboard Organizzatore</span>
        <h1 className="text-3xl md:text-5xl font-black mb-2">
          Ciao, <span className="text-gradient">{displayName}</span> 👋
        </h1>
        <p className="text-foreground/50">Gestisci i tuoi eventi e le candidature degli artisti.</p>
      </motion.div>

      {}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'I tuoi eventi', value: events.length, icon: CalendarDays, color: 'text-primary' },
          { label: 'In programmazione', value: events.filter(e => new Date(e.data) >= new Date()).length, icon: TrendingUp, color: 'text-secondary' },
          { label: 'Totale foto', value: events.reduce((sum, e) => sum + getEventPhotos(e.id).length, 0), icon: ImagePlus, color: 'text-accent' },
          { label: 'Artisti cercati', value: events.filter(e => e.artistaCercato).length, icon: Music, color: 'text-green-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-panel rounded-2xl p-4 border border-border">
            <div className={`${color} mb-2`}><Icon className="h-5 w-5" /></div>
            <div className="text-2xl font-black">{value}</div>
            <div className="text-xs text-foreground/50 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {}
      <div className="mb-6">
        <Button
          onClick={() => { setShowForm(!showForm); if (showForm && !editingEvent) resetForm(); else if (showForm) { resetForm(); setShowForm(false); } }}
          className="gap-2"
        >
          <CalendarPlus className="h-4 w-4" />
          {showForm ? 'Annulla' : 'Crea Nuovo Evento'}
        </Button>
      </div>

      {}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <form onSubmit={handleCreate} className="glass-panel border border-border rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black flex items-center gap-2">
                {editingEvent ? <><Edit2 className="h-5 w-5 text-secondary" /> Modifica Evento</> : <><CalendarPlus className="h-5 w-5 text-primary" /> Nuovo Evento</>}
              </h3>

              {formError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <XCircle className="h-4 w-4 shrink-0" /><span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/40 mb-1.5">Titolo *</label>
                  <input type="text" required value={titolo} onChange={e => setTitolo(e.target.value)} placeholder="Es: Hip Hop Night Milano" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/40 mb-1.5">Tipo / Genere</label>
                  <input type="text" value={tipoEvento} onChange={e => setTipoEvento(e.target.value)} placeholder="Hip Hop, House, Concerto..." className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/40 mb-1.5">Luogo *</label>
                  <input type="text" required value={luogo} onChange={e => setLuogo(e.target.value)} placeholder="Es: Alcatraz Milano" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/40 mb-1.5">Budget Offerto (€)</label>
                  <input type="number" min="0" value={budget} onChange={e => setBudget(e.target.value)} placeholder="2000" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/40 mb-1.5">Data *</label>
                  <input type="date" required value={data} onChange={e => setData(e.target.value)} className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/40 mb-1.5">Inizio *</label>
                    <input type="time" required value={orarioInizio} onChange={e => setOrarioInizio(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/40 mb-1.5">Fine *</label>
                    <input type="time" required value={orarioFine} onChange={e => setOrarioFine(e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/40 mb-1.5">Artista Cercato</label>
                <input type="text" value={artistaCercato} onChange={e => setArtistaCercato(e.target.value)} placeholder="Es: Rapper con 2+ anni esperienza live" className={inputClass} />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/40 mb-1.5">Descrizione</label>
                <textarea value={descrizione} onChange={e => setDescrizione(e.target.value)}
                  placeholder="Descrivi l'evento..." rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm resize-none" />
              </div>

              {}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/40 mb-2">Foto Evento</label>
                {photoPreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {photoPreviews.map((src, i) => (
                      <div key={i} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-border">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setPhotoPreviews(prev => prev.filter((_, j) => j !== i))}
                          className="absolute top-1 right-1 h-5 w-5 bg-black/70 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {photoPreviews.length < 5 && (
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary/50 text-foreground/50 hover:text-primary text-sm transition-colors">
                    <ImagePlus className="h-4 w-4" /> Aggiungi foto {photoPreviews.length > 0 ? `(${photoPreviews.length}/5)` : ''}
                  </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoAdd} className="hidden" />
              </div>

              <Button type="submit" isLoading={saving} className="gap-2 w-full sm:w-auto" size="lg">
                <Send className="h-4 w-4" /> {editingEvent ? 'Salva Modifiche' : 'Crea Evento'}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 text-foreground/40">
          <CalendarPlus className="h-14 w-14 mx-auto mb-4 opacity-30" />
          <p className="text-lg">Nessun evento creato. Inizia ora!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((ev, i) => {
            const photos = getEventPhotos(ev.id);
            return (
              <motion.div key={ev.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass-panel border border-border rounded-2xl overflow-hidden flex flex-col hover:border-primary/25 transition-colors">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={photos.length > 0 ? photos[0] : getCategoryPhoto(ev.tipoEvento, ev.titolo)}
                    alt={ev.titolo}
                    className="w-full h-full object-cover"
                  />
                  {ev.tipoEvento && (
                    <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 glass-panel rounded-full border border-border/50 text-foreground/80">
                      {ev.tipoEvento}
                    </span>
                  )}
                  {ev.budget && (
                    <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 bg-green-500/80 text-white rounded-full">
                      €{ev.budget}
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <h3 className="text-base font-bold line-clamp-1">{ev.titolo}</h3>
                  <p className="text-xs text-foreground/50 line-clamp-2">{ev.descrizione || 'Nessuna descrizione'}</p>
                  <div className="space-y-1 text-xs text-foreground/60">
                    <div className="flex items-center gap-1.5"><CalendarDays className="h-3 w-3 text-primary" />{ev.data} · {ev.orarioInizio?.slice(0, 5)}</div>
                    <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-secondary" />
                      <a href={getMapsLinkUrl(ev.luogo)} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors truncate">{ev.luogo}</a>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-auto pt-1">
                    <Button size="sm" variant="outline" className="flex-1 gap-1" onClick={() => viewCandidature(ev)}>
                      <Eye className="h-3.5 w-3.5" /> Candidature
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1 hover:border-secondary/50 hover:text-secondary" onClick={() => openEdit(ev)}>
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2" onClick={() => handleDelete(ev)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel border border-border rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Candidature ricevute</h3>
                  <p className="text-sm text-foreground/50">per "{selectedEvent.titolo}"</p>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-foreground/40 hover:text-foreground transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {loadingCand ? (
                <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
              ) : candidature.length === 0 ? (
                <div className="text-center py-12 text-foreground/40">
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>Nessuna candidatura ricevuta ancora.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {candidature.map(c => (
                    <div key={c.id} className="bg-background/50 border border-border rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Link to={`/artists/${c.artistaId}`} className="flex items-center gap-2 hover:text-primary transition-colors group">
                          <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-secondary" />
                          </div>
                          <span className="text-sm font-bold group-hover:text-primary">Artista #{c.artistaId}</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                        </Link>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${statoColors[c.stato] || ''}`}>
                          {c.stato === 'IN_ATTESA' && <Clock className="h-3 w-3" />}
                          {c.stato === 'ACCETTATA' && <CheckCircle2 className="h-3 w-3" />}
                          {c.stato === 'RIFIUTATA' && <XCircle className="h-3 w-3" />}
                          {c.stato}
                        </span>
                      </div>
                      {c.utentePresentazione && (
                        <p className="text-sm text-foreground/65 italic bg-background/30 p-2.5 rounded-xl border border-border/50">"{c.utentePresentazione}"</p>
                      )}
                      <p className="text-xs text-foreground/40">Inviata: {c.dataInvio}</p>
                      {c.stato === 'IN_ATTESA' && (
                        <div className="flex gap-2 pt-1">
                          <Button size="sm" className="flex-1 gap-1 bg-green-600 hover:bg-green-700 border-transparent" onClick={() => updateStato(c.id, 'ACCETTATA')}>
                            <CheckCircle2 className="h-3.5 w-3.5" /> Accetta
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 gap-1 text-red-400 border-red-500/30 hover:bg-red-500/10" onClick={() => updateStato(c.id, 'RIFIUTATA')}>
                            <XCircle className="h-3.5 w-3.5" /> Rifiuta
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-5 pt-4 border-t border-border">
                <Button variant="outline" className="w-full" onClick={() => setSelectedEvent(null)}>Chiudi</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


function ArtistDashboard({ userId, displayName }: { userId: number; displayName: string }) {
  const [events, setEvents] = useState<EventoDto[]>([]);
  const [myCandidature, setMyCandidature] = useState<CandidaturaDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [tab, setTab] = useState<'events' | 'candidature'>('events');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [evRes, candRes] = await Promise.all([
          fetch('/eventi/getAll'),
          fetch(`/candidature/artista/${userId}`),
        ]);
        if (evRes.ok) setEvents(await evRes.json());
        if (candRes.ok) setMyCandidature(await candRes.json());
      } catch {  }
      setLoading(false);
    };
    fetchData();
  }, [userId]);

  const handleApply = async (eventoId: number) => {
    setSending(true);
    try {
      const res = await fetch('/candidature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ utentePresentazione: message, artistaId: userId, eventoId }),
      });
      if (res.ok) {
        const newCand = await res.json();
        setMyCandidature(prev => [...prev, newCand]);
        setApplying(null);
        setMessage('');
      }
    } catch {  }
    setSending(false);
  };

  const appliedIds = new Set(myCandidature.map(c => c.eventoId));
  const statoColors: Record<string, string> = {
    IN_ATTESA: 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20',
    ACCETTATA: 'text-green-400 bg-green-500/10 border border-green-500/20',
    RIFIUTATA: 'text-red-400 bg-red-500/10 border border-red-500/20',
  };

  const accepted = myCandidature.filter(c => c.stato === 'ACCETTATA').length;
  const pending = myCandidature.filter(c => c.stato === 'IN_ATTESA').length;

  return (
    <div className="pt-24 pb-20 container mx-auto px-4 min-h-screen relative">
      <div className="absolute top-32 left-0 w-[350px] h-[350px] bg-primary/6 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Dashboard Artista</span>
        <h1 className="text-3xl md:text-5xl font-black mb-2">
          Ciao, <span className="text-gradient">{displayName}</span> 🎵
        </h1>
        <p className="text-foreground/50">Trova eventi, candidati e suona sul palco.</p>
      </motion.div>

      {}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Candidature', value: myCandidature.length, icon: Send, color: 'text-secondary' },
          { label: 'Accettate', value: accepted, icon: CheckCircle2, color: 'text-green-400' },
          { label: 'In Attesa', value: pending, icon: Clock, color: 'text-yellow-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-panel rounded-2xl p-4 border border-border text-center">
            <div className={`${color} flex justify-center mb-2`}><Icon className="h-5 w-5" /></div>
            <div className="text-2xl font-black">{value}</div>
            <div className="text-xs text-foreground/50">{label}</div>
          </div>
        ))}
      </div>

      {}
      <div className="flex gap-2 mb-7 bg-card/50 rounded-2xl p-1 w-fit border border-border">
        <button
          onClick={() => setTab('events')}
          className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${tab === 'events' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-foreground/60 hover:text-foreground'}`}
        >
          <CalendarDays className="h-4 w-4 inline mr-1.5" />  Eventi Disponibili
        </button>
        <button
          onClick={() => setTab('candidature')}
          className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${tab === 'candidature' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-foreground/60 hover:text-foreground'}`}
        >
          <Send className="h-4 w-4 inline mr-1.5" /> Le Mie Candidature
          {myCandidature.length > 0 && (
            <span className="ml-1.5 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">{myCandidature.length}</span>
          )}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : tab === 'events' ? (
        events.length === 0 ? (
          <div className="text-center py-20 text-foreground/40">
            <Music className="h-14 w-14 mx-auto mb-4 opacity-25" />
            <p className="text-lg">Nessun evento disponibile al momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((ev, i) => {
              const photos = getEventPhotos(ev.id);
              return (
                <motion.div key={ev.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass-panel border border-border rounded-2xl overflow-hidden flex flex-col hover:border-primary/25 transition-colors group">
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={photos.length > 0 ? photos[0] : getCategoryPhoto(ev.tipoEvento, ev.titolo)}
                      alt={ev.titolo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {ev.tipoEvento && (
                      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 glass-panel rounded-full border border-border/50 text-foreground/80">
                        {ev.tipoEvento}
                      </span>
                    )}
                    {ev.budget && <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 bg-green-500/80 text-white rounded-full">€{ev.budget}</span>}
                  </div>
                  <div className="p-4 flex-1 flex flex-col gap-2">
                    <h3 className="font-bold line-clamp-1 group-hover:text-primary transition-colors">{ev.titolo}</h3>
                    <p className="text-xs text-foreground/50 line-clamp-2">{ev.descrizione || 'Nessuna descrizione'}</p>
                    <div className="space-y-1 text-xs text-foreground/60 mt-auto">
                      <div className="flex items-center gap-1.5"><CalendarDays className="h-3 w-3 text-primary" />{ev.data} · {ev.orarioInizio?.slice(0, 5)}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-secondary" />
                        <a href={getMapsLinkUrl(ev.luogo)} target="_blank" rel="noopener noreferrer" className="hover:text-secondary truncate">{ev.luogo}</a>
                      </div>
                    </div>

                    {appliedIds.has(ev.id) ? (
                      <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2 mt-2">
                        <CheckCircle2 className="h-4 w-4" /> Candidatura inviata
                      </div>
                    ) : applying === ev.id ? (
                      <div className="space-y-2 mt-2">
                        <textarea value={message} onChange={e => setMessage(e.target.value)}
                          placeholder="Presentati brevemente..." rows={2}
                          className="w-full px-3 py-2 rounded-xl bg-background/50 border border-border text-foreground text-xs placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
                        <div className="flex gap-2">
                          <Button size="sm" isLoading={sending} className="flex-1 gap-1" onClick={() => handleApply(ev.id)}>
                            <Send className="h-3.5 w-3.5" /> Invia
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => { setApplying(null); setMessage(''); }}>Annulla</Button>
                        </div>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full gap-2 mt-2 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all" onClick={() => setApplying(ev.id)}>
                        <Music className="h-4 w-4" /> Candidati
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )
      ) : (
        myCandidature.length === 0 ? (
          <div className="text-center py-20 text-foreground/40">
            <Send className="h-14 w-14 mx-auto mb-4 opacity-25" />
            <p className="text-lg">Non hai ancora inviato candidature.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myCandidature.map((c, i) => {
              const ev = events.find(e => e.id === c.eventoId);
              return (
                <motion.div key={c.id}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass-panel border border-border rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <Link to={`/events/${c.eventoId}`} className="font-bold hover:text-primary transition-colors">{ev?.titolo || `Evento #${c.eventoId}`}</Link>
                    {ev && (
                      <div className="flex items-center gap-4 text-xs text-foreground/50 mt-1">
                        <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{ev.data}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.luogo}</span>
                      </div>
                    )}
                    {c.utentePresentazione && <p className="text-xs text-foreground/45 mt-1.5 italic">"{c.utentePresentazione}"</p>}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-foreground/40">{c.dataInvio}</span>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 ${statoColors[c.stato] || ''}`}>
                      {c.stato === 'IN_ATTESA' && <Clock className="h-3 w-3" />}
                      {c.stato === 'ACCETTATA' && <CheckCircle2 className="h-3 w-3" />}
                      {c.stato === 'RIFIUTATA' && <XCircle className="h-3 w-3" />}
                      {c.stato}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}

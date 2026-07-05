import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, MapPin, Phone, Globe, CalendarDays, ArrowLeft, Loader2, AlertCircle, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { getEventPhotos, getMapsLinkUrl } from '../utils/photoStore';
import type { OrganizzatoreDto, EventoDto } from '../types';

const getCategoryPhoto = (tipoEvento?: string, title?: string): string => {
  const t = (tipoEvento || '').toLowerCase();
  const s = (title || '').toLowerCase();
  if (t.includes('rap') || s.includes('rap')) return '/event-rap.png';
  if (t.includes('house') || s.includes('house')) return '/event-house.png';
  if (t.includes('hip') || s.includes('hip') || t.includes('hop') || s.includes('hop')) return '/event-hiphop.png';
  return '/event-festival.png';
};

export const OrganizerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [organizer, setOrganizer] = useState<OrganizzatoreDto | null>(null);
  const [events, setEvents] = useState<EventoDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orgRes, evRes] = await Promise.all([
          fetch(`/organizzatori/${id}`),
          fetch('/eventi/getAll'),
        ]);

        if (orgRes.ok) {
          const orgData = await orgRes.json();
          setOrganizer(orgData);
        } else {
          setError('Organizzatore non trovato nel database.');
        }

        if (evRes.ok) {
          const allEvents: EventoDto[] = await evRes.json();
          
          setEvents(allEvents.filter(e => e.organizzatoreId === Number(id)));
        }
      } catch (err) {
        console.error('Fetch organizer profile error:', err);
        setError('Impossibile connettersi al server.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !organizer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-foreground/70">{error || 'Organizzatore non trovato'}</p>
        <Link to="/events">
          <Button variant="outline">Torna agli Eventi</Button>
        </Link>
      </div>
    );
  }

  const typeLabels = {
    PERSONA_FISICA: 'Persona Fisica',
    AZIENDA: 'Azienda / Società',
    ASSOCIAZIONE: 'Associazione Culturale',
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 container mx-auto max-w-4xl relative">
      {}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-secondary/15 rounded-full blur-[110px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[90px] -z-10" />

      {}
      <Link to="/events" className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Torna agli eventi
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-border"
      >
        {}
        <div className="p-8 border-b border-border bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/20 shadow-inner">
              <Building2 className="h-10 w-10" />
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="h-3 w-3" /> Host Organizzatore
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {organizer.nome} {organizer.cognome}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-foreground/60">
                <span className="px-2 py-0.5 rounded bg-background/50 border border-border text-xs">
                  {typeLabels[organizer.tipo] || organizer.tipo}
                </span>
                {organizer.citta && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-secondary" /> {organizer.citta}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold">Informazioni</h2>
              <p className="text-foreground/75 leading-relaxed bg-background/30 p-4 rounded-xl border border-border">
                {organizer.descrizione || 'Nessuna descrizione fornita da questo organizzatore.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold">Contatti</h2>
            <div className="glass-panel p-4 rounded-2xl space-y-3.5 text-sm">
              {organizer.telefono && (
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-secondary shrink-0" />
                  <a href={`tel:${organizer.telefono}`} className="hover:text-primary hover:underline truncate">
                    {organizer.telefono}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-primary shrink-0" />
                <a href={`mailto:${organizer.email}`} className="hover:text-primary hover:underline truncate">
                  {organizer.email}
                </a>
              </div>
              {organizer.sitoWeb && (
                <div className="flex items-center gap-2.5 pt-1.5 border-t border-border/50">
                  <ExternalLink className="h-4 w-4 text-green-400 shrink-0" />
                  <a
                    href={organizer.sitoWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 font-medium hover:underline truncate"
                  >
                    Visita Sito Web
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {}
        <div className="border-t border-border p-8 space-y-6 bg-background/25">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-secondary" /> Eventi Organizzati ({events.length})
          </h2>

          {events.length === 0 ? (
            <div className="text-center py-10 rounded-2xl bg-background/40 border border-border/50 text-foreground/50">
              <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-35" />
              <p>Questo organizzatore non ha eventi in programma al momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.map(ev => {
                const photos = getEventPhotos(ev.id);
                return (
                  <div
                    key={ev.id}
                    className="flex flex-col rounded-2xl overflow-hidden bg-card border border-border hover:border-secondary/35 transition-colors group"
                  >
                    {}
                    <div className="h-32 w-full overflow-hidden relative">
                      <img
                        src={photos.length > 0 ? photos[0] : getCategoryPhoto(ev.tipoEvento, ev.titolo)}
                        alt={ev.titolo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-bold text-base group-hover:text-secondary transition-colors line-clamp-1">{ev.titolo}</h4>
                        <p className="text-xs text-foreground/50 line-clamp-2 mt-1">{ev.descrizione || 'Nessuna descrizione'}</p>
                      </div>

                      <div className="space-y-1 text-xs text-foreground/70">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="h-3 w-3 shrink-0" />
                          <span>{ev.data} • {ev.orarioInizio?.slice(0, 5)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <a
                            href={getMapsLinkUrl(ev.luogo)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors truncate"
                          >
                            {ev.luogo}
                          </a>
                        </div>
                      </div>

                      <Link to={`/events/${ev.id}`} className="block pt-1">
                        <Button size="sm" variant="outline" className="w-full gap-1 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-colors">
                          Vedi Dettagli <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

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
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 container mx-auto max-w-4xl">
      <Link to="/events" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors mb-6 font-semibold">
        <ArrowLeft className="h-4 w-4" /> Torna agli eventi
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-border bg-white rounded-2xl overflow-hidden shadow-sm"
      >
        {/* Header Banner */}
        <div className="p-8 border-b border-border bg-surface">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-20 h-20 rounded-xl bg-primary-light flex items-center justify-center text-primary border border-primary/10 shadow-sm shrink-0">
              <Building2 className="h-10 w-10" />
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold uppercase tracking-wider border border-primary/10">
                <Sparkles className="h-3 w-3" /> Host Organizzatore
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                {organizer.nome} {organizer.cognome}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-muted font-medium">
                <span className="px-2.5 py-0.5 rounded bg-white border border-border text-xs text-foreground font-semibold">
                  {typeLabels[organizer.tipo] || organizer.tipo}
                </span>
                {organizer.citta && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {organizer.citta}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">Informazioni</h2>
              <p className="text-foreground/80 leading-relaxed bg-surface p-4 rounded-xl border border-border font-medium text-sm">
                {organizer.descrizione || 'Nessuna descrizione fornita da questo organizzatore.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Contatti</h2>
            <div className="bg-surface border border-border p-5 rounded-xl space-y-3.5 text-sm shadow-sm font-semibold">
              {organizer.telefono && (
                <div className="flex items-center gap-2.5 text-foreground">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a href={`tel:${organizer.telefono}`} className="hover:text-primary hover:underline truncate">
                    {organizer.telefono}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2.5 text-foreground">
                <Globe className="h-4 w-4 text-primary shrink-0" />
                <a href={`mailto:${organizer.email}`} className="hover:text-primary hover:underline truncate">
                  {organizer.email}
                </a>
              </div>
              {organizer.sitoWeb && (
                <div className="flex items-center gap-2.5 pt-3 border-t border-border/60 text-primary">
                  <ExternalLink className="h-4 w-4 text-primary shrink-0" />
                  <a
                    href={organizer.sitoWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-bold hover:underline truncate"
                  >
                    Visita Sito Web
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Organized Events Section */}
        <div className="border-t border-border p-8 space-y-6 bg-surface/30">
          <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <CalendarDays className="h-5 w-5 text-primary" /> Eventi Organizzati ({events.length})
          </h2>

          {events.length === 0 ? (
            <div className="text-center py-10 rounded-xl bg-white border border-border text-muted">
              <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-35 text-primary" />
              <p className="text-sm font-medium">Questo organizzatore non ha eventi in programma al momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {events.map(ev => {
                const photos = getEventPhotos(ev.id);
                return (
                  <div
                    key={ev.id}
                    className="flex flex-col rounded-xl overflow-hidden bg-white border border-border hover:shadow-md transition-shadow duration-300 group"
                  >
                    <div className="h-32 w-full overflow-hidden relative bg-secondary">
                      <img
                        src={photos.length > 0 ? photos[0] : getCategoryPhoto(ev.tipoEvento, ev.titolo)}
                        alt={ev.titolo}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">{ev.titolo}</h4>
                        <p className="text-xs text-muted line-clamp-2 mt-1">{ev.descrizione || 'Nessuna descrizione'}</p>
                      </div>

                      <div className="space-y-1 text-xs text-muted font-medium">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{ev.data} • {ev.orarioInizio?.slice(0, 5)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                          <a
                            href={getMapsLinkUrl(ev.luogo)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary hover:underline transition-colors truncate"
                          >
                            {ev.luogo}
                          </a>
                        </div>
                      </div>

                      <Link to={`/events/${ev.id}`} className="block pt-1">
                        <Button size="sm" variant="outline" className="w-full gap-1 font-semibold">
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

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CalendarDays, Search, AlertCircle, Loader2, ArrowRight, Filter, X, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { getEventPhotos, getMapsLinkUrl } from '../utils/photoStore';
import type { EventoDto } from '../types';

const getCategoryPhoto = (tipoEvento?: string, title?: string): string => {
  const t = (tipoEvento || '').toLowerCase();
  const s = (title || '').toLowerCase();
  if (t.includes('rap') || s.includes('rap')) return '/event-rap.png';
  if (t.includes('house') || s.includes('house')) return '/event-house.png';
  if (t.includes('hip') || s.includes('hip') || t.includes('hop') || s.includes('hop')) return '/event-hiphop.png';
  return '/event-festival.png';
};

const GENRES = ['Tutti', 'Hip Hop', 'Rap', 'House', 'Techno', 'R&B', 'Trap', 'Rock', 'Jazz', 'Pop', 'Concerto', 'Festival'];

export const Events = () => {
  const [events, setEvents] = useState<EventoDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tutti');
  const [showFilters, setShowFilters] = useState(false);
  const [maxBudget, setMaxBudget] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/eventi/getAll');
        if (!response.ok) throw new Error('Network response was not ok');
        setEvents(await response.json());
      } catch (err) {
        setError('Impossibile caricare gli eventi dal server. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        e.titolo?.toLowerCase().includes(q) ||
        e.luogo?.toLowerCase().includes(q) ||
        e.descrizione?.toLowerCase().includes(q) ||
        e.tipoEvento?.toLowerCase().includes(q) ||
        e.artistaCercato?.toLowerCase().includes(q);

      const matchGenre =
        selectedGenre === 'Tutti' ||
        e.tipoEvento?.toLowerCase().includes(selectedGenre.toLowerCase()) ||
        e.artistaCercato?.toLowerCase().includes(selectedGenre.toLowerCase()) ||
        e.titolo?.toLowerCase().includes(selectedGenre.toLowerCase());

      const matchBudget =
        !maxBudget || !e.budget || e.budget <= parseFloat(maxBudget);

      return matchSearch && matchGenre && matchBudget;
    });
  }, [events, searchQuery, selectedGenre, maxBudget]);

  const hasActiveFilters = selectedGenre !== 'Tutti' || !!maxBudget;

  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-hidden">
      {}
      <div className="absolute top-32 left-0 w-[400px] h-[400px] bg-primary/6 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-64 right-0 w-[350px] h-[350px] bg-secondary/6 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Live & Upcoming</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight">
            Esplora gli <span className="text-gradient">Eventi</span>
          </h1>
          <p className="text-foreground/55 text-lg max-w-xl">
            Hip Hop, Rap americano, House music e molto altro — trova il tuo prossimo show.
          </p>
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
              <input
                type="text"
                placeholder="Cerca per nome, luogo, artista cercato..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-13 pl-12 pr-4 rounded-2xl glass-panel text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              variant={showFilters || hasActiveFilters ? 'secondary' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 shrink-0"
            >
              <Filter className="h-4 w-4" />
              Filtri
              {hasActiveFilters && (
                <span className="h-2 w-2 rounded-full bg-white" />
              )}
            </Button>
          </div>

          {}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="glass-panel rounded-2xl p-5 space-y-5">
                  {}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-3">Genere / Tipo Evento</p>
                    <div className="flex flex-wrap gap-2">
                      {GENRES.map(g => (
                        <button
                          key={g}
                          onClick={() => setSelectedGenre(g)}
                          className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                            selectedGenre === g
                              ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
                              : 'bg-transparent text-foreground/60 border-border hover:border-primary/40 hover:text-primary'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  {}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-3">Budget massimo (€)</p>
                      <div className="relative max-w-xs">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                        <input
                          type="number"
                          min="0"
                          value={maxBudget}
                          onChange={e => setMaxBudget(e.target.value)}
                          placeholder="Nessun limite"
                          className="w-full h-10 pl-9 pr-3 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-foreground/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>
                    </div>
                    {hasActiveFilters && (
                      <div className="pt-5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => { setSelectedGenre('Tutti'); setMaxBudget(''); }}
                          className="text-foreground/50 hover:text-red-400 gap-1.5"
                        >
                          <X className="h-3.5 w-3.5" /> Pulisci filtri
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {}
        {!loading && !error && (
          <p className="text-sm text-foreground/40 mb-6">
            {filteredEvents.length} evento{filteredEvents.length !== 1 ? 'i' : ''} trovato{filteredEvents.length !== 1 ? 'i' : ''}
            {searchQuery && ` per "${searchQuery}"`}
          </p>
        )}

        {}
        {loading && (
          <div className="flex flex-col items-center justify-center py-28 text-foreground/40">
            <Loader2 className="h-12 w-12 animate-spin mb-4 text-primary" />
            <p className="text-sm">Caricamento eventi dal server...</p>
          </div>
        )}

        {}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center space-y-4"
          >
            <div className="h-16 w-16 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-red-400">Errore di Connessione</h3>
            <p className="text-foreground/60 max-w-md text-sm">{error}</p>
          </motion.div>
        )}

        {}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <div className="text-5xl">🎵</div>
            <p className="text-foreground/50 text-lg">
              {searchQuery || hasActiveFilters
                ? 'Nessun evento corrisponde ai tuoi filtri.'
                : 'Nessun evento trovato nel database.'}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedGenre('Tutti'); setMaxBudget(''); }}>
                Rimuovi filtri
              </Button>
            )}
          </div>
        )}

        {}
        {!loading && !error && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, i) => {
              const photos = getEventPhotos(event.id);
              const hasPhotos = photos.length > 0;
              const mainPhoto = hasPhotos ? photos[0] : getCategoryPhoto(event.tipoEvento, event.titolo);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.07, 0.5) }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl overflow-hidden glass-panel border border-border hover:border-primary/30 transition-all duration-300 flex flex-col hover:shadow-xl hover:shadow-primary/10"
                >
                  {}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={mainPhoto}
                      alt={event.titolo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {hasPhotos && photos.length > 1 && (
                      <span className="absolute bottom-2 right-2 text-xs font-medium px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-full text-white">
                        +{photos.length - 1} foto
                      </span>
                    )}
                    {event.tipoEvento && (
                      <span className="absolute top-3 left-3 z-10 text-xs font-bold px-2.5 py-1 glass-panel rounded-full border border-border text-foreground/80">
                        {event.tipoEvento}
                      </span>
                    )}
                    {event.budget && (
                      <span className="absolute top-3 right-3 z-10 text-xs font-bold px-2.5 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-white">
                        €{event.budget}
                      </span>
                    )}
                  </div>

                  {}
                  <div className="p-5 flex-1 flex flex-col gap-3">
                    <h3 className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                      {event.titolo}
                    </h3>
                    <p className="text-sm text-foreground/55 line-clamp-2 flex-1">
                      {event.descrizione || 'Nessuna descrizione disponibile.'}
                    </p>

                    <div className="space-y-1.5 text-xs text-foreground/60 pt-1">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{event.data} • {event.orarioInizio?.slice(0, 5)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-secondary shrink-0" />
                        <a
                          href={getMapsLinkUrl(event.luogo)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-secondary transition-colors truncate"
                          onClick={e => e.stopPropagation()}
                        >
                          {event.luogo}
                        </a>
                      </div>
                    </div>

                    <Link to={`/events/${event.id}`} className="block mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-1.5 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                      >
                        Vedi Dettagli <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

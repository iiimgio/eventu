import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Loader2, AlertCircle, MapPin, Globe, Video, DollarSign, Search, X, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import type { ArtistaDto } from '../types';

const GENRES = ['Tutti', 'Hip Hop', 'Rap', 'House', 'Techno', 'R&B', 'Trap', 'Rock', 'Jazz', 'Pop'];

export const Artists = () => {
  const [artists, setArtists] = useState<ArtistaDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tutti');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('/artisti');
        if (!response.ok) throw new Error('Network response was not ok');
        setArtists(await response.json());
      } catch {
        setError('Impossibile caricare gli artisti dal server. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  const filtered = artists.filter(a => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      a.nomeArtista?.toLowerCase().includes(q) ||
      a.genereMusicale?.toLowerCase().includes(q) ||
      a.citta?.toLowerCase().includes(q);

    const matchGenre =
      selectedGenre === 'Tutti' ||
      a.genereMusicale?.toLowerCase().includes(selectedGenre.toLowerCase());

    const matchAvail = !showOnlyAvailable || a.disponibile === true;

    return matchSearch && matchGenre && matchAvail;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 space-y-3"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Talenti in evidenza</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-sans">
            Artisti in <span className="text-primary">Vetrina</span>
          </h1>
          <p className="text-muted text-base max-w-xl">
            Rapper, dj house, beatmaker, vocalist — trova l'artista perfetto per il tuo evento.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted/60" />
            <input
              type="text"
              placeholder="Cerca per nome, genere, città..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-white text-foreground placeholder:text-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Genre chips + availability toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {GENRES.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selectedGenre === g
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-foreground/80 border-border hover:border-primary/45 hover:text-primary'
                }`}
              >
                {g}
              </button>
            ))}
            <button
              onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ml-2 ${
                showOnlyAvailable
                  ? 'bg-green-50 text-green-600 border-green-100'
                  : 'bg-white text-foreground/50 border-border hover:border-green-100 hover:text-green-600'
              }`}
            >
              <CheckCircle className="h-3.5 w-3.5" /> Solo Disponibili
            </button>
          </div>
        </motion.div>

        {/* Result count */}
        {!loading && !error && (
          <p className="text-xs font-semibold text-muted mb-6 uppercase tracking-wider">{filtered.length} artista{filtered.length !== 1 ? 'i' : ''} trovato{filtered.length !== 1 ? 'i' : ''}</p>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-28 text-muted">
            <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
            <p className="text-sm font-medium">Caricamento artisti...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-24 text-center gap-4"
          >
            <div className="h-14 w-14 rounded-xl bg-red-50 flex items-center justify-center border border-red-100">
              <AlertCircle className="h-7 w-7 text-red-500" />
            </div>
            <p className="text-muted max-w-md text-sm">{error}</p>
          </motion.div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24 space-y-3">
            <div className="mb-4">
              <img src="/event-hiphop.png" alt="Nessun artista" className="mx-auto w-28 h-28 object-cover rounded-lg" />
            </div>
            <p className="text-muted text-base font-medium">Nessun artista corrisponde ai filtri.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((artist, i) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl overflow-hidden border border-border bg-white transition-all duration-300 flex flex-col shadow-sm hover:shadow-card-hover"
              >
                {/* Photo banner */}
                <div className="relative h-48 w-full overflow-hidden bg-secondary">
                  {artist.fotoProfilo ? (
                    <img
                      src={artist.fotoProfilo}
                      alt={artist.nomeArtista}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary">
                      <Music className="h-12 w-12 text-muted/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Availability badge */}
                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-3 py-1 rounded-full border ${
                    artist.disponibile 
                      ? 'bg-green-500 text-white border-transparent shadow-sm' 
                      : 'bg-white/90 text-foreground/50 border-border'
                  }`}>
                    {artist.disponibile ? '✓ DISPONIBILE' : 'OCCUPATO'}
                  </span>

                  {artist.genereMusicale && (
                    <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-1 bg-white/90 rounded-full border border-border text-foreground/80 shadow-sm uppercase tracking-wider">
                      {artist.genereMusicale}
                    </span>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {artist.nomeArtista}
                    </h3>
                    <p className="text-xs text-muted font-medium">Nome registrato: {artist.nome} {artist.cognome}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-foreground/75">
                    {artist.citta && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface border border-border text-foreground/80">
                        <MapPin className="h-3.5 w-3.5 text-primary" /> {artist.citta}
                      </div>
                    )}
                    {artist.cachet && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 border border-green-100 text-green-600 font-bold">
                        <DollarSign className="h-3.5 w-3.5" /> €{artist.cachet}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-border">
                    <Link to={`/artists/${artist.id}`} className="flex-1">
                      <Button size="sm" variant="primary" className="w-full gap-1.5 font-semibold">
                        Vedi Profilo
                      </Button>
                    </Link>
                    {artist.linkSocial && (
                      <a href={artist.linkSocial} target="_blank" rel="noopener noreferrer" title="Instagram / Social">
                        <Button size="sm" variant="outline" className="px-2.5 h-8">
                          <Globe className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                    {artist.linkVideo && (
                      <a href={artist.linkVideo} target="_blank" rel="noopener noreferrer" title="Guarda Video">
                        <Button size="sm" variant="outline" className="px-2.5 h-8">
                          <Video className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

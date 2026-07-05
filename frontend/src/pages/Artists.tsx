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
        setError('Impossibile connettersi al server. Verifica che il backend sia in esecuzione.');
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
    <div className="pt-24 pb-20 min-h-screen relative overflow-hidden">
      {}
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-secondary/6 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">Talenti in evidenza</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight">
            Artisti in <span className="text-gradient">Vetrina</span>
          </h1>
          <p className="text-foreground/55 text-lg max-w-xl">
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Cerca per nome, genere, città..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-2xl glass-panel text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground">
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
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selectedGenre === g
                    ? 'bg-secondary text-white border-secondary shadow-lg shadow-secondary/25'
                    : 'bg-transparent text-foreground/60 border-border hover:border-secondary/40 hover:text-secondary'
                }`}
              >
                {g}
              </button>
            ))}
            <button
              onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ml-2 ${
                showOnlyAvailable
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : 'bg-transparent text-foreground/50 border-border hover:border-green-500/30'
              }`}
            >
              <CheckCircle className="h-3.5 w-3.5" /> Solo Disponibili
            </button>
          </div>
        </motion.div>

        {/* Result count */}
        {!loading && !error && (
          <p className="text-sm text-foreground/40 mb-6">{filtered.length} artista{filtered.length !== 1 ? 'i' : ''} trovato{filtered.length !== 1 ? 'i' : ''}</p>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-28 text-foreground/40">
            <Loader2 className="h-12 w-12 animate-spin mb-4 text-secondary" />
            <p className="text-sm">Caricamento artisti...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-24 text-center gap-4"
          >
            <div className="h-16 w-16 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <p className="text-foreground/60 max-w-md text-sm">{error}</p>
          </motion.div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24 space-y-3">
            <div className="text-5xl">🎤</div>
            <p className="text-foreground/50 text-lg">Nessun artista corrisponde ai filtri.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((artist, i) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.07, 0.5), ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group glass-panel rounded-2xl overflow-hidden border border-border hover:border-secondary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/10 flex flex-col relative"
              >
                {/* Backdrop ambient glow for each card */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-xl -z-10 group-hover:bg-secondary/10 transition-colors" />

                {/* Photo banner */}
                <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-secondary/15 to-primary/15">
                  {artist.fotoProfilo ? (
                    <img
                      src={artist.fotoProfilo}
                      alt={artist.nomeArtista}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music className="h-16 w-16 text-secondary/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Availability badge */}
                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-3 py-1 rounded-full border backdrop-blur-md ${
                    artist.disponibile 
                      ? 'bg-green-500/10 text-green-400 border-green-500/25' 
                      : 'bg-background/80 text-foreground/40 border-border'
                  }`}>
                    {artist.disponibile ? '✓ DISPONIBILE' : 'OCCUPATO'}
                  </span>

                  {}
                  {artist.genereMusicale && (
                    <span className="absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 glass-panel rounded-full border border-white/10 text-white">
                      {artist.genereMusicale}
                    </span>
                  )}
                </div>

                {}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black group-hover:text-secondary transition-colors line-clamp-1">
                      {artist.nomeArtista}
                    </h3>
                    <p className="text-xs text-foreground/45">Nome registrato: {artist.nome} {artist.cognome}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-foreground/75">
                    {artist.citta && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">
                        <MapPin className="h-3.5 w-3.5 text-secondary" /> {artist.citta}
                      </div>
                    )}
                    {artist.cachet && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-500/5 border border-green-500/10 text-green-400 font-medium">
                        <DollarSign className="h-3.5 w-3.5" /> €{artist.cachet}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-border/40">
                    <Link to={`/artists/${artist.id}`} className="flex-1">
                      <Button size="sm" variant="secondary" className="w-full gap-1.5 font-bold">
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

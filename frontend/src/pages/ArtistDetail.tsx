import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, MapPin, DollarSign, Globe, Video, ArrowLeft, Loader2, AlertCircle, Sparkles, CheckCircle, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { ArtistaDto } from '../types';

export const ArtistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<ArtistaDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await fetch(`/artisti/${id}`);
        if (res.ok) {
          const data = await res.json();
          setArtist(data);
        } else {
          setError('Artista non trovato nel database.');
        }
      } catch (err) {
        console.error('Fetch artist error:', err);
        setError('Impossibile connettersi al server.');
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, [id]);

  
  const getYoutubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-foreground/70">{error || 'Artista non trovato'}</p>
        <Link to="/artists">
          <Button variant="outline">Torna agli Artisti</Button>
        </Link>
      </div>
    );
  }

  const embedUrl = getYoutubeEmbedUrl(artist.linkVideo);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 container mx-auto max-w-4xl relative">
      {}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[130px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] bg-secondary/15 rounded-full blur-[100px] -z-10" />

      {}
      <Link to="/artists" className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Torna alla lista artisti
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-border"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8">
          {}
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shrink-0 border-4 border-border bg-secondary/10 flex items-center justify-center shadow-lg relative group">
            {artist.fotoProfilo ? (
              <img
                src={artist.fotoProfilo}
                alt={artist.nomeArtista}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <Music className="h-16 w-16 text-secondary/40" />
            )}
            {artist.disponibile && (
              <span className="absolute bottom-2 right-2 bg-green-500 border-2 border-background text-white p-1.5 rounded-full shadow-md" title="Disponibile per Booking">
                <CheckCircle className="h-4 w-4" />
              </span>
            )}
          </div>

          {}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="h-3 w-3" /> Artista Event.u
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">{artist.nomeArtista}</h1>
              <p className="text-foreground/50 text-sm font-medium">Nome registrato: {artist.nome} {artist.cognome}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-foreground/80 pt-1">
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-background/50 border border-border">
                <Music className="h-4 w-4 text-primary" />
                <span className="font-semibold">{artist.genereMusicale || 'Generico'}</span>
              </div>
              
              {artist.citta && (
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-background/50 border border-border">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span>{artist.citta}</span>
                </div>
              )}

              {artist.cachet && (
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-background/50 border border-border">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-semibold">Cachet: €{artist.cachet}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                artist.disponibile ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {artist.disponibile ? '✅ Disponibile per esibizioni' : '❌ Non disponibile al momento'}
              </span>
            </div>
          </div>
        </div>

        {}
        <div className="border-t border-border p-8 space-y-8 bg-background/20">
          
          {}
          {artist.linkVideo && (
            <div className="space-y-3">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" /> Performance & Video
              </h2>
              {embedUrl ? (
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-border shadow-md">
                  <iframe
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    title={`${artist.nomeArtista} - Video Embed`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-background/50 border border-border flex items-center justify-between">
                  <span className="text-sm text-foreground/70">Guarda la registrazione ufficiale dell'artista:</span>
                  <a
                    href={artist.linkVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary hover:underline text-sm font-semibold"
                  >
                    Apri Video Esterno <Globe className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Socials & Contacts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-5 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Globe className="h-4.5 w-4.5 text-secondary" /> Link & Social
              </h3>
              {artist.linkSocial ? (
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-foreground/60">Trova l'artista sui canali ufficiali:</p>
                  <a
                    href={artist.linkSocial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-xl bg-background/60 border border-border hover:border-primary/50 text-foreground transition-all group"
                  >
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">Visita Instagram / Social</span>
                    <Globe className="h-4 w-4 text-foreground/40 group-hover:text-primary transition-colors" />
                  </a>
                </div>
              ) : (
                <p className="text-sm text-foreground/40 italic">Nessun link social fornito.</p>
              )}
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Mail className="h-4.5 w-4.5 text-primary" /> Booking & Contatti
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-foreground/60">Interessato a inserire {artist.nomeArtista} nella tua line-up?</p>
                <a href={`mailto:${artist.email}`} className="block">
                  <Button className="w-full gap-2" variant="primary">
                    Invia un'Email
                  </Button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

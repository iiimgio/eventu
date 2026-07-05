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
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 container mx-auto max-w-4xl">
      <Link to="/artists" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors mb-6 font-semibold">
        <ArrowLeft className="h-4 w-4" /> Torna alla lista artisti
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-border bg-white rounded-2xl overflow-hidden shadow-sm"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8">
          {/* Avatar Container */}
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shrink-0 border-4 border-border bg-secondary flex items-center justify-center shadow-sm relative group">
            {artist.fotoProfilo ? (
              <img
                src={artist.fotoProfilo}
                alt={artist.nomeArtista}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            ) : (
              <Music className="h-16 w-16 text-muted/30" />
            )}
            {artist.disponibile && (
              <span className="absolute bottom-2 right-2 bg-green-500 border-2 border-white text-white p-1.5 rounded-full shadow-md" title="Disponibile per Booking">
                <CheckCircle className="h-4 w-4" />
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold uppercase tracking-wider border border-primary/10">
                <Sparkles className="h-3 w-3" /> Artista Event.u
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{artist.nomeArtista}</h1>
              <p className="text-xs text-muted font-medium">Nome registrato: {artist.nome} {artist.cognome}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-foreground/80 pt-1">
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface border border-border font-medium">
                <Music className="h-4 w-4 text-primary" />
                <span className="font-bold text-foreground">{artist.genereMusicale || 'Generico'}</span>
              </div>
              
              {artist.citta && (
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface border border-border font-medium">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{artist.citta}</span>
                </div>
              )}

              {artist.cachet && (
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface border border-border font-medium">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-bold">Cachet: €{artist.cachet}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                artist.disponibile ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
              }`}>
                {artist.disponibile ? '✓ Disponibile per esibizioni' : '✗ Non disponibile al momento'}
              </span>
            </div>
          </div>
        </div>

        {/* Lower Info & Video Area */}
        <div className="border-t border-border p-8 space-y-8 bg-surface/30">
          
          {/* Performance Video */}
          {artist.linkVideo && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
                <Video className="h-5 w-5 text-primary" /> Performance & Video
              </h2>
              {embedUrl ? (
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-border shadow-sm bg-secondary">
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
                <div className="p-4 rounded-xl bg-white border border-border flex items-center justify-between shadow-sm">
                  <span className="text-sm text-muted font-medium">Guarda la registrazione ufficiale dell'artista:</span>
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
            <div className="bg-white border border-border p-5 rounded-xl shadow-sm space-y-4">
              <h3 className="text-base font-bold flex items-center gap-2 text-foreground">
                <Globe className="h-4.5 w-4.5 text-primary" /> Link & Social
              </h3>
              {artist.linkSocial ? (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-muted font-medium">Trova l'artista sui canali ufficiali:</p>
                  <a
                    href={artist.linkSocial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-lg bg-surface border border-border hover:border-primary text-foreground transition-all group font-semibold"
                  >
                    <span className="text-sm font-semibold group-hover:text-primary transition-colors">Visita Instagram / Social</span>
                    <Globe className="h-4 w-4 text-muted group-hover:text-primary transition-colors" />
                  </a>
                </div>
              ) : (
                <p className="text-sm text-muted italic">Nessun link social fornito.</p>
              )}
            </div>

            <div className="bg-white border border-border p-5 rounded-xl shadow-sm space-y-4">
              <h3 className="text-base font-bold flex items-center gap-2 text-foreground">
                <Mail className="h-4.5 w-4.5 text-primary" /> Booking & Contatti
              </h3>
              <div className="space-y-3">
                <p className="text-xs text-muted font-medium">Interessato a inserire {artist.nomeArtista} nella tua line-up?</p>
                <a href={`mailto:${artist.email}`} className="block">
                  <Button className="w-full gap-2 font-semibold shadow-sm" variant="primary">
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

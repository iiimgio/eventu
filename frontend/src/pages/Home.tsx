import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Music, Calendar, Star, Zap, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { seedDatabaseIfEmpty } from '../utils/seeder';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const genres = [
  { name: 'Hip Hop', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80' },
  { name: 'Rap Americano', image: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=500&auto=format&fit=crop&q=80' },
  { name: 'House Music', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80' },
  { name: 'Techno', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=80' },
  { name: 'R&B / Soul', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&auto=format&fit=crop&q=80' },
  { name: 'Trap', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80' },
];

const stats = [
  { value: '500+', label: 'Artisti Registrati', icon: Music },
  { value: '1200+', label: 'Eventi Organizzati', icon: Calendar },
  { value: '98%', label: 'Soddisfazione', icon: Star },
  { value: '50+', label: 'Città Coperte', icon: Zap },
];

export const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    seedDatabaseIfEmpty();
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-4 overflow-hidden">
        
        {}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/15 rounded-full blur-[140px] -z-10"
          style={{ animation: 'pulseSlow 10s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[130px] -z-10"
          style={{ animation: 'pulseSlow 8s ease-in-out infinite 2s' }} />

        {}
        <div className="absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4 relative z-10">
          
          {}
          <motion.div
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {}
            <motion.div variants={fadeUp} className="w-fit mx-auto lg:mx-0">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-semibold text-primary border border-primary/20 shadow-lg shadow-primary/5">
                <Star className="h-4 w-4 fill-primary text-primary" />
                La piattaforma #1 per eventi musicali in Italia
              </span>
            </motion.div>

            {}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Vivi la{' '}
              <span className="relative inline-block">
                <span className="text-gradient">Musica</span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full" />
              </span>
              <br />
              come mai prima.
            </motion.h1>

            {}
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Event.u connette artisti eccezionali — rapper, DJ house, beatmaker — con i migliori organizzatori di eventi live. Candidati, crea, esibisciti.
            </motion.p>

            {}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="gap-2 shadow-2xl shadow-primary/30">
                    La mia Dashboard <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="gap-2 shadow-2xl shadow-primary/30">
                      Inizia Gratis <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/events">
                    <Button size="lg" variant="outline" className="gap-2 backdrop-blur-sm">
                      Esplora gli Eventi
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>

          {}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="relative group w-full max-w-[450px]">
              {}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              
              <div className="relative rounded-3xl overflow-hidden border border-white/10 glass-panel shadow-2xl aspect-[4/5] md:aspect-[3/4]">
                <img
                  src="/hero-concert.png"
                  alt="Concert Experience"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Milano Live Stage</span>
                    <h3 className="text-xl font-bold text-white">Hip Hop & American Rap Fest</h3>
                    <p className="text-xs text-white/60">Trova date e candidati come artista ospite.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-foreground/30 text-xs cursor-pointer hover:text-foreground/50 transition-colors"
          onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
        >
          <span>Scopri di più</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-4.5 w-4.5" />
          </motion.div>
        </motion.div>
      </section>

      {}
      <section className="py-16 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-secondary/3 -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-2"
              >
                <div className="h-12 w-12 mx-auto rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-black text-gradient">{value}</div>
                <div className="text-sm text-foreground/50">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Tutti i generi</span>
          <h2 className="text-4xl md:text-5xl font-black">
            Il tuo sound. La tua scena.
          </h2>
          <p className="text-foreground/55 max-w-xl mx-auto text-lg">
            Da Travis Scott al techno berlinese, ogni genere trova il suo palco su Event.u.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {genres.map((genre, i) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <Link
                to="/events"
                className="relative block h-40 rounded-2xl overflow-hidden border border-border group transition-all duration-300"
              >
                {}
                <img
                  src={genre.image}
                  alt={genre.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25" />
                
                {}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">
                    {genre.name}
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5 group-hover:text-white transition-colors">
                    Esplora gli eventi →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {}
      <section className="py-24 border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">Come funziona</span>
            <h2 className="text-4xl md:text-5xl font-black">Semplice. Potente. Diretto.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Crea il tuo profilo',
                desc: 'Registrati come artista o organizzatore in pochi minuti. Aggiungi la tua bio, genere musicale, video e social.',
                color: 'text-primary border-primary/20 bg-primary/5',
              },
              {
                step: '02',
                title: 'Scopri o Pubblica',
                desc: 'Gli artisti trovano eventi perfetti per loro. Gli organizzatori creano eventi e specificano il tipo di artista cercato.',
                color: 'text-secondary border-secondary/20 bg-secondary/5',
              },
              {
                step: '03',
                title: 'Candidati & Esibisciti',
                desc: 'Gli artisti si candidano con un messaggio personalizzato. Gli organizzatori accettano o rifiutano in un click.',
                color: 'text-accent border-accent/20 bg-accent/5',
              },
            ].map(({ step, title, desc, color }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center space-y-4"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl border flex items-center justify-center text-2xl font-black ${color}`}>
                  {step}
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-border to-transparent" />
                )}
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-foreground/55 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      {!user && (
        <section className="py-24 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border border-border"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="p-10 md:p-16 text-center space-y-8">
              <h2 className="text-4xl md:text-6xl font-black leading-tight">
                Pronto a salire{' '}
                <span className="text-gradient">sul palco?</span>
              </h2>
              <p className="text-foreground/55 text-lg max-w-xl mx-auto">
                Unisciti a centinaia di artisti e organizzatori che stanno già costruendo la scena musicale italiana.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="p-7 rounded-2xl glass-panel border border-primary/20 hover:border-primary/50 cursor-pointer transition-all group text-left"
                  >
                    <div className="text-3xl mb-3">🎤</div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">Sono un Artista</h3>
                    <p className="text-sm text-foreground/50">Crea profilo, trova eventi, candidati e suona.</p>
                    <div className="mt-4 flex items-center gap-1.5 text-primary text-sm font-semibold">
                      Inizia gratis <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                </Link>
                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="p-7 rounded-2xl glass-panel border border-secondary/20 hover:border-secondary/50 cursor-pointer transition-all group text-left"
                  >
                    <div className="text-3xl mb-3">🏢</div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-secondary transition-colors">Sono un Organizzatore</h3>
                    <p className="text-sm text-foreground/50">Pubblica eventi, trova artisti perfetti per te.</p>
                    <div className="mt-4 flex items-center gap-1.5 text-secondary text-sm font-semibold">
                      Crea evento <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
};

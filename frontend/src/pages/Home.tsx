import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Music, Calendar, Star, Zap, ChevronDown, Mic2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { seedDatabaseIfEmpty } from '../utils/seeder';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
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

const features = [
  { title: 'Velocità', desc: 'Candidati a un evento in pochi secondi.' },
  { title: 'Semplicità', desc: 'Tutto in un\'unica piattaforma ordinata.' },
  { title: 'Innovazione', desc: 'Il futuro degli eventi musicali live.' },
];

export const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    seedDatabaseIfEmpty();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Hero — Fivefoot style */}
      <section className="relative min-h-screen flex flex-col justify-center items-center hero-coral pt-24 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <motion.div variants={fadeUp} className="flex justify-center">
              <div className="relative inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md shadow-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
                  <Mic2 className="h-5 w-5" />
                </div>
                <div className="ml-3 text-left">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">Nuovo sound</p>
                  <p className="text-sm font-semibold text-white">Speaker creativo per artisti e eventi</p>
                </div>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-none text-white lowercase"
            >
              event.u
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-white/80 max-w-xl mx-auto leading-relaxed font-normal"
            >
              il futuro della musica live è ora.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {user ? (
                <Link to="/dashboard">
                  <button className="btn-pill-white h-12 px-8 text-base gap-2 inline-flex items-center font-semibold">
                    La mia Dashboard <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <button className="btn-pill-white h-12 px-8 text-base gap-2 inline-flex items-center font-semibold">
                      Inizia Gratis <ArrowRight className="h-5 w-5" />
                    </button>
                  </Link>
                  <Link to="/events">
                    <button className="h-12 px-8 text-base gap-2 inline-flex items-center font-semibold rounded-full border border-white/30 text-white hover:bg-white/10 transition-all">
                      Esplora gli Eventi
                    </button>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 text-xs cursor-pointer hover:text-white transition-colors font-medium"
          onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
        >
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-4.5 w-4.5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features pills — Fivefoot style */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map(({ title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-3"
              >
                <h3 className="text-2xl font-extrabold text-foreground">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 border-y border-border bg-surface relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center space-y-3"
              >
                <div className="h-10 w-10 mx-auto rounded-xl bg-primary-light border border-primary/10 flex items-center justify-center text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-3xl font-extrabold text-foreground">{value}</div>
                <div className="text-sm font-medium text-muted">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
              Tutto sotto controllo,<br />
              <span className="text-primary">niente più caos.</span>
            </h2>
            <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Event.u connette artisti eccezionali — rapper, DJ house, beatmaker — con i migliori organizzatori di eventi live. Candidati, crea, esibisciti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Genres Grid */}
      <section className="py-24 container mx-auto px-4 bg-surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 space-y-3"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Tutti i generi</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Il tuo sound. La tua scena.
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base">
            Da Travis Scott al techno berlinese, ogni genere trova il suo palco su Event.u.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {genres.map((genre, i) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to="/events"
                className="relative block h-44 rounded-2xl overflow-hidden border border-border group transition-all duration-300 shadow-sm hover:shadow-card-hover bg-white"
              >
                <img
                  src={genre.image}
                  alt={genre.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">
                    {genre.name}
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5 group-hover:text-white transition-colors">
                    Esplora gli eventi →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 border-y border-border bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-3"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Come funziona</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Semplice. Potente. Diretto.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Crea il tuo profilo',
                desc: 'Registrati come artista o organizzatore in pochi minuti. Aggiungi la tua bio, genere musicale, video e social.',
              },
              {
                step: '02',
                title: 'Scopri o Pubblica',
                desc: 'Gli artisti trovano eventi perfetti per loro. Gli organizzatori creano eventi e specificano il tipo di artista cercato.',
              },
              {
                step: '03',
                title: 'Candidati & Esibisciti',
                desc: 'Gli artisti si candidano con un messaggio personalizzato. Gli organizzatori accettano o rifiutano in un click.',
              },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center space-y-4 p-6 rounded-2xl bg-surface border border-border"
              >
                <div className="w-14 h-14 mx-auto rounded-xl border border-primary/10 bg-primary-light flex items-center justify-center text-xl font-bold text-primary">
                  {step}
                </div>
                <h3 className="text-lg font-bold text-foreground">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box (Only guests) */}
      {!user && (
        <section className="py-24 container mx-auto px-4 bg-surface">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden hero-coral shadow-hero"
          >
            <div className="p-8 md:p-16 text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
                Pronto a salire sul palco?
              </h2>
              <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
                Unisciti a centinaia di artisti e organizzatori che stanno già costruendo la scena musicale italiana.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-6 rounded-2xl bg-white cursor-pointer transition-all group text-left shadow-sm"
                  >
                    <div className="text-3xl mb-3">🎤</div>
                    <h3 className="text-lg font-bold mb-1 text-foreground group-hover:text-primary transition-colors">Sono un Artista</h3>
                    <p className="text-xs text-muted leading-relaxed">Crea profilo, trova eventi, candidati e suona.</p>
                    <div className="mt-4 flex items-center gap-1.5 text-primary text-xs font-semibold">
                      Inizia gratis <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </motion.div>
                </Link>
                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-6 rounded-2xl bg-white cursor-pointer transition-all group text-left shadow-sm"
                  >
                    <div className="text-3xl mb-3">🏢</div>
                    <h3 className="text-lg font-bold mb-1 text-foreground group-hover:text-primary transition-colors">Sono un Organizzatore</h3>
                    <p className="text-xs text-muted leading-relaxed">Pubblica eventi, trova artisti perfetti per te.</p>
                    <div className="mt-4 flex items-center gap-1.5 text-primary text-xs font-semibold">
                      Crea evento <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
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

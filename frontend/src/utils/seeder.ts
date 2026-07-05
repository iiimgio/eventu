import { saveEventPhotos } from './photoStore';
import type { ArtistaDto, OrganizzatoreDto, EventoDto } from '../types';

export async function seedDatabaseIfEmpty() {
  try {
    
    const artistsRes = await fetch('/artisti');
    if (!artistsRes.ok) return;
    const artists: ArtistaDto[] = await artistsRes.json();

    
    const orgsRes = await fetch('/organizzatori');
    if (!orgsRes.ok) return;
    const orgs: OrganizzatoreDto[] = await orgsRes.json();

    
    const eventsRes = await fetch('/eventi/getAll');
    if (!eventsRes.ok) return;
    const events: EventoDto[] = await eventsRes.json();

    
    if (artists.length > 0 || orgs.length > 0 || events.length > 0) {
      console.log('Database already has data. Skipping seeder.');
      return;
    }

    console.log('Database is empty. Seeding initial data...');

    
    const waveProdData = {
      nome: 'Wave',
      cognome: 'Productions',
      email: 'wave@productions.com',
      password: 'password',
      role: 'ORGANIZZATORE',
      tipo: 'AZIENDA' as const,
      descrizione: 'Agenzia leader nell\'organizzazione di eventi musicali live, clubbing e grandi festival.',
      citta: 'Milano',
      telefono: '+39 02 123456',
      sitoWeb: 'https://waveproductions.example.com',
    };

    const clubUnderData = {
      nome: 'Club',
      cognome: 'Underground',
      email: 'club@underground.com',
      password: 'password',
      role: 'ORGANIZZATORE',
      tipo: 'ASSOCIAZIONE' as const,
      descrizione: 'Associazione culturale dedita alla promozione della scena underground e dei talenti emergenti.',
      citta: 'Roma',
      telefono: '+39 06 654321',
      sitoWeb: 'https://clubunderground.example.com',
    };

    const waveRes = await fetch('/organizzatori', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(waveProdData),
    });

    const clubRes = await fetch('/organizzatori', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clubUnderData),
    });

    if (!waveRes.ok || !clubRes.ok) {
      console.error('Failed to seed organizers');
      return;
    }

    const seededWave: OrganizzatoreDto = await waveRes.json();
    const seededClub: OrganizzatoreDto = await clubRes.json();

    
    const artistsToSeed = [
      {
        nome: 'Jack',
        cognome: 'Harlow',
        email: 'metro@rap.us',
        password: 'password',
        role: 'ARTISTA',
        nomeArtista: 'Lil Metro',
        genereMusicale: 'Rap Americano',
        citta: 'Milano',
        cachet: 1200,
        disponibile: true,
        fotoProfilo: 'https://images.unsplash.com/photo-1549068106-b024baf5062d?w=500&auto=format&fit=crop&q=80',
        linkSocial: 'https://instagram.com/lilmetro',
        linkVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
      {
        nome: 'Kara',
        cognome: 'Vance',
        email: 'kara@dj.de',
        password: 'password',
        role: 'ARTISTA',
        nomeArtista: 'KARA',
        genereMusicale: 'House Music',
        citta: 'Roma',
        cachet: 800,
        disponibile: true,
        fotoProfilo: 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?w=500&auto=format&fit=crop&q=80',
        linkSocial: 'https://instagram.com/karadj',
        linkVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
      {
        nome: 'Davide',
        cognome: 'Neri',
        email: 'nox@music.it',
        password: 'password',
        role: 'ARTISTA',
        nomeArtista: 'Nox',
        genereMusicale: 'Hip Hop',
        citta: 'Bologna',
        cachet: 500,
        disponibile: true,
        fotoProfilo: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=80',
        linkSocial: 'https://instagram.com/noxmusic',
        linkVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
    ];

    for (const art of artistsToSeed) {
      await fetch('/artisti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(art),
      });
    }

    
    const eventsToSeed = [
      {
        organizerId: seededWave.id,
        photo: '/event-rap.png',
        data: {
          titolo: 'Atlanta Beats & US Rap Live',
          descrizione: 'La serata definitiva dedicata al rap americano. Trap, drill, and heavy beats all night long con performance live, freestyle battle e showcase.',
          luogo: 'Alcatraz, Milano',
          tipoEvento: 'Rap Americano',
          budget: 1500,
          data: '2026-10-15',
          dataFine: null,
          orarioInizio: '21:30:00',
          orarioFine: '03:00:00',
          artistaCercato: 'Rapper / Trap Performer per set di apertura',
        },
      },
      {
        organizerId: seededWave.id,
        photo: '/event-house.png',
        data: {
          titolo: 'Deep House Session',
          descrizione: 'Le sonorità deep e tech house più raffinate del panorama europeo in una location sotterranea unica, curata con luci led ad hoc.',
          luogo: 'Spazio 900, Roma',
          tipoEvento: 'House Music',
          budget: 1000,
          data: '2026-11-20',
          dataFine: null,
          orarioInizio: '23:00:00',
          orarioFine: '05:00:00',
          artistaCercato: 'DJ Tech House / Deep House per set principale',
        },
      },
      {
        organizerId: seededClub.id,
        photo: '/event-hiphop.png',
        data: {
          titolo: 'Hip Hop Showcase',
          descrizione: 'La vecchia scuola incontra la nuova in un contest underground con i migliori talenti locali. Dj set, breakdance e jam session.',
          luogo: 'Magazzini Generali, Milano',
          tipoEvento: 'Hip Hop',
          budget: 600,
          data: '2026-09-05',
          dataFine: null,
          orarioInizio: '20:00:00',
          orarioFine: '01:00:00',
          artistaCercato: 'Hip Hop Artist / Beatmaker emergente per jam session',
        },
      },
    ];

    for (const item of eventsToSeed) {
      const res = await fetch(`/eventi/organizzatore/${item.organizerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.data),
      });
      if (res.ok) {
        const ev: EventoDto = await res.json();
        
        saveEventPhotos(ev.id, [item.photo]);
      }
    }

    console.log('Seeder completed successfully.');
  } catch (error) {
    console.error('Error running seeder:', error);
  }
}

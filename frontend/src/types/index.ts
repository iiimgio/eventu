export interface EventoDto {
  id: number;
  titolo: string;
  descrizione: string;
  luogo: string;
  tipoEvento: string;
  budget: number;
  data: string;
  dataFine: string | null;
  orarioInizio: string;
  orarioFine: string;
  artistaCercato: string | null;
  organizzatoreId: number;
}

export interface ArtistaDto {
  id: number;
  nome?: string;
  cognome?: string;
  email: string;
  password?: string;
  role: string;
  nomeArtista: string;
  cognomeArtista: string;
  genereMusicale: string;
  citta: string;
  cachet: number;
  disponibile: boolean;
  fotoProfilo: string;
  linkSocial: string;
  linkVideo: string;
}

export interface OrganizzatoreDto {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  password?: string;
  role: string;
  tipo: 'PERSONA_FISICA' | 'AZIENDA' | 'ASSOCIAZIONE';
  descrizione: string;
  citta: string;
  telefono: string;
  sitoWeb: string;
}

export interface CandidaturaDto {
  id: number;
  utentePresentazione: string;
  dataInvio: string;
  stato: 'IN_ATTESA' | 'ACCETTATA' | 'RIFIUTATA';
  artistaId: number;
  eventoId: number;
}

export interface AuthUser {
  id: number;
  email: string;
  role: 'ARTISTA' | 'ORGANIZZATORE';
  nome: string;
  cognome: string;
  displayName: string;
}

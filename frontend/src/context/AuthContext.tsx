import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AuthUser, ArtistaDto, OrganizzatoreDto } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterArtistaData | RegisterOrganizzatoreData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (fields: Partial<AuthUser>) => void;
}

export interface RegisterArtistaData {
  role: 'ARTISTA';
  nome: string;
  cognome: string;
  email: string;
  password: string;
  nomeArtista: string;
  genereMusicale: string;
  citta: string;
  cachet: number;
  disponibile: boolean;
  fotoProfilo: string;
  linkSocial: string;
  linkVideo: string;
}

export interface RegisterOrganizzatoreData {
  role: 'ORGANIZZATORE';
  nome: string;
  cognome: string;
  email: string;
  password: string;
  tipo: 'PERSONA_FISICA' | 'AZIENDA' | 'ASSOCIAZIONE';
  descrizione: string;
  citta: string;
  telefono: string;
  sitoWeb: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('eventu_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('eventu_user');
      }
    }
    setLoading(false);
  }, []);

  const persistUser = (u: AuthUser) => {
    setUser(u);
    localStorage.setItem('eventu_user', JSON.stringify(u));
  };

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      
      const artRes = await fetch('/artisti');
      if (artRes.ok) {
        const artists: ArtistaDto[] = await artRes.json();
        const artist = artists.find(a => a.email === email);
        if (artist && artist.password === password) {
          persistUser({
            id: artist.id,
            email: artist.email,
            role: 'ARTISTA',
            nome: artist.nomeArtista || artist.nome || '',
            cognome: artist.cognome || '',
            displayName: artist.nomeArtista || `${artist.nome || ''} ${artist.cognome || ''}`.trim() || artist.email,
          });
          return { success: true };
        }
      }

      
      const orgRes = await fetch('/organizzatori');
      if (orgRes.ok) {
        const orgs: OrganizzatoreDto[] = await orgRes.json();
        const org = orgs.find(o => o.email === email);
        if (org && org.password === password) {
          persistUser({
            id: org.id,
            email: org.email,
            role: 'ORGANIZZATORE',
            nome: org.nome,
            cognome: org.cognome,
            displayName: `${org.nome} ${org.cognome}`.trim() || org.email,
          });
          return { success: true };
        }
      }

      return { success: false, error: 'Email o password non validi.' };
    } catch {
      return { success: false, error: 'Impossibile connettersi al server.' };
    }
  }, []);

  const register = useCallback(async (data: RegisterArtistaData | RegisterOrganizzatoreData): Promise<{ success: boolean; error?: string }> => {
    try {
      if (data.role === 'ARTISTA') {
        const body = {
          email: data.email,
          password: data.password,
          role: 'ARTISTA',
          nome: data.nome,
          cognome: data.cognome,
          nomeArtista: data.nomeArtista,
          cognomeArtista: '',
          genereMusicale: data.genereMusicale,
          citta: data.citta,
          cachet: data.cachet,
          disponibile: data.disponibile,
          fotoProfilo: data.fotoProfilo || '',
          linkSocial: data.linkSocial || '',
          linkVideo: data.linkVideo || '',
        };
        const res = await fetch('/artisti', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const text = await res.text();
          console.error('Registration error:', res.status, text);
          return { success: false, error: `Errore durante la registrazione (${res.status}).` };
        }
        const saved: ArtistaDto = await res.json();
        persistUser({
          id: saved.id,
          email: saved.email,
          role: 'ARTISTA',
          nome: saved.nomeArtista || saved.nome || '',
          cognome: saved.cognome || '',
          displayName: saved.nomeArtista || `${saved.nome || ''}`.trim() || saved.email,
        });
        return { success: true };
      } else {
        const body = {
          email: data.email,
          password: data.password,
          role: 'ORGANIZZATORE',
          nome: data.nome,
          cognome: data.cognome,
          tipo: data.tipo,
          descrizione: data.descrizione,
          citta: data.citta,
          telefono: data.telefono,
          sitoWeb: data.sitoWeb,
        };
        const res = await fetch('/organizzatori', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const text = await res.text();
          console.error('Registration error:', res.status, text);
          return { success: false, error: `Errore durante la registrazione (${res.status}).` };
        }
        const saved: OrganizzatoreDto = await res.json();
        persistUser({
          id: saved.id,
          email: saved.email,
          role: 'ORGANIZZATORE',
          nome: saved.nome,
          cognome: saved.cognome,
          displayName: `${saved.nome} ${saved.cognome}`.trim() || saved.email,
        });
        return { success: true };
      }
    } catch {
      return { success: false, error: 'Impossibile connettersi al server.' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('eventu_user');
  }, []);

  const updateUser = useCallback((fields: Partial<AuthUser>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...fields };
      localStorage.setItem('eventu_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

package it.its.eventu.service;

import it.its.eventu.enums.StatoCandidatura;
import it.its.eventu.model.Candidatura;
import it.its.eventu.repository.CandidaturaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CandidaturaService {

    @Autowired
    private CandidaturaRepo repo;

    public Candidatura inviaCandidatura(Candidatura c) {
        c.setStato(StatoCandidatura.IN_ATTESA);
        c.setDataInvio(LocalDate.now());
        return repo.save(c);
    }

    public List<Candidatura> getByEvento(Long eventoId) {
        return repo.findByEventoId(eventoId);
    }

    public List<Candidatura> getByArtista(Long artistaId) {
        return repo.findByArtistaId(artistaId);
    }

    public Candidatura aggiornaStato(Long id, StatoCandidatura nuovoStato) {
        Candidatura c = repo.findById(id).orElseThrow();
        c.setStato(nuovoStato);
        return repo.save(c);
    }
}

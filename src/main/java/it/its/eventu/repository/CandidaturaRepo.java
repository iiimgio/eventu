package it.its.eventu.repository;

import it.its.eventu.model.Candidatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidaturaRepo extends JpaRepository<Candidatura, Long> {
    List<Candidatura> findByEventoId(Long eventoId);
    List<Candidatura> findByArtistaId(Long artistaId);
}



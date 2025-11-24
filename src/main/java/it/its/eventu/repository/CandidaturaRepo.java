package it.its.eventu.repository;

import it.its.eventu.model.Candidatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidaturaRepo extends JpaRepository<Candidatura, Long> {}


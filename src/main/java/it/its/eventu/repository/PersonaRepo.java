package it.its.eventu.repository;

import it.its.eventu.model.PersonaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Anche se non strettamente necessario con JpaRepository, è buona pratica
public interface PersonaRepo extends JpaRepository<PersonaEntity, Long> {}

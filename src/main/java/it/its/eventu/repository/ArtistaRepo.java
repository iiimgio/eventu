package it.its.eventu.repository;


import it.its.eventu.model.Artista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistaRepo extends JpaRepository<Artista, Long> {}


package it.its.eventu.service;

import it.its.eventu.model.Artista;
import it.its.eventu.repository.ArtistaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArtistaService {

    @Autowired
    private ArtistaRepo artistaRepository;

    public Artista save(Artista artista) {
        return artistaRepository.save(artista);
    }


    public List<Artista> findAll() {
        return artistaRepository.findAll();
    }


    public Optional<Artista> findById(Long id) {
        return artistaRepository.findById(id);
    }


    public void delete(Long id) {
        artistaRepository.deleteById(id);
    }
}

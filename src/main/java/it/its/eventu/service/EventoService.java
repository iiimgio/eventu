package it.its.eventu.service;

import it.its.eventu.model.Evento;
import it.its.eventu.repository.EventoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {
    @Autowired
    private EventoRepo repo;

    public List<Evento> findAll() {
        return repo.findAll();
    }

    public Optional<Evento> findById(Long id) {
        return repo.findById(id);
    }

    public Evento save(Evento evento) {
        return repo.save(evento);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

}

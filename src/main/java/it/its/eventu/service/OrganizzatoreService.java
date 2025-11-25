package it.its.eventu.service;

import it.its.eventu.model.Organizzatore;
import it.its.eventu.repository.OrganizzatoreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganizzatoreService {

    @Autowired
    private OrganizzatoreRepo repo;

    public List<Organizzatore> findAll() {
        return repo.findAll();
    }

    public Optional<Organizzatore> findById(Long id) {
        return repo.findById(id);
    }

    public Organizzatore save(Organizzatore o) {
        return repo.save(o);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}


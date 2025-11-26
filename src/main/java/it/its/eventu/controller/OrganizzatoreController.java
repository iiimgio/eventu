package it.its.eventu.controller;

import it.its.eventu.dto.OrganizzatoreDto;
import it.its.eventu.mapper.OrganizzatoreMapper;
import it.its.eventu.model.Organizzatore;
import it.its.eventu.service.OrganizzatoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/organizzatori")
public class OrganizzatoreController {@Autowired
private OrganizzatoreService organizzatoreService;

    @Autowired
    private OrganizzatoreMapper organizzatoreMapper;

    // ✅ Crea organizzatore
    @PostMapping
    public ResponseEntity<OrganizzatoreDto> crea(@RequestBody OrganizzatoreDto dto) {
        Organizzatore organizzatore = organizzatoreMapper.toEntity(dto);
        Organizzatore salvato = organizzatoreService.save(organizzatore);
        return ResponseEntity.ok(organizzatoreMapper.toDto(salvato));
    }

    // ✅ Lista organizzatori
    @GetMapping
    public ResponseEntity<List<OrganizzatoreDto>> lista() {
        return ResponseEntity.ok(
                organizzatoreService.findAll().stream()
                        .map(organizzatoreMapper::toDto)
                        .collect(Collectors.toList())
        );
    }

    // ✅ Dettaglio organizzatore
    @GetMapping("/{id}")
    public ResponseEntity<OrganizzatoreDto> dettaglio(@PathVariable Long id) {
        Organizzatore organizzatore = organizzatoreService.findById(id)
                .orElseThrow(() -> new RuntimeException("Organizzatore non trovato"));
        return ResponseEntity.ok(organizzatoreMapper.toDto(organizzatore));
    }

    // ✅ Modifica organizzatore
    @PutMapping("/{id}")
    public ResponseEntity<OrganizzatoreDto> modifica(@PathVariable Long id,
                                                     @RequestBody OrganizzatoreDto dto) {
        Organizzatore organizzatore = organizzatoreService.findById(id)
                .orElseThrow(() -> new RuntimeException("Organizzatore non trovato"));

        Organizzatore aggiornato = organizzatoreMapper.toEntity(dto);
        aggiornato.setId(organizzatore.getId());

        Organizzatore salvato = organizzatoreService.save(aggiornato);
        return ResponseEntity.ok(organizzatoreMapper.toDto(salvato));
    }

    // ✅ Elimina organizzatore
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> elimina(@PathVariable Long id) {
        organizzatoreService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

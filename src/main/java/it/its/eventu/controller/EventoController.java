package it.its.eventu.controller;

import it.its.eventu.dto.EventoDto;
import it.its.eventu.mapper.EventoMapper;
import it.its.eventu.model.Evento;
import it.its.eventu.model.Organizzatore;
import it.its.eventu.service.EventoService;
import it.its.eventu.service.OrganizzatoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/eventi")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @Autowired
    private OrganizzatoreService organizzatoreService;

    @Autowired
    private EventoMapper eventoMapper;

    @PostMapping("/organizzatore/{organizzatoreId}")
    public ResponseEntity<EventoDto> creaEvento(@PathVariable Long organizzatoreId,
                                                @RequestBody EventoDto eventoDto) {
        Organizzatore organizzatore = organizzatoreService.findById(organizzatoreId)
                .orElseThrow(() -> new RuntimeException("Organizzatore non trovato"));

        Evento evento = eventoMapper.toEntity(eventoDto);
        evento.setOrganizzatore(organizzatore);

        Evento salvato = eventoService.save(evento);
        return ResponseEntity.ok(eventoMapper.toDto(salvato));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<EventoDto>> listaEventi() {
        return ResponseEntity.ok(
                eventoService.findAll().stream()
                        .map(eventoMapper::toDto)
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoDto> dettaglioEvento(@PathVariable Long id) {
        Evento evento = eventoService.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento non trovato"));
        return ResponseEntity.ok(eventoMapper.toDto(evento));
    }

    @PutMapping("/{id}/organizzatore/{organizzatoreId}")
    public ResponseEntity<EventoDto> modificaEvento(@PathVariable Long id,
                                                    @PathVariable Long organizzatoreId,
                                                    @RequestBody EventoDto eventoDto) {
        Evento evento = eventoService.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento non trovato"));

        if (!evento.getOrganizzatore().getId().equals(organizzatoreId)) {
            return ResponseEntity.badRequest().body(null);
        }

        Evento aggiornato = eventoMapper.toEntity(eventoDto);
        aggiornato.setId(evento.getId());
        aggiornato.setOrganizzatore(evento.getOrganizzatore());

        Evento salvato = eventoService.save(aggiornato);
        return ResponseEntity.ok(eventoMapper.toDto(salvato));
    }

    @DeleteMapping("/{id}/organizzatore/{organizzatoreId}")
    public ResponseEntity<Void> eliminaEvento(@PathVariable Long id,
                                              @PathVariable Long organizzatoreId) {
        Evento evento = eventoService.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento non trovato"));

        if (!evento.getOrganizzatore().getId().equals(organizzatoreId)) {
            return ResponseEntity.badRequest().build();
        }

        eventoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

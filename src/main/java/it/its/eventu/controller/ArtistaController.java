package it.its.eventu.controller;

import it.its.eventu.dto.ArtistaDto;
import it.its.eventu.mapper.ArtistaMapper;
import it.its.eventu.model.Artista;
import it.its.eventu.service.ArtistaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/artisti")
public class ArtistaController {

    @Autowired
    private ArtistaService artistaService;

    @Autowired
    private ArtistaMapper artistaMapper;


    @PostMapping
    public ResponseEntity<ArtistaDto> crea(@RequestBody ArtistaDto dto) {
        Artista artista = artistaMapper.toEntity(dto);
        artista.setId(null);
        Artista salvato = artistaService.save(artista);
        return ResponseEntity.ok(artistaMapper.toDto(salvato));
    }


    @GetMapping
    public ResponseEntity<List<ArtistaDto>> lista() {
        return ResponseEntity.ok(
                artistaService.findAll().stream()
                        .map(artistaMapper::toDto)
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArtistaDto> dettaglio(@PathVariable Long id) {
        Artista artista = artistaService.findById(id)
                .orElseThrow(() -> new RuntimeException("Artista non trovato"));
        return ResponseEntity.ok(artistaMapper.toDto(artista));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArtistaDto> modifica(@PathVariable Long id,
                                               @RequestBody ArtistaDto dto) {
        Artista artista = artistaService.findById(id)
                .orElseThrow(() -> new RuntimeException("Artista non trovato"));

        Artista aggiornato = artistaMapper.toEntity(dto);
        aggiornato.setId(artista.getId());

        Artista salvato = artistaService.save(aggiornato);
        return ResponseEntity.ok(artistaMapper.toDto(salvato));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> elimina(@PathVariable Long id) {
        artistaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

package it.its.eventu.controller;

import it.its.eventu.dto.CandidaturaDto;
import it.its.eventu.enums.StatoCandidatura;
import it.its.eventu.mapper.CandidaturaMapper;
import it.its.eventu.model.Candidatura;
import it.its.eventu.service.CandidaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/candidature")
public class CandidaturaController {

    @Autowired
    private CandidaturaService candidaturaService;

    @Autowired
    private CandidaturaMapper candidaturaMapper;

    @PostMapping
    public ResponseEntity<CandidaturaDto> invia(@RequestBody CandidaturaDto candidaturaDto) {
        Candidatura candidatura = candidaturaMapper.toEntity(candidaturaDto);
        Candidatura salvata = candidaturaService.inviaCandidatura(candidatura);
        return ResponseEntity.ok(candidaturaMapper.toDto(salvata));
    }

    @GetMapping("/evento/{id}")
    public ResponseEntity<List<CandidaturaDto>> perEvento(@PathVariable Long id) {
        return ResponseEntity.ok(
                candidaturaService.getByEvento(id).stream()
                        .map(candidaturaMapper::toDto)
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("/artista/{id}")
    public ResponseEntity<List<CandidaturaDto>> perArtista(@PathVariable Long id) {
        return ResponseEntity.ok(
                candidaturaService.getByArtista(id).stream()
                        .map(candidaturaMapper::toDto)
                        .collect(Collectors.toList())
        );
    }

    @PutMapping("/{id}/stato")
    public ResponseEntity<CandidaturaDto> aggiornaStato(@PathVariable Long id,
                                                        @RequestParam StatoCandidatura stato) {
        Candidatura aggiornata = candidaturaService.aggiornaStato(id, stato);
        return ResponseEntity.ok(candidaturaMapper.toDto(aggiornata));
    }
}



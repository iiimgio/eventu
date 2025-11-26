package it.its.eventu.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class EventoDto {
    private Long id;
    private String titolo;
    private String descrizione;
    private String luogo;
    private String tipoEvento;
    private Double budget;
    private LocalDate data;
    private LocalTime orarioInizio;
    private LocalTime orarioFine;
    private Long organizzatoreId;
}


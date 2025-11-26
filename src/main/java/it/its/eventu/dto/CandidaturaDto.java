
package it.its.eventu.dto;

import it.its.eventu.enums.StatoCandidatura;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class CandidaturaDto {

    private Long id;
    private String utentePresentazione;
    private LocalDate dataInvio;
    private StatoCandidatura stato;
    private Long artistaId;
    private Long eventoId;
}


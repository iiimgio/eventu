package it.its.eventu.dto;

import it.its.eventu.enums.TipoOrganizzatore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrganizzatoreDto {

    private Long id;
    private String nome;
    private String cognome;
    private String email;
    private String password;
    private String role;
    private TipoOrganizzatore tipo;
    private String descrizione;
    private String citta;
    private String telefono;
    private String sitoWeb;
}

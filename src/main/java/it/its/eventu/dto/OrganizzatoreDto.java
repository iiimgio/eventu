package it.its.eventu.dto;


import it.its.eventu.enums.TipoOrganizzatore;
import lombok.Data;

@Data
public class OrganizzatoreDto {
    private Long id;
    private String nome;
    private String email;
    private String città;
    private String descrizione;
    private String telefono;
    private String sitoWeb;
    private TipoOrganizzatore tipo;
}


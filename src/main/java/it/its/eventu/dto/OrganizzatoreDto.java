package it.its.eventu.dto;

import it.its.eventu.enums.TipoOrganizzatore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrganizzatoreDto {
   
    private String email;
    private TipoOrganizzatore tipo;
    private String descrizione;
    private String citta;
    private String telefono;
    private String sitoWeb;
}


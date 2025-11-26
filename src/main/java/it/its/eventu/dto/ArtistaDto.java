package it.its.eventu.dto;

import it.its.eventu.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtistaDto {


    private String email;
    private Role role;
    private String nomeArtista;
    private String cognomeArtista;
    private String genereMusicale;
    private String citta;
    private Double cachet;
    private Boolean disponibile;
    private String fotoProfilo;
    private String linkSocial;
    private String linkVideo;
}




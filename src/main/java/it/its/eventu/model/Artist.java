package it.its.eventu.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Artist extends User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

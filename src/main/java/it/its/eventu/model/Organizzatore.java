package it.its.eventu.model;

import it.its.eventu.enums.TipoOrganizzatore;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Organizzatore extends Users {

    @Enumerated(EnumType.STRING)
    private TipoOrganizzatore tipo;

    private String descrizione;
    private String citta;
    private String telefono;
    private String sitoWeb;

    @OneToMany(mappedBy = "organizzatore")
    private List<Evento> eventiOrganizzati;
}

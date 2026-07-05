package it.its.eventu.model;

import it.its.eventu.enums.TipoOrganizzatore;
import jakarta.persistence.*;
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

    @OneToMany(mappedBy = "organizzatore", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Evento> eventiOrganizzati;
}

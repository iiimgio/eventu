package it.its.eventu.model;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;

import java.util.List;

public class Organizzatore extends User{
    @Enumerated(EnumType.STRING)
    private TipoOrganizzatore tipo; // PERSONA_FISICA, AZIENDA, ASSOCIAZIONE

    private String descrizione;
    private String città;
    private String telefono;
    private String sitoWeb;

    @OneToMany(mappedBy = "organizzatore")
    private List<Evento> eventiOrganizzati;
}

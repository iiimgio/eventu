package it.its.eventu.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titolo;
    private String descrizione;
    private String luogo;
    private String tipoEvento;
    private Double budget;

    private LocalDate data;
    private LocalTime orarioInizio;
    private LocalTime orarioFine;

    @ManyToOne
    @JoinColumn(name = "organizzatore_id", nullable = false)
    private Organizzatore organizzatore; // solo organizzatore può creare eventi

    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL)
    private List<Candidatura> candidature;
}

package it.its.eventu.entity;

import jakarta.persistence.*;
import lombok.Data;

public class User {@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED) // Strategia chiave
@Data // Lombok per getter/setter
public class Utente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password; // Hashata!

    @Enumerated(EnumType.STRING)
    private Ruolo ruolo; // ADMIN, ARTISTA, ORGANIZZATORE

    private String citta; // Comune a entrambi
}
}

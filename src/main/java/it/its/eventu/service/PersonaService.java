package it.its.eventu.service;


import it.its.eventu.repository.PersonaRepo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Data
@NoArgsConstructor

public class PersonaService {

   private PersonaRepo personaRepo;

   @Autowired
   public PersonaService(PersonaRepo personaRepo) {
       this.personaRepo = personaRepo;
   }


}

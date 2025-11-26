package it.its.eventu.mapper;

import it.its.eventu.dto.CandidaturaDto;
import it.its.eventu.model.Candidatura;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CandidaturaMapper {

    @Mapping(source = "artista.id", target = "artistaId")
    @Mapping(source = "evento.id", target = "eventoId")
    @Mapping(source = "messaggio", target = "utentePresentazione")
    CandidaturaDto toDto(Candidatura candidatura);

    @Mapping(source = "artistaId", target = "artista.id")
    @Mapping(source = "eventoId", target = "evento.id")
    @Mapping(source = "utentePresentazione", target = "messaggio")
    Candidatura toEntity(CandidaturaDto dto);
}


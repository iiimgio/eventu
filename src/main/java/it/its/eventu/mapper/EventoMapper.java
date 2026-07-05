package it.its.eventu.mapper;

import it.its.eventu.dto.EventoDto;
import it.its.eventu.model.Evento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EventoMapper {

    @Mapping(source = "organizzatore.id", target = "organizzatoreId")
    EventoDto toDto(Evento evento);

    @Mapping(source = "organizzatoreId", target = "organizzatore.id")
    Evento toEntity(EventoDto dto);
}

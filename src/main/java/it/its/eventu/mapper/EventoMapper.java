package it.its.eventu.mapper;

import it.its.eventu.dto.EventoDto;
import it.its.eventu.model.Evento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface EventoMapper {
    EventoMapper INSTANCE = Mappers.getMapper(EventoMapper.class);

    @Mapping(source = "organizzatore.id", target = "organizzatoreId")
    EventoDto toDto(Evento evento);

    @Mapping(source = "organizzatoreId", target = "organizzatore.id")
    Evento toEntity(EventoDto dto);
}

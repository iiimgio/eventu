package it.its.eventu.mapper;

import it.its.eventu.dto.ArtistaDto;
import it.its.eventu.model.Artista;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ArtistaMapper {
    @Mapping(source = "id", target = "id")
    ArtistaDto toDto(Artista artista);
    Artista toEntity(ArtistaDto dto);
}



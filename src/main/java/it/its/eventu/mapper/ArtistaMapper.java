package it.its.eventu.mapper;

import it.its.eventu.dto.ArtistaDto;
import it.its.eventu.model.Artista;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ArtistaMapper {
    ArtistaDto toDto(Artista artista);
    Artista toEntity(ArtistaDto dto);
}



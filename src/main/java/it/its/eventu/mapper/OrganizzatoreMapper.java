package it.its.eventu.mapper;

import it.its.eventu.dto.OrganizzatoreDto;
import it.its.eventu.model.Organizzatore;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrganizzatoreMapper {
    OrganizzatoreDto toDto(Organizzatore organizzatore);
    Organizzatore toEntity(OrganizzatoreDto dto);
}



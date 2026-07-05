package it.its.eventu.mapper;

import it.its.eventu.dto.OrganizzatoreDto;
import it.its.eventu.model.Organizzatore;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrganizzatoreMapper {

    @Mapping(source = "id", target = "id")
    OrganizzatoreDto toDto(Organizzatore organizzatore);

    @Mapping(target = "id", ignore = true)
    Organizzatore toEntity(OrganizzatoreDto dto);
}

package org.example.backend.dtos.search;

import lombok.Builder;
import lombok.With;

@With
@Builder
public record PropertiesDTO(
        String name,
        String postcode,
        String street,
        String housenumber,
        String city,
        String formatted,
        String website,
        String opening_hours,
        ContactDTO contact,
        CateringDTO catering,
        Double lon,
        Double lat,
        Integer distance,
        String place_id
) {
}

package org.example.backend.dtos.search;

import lombok.Builder;
import lombok.With;

import java.util.List;

@With
@Builder
public record SearchPlaceResponse(List<FeaturesDTO> features) {
}

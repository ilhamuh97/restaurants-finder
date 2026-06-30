package org.example.backend.dtos.search;

import lombok.Builder;
import lombok.With;

@With
@Builder
public record CateringDTO(String cuisine) {
}

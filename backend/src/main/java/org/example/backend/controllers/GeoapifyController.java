package org.example.backend.controllers;

import org.example.backend.dtos.search.SearchPlaceResponse;
import org.example.backend.services.GeoapifyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class GeoapifyController {

    private final GeoapifyService geoapifyService;

    public GeoapifyController(GeoapifyService geoapifyService) {
        this.geoapifyService = geoapifyService;
    }

    @GetMapping("/search")
    public SearchPlaceResponse search(@RequestParam String lat, @RequestParam String lng, @RequestParam String radius, @RequestParam Integer limit) {
        return geoapifyService.searchLocations(lat, lng, radius, limit);
    }
}

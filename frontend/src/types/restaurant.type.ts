export interface RestaurantResponse {
    features: RestaurantFeature[];
}

export interface RestaurantFeature {
    properties: RestaurantProperties;
}

export interface RestaurantProperties {
    name: string;
    postcode: string;
    street: string;
    housenumber: string;
    city: string;
    formatted: string;
    website: string | null;
    opening_hours: string | null;
    contact: RestaurantContact | null;
    catering: RestaurantCatering | null;
    lon: number;
    lat: number;
    distance: number;
    place_id: string;
}

export interface RestaurantContact {
    phone: string;
}

export interface RestaurantCatering {
    cuisine: string;
}
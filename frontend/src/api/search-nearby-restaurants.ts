import {api} from "./axios";
import type {AxiosResponse} from "axios";
import type {RestaurantResponse} from "../types/restaurant.type";

type SearchNearbyParams = {
    lat: string,
    lng: string,
    radius: string
};

export const searchNearbyRestaurants = (
    params: SearchNearbyParams
): Promise<AxiosResponse<RestaurantResponse>> => {
    return api.get("/search", {
        params,
    });
};
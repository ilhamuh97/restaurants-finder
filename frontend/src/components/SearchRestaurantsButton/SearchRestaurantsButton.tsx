import {searchNearbyRestaurants} from "../../api/search-nearby-restaurants.ts";
import type { AxiosResponse } from "axios";
import type {RestaurantResponse} from "../../types/restaurant.type.ts";
import type { ReactElement } from "react";
import RestaurantImg from "../../assets/restaurant.png"

type Props = {
    lat: string;
    lng: string;
    radius: number;
    limit: number;
    onResult: (data: RestaurantResponse) => void;
    onError: (error: string) => void;
};

export function SearchRestaurantsButton({lat, lng, radius, limit, onResult, onError,}: Props): ReactElement {
    const handleClick = async () => {
        try {
            const res: AxiosResponse<RestaurantResponse> = await searchNearbyRestaurants({
                lat,
                lng,
                radius,
                limit,
            });

            onResult(res.data);
        } catch (err) {
            onError((err as Error).message)
        }
    };

    return (
        <button
            onClick={handleClick}
            className="map-button"
            aria-label="Restaurants in der Nähe suchen"
        >
            <img src={RestaurantImg} alt={"Restaurant Image"} />
        </button>
    );
}
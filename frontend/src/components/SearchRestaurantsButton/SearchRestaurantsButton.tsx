import {searchNearbyRestaurants} from "../../api/search-nearby-restaurants.ts";
import type { AxiosResponse } from "axios";
import type { RestaurantResponse } from "../../types/restaurant.type.ts";
import type { ReactElement } from "react";
import RestaurantImg from "../../assets/restaurant.png"

type Props = {
    lat: string;
    lng: string;
    radius: string;
    limit: number;
    onResult: (data: any) => void;
    onError?: (error: string) => void;
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
            onResult({
                "features": [
                    {
                        "properties": {
                            "name": "Restaurant Naxos",
                            "postcode": "22850",
                            "street": "Ulzburger Stra�e",
                            "housenumber": "279",
                            "city": "Norderstedt",
                            "formatted": "Restaurant Naxos, Ulzburger Stra�e 279, 22850 Norderstedt, Germany",
                            "website": "Home ",
                            "opening_hours": "Mo-Fr 11:30-14:30,17:00-23:00; Sa-Su 11:30-23:00",
                            "contact": {
                                "phone": "+49 40 525 77 33"
                            },
                            "catering": {
                                "cuisine": "greek"
                            },
                            "lon": 9.9959691,
                            "lat": 53.7055712,
                            "distance": 416,
                            "place_id": "5132a770a9effd234059ef7f362850da4a40f00103f9018075a67e0000000092031052657374617572616e74204e61786f73"
                        }
                    },
                    {
                        "properties": {
                            "name": "Cantina Americana",
                            "postcode": "22846",
                            "street": "Rathausallee",
                            "housenumber": "29a",
                            "city": "Norderstedt",
                            "formatted": "Cantina Americana, Rathausallee 29a, 22846 Norderstedt, Germany",
                            "website": "Home - SAN BURRITO ",
                            "opening_hours": "Tu-Fr 11:30-22:00; Sa-Su 17:00-22:00",
                            "contact": {
                                "phone": "+49 40 22868968"
                            },
                            "catering": {
                                "cuisine": "mexican"
                            },
                            "lon": 9.9932977,
                            "lat": 53.7068221,
                            "distance": 521,
                            "place_id": "515062218491fc23405986cb852579da4a40f00103f901e8d28d4e0100000092031143616e74696e6120416d65726963616e61"
                        }
                    },
                    {
                        "properties": {
                            "name": "Fantasia bei Alberto",
                            "postcode": "22846",
                            "street": "Rathausallee",
                            "housenumber": "10",
                            "city": "Norderstedt",
                            "formatted": "Fantasia bei Alberto, Rathausallee 10, 22846 Norderstedt, Germany",
                            "website": null,
                            "opening_hours": null,
                            "contact": null,
                            "catering": null,
                            "lon": 9.9958521,
                            "lat": 53.7068667,
                            "distance": 549,
                            "place_id": "514c4e9253e0fd234059d390a79b7ada4a40f00103f9014aff9fc20000000092031446616e74617369612062656920416c626572746f"
                        }
                    },
                    {
                        "properties": {
                            "name": "Lenci's",
                            "postcode": "22846",
                            "street": "Rathausallee",
                            "housenumber": "35",
                            "city": "Norderstedt",
                            "formatted": "Lenci's, Rathausallee 35, 22846 Norderstedt, Germany",
                            "website": null,
                            "opening_hours": null,
                            "contact": null,
                            "catering": null,
                            "lon": 9.9899266,
                            "lat": 53.7069835,
                            "distance": 588,
                            "place_id": "5186e1c8a8d7fa234059e3a7716f7eda4a40f00103f9010f43dd1c000000009203074c656e63692773"
                        }
                    },
                    {
                        "properties": {
                            "name": "Hopfenliebe Brauhaus",
                            "postcode": "22846",
                            "street": "Rathausallee",
                            "housenumber": "60",
                            "city": "Norderstedt",
                            "formatted": "Hopfenliebe Brauhaus, Rathausallee 60, 22846 Norderstedt, Germany",
                            "website": null,
                            "opening_hours": "Mo,Su off, Tu-Th 16:00-24:00, Fr,Sa 16:00-01:00",
                            "contact": null,
                            "catering": {
                                "cuisine": "regional"
                            },
                            "lon": 9.9935586,
                            "lat": 53.7074917,
                            "distance": 596,
                            "place_id": "51b0517bb6b3fc23405981d888168fda4a40f00103f9014fff9fc200000000920314486f7066656e6c69656265204272617568617573"
                        }
                    },
                    {
                        "properties": {
                            "name": "La Piazza",
                            "postcode": "22846",
                            "street": "Rathausallee",
                            "housenumber": "70",
                            "city": "Norderstedt",
                            "formatted": "La Piazza, Rathausallee 70, 22846 Norderstedt, Germany",
                            "website": null,
                            "opening_hours": "Mo-Fr 12:00-14:30,17:00-22:00; Sa 17:00+; Su off",
                            "contact": null,
                            "catering": {
                                "cuisine": "italian"
                            },
                            "lon": 9.9918997,
                            "lat": 53.7074772,
                            "distance": 603,
                            "place_id": "510dd30847dafb2340593455e69c8eda4a40f00103f9014442e44f020000009203094c61205069617a7a61"
                        }
                    },
                    {
                        "properties": {
                            "name": "KiM's Norderstedt",
                            "postcode": "22846",
                            "street": "Friedrichsgaber Weg",
                            "housenumber": "290",
                            "city": "Norderstedt",
                            "formatted": "KiM's Norderstedt, Friedrichsgaber Weg 290, 22846 Norderstedt, Germany",
                            "website": "Home ",
                            "opening_hours": "We-Fr 15:00-22:00, Sa 12:00-00:00, Su 12:00-20:00",
                            "contact": {
                                "phone": "+49 40 52110497"
                            },
                            "catering": {
                                "cuisine": "international"
                            },
                            "lon": 9.9796812,
                            "lat": 53.7023403,
                            "distance": 911,
                            "place_id": "51170335c698f5234059d8947549e6d94a40f00103f90169a94d1a000000009203114b694d2773204e6f726465727374656474"
                        }
                    },
                    {
                        "properties": {
                            "name": "Ionios",
                            "postcode": "22846",
                            "street": "Rathausallee",
                            "housenumber": "83b",
                            "city": "Norderstedt",
                            "formatted": "Ionios, Rathausallee 83b, 22846 Norderstedt, Germany",
                            "website": "https://www.ionios.de/",
                            "opening_hours": "Tu-Sa 11:30-14:30,17:30-23:00; Su,PH 11:30-21:00",
                            "contact": {
                                "phone": "+49 40 5224412"
                            },
                            "catering": {
                                "cuisine": "greek"
                            },
                            "lon": 9.9837719,
                            "lat": 53.7080142,
                            "distance": 915,
                            "place_id": "51947252f3b0f7234059430d9535a0da4a40f00103f90175ad4d1a00000000920306496f6e696f73"
                        }
                    },
                    {
                        "properties": {
                            "name": "Sportlerheim",
                            "postcode": "22844",
                            "street": "Am Exerzierplatz",
                            "housenumber": "14-16",
                            "city": "Norderstedt",
                            "formatted": "Sportlerheim, Am Exerzierplatz 14-16, 22844 Norderstedt, Germany",
                            "website": null,
                            "opening_hours": null,
                            "contact": null,
                            "catering": null,
                            "lon": 10.0079701,
                            "lat": 53.7024687,
                            "distance": 958,
                            "place_id": "5113b12da81404244059587b8e7eead94a40f00103f9018750cb640200000092030c53706f72746c65726865696d"
                        }
                    }
                ]
            });

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
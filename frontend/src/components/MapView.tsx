import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";

import { divIcon, point, type Map as LeafletMap, type MarkerCluster } from "leaflet";
import {
    AttributionControl,
    MapContainer,
    TileLayer,
    useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import "leaflet/dist/leaflet.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";

import "./MapView.css";

import MyLocation from "../assets/my-location.png";

import { MyLocationMarker } from "./MyLocationMarker/MyLocationMarker.tsx";
import { RestaurantMarker } from "./RestaurantMarker/RestaurantMarker.tsx";
import { SearchRestaurantsButton } from "./SearchRestaurantsButton/SearchRestaurantsButton.tsx";
import SettingsButton from "./SettingsButton/SettingsButton.tsx";

import {
    COMBINED_ATTRIBUTION,
    INITIAL_CENTER,
    INITIAL_ZOOM,
    skins,
} from "../constants/constants.ts";

import type { RestaurantFeature, RestaurantResponse } from "../types/restaurant.type.ts";
import type { Position } from "../types/position.type.ts";
import type { Settings } from "../types/settings.type.ts";

// Eine reine Verhaltenskomponente (return null)
function SyncPreview({previewRef}: { previewRef: RefObject<LeafletMap | null> }) {
    const map = useMapEvents({
        move: () => previewRef.current?.setView(map.getCenter(), map.getZoom() - 4, {animate: false}),
        zoom: () => previewRef.current?.setView(map.getCenter(), map.getZoom() - 4, {animate: false}),
    });
    return null;
}

const createClusterIcon = (cluster: MarkerCluster) =>
    divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: "custom-cluster",
        iconSize: point(40, 40, true),
    });

export default function MapView() {
    const [mainSkin, setMainSkin] = useState<0 | 1>(0);
    const secondSkin = mainSkin === 0 ? 1 : 0;
    const mapRef = useRef<LeafletMap | null>(null);
    const [currentPosition, setCurrentPosition] = useState<Position>({
        lat: INITIAL_CENTER[0],
        lng: INITIAL_CENTER[1],
    });
    const [restaurants, setRestaurants] = useState<RestaurantFeature[]>([]);
    const [radius, setRadius] = useState<number>(1000);
    const [limit, setLimit] = useState<number>(10);
    const previewMapRef = useRef<LeafletMap | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Fehlermeldung nach 5s automatisch ausblenden; Timer wird bei neuer Meldung/Unmount aufgeräumt
    useEffect(() => {
        if (!errorMessage) return;
        const timer = setTimeout(() => setErrorMessage(null), 5000);
        return () => clearTimeout(timer);
    }, [errorMessage]);

    useEffect(() => {
        goToMyLocation();
    }, []);

    function goToMyLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                setCurrentPosition(location);

                mapRef.current?.flyTo([location.lat, location.lng], 15);
            },
            () => {
                setErrorMessage(
                    "Standort nicht verfügbar. Bitte die Freigabe im Browser prüfen."
                );
            }
        );
    }

    function toggleSkin() {
        setMainSkin(prev => prev === 0 ? 1 : 0)
    }

    function handleSkinButtonKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            toggleSkin()
        }
    }

    function handleSettings(settings: Settings): void {
        setRadius(settings.radius);
        setLimit(settings.limit);
    }

    return (
        <div className={"map-wrapper"}>
            <div className="map-button-group">
                <button
                    onClick={goToMyLocation}
                    className={"map-button"}
                    aria-label={"Zu meinem Standort springen"}
                >
                    <img src={MyLocation} alt={""} />
                </button>

                {currentPosition && (
                    <SearchRestaurantsButton
                        lat={currentPosition.lat.toString()}
                        lng={currentPosition.lng.toString()}
                        radius={radius}
                        limit={limit}
                        onResult={(data: RestaurantResponse) => {
                            setRestaurants(data.features)
                        }}
                        onError={setErrorMessage}
                    />
                )}

                <SettingsButton settings={{radius, limit}} onSave={(settings: Settings) => handleSettings(settings)}/>
            </div>

            {errorMessage && <p className={"error-message"} role={"alert"}>{errorMessage}</p>}

            <MapContainer id={"map"} ref={mapRef} center={INITIAL_CENTER} zoom={INITIAL_ZOOM}
                          attributionControl={false}>
                <AttributionControl prefix={"ⓘ"}/>
                <SyncPreview previewRef={previewMapRef}/>

                <TileLayer
                    url={skins[mainSkin].url}
                    attribution={COMBINED_ATTRIBUTION}
                    eventHandlers={{
                        tileerror: () => {
                            if (mainSkin === 1) {
                                setMainSkin(0)
                                setErrorMessage("Satellitenansicht gerade nicht verfügbar – zeige Standardkarte.")
                            }
                        },
                    }}
                />

                {restaurants.length > 0 ? <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon}>
                    {restaurants.map(restaurant => (
                        <RestaurantMarker
                            key={restaurant.properties.place_id}
                            restaurant={restaurant}
                        />
                    ))}
                </MarkerClusterGroup> : null}

                {currentPosition && (
                    <MyLocationMarker lat={currentPosition.lat} lng={currentPosition.lng}/>
                )}
            </MapContainer>

            <div className={"skin-button"}
                 role={"button"}
                 tabIndex={0}
                 aria-label={"Zwischen Karten- und Satellitenansicht wechseln"}
                 onClick={toggleSkin}
                 onKeyDown={handleSkinButtonKeyDown}>
                <MapContainer id={"preview-map"}
                              ref={previewMapRef}
                              center={currentPosition}
                              zoom={INITIAL_ZOOM - 4}
                              attributionControl={false}
                              zoomControl={false}
                              dragging={false}
                              scrollWheelZoom={false}
                              doubleClickZoom={false}
                              boxZoom={false}
                              keyboard={false}
                              touchZoom={false}>
                    <TileLayer
                        url={skins[secondSkin].url}
                    />
                </MapContainer>
            </div>
        </div>)
}
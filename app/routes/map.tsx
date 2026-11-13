import './styles/map.css';
import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { DROP_POINTS } from '~/data/locations';
import { distanceInMiles } from '~/utilities/distanceInMiles';
import { Marker } from '~/components/Marker';
import { Link } from 'react-router';

const DEFAULT_CENTER = { lat: 41.4993, lng: -81.6944 };
const DEFAULT_ZOOM = 12;
const RADIUS_MILES = 10;

export default function Map() {
    const [apiReady, setApiReady] = useState(false);
    const [zipCodeInput, setZipCodeInput] = useState('44106');
    const [center, setCenter] = useState(DEFAULT_CENTER);

    const mapsRef = useRef<{ map: any; maps: any }>({ map: null, maps: null });

    const handleApiLoaded = ({ map, maps }: any) => {
        mapsRef.current = { map, maps };
        setApiReady(true);
    };

    const updateMapLocation = (current_zip_code: string) => {
        if (!apiReady || !/^\d{5}$/.test(zipCodeInput)) return;

        const { map, maps } = mapsRef.current;
        const geocoder = new maps.Geocoder();

        geocoder.geocode(
            {
                componentRestrictions: { postalCode: current_zip_code, country: 'US' },
            },
            (results: any, status: any) => {
                if (status === 'OK' && results[0]) {
                    const { geometry } = results[0];

                    if (geometry.viewport) {
                        map.fitBounds(geometry.viewport);
                    } else {
                        map.setCenter(geometry.location);
                        map.setZoom(14);
                    }
                } else {
                    console.log('Geocoding failed: ', status);
                }
            }
        );
    }

    useEffect(() => {
        if (!apiReady || !/^\d{5}$/.test(zipCodeInput)) return;

        const { map, maps } = mapsRef.current;
        const geocoder = new maps.Geocoder();

        geocoder.geocode(
            {
                componentRestrictions: { postalCode: zipCodeInput, country: 'US' },
            },
            (results: any, status: any) => {
                if (status === 'OK' && results[0]) {
                    const { geometry } = results[0];

                    if (geometry.viewport) {
                        map.fitBounds(geometry.viewport);
                    } else {
                        map.setCenter(geometry.location);
                        map.setZoom(14);
                    }
                } else {
                    console.log('Geocoding failed: ', status);
                }
            }
        );
    }, [zipCodeInput, apiReady]);

    const updateZipCode = (e: any) => {
        setZipCodeInput(e.target.value);
    };

    const nearbyDropPoints = DROP_POINTS
        .map((point) => ({
            ...point,
            distance: distanceInMiles(center.lat, center.lng, point.lat, point.lng),
        }))
        .filter((point) => point.distance <= RADIUS_MILES)
        .sort((a, b) => a.distance - b.distance)

return (
        <div className="root">
            <div className="info-column">
                <div className="info-header">
                    <p className="info-title">Find Third Spaces</p>
                    <div className="zip-form">
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="Zip code"
                            aria-label="Zip code"
                            value={zipCodeInput}
                            maxLength={5}
                            onChange={(e) => updateZipCode(e)}
                            className="zip-input"
                        />
                        <button
                            className="zip-submit"
                            id="zip-submit"
                            onClick={() => updateMapLocation()}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <p className="list-heading">Spaces within {RADIUS_MILES} miles:</p>
                <div className="spaces-list">
                    {nearbyDropPoints.map((p) => (
                        <Link
                            key={p.id}
                            to={{
                                pathname: "/space",
                                search: `?id=${p.id}&name=${p.name}`,
                            }}
                            className="space-list-component"
                        >
                            <span className="space-name">{p.name}</span>
                            <span className="space-distance">{p.distance.toFixed(1)} mi</span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="map-section">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_KEY }}
                    defaultCenter={DEFAULT_CENTER}
                    defaultZoom={DEFAULT_ZOOM}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={handleApiLoaded}
                >
                    {nearbyDropPoints.map((p) => (
                        <Marker key={p.id} lat={p.lat} lng={p.lng} name={p.name} />
                    ))}
                </GoogleMapReact>
            </div>
        </div>
    );
}
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, useRef } from 'react';

mapboxgl.accessToken = import.meta.env.VITE_API_MAPBOX_TOKEN;

function Map() {
    const [coordinates, setCoordinates] = useState({
        lng: 0,
        lat: 0
    });
    const mapContainerRef = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return; // If the map has already been initialized, skip this effect

        // Initialize the map only once
        map.current = new mapboxgl.Map({
            container: mapContainerRef.current, // Reference the map container
            style: 'mapbox://styles/mapbox/standard',
            center: [-99.29011, 39.39172],
            zoom: 5
        });

        const getCoordinate = async () => {
            try {
                const req = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=Montebello&access_token=${import.meta.env.VITE_API_MAPBOX_TOKEN}`);
                const result = await req.json();
                const coordinate = result.features[0].geometry.coordinates;
                setCoordinates({
                    lng: coordinate[0],
                    lat: coordinate[1]
                });
            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        };

        getCoordinate();
    }, []);

    useEffect(() => {
        if (coordinates.lng !== 0 && coordinates.lat !== 0) {
            console.log("Coordinates updated:", coordinates);

            // Add markers
             new mapboxgl.Marker()
                .setLngLat([coordinates.lng, coordinates.lat])
                .addTo(map.current);

          new mapboxgl.Marker({ color: 'black', rotation: 45 })
                .setLngLat([-118, 34])
                .addTo(map.current);

            // Fetch the route between the two points
            const getRoute = async () => {
                const query = await fetch(
                    `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates.lng},${coordinates.lat};-118,34?geometries=geojson&access_token=${mapboxgl.accessToken}`
                );
                const json = await query.json();
                const data = json.routes[0].geometry;

                // Add the route as a layer on the map
                map.current.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: data
                        }
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                        'line-opacity': 0.9
                    }
                });

                // Adjust the map to fit the bounds of the route
                const bounds = new mapboxgl.LngLatBounds();
                data.coordinates.forEach(coord => {
                    bounds.extend(coord);
                });
                map.current.fitBounds(bounds, {
                    padding: 50
                });
            };

            getRoute();
        }
    }, [coordinates]);

    return (
        <div ref={mapContainerRef} id='map' style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Map;

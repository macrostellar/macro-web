"use client";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [73.0479, 33.6844], // Islamabad default center
      zoom: 11,
    });
  }, []);

  return <div ref={mapContainer} className="w-full h-full" />;
}

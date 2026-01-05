"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};
const defaultCenter = {
  lat: mockPosition.lat,
  lng: mockPosition.lng,
};
export default function VehicleMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const deviceId = "test-device-1"; // Your mock device

    const fetchLatest = async () => {
      const res = await fetch(`/api/device/latest?device_id=${deviceId}`);
      const data = await res.json();

      if (data?.lat && data?.lng) {
        setPosition({
          lat: data.lat,
          lng: data.lng,
        });
      }
    };

    fetchLatest();

    const interval = setInterval(fetchLatest, 2000); // 2 seconds
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={14}
    >
      <Marker position={position} />
    </GoogleMap>
  );
}

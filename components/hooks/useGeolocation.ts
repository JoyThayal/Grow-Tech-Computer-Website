import { useState } from "react";

export function useGeolocation() {
  const [detecting, setDetecting] = useState(false);

  const getCoordinates = (
    onSuccess: (data: {
      locationName: string;
      lat: number;
      lng: number;
    }) => void,
    onError: (msg: string) => void,
  ) => {
    if (!navigator.geolocation) {
      onError("Geolocation not supported");
      return;
    }

    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en&addressdetails=1`,
          );
          const data = await res.json();
          const addr = data.address || {};
          const parts = [
            addr.road || addr.neighbourhood,
            addr.suburb || addr.residential,
            addr.city || addr.town || "Kolkata",
          ].filter(Boolean);

          const locationName = `${[...new Set(parts)].join(", ")}${addr.postcode ? ` - ${addr.postcode}` : ""}`;
          onSuccess({ locationName, lat, lng });
        } catch {
          onSuccess({
            locationName: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
            lat,
            lng,
          });
        } finally {
          setDetecting(false);
        }
      },
      (err) => {
        setDetecting(false);
        onError(
          err.code === 1 ? "Permission denied" : "Unable to fetch location",
        );
      },
      { timeout: 10000, enableHighAccuracy: true },
    );
  };

  return { getCoordinates, detecting };
}

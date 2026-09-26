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
      onError("Geolocation is not supported by your current browser.");
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
        switch (err.code) {
          case 1: // PERMISSION_DENIED
            onError(
              "Location access was blocked by you. Please tap the Tune/Sliders icon near your browser address bar, set Location to 'Allow', and refresh the page.",
            );
            break;
          case 2: // POSITION_UNAVAILABLE
            onError(
              "Unable to detect your device GPS signal. Please turn on your phone's Location service and try again.",
            );
            break;
          case 3: // TIMEOUT
            onError(
              "Location request timed out. Please check your network connection and try again.",
            );
            break;
          default:
            onError(
              "Failed to retrieve your location automatically. Please enter your address manually.",
            );
            break;
        }
      },
      { timeout: 12000, enableHighAccuracy: true, maximumAge: 10000 },
    );
  };

  return { getCoordinates, detecting };
}

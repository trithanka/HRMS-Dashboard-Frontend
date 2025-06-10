import { ILocation } from "../api/location/location-types";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
}

export const validateLocation = (locationData: LocationData): boolean => {
  // Check if accuracy is suspiciously high (mock locations often have perfect accuracy)
  if (locationData.accuracy && locationData.accuracy < 1) {
    return false;
  }

  // Check if timestamp is current (mock locations might have old timestamps)
  const currentTime = Date.now();
  const timeDiff = currentTime - locationData.timestamp;
  if (timeDiff > 30000) { // More than 30 seconds old
    return false;
  }

  // Check if coordinates are within valid ranges
  if (
    locationData.latitude < -90 ||
    locationData.latitude > 90 ||
    locationData.longitude < -180 ||
    locationData.longitude > 180
  ) {
    return false;
  }

  return true;
};

export const isWithinGeofence = (
  userLocation: { latitude: number; longitude: number },
  geofence: ILocation
): boolean => {
  // Convert string coordinates to numbers
  const lat1 = parseFloat(geofence.lat1);
  const long1 = parseFloat(geofence.long1);
  const lat2 = parseFloat(geofence.lat2);
  const long2 = parseFloat(geofence.long2);
  const lat3 = parseFloat(geofence.lat3);
  const long3 = parseFloat(geofence.long3);
  const lat4 = parseFloat(geofence.lat4);
  const long4 = parseFloat(geofence.long4);

  // Check if point is within the geofence polygon
  return isPointInPolygon(
    userLocation.latitude,
    userLocation.longitude,
    [
      [lat1, long1],
      [lat2, long2],
      [lat3, long3],
      [lat4, long4],
    ]
  );
};

// Ray casting algorithm for checking if a point is inside a polygon
const isPointInPolygon = (
  lat: number,
  lng: number,
  polygon: number[][]
): boolean => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0];
    const yi = polygon[i][1];
    const xj = polygon[j][0];
    const yj = polygon[j][1];

    const intersect =
      yi > lng !== yj > lng &&
      lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}; 
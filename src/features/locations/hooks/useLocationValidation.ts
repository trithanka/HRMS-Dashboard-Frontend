import { useState, useEffect } from 'react';
import { validateLocation, isWithinGeofence } from '../../../utils/locationValidation';
import { ILocation } from '../../../api/location/location-types';
import toast from 'react-hot-toast';

interface UseLocationValidationProps {
  geofence?: ILocation;
  onLocationValid?: (isValid: boolean) => void;
}

export const useLocationValidation = ({ geofence, onLocationValid }: UseLocationValidationProps = {}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateCurrentLocation = async () => {
    setIsValidating(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      };

      // Validate the location data
      const isLocationValid = validateLocation(locationData);
      
      // If geofence is provided, check if location is within it
      let isWithinFence = true;
      if (geofence) {
        isWithinFence = isWithinGeofence(
          { latitude: locationData.latitude, longitude: locationData.longitude },
          geofence
        );
      }

      const finalValidation = isLocationValid && isWithinFence;
      setIsValid(finalValidation);
      onLocationValid?.(finalValidation);

      if (!finalValidation) {
        toast.error('Invalid location detected. Please ensure you are at the correct location and not using mock location.');
      }

      return finalValidation;
    } catch (error) {
      console.error('Error getting location:', error);
      toast.error('Failed to get location. Please ensure location services are enabled.');
      setIsValid(false);
      onLocationValid?.(false);
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  return {
    validateCurrentLocation,
    isValidating,
    isValid
  };
}; 
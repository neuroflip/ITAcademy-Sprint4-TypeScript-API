import type { Location } from './LocationResolver.d';

const getLocation = (locationResolved: (location: Location) => void, 
  locationNotResolved: (error: GeolocationPositionError) => void) => {
  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          const newLocation: Location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
          }
          locationResolved(newLocation);
      }, (error)=>{
        locationNotResolved(error);
      });
  }
}

export { getLocation };

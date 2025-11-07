export const getLocation = (locationResolved: Function, locationNotResolved: Function) => {
  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          const newLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
          }
          locationResolved(newLocation);
      }, ()=>{
        locationNotResolved();
      });
  }
}

/*
File to contain all the utilities we need to calculate distances and all that jazz
*/

/*
Takes in a source coord (object with fields lat and long) and location coord, and returns the distance between the
two coordinates in meters.

Heavily sourced from https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
*/
export const getDistance = (source, location) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(location.lat - source.lat);
  var dLon = deg2rad(location.lon - source.lon); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(source.lat)) * Math.cos(deg2rad(location.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c * 1000;
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

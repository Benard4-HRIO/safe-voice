/**
 * Calculate distance between two coordinates using Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Generate geohash for location (simplified version)
 */
export function generateGeohash(latitude: number, longitude: number, precision: number = 7): string {
  // Simplified geohash - in production, use a proper geohash library
  const lat = Math.floor((latitude + 90) * Math.pow(10, precision));
  const lon = Math.floor((longitude + 180) * Math.pow(10, precision));
  return `${lat.toString(36)}-${lon.toString(36)}`;
}

/**
 * Find nearby support profiles within radius
 */
export function findNearby(
  profiles: Array<{ latitude: number | null; longitude: number | null }>,
  userLat: number,
  userLon: number,
  radiusKm: number = 50
): Array<{ profile: any; distance: number }> {
  return profiles
    .filter(p => p.latitude !== null && p.longitude !== null)
    .map(profile => ({
      profile,
      distance: calculateDistance(
        userLat,
        userLon,
        profile.latitude!,
        profile.longitude!
      ),
    }))
    .filter(item => item.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
}



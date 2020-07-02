// Musician data service
import http from "../http-common"

class LocationDataService {

    getRegions() {
        return http.get("api/regions");
    }
    getCities(regionId) {
        return http.get(`api/regions/${regionId}/cities`);
    }
    getDistricts(cityId) {
        return http.get(`api/cities/${cityId}/districts`);
    }
}
export default new LocationDataService();

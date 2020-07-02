// Musician data service
import http from "../http-common"

class AccountDataService {
    register(id,data) {
        return http.post(`api/users/${id}/accounts`, data);
    }
    delete(id) {
        return http.delete(`api/users/${id}`);
    }
    updateMusician(id, data) {
        return http.put(`api/musicians/${id}`, data);
    }
}
export default new AccountDataService();

import http from "../http-common"

class PublicationDataService {
    getAll() {
        return http.get("/api/publications");

    }
    get(id) {
        return http.get(`/api/publications/${id}`);
    }
    getByMusicianId(musicianId) {
        return http.get(`/api/musicians/${musicianId}/publications`);
    }
    create(musicianId, data) {
        return http.post(`/api/musicians/${musicianId}/publications`, data);

    }
    update(id, data) {
        return http.put(`/api/publications/${id}`, data);
    }
    delete(id) {
        return http.delete(`/api/publications/${id}`);
    }
    findByType(type){
        return http.get(`/api/publications?publicationType=${type}`);
    }
}
export default new PublicationDataService();

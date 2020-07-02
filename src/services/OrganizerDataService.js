import http from "../http-common"
class OrganizerDataService {
    getAll() {
        return http.get("api/Organizers", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
    get(id) {
        return http.get(`api/Organizers/${id}`,{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
    create(data) {
        return http.post("/Organizers", data);
    }
    update(id, data) {
        return http.put(`/Organizers/${id}`, data);
    }
    delete(id) {
        return http.delete(`/Organizers/${id}`);
    }
}
export default new OrganizerDataService();

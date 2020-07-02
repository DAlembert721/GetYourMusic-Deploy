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
    updateOrganizer(id,data) {
        return http.put(`/api/organizers/${id}`,data)
    }
}
export default new OrganizerDataService();

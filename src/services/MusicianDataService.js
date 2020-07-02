// Musician data service
import http from "../http-common"

class MusicianDataService {
    getAll() {
        return http.get("api/musicians", {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }

    get(id) {
        return http.get(`api/musicians/${id}`,{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });

    }
    getMusicianGenres(id) {
        return http.get(`api/musicians/${id}/genres`,{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
    getMusicianInstruments(id) {
        return http.get(`api/musicians/${id}/instruments`,{
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
    updateMusician(id,data) {
        return http.put(`/api/Musicians/${id}`,data)
    }
}
export default new MusicianDataService();

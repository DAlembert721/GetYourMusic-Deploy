//GenreDataService.js

import http from '../http-common';

class GenreDataService {
    getAll(){
        return http.get('/api/Genres');
    }
    assignGenreToMusician(musicianId, genreId) {
        return http.post(`/api/musicians/${musicianId}/genres/${genreId}`)
    }
}

export default new GenreDataService();
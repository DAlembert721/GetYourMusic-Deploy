//InstrumentDataService.js

import http from '../http-common';

class InstrumentDataService {
    getAll() {
        return http.get('/api/instruments');
    }
    assignGenreToMusician(musicianId, instrumentId) {
        return http.post(`/api/musicians/${musicianId}/genres/${instrumentId}`)
    }



}

export  default  new InstrumentDataService();
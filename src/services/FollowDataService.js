// FollowDAtaService.js

import http from '../http-common'

class FollowDataService {
    getAllBYFollowerId(id) {
        return http.get(`/api/followers/${id}/followed`);
    }
    create(followerId,followedId) {
        return http.post(`/api/followers/${followerId}/followed/${followedId}`)
    }
    delete(followerId, followedId) {
        return http.delete(`/api/followers/${followerId}/followed/${followedId}`)
    }
}

export default new FollowDataService();

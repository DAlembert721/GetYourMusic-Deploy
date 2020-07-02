// FollowDAtaService.js

import http from '../http-common'

class FollowDataService {
    getAllBYFollowerId(id) {
        return http.get(`/api/follower/${id}/followed`);
    }
    create(followerId,followedId) {
        return http.post(`/api/follower/${followerId}/followed/${followedId}`)
    }
    delete(followerId, followedId) {
        return http.delete(`/api/follower/${followerId}/followed/${followedId}`)
    }
}

export default new FollowDataService();
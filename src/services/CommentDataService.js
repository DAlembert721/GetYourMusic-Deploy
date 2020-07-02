import http from '../http-common';

class CommentDataService {
    getByPublicationId(publicationId) {
        return http.get(`/api/publications/${publicationId}/comments`);
    }

    createComment(commenterId, publicationId, text) {
        return http.post(`/api/accounts/${commenterId}/publications/${publicationId}/comments`, { text });
    }
}

export default new CommentDataService();

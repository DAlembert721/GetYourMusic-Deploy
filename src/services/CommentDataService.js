import http from '../http-common';

class ContractDataService {
    getByPublicationId(publicationId) {
        return http.get(`/api/publication/${publicationId}/comments`);
    }

    createComment(commenterId, publicationId, text) {
        return http.post(`/api/accounts/${commenterId}/publications/${publicationId}/comments`, { text });
    }
}

export default new ContractDataService();

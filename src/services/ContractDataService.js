import http from '../http-common';

class ContractDataService {
    createContract(organizerId, musicianId, model) {
        return http.post(`/api/organizers/${organizerId}/musicians/${musicianId}/contracts`, model);
    }

    getByMusicianId(musicianId) {
        return http.get(`/api/musicians/${musicianId}/contracts`);
    }

    putContractState(contractId, contractStateId) {
        return http.put(`/api/contracts/${contractId}/states/${contractStateId}`);
    }

    getByOrganizerId(organizerId) {
        return http.get(`/api/organizers/${organizerId}/contracts`)
    }

    qualify(organizerId, contractId, musicianId, qualificationModel) {
        return http.post(`/api/organizers/${organizerId}/contracts/${contractId}/musicians/${musicianId}/qualifications`,
            qualificationModel);
    }
}

export default new ContractDataService();

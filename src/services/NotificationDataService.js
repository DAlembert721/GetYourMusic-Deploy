import http from '../http-common';

class NotificationDataService {
    getAllByAccountIdAsync(accountId) {
        return http.get(`/api/accounts/${accountId}/notifications`);
    }
}

export default new NotificationDataService();

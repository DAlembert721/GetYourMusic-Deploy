// MessageDataService.js

import http from '../http-common';

class MessageDataService {
    getAllByAccountId(receiverId) {
        return http.get(`api/accounts/${receiverId}/messages`);
    }

    getAllBySenderAsync(senderId) {
        return http.get(`api/accounts/${senderId}/accounts/0/messages`)
    }

    getByMessageId(receiverId, messageId) {
        return http.get(`api/accounts/${receiverId}/messages/${messageId}`);
    }

    postMessage(senderId, receiverId, message) {
        return http.post(`api/accounts/${senderId}/accounts/${receiverId}/messages`, { "text": message });
    }
}

export default new MessageDataService();
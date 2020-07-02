import axios from 'axios';

const token = localStorage.getItem('token');

export default axios.create({
    baseURL: "https://getyourmusic.azurewebsites.net/",
    headers: {
        "Content-type": "application/json",

    },

});

axios.defaults.headers.common['Authorization'] = token;

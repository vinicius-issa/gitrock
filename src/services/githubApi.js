const axios = require('axios');

const TOKEN =  '54873afa72c414c7855d2ad04880ea7b211c0762';

const axiosApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'Authorization': 'token ' + TOKEN,
    }
})

module.exports = axiosApi;
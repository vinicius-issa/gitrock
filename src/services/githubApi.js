const axios = require('axios');

//const TOKEN =  'b4b45473b328793f0c722534bb36f9cb1c1756ed';
const TOKEN =  '54873afa72c414c7855d2ad04880ea7b211c0762';
//token 54873afa72c414c7855d2ad04880ea7b211c0762

const axiosApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'Authorization': 'token ' + TOKEN,
    }
})

module.exports = axiosApi;
const axios = require('axios');

//const TOKEN =  'b4b45473b328793f0c722534bb36f9cb1c1756ed'; //Cachorro
const TOKEN = ' 5c953ebb73a0c86bd730691c2d388fee7c94f294'; //VissaWebDev
//const TOKEN =  '54873afa72c414c7855d2ad04880ea7b211c0762';
//const TOKEN =  'e349885e1b9580930f5203434130c91e5d7cf2e4';
//token 54873afa72c414c7855d2ad04880ea7b211c0762

//const axiosApi = axiosCache.setup({
const axiosApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Authorization': 'token ' + TOKEN,
  }
})


axiosApi.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return { status: 200, response };
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.resolve({ status: 400, error: error },);
});


module.exports = axiosApi;
const axios = require('axios');
require('dotenv').config()

const TOKEN = process.env.TOKEN; //VissaWebDev

if(TOKEN){
  axiosApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Authorization': 'token ' + TOKEN,
    } 
  });
}

else{
  axiosApi = axios.create({
    baseURL: 'https://api.github.com',
  })
}

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
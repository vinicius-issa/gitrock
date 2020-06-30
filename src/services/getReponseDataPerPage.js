const githubApi = require('../services/githubApi');

const getResponseDataPerPage = async (urlBase, initialPage=1, size=100) =>{
    const SIZE = size;
    let page = initialPage;
    let result = [];
    try{
        while(page>0){
            let response = await githubApi.get(`${urlBase}?page=${page}&per_page=${SIZE}`);
            let data = response.data
            data.forEach(item=>result.push(item))
            page++;
            if(data.length < SIZE) page = 0;
        }
    }catch(error){
        console.log(error);
        return [];
    }
    
    return result;
}

module.exports = getResponseDataPerPage;
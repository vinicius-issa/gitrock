const githubApi = require('../services/githubApi');

const getLastPage = response =>{
    if (response.headers.link) {
        let lastLink = response.headers.link
        let lastLinkPages = lastLink.split(',')[1]
        const regex = /page=(\d*)/
        return parseInt(regex.exec(lastLinkPages)[1])
    }
    else return 1;
}

const getRepos = urlBase =>{
    return new Promise((resolve,reject)=>{
        let url = `${urlBase}?page=1&per_page=100`
        githubApi.get(urlBase).then(response=>{
            let lastPage = getLastPage(response);
            let promises = []
            for(let i=1; i<=lastPage ; i++){
                let urlPromise = `${urlBase}?page=${i}&per_page=100`
                console.log(urlPromise);
                promises.push(githubApi.get(urlPromise));
            }
            Promise.all(promises).then(results=>{
                let result = [];
                let datas = results.forEach(el=>{
                    data = el.data;
                    result.push(...data);
                })
                result.forEach(res=>{
                    console.log(res.name);
                })
                resolve(result);
            })
        })
    })
}

const getStars = urlRepo =>{
    return new Promise((resolve,reject)=>{
        let urlFirst = `${urlRepo}?page=1&per_page=100`
        console.log('GetStars->urlFirst:', urlFirst);
        githubApi.get(urlFirst).then(response=>{
            let lastPage = getLastPage(response);
            console.log('GetStars->lastUrl:', lastPage);
            if(lastPage===1)
                resolve(response.data.length);
            else{
                let url = `${urlRepo}?page=${lastPage}&per_page=100`;
                githubApi.get(url).then(responseLast=>{
                    let sizeLast = responseLast.data.length;
                    resolve(100*(lastPage-1) + sizeLast)
                })
            }
        }).catch(error=>{
            console.log("Erro no AXIOS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
            console.log('URL DO ERRO:', urlRepo);
            getStars(urlRepo).then(star=>{
                resolve(star)
            })
        })
    })
}

module.exports = {getRepos, getStars};
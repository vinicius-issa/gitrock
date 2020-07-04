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
        githubApi.get(urlBase).then(resp=>{
            if(resp.status===200){
                let response= resp.response;
                let lastPage = getLastPage(response);
                let promises = []
                for(let i=1; i<=lastPage ; i++){
                    let urlPromise = `${urlBase}?page=${i}&per_page=100`
                    promises.push(githubApi.get(urlPromise));
                }
                Promise.all(promises).then(results=>{
                    let result = [];
                    let isError = false;
                    results.forEach(el=>{
                        if(el.status===200){
                            data = el.response.data;
                            result.push(...data);
                        }
                        else{
                            isError = true;
                            console.log("A error was ocurred in requisition")
                            console.log(el.error)
                            getRepos(urlBase).then(repos=>{
                                resolve(repos);
                            })
                        }
                    })
                    if(!isError){
                        resolve(result);
                    }
                })
            }else{
                let message = 'no message error'
                if(resp.error.response && resp.error.response.data)
                    message = resp.error.response.data.message
                console.log("Error Message:", resp.error);
                if( message.includes('API rate limit exceeded for user')){
                    console.log("The app will terminate")
                    reject(resp.error)
                }
                else if (message.includes('You have triggered an abuse detection mechanism.')){
                    setTimeout(()=>{
                        getRepos(urlBase).then(repos=>{
                            resolve(repos);
                        })
                    },5000)
                }
                else{
                    getRepos(urlBase).then(repos=>{
                        resolve(repos);
                    })
                }
                
            }
        })
    })
}

const getStars = urlRepo =>{
    return new Promise((resolve,reject)=>{
        let urlFirst = `${urlRepo}?page=1&per_page=100`
        githubApi.get(urlFirst).then(resp=>{
            if(resp.status===200){
                let response = resp.response;
                let lastPage = getLastPage(response);
                if(lastPage===1)
                    resolve(response.data.length);
                else{
                    let url = `${urlRepo}?page=${lastPage}&per_page=100`;
                    githubApi.get(url).then(resp=>{
                        if(resp.status===200){
                            let responseLast = resp.response
                            let sizeLast = responseLast.data.length;
                            resolve(100*(lastPage-1) + sizeLast)
                        }
                        else {
                            console.log("A error was ocurred in requisition")
                            console.log("in url: ",urlRepo)
                            getStars(urlRepo).then(star=>{
                                resolve(star);
                            })
                        }
                    })
                }
            }
            else{
                console.log("A error was ocurred in requisition")
                let message = 'no message error'
                if(resp.error.response && resp.error.response.data){
                    message = resp.error.response.data.message
                }
                console.log('Error Message: ', message);
                if( message.includes('API rate limit exceeded for user')){
                    console.log("The app will terminate")
                    reject(resp.error)
                }
                else if (message.includes('You have triggered an abuse detection mechanism.')){
                    setTimeout(()=>{
                        getStars(urlRepo).then(star=>{
                            resolve(star)
                        })
                    },5000)
                }
                else{
                    console.log("in url: ",urlRepo)
                    console.log('Error Msg', resp.error.code )
                    getStars(urlRepo).then(star=>{
                        resolve(star)
                    })
                }

            }
        })
    })
}

module.exports = {getRepos, getStars};
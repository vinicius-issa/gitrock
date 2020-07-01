const githubApi = require('../services/githubApi');


const urlsToPromises = urls =>{
    let promisses = []
    if(urls.length>0){
        let url = urls.pop()
        let p = new Promise((resolve, reject) => {
                    githubApi.get(url).then(resp => {
                        console.log("Resolvendo url: ", url)
                        resolve(resp.data)
                    }).catch(err => {
                        console.log('=============Error==============');
                        console.log(url)
                        console.log('URLS size: ', urls.length)
                        urls.push(url);
                        console.log('URLS size: ', urls.length)
                        if (err.response && err.response.data) {
                            let message = err.response.data.message;
                            if (message.includes('You have triggered an abuse detection mechanism')) {
                                setTimeout(() => {
                                }, 30000);
                            }
                            else if (message.includes('API rate limit exceeded for user ID')) {
                                console.log('VAMOS REJEITAR');
                                reject(err)
                            }
                            console.log(message);
                        }
                        else {
                            console.log("Error Code: ", err.code)
                        }
                        resolve([]);
                    });
                })
                
        promisses.push(p)
    }

    return promisses;
}


const solution = (urls) => {
    return new Promise((acept)=>{
        let promises;
        let result = [] 
        if(urls.length>0){
            promises = urlsToPromises(urls)
            Promise.all(promises).then(resposPromisses=>{
                console.log("Promise All resolvida")
                resposPromisses.forEach(item => {
                    result.push(...item);
                })
                if(urls.length===0){
                    console.log('Ja vai retornar');
                    acept( result)
                }
                else{
                    solution(urls).then(newResult=>{
                        acept ([...result, ...newResult])

                    })
                }
            })
    
        }

    })
}


const getResponseDataPerPage = (urlBase, initialPage = 1, size = 100) => {

    return new Promise((res,rej)=>{
        console.log("Olhando na URL: ", urlBase)
        const SIZE = size;
        let page = initialPage;
        let result = []
        let lastPage = 1

        githubApi.get(`${urlBase}?page=1&per_page=${SIZE}`).then((response)=>{
            if (response.headers.link) {
                let lastLink = response.headers.link
                let lastLinkPages = lastLink.split(',')[1]
                const regex = /page=(\d*)/
                lastPage = parseInt(regex.exec(lastLinkPages)[1])
            }
            console.log("LAST PAGE: ", lastPage)
    
            let urlsAll = [];
    
            let urlAux;
            console.log("URLS INICIAIS")
            for (let i = page; i <= lastPage; i++){
                urlAux = `${urlBase}?page=${i}&per_page=${SIZE}`;
                console.log(urlAux);
                urlsAll.push(urlAux);
            }
            console.log("Paginas add no urls: ", urlsAll.length)
            
            solution(urlsAll).then(resultado=>{
                res(resultado);
            }).catch(error=>{
                console.log("Error foi aqui agora>><<>>><<>>><<>>><<>>><<>>><<>>><<<>>><<")
            });
        }).catch(error=>{
            console.log("===============================================CATCH ERROR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
            console.log(error)
    
            /////////////TODO HERE!!! REPEAT OPERATION
            getResponseDataPerPage(urlBase).then(resp=>{
                res(resp);
            });
        })

    });//Fim da Promise


    
}

module.exports = getResponseDataPerPage;
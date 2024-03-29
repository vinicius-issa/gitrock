let routes = require('express').Router();
const {getRepos, getStars} = require('../services/responses');
const myCache = require('../services/cache');

routes.get('/', (req, res) => {
    return res.json({
        "name": "gitrock",
        "version": "1.0.0",
        "description": "RockContent's technical challenge",
        "author": "Vinicius Issa",
    })
})

routes.get('/repositories/:name', (req, res) => {
    req.setTimeout(20*60*1000)
    const start = Date.now();
    let organization = req.params.name;

    let inCache = myCache.get(organization);
    if(inCache)
        return res.json(inCache);

    //Geting repositories list
    getRepos(`/orgs/${organization}/repos`).then(repositories => {
        
        let promises = []
        repositories.forEach(repo=>{
            let url = `/repos/${organization}/${repo.name}/stargazers`;
            promises.push(getStars(url).then(stars=>{
                return {
                    name: repo.name,
                    stars
                }
            }).catch(error=>{
                return res.status(400).json(error);
            }));
        })
        Promise.all(promises).then(result=>{
            result = result.sort((a,b)=>(b.stars - a.stars))
            console.log(result);
            myCache.set(organization,result);
            return res.json(result);
        }).catch(error=>{
            console.log("A error was ocurred");
            console.log(error);
            return res.status(400).json(error);
        })


    }).catch(error => {
        console.log("A error was ocurred");
        console.log(error);
        return res.status(400).json(error);

    })


})

module.exports = routes;
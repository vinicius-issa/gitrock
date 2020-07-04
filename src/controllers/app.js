let routes = require('express').Router();
const {getRepos, getStars} = require('../services/responses');

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
    let ornanization = req.params.name;

    //Geting repositories list
    getRepos(`/orgs/${ornanization}/repos`).then(repositories => {
        
        let promises = []
        repositories.forEach(repo=>{
            let url = `/repos/${ornanization}/${repo.name}/stargazers`;
            console.log("Add no promisses array:", url);
            promises.push(getStars(url).then(stars=>{
                console.log("Resolvida a url:",url);
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
            console.log("TEMPOS: ", Date.now() - start)
            console.log('Respos Size:',repositories.length);
            res.json(result);
        }).catch(error=>{
            console.log("PEGAMOS O ERRO AQUI<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
            return res.status(400).send("ERROR");
        })


    }).catch(error => {
        console.log(">>>>>>>>>>>>>ERROR NO APP<<<<<<<<<<<<<");
        console.log(error);
        return res.status(400).json(error);

    })


})

module.exports = routes;
let routes = require('express').Router();
const { response } = require('express');
const getResponseDataPerPage = require('../services/getReponseDataPerPage.js');


routes.get('/', (req, res) => {
    return res.json({
        "name": "gitrock",
        "version": "1.0.0",
        "description": "RockContent's technical challenge",
        "author": "Vinicius Issa",
    })
})

routes.get('/repositories/:name', async (req, res) => {
    const start = Date.now();
    let ornanization = req.params.name;
    let page = 1;
    let repositories = [];

    //Geting repositories list
    let response = await getResponseDataPerPage(`/orgs/${ornanization}/repos`);
    response.forEach(repo=>{
        repositories.push(repo.name)
    });

    //Geting stars in repositories
    const promisses = repositories.map(async (repo)=>{
        let stars = await getResponseDataPerPage(`/repos/${ornanization}/${repo}/stargazers`);
        let json = {
            name: repo,
            stars: stars.length
        }
      
        return json;
    })

    let result = await Promise.all(promisses)
    
    console.log("Result:")
    result.forEach(item=>{console.log(item)});
    
    console.log(Date.now() - start);
    return res.json(result);
    
})

module.exports = routes;
let routes = require('express').Router();
let githubApi = require('../services/githubApi');

const SIZE = 100;

routes.get('/', (req, res) => {
    return res.json({
        "name": "gitrock",
        "version": "1.0.0",
        "description": "RockContent's technical challenge",
        "author": "Vinicius Issa",
    })
})

routes.get('/repositories/:name', async (req, res) => {
    let ornanization = req.params.name;
    let page = 1;
    let repositories = [];

    while (page > 0) {
        try {
            let response = await githubApi.get(`/orgs/${ornanization}/repos?page=${page}&per_page=${SIZE}`);
            let data = response.data
            data.forEach(repo => repositories.push(repo.name));
            page++;
            console.log(data.length)
            if(data.length < SIZE) page = 0;
        }
        catch (error) {
            console.log(error);
            page = 0;
        }
    }

    return res.json(repositories);
    
})

module.exports = routes;
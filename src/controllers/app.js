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
    let ornanization = req.params.name;
    let page = 1;
    let repositories = [];

    //Geting repositories list
    let response = await getResponseDataPerPage(`/orgs/${ornanization}/repos`);
    response.forEach(repo=>{
        console.log(repo.name)
        repositories.push(repo.name)
    })

    return res.json(repositories);
    
})

module.exports = routes;
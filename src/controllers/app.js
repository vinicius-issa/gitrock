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

routes.get('/repositories/:name', (req, res) => {
    const start = Date.now();
    let ornanization = req.params.name;
    let repositories = [];
    let result = []

    //Geting repositories list
    getResponseDataPerPage(`/orgs/${ornanization}/repos`).then(response => {
        response.forEach(repo => {
            repositories.push(repo.name)
            //console.log(repo.name);

        });
        //Geting stars in repositories
        const promisses = repositories.map((repo) => {
            return getResponseDataPerPage(`/repos/${ornanization}/${repo}/stargazers`).then(stars => {
                let json = {
                    name: repo,
                    stars: stars.length
                }

                return json;
            }).catch(error=>{
                console.log("<<<<<<<<=============================Parou AQUI===================>>>>>>>")
            })
        })

        result = [];

        Promise.all(promisses).then(result => {
            result = result.sort((a, b) => { return b.stars - a.stars })
            console.log("Result:")
            result.forEach(item => { console.log(item) });

            console.log("Repositories: ", repositories.length)
            console.log(Date.now() - start);

            return res.status(200).json({ result });
        }).catch(error=>{
            console.log(">>>>>>>>>>>>>>>>><<<<<<<<<<<<AQUI NO APP/PROMISES ALL<<<<<<<<<<<<<<<>>>>>>>>>>>>")
        })


    }).catch(error => {
        console.log(">>>>>>>>>>>>>ERROR NO APP<<<<<<<<<<<<<");
        console.log(error);
        return res.status(400).send('{error:error.code}');
    })


})

module.exports = routes;
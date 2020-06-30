const { model } = require('../../../../../lgpd/lgpd-backend/api/cookiePlugin/cookieModel');

let routes = require('express').Router();

routes.get('/', (req, res) => {
    return res.json({
        "name": "gitrock",
        "version": "1.0.0",
        "description": "RockContent's technical challenge",
        "author": "Vinicius Issa",
    })
})

module.exports = routes;
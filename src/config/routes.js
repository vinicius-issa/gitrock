const express = require('express')
const appControler = require('../controllers/app')

module.exports = function(server){

    server.use('/', appControler);
}
const  express = require('express')
const bodyParser = require('body-parser')
const configRoutes = require('./routes')
const server = express();
configRoutes(server)

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())



module.exports = server;

const  express = require('express')
const bodyParser = require('body-parser')
const configRoutes = require('./routes')
const PORT = 3000
const server = express();
configRoutes(server)

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.listen(PORT, function(){
    console.log(`App is running on port ${PORT}`);
})
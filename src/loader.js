require('dotenv').config()

const server = require('./config/server')
const PORT = process.env.PORT || 3000

server.listen(PORT, function(){
    console.log(`App is running on port ${PORT}`);
})
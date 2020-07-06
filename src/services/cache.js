const NodeCache = require("node-cache");

const myCache = new NodeCache( {stdTTL: 15*60, checkperiod:16*60} );

module.exports = myCache;
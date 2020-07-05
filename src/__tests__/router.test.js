const { getRepos, getStars, getLastPage } = require('../services/responses');
const githubApi = require('../services/githubApi');
const server = require('../config/server')
const request = require('supertest');
require('dotenv').config()

describe('Testing responses services', () => {
    it('should', async () => {
        const expected = {
            'express': 40000,
            'multer': 8076,
            'morgan': 5783,
            'session': 4965,
            'cors': 4571,
            'body-parser': 4524,
            'expressjs.com': 3409,
            'compression': 2251,
            'csurf': 1894,
            'cookie-parser': 1479,
            'generator': 1466,
            'serve-static': 1168,
            'cookie-session': 860,
            'vhost': 639,
            'serve-favicon': 561,
            'method-override': 532,
            'response-time': 416,
            'errorhandler': 370,
            'express-paginate': 363,
            'express-namespace': 338,
            'connect-multiparty': 326,
            'serve-index': 324,
            'express-expose': 297,
            'timeout': 254,
            'basic-auth-connect': 118,
            'domain-middleware': 93,
            'api-error-handler': 90,
            'flash': 80,
            'restful-router': 79,
            'urlrouter': 55,
            'discussions': 34,
            'vhostess': 20,
            'connect-markdown': 16,
            'expressjs.github.io': 13,
            'routification': 10,
            'connect-rid': 7,
            'badgeboard': 6,
            'statusboard': 6,
            'set-type': 5,
            'mime-extended': 4,
            '.github': 2
        }



        const response = await request(server).get('/repositories/expressjs');
        const data = response.body;
        expect(response.status).toBe(200);
        expect(data.length).toBe(41);
        data.forEach(repo=>{
            expect(repo.stars).toBe(expected[repo.name]);
        })

    },5*60*1000)
})
const {getRepos, getStars, getLastPage} = require('../services/responses');
const githubApi = require('../services/githubApi');
require('dotenv').config()

describe('Testing responses services',  ()=>{
    const repo = 'rockcontent'

    it('getLastPage should work correctly', async ()=>{
        const repo = 'Netflix';
        const response = await githubApi(`/orgs/${repo}/repos`);
        const size = getLastPage(response.response)
        expect(size).toBe(7);
    });

    it('getRepos should work correctly', async ()=>{
        const repo = 'rockcontent';
        let respo = await getRepos(`/orgs/${repo}/repos`);
        expect(respo.length).toBe(24);
    });

    it('getStars should work correctly', async ()=>{
        const repo = 'rockcontent';
        let size = await getStars(`/repos/${repo}/formio/stargazers`);
        expect(size).toBe(2);
    });
})
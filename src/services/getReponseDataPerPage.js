const githubApi = require('../services/githubApi');

const getResponseDataPerPage = async (urlBase, initialPage = 1, size = 100) => {
    const SIZE = size;
    let page = initialPage;

    let result = [];
    while (page > 0) {
        try {
            console.log("Page: " + page);
            let response = await githubApi.get(`${urlBase}?page=${page}&per_page=${SIZE}`);
            if (response.data) {
                let data = response.data
                data.forEach(item => result.push(item))
                page++;
                if (data.length < SIZE) page = 0;
            }
            else console.log("--------------------------------NO DATA----------------------------")
        } catch (error) {
            console.log("======================Tivemos um problema aqui==========================")
            console.log("Pagina: " + page)
            console.log(error);
            if (error.data) {
                page = 0;
                break;
            }
        }
    }

    return result;
}

module.exports = getResponseDataPerPage;
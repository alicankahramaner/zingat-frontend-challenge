const axios = require('axios').default;

module.exports = (() => {

    var post = async (url = '', data = {}) => {
        return await axios.post(url, data).then(e => e.data).catch(e => console.log(e));
    };

    var get = async (url = '', data) => {
        return await axios.get(url, data).then(e => e.data).catch(e => console.log(e));
    }

    return {
        post,
        get
    }
})();
const axios = jest.fn(() => Promise({
}));

axios.get = jest.fn(() => new Promise((resolve, reject) => {
    resolve({
        status: 200,
        ok: '✅'
    })
}));

module.exports = axios;
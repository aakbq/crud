const path = require("path")
const https = require("https");

exports.about_get = async (req, res) => {
    res.render(path.resolve('./views/userPage/about.ejs'))
};

exports.home_get = async (req, res) => {
    res.render(path.resolve('./views/userPage/index.ejs'))
};

exports.products_get = async (req, res) => {
    res.render(path.resolve('./views/userPage/menu.ejs'), {price: 1});
};

exports.products_post = async (req, res) => {
    let exchange = req.body.curr.toUpperCase()
    let key = 'C25AA8BF-C42A-4F4C-B507-C02CF3E92EBF';
    let url = `https://rest.coinapi.io/v1/exchangerate/USD/${exchange}?apikey=${key}`
    https.get(url, function (response) {
        response.on('data', data => {
            let a = JSON.parse(data)
            let result = a.rate
            res.render(path.resolve('./views/userPage/menu.ejs'), {
                price: result
            });
        })
    });
};

exports.profile_get = async (req, res) => {
    res.render(path.resolve('./views/userPage/profile.ejs'), {user: null, esim:null, familia:null, pochta:null});
};
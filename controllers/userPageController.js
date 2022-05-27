const path = require("path")
const https = require("https");
const Product = require("../models/productModel");
const Customer = require("../models/userModel");
const bcrypt = require("bcryptjs");
const Seller = require("../models/sellerModel");

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
    res.render(path.resolve('./views/userPage/profile.ejs'), {firstName:req.session.firstName, lastName:req.session.lastName, email:req.session.email});
};

exports.update_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./views/userPage/update.ejs'), {err: error, oldSeller: null, newSeller: null});
};

exports.update_patch = async (req, res) => {
    const {currEmail, firstName, lastName, email, password} = req.body

    if (!currEmail && !firstName && !lastName && !email && !password) {
        req.session.error = "Content empty!";
        return res.redirect('/user/update');
    }

    const hashPsw = await bcrypt.hash(password, 11);

    let user = new Customer({
        firstName,
        lastName,
        email,
        password: hashPsw,
    });
    await Customer.findOneAndUpdate({email: currEmail}, {
        firstName,
        lastName,
        email,
        password: hashPsw,
    }).then(data => {
        if (!data) {
            return res.redirect('/user/update');
        } else {
            req.session.firstName=firstName;
            req.session.lastName=lastName;
            req.session.email=email;
            res.render(path.resolve('./views/userPage/profile.ejs'), {err: null, firstName: req.session.firstName, lastName:req.session.lastName, email:req.session.email});
        }
    })
};
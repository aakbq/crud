const bcrypt = require("bcryptjs");
const Product=require('../models/productModel');
const path = require("path")
const Seller = require("../models/sellerModel");
const Customer = require("../models/userModel");
const Manager = require("../models/managerModel");

exports.create_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./views/sellerPage/create.ejs'), {err: error});
};

exports.create_post = async (req, res) => {
    const {name, price, quantity} = req.body

    if (!name && !price && !quantity) {
        req.session.error = "Content empty!";
        return res.redirect('/seller');
    }

    let product = await Product.findOne({name})
    if (product) {
        req.session.error = "Product already exist!";
        return res.redirect('/seller');
    }

    product = new Product({
        name,
        price,
        quantity,
    });

    await product.save()
    res.redirect('/seller/read')
};

exports.read_get = async (req, res) => {
    const product = await Product.find();
    res.render(path.resolve('./views/sellerPage/read.ejs'), {
        productData: product,
    })
};

exports.find_get = async (req, res) => {
    res.render(path.resolve('./views/sellerPage/find.ejs'), {data: null, type: null});
};

exports.find_post = async (req, res) => {
    const {name} = req.body
    const p = path.resolve('./views/sellerPage/find.ejs')

    let product = await Product.findOne({name})

    if (product) {
        res.render(p, {data: product, type: 'Product'})
    }else {
        res.render(p, {data: null, type: 'orange'})
    }
};

exports.update_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./views/sellerPage/update.ejs'), {err: error, oldProduct: null, newProduct: null});
};

exports.update_patch = async (req, res) => {
    const {currName, name, price, quantity} = req.body

    if (!currName && !name && !price && !quantity) {
        req.session.error = "Content empty!";
        return res.redirect('/seller/update');
    }

    let product = new Product({
        name,
        price,
        quantity,
    });

    await Product.findOneAndUpdate({name: currName}, {
        name,
        price,
        quantity,
    }).then(data => {
        if (!data) {
            req.session.error = "Product to update does not exist!";
            return res.redirect('/seller/update');
        } else {
            res.render(path.resolve('./views/sellerPage/update.ejs'), {err: null, oldProduct: currName, newProduct: product});
        }
    })
};

exports.delete_get = async (req, res) => {
    res.render(path.resolve('./views/sellerPage/delete.ejs'), {name: null});
};

exports.delete_post = async (req, res) => {
    const {name} = req.body
    const p = path.resolve('./views/sellerPage/delete.ejs')

    let product = await Product.findOne({name})

    if (product) {
        await Product.deleteOne(product)
        res.render(p, {name: product.name})
    }
};
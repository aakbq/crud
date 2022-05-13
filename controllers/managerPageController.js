const bcrypt = require("bcryptjs")
const Manager = require("../models/managerModel");
const Seller = require('../models/sellerModel')
const Customer = require('../models/userModel')
const path = require("path")

exports.create_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./views/managerPage/create.ejs'), {err: error});
};

exports.create_post = async (req, res) => {
    const {firstName, lastName, email, password} = req.body

    if (!firstName && !lastName && !email && !password) {
        req.session.error = "Content empty!";
        return res.redirect('/manager');
    }

    let seller = await Seller.findOne({email})
    let customer = await Customer.findOne({email})
    let manager = await Manager.findOne({email})
    if (seller || customer || manager) {
        req.session.error = "Email taken!";
        return res.redirect('/manager');
    }

    const hashPsw = await bcrypt.hash(req.body.password, 12);

    seller = new Seller({
        firstName,
        lastName,
        email,
        password: hashPsw
    });

    await seller.save()
    res.redirect('/manager/read')
};

exports.read_get = async (req, res) => {
    const seller = await Seller.find();
    const customer = await Customer.find();
    const manager = await Manager.find();
    res.render(path.resolve('./views/managerPage/read.ejs'), {
        sellerData: seller,
        customerData: customer,
        managerData: manager,
    })
};

exports.find_get = async (req, res) => {
    res.render(path.resolve('./views/managerPage/find.ejs'), {data: null, type: null});
};

exports.find_post = async (req, res) => {
    const {email} = req.body
    const p = path.resolve('./views/managerPage/find.ejs')

    let seller = await Seller.findOne({email})
    let customer = await Customer.findOne({email})
    let manager = await Manager.findOne({email})

    if (seller) {
        res.render(p, {data: seller, type: 'Seller'})
    } else if (customer) {
        res.render(p, {data: customer, type: 'Customer'})
    } else if (manager) {
        res.render(p, {data: manager, type: 'Manager'})
    } else {
        res.render(p, {data: null, type: 'orange'})
    }
};

exports.update_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./views/managerPage/update.ejs'), {err: error, oldSeller: null, newSeller: null});
};

exports.update_patch = async (req, res) => {
    const {currEmail, firstName, lastName, email, password} = req.body

    if (!currEmail && !firstName && !lastName && !email && !password) {
        req.session.error = "Content empty!";
        return res.redirect('/manager/update');
    }

    const hashPsw = await bcrypt.hash(password, 11);

    let seller = new Seller({
        firstName,
        lastName,
        email,
        password: hashPsw,
    });
    await Seller.findOneAndUpdate({email: currEmail}, {
        firstName,
        lastName,
        email,
        password: hashPsw,
    }).then(data => {
        if (!data) {
            req.session.error = "Seller to update does not exist!";
            return res.redirect('/manager/update');
        } else {
            res.render(path.resolve('./views/managerPage/update.ejs'), {err: null, oldSeller: currEmail, newSeller: seller});
        }
    })
};

exports.delete_get = async (req, res) => {
    res.render(path.resolve('./views/managerPage/delete.ejs'), {email: null, type: null});
};

exports.delete_post = async (req, res) => {
    const {email} = req.body
    const p = path.resolve('./views/managerPage/delete.ejs')

    let seller = await Seller.findOne({email})
    let customer = await Customer.findOne({email})

    if (seller) {
        await Seller.deleteOne(seller)
        res.render(p, {email: seller.email, type: 'Seller'})
    } else if (customer) {
        await Customer.deleteOne(customer)
        res.render(p, {email: customer.email, type: 'Customer'})
    } else {
        res.render(p, {email: null, type: 'None'})
    }
};
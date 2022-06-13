const bcrypt = require("bcryptjs")
const Manager = require("../models/managerModel");
const path = require("path");

exports.login_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./views/managerPage/login.ejs'), { err: error });
};

exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    const user = await Manager.findOne({ email });

    if (!user) {
        req.session.error = "Invalid email";
        return res.redirect('/manager/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        req.session.error = "Invalid password";
        return res.redirect('/manager/login');
    }

    req.session.isAuth = false;
    req.session.isSeller=false;
    req.session.isManager=true;
    req.session.firstName = user.firstName;
    req.session.lastName = user.lastName;
    res.redirect('/manager');
};


exports.logout_post = async (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/');
    });
};
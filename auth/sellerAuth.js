module.exports = (req, res, next) => {
    if(req.session.isSeller){
        next();
    }else{
        req.session.error="You have to log in first";
        res.redirect('/seller/login');
    }
};
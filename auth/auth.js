module.exports = (req, res, next) => {
    if(req.session.isAuth){
        next();
    }else{
        req.session.error="You have to log in first";
        res.redirect('/login');
    }
};
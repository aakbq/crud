module.exports = (req, res, next) => {
    if(req.session.isManager){
        next();
    }else{
        req.session.error="You have to log in first";
        res.redirect('/manager/login');
    }
};
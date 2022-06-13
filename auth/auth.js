// module.exports = function isLoggedIn(req, res, next) {
//     req.user ? next() : res.redirect('/user/login');
// }

module.exports = (req, res, next) => {
    if(req.session.isAuth){
        next();
    }else{
        req.session.error="You have to log in first";
        res.redirect('/user/login');
    }
};
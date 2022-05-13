const express = require('express')
const path = require("path")
const sellerController = require(path.resolve("./controllers/sellerController"))
const sellerPageController = require(path.resolve("./controllers/sellerPageController"))
const isAuth = require(path.resolve("./auth/auth"))
const router = express.Router();

// seller login stuff
router
    .route('/login')
    .get(sellerController.login_get)
    .post(sellerController.login_post)
router
    .route('/logout')
    .post(sellerController.logout_post)
router
    .route('/signup')
    .get(sellerController.signup_get)
    .post(sellerController.signup_post)

// seller page stuff
router
    .route('/')
    .get(isAuth, sellerPageController.create_get)
    .post(isAuth, sellerPageController.create_post)
router
    .route('/read')
    .get(isAuth, sellerPageController.read_get)
router
    .route('/find')
    .get(isAuth, sellerPageController.find_get)
    .post(isAuth, sellerPageController.find_post)
router
    .route('/update')
    .get(isAuth, sellerPageController.update_get)
    .post(isAuth, sellerPageController.update_patch)
router
    .route('/delete')
    .get(isAuth, sellerPageController.delete_get)
    .post(isAuth, sellerPageController.delete_post)
module.exports = router
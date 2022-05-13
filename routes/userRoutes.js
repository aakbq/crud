const express = require('express')
const path = require("path")
const userController = require(path.resolve("./controllers/userController"))
const userPageController = require(path.resolve("./controllers/userPageController"))
const isAuth = require(path.resolve("./auth/auth"))
const router = express.Router();

// user login stuff
router
    .route('/login')
    .get(userController.login_get)
    .post(userController.login_post)
router
    .route('/logout')
    .post(userController.logout_post)
router
    .route('/signup')
    .get(userController.signup_get)
    .post(userController.signup_post)

// user page stuff
router
    .route('/profile')
    .get(isAuth, userPageController.profile_get)
router
    .route('/')
    .get(isAuth, userPageController.home_get)
router
    .route('/products')
    .get(isAuth, userPageController.products_get)
    .post(isAuth, userPageController.products_post)
router
    .route('/about')
    .get(isAuth, userPageController.about_get)
module.exports = router

const express = require('express')
const path = require("path")
const managerController = require(path.resolve("./controllers/managerController"))
const managerPageController = require(path.resolve("./controllers/managerPageController"))
const isAuth = require(path.resolve("./auth/auth"))
const router = express.Router();

// manager login stuff
router
    .route('/login')
    .get(managerController.login_get)
    .post(managerController.login_post)
router
    .route('/logout')
    .post(managerController.logout_post)
router
    .route('/signup')
    .get(managerController.signup_get)
    .post(managerController.signup_post)

// manager page stuff
router
    .route('/')
    .get(isAuth, managerPageController.create_get)
    .post(isAuth, managerPageController.create_post)
router
    .route('/read')
    .get(isAuth, managerPageController.read_get)
router
    .route('/find')
    .get(isAuth, managerPageController.find_get)
    .post(isAuth, managerPageController.find_post)
router
    .route('/update')
    .get(isAuth, managerPageController.update_get)
    .post(isAuth, managerPageController.update_patch)
router
    .route('/delete')
    .get(isAuth, managerPageController.delete_get)
    .post(isAuth, managerPageController.delete_post)
module.exports = router
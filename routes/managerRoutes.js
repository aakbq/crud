const express = require('express')
const path = require("path")
const managerController = require(path.resolve("./controllers/managerController"))
const managerPageController = require(path.resolve("./controllers/managerPageController"))
const isManager = require(path.resolve("./auth/managerAuth"))
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
    .get(isManager, managerPageController.create_get)
    .post(isManager, managerPageController.create_post)
router
    .route('/read')
    .get(isManager, managerPageController.read_get)
router
    .route('/find')
    .get(isManager, managerPageController.find_get)
    .post(isManager, managerPageController.find_post)
router
    .route('/update')
    .get(isManager, managerPageController.update_get)
    .patch(isManager, managerPageController.update_patch)
router
    .route('/delete')
    .get(isManager, managerPageController.delete_get)
    .delete(isManager, managerPageController.delete_post)
module.exports = router
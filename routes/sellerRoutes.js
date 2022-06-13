const express = require('express')
const path = require("path")
const sellerController = require(path.resolve("./controllers/sellerController"))
const sellerPageController = require(path.resolve("./controllers/sellerPageController"))
const isSeller = require(path.resolve("./auth/sellerAuth"))
const router = express.Router();

// seller login stuff
router
    .route('/login')
    .get(sellerController.login_get)
    .post(sellerController.login_post)
router
    .route('/logout')
    .post(sellerController.logout_post)

// seller page stuff
router
    .route('/')
    .get(isSeller, sellerPageController.create_get)
    .post(isSeller, sellerPageController.create_post)
router
    .route('/read')
    .get(isSeller, sellerPageController.read_get)
router
    .route('/find')
    .get(isSeller, sellerPageController.find_get)
    .post(isSeller, sellerPageController.find_post)
router
    .route('/update')
    .get(isSeller, sellerPageController.update_get)
    .patch(isSeller, sellerPageController.update_patch)
router
    .route('/delete')
    .get(isSeller, sellerPageController.delete_get)
    .delete(isSeller, sellerPageController.delete_post)
module.exports = router
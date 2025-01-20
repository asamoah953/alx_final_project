const express=require('express');
const adminControllers= require('./../Controllers/adminController')



const router= express.Router()

router.route('/signup')
    .post(adminControllers.adminSignup)

router.route('/login')
    .post(adminControllers.adminLogin)

router.route('/adminhomePage')
    .get(adminControllers.adminHomePage)

router.route('/students')
    .get(adminControllers.getAllStudent)
module.exports = router;

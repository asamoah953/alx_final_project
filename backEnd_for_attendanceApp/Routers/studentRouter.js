const express = require('express')
const studentsController = require('./../Controllers/studentController')


const router=express.Router();


router.route('/signup').post(studentsController.signup)

router.route('/login').post(studentsController.login)

router.route('/studentHomePage').get( studentsController.studentHomePage);
 router.route('/protected-route').get(studentsController.protection)


module.exports = router;

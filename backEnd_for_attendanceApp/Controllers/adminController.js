const express = require('express');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler')
const adminModel=require('./../adminModel/admin')
const jwt = require('jsonwebtoken')
const CustomError = require('./../Utils/CustomError');
const { render } = require('ejs');
const studentModel = require('./../studentModel/student')




exports.adminSignup=asyncErrorHandler(async(req,res,next)=>{
    const admin=await adminModel.create(req.body);

    const token= jwt.sign({id:admin._id},process.env.SECRET_KEY,{expiresIn:process.env.EXPIRYDATE})

    res.status(200).json({
        status:'success',
        token,
        data:{
            "success":true,
        }
    })
})


exports.adminLogin=asyncErrorHandler(async(req,res,next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        const error = new CustomError('both email and password are required');
        next(error)
    }

    const adminUser=await adminModel.findOne({email}).select('+password')

    if(!adminUser || !(await adminUser.comparePasswords(password, adminUser.password))){
        const error=new CustomError('check your credentials and try again');
        next(error)
    };

    res.status(200).json({
        status:'success',
        "success":true,
        
    })
})

exports.adminHomePage=asyncErrorHandler(async(req,res,next)=>{
    const specificUser=await adminModel.findOne(req.body._id).select('-password');

    res.render('adminHomePage',{
        success:true,
        specificUser

    })
})

exports.getAllStudent= asyncErrorHandler(async(req,res,next)=>{
    const allStudent=await studentModel.find();

    res.status(200).json({
        count:allStudent.length,
        data:{
            allStudent
        }
    })
    
})

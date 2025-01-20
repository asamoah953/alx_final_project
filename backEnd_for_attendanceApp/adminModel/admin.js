const mongoose= require('mongoose');
const validator = require('validator');
const bcryptjs=require('bcryptjs')


const adminSchema= new mongoose.Schema({
    firstName:String,
    secondName:String,
    Staff_Id:Number,
    email:{
        type:String,
        unique:[true,'this email already exist'],
        require:[true,'this is a required field'],
        validate:[validator.isEmail, 'please input a valid email']
    },
    password:{
        type:String,
        require:[true,'this field cannot be empty'],

    },
    confirmPassword:{
        type:String,
        require:[true,'this field cannot be empty'],
        validate:{ 
            validator:function(val){
                 return val == this.password;
            
        },
        message:'the passwords do not match'
    },
        select:false
    }


})


adminSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();

     this.password=await bcryptjs.hash(this.password,12);
     this.confirmPassword = undefined;

    next()
})


adminSchema.methods.comparePasswords=async function(pwd, pwdDB){
    return await bcryptjs.compare(pwd, pwdDB)
}


const adminmodel= new mongoose.model('adminmodel',adminSchema)

module.exports = adminmodel;

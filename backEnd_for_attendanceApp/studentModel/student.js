const mongoose=require('mongoose');
const validator=require('validator');
const bcryptjs= require('bcryptjs')

const studentSchema= new mongoose.Schema({
    "firstName":String,
    "secondName":String,
    "contact":String,
    "email":{
        type:String,
        require:[true, 'please this field is required'],
        unique:[true,'this email already exist in the server'],
        validate:[validator.isEmail,'provide a valid email']
    },
    "password":{
        type:String,
        require:[true, "password is a requirement"],
        min:[6, 'password should have a minimum of 6 characters'],
        select:false
    },
    "confirmPassword":{
        type:String,
        require:[true, 'confirm your password'],
        validate:{
        validator: function(val){
          
                return val == this.password
        
        },
        message:"passwords do not match"    
        },
        select:false

    }
})

studentSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    this.password =await bcryptjs.hash(this.password, 12);
    this.confirmPassword = undefined;

    next();

})

studentSchema.methods.passwordValidity=async function(pwd, pwdDB){
    return await bcryptjs.compare(pwd, pwdDB);
}


const StudentModel=mongoose.model('StudentModel',studentSchema);
module.exports =StudentModel;


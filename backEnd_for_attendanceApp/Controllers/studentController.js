const StudentModel=require('./../studentModel/student')
const asyncErrorHandler = require('./../Utils/asyncErrorHandler')
const CustomError = require('./../Utils/CustomError')
const jwt=require('jsonwebtoken');
require("ejs")
const utils = require('util')

const signupToken= id =>{
    return jwt.sign({id}, process.env.SECRET_KEY,{expiresIn:process.env.EXPIRYDATE});
}






exports.signup=asyncErrorHandler(async(req,res,next)=>{
    const Student=await StudentModel.create(req.body);

    const token = signupToken(Student._id)
    

        res.status(200).json({
            status:"success",
            token,
            data:{
                success: true,
                message: "Signup successful!"
            }
        })


   } );

exports.login=asyncErrorHandler(async(req,res,next)=>{
    const {email, password}= req.body;
    if(!email || !password){
        const error=new CustomError('make sure email and password are provided')
        next(error)
    }

    const user=await StudentModel.findOne({email}).select('+password')
    
    if(!user || !(await user.passwordValidity(password,user.password))){
        const error=new CustomError('invalid credentials')
        return next(error)    
    }

    const token=  signupToken(user._id)

    res.status(200).json({
        token,
        "success":true,
        "message":"an error occured retry"
    })

})


exports.studentHomePage=asyncErrorHandler(async(req,res,next)=>{
    
    const userSignedIn=await StudentModel.findOne(req.body._id).select('-password')

    const token=  signupToken(userSignedIn._id)


    res.render('studentHomepage',{
        token,
        userSignedIn
    })


    
})

exports.protection = asyncErrorHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization; // Read Authorization header
    let token;

    // Extract token from the Authorization header
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]; // Extract token after "Bearer "
    }

    console.log('Extracted Token:', token); // Debugging: Check extracted token

    // If no token is provided, respond with an error
    if (!token) {
        return next(new CustomError('Token not provided or expired', 401)); // 401 Unauthorized
    }

    try {
        // Verify the token
        const decodedToken = await utils.promisify(jwt.verify)(token, process.env.SECRET_KEY);

        console.log('Decoded Token:', decodedToken); // Debugging: Check decoded payload

        // Attach decoded data (e.g., user ID) to `req.user`
        req.user = decodedToken;

        next(); // Proceed to the next middleware or route
    } catch (err) {
        console.error('Token Verification Error:', err);
        return next(new CustomError('Invalid or expired token', 401)); // Handle invalid/expired token
    }
});


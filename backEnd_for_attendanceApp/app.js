const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const studentRouter=require('./Routers/studentRouter')
const adminRouter = require('./Routers/adminRouter')
const morgan = require('morgan')
const cors = require('cors')
const path=require('path')



dotenv.config({path: './config.env'})

mongoose.connect(process.env.DATA_BASE_STR,{
    enableUtf8Validation: true
}).then(()=>{
    console.log('DATABASE Connected')
}).catch((error)=>{
    error.message
})

const app = express();

app.set("view engine","ejs")

app.set("views", path.join(__dirname,"views"))

app.use(morgan('dev'))

app.use(express.json())
app.use(cors())


app.use('/user',studentRouter)

app.use('/admin',adminRouter);
app.use('/admin',adminRouter)
app.use('/admin',adminRouter)
app.use('/users',adminRouter)



const PORT= 8000 ||process.env.PORT 
app.listen(PORT,()=>{
    console.log(`the server is running on PORT: ${PORT}`)
})

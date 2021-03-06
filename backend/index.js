
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Scholar = require('./model/Scholar')
const Company = require('./model/Company')
const Admin = require('./model/Admin')
//Import routes
const adminRoute = require('./routes/admin/admin');
const companyRoute = require('./routes/company');
const scholarRoute = require('./routes/scholar');
const userRoute = require('./routes/user');
const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('./model/User');
const {isAdmin, isScholar, isLoggedIn}= require('./middleware/authenticate')


dotenv.config();

//connect to database
require('./db/conn.js')

//Middleware
app.use(
    cors({
        origin: 'http://localhost:3000', // 3000 is where we have set our frontend to run
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.get('/' ,(req, res)=>{
    console.log("request for homepage"+req)
});

//Route middleware
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);
app.use('/api/scholar', scholarRoute);
app.use('/api/company', companyRoute);

app.use('/scholars/:state', async (req, res)=>{
    console.log("scholars route passed !")
    const {state}=req.params
    if(state==='ADMIN'){
        const scholars = await Scholar.find({}, {password:0, token:0, createdAt:0, __v:0})
        if(!scholars){
            return res.status(400).json({success:false, message:"couldnt complete reqest"})
        }const date= new Date()
        console.log(date)
        res.json({success: true, message:"retrieved scholars", scholars}) 
    }else if(state==='COMPANY'){
        const scholars = await Scholar.find({}, {password:0, placement_status : 0, token:0, createdAt:0, __v:0})
        if(!scholars){
            return res.status(400).json({success:false, message:"couldnt complete reqest"})
        }
        const date= new Date()
        console.log(date)
        res.json({success: true, message:"retrieved scholars", scholars}) 
    }
});

app.use('/companies', isLoggedIn, async (req, res)=>{
    console.log("companies route passed !")
    const companies = await Company.find({}, { website:1, username:1, pre_placement_talk:1, coding_test_date:1})
    // const companies = await Company.find({}, {"loginDetails.password":0, token:0, createdAt:0, __v:0, _id:0})
    console.log("companies route passed !"+companies)
    console.log("companies route passed !"+JSON.stringify(companies))
    const date= new Date()
    console.log(date)
    res.json({success: true, message:"retrieved companies", companies})
});


const PORT = process.env.SERVER_PORT || 4001;
 app.listen(PORT, () => console.log(`Server up and running at http://localhost:${PORT}`))

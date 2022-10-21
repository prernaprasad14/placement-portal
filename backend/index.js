
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { JsonWebTokenError } = require('jsonwebtoken');
const Scholar = require('./model/Scholar')
const Company = require('./model/Company')
const Admin = require('./model/Admin')

//route imports
const adminRoute = require('./routes/admin/admin');
const companyRoute = require('./routes/company');
const scholarRoute = require('./routes/scholar');
const userRoute = require('./routes/user');
const User = require('./model/User');
const {isAdmin, isScholar, isLoggedIn, authenticateUser}= require('./middleware/authenticate')
const {urlencoded}= require('body-parser');





dotenv.config();

//connect to database
require('./db/conn.js')

//Middleware
app.use(
    cors({
        origin:'http://localhost:3000',
        credentials: true,
    })
);

//enable when testing on tablet and mobile devices
// var whitelist = ['http://localhost:3000' ,'http://process.env.IP_ADDRESS:3000'] // port 3000 is where the frontend is set to run

// app.use(
//     cors({
//         origin: function (origin, callback) {
//             if (whitelist.indexOf(origin) !== -1) {
//               callback(null, true)
//             } else {
//               callback(new Error('Not allowed by CORS'))
//             }
//         },
//         credentials: true,
//     })
// );

app.use(express.urlencoded({
    limit: '50mb', extended: true, parameterLimit: 1000000
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//Route middleware
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);
app.use('/api/scholar', scholarRoute);
app.use('/api/company', companyRoute); 

app.use('/companies', authenticateUser, async (req, res)=>{
    try{
        if(req.role==='admin' || req.role==='scholar'){
        const companies = await Company.find({}, {website:1, username:1, pre_placement_talk:1, coding_test_date:1})
        const date= new Date()    
        res.status(200).json({success: true, message:"Retrieved companies", companies})
    }else{
            res.status(403).json({success: true, message:"Unauthorized" })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: "Internal Server Error" })
    }
});


const PORT = process.env.SERVER_PORT || 4001;
 app.listen(PORT, () => console.log(`Server up and running at http://localhost:${PORT}`))

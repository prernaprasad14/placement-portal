
const express = require('express');

const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//Import routes
const companyRoute = require('./routes/company');
const scholarRoute = require('./routes/scholar');
const userRoute = require('./routes/user');

dotenv.config();

//connect to database
require('./db/conn.js')
app.use(cookieParser());
//Middleware
app.use(
    cors({
        origin: 'http://localhost:3000', // 3000 is where we have set our frontend to run
        credentials: true,
    })
)
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get('/' ,(req, res)=>{
    res.send("this is homepage");
});
//Route middleware
app.use('/api/user', userRoute);
app.use('/api/scholar', scholarRoute);
app.use('/api/company', companyRoute);



const PORT = process.env.SERVER_PORT || 4001;
 app.listen(PORT, () => console.log(`Server up and running at http://localhost:${PORT}`))

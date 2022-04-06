const mongoose = require('mongoose')
mongoose.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
).then(()=>{
    console.log("connected to database");
}).catch(err=> console.log("Couldn't connect to db, error:",err));
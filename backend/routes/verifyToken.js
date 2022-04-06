const jwt = require('jsonwebtoken');
const User = require('../model/User')
// module.exports = function auth(req, res, next){
//     const token= req.header('auth-token');
//     if(!token) return res.status(401).send("Access Denied ")

//     try{
//         const verified = jwt.verify(token, process.env.TOKEN_SECRET)
//         req.user = verified;
//         next();
//     }
//     catch(err){
//         res.status(400).send(`Invalid token : ${err}`)
//     }

// }

module.exports = async function auth(req, res, next){
        
        const token= req.cookies.jwt;
        if(!token) return res.status(401).json({success: false, message:"Access Denied"})
    
        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified;
            console.log("check 101 :");
            const user =await new User.findOne({_id: verified._id})
            console.log("check 102 :",user);
            next();
        }
        catch(err){
            res.status(400).send(`Invalid token : ${err}`)
        }
}
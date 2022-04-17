const Scholar = require('../model/Scholar')
const Company = require('../model/Company')
const jwt = require('jsonwebtoken')

exports.authenticateScholar = async(req, res, next)=>{
    try{
        console.log("authenticate scholar middleware")
        const token = req.cookies.jwt;
        console.log("token"+token)
        if(!token){
            return res.status(401).json({success: false, message:"Unauthorized: Please login"})
        } 
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log("verifyToken")
        console.log(verifyToken)
        if(!verifyToken) {
            return res.status(403).json({success: false, message:"Forbidden"})
        }
        const user = await Scholar.findOne({_id:verifyToken._id, token});
        if(!user) {throw new Error("User not found")}
        req.token = token;
        req.user = user;
        req.userId = user._id;

        next();
    }catch{
        console.log("scholar authentication error")
        return res.status(401).json({success: false, message: "Unthorised access"})

    }
}
exports.authenticateCompany = async(req, res, next)=>{
    try{
        console.log("authenticate company middleware")
        const token = req.cookies.jwt;
        console.log("token"+token)
        if(!token){
            return res.status(401).json({success: false, message:"Unauthorized: Please login"})
        } 
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log("verifyToken")
        console.log(verifyToken)
        if(!verifyToken) {
            return res.status(403).json({success: false, message:"Forbidden"})
        }
        const user = await Company.findOne({_id:verifyToken._id, token});
        if(!user) {throw new Error("User not found")}
        req.token = token;
        req.user = user;
        req.userId = user._id;

        next();
    }catch{
        console.log("scholar authentication error")
        return res.status(401).json({success: false, message: "Unauthorized access"})

    }
}

exports.isLoggedIn = async (req, res, next)=>{
    const token = req.cookies.jwt
    console.log("req for logged-in")
    if(!token){
        return res.status(401).json({success:false, message:"user not logged in"})
    }
    console.log("token"+token)
    // res.status(200).json({success:true, message:"user already logged in"})
    next();
}
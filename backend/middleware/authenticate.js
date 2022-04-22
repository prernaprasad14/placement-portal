const Scholar = require('../model/Scholar')
const Company = require('../model/Company')
const jwt = require('jsonwebtoken')
const Admin = require('../model/Admin')
const { json } = require('body-parser')

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
        const admin = await Admin.findOne({_id:verifyToken._id, token});
        if(!admin){
            const user = await Scholar.findOne({_id:verifyToken._id, token});
            if(!user){
                throw new Error("User not found")
            }
            req.token = token;
            req.user = user;
            req.userId = user._id;

            next();
        }
    }catch{
        console.log("scholar authentication error")
        return res.status(401).json({success: false, message: "Unauthorized access"})

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
        console.log("Company authentication error")
        return res.status(401).json({success: false, message: "Unauthorized access"})

    }
}

exports.isLoggedIn = async (req, res, next)=>{
    const token = req.cookies.jwt
    console.log("req for logged-in")
    if(!token){
        return res.status(401).json({success:false, message:"user not logged in"})
    }
    const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)
    console.log("token"+token)
    // res.status(200).json({success:true, message:"user already logged in"})
    next();
}

exports.isAdmin=async(req,res,next)=>{
    try{
        console.log("isAdmin middleware")
            const token = req.cookies.jwt
        if(!token)
            res.status(401).json({success:false, message:"Not authorized"})
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)
        if(!verifyToken) {
            return res.status(403).json({success: false, message:"Forbidden"})
        }
        const user = await Company.findOne({_id:verifyToken._id, token});
        if(!user) {throw new Error("User not found")}
        req.token = token;
        req.user = user;
        req.userId = user._id;
    }catch(error){
        console.log("isAdmin error"+error)
    }
}
exports.isScholar=async(req,res,next)=>{
    try{
        console.log("isScholar middleware")
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
        return res.status(401).json({success: false, message: "Unauthorized access"})

    }
}
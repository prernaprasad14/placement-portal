const Scholar = require('../model/Scholar')
const Company = require('../model/Company')
const jwt = require('jsonwebtoken')
const Admin = require('../model/Admin')

exports.authenticateUser = async(req, res, next)=>{
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
            const scholar = await Scholar.findOne({_id:verifyToken._id, token});
            if(!scholar){
                const company = await Company.findOne({_id:verifyToken._id, token});
                if(!company) {throw new Error("company not found")}
                req.token = token;
                req.company = company;
                req.companyId = company._id;
                req.role = 'company'
            }
            else{
                req.token = token;
                req.scholar = scholar;
                req.scholarId = scholar._id;
                req.role = 'scholar'
            }
        }
        else{
                req.token = token;
                req.admin = admin;
                req.adminId = admin._id;
                req.role = 'admin'
        }
        next();
    }catch{
        console.log("Company authentication error")
        return res.status(401).json({success: false, message: "Unauthorized access"})

    }
}
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
    try{
        console.log("authenticate user middleware")
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
        console.log(admin)
        if(!admin){
            const scholar = await Scholar.findOne({_id:verifyToken._id, token});
            console.log(scholar)
            if(!scholar){
                const company = await Company.findOne({_id:verifyToken._id, token});
                console.log(company)
                if(!company) { return res.status(404).json({success:false, message:"not found"})}
                req.token = token;
                req.company = company;
                req.companyId = company._id;
                req.role = 'COMPANY'
            }
            else{
                req.token = token;
                req.scholar = scholar;
                req.scholarId = scholar._id;
                req.role = 'SCHOLAR'
            }
        }
        else{
                req.token = token;
                req.admin = admin;
                req.adminId = admin._id;
                req.role = 'ADMIN'
        }
        next();
    }catch{
        console.log("Company authentication error")
        return res.status(401).json({success: false, message: "Unauthorized access"})

    }
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
        const user = await Admin.findOne({_id:verifyToken._id, token:0});
        if(!user) {throw new Error("User not found")}
        // req.token = token;
        req.user = user;
        req.userId = user._id;
        next();
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
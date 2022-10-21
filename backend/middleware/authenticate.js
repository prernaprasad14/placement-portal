const Scholar = require('../model/Scholar')
const Company = require('../model/Company')
const jwt = require('jsonwebtoken')
const Admin = require('../model/Admin')

exports.authenticateUser = async(req, res, next)=>{
    try{
        console.log("Middleware - authenticateUser")
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({success: false, message:"Unauthorized: Please login", role:"USER"})
        } 
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log("verifyToken")
        if(!verifyToken) {
            return res.status(403).json({success: false, message:"Forbidden"})
        }
        const admin = await Admin.findOne({_id:verifyToken._id, token},{ _id:0,password:0, token:0 });
        if(!admin){
            const scholar = await Scholar.findOne({_id:verifyToken._id, token},{ _id:0,password:0, token:0 });
            if(!scholar){
                const company = await Company.findOne({_id:verifyToken._id, token},{ _id:0,password:0, token:0 });
                if(!company) {throw new Error("company not found")}
                req.token = token;
                req.user = company;
                req.userId = company._id;
                req.role = 'company'
            }
            else{
                req.token = token;
                req.user = scholar;
                req.userId = scholar._id;
                req.role = 'scholar'
            }
        }
        else{
                req.token = token;
                req.user = admin;
                req.userId = admin._id;
                req.role = 'admin'
        }
        next();
    }catch{
        console.log("Authentication error")
        return res.status(401).json({success: false, message: "Unauthorized access"})

    }
}

exports.authenticateScholar = async(req, res, next)=>{
    try{
        console.log("Middleware - authenticateScholar")
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({success: false, message:"Unauthorized: Please login", role:"USER"})
        } 
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log("verifyToken",verifyToken)

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
        console.log("Middleware - authenticateCompany")
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({success: false, message:"Unauthorized: Please login", role:"USER"})
        } 
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log("verifyToken")
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
        console.log("Middleware - isLoggedIn")
        const token = req.cookies.jwt;
        if(!token){
            req.role= "USER"
        }else{
            const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)
            console.log("verifyToken",verifyToken)

            if(!verifyToken) {
                return res.status(403).json({success: false, message:"Forbidden"})
            }
            const admin = await Admin.findOne({_id:verifyToken._id, token});
            if(!admin){
                console.log("Not admin")
                const scholar = await Scholar.findOne({_id:verifyToken._id, token});
                if(!scholar){
                    console.log("Not scholar")
                    const company = await Company.findOne({_id:verifyToken._id, token});
                    if(!company){ 
                        return res.status(404).json({success:false, message:"not found"})
                    }
                    req.token = token;
                    req.user = company;
                    req.userId = company._id;
                    req.role = 'company'
                }
                else{
                    req.token = token;
                    req.user = scholar;
                    req.userId = scholar._id;
                    req.role = 'scholar'
                }
            }
            else{
                    req.token = token;
                    req.user = admin;
                    req.userId = admin._id;
                    req.role = 'admin'
            }
        }
        
        next();
    }catch{
        console.log("Middleware - isLoggedIn authentication error")
        return res.status(401).json({success: false, message: "Unauthorized access"})

    }
}

exports.isAdmin=async(req,res,next)=>{
    try{
        console.log("Middleware - isAdmin")

        const token = req.cookies.jwt
        if(!token)
        return res.status(401).json({success: false, message:"Unauthorized: Please login", role:"USER"})
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
        console.log("isAdmin error",error)
    }
}

exports.isScholar=async(req,res,next)=>{
    try{
        console.log("Middleware - isScholar")
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({success: false, message:"Unauthorized: Please login", role:"USER"})
        } 
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log("verifyToken",verifyToken)

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
        console.log("Error middleware - isScholar")
        return res.status(401).json({success: false, message: "Unauthorized access"})

    }
}
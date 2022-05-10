const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {isAdmin}= require('../../middleware/authenticate')
const Admin = require('../../model/Admin');
var nodemailer = require('nodemailer');
const Home = require('../../model/Home');
const Scholar = require('../../model/Scholar');
const Company = require('../../model/Company');
const Credentials = require('../../model/Credentials');
const {validateScholarCreate, validateCompanyCreate, validate}=require('../../userinputvalidation');
const { generateCreateUserMail} = require('../../mail');
const{ join, sep } =require('path');

// router.post('/login', isAdmin, async (req, res)=>{
//     const user = await Admin.findOne({"loginDetails.email":req.body.loginDetails.email})
//     console.log("check1")
//     if(!user) return res.status(400).json({success:false, message:"Invalid credentails"});
//     console.log("check2")
    
//     const validPass = await bcrypt.compare(req.body.loginDetails.password, user.loginDetails.password)
//     console.log("check3")

//     if(!validPass) return res.status(400).json({success:false, message:"Invalid credentails"});
//     console.log("check4")

//     const token =await user.generateToken()
//     console.log(`login route    :: token:: ${token}`)
//     const date = new Date();
//     res.cookie("jwt", token, {
        
//         expires:new Date( date + 30*24*60*60*1000),
//         maxAge:  30*24*60*60*1000,
//         // secure:true,
//         httpOnly: true
//     });
//     console.log(user._id)

//     return res.status(200).json({success: true, message:"Logged in", user, token})
   
    
// });

// router.get('/profile',isAdmin, async(req, res)=>{
//     const pc = Home.findOne({pc:1})
//     return res.status(200).json({success: true, message: "Retrieved admin profile" , admin: req.user, pc: pc})
// })
router.get('/profile', async(req, res)=>{
    const admin = await Admin.findOne({},{password:0, token:0})
    console.log(admin)
    if(!admin)
        return res.status(404).json({success:false, message: "Admin profile not found"})
    return res.status(200).json({success: true, message: "Retrieved admin profile" , admin: admin})
});

router.post('/create-user/scholar', validateScholarCreate, validate, async(req,res)=>{
    try{ 
        console.log("1 here")
        console.log("2 req.body.email  "+req.body.email)
        const scholarExists= await Scholar.findOne({"email":req.body.email  })
        console.log("3 scholarExists  "+scholarExists)
        if(scholarExists) return res.json({success: false, message:"Already registered"})
        console.log("4 here")
        const emailExists = await Credentials.findOne({"email":req.body.email})
        console.log(__dirname+'../img')
        console.log("5 emailExists"+ emailExists)
        if(!emailExists) 
        {const user = new Credentials({email:req.body.email, username: req.body.username})
        console.log(req.body)
        await user.generateToken();
        await user.save()
        
        var transporter = nodemailer.createTransport({
            host : "smtp.mailtrap.io",
            port : 2525,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD
            }
        });
        console.log('6 created');
        const date = new Date()
        console.log('7 here');
        
        transporter.sendMail({
            from: 'placementcellducs@cs.du.ac.in',
            to: `${user.email}`,
            subject: `Registration for DUCS Placement Cell for session ${date.getFullYear()}`,
            attachments: [{
                filename: 'logo.png',
                path: join(__dirname, sep, '..','img','logo.png'),
                cid: 'logo'
            }],
            html: generateCreateUserMail(`http://localhost:3000/scholar-registration?email=${user.email}`, user.username ),
            // html: generateCreateUserMail(`http://localhost:3000/scholar-registration?email=${user.email}&user=${user.username}&token=${user.token}`, user.username ),
     
        });
    }
        console.log('8 email sent');
        return res.json({success:200, message:`Email has been sent to ${email}`})

    }catch(error){
        console.log("create user error part:: An error has occurred : "+error)
    }
    
}); 


router.post('/create-user/company', validateCompanyCreate, validate, async(req,res)=>{

    try{ 
        console.log("1 here")
        const companyExists= await Company.findOne({email:req.body.email})
        if(companyExists) return res.json({success: false, message:"Already registered"})
        console.log("2 here")
        const emailExists= await Credentials.findOne({email:req.body.email})
        if(!emailExists){
            const user = new Credentials({email:req.body.email, username: req.body.username})
                await user.generateToken();
                await user.save()
            
            var transporter = nodemailer.createTransport({
                host : "smtp.mailtrap.io",
                port : 2525,
                auth: {
                    user: process.env.MAILTRAP_USERNAME,
                    pass: process.env.MAILTRAP_PASSWORD
                }
            });
            console.log('company created');
            const hash = await bcrypt.hash(req.body.username, 8)
            const date = new Date()
            console.log(`hash username ${hash}`); 
            transporter.sendMail({
                from: 'placementcellducs@cs.du.ac.in',
                to: `${user.email}`,
                subject: `Registration for DUCS Placements session ${date.getFullYear()}`,
                attachments: [{
                    filename: 'logo.png',
                    path: join(__dirname, sep, '..','img','logo.png'),
                    cid: 'logo'
                }],
                html: generateCreateUserMail(`http://localhost:3000/company-registration?email=${user.email}`, user.username ),
        
            });
            return res.status(200).json({success: true, message:`Email has been sent to ${user.email}`})
        }
    }catch(error){
        console.log("create user error part:: An error has occurred : "+error)
    }
    
}); 

module.exports = router;
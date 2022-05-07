const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {isAdmin}= require('../../middleware/authenticate')
const Admin = require('../../model/Admin');
const Home = require('../../model/Home');

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

module.exports = router;
// const router = require('express').Router();
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const {validateScholar, validate}= require('../../middleware/authenticate')
// const Admin = require('../../model/Admin');

// router.post('/login', validateScholar, validate, async (req, res)=>{
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

// module.exports = router;  
const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
var nodemailer = require('nodemailer');
const Scholar = require('../model/Scholar')
const Company = require('../model/Company')
const ResetPassword = require('../model/resetPasswordSchema');
const {isResetTokenValid} = require('../userinputvalidation');
const { createRandomBytes  } = require('../helper');
const { generatePasswordResetMail, generateSuccessPasswordResetMail } = require('../mail');
const { isLoggedIn } = require('../middleware/authenticate');

router.get('/logout', async(req,res)=>{
    res.clearCookie('jwt',{ path :'/'})
    res.status(200).json({success:true})

})

router.post('/forgot-password' , async (req, res)=>{
    console.log("Passed forgotPassword")
    const email = req.body.email
    console.log("email"+email)
    if(!email) return res.status(400).json({success:false, message:"Please enter the email"});
    console.log(`email is not empty`)

    console.log(`1 Test console`)
    var transporter = nodemailer.createTransport({
        host : "smtp.mailtrap.io",
        port : 2525,
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD
        }
    });
    const user = await Company.findOne({"loginDetails.email":email})
    if(! user) {
        const scholar = await Scholar.findOne({"loginDetails.email":email})
        if(!scholar)
            return res.status(400).json({message: "Please make sure the email is valid"}) 
        else{
            console.log(`Scholar Test console${scholar}`)
            const token = await ResetPassword.findOne({owner:scholar._id})
            console.log("token token ")
            if(token) return res.status(400).json({success:false, message: "You can request for new token after 1hr"})
            console.log(`token doesnt exist, creating new reset token`)

            console.log(`An email will be sent to ${email} to reset your password`)
            newToken = await createRandomBytes()
            console.log(`new reset token ${newToken}`)
            const resetTokenHashed = await bcrypt.hash(newToken, 8) 
            const resetToken = new ResetPassword({owner: scholar._id , email, token:resetTokenHashed })

            await resetToken.save()

            console.log('created');
            
            transporter.sendMail({
                from: 'placementcellducs@cs.du.ac.in',
                to: `${scholar.loginDetails.email}`,
                subject: "Reset your password",
                attachments: [{
                    filename: 'logo.png',
                    path: __dirname+'/img/logo.png',
                    cid: 'logo'
                }],
                html: generatePasswordResetMail(`http://localhost:3000/reset-password?email=${email}&token=${resetTokenHashed}`, scholar.loginDetails.username),
            });

            return res.status(200).json({success:true, message:"Password link sent has been sent to your account"})
        }
    }
    else{
        console.log(`Company Test console${user}`)
        const token = await ResetPassword.findOne({owner:user._id})
        console.log("token token ")
        if(token) return res.status(400).json({success:false, message: "You can request for new token after 1hr"})
        console.log(`token doesnt exist, creating new reset token`)

        console.log(`An email will be sent to ${email} to reset your password`)
        newToken = await createRandomBytes()
        console.log(`new reset token ${newToken}`)
        const resetTokenHashed = await bcrypt.hash(newToken, 8) 
        const resetToken = new ResetPassword({owner: user._id , email, token:resetTokenHashed })

        await resetToken.save()

        console.log('created');
        
        transporter.sendMail({
            from: 'placementcellducs@cs.du.ac.in',
            to: `${user.loginDetails.email}`,
            subject: "Reset your password",
            attachments: [{
                filename: 'logo.png',
                path: __dirname+'/img/logo.png',
                cid: 'logo'
            }],
            html: generatePasswordResetMail(`http://localhost:3000/reset-password?email=${email}&token=${resetTokenHashed}`, user.loginDetails.username),
        });

    return res.status(200).json({success:true, message:"Password link sent has been sent to your account"})
    
    }
    
    
});

router.post('/reset-password', async(req, res)=>{

    console.log("req.body.password"+req.body.password)
    console.log("req.body.confirmPassword"+req.body.confirmPassword)
    if(req.body.password !== req.body.confirmPassword)  return res.status(401).send("Passwords do not match")

    var transporter = nodemailer.createTransport({
        host : "smtp.mailtrap.io",
        port : 2525,
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD
        }
    });
    const user = await Company.findOne({"loginDetails.email":req.query.email})
    if(!user) {
        const scholar = await Scholar.findOne({"loginDetails.email":req.query.email})
        if(!scholar){
            return res.json({succes:false , message: "User not found" })
        }
        else{
            console.log("::::::::user:::::::"+user)

            const tokenDetails = await ResetPassword.findOne({owner:scholar._id})
            console.log(":::::::token:::::::::"+tokenDetails)
            if(!tokenDetails) return res.status(400).send("Invalid request")
            
            if(tokenDetails.token !== req.query.token) return res.send("Invalid token")
        
            console.log("valid token")
            const hashedPassword = await bcrypt.hash(req.body.password, 8)

            await Scholar.findOneAndUpdate({"loginDetails.email":req.query.email}, {"loginDetails.password" : hashedPassword})
            await ResetPassword.findByIdAndDelete(tokenDetails._id);
            
            transporter.sendMail({
                from: 'placementcellducs@cs.du.ac.in',
                to: `${scholar.loginDetails.email}`,
                subject: "Password reset successful",
                attachments: [{
                    filename: 'logo.png',
                    path: __dirname+'/img/logo.png',
                    cid: 'logo'
                }],
                html: generateSuccessPasswordResetMail(scholar.loginDetails.username),  
            });
            console.log(`password has been reset`)
            return res.status(200).json({success: true, message:"Password has been reset successfully"})
        }
    }else{
        console.log("::::::::user:::::::"+user)
        const tokenDetails = await ResetPassword.findOne({owner:user._id})
        console.log(":::::::token:::::::::"+tokenDetails)
        if(!tokenDetails) return res.status(400).send("Invalid request")
        
        if(tokenDetails.token !== req.query.token) return res.send("Invalid token")
        
        console.log("valid token")
        const hashedPassword = await bcrypt.hash(req.body.password, 8)

        await Scholar.findOneAndUpdate({"loginDetails.email":req.query.email}, {"loginDetails.password" : hashedPassword})
        await ResetPassword.findByIdAndDelete(tokenDetails._id);
        console.log("user.loginDetails.username")
        console.log(user.loginDetails.username)
        transporter.sendMail({
            from: 'placementcellducs@cs.du.ac.in',
            to: `${user.loginDetails.email}`,
            subject: "Password reset successful",
            attachments: [{
                filename: 'logo.png',
                path: __dirname+'/img/logo.png',
                cid: 'logo'
            }],
            html: generateSuccessPasswordResetMail(user.loginDetails.username),  
        });
        
        console.log(`password has been reset`)
        return res.status(200).json({success: true, message:"Password has been reset successfully"})
 
    }
        
});

router.get('/verify-token', isResetTokenValid, async(req,res)=>{
    console.log("verify-token")
    return res.json({success:true})
}); 

router.get('/logged-in', isLoggedIn, async(req, res)=>{
    console.log("req for logged-in")
    return res.status(200).json({success:true, message:"user logged in"})
})
module.exports = router;  
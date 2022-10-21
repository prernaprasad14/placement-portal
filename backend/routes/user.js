const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Scholar = require('../model/Scholar')
const Company = require('../model/Company')
const Home = require('../model/Home')
const ResetPassword = require('../model/resetPasswordSchema');
const {isResetTokenValid} = require('../userinputvalidation');
const {createRandomBytes} = require('../helper');
const {authenticateUser} = require('../middleware/authenticate')
const {generatePasswordResetMail, generateSuccessPasswordResetMail, mailTransport} = require('../mail');
const {isLoggedIn} = require('../middleware/authenticate');
const Admin = require('../model/Admin');
const Credentials = require('../model/Credentials');

router.get('/home', isLoggedIn, async(req, res)=>{
   try{  
        console.log("GET user/home")
        const homeData = await Home.findOne({})
        if(!homeData)
        {console.log("try-block",error)
            return res.status(404).json({success:false, message:"Failed to complete the request, pls try again"})
        }return res.status(200).json({success:true, homeData, role:req.role})
    }catch(error){
        console.log("Error occurred in GET user/home", error)
        return res.status(500).json({success: false, message:"Internal Server Error"})  
    }
});

router.get('/pc-info', isLoggedIn, async(req, res)=>{
   try{  
        console.log("GET user/pc-info")

        if(req.user==='admin'){

            const pcData = await Admin.findOne({},{pc:1,_id:0})
            
            if(!pcData){
                return res.status(404).json({success:false, message: "Coordinators info not found" ,role:req.role})
            }
            console.log(req.role)
            return res.status(200).json({success: true, message: "Retrieved Coordinators info" , pcData, role:req.role})
        }else{
            const pcData = await Admin.findOne({},{'pc.course':1,'pc.avatar':1,'pc.pcname':1,_id:0})
            
            if(!pcData){
                return res.status(404).json({success:false, message: "Coordinators info not found" ,role:req.role})
            }
            console.log(req.role)
            return res.status(200).json({success: true, message: "Retrieved Coordinators info" , pcData, role:req.role})
        }
    }catch(error){
            console.log("Error occurred in GET user/pc", error)
            return res.status(500).json({success: false, message:"Internal Server Error"})  
    }
});

router.get('/username', authenticateUser, async(req, res)=>{
   try{
        console.log("GET user/username")
        // console.log(req.user.username , req.role)
        let currentDate =  new Date()

        const week_from_now = (currentDate.getDate()+7)

        var weekly_timeline
        if(req.role==='admin'|| req.role==='scholar'){
           weekly_timeline = await Company.find({},{cname:1, pre_placement_talk:1,_id:0})
        }
        const userData={
            lastLogged: req.user.lastLogged,
            username: req.user.username
        }
      
        res.status(200).json({success:true, message:"Retrieved username",  userData, weekly_timeline, role:req.role})
    }catch(error){
        console.log("Error occurred in GET user/username", error)
        return res.status(500).json({success: false, message:"Internal Server Error"})  
    }
});


//brochure routes
router.get('/all-brochures', isLoggedIn, async(req, res)=>{
    try{
        console.log("GET user/all-brochures")
         gfs.files.find().toArray((err, files)=>{
             console.log("1")
             console.log(files)
             console.log("2")
             if(!files || files.length===0){
                 return res.status(404).json({success:false, err:'No files found yet!', role:req.role})
             }
         
             return res.status(200).json({success:true,files, role:req.role})
         })
    }catch(error){
        console.log("Error occurred in GET user/all-brochures", error)
        return res.status(500).json({success: false, message:"Internal Server Error"})
        
    }
 });
 
router.get('/verify-registration-token',async(req, res)=>{
    
    try{
        console.log("GET user/verify-registration-token")
        const {email, token, username} =  req.query
        const emailExists= await Credentials.findOne({email})
        if(!emailExists){
            return res.status(404).json({success:false, message:'Invalid email'})
        }

        if(emailExists.token !== token) {
            return res.status(404).json({success:false, message:'Invalid token'})
        }
        if(emailExists.username !== username) {
            return res.status(404).json({success:false, message:'Invalid token'})
        }

        return res.status(200).json({success:true, message:'Valid token'})
        
    }catch(error){
        console.log("Error occurred in GET user/verify-registration-token", error)
        return res.status(500).json({success: false, message:"Internal Server Error"})
        
    }
});

router.post('/forgot-password' , async (req, res)=>{
    try{
        console.log("POST user/forgot-password")
        const email = req.body.email
        console.log("email"+email)
        if(!email) return res.status(400).json({success:false, message:"Please enter the email"});
        console.log(`email is not empty`)
        var resetToken;
        var resetTokenHashed;

        var user = await Admin.findOne({email})
        if(!user){
            user = await Company.findOne({email})
            if(!user) {
                user = await Scholar.findOne({email})
                if(!user){
                    return res.status(400).json({message: "Please make sure the email is valid"}) 
                }
                else{
                    console.log(`Scholar Test console${user}`)
                    const token = await ResetPassword.findOne({owner:user._id})
                    console.log("token token ")
                    if(token) return res.status(400).json({success:false, message: "You can request for new token after 1hr"})
                    console.log(`token doesnt exist, creating new reset token`)

                    console.log(`An email will be sent to ${email} to reset your password`)
                    newToken = await createRandomBytes()
                    console.log(`new reset token ${newToken}`)
                    resetTokenHashed = await bcrypt.hash(newToken, 8) 
                    resetToken = new ResetPassword({owner: user._id , email, token:resetTokenHashed })
                    await resetToken.save()
                    console.log('token created');

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
                resetTokenHashed = await bcrypt.hash(newToken, 8) 
                resetToken = new ResetPassword({owner: user._id , email, token:resetTokenHashed })
                await resetToken.save();

            }
        }
        else{
            console.log(`Admin Test console${user}`)
            const token = await ResetPassword.findOne({owner:user._id})
            console.log("token token ")
            if(token) return res.status(400).json({success:false, message: "You can request for new token after 1hr"})
            console.log(`token doesnt exist, creating new reset token`)

            console.log(`An email will be sent to ${email} to reset your password`)
            newToken = await createRandomBytes()
            console.log(`new reset token ${newToken}`)
            resetTokenHashed = await bcrypt.hash(newToken, 8) 
            resetToken = new ResetPassword({owner: user._id , email, token:resetTokenHashed })

            await resetToken.save();
        }
    
        if(user!=null){
            mailTransport().sendMail({
                from: process.env.ADMIN_EMAIL,
                to: `${user.email}`,
                subject: "Reset your password",
                attachments: [{
                    filename: 'logo.png',
                    path: __dirname+'/img/logo.png',
                    cid: 'logo'
                }],
                html: generatePasswordResetMail(`http://localhost:3000/reset-password?email=${email}&token=${resetTokenHashed}`, user.username),
            });

            return res.status(200).json({success:true, message:"Password link sent has been sent to your account"})
        }
    }catch(error){
        console.log("Error occurred in POST user/forgot-password")
        return res.status(500).json({success: false, message:"Internal Server Error"})
        
    }
});

router.post('/reset-password', async(req, res)=>{

    try{
        console.log("POST user/reset-password")
        if(req.body.password !== req.body.confirmPassword)  return res.status(401).send("Passwords do not match")
        var user = await Admin.findOne({"email":req.query.email})
        if(!user){
            var user = await Company.findOne({"email":req.query.email})
            if(!user) {
            user = await Scholar.findOne({"email":req.query.email})
                if(!user){
                    return res.json({succes:false , message: "User not found" })
                }
                else{


                    const tokenDetails = await ResetPassword.findOne({owner:user._id})
                    if(!tokenDetails) return res.status(400).send("Invalid request")
                    
                    if(tokenDetails.token !== req.query.token) return res.send("Invalid token")
                
                    console.log("valid token")
                    const hashedPassword = await bcrypt.hash(req.body.password, 8)

                    await Scholar.findOneAndUpdate({"email":req.query.email}, {"password" : hashedPassword})
                    await ResetPassword.findByIdAndDelete(tokenDetails._id);
                    
                    mailTransport().sendMail({
                        from: process.env.ADMIN_EMAIL,
                        to: `${user.email}`,
                        subject: "Password reset successful",
                        attachments: [{
                            filename: 'logo.png',
                            path: __dirname+'/img/logo.png',
                            cid: 'logo'
                        }],
                        html: generateSuccessPasswordResetMail(user.username),  
                    });
                    console.log(`Password has been reset`)
                    return res.status(200).json({success: true, message:"Password has been reset successfully"})
                }
            }else{

                const tokenDetails = await ResetPassword.findOne({owner:user._id})
                if(!tokenDetails) return res.status(400).send("Invalid request")
                
                if(tokenDetails.token !== req.query.token) return res.send("Invalid token")
                
                console.log("valid token")
                const hashedPassword = await bcrypt.hash(req.body.password, 8)

                await Company.findOneAndUpdate({"email":req.query.email}, {"password" : hashedPassword})
                await ResetPassword.findByIdAndDelete(tokenDetails._id);
                
        
            }
        }else{
                const tokenDetails = await ResetPassword.findOne({owner:user._id})
                if(!tokenDetails) return res.status(400).send("Invalid request")
                
                if(tokenDetails.token !== req.query.token) return res.send("Invalid token")
                
                console.log("valid token")
                const hashedPassword = await bcrypt.hash(req.body.password, 8)

                await Admin.findOneAndUpdate({"email":req.query.email}, {"password" : hashedPassword})
                await ResetPassword.findByIdAndDelete(tokenDetails._id);
        }
        if(user!==null){
            console.log("user.username")
            console.log(user.username)
            mailTransport().sendMail({
                from: process.env.ADMIN_EMAIL,
                to: `${user.email}`,
                subject: "Password reset successful",
                attachments: [{
                    filename: 'logo.png',
                    path: __dirname+'/img/logo.png',
                    cid: 'logo'
                }],
                html: generateSuccessPasswordResetMail(user.username),  
            });
            
            console.log(`password has been reset`)
            return res.status(200).json({success: true, message:"Password has been reset successfully"})
        }
    }catch(error){
        console.log("Error occurred in POST user/reset-password", error)
        return res.status(500).json({success: false, message:"Internal Server Error"})
        
    }
});

router.get('/verify-token', isResetTokenValid, async(req,res)=>{
    try{
        console.log("verify-token")
        return res.status(200).json({success:true})
    }catch(error){
        console.log("Error occurred in GET user/verify-token", error)
        return res.status(500).json({success: false, message:"Internal Server Error"})  
    }
}); 

router.get('/logout', isLoggedIn, async(req,res)=>{
   try{
        console.log("GET user/logout")
        if(req.role!=='USER'){
            console.log("saving lastlogged")

            let currentDate =  new Date()
            req.user.lastLogged = currentDate
            console.log( req.user.lastLogged)
            await req.user.save()
        }
        console.log("req.role", req.role)
        res.clearCookie('jwt',{ path :'/'})
        console.log("end Request for logout")
        return res.status(200).json({success:true, message:"Logged Out", role:"USER"})
    }catch(error){
        console.log("Error occurred in POST GET user/logout", error)
        return res.status(500).json({success: false, message:"Internal Server Error"})
        
    }
});

router.get('/logged-in', authenticateUser, async(req, res)=>{
    try{
        console.log("GET user/logged-in")
        console.log(req.role)
        return res.status(200).json({success:true, message:"User logged in", role: req.role})
    }catch(error){
        console.log("Error occurred in GET user/logged-in", error)
        return res.status(500).json({success: false, message:"Internal Server Error"})  
    }
});

module.exports = router;  
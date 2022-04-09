const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
var nodemailer = require('nodemailer');
const Credentials = require('../model/Credentials');
const Company = require('../model/Company');
const ResetPassword = require('../model/resetPasswordSchema');
const jwt = require('jsonwebtoken');
const {validateCompanyRegistration, validateCompanyCreate, validateLogin, validate, isResetTokenValid} = require('../userinputvalidation');
const cookieParser = require('cookie-parser');
const { createRandomBytes  } = require('../helper');
const { generateCreateUserMail, generatePasswordResetMail , generateSuccessPasswordResetMail } = require('../mail');

router.post('/create-user', validateCompanyCreate, async(req,res)=>{

    try{ 
        console.log("1 here")
        const companyExists= await Company.findOne({"loginDetails.email":req.body.email})
        if(companyExists) return res.json({success: false, message:"Already registered"})
        console.log("2 here")
        const emailExists= await Credentials.findOne({"loginDetails.email":req.body.email})
        if(!emailExists){
            const user = new Credentials({email:req.body.email, username: req.body.username})
            await user.generateToken();
            await user.save()
        }
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
                path: __dirname+'/img/logo.png',
                cid: 'logo'
            }],
            html: generateCreateUserMail(`http://localhost:3000/company-registration?email=${user.email}&user=${hash}&token=${user.token}`, user.username ),
     
        });
    
        return res.status(200).json({success: true, message:'Email has been sent '})

    }catch(error){
        console.log("create user error part:: An error has occurred : "+error)
    }
    
}); 


router.post('/register', validateCompanyRegistration, validate , async (req, res)=>{
    try{
        console.log("hello")
        
        const user = await Company.findOne({"loginDetails.email":req.body.loginDetails.email})
        if(user) return res.status(400).json({success:false, message:"You already have an account"}).
        console.log(req.body.loginDetails.password )
        console.log(req.body.loginDetails.username)
        console.log(req.body.loginDetails.confirmPassword)
        if(req.body.loginDetails.password !== req.body.loginDetails.confirmPassword)  return res.status(401).json({success:false, message:"passwords do not match"})

      
        console.log("1 here")
        
        const {username, email } = req.body.loginDetails
        console.log("2 here "+username+" "+ email)
        
        const {cname, phone, website} = req.body
        console.log("3 reached here "+cname+" "+ phone+" "+ website)
        
        const {head_name,head_email, head_mobile}= req.body.contactDetails.head_hr
        console.log("4 reached here "+head_name+" "+head_email+" "+ head_mobile)
        
        const {second_name,second_email, second_mobile}= req.body.contactDetails.second_contact
        console.log("5 reached here "+second_name+" "+second_email+" "+second_mobile)
        
        const {job_profile, designation, place_of_posting, job_desc, recruitment_type}= req.body.jobDetails
        console.log("6 reached here "+job_profile+" "+designation+" "+ place_of_posting+" "+ job_desc+" "+ recruitment_type)
        
        const {annual_package, breakage_ctc}= req.body.jobDetails.salary_details
        console.log("7 reached here "+annual_package+" "+breakage_ctc)
        
        const {courses_allowed, aptitude_test, coding_test, interview, hr_round, any_other_rounds}= req.body.selectionDetails
        console.log("8 reached here "+courses_allowed+" "+ aptitude_test+" "+ coding_test+" "+ interview+" "+ hr_round+" "+ any_other_rounds)
        
        const {pre_placement_talk, coding_test_date, interview_date, notes}= req.body.placement_timeline
        console.log("9 reached here "+pre_placement_talk+" "+coding_test_date+" "+interview_date)
        
        const password = await bcrypt.hash(req.body.loginDetails.password, 8)
   
        const newUser = new Company({
            "loginDetails":{
                email,
                password,
                username
              },
               cname,
               phone,
               website,
               "contactDetails":{
                 "head_hr":{
                  head_name,
                  head_email,
                  head_mobile
                 },
                 "second_contact":{
                   second_name,
                   second_email,
                   second_mobile
                 }
               },
               "jobDetails":{
                 job_profile,
                 designation,
                 place_of_posting,
                 job_desc,
                 recruitment_type,
                 "salary_details":{
                     annual_package,
                     breakage_ctc
                 }
                },    
            "selectionDetails":{
                 courses_allowed,  
                 aptitude_test,
                 coding_test,
                 interview,
                 hr_round,
                 any_other_rounds
             },
             "placement_timeline":{
                 pre_placement_talk,
                 coding_test_date,
                 interview_date,
                 notes
              }
            } 
        );
            console.log("newUser:: "+newUser)
            const token = await newUser.generateToken();
            res.cookie("jwt", token, {
                expires:new Date(Date.now()+3000),
                // secure:true,
                //httpOnly: true
            });
            await newUser.save()
            console.log(`Registered Company ${newUser}`)  
            return res.status(201).json({success:true, message: `${newUser.username} registered successfully`, newUser })
        }catch{err => console.log(err);}
   
});

router.post('/login',  async (req, res)=>{
   
    const user = await Company.findOne({"loginDetails.email":req.body.loginDetails.email})
   
    if(!user) return res.status(400).send("Invalid credentials")
   
    const validPass = await bcrypt.compare(req.body.loginDetails.password, user.loginDetails.password)
   
    if(!validPass) return res.status(400).send("Invalid credentials")
  
    const token =await user.generateToken()
 
    res.cookie("jwt", token, {
        expires:new Date(Date.now()+3000),
        // secure:true,
        httpOnly: true
    });
    res.status(200).json({success: true, message:"Logged in", user, token})
    
    
});
router.get('/verify-email', async(req, res)=>{
    const email = req.body.email
    console.log("0 req.body"+JSON.stringify(req.body))
    console.log("1 email"+ email)
    const exists = await Company.findOne({email})
    console.log("2 exists"+ exists)
    if(exists) return res.status(400).json({success: false, message:"already registered"})
    return res.status(200).json({success: true, message:"Notregistered"})
})

router.get('/verify-token', isResetTokenValid, async(req,res)=>{
    console.log("verify-token")
    res.json({success:true})
}); 





module.exports = router;  
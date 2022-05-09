const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
var nodemailer = require('nodemailer');
const Credentials = require('../model/Credentials');
const Company = require('../model/Company');
const jwt = require('jsonwebtoken');
const {validateCompanyRegistration,  validateLogin, validate} = require('../userinputvalidation');
const cookieParser = require('cookie-parser');
const { generateCreateUserMail } = require('../mail');
const { authenticateCompany ,authenticateUser} = require('../middleware/authenticate');

router.post('/register', validateCompanyRegistration, validate , async (req, res)=>{
    try{
        console.log("hello")
        
        const user = await Company.findOne({email:req.body.email})
        if(user) return res.status(400).json({success:false, message:"You already have an account"}).
        console.log(req.body.password )
        console.log(req.body.username)
        console.log(req.body.confirmPassword)
        if(req.body.password !== req.body.confirmPassword)  return res.status(401).json({success:false, message:"passwords do not match"})

      
        console.log("1 here")
        
        const {username, email } = req.body
        console.log("2 here "+username+" "+ email)
        
        const {cname, phone, website} = req.body
        console.log("3 reached here "+cname+" "+ phone+" "+ website)
        
        const {head_name,head_email, head_mobile}= req.body
        console.log("4 reached here "+head_name+" "+head_email+" "+ head_mobile)
        
        const {second_name,second_email, second_mobile}= req.body
        console.log("5 reached here "+second_name+" "+second_email+" "+second_mobile)
        
        const {job_profile, designation, place_of_posting, job_desc, recruitment_type}= req.body
        console.log("6 reached here "+job_profile+" "+designation+" "+ place_of_posting+" "+ job_desc+" "+ recruitment_type)
        
        const {annual_package, breakage_ctc}= req.body
        console.log("7 reached here "+annual_package+" "+breakage_ctc)
        
        const {courses_allowed, aptitude_test, coding_test, interview, hr_round, any_other_rounds}= req.body
        console.log("8 reached here "+courses_allowed+" "+ aptitude_test+" "+ coding_test+" "+ interview+" "+ hr_round+" "+ any_other_rounds)
        
        const {pre_placement_talk, coding_test_date, interview_date, notes}= req.body
        console.log("9 reached here "+pre_placement_talk+" "+coding_test_date+" "+interview_date)
        
        const password = await bcrypt.hash(req.body.password, 8)
   
        const newUser = new Company({
            // "loginDetails":{
                email,
                password,
                username,
            //   },
               cname,
               phone,
               website,
            //    "contactDetails":{
            //      "head_hr":{
                  head_name,
                  head_email,
                  head_mobile,
                // 
                //  "second_contact":{
                   second_name,
                   second_email,
                   second_mobile,
            //      }
            //    },
            //    "jobDetails":{
                 job_profile,
                 designation,
                 place_of_posting,
                 job_desc,
                 recruitment_type,
                //  "salary_details":{
                     annual_package,
                     breakage_ctc,
                //  }
                // },    
            // "selectionDetails":{
                 courses_allowed,  
                 aptitude_test,
                 coding_test,
                 interview,
                 hr_round,
                 any_other_rounds,
            //  },
            //  "placement_timeline":{
                 pre_placement_talk,
                 coding_test_date,
                 interview_date,
                 notes
            //   }
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

router.post('/login', validateLogin, validate,  async (req, res)=>{
   
    const user = await Company.findOne({email:req.body.email})
   
    if(!user) return res.status(400).json({success:false, message:"Invalid credentials"})
   
    const validPass = await bcrypt.compare(req.body.password, user.password)
   
    if(!validPass) return res.status(400).json({success:false, message:"Invalid credentials"})

    const token =await user.generateToken()
    const date = new Date();
    
    res.cookie("jwt", token, {
        
        expires:new Date( date + 30*24*60*60*1000),
        maxAge:  30*24*60*60*1000,
        // secure:true,
        // httpOnly: true
    });
    console.log("hereeeeeee")
    res.status(200).json({success: true, message:"Logged in", user, token})
    
    
});
router.get('/verify-email', async(req, res)=>{
    const email = req.body.email
    console.log("0 req.body"+JSON.stringify(req.body))
    console.log("1 email"+ email)
    const exists = await Company.findOne({email})
    console.log("2 exists"+ exists)
    if(exists) return res.status(400).json({success: false, message:"already registered"})
    return res.status(200).json({success: true, message:"Not registered"})
});

router.get('/job-desc/:username', authenticateUser, async(req, res)=>{
    console.log("company /job-desc   passed route")
    if(req.role=='scholar'){
        var company= await Company.findOne({username : req.params.username},{password:0, token:0, email:0, head_name:0, head_email:0, second_email:0, second_mobile:0,
                                             second_name:0})
    }else{
       company= await Company.findOne({username : req.params.username},{password:0, token:0,})

    }
    return res.status(200).json({success:true, company})
});

router.get('/profile', authenticateCompany, async(req,res)=>{
    console.log("company /profile   passed route")
    // const user = Company.findById({"loginDetails.username": req.params.username}, function (err, user) {
    //     if(err){ 
    //         console.log(err);
    //         return res.send(error)
    //     }
    //     else{
    //         console.log( user);
    //         return res.json({success:true ,message:`Retrieved user ${user.loginDetails.username}`, user}) 
    //     }})
            console.log( "company::profile");
            console.log( req.user);
            console.log( "company::profile");
    res.status(200).json({success: true, message:"retrieved company profile", company:req.user})
        console.log(req.user)
      
});


module.exports = router;  
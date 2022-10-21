const router = require('express').Router();
const bcrypt = require('bcrypt');
const Credentials = require('../model/Credentials');
const Company = require('../model/Company');
const {validateCompanyRegistration, validateLogin, validate} = require('../userinputvalidation');
const {authenticateUser} = require('../middleware/authenticate');


router.get('/is-company-registered',async(req, res)=>{
    try{
        console.log("GET company/is-company-registered")

        const company = await Company.findOne({email:req.query.email})
        if(!company) return res.status(412).json({success:false, message:'Company not registered'})
        return res.status(200).json({success:true, message:'Company registered'})
    }catch(error){
        console.log(`Error occurred in GET company/is-company-registered for ${req.body.email}`,error)
        res.status(500).json({success: false, message:"Internal Server Error"})
    }
});

router.post('/register', validateCompanyRegistration, validate , async (req, res)=>{
    try{
        console.log("POST company/register")
        
        const user = await Company.findOne({email:req.body.email})
        if(user) return res.status(400).json({success:false, message:"You already have an account"}).
        console.log(req.body.password )
        console.log(req.body.username)
        console.log(req.body.confirmPassword)
        if(req.body.password !== req.body.confirmPassword)  return res.status(401).json({success:false, message:"passwords do not match"})
              
        const {username, email } = req.body        
        const {cname, phone, website} = req.body        
        const {head_name,head_email, head_mobile}= req.body        
        const {second_name,second_email, second_mobile}= req.body        
        const {job_profile, designation, place_of_posting, job_desc, recruitment_type}= req.body        
        const {annual_package, breakage_ctc}= req.body        
        const {courses_allowed, aptitude_test, coding_test, interview, hr_round, any_other_rounds}= req.body        
        const {pre_placement_talk, coding_test_date, interview_date, notes}= req.body        
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
        const token = await newUser.generateToken();
        res.cookie("jwt", token, {
            expires:new Date(Date.now()+3000),
        // secure:true,
        //httpOnly: true
        });
        await newUser.save()
    
        Credentials.findOneAndUpdate({email:req.body.email},{status:'Registered'})
        .then(res=>{
            console.log("then"+res)
        })
        .catch(err=>{
            console.log("catch"+err)
        })

        console.log(`Registered Company ${newUser}`)  
        return res.status(201).json({success:true, message: `${newUser.username} registered successfully`, newUser })
    }catch(error){
            console.log("catch block "+error);
            res.status(500).json({success:false, message:"Internal Server error"})
    }
   
});

router.post('/login', validateLogin, validate,  async (req, res)=>{
   
   try{ 
        console.log("POST company/login")
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
                httpOnly: true
            });
        res.status(200).json({success: true, message:"Logged in", role:"company", user})
    }catch(error){
        console.log(`Error occurred in GET company/login for ${req.body.email}`,error)
        res.status(500).json({success: false, message:"Internal Server Error"})
    }
    
});

router.get('/verify-email', async(req, res)=>{
    try{
        console.log("GET company/verify-email")
        const email = req.body.email
        const exists = await Company.findOne({email})
        if(exists) return res.status(400).json({success: false, message:"already registered"})
        return res.status(200).json({success: true, message:"Not registered"})
    }catch(error){
        console.log(`Error occurred in GET company/verify-email for ${req.body.email}`,error)
        res.status(500).json({success: false, message:"Internal Server Error"})
    }
});

router.get('/job-desc/:username/', authenticateUser, async(req, res)=>{
   try{
        console.log("GET compnay/job-desc/:username")
        if(req.role=='admin' || req.role=='scholar'){
            var company;
            if(req.role=='scholar'){
                company = await Company.findOne({username : req.params.username},
                    {   password:0, token:0, email:0, 
                        head_name:0, head_email:0, head_mobile:0,
                        second_email:0, second_mobile:0, second_name:0
                    })
            }else{
                company= await Company.findOne({username : req.params.username},{password:0, token:0})
            }

                if(!company){

                    return res.status(404).json({success:false, message:"Not found"})
                }
            return res.status(200).json({success:true, company, role:req.role})
        }
        else{
            return res.status(403).json({success:false, message:'Unauthorized'})
            
        }
    }catch(error){
        console.log(`Error occurred in  GET compnay/job-desc/:username while fetching usersname -${req.params.username}`,error)
        res.status(500).json({success: false, message:"Internal Server Error"})
    }
});

router.get('/profile', authenticateUser, async(req,res)=>{
    try{
        console.log("GET /company/profile ")
        if(req.role ==='company'){
            res.status(200).json({success: true, message:"Retrieved company profile", company:req.user, role:req.role})
        }else{
            res.status(500).json({success: false, message:"Internal Server Error"})
        } 
    }catch(error){
        console.log("Error occurred in  GET /profile",error)
        res.status(500).json({success: false, message:"Internal Server Error"})
    }     
});


module.exports = router;  
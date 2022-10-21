const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Credentials = require('../model/Credentials');
const{ authenticateScholar,authenticateUser }= require('../middleware/authenticate')
const Admin = require('../model/Admin');
const Scholar = require('../model/Scholar');
const {validateScholarRegistration, validateDULogin, validate} = require('../userinputvalidation');

router.get('/is-scholar-registered',async(req, res)=>{

    const scholar = await Scholar.findOne({email:req.query.email})
    if(!scholar) {
        return res.status(412).json({success:false, message:'scholar not registered'})
    }return res.status(200).json({success:true, message:'scholar registered'})
});
router.get('/scholars',authenticateUser,  async (req, res)=>{
    try{console.log("GET scholar/scholars")
        if(req.role==='admin'){
            const scholars = await Scholar.find({}, {password:0, token:0, createdAt:0, __v:0}).sort({fname:1})
            if(!scholars){
                return res.status(404).json({success:false, message:"No records found yet"})
            }
            res.status(200).json({success: true, message:"Retrieved scholars", scholars}) 
        }else if(req.role==='company'){
            const package_offered = req.user.annual_package;
            console.log("annual_package")
            console.log(typeof req.user.annual_package)
            
            const query = {
                package_offered: {$lt: 'placementDetails.annual_package' }
            }
            const scholars = await Scholar.find().where('placementDetails.annual_package').lt(package_offered).sort({ fname:1})
            console.log("11")
            console.log(scholars)
            console.log("22")

           if(scholars.length<=0){
                return res.status(404).json({success:false, message:"No records found yet"})
            }
            res.status(200).json({success: true, message:"Retrieved scholars", scholars}) 
        }else{
            res.status(400).json({success: false, message:"Unauthorized"}) 

        }
    }catch(err){
        console.log("Error occured",err)
    }
});

router.post('/verify-email', async(req, res)=>{
    console.log("POST student/verify-email")
    const exists = await Scholar.findOne({email:req.query.email})
    console.log("2 exists"+ exists)
    if(exists) return res.status(200).json({success: true, message:"already registered"})
    return res.status(400).json({success: false, message:"Notregistered"})
})
router.post('/register', validateScholarRegistration, validate , async (req, res)=>{
    try{
        console.log("POST scholar/register")
        const userExists = await Scholar.findOne({"email":req.query.email})
        
        if(userExists) return res.status(400).json({success:false, message:"You already have an account"}).send("You already have an account")
        
        const user = await Scholar.findOne({"email":req.body.email})
        
        if(user) return res.status(400).json({success:false, message:"You already have an account"}).send("You already have an account")
        console.log(req.body.password )
        console.log(req.body.username)
        console.log(req.body.confirmPassword)
        if(req.body.password !== req.body.confirmPassword)  return res.status(401).send("passwords do not match")


        const { username, email,
                fname,lname,dob,gender,phone,alternative_phone,
                perma_addr1,perma_addr2,perma_state,perma_city,perma_pin,
                corr_addr1,corr_addr2,corr_state, corr_city,corr_pin,
                pg_course,pg_exam_roll,pg_class_roll,pg_aggr_percentage, pg_backlogs,pg_backlog_details,
                grad_college,grad_university,grad_course,grad_roll_no, grad_marks_obtained,grad_max_marks,grad_aggr_percentage,grad_year_of_passing,             
                inter_board, inter_roll_no, inter_marks_obtained, inter_max_marks, inter_aggr_percentage, inter_year_of_passing,  
                high_board, high_roll_no, high_marks_obtained, high_max_marks, high_aggr_percentage, high_year_of_passing
        }= req.body

      
        //hashing password
        const password = await bcrypt.hash(req.body.password, 8)

        const newScholar = new Scholar({
            email, password, username,
            fname, lname, dob, gender, phone, alternative_phone,
            perma_addr1,perma_addr2,perma_state,perma_city,perma_pin,
            corr_addr1,corr_addr2,corr_state,corr_city,corr_pin ,
            pg_course,pg_exam_roll,pg_class_roll,pg_aggr_percentage,pg_backlogs,pg_backlog_details,
            grad_college,grad_university,grad_course,grad_roll_no,grad_marks_obtained,grad_max_marks,grad_aggr_percentage,grad_year_of_passing
            ,inter_board, inter_roll_no, inter_marks_obtained, inter_max_marks, inter_aggr_percentage, inter_year_of_passing,        
             high_board, high_roll_no, high_marks_obtained, high_max_marks, high_aggr_percentage, high_year_of_passing
        });
            console.log("POST scholar/register : scholar created"+ newScholar.email);
            const token = await newScholar.generateToken();
            await newScholar.save()
             
            Credentials.findOneAndUpdate({email},{status:"Registered"})
             .then(res=>console.log(res))
             .catch(err=>console.log(err))
             
            res.cookie("jwt", token, {
                expires:new Date(Date.now()+3000),
                // secure:true,
                httpOnly: true
            });
           
            console.log(`Registered Scholar ${newScholar}`)  
            return res.status(201).json({success:true, message: `${newScholar.email} registered successfully`, newScholar })
         
        }catch(err){
            console.log(err);
            res.status(500).json({success:false, message: 'Internal Server Error'})
        }
   
});
router.post('/login', validateDULogin, validate, async (req, res)=>{

    try{

        var admin = await Admin.findOne({"email":req.body.email})
        if(!admin){
    
          const  user = await Scholar.findOne({"email":req.body.email})
          
            if(!user) return res.status(400).json({success:false, message:"Invalid credentails"});
            
            const validPass = await bcrypt.compare(req.body.password, user.password)
    
            if(!validPass) return res.status(400).json({success:false, role:"USER", message:"Invalid credentails"});
    
            const token =await user.generateToken()
            const date = new Date();
            res.cookie("jwt", token, {
                
                expires:new Date( date + 30*24*60*60*1000),
                maxAge:  30*24*60*60*1000,
                // secure:true,
                httpOnly: true
            });
            console.log(user._id)
            return res.status(200).json({success: true, role:"scholar", message:"Logged in", user, token})  
        }  
        const validPass = await bcrypt.compare(req.body.password, admin.password)
    
        if(!validPass) return res.status(400).json({success:false,  message:"Invalid credentails"});
    
        const token =await admin.generateToken()
        const date = new Date();
        res.cookie("jwt", token, {
            
            expires:new Date( date + 30*24*60*60*1000),
            maxAge:  30*24*60*60*1000,
            // secure:true,
            httpOnly: true
        });
        return res.status(200).json({success: true, role:"admin" , message:"Logged in", admin, token}) 
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
});

router.get('/profile', authenticateUser ,  async(req,res)=>{
    try{
        console.log("GET scholar/profile")
        if(req.role === 'scholar') {
            return res.status(200).json({success:true , scholar:req.user})
        }
        else 
            return res.status(401).json({success:false, message:"Unauthorized"})
    }catch(error){
            console.log(error)
            return res.status(500).json({success:false, message:"Internal Server Error"})
    }
});

router.get('/dashboard/:id', async(req,res)=>{
    try{const id = req.params.id
        const scholar = await Scholar.findOne({_id:id})
        console.log("Scholar "+ scholar)
        if(!scholar) return res.json({success: false , message:"Invalid request"})
        return res.json({success:true, data: scholar})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
})


module.exports = router;  
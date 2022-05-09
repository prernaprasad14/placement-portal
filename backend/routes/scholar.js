const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Credentials = require('../model/Credentials');
const{ authenticateScholar, isLoggedIn }= require('../middleware/authenticate')

const {generateToken}= require('../model/Scholar');

const Admin = require('../model/Admin');
const Scholar = require('../model/Scholar');

const User = require('../model/User');
const ResetPassword = require('../model/resetPasswordSchema');
const {validateScholarRegistration, validateScholarCreate, validateScholarLogin, validate, isResetTokenValid} = require('../userinputvalidation');
const cookieParser = require('cookie-parser');
const { createRandomBytes  } = require('../helper');



router.post('/verify-email', async(req, res)=>{
    console.log("0 req.query"+JSON.stringify(req.query))
    console.log("0 req.body"+JSON.stringify(req.body))
    // console.log("1 email"+ email)
    const exists = await Scholar.findOne({"email":req.query.email})
    console.log("2 exists"+ exists)
    if(exists) return res.status(200).json({success: true, message:"already registered"})
    return res.status(400).json({success: false, message:"Notregistered"})
})
router.post('/register', validateScholarRegistration, validate , async (req, res)=>{
    try{
        console.log("hello")
        
        const userExists = await Scholar.findOne({"email":req.query.email})
        if(userExists) return res.status(400).json({success:false, message:"You already have an account"}).send("You already have an account")
        const user = await Scholar.findOne({"email":req.body.email})
        if(user) return res.status(400).json({success:false, message:"You already have an account"}).send("You already have an account")
        console.log(req.body.password )
        console.log(req.body.username)
        console.log(req.body.confirmPassword)
        if(req.body.password !== req.body.confirmPassword)  return res.status(401).send("passwords do not match")

        
        console.log("1 reached here")
        var c=0
        console.log(c+" here")
        c++
        const {username, email } = req.body
        
        console.log(c+" here")
        c++
        const {fname,lname,dob,gender,phone,alternative_phone}= req.body
        
        console.log(c+" here")
        c++
        const {perma_addr1,perma_addr2,perma_state,perma_city,perma_pin}= req.body
        
        console.log(c+" here")
        c++
        const {corr_addr1,corr_addr2,corr_state,corr_city,corr_pin}= req.body
        
        console.log(c+" here")
        c++
        const {pg_course,pg_exam_roll,pg_class_roll,pg_aggr_percentage,pg_backlogs,pg_backlog_details}= req.body
        
        console.log(c+" here")
        c++
        const {grad_college,grad_university,grad_course,grad_roll_no,grad_marks_obtained,grad_max_marks,grad_aggr_percentage,grad_year_of_passing}= req.body
    
        console.log(c+" here")
        c++
        const {inter_board, inter_roll_no, inter_marks_obtained, inter_max_marks, inter_aggr_percentage, inter_year_of_passing}= req.body     
        
        console.log(c+" here")
        c++
        const { high_board, high_roll_no, high_marks_obtained, high_max_marks, high_aggr_percentage, high_year_of_passing}= req.body
        
        console.log("8reached here")
        //hashing password
        const password = await bcrypt.hash(req.body.password, 8)
        console.log("9 hashed password"+password)
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
            console.log("newScholar:: "+newScholar);
            
            // console.log("newuser:: "+newUser);
            const token = await newScholar.generateToken();
            await newScholar.save()
            res.cookie("jwt", token, {
                expires:new Date(Date.now()+3000),
                // secure:true,
                httpOnly: true
            });
            
            
            //const registered = await newUser.save()
            console.log(`Registered Scholar ${newScholar}`)  
            return res.status(201).json({success:true, message: `${newScholar.username} registered successfully`, newScholar })
            // await newUser.save()
            // res.status(201).send(`Registered user ${newUser}`)
            // console.log(`Registered user ${newUser}`)  
            // return res.json({success:true, message: `${newUser.username} registered successfully`, newUser })
        }catch{err => console.log(err);}
   
});
router.post('/login', validateScholarLogin, validate, async (req, res)=>{

    var admin = await Admin.findOne({"email":req.body.email})
    if(!admin){

      const  user = await Scholar.findOne({"email":req.body.email})
        console.log("check1")
        if(!user) return res.status(400).json({success:false, message:"Invalid credentails"});
        console.log("check2")
        
        const validPass = await bcrypt.compare(req.body.password, user.password)

        if(!validPass) return res.status(400).json({success:false, message:"Invalid credentails"});

        const token =await user.generateToken()
        console.log(`login route    :: token:: ${token}`)
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
    console.log(`login route    :: token:: ${token}`)
    const date = new Date();
    res.cookie("jwt", token, {
        
        expires:new Date( date + 30*24*60*60*1000),
        maxAge:  30*24*60*60*1000,
        // secure:true,
        httpOnly: true
    });
    return res.status(200).json({success: true, role:"admin" , message:"Logged in", admin, token}) 
});

router.get('/profile', authenticateScholar ,  async(req,res)=>{
    console.log("/profile  passed route")
    return res.status(200).json({success:true , scholar:req.user})
    // console.log("id:: " + req.params.id) 
    // const id  = req.params.id
    // const scholar = Scholar.findById({_id: req.params.id}, function (err, scholar) {
    //     if(err){
    //         console.log(err);
    //         return res.status(401).json({success:false, message:"User deosnt exist"})
    //     }
    //     else{
    //         if(scholar.token!=req.cookies.jwt){
    //             console.log("scholar.token!=req.cookies.jwt : Unauthorised")
    //             return res.status(403).json({success:false ,message:`Unauthorised`})
    //         }
    //          return res.json({success:true ,message:`Retrieved scholar ${scholar.username}`, scholar})
    //     }})
});

router.get('/dashboard/:id', async(req,res)=>{
    const id = req.params.id
    const scholar = await Scholar.findOne({_id:id})
    console.log("Scholar "+ scholar)
    if(!scholar) return res.json({success: false , message:"Invalid request"})
    return res.json({success:true, data: scholar})
})


module.exports = router;  
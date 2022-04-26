const {check,validationResult} = require('express-validator')
const Scholar= require('./model/Scholar')
const ResetPassword = require('./model/resetPasswordSchema');
const Company = require('./model/Company');
const res = require('express/lib/response');

exports.validateScholarCreate=[
    check('.email').not().isEmpty().withMessage("Email cannot be empty").bail().isEmail().bail().withMessage("Not valid email address").bail().matches(/^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/).withMessage('Invalid email'),
    check('username').not().isEmpty().withMessage("Username This field is required") 
]
exports.validateCompanyCreate=[
    check('.email').not().isEmpty().withMessage("Email cannot be empty").bail().isEmail().withMessage('Invalid email'),
    check('username').not().isEmpty().withMessage("Username cannot be empty") 
]

exports.validateScholarLogin=[
    check('email').not().isEmpty().withMessage("Email cannot be empty").bail().matches(/^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/).withMessage('Invalid Credentials'),
    check('password').not().isEmpty().withMessage("Password cannot be empty")  
]
exports.validateLogin=[
    check('email').not().isEmpty().withMessage("Email cannot be empty").isEmail().withMessage('Invalid Credentials'),
    check('password').not().isEmpty().withMessage("Password cannot be empty") 
]

exports.validateCompanyRegistration=[
    check('email').not().isEmpty().withMessage("Email cannot be empty").bail().isEmail().withMessage('Please enter a valid email'),
    check('password').not().isEmpty().withMessage("Password This field is required").bail() ,
   
    
] ;
exports.validateScholarRegistration=[
    check('email').not().isEmpty().withMessage("Email cannot be empty").bail().matches(/^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/).withMessage('Invalid email'),
    check('password').not().isEmpty().withMessage("Password This field is required").bail() ,
    check('fname').not().isEmpty().withMessage("First name This field is required").bail().isLength({min: 3, max:20}),
    check('lname').not().isEmpty().withMessage("Last name This field is required").bail().isLength({min: 3, max:20}),
    check('dob').not().isEmpty().withMessage("Date of Birth This field is required").bail(),
    check('gender').not().isEmpty().withMessage("Gender This field is required").bail(),
    check('phone').not().isEmpty().withMessage("Phone no. This field is required").bail().isLength({min: 10, max:20}),
    // check('alternative_phone').not().require().isLength({min: 10, max:10}).withMessage("Length should be 10-digits"),
    // check('perma_addr1').not().isEmpty().withMessage("Permanent address: address line 1 is required").bail().isLength({min: 0, max:40}),
    // check('perma_addr2').not().isEmpty().withMessage("Permanent address: address line 2 is required").bail().isLength({min: 0, max:40}),
    // check('perma_city').not().isEmpty().withMessage("Permanent address: city  is required").bail().isLength({min: 0, max:40}),
    // check('perma_state').not().isEmpty().withMessage("Permanent address: state  is required").bail().isLength({min: 0, max:40}),
    // check('perma_pin').not().isEmpty().withMessage("Permanent address: pin  is required").bail().isLength({min: 0, max:40}),
    // check('corr_addr1').not().isEmpty().withMessage("correspondence address line 1 is required").bail().isLength({min: 0, max:40}),
    // check('corr_addr2').not().isEmpty().withMessage("correspondence addrecorrddress line 1 is required").bail().isLength({min: 0, max:40}),
    // check('corr_city').not().isEmpty().withMessage("correspondence city  is required").bail().isLength({min: 0, max:40}),
    // check('corr_state').not().isEmpty().withMessage("correspondence state  is required").bail().isLength({min: 0, max:40}),
    // check('corr_pin').not().isEmpty().withMessage("correspondence address: pin  is required").bail().isLength({min: 0, max:40}),
    
    check('pg_course').not().isEmpty().withMessage("Post graduation course field is required"),
    
] ;

exports.validate = (req, res, next)=>{ 
    const error = validationResult(req).array()
    if(!error.length) return next()
 
    res.status(400).json({success: false, error: error})
}

exports.isResetTokenValid=async (req, res, next)=>{
    const user = await Company.findOne({"email":req.query.email})
    if(!user){
        const scholar = await Scholar.findOne({"email":req.query.email})
        if(!scholar)  return res.json({success: false ,  error:"Reset token not found"})
        console.log("::::::::user:::::::"+scholar)

        const tokenDetails = await ResetPassword.findOne({owner:scholar._id})
        console.log(":::::::token:::::::::"+tokenDetails)
        if(!tokenDetails) return res.status(400).json({success: false ,  error:"Reset token not found"})

        if(tokenDetails.token !== req.query.token) return res.status(400).json({success: false ,  error:"Reset token not found"})
        req.scholar = scholar
        next()

    }else{
        console.log("::::::::user:::::::"+user)

        const tokenDetails = await ResetPassword.findOne({owner:user._id})
        console.log(":::::::token:::::::::"+tokenDetails)
        if(!tokenDetails) return res.status(400).json({success: false ,  error: "Reset token not found"})

        if(tokenDetails.token !== req.query.token) return res.status(400).json({success: false ,  error: "Reset token not found"})
        req.user = user
        next()
    }
    
    
}


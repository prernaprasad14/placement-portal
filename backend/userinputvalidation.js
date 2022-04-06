const {check,validationResult} = require('express-validator')
const User= require('./model/User')
const ResetPassword = require('./model/resetPasswordSchema');

exports.validateScholarCreate =[
    check('.email').not().isEmpty().withMessage("Email cannot be empty").bail().matches(/^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/).withMessage('Invalid email'),
    check('username').not().isEmpty().withMessage("Username This field is required") 
]
exports.validateCompanyCreate =[
    check('.email').not().isEmpty().withMessage("Email cannot be empty").bail().matches(/^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/).withMessage('Invalid email'),
    check('username').not().isEmpty().withMessage("Username This field is required") 
]

exports.validateLogin =[
    check('loginDetails.email').not().isEmpty().withMessage("Email cannot be empty").bail().matches(/^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/).withMessage('Invalid email'),
    check('loginDetails.password').not().isEmpty().withMessage("Password This field is required") ,
]

exports.validateCompanyRegistration =[
    check('loginDetails.email').not().isEmpty().withMessage("Email cannot be empty").bail().isEmail().withMessage('Please enter a avlid email'),
    check('loginDetails.password').not().isEmpty().withMessage("Password This field is required").bail() ,
    // check('personalDetails.fname').not().isEmpty().withMessage("First name This field is required").bail().isLength({min: 3, max:20}),
    // check('personalDetails.lname').not().isEmpty().withMessage("Last name This field is required").bail().isLength({min: 3, max:20}),
    // check('personalDetails.dob').not().isEmpty().withMessage("Date of Birth This field is required").bail(),
    // check('personalDetails.gender').not().isEmpty().withMessage("Gender This field is required").bail(),
    // check('personalDetails.phone_no').not().isEmpty().withMessage("Phone no. This field is required").bail().isLength({min: 3, max:20}),
    // check('personalDetails.alternative_phone').not().isEmpty().withMessage("Alternative phone no. This field is required").bail().isLength({min: 3, max:20}),
    // check('personalDetails.permanent_addr').not().isEmpty().withMessage("Permanent address This field is required").bail().isLength({min: 3, max:40}),
    // check('personalDetails.correspondence_addr').not().isEmpty().withMessage("Correspondence This field is required").bail().isLength({min: 3, max:40}),
    // check('course').not().isEmpty().withMessage("course This field is required"),
    
] ;
exports.validateRegistration =[
    check('loginDetails.email').not().isEmpty().withMessage("Email cannot be empty").bail().matches(/^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/).withMessage('Invalid email'),
    check('loginDetails.password').not().isEmpty().withMessage("Password This field is required").bail() ,
    // check('personalDetails.fname').not().isEmpty().withMessage("First name This field is required").bail().isLength({min: 3, max:20}),
    // check('personalDetails.lname').not().isEmpty().withMessage("Last name This field is required").bail().isLength({min: 3, max:20}),
    // check('personalDetails.dob').not().isEmpty().withMessage("Date of Birth This field is required").bail(),
    // check('personalDetails.gender').not().isEmpty().withMessage("Gender This field is required").bail(),
    // check('personalDetails.phone_no').not().isEmpty().withMessage("Phone no. This field is required").bail().isLength({min: 3, max:20}),
    // check('personalDetails.alternative_phone').not().isEmpty().withMessage("Alternative phone no. This field is required").bail().isLength({min: 3, max:20}),
    // check('personalDetails.permanent_addr').not().isEmpty().withMessage("Permanent address This field is required").bail().isLength({min: 3, max:40}),
    // check('personalDetails.correspondence_addr').not().isEmpty().withMessage("Correspondence This field is required").bail().isLength({min: 3, max:40}),
    // check('course').not().isEmpty().withMessage("course This field is required"),
    
] ;

exports.validate = (req, res, next) =>{ 
    const error = validationResult(req).array()
    if(!error.length) return next()
 
    res.status(400).json({success: false, error: error})
}

exports.isResetTokenValid=async (req, res, next)=>{
    const user = await User.findOne({"loginDetails.email":req.query.email})
    if(!user) return res.send("user not found")
    console.log("::::::::user:::::::"+user)

    const tokenDetails = await ResetPassword.findOne({owner:user._id})
    console.log(":::::::token:::::::::"+tokenDetails)
    if(!tokenDetails) return res.status(400).json({success: false ,  error: "Reset token not found"})

    if(tokenDetails.token !== req.query.token) return res.status(400).json({success: false ,  error: "Reset token not found"})
    req.user = user
    next()
}

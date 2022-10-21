const {check,validationResult} = require('express-validator')
const Scholar= require('./model/Scholar')
const ResetPassword = require('./model/resetPasswordSchema');
const Company = require('./model/Company');
const res = require('express/lib/response');
const Admin = require('./model/Admin');
const { userInfo } = require('os');

exports.validatePcInfoUpdate=[
    check('email').not().isEmpty().withMessage("Email cannot be empty").bail().isEmail().bail().withMessage("Not valid email address").bail().matches(/^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/).withMessage('Invalid email').trim(),
    check('pcname').not().isEmpty().withMessage("PCname is required").bail().trim(), 
    check('course').not().isEmpty().withMessage("Course is required").bail().trim(), 
    check('contact').not().isEmpty().withMessage("Username is required") 
]
exports.validateScholarCreate=[
    check('email').not().isEmpty().withMessage("Email cannot be empty").bail().isEmail().bail().withMessage("Not valid email address").bail().matches(/^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/).withMessage('Invalid email').trim(),
    check('username').not().isEmpty().withMessage("Username cannot be empty").trim(),
    check('role').not().isEmpty().withMessage("Role cannot be empty").isIn(['Scholar']).withMessage(`Invalid value for role, provide one of the valid values['Scholar', 'Company']`)
]
exports.validateCompanyCreate=[
    check('email').not().isEmpty().withMessage("Email cannot be empty").bail().isEmail().withMessage('Invalid email').trim(),
    check('username').not().isEmpty().withMessage("Username cannot be empty").trim(),
    check('role').not().isEmpty().withMessage("Role cannot be empty").isIn(['Company']).withMessage(`Invalid value for role, provide one of the valid values['Scholar', 'Company']`) 
]

exports.validateDULogin=[
    check('email').not().isEmpty().withMessage("Email cannot be empty").bail().matches(/^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/).withMessage('Invalid Credentials').trim(),
    check('password').not().isEmpty().withMessage("Password cannot be empty").trim()  
]
exports.validateLogin=[
    check('email').not().isEmpty().withMessage("Email cannot be empty").isEmail().withMessage('Invalid Credentials').trim(),
    check('password').not().isEmpty().withMessage("Password cannot be empty").trim() 
]

exports.validateCompanyRegistration=[
    check('email').not().isEmpty().withMessage("Email cannot be empty").bail().isEmail().withMessage('Please enter a valid email').trim(),
    check('password').not().isEmpty().withMessage("Password is required").bail().isLength({min: 8, max:20}).trim(),
    check('confirmPassword').not().isEmpty().withMessage("Password is required").bail().isLength({min: 8, max:20}).trim(),
    check('username').not().isEmpty().withMessage("Username is required").bail().matches(/^\S*$/).trim(),
    check('cname').not().isEmpty().withMessage("Username is required").bail().matches(/^\s*(?:\S\s*){3,20}$/),
    check('website').not().isEmpty().withMessage("Website is required").bail().matches(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/).withMessage("provide valid webiste url").trim(),
    check('head_name').not().isEmpty().withMessage("Head person's name is required").bail().isLength({min: 3, max:20}),
    check('head_email').not().isEmpty().withMessage("Head person's Email cannot be empty").bail().isEmail().withMessage('Please enter a valid email').trim(),
    check('head_mobile').not().isEmpty().withMessage("Head person's mobile is required").bail().isLength({min: 3, max:20}).trim(),
    check('second_name').not().isEmpty().withMessage("Second contact person's name is required").bail().isLength({min:3, max:20}),
    check('second_email').not().isEmpty().withMessage("Second contact person's email is required").bail().isEmail().withMessage('Please enter a valid email').trim(),
    check('second_mobile').not().isEmpty().withMessage("Second contact person's mobile is required").bail().isLength({min: 10, max:12}).trim(),
    check('courses_allowed').not().isEmpty().withMessage("courses allowed  is required").bail().isIn(['MCA', 'Msc','Msc, MCA']).withMessage("Invalid value for allowed courses"),
    check('recruitment_type').not().isEmpty().withMessage("recruitment type  is required").bail().matches(),
    check('job_profile').not().isEmpty().withMessage("job profile  is required").bail().matches(),
    check('designation').not().isEmpty().withMessage("designation  is required").bail().matches(),
    check('place_of_posting').not().isEmpty().withMessage("place of posting  is required").bail().matches(/^\s*(?:\S\s*){3,40}$/),
    check('job_desc').not().isEmpty().withMessage("job desc  is required").bail().matches(/^\s*(?:\S\s*){8,100}$/m),
    // check('salary').not().isEmpty().withMessage("salary  is required").bail().matches(/^[A-Z0-9]+$/),
    check('annual_package').not().isEmpty().withMessage("annual package  is required").bail().matches(/^([0-9]+\.?[0-9]+)[A-Z]?$/),
    check('breakage_ctc').not().isEmpty().withMessage("breakage ctc  is required").bail().matches(/^\s*(?:\S\s*){5,70}$/m),
    check('aptitude_test').not().isEmpty().withMessage("Aptitude test  is required").bail().isIn(['Yes', 'No']).withMessage("Invalid value for Aptitude test"),
    check('coding_test').not().isEmpty().withMessage("Coding test  is required").bail().isIn(['Yes', 'No']).withMessage("Invalid value for coding test"),
    check('interview').not().isEmpty().withMessage("Interview  is required").bail().isIn(['Yes', 'No']).withMessage("Invalid value for Interview "),
    check('hr_round').not().isEmpty().withMessage("HR round  is required").bail().isIn(['Yes', 'No']).withMessage("Invalid value for HR round"),
    check('any_other_rounds').not().isEmpty().withMessage("Any other rounds field is required,  if not applicable provide NA").bail().matches(/^\s*(?:\S\s*){2,50}$/m),
    check('pre_placement_talk').not().isEmpty().withMessage("pre placement talk date is required").bail().isDate(),
    check('coding_test_date').not().isEmpty().withMessage("Coding round date is required").bail().isDate(),
    check('interview_date').not().isEmpty().withMessage("Interview date is required").bail().isDate(),
    check('notes').not().isEmpty().withMessage("Notes is required, if not applicable provide NA").bail().matches(/^\s*(?:\S\s*){2,30}$/m)
    
] ;
exports.validateScholarRegistration=[
    check('email').not().isEmpty().withMessage("Email cannot be empty").bail().matches(/^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/).withMessage('Invalid email'),
    check('password').not().isEmpty().withMessage("Password is required").bail() ,
    check('confirmPassword').not().isEmpty().withMessage("Password is required").bail() ,
    check('username').not().isEmpty().withMessage("Username is required").bail().isLength({min: 3, max:20}),
    check('fname').not().isEmpty().withMessage("First name is required").bail().isLength({min: 3, max:20}),
    check('lname').not().isEmpty().withMessage("Last name is required").bail().isLength({min: 3, max:20}),
    check('dob').not().isEmpty().withMessage("Date of Birth is required").bail(),
    check('gender').not().isEmpty().withMessage("Gender is required").bail().isIn(['Male', 'Female', 'Prefer not to say']),
    check('phone').not().isEmpty().withMessage("Phone no. is required").bail().isLength({min: 10, max:13}),
    check('alternative_phone').isLength({min:0, max:13}).withMessage("Length should be 10-digits"),
    check('perma_addr1').not().isEmpty().withMessage("Permanent address- Address line 1 is required").bail().isLength({max:70}),
    check('perma_addr2').not().isEmpty().withMessage("Permanent address- Address line 2 is required").bail().isLength({max:30}),
    check('perma_city').not().isEmpty().withMessage("Permanent address- City is required").bail().isLength({min:3, max:40}),
    check('perma_state').not().isEmpty().withMessage("Permanent address- State is required").bail().isLength({min: 3, max:40}),
    check('perma_pin').not().isEmpty().withMessage("Permanent address- PIN is required").bail().isLength({min: 6, max:10}),
    check('corr_addr1').not().isEmpty().withMessage("Correspondence address- Address line 1 is required").bail().isLength({ max:70}),
    check('corr_addr2').not().isEmpty().withMessage("Correspondence address- Address line 2 is required").bail().isLength({ max:30}),
    check('corr_city').not().isEmpty().withMessage("Correspondence address- City is required").bail().isLength({min: 3, max:20}),
    check('corr_state').not().isEmpty().withMessage("Correspondence address- State is required").bail().isLength({min: 3, max:20}),
    check('corr_pin').not().isEmpty().withMessage("Correspondence address- PIN is required").bail().isLength({min: 6, max:10}),
    check('pg_course').not().isEmpty().withMessage("Post graduation- Course is required").bail().isIn(['Master of Computer Applications','Msc Computer Science']).withMessage('Course should be one of the specifies options only'),
    check('pg_exam_roll').not().isEmpty().withMessage("Post graduation- Roll no. is required").bail(),
    check('pg_class_roll').not().isEmpty().withMessage("Post graduation- Course is required").bail(),
    check('pg_aggr_percentage').not().isEmpty().withMessage("Post graduation- aggregate percentage is required").bail(),
    check('pg_backlogs').not().isEmpty().withMessage("Post graduation- backlogs is required").bail(),
    check('pg_backlog_details').not().isEmpty().withMessage("Post graduation- backlog_details is required").bail(),
    check('grad_college').not().isEmpty().withMessage("Graduation- College is required").bail(),
    check('grad_university').not().isEmpty().withMessage("Graduation- University is required").bail(),
    check('grad_course').not().isEmpty().withMessage("Graduation- Course is required").bail(),
    check('grad_roll_no').not().isEmpty().withMessage("Graduation- Roll no. is required").bail(),
    check('grad_marks_obtained').not().isEmpty().withMessage("Graduation- marks obtained is required").bail(),
    check('grad_max_marks').not().isEmpty().withMessage("Graduation- max marks is required").bail(),
    check('grad_aggr_percentage').not().isEmpty().withMessage("Graduation- aggregate percentage is required").bail(),
    check('grad_year_of_passing').not().isEmpty().withMessage("Graduation- year of passing is required").bail(),
    check('inter_board').not().isEmpty().withMessage("Intermmediate- Board is required").bail(),
    check('inter_roll_no').not().isEmpty().withMessage("Intermmediate- Roll no. is required").bail(),
    check('inter_marks_obtained').not().isEmpty().withMessage("Intermmediate- marks_obtained is required").bail(),
    check('inter_max_marks').not().isEmpty().withMessage("Intermmediate- max marks is required").bail(),
    check('inter_aggr_percentage').not().isEmpty().withMessage("Intermmediate- aggregate percentage is required").bail(),
    check('inter_year_of_passing').not().isEmpty().withMessage("Intermmediate- year of passing is required").bail(),
    check('high_board').not().isEmpty().withMessage("High school- board is required").bail(),
    check('high_roll_no').not().isEmpty().withMessage("High school- Roll no. is required").bail(),
    check('high_marks_obtained').not().isEmpty().withMessage("High school- marks obtained is required").bail(),
    check('high_max_marks').not().isEmpty().withMessage("High school- max marks is required").bail(),
    check('high_aggr_percentage').not().isEmpty().withMessage("High school- aggregate percentage is required").bail(),
    check('high_year_of_passing').not().isEmpty().withMessage("High school- year of passing is required"),
];
exports.validateFooterForm =[
    check('username').not().isEmpty().withMessage("Username is required").bail() ,
    check('email').not().isEmpty().withMessage("Email cannot be empty").bail().isEmail().withMessage('Please enter a valid email'),
    check('msg').not().isEmpty().withMessage("Message is required").bail() 
];
exports.validatePcUpdateData=[
    check('email').not().isEmpty().withMessage("Email cannot be empty").bail().matches(/^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/).withMessage('Invalid email'),
    check('username').not().isEmpty().withMessage("Username is required").bail().isLength({min: 3, max:20}),
    check('phone').not().isEmpty().withMessage("Phone no. is required").bail().isLength({min: 10, max:13}),
    check('phone').not().isEmpty().withMessage("Phone no. is required").bail().isLength({min: 10, max:13}),
    check('course').not().isEmpty().withMessage("Course is required").bail().isIn(['Master of Computer Applications','Master of Computer Science']),
    check('start_date').not().isEmpty().withMessage("Start date is required"),
    check('end_date').not().isEmpty().withMessage("End date is required"),
    
]
exports.validate = (req, res, next)=>{ 
    const error = validationResult(req).array()
    if(!error.length) return next()
 
    res.status(400).json({success: false, error: error})
}

exports.isResetTokenValid=async (req, res, next)=>{
    var user = await Admin.findOne({"email":req.query.email})
    if(!user) {
        user= await Company.findOne({"email":req.query.email})
        if(!user){
             user = await Scholar.findOne({"email":req.query.email})
            if(!user){
                return res.json({success: false ,  error:"Reset token not found"})
            }
        }
    }
    if(user){

        const tokenDetails = await ResetPassword.findOne({owner:user._id})
        if(!tokenDetails) return res.status(400).json({success: false ,  error:"Reset token not found"})

        if(tokenDetails.token !== req.query.token) return res.status(400).json({success: false ,  error:"Reset token not found"})
        req.user = user
        next()
    }
    
}


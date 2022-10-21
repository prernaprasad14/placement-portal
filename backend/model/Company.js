const mongoose = require('mongoose');
const jwt = require('jsonwebtoken') 
const companySchema = new mongoose.Schema({
    // isCompany:{
    //     type:Boolean,
    //     required: true,
    //     default:true
    // },
    // loginDetails:{
        username:{
            type :String,
            required: true
        },
        email : {
            type :String,
            required: true
        },
        password:{
            type :String,
            min:8,
            max:20,
            required: true
        },
    // },
    cname:{
        type :String,
        required: true
    },
    phone : {
        type :String,
        required: true
    },  
    website  : {
        type :String,
        required: true
    },
    // contactDetails:{
        // head_hr:{
            head_name:{ 
                type : String,
                required: true
            },
            head_email:{
                type : String,
                required: true
            },
            head_mobile:{
                type : String,
                required: true
            },
        // },
        // second_contact:{
            second_name:{ 
                type : String,
                required: true
            },
            second_email:{
                type : String,
                required: true
            },
            second_mobile:{
                type :  String,
                required: true
            },
        // }
    // },
    
    // jobDetails:{
        job_profile:{
            type : String,
            required: true
        },
        designation:{
            type : String,
            required: true
        },
        place_of_posting:{
            type : String,
            required: true
        },
        job_desc:{
            type : String,
            required: true
        },
        recruitment_type:{
            type:String,
            enum:['Internship','Fulltime','Internship and Fulltime'],
            required: true
        },
        // salary_details:{
            annual_package: {
                type : Number,
                required: true
            },
            breakage_ctc: {
                type : String,
                required: true
            },
        // }
    // },    
    // selectionDetails:{
        courses_allowed:{
            type:String,
            enum:['MCA','Msc','Msc, MCA'],
            required: true
        },    
        aptitude_test:{
            type:String,
            enum:['Yes','No'],
            required : true
        },
        coding_test:{
            type:String,
            enum:['Yes','No'],
            required : true
        },
        interview:{
            type:String,
            enum:['Yes','No'],
            required : true
        },
        hr_round:{
            type:String,
            enum:['Yes','No'],
            required : true
        },
        any_other_rounds:{
            type : String,
            required : true
        },
    // },
   
    // placement_timeline:{
        pre_placement_talk:{
            type : Date,
            required : true
        },
        coding_test_date:{
            type: Date,
            required: true
        },
        interview_date: {
            type: Date,
            required: true
        },
        notes:{
            type:String,
            required:true
        },
    // },
    lastLogged:{
        type:Date,
        default:''
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    tokens:[{
        token: {
            type: String,
            required: true 
        }
    }]
  
});

companySchema.methods.generateToken = async function (){
    try{
        const token = jwt.sign({_id: this._id}, process.env.TOKEN_SECRET)
        this.tokens = this.tokens.concat({token:token})
        await this.save(); 
        return token

    }catch(error){
        console.log("Error occurred in company-generateToken", error)
    }
}

module.exports = mongoose.model('Company', companySchema);

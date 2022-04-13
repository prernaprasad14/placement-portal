const mongoose = require('mongoose');
const jwt = require('jsonwebtoken') 
const companySchema = new mongoose.Schema({
    isCompany:{
        type:Boolean,
        required: true,
        default:true
    },
    loginDetails:{
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
        }
    },
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
    contactDetails:{
        head_hr:{
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
            }
        },
        second_contact:{
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
            }
        }
    },
    
    jobDetails:{
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
            enum:['internship','fulltime','both'],
            required: true
        },
        salary_details:{
            annual_package: {
                type : String,
                required: true
            },
            breakage_ctc: {
                type : String,
                required: true
            }
        }
    },    
    selectionDetails:{
        courses_allowed:{
            type:String,
            enum:['mca','msc','both'],
            required: true
        },    
        aptitude_test:{
            type:String,
            enum:['yes','no'],
            required : true
        },
        coding_test:{
            type:String,
            enum:['yes','no'],
            required : true
        },
        interview:{
            type:String,
            enum:['yes','no'],
            required : true
        },
        hr_round:{
            type:String,
            enum:['yes','no'],
            required : true
        },
        any_other_rounds:{
            type : String,
            required : true
        },
    },
   
    placement_timeline:{
        pre_placement_talk:{
            type : String,
            required : true
        },
        coding_test_date:{
            type: String,
            required: true
        },
        interview_date: {
            type: String,
            required: true
        },
        notes:{
            type:String,
            required:true
        }
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    token: {
        type: String,
        required: true 
    }
  
});

companySchema.methods.generateToken = async function (){
    try{
        console.log("1 here")
        const token = jwt.sign({_id: this._id}, process.env.TOKEN_SECRET)
        console.log("2 here")
        // if(this.tokens.length == 0 ){
            this.token = token
            console.log("3 here "+token)
            await this.save();  
            console.log("4here ")
        // }
    
        return token
    }catch(err){
        res.status(400).send(`error ${err}`)
        console.log(`error ${err}`) 
    }
}

module.exports = mongoose.model('Company', companySchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto")
const jwt = require('jsonwebtoken') 

const scholarSchema = new mongoose.Schema({
    // isStudent:{
    //     type:Boolean,
    //     default:true,
    //     required:true
    // },
    
    // loginDetails:{
        username:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        // }
    },
    // personalDetails:{
        fname:{
            type: String,
            min: 3,
            max:20,
            required : true
        },
        lname:{
            type: String,
            min: 3,
            max:20,
            required : true
        },
        dob:{
            type : String,
            required: true
        },
        gender: {
            type : String, 
            enum: ['Male', 'Female', 'Prefer not to say'] ,
            required:true,
            default : 'Prefer not to say'
        },
        phone:{
            type : String,
            required: true
        },
        alternative_phone :{
            type : String,
            default:"NA"
        },
        // permanent_addr: {
            perma_addr1:{
                type : String,
                required: true
            },
            perma_addr2:{
                type : String,
                required: true
            },
            perma_state:{
                type : String,
                required: true
            },
            perma_city:{
                type : String,
                required: true
            },
            perma_pin:{
                type : String,
                required: true
            },
        // }
        // correspondence_addr :{
            corr_addr1:{
                type : String,
                required: true
            },
            corr_addr2:{
                type : String,
                required: true
            },
            corr_state:{
                type : String,
                required: true
            },
            corr_city:{
                type : String,
                required: true
            },
            corr_pin:{
            type : String,
            required: true
            },
        // }

    // postGraduationDetails : {
        pg_course: {
            type: String,
            required : true
        },
        pg_exam_roll:{
            type: String,
            required : true
        },
        pg_class_roll:{
            type: String,
            required : true
        },
        pg_aggr_percentage:{
            type: Number,
            required : true
        },
        pg_backlogs:{
            type: Number,
            required : true
        },
        pg_backlog_details:{
            type: String,
            required : true
        // }
    },
    // graduationDetails :{
        grad_college:{
            type: String,
            required : true
        },
        grad_university:{
            type: String,
            required : true
        },
        grad_course:{
            type: String,
            required : true
        },
        grad_roll_no:{
            type: String,
            required : true
        },
        grad_marks_obtained:{
            type: String,
            required : true
        },
        grad_max_marks:{
            type: String,
            required : true
        },
        grad_aggr_percentage:{
            type: String,
            required : true
        },
        grad_year_of_passing:{
            type: Number,
            required : true
        // }
    },
    // intermediateDetails: {
        inter_board:{
            type: String,
            required : true
        },
        inter_roll_no:{
            type: String,
            required : true
        },
        inter_marks_obtained:{
            type: Number,
            required : true
        },
        inter_max_marks:{
            type: Number,
            required : true
        },
        inter_aggr_percentage:{
            type: Number,
            required : true
        },
        inter_year_of_passing:{
            type: Number,
            required : true
        // }
    },
    // highSchoolDetails : {
        high_board:{
            type: String,
            required : true
        },
        high_roll_no:{
            type: String,
            required : true
        },
        high_marks_obtained:{
            type: Number,
            required : true
        },
        high_max_marks:{
            type: Number,
            required : true
        },
        high_aggr_percentage:{
            type: Number,
            required : true
        },
        high_year_of_passing:{
            type: Number,
            required : true
        // }
    },
    placementDetails:{
        placement_status:{
            type : String,
            enum:['Placed','Unplaced'],
            required:true,
            default: 'Unplaced'
        },
        company:{
            type : String,
            default:'NA',
            required: true
        },
        place_of_posting:{
            type : String,
            default:'NA',
            required: true
        },
        job_profile:{
            type : String,
            default:'NA',
            required: true
        },
        annual_package: {
            type : Number,
            default: 0,
            required: true
        }
    },
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

scholarSchema.methods.updatePlacementDetails = async function (data){
    try{
        this.placementDetails.placement_status= data.placement_status
        this.placementDetails.company= data.company
        this.placementDetails.job_profile= data.job_profile
        this.placementDetails.place_of_posting= data.place_of_posting
        this.placementDetails.annual_package= data.annual_package
        await this.save();  
        console.log(`PlacementDetails UPDATE completed of scholar ${this.email}`)

    }catch(error){
        console.log(`Error ${error}`) 
    }
}
scholarSchema.methods.updateGraduationDetails = async function (data){
    try{
        this.grad_college=data.grad_college,
        this.grad_university=data.grad_university,
        this.grad_course= data.grad_course,
        this.grad_roll_no=data.grad_roll_no,
        this.grad_marks_obtained=data.grad_marks_obtained,
        this.grad_max_marks=data.grad_max_marks,
        this.grad_aggr_percentage=data.grad_aggr_percentage,
        this.grad_year_of_passing=data.grad_year_of_passing
        await this.save();  
        console.log(`GraduationDetails UPDATE completed of scholar ${this.email}`)

    }catch(error){
        console.log(`Error ${error}`) 
    }
}
scholarSchema.methods.updatePostGraduationDetails = async function (data){
    try{
        this.pg_course =data.pg_course,
        this.pg_exam_roll =data.pg_exam_roll,
        this.pg_class_roll =data.pg_class_roll,
        this.pg_aggr_percentage =data.pg_aggr_percentage,
        this.pg_backlogs =data.pg_backlogs,
        this.pg_backlog_details =data.pg_backlog_details  
        await this.save();  
        console.log(`PostGraduationDetailsUPDATE completed of scholar ${this.email}`)

    }catch(error){
        console.log(`Error ${error}`) 
    }
}
scholarSchema.methods.updatePersonalDetails = async function (data){
    try{
        this.fname=data.fname,
        this.lname=data.lname,
        this.dob=data.dob,
        this.gender=data.gender,
        this.phone=data.phone,
        this.alternative_phone=data.alternative_phone,
        this.perma_addr1=data.perma_addr1,
        this.perma_addr2=data.perma_addr2,
        this.perma_state=data.perma_state,
        this.perma_city=data.perma_city,
        this.perma_pin=data.perma_pin,
        this.corr_addr1=data.corr_addr1,
        this.corr_addr2=data.corr_addr2,
        this.corr_state=data.corr_state,
        this.corr_city=data.corr_city,
        this.corr_pin=data.corr_pin
        await this.save();  
        console.log(`PersonalDetails UPDATE completed of scholar ${this.email}`)
    }catch(error){
        console.log(`Error ${error}`) 
    }
}
scholarSchema.methods.updateHighSchoolDetails = async function (data){
    try{
        this.high_board =data.high_board,
        this.high_roll_no =data.high_roll_no,
        this.high_marks_obtained =data.high_marks_obtained,
        this.high_max_marks =data.high_max_marks,
        this.high_aggr_percentage =data.high_aggr_percentage,
        this.high_year_of_passing =data.high_year_of_passing  
        await this.save();  
        console.log(`HighSchoolDetails UPDATE completed of scholar ${this.email}`)

    }catch(error){
        console.log(`Error ${error}`) 
    }
}
scholarSchema.methods.updateIntermmediateDetails = async function (data){
    try{
        this.inter_board =data.inter_board,
        this.inter_roll_no =data.inter_roll_no,
        this.inter_marks_obtained =data.inter_marks_obtained,
        this.inter_max_marks =data.inter_max_marks,
        this.inter_aggr_percentage =data.inter_aggr_percentage,
        this.inter_year_of_passing =data.inter_year_of_passing  
        await this.save();  
        console.log("4 updateIntermmediateDetails completed ", status)

    }catch(error){
        console.log(`Error ${error}`) 
    }
}
scholarSchema.methods.generateToken = async function (){
    try{
        const token = jwt.sign({_id: this._id}, process.env.TOKEN_SECRET)
        this.tokens = this.tokens.concat({token:token})
        await this.save(); 
        return token

    }catch(error){
        console.log("Error occurred in scholar-generateToken", error)
    }
}

module.exports = mongoose.model('Scholar', scholarSchema);

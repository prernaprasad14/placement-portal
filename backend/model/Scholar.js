const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto")
const jwt = require('jsonwebtoken') 

const scholarSchema = new mongoose.Schema({
    isStudent:{
        type:Boolean,
        default:true,
        required:true
    },
    placement_status:{
        type : String,
        enum:['placed','unplaced'],
        required:true,
        default: 'unplaced'
    },
    loginDetails:{
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
        }
    },
    personalDetails:{
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
            type : Date,
            required: true
        },
        gender: {
            type : String, 
            enum: ['male', 'female', 'prefer not to say'] ,
            required:true,
            default : 'prefer not to say'
        },
        phone:{
            type : String,
            required: true
        },
        alternative_phone :{
            type : String,
        },
        permanent_addr: {
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
                type : Number,
                required: true
            }
        },
        correspondence_addr :{
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
            type : Number,
            required: true
            },
        }
    },
    postGraduationDetails : {
        pg_course: {
            type: String,
            required : true
        },
        pg_exam_roll:{
            type: Number,
            required : true
        },
        pg_class_roll:{
            type: Number,
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
        }
    },
    graduationDetails :{
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
        }
    },
    intermediateDetails: {
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
        }
    },
    highSchoolDetails : {
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


scholarSchema.methods.generateToken = async function (){
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


module.exports = mongoose.model('Scholar', scholarSchema);

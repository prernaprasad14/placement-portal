const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto")
const jwt = require('jsonwebtoken') 
const res = require('express/lib/response');

const userSchema = new mongoose.Schema( { 
    loginDetails:{ 
        email:{
            type: String,
            min: 20,
            max:255,
            required : true
        },
        password : {
            type: String, 
            required : true,
            max: 1024,
            min: 6
        },
         username:{
            type: String,
            required : true
        }   
    }
   
    //     },
    //     dob:{
    //         type : Date,
    //         required: true
    //     },
    //     gender:{
    //         type: String,
    //         required: true
    //     },
    //     phone_no:{
    //         type: String,
    //         required: true
    //     },
    //     alternative_phone :{
    //         type : String,
    //     },
    //     permanent_addr: {
    //         addr1:{
    //             type : String,
    //             required: true
    //         },
    //         addr2:{
    //             type : String,
    //             required: true
    //         },
    //         state:{
    //             type : String,
    //             required: true
    //         },
    //         city:{
    //             type : String,
    //             required: true
    //         },
    //         pin:{
    //             type : Number,
    //             required: true
    //         }
    //     },
    //     correspondence_addr :{
    //         addr1:{
    //             type : String,
    //             required: true
    //         },
    //         addr2:{
    //             type : String,
    //             required: true
    //         },
    //         state:{
    //             type : String,
    //             required: true
    //         },
    //         city:{
    //             type : String,
    //             required: true
    //         },
    //         pin:{
    //         type : Number,
    //         required: true
    //         },
    //     }, 
    // },
    ,createdAt :{
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
    
// userSchema.pre('save', async function(next){
//     if(this.isModified('password')){
//         const hashedPassword = await bcrypt.hash(this.password, 8);
//         this.password = hashedPassword;
//     }
//     next();
//   });
  
userSchema.methods.generateToken = async function (){
    try{
        console.log("1 here")
        const token = jwt.sign({_id: this._id}, process.env.TOKEN_SECRET)
        console.log("2 here")
        // if(this.tokens.length == 0 ){
            this.tokens = this.tokens.concat({token:token})
            console.log("3 here"+token)
            await this.save();  
            console.log("4here ")
        // }
    
        return token

    }catch(err){
        res.status(400).send(`error ${err}`)
        console.log(`error ${err}`) 
    }
}


module.exports = mongoose.model('User', userSchema);
 

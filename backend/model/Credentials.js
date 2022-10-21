const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto")
const jwt = require('jsonwebtoken') 
const res = require('express/lib/response');
//schema to create user
const credentialsSchema = new mongoose.Schema( { 
        
        email:{
            type: String,
            min: 20,
            max:255,
            required : true
        },
        username:{
            type: String,
            required : true
        },
        status:{
            type:String,
            enum:['Pending','Registered'],
            default:"Pending",
            required:true,
        },
        role:{
            type:String,
            enum:['Company','Scholar'],
            required:true,
        },
        createdAt :{
            type: Date,
            default: Date.now
        },
        token: {
            type: String,
            required: true 
        }

});

credentialsSchema.methods.generateToken = async function (){
    try{
        const token = jwt.sign({_id: this._id}, process.env.TOKEN_SECRET);
        this.token = token;
        await this.save();  
        return token;

    }catch(error){
        // res.status(400).send(`error ${err}`)
        console.log(`Catch generateToken: ${error}`) 
    }
}

module.exports = mongoose.model('Credentials', credentialsSchema);
 
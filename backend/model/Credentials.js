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
        console.log("1 1 here credentials")
        const token = jwt.sign({_id: this._id}, process.env.TOKEN_SECRET)
        console.log("2 2 here")
        // if(this.tokens.length == 0 ){
            this.token = token
            console.log("3 3 here"+token)
            await this.save();  
            console.log("4 4 here ")
            return token

    }catch(err){
        res.status(400).send(`error ${err}`)
        console.log(`error ${err}`) 
    }
}

module.exports = mongoose.model('Credentials', credentialsSchema);
 
const mongoose = require('mongoose');
//schema for websitedata
const homeSchema = new mongoose.Schema( { 
        
        hod:{
            name:{
                type: String,
                required:true
            },
            avatar:{
                type: String,
                required:true
            },
            msg:{
                type: String,
                required:true
            }
        },
        advisor:{
            name:{
                type: String,
                required:true
            },
            avatar:{
                type: String,
                required:true
            },
            msg:{
                type: String,
                required:true
            }
        },
        pc:[
            {
                pcname:{
                    type: String,
                    required:true
                },
                course:{
                    type: String,
                    required:true
                },
                year:{
                    type: String,
                    required:true,
                    default: Date.now.getfullyear
                }
            }
        ],
        createdAt :{
            type: Date,
            default: Date.now
        },
        token: {
            type: String,
            required: true 
        }

});

homeSchema.methods.generateToken = async function (){
    try{
        console.log("1 1 here home")
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

module.exports = mongoose.model('home', homeSchema);
 
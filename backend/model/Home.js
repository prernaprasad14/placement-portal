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
        brochures:[{
            brochure:{
                type:String,
            },  
            name: {
                type: String,
                required: [true, "Uploaded file must have a name"],
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }],
        createdAt :{
            type: Date,
            default: Date.now
        },
        token: {
            type: String,
            required: true 
        }

});

module.exports = mongoose.model('home', homeSchema);
 
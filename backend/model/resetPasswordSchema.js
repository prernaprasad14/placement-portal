const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema( { 
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            ref: "Scholar",
            ref: "Company",
            required: true
        },
        email:{
            type: String,
            min: 20,
            max:255,
            required : true
        },
        token:{
            type: String, 
            required : true,
        },
        createdAt:{ 
            type: Date,
            index : {
                expires : 3600
            },
            default: Date.now()
        }
});

module.exports = mongoose.model('ResetPassword', resetPasswordSchema);

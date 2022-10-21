const mongoose = require('mongoose');
const jwt = require('jsonwebtoken') 
const res = require('express/lib/response');
var fs = require('fs'); 
const adminSchema = new mongoose.Schema( { 
        
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        pc:[{
            avatar: {
                name:{
                    type:String,
                    required: true 
                },
                img:{
                    data:Buffer,
                    contentType:String
                }
            },
            email: {
                type: String,
                required: true 
            },
            contact: {
                type: String,
                required: true 
            },
            pcname: {
                type: String,
                required: true 
            },
            course: {
                type: String,
                required: true 
            },
            start_year:{
                type:String,
                default: ''
            },
            end_year:{
                type:String,
                default: ''
            },
        }],
        
        lastLogged:{
            type:Date,
            default:null
        },
        createdAt :{
            type: Date,
            default: Date.now
        },
        lastModified :{
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

adminSchema.methods.insertPcData = async function (pcData, file, index){
    try{ 

        this.pc = this.pc.concat({
            pcname: pcData.pcname.trim(),
            start_year: pcData.start_year.trim(),
            end_year: pcData.end_year.trim(),
            email: pcData.email,
            course: pcData.course,
            contact: pcData.contact,
            avatar:{
                name:file.filename,
                img:{
                    data:fs.readFileSync('uploads/'+file.filename),
                    contentType: file.mimetype
                }
            }
        })
        this.save()
            .then(res=>console.log("then block insertPcData",res))
            .catch(err=>console.log("catch block insertPcData",err))
        }catch(error){
            console.log("Error occurred in insertPcData", error)
        }
}
adminSchema.methods.deletePcData = async function (index){
    try{
        var status2 =true
        await this.pc[index].remove() 
        await this.save();  
        return status2
    }catch(error){
        console.log("Error occurred in deletePcData", error)
    }
}
adminSchema.methods.updatePcAvatar = async function ( file,index){
    try{
        const status=0 
        console.log(file, file.filename, index)
        this.pc[index].avatar.name= file.filename,
        this.pc[index].avatar.img= {
            data:fs.readFileSync('uploads/'+file.filename),
            contentType: file.mimetype
        }
        this.save()
        .then(res=>console.log("then block",res.pc[0].avatar.name))
        .catch(err=>console.log("catch block",err))
        return status
    }catch(error){
        console.log("Error occurred in updatePcAvatar ", error)
    }
}
adminSchema.methods.updatePcData = async function (pcData, index){
    try{
        console.log("updatePcData ")
        var status2 =true
            if(this.pc[index].pcname !== pcData.pcname.trim()){
                this.pc[index].pcname = pcData.pcname.trim()
            }
            if(this.pc[index].start_year !== pcData.start_year ) {
                this.pc[index].start_year = pcData.start_year
            }
            if(this.pc[index].end_year !== pcData.end_year ) {
                this.pc[index].end_year = pcData.end_year.trim()
            }
            if(this.pc[index].email !== pcData.email ) {
                this.pc[index].email = pcData.email
            }
            if(this.pc[index].course !== pcData.course ) {
                this.pc[index].course = pcData.course
            }
            if(this.pc[index].contact !== pcData.contact) {
                this.pc[index].contact = pcData.contact
            }
            this.lastModified =  new Date().getTime()
            await this.save();  
            console.log("updatePcData completed ")
        return status2
    }catch(error){
        console.log("Error occurred in updatePcData", error)
    }
}

adminSchema.methods.generateToken = async function (){
    try{
        const token = jwt.sign({_id: this._id}, process.env.TOKEN_SECRET)
        this.tokens = this.tokens.concat({token:token})
        await this.save(); 
        return token

    }catch(error){
        console.log("Error occurred in admin-generateToken", error)
    }

}

module.exports = mongoose.model('Admin', adminSchema);
 
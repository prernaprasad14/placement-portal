const dotenv = require('dotenv');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Admin = require('../../model/Admin');
const Home = require('../../model/Home');
const Scholar = require('../../model/Scholar');
const Company = require('../../model/Company');
const Credentials = require('../../model/Credentials');
const {authenticateUser}= require('../../middleware/authenticate')
const {validateScholarCreate, validateCompanyCreate, validate, validateFooterForm,validatePcInfoUpdate}=require('../../userinputvalidation');
const { generateCreateUserMail,generateContactFormMail} = require('../../mail');
const { mailTransport} = require('../../mail');
const{ join, sep} =require('path');
const multer=require('multer');

const csv =  require('csv-parser');
const { Readable} = require('stream');
const GridFsStream = require('gridfs-stream');
const {GridFsStorage} = require('multer-gridfs-storage');
const methodOverride = require('method-override');




// Create mongo connection
const mongoose = require('mongoose');
const { json } = require('body-parser');
const { update } = require('../../model/Scholar');
const conn = mongoose.connection;
dotenv.config();

gridfsBucket;
var gridfsBucket;
conn.once('open', () => {
  // Init stream
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//   gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  })
  gfs = GridFsStream(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

router.use(methodOverride('_method'));

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.DB_CONNECT,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
    //   crypto.randomBytes(16, (err, buf) => {
    //     if (err) {
    //       return reject(err);
    //     }
        // const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileId = new mongoose.mongo.ObjectId(req.params.id)
        console.log(fileId)
        console.log(file)
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
    //   });
    });
  }
});
var diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
const uploadToDb = multer({storage});
const upload = multer({storage:diskStorage});
const uploadcsv = multer();


//admin profile routes
router.get('/profile', authenticateUser ,async(req, res)=>{
    try{
        console.log("GET /profile")
         const admin = await Admin.findOne({},{password:0, token:0})

            if(!admin){
                return res.status(404).json({success:false, message:"Admin profile not found"})
            }
            return res.status(200).json({success: true, message:"Retrieved admin profile" , admin: admin})
     
    }catch(error){
        console.log("Error occurred in GET /profile",error)
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
});

router.get('/pc-avatar',authenticateUser, async function (req, res) {
    try{
        console.log("GET /pc-avatar")
     console.log(req.query.id)
         const user = await Admin.findOne({'pc._id': req.query.id})
         console.log(user)
         console.log(user.pc)
         if(!user){
             res.status(404).josn({success:false, message:"Resource not found"})
         }
         const index= user.pc.findIndex((pc,index)=>{
             temp = pc._id.toString()
             const rs = temp===req.query.id
             console.log(pc._id)
             console.log(req.query.id)
             console.log(index)
             console.log("rs = temp===pcData.id :",rs)
             return rs 
         })
         console.log(index)
         const data = {
             avatar:user.pc[index].avatar
         }
            
         res.status(200).json({success:true, message:"Retrieved avatar", data})
       
     }catch(error){
         console.log("Error occurred in GET /pc-avatar",error)
         res.status(500).json({success:false, message:"Internal Server Error"})
     }
 
 });

router.delete('/pc-info', authenticateUser, async(req,res)=>{
    try{    
        if(req.role==='admin'){

            console.log("DELETE /pc-info")
            const pcData = req.body
            console.log("pcData receieved" ,pcData)
            const obj_id = new mongoose.Types.ObjectId(pcData);
            const user = await Admin.findOne({"pc._id":obj_id})
            
            if(!user){
                console.log("!user" , !user)
                res.status(412).json({status:false, message:"The data doesn't exist anymore, try refreshing"})
                
            }else{
                if(user.pc.length<=6){
                    console.log("user.pc.length<=6" , user.pc.length<=6)
                    res.status(412).json({status:false, message:"Minimum of 6 Placement coordinator data is required"})
                }
                else{
                    console.log("user.pc.length<=6" , user.pc.length<=6)
                    const pc=user.pc
                    var temp;
                    const pcid= pc.findIndex((pc,index)=>{
                        temp = pc._id.toString()
                        const rs = temp===pcData.id
                        return rs 
                    })

                    user.deletePcData(pcid)
                    res.status(200).json({success:true, message:"Successfully deleted"})
                
                }
            }
        }
    }catch(error){
        console.log("Error occurred in DELETE /pc-info",error)
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
});

router.post('/pc-info', authenticateUser, upload.single('file') ,async(req,res)=>{
   try{ 
       console.log("POST /pc-info")
        if(req.role==='admin'){
            console.log(req.file)
            console.log(req.body)

            const pcData = req.body
            console.log(req.file.filename)
            const user = await Admin.findOne({email:process.env.ADMIN_EMAIL})
            // const pc=user.pc
            if(pc.length>=8){
                        res.status(412).json({status:false, message:"Reached max limit"})
            }
            else{
                
                const status_= user.insertPcData(pcData, req.file, pc.length)
                console.log(status_)
                console.log("back")
                res.status(200).json({success:true, message:"Successfully added"})
            }
        
        }else{
            res.status(500).json({success:false, message:"Bad request"})
        }
    }catch(error){
        console.log("Error occurred in POST /pc-info",error)
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
});

router.patch('/pc-avatar', authenticateUser, upload.single('file') , async(req,res)=>{
    try{    
        if(req.role==='admin'){
            console.log("PATCH /pc-avatar");
            // const file = req.file
            // const id= req.body._id 
            console.log("file receieved" ,req.file);

            // var img = fs.readFileSync(req.file.path);
            //     var encode_img = img.toString('base64');
            //     var final_img = {
            //         contentType:req.file.mimetype,
            //         image:new Buffer(encode_img,'base64')
            //     };
            const id= req.body.id;
            const obj_id = new mongoose.Types.ObjectId(id);
            const user = await Admin.findOne({"pc._id":obj_id})
            if(!user){
                res.status(403).json({success:false, message:"The user corresponding to request not found"})
            }
            else{
                const pc=user.pc
                var temp;
                const pcid= pc.findIndex((pc,index)=>{
                    temp = pc._id.toString()
                    const rs = temp===id
                    return rs 
                })
                    console.log("pcid",pcid)
                if(pcid!=-1){
                    const x= user.updatePcAvatar(req.file, pcid)
                    console.log(x)
                    res.status(200).json({success:true, message:"Successfully updated"})
                }
            }
            // const status = user.updatePcAvatar(req.file,)           
            // console.log(user)
            // await user.save()
            // .then(res=>console.log("1",res))
            // .catch(res=>console.log("2",res))
            console.log("user" , user)
        }
    }catch(error){
        console.log("Error occurred in PATCH /pc-avatar",error)
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
});

router.patch('/pc-info', authenticateUser,validatePcInfoUpdate, async(req,res)=>{
    try{    
        if(req.role==='admin'){

            console.log("PATCH /pc-info")
            const pcData = req.body

            const obj_id = new mongoose.Types.ObjectId(pcData._id);
            
            const user = await Admin.findOne({"pc._id":obj_id})
            if(!user){
                res.json({success:false, message:"the resource you are trying to update doesnt exists"})
                const newPc = await Admin.findOne({email:process.env.ADMIN_EMAIL})
                if(!newPc){
                    res.json({success:false, message:"cannot find email corresponding to the request"})
                }
                else{
                        if(newPc.pc.length>=10){
                            res.status(412).json({status:false, message:"Reached max limit"})
                        }
                        else{
                            console.log(pcData)
                            newPc.updatePcData(pcData)
                            // res.status(200).json({success:true, message:"Successfully added"})
                        } 
                }
            } else{
                const pc=user.pc
                var temp;
                const pcid= pc.findIndex((pc,index)=>{
                    
                    temp = pc._id.toString()
                    const rs = temp===pcData._id
                    console.log(pc._id)
                    console.log(pcData._id)
                    console.log(index)
                    console.log(rs)
                    return rs }
                    )
                    console.log("pcid",pcid)
                    if(pcid!=-1){
                        const x= user.updatePcData(pcData, pcid)
                        console.log(x)
                        res.status(200).json({success:true, message:"Successfully updated"})
                    }
                }
            }
        }catch(error){
            console.log("Error occurred in PATCH /pc-info",error)
            res.status(500).json({success:false, message:"Internal Server Error"})
        }
});


router.get('/scholar-details/:id', authenticateUser, async(req, res)=>{
    try{
        console.log(`GET /scholar-details/${req.params.id}`)
        if(req.role==='admin'){
            const _id= req.params.id
            const scholar = await Scholar.findOne({_id},{password:0, token:0})
            res.status(200).json({success:true, scholar, role:req.role})
        }else{
            console.log(req.role)
            res.status(403).json({message:"Not authorized", role:req.role})
        }
    }catch(error){
        console.log(`Error occurred in GET /scholar-details/:id while getting the id : ${req.params.id}`,error)
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
});
// router.get('/scholar-personal-details/:id', authenticateUser, async(req,res)=>{
//     try{    
//         if(req.role==='admin'){
//             console.log("GET /update-scholar-personal-details")
//             console.log(req.params)
//             const user = await Scholar.findOne({_id:req.params.id})
//             if(!user){
//                 res.status(404).json({success:false, message:"Cannot retrieved updated info at the moment"})
//             }
//             const personalDetails = {
//                 fname:user.fname,
//                     lname:user.lname,
//                     dob:user.dob,
//                     gender:user.gender,
//                     phone:user.phone,
//                     alternative_phone:user.alternative_phone,
//                     perma_addr1:user.perma_addr1,
//                     perma_addr2:user.perma_addr2,
//                     perma_state:user.perma_state,
//                     perma_city:user.perma_city,
//                     perma_pin:user.perma_pin,
//                     corr_addr1:user.corr_addr1,
//                     corr_addr2:user.corr_addr2,
//                     corr_state:user.corr_state,
//                     corr_city:user.corr_city,
//                     corr_pin:user.corr_pin
//             }
//             res.status(200).json({success:true, message:"retrieved updated info", personalDetails})
     
//     }
// }catch(err){
    
//     res.status(500).json({success:false})
//     console.log("error /scholar-placement-details/:id", err)
//     }
// });

// router.get('/scholar-postgraduation-details/:id', authenticateUser, async(req,res)=>{
//     try{    
//         if(req.role==='admin'){
//             console.log("GET /request scholar-postgraduation-details")
//             console.log(req.params)
//             const user = await Scholar.findOne({_id:req.params.id})
//             if(!user){
//                 res.status(404).json({success:false, message:"Cannot retrieved updated info at the moment"})
//             }
//             const pgDetails = {
//                 pg_course:user.pg_course,
//                 pg_exam_roll:user.pg_exam_roll,
//                 pg_class_roll:user.pg_class_roll,
//                 pg_aggr_percentage:user.pg_aggr_percentage,
//                 pg_backlogs:user.pg_backlogs,
//                 pg_backlog_details:user.pg_backlog_details
//             }
//             res.status(200).json({success:true, message:"retrieved updated info", pgDetails})
     
//     }
// }catch(err){
    
//     res.status(500).json({success:false})
//     console.log("error GET /scholar-postgraduation-details", err)
//     }
// });
// router.get('/scholar-graduation-details/:id', authenticateUser, async(req,res)=>{
//     try{    
//         if(req.role==='admin'){
//             console.log("GET /request -scholar-graduation-details")
//             console.log(req.params)
//             const user = await Scholar.findOne({_id:req.params.id})
//             if(!user){
//                 res.status(404).json({success:false, message:"Cannot retrieved updated info at the moment"})
//             }
//             const gradDetails  = {
//                 grad_college:user.grad_college,
//                 grad_university:user.grad_university,
//                 grad_course:user. grad_course,
//                 grad_roll_no:user.grad_roll_no,
//                 grad_marks_obtained:user.grad_marks_obtained,
//                 grad_max_marks:user.grad_max_marks,
//                 grad_aggr_percentage:user.grad_aggr_percentage,
//                 grad_year_of_passing:user.grad_year_of_passing
                
//             }
//             res.status(200).json({success:true, message:"retrieved updated info", gradDetails})
     
//     }
// }catch(err){
    
//     res.status(500).json({success:false})
//     console.log("error /scholar-graduation-details/:id", err)
//     }
// });
// router.get('/scholar-intermmediate-details/:id', authenticateUser, async(req,res)=>{
//     try{    
//         if(req.role==='admin'){
//             console.log("GET /update-scholar-inter-details")
//             console.log(req.params)
//             const user = await Scholar.findOne({_id:req.params.id})
//             if(!user){
//                 res.status(404).json({success:false, message:"Cannot retrieved updated info at the moment"})
//             }
//             const interDetails  = {
//                inter_board : user.inter_board,
//                inter_roll_no : user.inter_roll_no,
//                inter_marks_obtained : user.inter_marks_obtained,
//                inter_max_marks : user.inter_max_marks,
//                inter_aggr_percentage : user.inter_aggr_percentage,
//                inter_year_of_passing : user.inter_year_of_passing
                
//             }
//             res.status(200).json({success:true, message:"retrieved updated info",interDetails})
     
//     }
// }catch(err){
    
//     res.status(500).json({success:false})
//     console.log("error /scholar-inter-details/:id", err)
//     }
// });
// router.get('/scholar-highschool-details/:id', authenticateUser, async(req,res)=>{
//     try{    
//         if(req.role==='admin'){
//             console.log("GET /update-scholar-highschool-details")
//             console.log(req.params)
//             const user = await Scholar.findOne({_id:req.params.id})
//             if(!user){
//                 res.status(404).json({success:false, message:"Cannot retrieved updated info at the moment"})
//             }
//             const highschoolDetails  = {
//                 high_board : user.high_board,
//                 high_roll_no : user.high_roll_no,
//                 high_marks_obtained : user.high_marks_obtained,
//                 high_max_marks : user.high_max_marks,
//                 high_aggr_percentage : user.high_aggr_percentage,
//                 high_year_of_passing : user.high_year_of_passing
                
//             }
//             res.status(200).json({success:true, message:"retrieved updated info",highschoolDetails})
     
//     }
// }catch(err){
    
//     res.status(500).json({success:false})
//     console.log("error /scholar-highschool-details/:id", err)
//     }
// });
// router.get('/scholar-placement-details/:id', authenticateUser, async(req,res)=>{
//     try{    
//         if(req.role==='admin'){
//             console.log("GET /update-scholar-placement-details")
//             console.log(req.params)
//             const user = await Scholar.findOne({_id:req.params.id})
//             if(!user){
//                 res.status(404).json({success:false, message:"Cannot retrieved updated info at the moment"})
//             }
//             const placementDetails = user.placementDetails
//             res.status(200).json({success:true, message:"retrieved updated info", placementDetails})
     
//     }
// }catch(err){
    
//     res.status(500).json({success:false})
//     console.log("error /scholar-placement-details/:id", err)
//     }
// });

router.patch('/update-scholar-placement-details', authenticateUser, async(req,res)=>{
    try{    
        if(req.role==='admin'){

            console.log("PATCH /update-scholar-placement-details")
            const data = req.body
            const _id =  data.id
            const user = await Scholar.findOne({_id})
            const result= user.updatePlacementDetails(data)
            res.status(200).json({success:true, message:"Updated Successfully"})
        }
        else{
            res.status(403).json({success:false, message:"Unauthorized"})
        }
    }catch(error){
        console.log("Error occurred in PATCH /update-scholar-placement-details",error)
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
});
router.patch('/update-scholar-pg-details', authenticateUser, async(req,res)=>{
    try{    
        if(req.role==='admin'){

            console.log("PATCH /update-scholar-pg-details")
            const data = req.body
            console.log("data receieved" ,data)
            const _id =  data.id
            const user = await Scholar.findOne({_id})
            console.log(data)
            const result= user.updatePostGraduationDetails(data)
            console.log(result)
            res.status(200).json({success:true, message:"Updated Successfully"})
            }
            else{
                res.status(403).json({success:false, message:"Unauthorized"})
            }

    }catch(error){
        console.log("Error occurred in PATCH /update-scholar-inter-details",error)
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
});
router.patch('/update-scholar-inter-details', authenticateUser, async(req,res)=>{
    try{    
        if(req.role==='admin'){

            console.log("PATCH /update-scholar-inter-details")
            const data = req.body
            console.log("data receieved" ,data)
            const _id =  data.id
            const user = await Scholar.findOne({_id})
            console.log(data)
            const result= user.updateIntermmediateDetails(data)
            console.log(result)
            res.status(200).json({success:true, message:"Updated Successfully"})
            }
            else{
                res.status(403).json({success:false, message:"Unauthorized"})
            }
    }catch(error){
        console.log("Error occurred in PATCH /update-scholar-inter-details",error)
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
});
router.patch('/update-scholar-grad-details', authenticateUser, async(req,res)=>{
    try{    
        if(req.role==='admin'){
                console.log("PATCH /update-scholar-grad-details")
                const data = req.body
                console.log("data receieved" ,data)
                const _id =  data.id
                const user = await Scholar.findOne({_id})
                console.log(data)
                const result= user.updateGraduationDetails(data)
                console.log(result)
                res.status(200).json({success:true, message:"Updated Successfully"})
            }
            else{
                res.status(403).json({success:false, message:"Unauthorized"})
            }
    }catch(error){
        console.log("Error occurred in PATCH /update-scholar-grad-details",error)
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
});
router.patch('/update-scholar-highschool-details', authenticateUser, async(req,res)=>{
    try{    
        if(req.role==='admin'){

            console.log("PATCH /update-scholar-highschool-details")
            const data = req.body
            console.log("data receieved" ,data)
            const _id =  data.id
            const user = await Scholar.findOne({_id})
            console.log(data)
            const result= user.updateHighSchoolDetails(data)
            console.log(result)
            res.status(200).json({success:true, message:"Updated Successfully"})
            }
            else{
                res.status(403).json({success:false, message:"Unauthorized"})
            }

    }catch(error){
        console.log("Error occurred in PATCH /update-scholar-highschool-details:",error)
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
});
router.patch('/update-scholar-personal-details', authenticateUser, async(req,res)=>{
    try{    
        if(req.role==='admin'){

            console.log("PATCH /update-scholar-personal-details")
            const data = req.body
            console.log("data receieved" ,data)
            const _id =  data.id
            const user = await Scholar.findOne({_id})
            const result= user.updatePersonalDetails(data)

            res.status(200).json({success:true, message:"Updated Successfully"})
            }
            else{
                res.status(403).json({success:false, message:"Unauthorized"})
            }

    }catch(error){
        console.log("Error occurred in PATCH /update-scholar-personal-details",error)
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
});

//manage-users routes
router.get('/users',authenticateUser, async(req, res)=>{
    try{
        if(req.role==='admin'){
        const createdUsers = await Credentials.find({})
        const scholars = await Scholar.find({},{pg_class_roll:1,fname:1,lname:1,username:1, email:1,_id:0}).sort({fname:1})
        const companies = await Company.find({},{username:1, email:1,_id:0}).sort({fname:1})
        res.status(200).json({success:true, scholars, companies, createdUsers})
        }else{
            res.status(403).json({message:"Unuthorized"})
        }
    }catch(error){
        
        console.log("Error occurred in GET /users", error)
        res.status(500).json({success:false, message:"Internal Server Error"})

    }
});

router.post('/create-users', authenticateUser, uploadcsv.single('file'), async(req,res)=>{
    try{
        var t0=0,t1=0 //variables to calculate delay time for stream
        if(req.role==='admin'){       
            const date = new Date()
            console.log("1 req reached to file route 1")
            console.log(req.file)
            const data = req.file.buffer.toString('utf8');
            console.log("2 data",typeof data);
            const stream = Readable.from(req.file.buffer);
            let results = [];
            var existingUsers=[];
            var createdUsers=[];
           
            const reading= async(data) =>{
                const emailExists= await Credentials.findOne({email:data.email})
                    
                if(!emailExists){
                    const user = new Credentials({email:data.email, username: data.username, role:data.role})
                    await user.generateToken();
                    await user.save();
                    const role =data.role.toLowerCase();
                    mailTransport().sendMail({
                    from: process.env.ADMIN_EMAIL,
                    to: `${user.email}`,
                    subject: `Registration for DUCS Placement Cell for session ${date.getFullYear()}`,
                    attachments: [{
                        filename: 'logo.png',
                        path: join(__dirname, sep, '..','img','logo.png'),
                        cid: 'logo'
                    }], 
                    html: generateCreateUserMail(`http://localhost:3000/${role}-registration?email=${user.email}&username=${user.username}&token=${user.token}`, user.username ),
                    });
                    createdUsers.push(data.email)
                }else{
                    existingUsers.push(data.email)   
                }
            }

            const readCsv =async()=>{
                t0= performance.now();                 
                stream.pipe(csv({separator:','}))
                .on('data',  async(data) => {
                    console.log(createdUsers,existingUsers);
                    await reading(data)
                })
                .on('end', async() => {
                        console.log('All the data is being consumed.');
                });
                t1= performance.now();
            }
        
            const completed = await readCsv()
            setTimeout(()=>{
                
                console.log("results",results ,"completed",completed)
                console.log("createdUsers",createdUsers,"existingUsers",existingUsers)
                console.log("return from readCSv")
                const users =[createdUsers, existingUsers]
                res.status(200).json({success:true, message:"Request completed", users})
            },1000)
            
        }else{
            console.log(error)
            return res.status(403).json({success:false, message:"Unauthorized"  })
        }
     
    }catch(error){
        console.log("Error occurred in POST /create-user/scholar", error)

        return res.status(501).json({success:false, message:"Server does not fully support this functionality yet!"  })
        
    }
    
});
router.post('/create-users', authenticateUser, uploadcsv.single('file'), async(req,res)=>{
    try{
        if(req.role==='admin'){       
        const date = new Date()
        console.log("req reached to file route")
        console.log(req.file)
        const data = req.file.buffer.toString('utf8');
        console.log("data",data);
        const stream = Readable.from(req.file.buffer);
        let results = [];
        var existingUsers=[];
        var createdUsers=[];
        
       const {createdUser, existingUser}= stream.pipe(csv({separator:','}))
        .on('data',  (data) => {
          
            results.push(data);
            results.map(async(data)=>{
                if(data.role==='scholar'){
                    //checking if Scholar already registered ,if not create an entry in the Credentials schema & generate email
                    const scholarExists= await Scholar.findOne({email:data.email})
                    if(!scholarExists) {
                        const emailExists= await Credentials.findOne({email:data.email})
                        if(!emailExists){
                            const user = new Credentials({email:data.email, username: data.username, role:data.role})
                            await user.generateToken();
                            console.log("generated token")
                            await user.save()
                            console.log("saved user")

                            mailTransport().sendMail({
                            from: process.env.ADMIN_EMAIL,
                            to: `${user.email}`,
                            subject: `Registration for DUCS Placement Cell for session ${date.getFullYear()}`,
                            attachments: [{
                                filename: 'logo.png',
                                path: join(__dirname, sep, '..','img','logo.png'),
                                cid: 'logo'
                            }], 
                            html: generateCreateUserMail(`http://localhost:3000/scholar-registration?email=${user.email}&username=${user.username}&token=${user.token}`, user.username ),
                            });
                            console.log("email from")
                            console.log("1",createdUsers);
                            createdUsers.push(data.email)
                            console.log("2",createdUsers);

                        }
                        console.log("existingUsers",existingUsers);
                        existingUsers.push(data.email)
                    }
                     else{
                        console.log("scholar exists")
                         console.log(existingUsers);
                         existingUsers.push(data.email)  
                     } 
                }
                else{
                    //otherwise check if Company already registered, if not create an entry in the Credentials schema & generate email
                    const companyExists= await Company.findOne({email:data.email})
                    if(!companyExists){
                    
                        const emailExists= await Credentials.findOne({email:data.email})
                        if(!emailExists){
                            const user = new Credentials({email:data.email, username: data.username, role:data.role})
                            await user.generateToken();
                            console.log("generated token")
                            user.save()
                            .then(res=>console.log(res))
                            .catch(err=>console.log(err))
                            console.log("saved user")
                        
                            mailTransport().sendMail({
                                from: process.env.ADMIN_EMAIL,
                                to: `${user.email}`,
                                subject: `Registration for DUCS Placement session ${date.getFullYear()}`,
                                attachments: [{
                                    filename: 'logo.png',
                                    path: join(__dirname, sep, '..','img','logo.png'),
                                    cid: 'logo'
                                }],
                                html: generateCreateUserMail(`http://localhost:3000/company-registration?email=${user.email}&username=${user.username}&token=${user.token}`, user.username ),
                        
                            });
                            console.log("email from")
                            createdUsers.push(data.email)
                        }
                        console.log("existingUsers",existingUsers);
                        console.log(existingUsers.length)
                        console.log(createdUsers.length)
                       existingUsers.push(data.email) 

                    }
                    else {
                        console.log("company exists")
                        console.log("existingUsers",existingUsers);
                        existingUsers.push(data.email)
                    }
                }
            });
        })
        .on('end', () => {
            return createdUsers, existingUsers
        })
        const isFinished= await finishedAsync(stream)
        if(isFinished){
            console.log(createdUser, existingUser)
        }
        // if(createdUsers.length>0)
        // return res.status(200).json({success:true, message: `Request completed, created multiple users`, createdUsers, existingUsers})
    
    
        }else{
            return res.status(403).json({success:false, message:"Unauthorized"  })
        }
     
    }catch(error){
        console.log("Error occurred in POST /create-users", error)
        return res.status(501).json({success:false, message:"Server does not fully support this functionality yet!"  })
        
    }
    
});

router.post('/create-user/scholar', validateScholarCreate, validate, async(req,res)=>{
    try{ 

        const scholarExists= await Scholar.findOne({"email":req.body.email  })

        if(scholarExists){
            return res.status(412).json({success: false, message:"Already registered"})
        }

        const emailExists = await Credentials.findOne({"email":req.body.email})
      
        if(!emailExists) 
        {   const user = new Credentials({email:req.body.email, username: req.body.username, role:"Scholar"})
      
            await user.generateToken();
            await user.save()
        
            const date = new Date()
      
            mailTransport().sendMail({
                from: process.env.ADMIN_EMAIL,
                to: `${user.email}`,
                subject: `Registration for DUCS Placement Cell for session ${date.getFullYear()}`,
                attachments: [{
                    filename: 'logo.png',
                    path: join(__dirname, sep, '..','img','logo.png'),
                    cid: 'logo'
                }],
               
                html: generateCreateUserMail(`http://localhost:3000/scholar-registration?email=${user.email}&username=${user.username}&token=${user.token}`, user.username ),
        
            }).then(info => {
                console.log(info)
                return res.json({success:true, message:`Email has been sent to ${user.email}`})  
            }).catch(error=>console.error(error));

        }else{
            return res.status(412).json({success: false, message:`Link for registration has already been sent at ${emailExists.email}`})  
        }
      
    }catch(error){
        console.log("Error occurred in POST /create-user/scholar", error)
        return res.status(500).json({success:false, error:'Internal Server Error'})
    }
}); 

router.post('/create-user/company', validateCompanyCreate, validate, async(req,res)=>{

    try{ 
        console.log("POST /create-user/company")
        const companyExists= await Company.findOne({email:req.body.email})
        if(companyExists) return res.json({success: false, message:"Already registered user"})
        const emailExists= await Credentials.findOne({email:req.body.email})

        if(!emailExists){
            const user = new Credentials({email:req.body.email, username: req.body.username , role:"Company"})
            await user.generateToken();
            await user.save()

            const hash = await bcrypt.hash(user.username, 8)
            const date = new Date()

            mailTransport().sendMail({
                from: process.env.ADMIN_EMAIL,
                to: `${user.email}`,
                subject: `Registration for DUCS Placements session ${date.getFullYear()}`,
                attachments: [{
                    filename: 'logo.png',
                    path: join(__dirname, sep, '..','img','logo.png'),
                    cid: 'logo'
                }],
                html: generateCreateUserMail(`http://localhost:3000/company-registration?email=${user.email}&username=${user.username}&token=${user.token}`, user.username ),

            }).then(info => {
                console.log({info}); 
                console.log(`Email sent on ${user.email}`);
                return res.json({success:true, message:`Email has been sent at ${user.email}`})  
            }).catch(error=>{
                console.error(error)
            });
            
            return res.status(200).json({success:true, message:`Email has been sent at ${user.email}`})
        }
        return res.status(412).json({success:false, message:`Link for registration has already been sent at ${emailExists.email}`})  
    
    }catch(error){
        console.log("Error occurred in POST /create-user/company", error)
        return res.status(500).json({success:false, error:'Internal Server Error'})
    }
    
}); 

//footer form route
router.post('/letters', validateFooterForm, validate, async(req,res)=>{
    try{
        console.log("POST /letters")
        const {username, email, msg, subject} = req.body
        mailTransport().sendMail({
            from: `${email}`,
            to: process.env.ADMIN_EMAIL,
            subject: `${subject}`,
            html: generateContactFormMail(username, email, msg ),
        }).then(info => {
            console.log({info});
            return res.status(200).json({success:true, message:"Your message has been sent"})
        }).catch((error)=>{
            return res.status(400).json({success:false, error:'Error sending email'})
        })
    }catch(error){
        console.log(`Error occurred in POST /letters`, error);
        return res.status(500).json({success:false, error:'Internal Server Error'})

    }
});

router.get('/brochure/:id', async(req, res)=>{
    try{
        console.log(`GET /brochure/${req.params.id}`)
        const fileId = new mongoose.mongo.ObjectId(req.params.id)
         const s = gfs.files.findOne({_id: fileId},(err, file)=>{
             if(err){
                 res.send(err)
             }
             if(!file || file.length===0){
                 return res.status(404).json({success:false, err:'File not found'});
             }
             console.log(file._id)
             if(file.contentType==='application/pdf')
             {   
                 var readStream = gridfsBucket.openDownloadStream(file._id);
                 var bufs = [];
                 readStream.on('data', function (chunk) {
                 bufs.push(chunk);
                 }).on('error', function () {
                     res.send();
                 })
                 .on('end', function () {
                     var fbuf = Buffer.concat(bufs);
                     const pdfFile= fbuf.toString('base64')
                     // readStream.pipe(res)
                     return res.status(200).json(pdfFile);
                 });    
             }
         })    
    }catch(error){
        console.log(`Error occurred in GET /brochure/${req.params.id}`, error)

        return res.status(500).json({success:false, error})
    }
            
});
 
router.post('/uploads/brochure' ,uploadToDb.single('file'), async(req,res)=>{
   try{
        console.log("POST /uploads/brochure")
        const file = req.file
       
        if(file.contentType!=='application/pdf'){
                res.status(415).json({success:false, message:"Only *.pdf is allowed"})
        }
        res.status(201).json({success:true, message:"File uploaded successfully"})
    }
    catch(error){
        console.log("Error occurred in POST /uploads/brochure", error)

       return res.status(500).json({success:false, error})
    }
});

router.delete('/brochure/:id', async(req, res)=>{
    try {
        console.log(`DELETE /brochure/${req.params.id}`)
        const fileExists = await gridfsBucket.find({ _id: req.params.id });
        if(!fileExists){
        
            return res.status(412).json({success:false, message:"The file no longer exists! Please refresh"});
        }
        const obj_id = new mongoose.Types.ObjectId(req.params.id);
        if(!obj_id){
            return res.status(412).json({success:false, message:"The file no longer exists! Please refresh"});
        }
        await gridfsBucket.delete( obj_id );
        return res.status(200).json({success:true, message:"File deleted successfully !"});
    }catch (error) {
        console.log(`Error occurred in DELETE /brochure/${req.params.id}`, error);
        return res.status(500).send("Server Error");
    } 
});

module.exports = router;


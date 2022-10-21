import { useNavigate} from 'react-router';
import { useState, useEffect, useContext ,useRef} from 'react'
import axios from '../../axiosConfig'
import Loading from '../Loading';
import Card from '../Card';
import validator from 'validator';
import { UserContext } from '../../App';
import {HiUserCircle } from 'react-icons/hi'    
import {RiEdit2Fill} from 'react-icons/ri'
import {SiAddthis} from 'react-icons/si'
import { getParsedDate } from '../../helpers/getParsedDate';


const AdminProfile=()=>{
    document.title='Profile | DUCS Placement Portal'
    const {state, dispatch}= useContext(UserContext)
    const navigate = useNavigate();
    const [admin, setAdmin]= useState('')
    const [course, setCourse]= useState('Master of Computer Applications')
    const [isLoading, setIsLoading]= useState(true)
    const [pcData, setPcData] = useState('')
    const [message, setMessage] = useState('')
    const [isActive, setisActive] = useState(false)
    const [isEditMode , setIsEditMode] = useState(false)
    const [file, setFile] = useState('')
    const [isFileEmpty, setIsFileEmpty] = useState('')
    const [fileName, setFileName] = useState('')
    const [profile, setProfile]= useState('')
    // const [isLoggedIn , setIsLoggedIn] = useState(false)
    const data = pcData
    console.log(data)
    const getData=()=>{
        axios.get(`api/admin/profile`)
        .then((res)=>{
            console.log(res)
            const admin = res.data.admin;
            setAdmin(admin);
            // setIsUpdatingImg(true)
            setPcData(admin.pc)
            // setIsUpdatingImg(false)

            setIsLoading(false)
            const base64String = btoa( String.fromCharCode(...new Uint8Array(admin.pc[0].avatar.img.data.data)));
            setProfile(base64String)
        }).catch(error=> {
            console.log('Error getAdmin : '+error)
            console.log(error.response)
            if(error.response.status=='401'){
            dispatch({type:'USER', role:'USER'})
            navigate('/login')
            }
            if(error.response.status=='403'){
            dispatch({type:'LOGGEDIN', role : state})
            navigate('/forbidden')
            }
            if(error.response.status=='500'){
            dispatch({type:'LOGGEDIN', role : state})
            navigate('/internal-server-error')
            }
        }) 
    }
   
    const getAvatar=(index)=>{
        
        console.log(pcData)
        console.log(data)
    //     Object.entries(pcData).map(data=>{
    //         console.log(data[1]._id)
            const updatedImg = [...pcData]
            axios.get(`api/admin/pc-avatar?id=${pcData[index]._id}`)
            .then((res)=>{
                console.log(res)
                updatedImg[index].avatar=res.data.data.avatar
                updatedImg[index].success=res.data.message
                setPcData(updatedImg)
            }).catch((error)=>{
                updatedImg[index].error =  error.response
                setPcData(updatedImg)
                console.log(error)
            })
    //   })
    
    }
    const getAdmin=()=>{
        console.log('inside getAdmin')
        getData()

    // axios.get(`api/admin/pc-avatar?id=${data[1]._id}`)
    //         .then(res=>{
    //             console.log(res)
    //         }).catch(err=>{
    //             console.log(err)
    //         })
    //   })
    }
        
    const [isDeleted, setIsDeleted]=useState('')

    // const [users, setUsers]=useState(new Array(6).fill({
    //     index:'',
    //     pcname:'',
    //     avatar:'',
    //     email:'',
    //     contact:'',
    //     course:'',
    //     start_year:'',
    //     end_year:'',
    //     // isUpdatingImg:false,
    //     // fileError:false
        
    // }))
    const [maxedOut, setMaxedOut]=useState('')
    var count=-1
    const handleAddField=(e)=>{
        e.preventDefault();
        console.log('add field')
        setPcData([...pcData, {
            _id:'NA',
            file:'NA',
            pcname:'',
            avatar:'',
            email:'',
            contact:'',
            course:'',
            start_year:'',
            end_year:'',
            // isUpdatingImg:false,
            // fileError:false
        } ])
        // setUsers(users=>[...users,<PCInfo/>])
        // console.log(users)
    }
    const handleUpdate=(index,e)=>{
        try{
            e.preventDefault();
            console.log('handleUpdate')
            const err= [...pcData]
 
            if(pcData[index].course===''||
                pcData[index].start_year===''||
                pcData[index].end_year===''||
                pcData[index].contact===''||
                pcData[index].pcname===''||
                pcData[index].avatar===''){
                    console.log("1")
                    console.log(err[index].success)
                    console.log(pcData[index]._id,
                        pcData[index].email, pcData[index].pcname, pcData[index].contact, pcData[index].start_year, pcData[index].end_year, pcData[index].course, pcData[index].avatar)
                        
                    err[index].error = 'Fill all the fields'
                    setPcData(err)
            }else if(pcData[index].end_year<=pcData[index].start_year){
                        
                err[index].error = 'Start year must be earlier than End year'
                setPcData(err)

            }else if(pcData[index].course==='Master of Computer Applications' && (pcData[index].end_year-pcData[index].start_year<3 || pcData[index].end_year-pcData[index].start_year>3)){
                        console.log()
                err[index].error = 'Master of Computer Applications is a 3 year program, check provided values carefully'
                setPcData(err)

            }else if(pcData[index].course==='Master of Computer Science' && (pcData[index].end_year-pcData[index].start_year<2 || pcData[index].end_year-pcData[index].start_year>2)){
                console.log()
                err[index].error = 'Master of Computer Science is a 2 year program, check provided values carefully'
                setPcData(err)

            }else if(!validator.isEmail(pcData[index].email)){
                    
                console.log("2")
                console.log(pcData[index]._id,
                pcData[index].email, pcData[index].pcname, pcData[index].contact, pcData[index].start_year, pcData[index].end_year, pcData[index].course, pcData[index].avatar)
                
                const err= [...pcData]
                err[index].error = 'Provide a valid email'
                setPcData(err)
                
            }else{
                console.log("3")
              
                if(fileName!==''){
                    console.log(fileName)
                    handleFileUpload(index,e)
                    setIsLoading(true)
                   
                    const formData = new FormData() 
                    try{
                        const fileNameExists=fileName.split('.').slice(0, -1)
                        if(fileNameExists[0]===null || fileNameExists[0]===undefined|| fileNameExists[0]===''){
                            const err= [...pcData]
                            err[index].error = 'Fill all the fields'
                            setPcData(err)
                        }
                        else{
                            const id= pcData[index]._id
                            //  setError(false)
                            formData.append('id', id)
                            formData.append('file', file)
                            formData.append('fileName', fileName)
                            // formData.append('_id',pcData[index]._id)
                            console.log(id)
                            console.log(formData)
                            const data = {
                                id:id,
                                fileName:fileName,
                                file:file
                            }
                            console.log(data)
                        axios.patch(`/api/admin/pc-avatar`,formData)
                        .then(res=>{
                            console.log(res)
                            // setFileMessage(res.data.message)
                            // setFile('')
                            // setFileName('')
                            // fileMsg.current.style.opacity='0.6'
                            setTimeout(()=>{
                                // setFileMessage('')
                            },1000)
                        }).catch(error=>{
                            console.log(error)
                            // setFileMessage(error)
                            // setError(true)
                        })
                        // getAvatar()
                        setIsLoading(false)
                        }
                }catch(error){
                    // setFileMessage(error)
                    console.log(error)
                }
                }
                

                    console.log("4")
              
                console.log(pcData[index]._id,
                    pcData[index].email, pcData[index].pcname, pcData[index].contact, pcData[index].start_year, pcData[index].end_year, pcData[index].course, pcData[index].avatar)
                    const dataObj={
                        _id:pcData[index]._id,
                        email:pcData[index].email,
                        pcname:pcData[index].pcname,
                        contact:pcData[index].contact,
                        course:pcData[index].course,
                        start_year:pcData[index].start_year,
                        end_year:pcData[index].end_year,
                    }
                    const msg =[...pcData]
                    msg[index].error=''
                    setIsLoading(true)
                axios.patch('/api/admin/pc-info', dataObj) 
                .then(res=>{
                    console.log(res)
                            console.log(res.data.message)
                            const msg =[...pcData]
                            msg[index].success=res.data.message
                            setPcData(msg)
                            setTimeout(()=>{
                                console.log('inside timeout')
                                msg[index].success=' '
                                setPcData(msg)
                                getAdmin()
                            },1000)
                })
                .catch(err=>{
                    console.log(err)
                    setMessage(err)
                    console.log(err.response)
                })
                
                setIsLoading(false)
                // 
      
        
        }
        }catch(err){
            console.log(err)
        }
    }
    const handleCreate=(index,e)=>{
        // try{
            e.preventDefault();
            console.log('handleCreate') 
            // const check = Object.values(pcData[index]).some(field=> {
            //     console.log(index, field, field===null || field === ''  )

            //     return (field===null || field === '' )
            // })
            // console.log('check',check)
            // if(check || pcData[index].course===''){
            //     //validation failure
            //     const err= [...pcData]
            //     err[index].error = 'Fill all the fields'
            //     setPcData(err)
            // }else if(!validator.isEmail(pcData[index].email)){
            //     const err= [...pcData]
            //     err[index].error = 'Provide a valid email'
            //     setPcData(err)
                
            // }
                    
                //         const fileNameExists=fileName.split('.').slice(0, -1)
                //         if(fileNameExists[0]===null || fileNameExists[0]===undefined|| fileNameExists[0]===''){
                //             const err= [...pcData]
                //             err[index].error = 'Fill all the fields'
                //             setPcData(err)
                //         }
                //         else{
                //             const id= pcData[index]._id

                //             formData.append('file', file)
                //             formData.append('fileName', fileName)
    
                //             console.log(id)
                //             console.log(formData)
                //             const data = {
        
                //                 fileName:fileName,
                //                 file:file
                //             }
                //             console.log(data)
                //         axios.patch(`/api/admin/pc-avatar`,formData)
                //         .then(res=>{
                //             console.log(res)
    
    
                //         }).catch(error=>{
                //             console.log(error)
    
                //         })

                //         setIsLoading(false)
                //         }
                // }catch(error){
                //     console.log(error)
                // }
                // }
                try{
                    const err= [...pcData]
                    console.log(err)
                    if(pcData[index].file==="NA"){
                        console.log("1")
                        console.log(pcData[index].file)
                        err[index].error = 'Select image'
                        setPcData(err)
                    }else if(pcData[index].course==''||pcData[index].pcname==''||pcData[index].email==''||pcData[index].course==''||pcData[index].end_year===''||pcData[index].start_year===''){
                        
                        err[index].error = 'Fill all the fields'
                        setPcData(err)

                    }else if(pcData[index].end_year<=pcData[index].start_year){
                        
                        err[index].error = 'Start year must be earlier than End year'
                        setPcData(err)

                    }else if(pcData[index].course==='Master of Computer Applications' && (pcData[index].end_year-pcData[index].start_year<3 || pcData[index].end_year-pcData[index].start_year>3)){
                        console.log(pcData[index].end_year-pcData[index].start_year)
                        err[index].error = 'Master of Computer Applications is a 3 year program, check provided values carefully'
                        setPcData(err)

                    }else if(pcData[index].course==='Master of Computer Science' && (pcData[index].end_year-pcData[index].start_year<2 || pcData[index].end_year-pcData[index].start_year>2)){
                        console.log(pcData[index].end_year-pcData[index].start_year)
                        err[index].error = 'Master of Computer Science is a 2 year program, check provided values carefully'
                        setPcData(err)

                    }else if(!validator.isEmail(pcData[index].email)){
                    
                        console.log("2")
                        console.log(pcData[index]._id,
                        pcData[index].email, pcData[index].pcname, pcData[index].contact, pcData[index].start_year, pcData[index].end_year, pcData[index].course, pcData[index].avatar)
                        
                        const err= [...pcData]
                        err[index].error = 'Provide a valid email'
                        setPcData(err)
                        
                    }else{
                        console.log(pcData[index].avatar.fileName)
                        if(pcData[index].avatar.fileName!==''){
          
                        console.log("2")
                        console.log(fileName)
           
                        
                        const fileNameExists=fileName.split('.').slice(0, -1)
                        if(fileNameExists[0]===null || fileNameExists[0]===undefined|| fileNameExists[0]===''){
                            err[index].error = 'Fill all the fields'
                            setPcData(err)
                        }
                        console.log("2")

                        var formData = new FormData() 
                        const msg =[...pcData]
                        msg[index].error=''
                        console.log('pcData[index]._id===null',pcData[index]._id===null)
                        console.log(pcData[index]._id,
                        pcData[index].email,pcData[index].end_year,
                        pcData[index].start_year, pcData[index].pcname, pcData[index].contact, pcData[index].course, pcData[index].avatar)
                    // const dataObj={
                        formData.append('email', pcData[index].email)
                        formData.append('pcname', pcData[index].pcname)
                        formData.append('contact', pcData[index].contact)
                        formData.append('course', pcData[index].course)
                        formData.append('end_year', pcData[index].end_year)
                        formData.append('start_year', pcData[index].start_year)
                        formData.append('file', pcData[index].file)
                    // }                       
                        // formData.append('file', file)
                    // formData.append('fileName', fileName)

                console.log(formData)
                axios.post('/api/admin/pc-info', formData) 
                .then(res=>{
                    console.log(res)
                    console.log(res.data.message)
                    msg[index].success=res.data.message
                    setPcData(msg)
                    setTimeout(()=>{
                        console.log('inside timeout')
                        const msg =[...pcData]
                        msg[index].success=' '
                        setPcData(msg)
                        if(msg.length>=8){
                            setMaxedOut('Reached max limit.Cannot create more than 10 PC')
                        }
                        getAdmin()
                    },1000)
                })
                .catch(err=>{
                    console.log(err)
                    setMessage(err)
                    setMessage('Unable to create at the moment')
                    setTimeout(()=>{
                        setMessage('')

                    }, 2500)
                    console.log(err.response)
                })         
            }}
        
        
        
        
        
        
        }catch(err){
            console.log(err)
        }
    }
    const handleDeleteField=(index, e)=>{
        e.preventDefault()
        const pcid = {
            id: pcData[index]._id
        }
        console.log('inside function handleDeleteField')
        console.log(pcid)
       
        if(pcData[index]._id==='NA'){
            const rows = [...pcData];
            console.log(rows)
            rows.splice(index, 1);
            console.log(rows)
            setPcData(rows);
             if(rows.length<10){
            setMaxedOut('')
            }
        }else{let c=0
            setIsLoading(true)
            try{
                console.log('then part')
                console.log('pcData[index]',pcData[index])
                axios.delete('/api/admin/pc-info', {data:pcid})
                .then((res)=>{
                    setIsDeleted(!isDeleted)
                    const rows =[...pcData]
                    rows[index].success=res.data.message
                    console.log(res.data)
                    rows.splice(index, 1);
                    setPcData(rows)

                    if(rows.length<10){
                        setMaxedOut('')
                    }
                    setTimeout(()=>{
                        setIsLoading(false)
                        setIsDeleted(res.data.message)
                        setIsDeleted('')
                        console.log('inside timeout')
                        setMessage('')
                    },1000)

                }).catch((error)=>{
                    console.log('error part')
                    const err =[...pcData]
                    err[index].error='An error has occured'
                    setPcData(err)
                    setTimeout(()=>{
                        setIsLoading(false)
                        err[index].error=error.response.data.message
                    },1000)
                })
            }catch(err){
                console.log('catch block ')
            }
        }
        console.log('endof function handleDeleteField')
    }

    const handleChange = (index,e) => {
   
        console.log('Index: '+index)
        const { name, value } = e.target;
        const list = [...pcData];
        list[index][name] = value;
        if(list[index].isUpdatingImg===undefined){
            list[index].isUpdatingImg=false;
        }
        // setUsers(list);
        setPcData(list);   
    }

    const handleExit=()=>{
        window.scrollTo(0,0)
        console.log('inside handle exit ')
        setIsEditMode(false)
    }
  
    
     const handleSubmit=(e)=>{
        e.preventDefault();
        const check = true;
        if(!check){
            const err =[...pcData]
            err.error='Fill all the fields'
            setPcData(err)
        }else{
             const dataObj={pcData}
            console.log(dataObj)
            axios.post('/api/admin/pc-info', dataObj) 
            .then(res=>{           
                console.log(res)
            })
            .catch(err=>console.log(err))       
        }
    }
    

    const handleFileSelect = (index,e) => {
        console.log("inside handleFileSelect")
        const updateFile = [...pcData]
        updateFile[index].isUpdatingImg = true
        setPcData(updateFile)
        // setUsers(updateFile)
        setSelectedFile(index,e)
        console.log(updateFile[index].avatar)
    }
  
    const setSelectedFile = (index,e) => {
        console.log('inside setSelectedFile')
        const updateFile = [...pcData]
        console.log(updateFile[index].avatar)
        // const temp = [...pcData]
        console.log("isUpdatingImg - ",index, updateFile[index].isUpdatingImg)
        updateFile[index].isUpdatingImg = true
        setPcData(updateFile)
        // setUsers(updateFile)
        console.log(e.target.files)
        updateFile[index].avatar = URL.createObjectURL(e.target.files[0])
        console.log(updateFile[index].avatar)
        updateFile[index].file =e.target.files[0] 
        console.log(updateFile[index].file)
        // updateFile[index].avatar = e.target.files[0]
        // setUsers(updateFile)
        setPcData(updateFile)
        // setFile(e.target.files[0]) 
        // setFileName(e.target.files[0].name) 
        setIsFileEmpty(false)
        console.log(e.target.files[0].name)
        // console.log(users)
        console.log(pcData)
        console.log("isUpdatingImg - ",index, updateFile[index].isUpdatingImg)
        updateFile[index].isUpdatingImg = false
        setPcData(updateFile)
        // setUsers(updateFile)
        // setIsUpdatingImg(false)
        console.log("done SelectingImg")
        // fileSelector.click();
        // fileSelector.handleChange(e,index)
    }

    const handleFileUpload=(index,e)=>{
        e.preventDefault();
        console.log('inside adminProfile handleFileUpload')
        const formData = new FormData() 
        // setIsUpdatingImg(true)
        console.log(file)
        console.log(fileName)
        const id= pcData[index]._id
        formData.append('id', id)
        formData.append('file', pcData[index].file)
        formData.append('fileName',  pcData[index].file.filename)
        const data = {
            id:id,
            fileName:fileName,
            file:file
        }
        axios.patch(`/api/admin/pc-avatar`,formData)
            .then(res=>{
                console.log(res)
                const msg =[...pcData]
                msg[index].success= `${res.status}-${res.statusText} :${res.data.message}`
                setPcData(msg)
                console.log(res.data.message)
                // setFile('')
                // setFileName('')
                // fileMsg.current.style.opacity='0.6'
                getAvatar(index)
                setTimeout(()=>{
                    // setFileMessage('')
                    msg[index].success= ''
                    setPcData(msg)
                },1000)
            }).catch(error=>{
                console.log(error)
                // setFileMessage(error)
                // setError(true)
            })
        // setIsUpdatingImg(false)
    }
   
    useEffect(()=>{
        window.scrollTo(0, 0)
        console.log('inside AdminProfile')
        getAdmin()
    },[]);

    const date= new Date()
    
    if(isLoading){
        return(
            <>
               <Loading message={`Just a moment`}/>
            </>
        )
    }
        
    if(isEditMode){
        document.title='Edit PC information | DUCS Placement Portal'
        return(<> 
        <div className='profile user-select-none w-90% rounded h-auto flex flex-col m-3 bg-white'>
        <h3 className='mx-2 lg:mx-4 my-2 mt-4 font-semibold flex items-center'>Placement Coordinators<span className='italic font-normal pl-3'>(Edit Mode)</span>
       <span>
        
       </span>
        </h3>
        <div className='flex justify-between mx-2 itmes-center flex-row '> 

        <div className='flex flex-col'>
            <p className='text-slate-500  ml-3 text-sm lg:text-base lg:mx-5 my-2'>Placement Coordinators count : {pcData.length}</p>
            <p className='text-slate-500 ml-3 text-sm lg:text-base lg:mx-5 mb-3'>Last modified : <span className='italic'>{getParsedDate(admin.lastModified)}</span></p>
        </div>
        <div className='flex flex-row justify-center lg:justify-end mx-5 '>
        <div>
            <button  onClick={handleExit} className='my-2 px-3 mr-11 py-2 text-sm rounded-md text-white bg-blue-500 hover:bg-blue-400' type='button'>Exit edit mode</button>
        </div>
        </div>
        </div>
            <div className='m-2'> 
                <form className='mx-3' >
                    { Object.entries(data).map((data, index)=>{
                        count++
                        return <>
                           <div className='edit-profile  mb-4 ' >
                                <div className='flex flex-col lg:flex-row md:shrink-0 p-2 mb-1 items-start'>
                               
                                {console.log(data[1].avatar)}
                                    <div className='bg-gray-100/25 my-2 mr-2 flex flex-col flex-wrap text-gray-700 items-center'>
                                        <div className='flex flex-col items-center justify-center text-white  '>          
                                        {console.log("isUpdatingImg - ",data[1].pcname, data[1].isUpdatingImg)}
                                        { data[1].isUpdatingImg && <div className=" flex justify-center mx-8"><Loading   message={''}/></div>} 
                                        {/* {console.log(data[1].avatar.img===undefined,data[1].avatar.img===null,data[1].avatar.img==='',data[1].avatar.length )} */}
                                        {data[1].avatar.length>0 &&   <>
                                            <img className='bg-gray-100/25 p-2 cursor-pointer' width='110px' height='auto'  src={data[1].avatar}/>
                                        </>}
                                        {data[1].avatar.length=== undefined && Object.entries(data[1].avatar).map((datum,index)=>{
                                                const base64String = btoa(new Uint8Array(data[1].avatar.img.data.data).reduce(function (data, byte) {
                                                    return data + String.fromCharCode(byte);
                                                }, ''));
                                                
                                                return <>
                                                    {index===0 && 
                                                        <><img className='bg-gray-100 drop-shadow-md mb-2 p-2 cursor-pointer'
                                                        width='110px' height='auto'  
                                                        src={`data:image/*;base64, ${base64String}`}/>
                                                        </>}
                                                </>
                                            })
                                            } 
                                            <div id="avatar-update-btn">
                                                <input type="submit" value='UPDATE IMAGE' onClick={(e)=>handleFileUpload(index,e)}
                                               className={data[1]._id!== 'NA' ? 'hover:bg-gray-100'
                                               :'hidden'} />  
                                            </div>
                                        </div>
                                        <div className='bg-gray-100/25 form-group'>
                                            <input required onChange={(e)=>handleFileSelect(index, e)} 
                                                accept='image/jpeg, image/png'
                                                type='file' 
                                                name='file'  
                                                placeholder='Choose File'
                                                className='px-2 border-transparent focus:text-sm text-md focus:ring-0 focus:ring-transparent  focus:border-0 focus:border-b-[3px] m-1 w-[230px]'/>
                                                {data[1].fileError && <p className="text-red-700">File size must be 20kb</p>}
                                        </div>
                                    </div>
                                    <div className='flex flex-col '>
                                    <div className='my-2 flex flex-col lg:flex-row flex-wrap text-gray-700'>
                                        <div className='form-group'>
                                            <label className='px-2 text-indigo-700'>Full Name -</label> 
                                            <input required
                                                onChange={(e)=>handleChange(index, e)} 
                                                defaultValue={data[1].pcname} 
                                                type='text' 
                                                name='pcname'  
                                                placeholder='Name'
                                                spellCheck='false'
                                                className='inline-block px-2 border-transparent focus:text-sm text-md focus:ring-0 focus:ring-transparent  focus:border-0 focus:border-b-[3px] m-1 w-[150px]'
                                                />
                                        </div>
                                
                                        <div className='form-group '>
                                            <label className='px-2 text-indigo-700'>Email -</label> 
                                            <input required onChange={(e)=>handleChange(index, e)} 
                                                defaultValue={data[1].email} 
                                                type='email'
                                                name='email' 
                                                spellCheck='false'
                                                placeholder='Email'
                                                className='inline-block px-2 border-transparent focus:text-sm text-md focus:ring-0 focus:ring-transparent  focus:border-0 focus:border-b-[3px] m-1 w-[190px]' />
                                        </div>
                                        <div className='form-group '>
                                            <label className='px-2 text-indigo-700'>Contact -</label> 
                                            <input required onChange={(e)=>handleChange(index, e)} 
                                                defaultValue={data[1].contact} 
                                                type='text' 
                                                name='contact'
                                                placeholder='Phone no.'
                                                className='inline-block px-2 border-transparent focus:text-sm text-md focus:ring-0 focus:ring-transparent  focus:border-0 focus:border-b-[3px] focus:border-blue-600 m-1 w-[110px]'/>
                                        </div>
                                        <div className='form-group '>
                                        <label className='px-2 text-indigo-700'>Course -</label>
                                            <select required 
                                                className='px-2 border-transparent focus:text-sm text-md focus:ring-0 focus:ring-transparent  focus:border-0 focus:border-b-[3px] m-1 min-w-[290px]'
                                                name='course'
                                                defaultValue={data[1].course } onChange={(e)=>handleChange(index,e)}>
                                                <option selected value=''>Select an option</option>
                                                <option>Master of Computer Applications</option>
                                                <option>Master of Computer Science</option>
                                            </select>
                                        </div>
                                        <div className='form-group '>
                                            <label className='px-2 text-indigo-700'>Start&nbsp;year -</label><select required 
                                                className='px-2 border-transparent focus:text-sm text-md focus:ring-0 focus:ring-transparent  focus:border-0 focus:border-b-[3px] m-1 min-w-[90px]'
                                                name='start_year'
                                                defaultValue={data[1].start_year} onChange={(e)=>handleChange(index,e)}>
                                                <option selected value=''>YYYY</option>
                                                <option>{date.getFullYear()-2}</option>
                                                <option>{date.getFullYear()-1}</option>
                                                <option>{date.getFullYear()}</option>
                                                <option>{date.getFullYear()+1}</option>
                                                <option>{date.getFullYear()+2}</option>
                                            </select>
                                        </div>
                                        <div className='form-group '>
                                            <label className='px-2 text-indigo-700'>End&nbsp;year -</label><select required 
                                                className='px-2 border-transparent focus:text-sm text-md focus:ring-0 focus:ring-transparent  focus:border-0 focus:border-b-[3px] m-1 min-w-[90px]'
                                                name='end_year'
                                                defaultValue={data[1].end_year } onChange={(e)=>handleChange(index,e)}>
                                                <option selected value=''>YYYY</option>
                                                <option>{date.getFullYear()-2}</option>
                                                <option>{date.getFullYear()-1}</option>
                                                <option>{date.getFullYear()}</option>
                                                <option>{date.getFullYear()+1}</option>
                                                <option>{date.getFullYear()+2}</option>
                                            </select>
                                        </div>
                                       
                                        {/* <div className='form-group flex items-start flex-row align-baseline '>
                                            <label className='p-2 m-1 text-md text-blue-900'>Start&nbsp;year - </label>
                                            <input required onChange={(e)=>handleChange(index, e)} 
                                            defaultValue={data[1].start_year} 
                                            type='text' 
                                            name='start_year'
                                            placeholder='YYYY'
                                            className='relative   border-transparent focus:text-sm text-md focus:ring-0 focus:ring-transparent  focus:border-0 focus:border-b-[3px] focus:border-blue-600 m-1 w-[80px]'/>
                                        </div>
                                        <div className='form-group flex items-start flex-row  align-baseline'>
                                        <label className='p-2 m-1 text-md text-blue-900'>End&nbsp;year - </label>
                                            <input required onChange={(e)=>handleChange(index, e)} 
                                                defaultValue={data[1].end_year} 
                                                type='text' 
                                                name='end_year'
                                                placeholder='YYYY'
                                                className=' border-transparent focus:text-sm text-md focus:ring-0 focus:ring-transparent  focus:border-0 focus:border-b-[3px] focus:border-blue-600 m-1 w-[80px]'/>
                                        </div> */}
                                        {/* <div className='form-group '>
                                            <textarea required onChange={(e)=>handleChange(index, e)} 
                                                defaultValue={data[1].avatar} 
                                                type='text' 
                                                name='avatar'
                                                placeholder='Avatar link'
                                                className='px-2 border-transparent focus:ring-0 focus:ring-transparent  focus:border-0 focus:border-b-[3px] focus:border-blue-600 m-1 ' 
                                                maxLength='200'/>
                                        </div> */}
                                        
                                    </div>
                                     <div className="flex flex-col items-center">
                                    {data[1].success!=='' && 
                                        <div> 
                                            <p className='rounded-sm p-1 text-green-600 drop-shadow-sm font-semibold text-[13px]'>{data[1].success}</p>
                                        </div>
                                    }
                                    {data[1].error!=='' && 
                                        <div>
                                            <p className='rounded-sm p-1 text-[#da2e2e] font-semibold text-[13px] '>{data[1].error}</p>
                                        </div>
                                    }
                                </div></div>
                                    <div className='action-buttons flex flex-col m-2 justify-start text-white'>
                                        <div>
                                            <input type='submit' name='update_button' value='UPDATE'  onClick={(e)=>handleUpdate(index,e)} 
                                                className={data[1]._id!== 'NA' ? 'hover:bg-gray-100'
                                                :'hidden'} />  
                                        </div>
                                        <div>
                                            <input type='submit' name='create_button' value='CREATE'   onClick={(e)=>handleCreate(index,e)} 
                                            className={data[1]._id==='NA'?  'hover:bg-gray-100'
                                            :'hidden'} />  
                                        </div>
                                        <div><input type='submit' name='delete_button' value='DELETE' onClick={(e)=>handleDeleteField(index,e)}
                                            className={pcData.length>=7 ? 'hover:bg-gray-100 '
                                            :'hidden'} />  
                                        </div>
                                
                                        {/* {data[1].error!==null && <p className='text-[#862116] text-[13px] '>{data[1].error}</p>} */}

                                        
                        
                                    </div>
                                </div>
                               
                            </div>

                           {isDeleted.length>0 && <p>{isDeleted}</p>}
                        </>
                    })}
                    <div className='w-full'>
                    {
                         <div className='border-2 border-red-700/50 text-sm rounded-md py-2 px-1  bg-red-200/50 text-red-700'>
                            <p className='text-lg justify-start'>eeeeeeeeeeeeeee</p>
                        </div>
                        // message.length>0 && <div className={message.length>0 ? 'border-2  text-sm rounded-md w-68 py-2 z-50 px-5 text-gray-600 flex justify-center':'hidden'}>
                        //     <p className='px-3 text-lg'>{message}</p>
                        // </div>
                    }
                    </div>
                    <div className='flex flex-row justify-center md:justify-end mx-5 '>
                        <button className='m-2 px-3 py-2 text-sm rounded-md text-white bg-blue-500 hover:bg-blue-400 ' disabled={count>=7} onClick={handleAddField}><p>Add<span><SiAddthis className='inline-block ml-2'/></span></p></button>
                        <button  onClick={handleExit} className='m-2 px-3 py-2 text-sm rounded-md text-white bg-blue-500 hover:bg-blue-400' type='button'>Exit edit mode</button>
                    </div>
                    {maxedOut.length>0 && <p className='py-2 px-3 text-gray-500'>{maxedOut}</p>}
                </form>
                    
            </div>
        </div>
        </>)
    }
    
    return(<>    
    <div className='profile  user-select-none w-90% rounded h-auto flex flex-col m-3 bg-white'>
        <div className='flex space-between my-3'>
            <div className='mx-12  w-4/6'><p className='text-lg font-semibold'><HiUserCircle className='mb-1 font-bold text-3xl inline-block'/>&nbsp;Profile</p>
            </div>
        </div>
        <div  className=' h-auto flex flex-nowrap flex-col md:flex-wrap items-start rounded-md border-slate-100  mx-8 my-6 p-4 border-2 text-gray-700'>
            
            <div className='mx-1 flex flex-col  md:flex-row flex-wrap border-right'>
                {/* <div className=' px-7   py-2  items-center align-center  '>
                    <img className='rounded-circle ' width='110px' src={profilepic}/>
                </div> */}
                <div>
                    <h3 className='font-semibold flex items-center '>{admin.username}
                    <p> 
                        <button  onClick={()=>setIsEditMode(!isActive)} className=' mx-5  cursor-pointer' >
                            <RiEdit2Fill className='font-bold focus:border-2 focus:border-white text-xl text-fuchsia-900 hover:text-white'/>
                        </button>
                    </p></h3>
                <h2 className='mt-3 text-black-50'>Email- {admin.email}</h2>
                    <div className='flex flex-col md:flex-row flex-wrap md:scale-90 md:w-[638px] w-auto px-2 py-1'>
                        {Object.entries(pcData).map((data, index)=>{
                            return (<>
                                    <Card data={data}/>
                            </>)
                        })}
                
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>)  
}
 
export default AdminProfile
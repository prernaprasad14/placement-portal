import { Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect, useContext} from 'react';
import axios from '../../axiosConfig';
import { UserContext } from '../../App';
import {AiOutlineUserAdd,AiOutlineUsergroupAdd} from 'react-icons/ai'
import {FaUserPlus} from 'react-icons/fa'

const CreateUser=()=>{
    console.log("3 inside CreateUser")
    const [role, setRole] =useState('scholar')
    const {state}= useContext(UserContext)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState('')
    const [isFileEmpty, setIsFileEmpty] = useState(true)
    const [message, setMessage] = useState('')
    const [fileMessage, setFileMessage] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const scholarEmailRegex = /^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/;
    const handleEmail=(e)=>{
       setEmail(e.target.value) 
          console.log(email)
    }
    const handleUsername=(e)=>{
       
        setUsername(e.target.value) 
    }
    const handleSubmit  = async (e)=>{
        e.preventDefault();
        console.log("inside createuser submit")
        console.log(role)
        const userObj = {
            "email":email, "username":username
        }
        await axios.post(`api/admin/create-user/${role}`, userObj)
        .then(res=>{
            console.log(res)
            if(res.data.success){
                // setSuccess(true)
                setMessage(res.data.message)
            }
        })
        .catch(error=>{
            console.log(error)
            // setMessage(error[0])
        })
    }

    const handleFileSelection=(e)=>{
        
        console.log(file)
        console.log(fileName)
        console.log(e.target.files[0])
        setFile(e.target.files[0]) 
        setFileName(e.target.files[0].name) 
        setIsFileEmpty(false)
    }
    const handleFileUpload=(e)=>{
        e.preventDefault();
        console.log('inside createusers handleFileUpload')
        const formData = new FormData() 
        console.log(file)
        console.log(fileName)
        formData.append('file', file)
        formData.append('fileName', fileName)
        axios.post('api/admin/create-users', formData)
        .then(res=>{
            console.log(res)
            setFileMessage(res.data.message)
        }).catch(err=>{
            console.log(err)
            // setMessage(err.response.data)
            // setError(true)
        })
    }
    useEffect(()=>{
        if(role ==='scholar'&& email!==''){
            scholarEmailRegex.test(email) ? setEmail(email) : setError(true)
            if(error){
                setBtnDisabled(true)
            }
        }else{
            setBtnDisabled(false)
            setError(false)
        }
        if(username===''){

            setBtnDisabled(true)
        }
        if(file==null){
            setIsFileEmpty(true)
        }else
        setIsFileEmpty(false)
    },[role, email, username, file])
    return(
        <>
        <div className="user-select-none w-90% rounded h-auto flex flex-col m-3 bg-white">
            <div className="flex space-between my-3">
                <div className="text-lg mx-12 font-semibold w-4/6"><p><FaUserPlus className='mb-2  font-bold text-2xl inline-block'/>&nbsp;Manage Users</p></div>
            </div>
            <div className="flex flex-unwrap flex-col sm:flex-col items-start sm:flex-wrap rounded-md border-slate-100  mx-8 my-6 p-4 border-2 text-gray-700">
                <div>
                    <h3 className='mt-2 mb-2 font-semibold'>Create a user</h3>

                    <form className='flex flex-col justify-center items-start bg-slate-100/25 rounded p-4'>
                     {error &&  
                        <p className='py-2 my-2  text-slate-700'>Use <span className='font-bold italic'>cs.du.ac.in</span> domain to create scholars</p>
                       }  
                     {message &&  
                        <p className='py-2 my-2 text-emerald-600'>{message}</p>
                       }  
                        <label  className="rounded text-slate-900" >Email</label>
                        <input required onChange={handleEmail} type="email" className='w-68 rounded my-2 h-10 border-2 border-slate-300'/>
                        <label htmlFor="username" className="rounded text-slate-900" >Username</label>
                        <input required onChange={handleUsername} type="text" className='w-68 rounded my-2 h-10 border-2 border-slate-300'/>

                        <select className="h-10 w-44 mx-0 px-2 my-4 rounded-[5px] border-2 border-slate-300 text-slate-600"
                        defaultValue={role} onChange={(e)=>setRole(e.target.value.toLowerCase())} >
                            <option>Scholar</option>
                            <option>Company</option>
                        </select>
                        <button disabled={btnDisabled} onClick={handleSubmit}  type="submit" className={btnDisabled ? 'disabled-btn' :'create-user'} >
                        <AiOutlineUserAdd className='mb-1 font-bold text-2xl inline-block'/>Create User</button>                        
                    </form>
                </div>
                <div className='mt-4 border-t-2 border-slate-100'>

                <h3 className='mt-4 mb-2 font-semibold'>Create multiple users by uploading file a<span className='font-bold italic '> csv </span>file</h3>
                <div className='items-center flex bg-slate-100/25 rounded w-[1012px] p-4'>
                    <form className='flex flex-col' onSubmit={handleFileUpload}>
                        {fileMessage &&  
                            <p className='py-2 my-2  text-emerald-600'>{fileMessage}</p>
                        }  
                        <div className='flex'>
                            <input name={fileName} required onChange={handleFileSelection} type="file" accept=".xlsx, .xls, .csv" id="file-upload" className='mt-1 mr-6'/>
                            <button disabled={isFileEmpty}  type="submit" className={isFileEmpty ? 'disabled-btn' :'create-user'} >
                            <AiOutlineUsergroupAdd className='mb-1 font-bold text-2xl inline-block'/>Create Users</button>   
                        </div>
                        
                    </form>        
                </div>
            </div>
                </div>
        </div>
        </>
    )
}
export default CreateUser
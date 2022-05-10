import { Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import axios from '../../axiosConfig';

const CreateUser=()=>{
    console.log("3 inside CreateUser")
    const [role, setRole] =useState('scholar')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [file, setFile] = useState(null)
    const [isFileEmpty, setIsFileEmpty] = useState(true)
    const [message, setMessage] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const scholarEmailRegex = /^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/;
    const handleEmail=(e)=>{
       setEmail(e.target.value) 
          console.log(email)
    }
    const handleUsername=(e)=>{
       
        setUsername(e.target.value) 
    }
    const handleFile=(e)=>{
        setFile(e.target.files[0]) 
        setIsFileEmpty(false)
        console.log(file)
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
                <div className="text-lg mx-12 font-semibold w-4/6"><p>Create User</p></div>
            </div>
            <div className="flex flex-unwrap flex-col sm:flex-col items-start sm:flex-wrap rounded-md border-slate-100  mx-8 my-6 p-4 border-2 text-gray-700">
                <div>
                    <h3 className='mt-2 mb-2 font-semibold'>Create a user</h3>

                    <form className='flex flex-col justify-center items-start bg-slate-100/25 rounded p-4'>
                     {error &&  
                        <p className='py-2 my-2  text-pink-600'>Use <span className='font-bold'>cs.du.ac.in</span> domain to create scholars</p>
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
                            Create User</button>                        
                    </form>
                </div>
                <div className='mt-4 border-t-2 border-slate-100'>

                <h3 className='mt-4 mb-2 font-semibold'>Create multiple users using file</h3>
                <div className='items-center flex bg-slate-100/25 rounded w-[1012px] p-4'>
                    <form className='flex'>
                        <input required onChange={handleFile} type="file" id="file-upload" className='mt-1 mr-6'/>
                        <button disabled={isFileEmpty} onClick={handleSubmit}  type="submit" className={isFileEmpty ? 'disabled-btn' :'create-user'} >
                                Create Users</button>   
                    </form>        
                </div>
            </div>
                </div>
        </div>
        </>
    )
}
export default CreateUser
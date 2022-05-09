import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { Component ,useState} from 'react';
import axios from '../../axiosConfig';

const CreateUser=()=>{
    console.log("3 inside CreateUser")
    const [role, setRole] =useState('scholar')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    
    const handleEmail=(e)=>{
       
        setEmail(e.target.value) 
    }
    const handleUsername=(e)=>{
        setUsername(e.target.value) 
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log("inside createuser submit")
        console.log(role)
        const userObj = {
            "email":email, "username":username
        }
        await axios.post(`api/admin/create-user/${role}`, userObj)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <>
        <div className="user-select-none w-90% rounded h-auto flex flex-col m-3 bg-white">
            <div className="flex space-between my-3">
                <div className="text-lg mx-12 font-semibold w-4/6"><p>Create User</p></div>
            </div>
            <div className="flex flex-unwrap flex-col sm:flex-col items-start sm:flex-wrap rounded-md border-slate-100  mx-8 my-6 p-4 border-2 text-gray-700">
                <div>
                    <h3 className='mt-2 mb-2 font-semibold'>Create a user</h3>

                    <form  onSubmit={handleSubmit} className='flex flex-col justify-center items-start bg-slate-100/25 rounded p-4'>
                       
                        <label  className="rounded text-slate-900" >Email</label>
                        <input required onChange={handleEmail} type="email" className='w-68 rounded my-2 h-10 border-2 border-slate-300'/>
                        {error && <p>Use cs.du.ac.in domain to create scholars</p>}
                        <label htmlFor="username" className="rounded text-slate-900" >Username</label>
                        <input required onChange={handleUsername} type="text" className='w-68 rounded my-2 h-10 border-2 border-slate-300'/>

                        <select className="h-10 w-44 mx-0 px-2 my-4 rounded-[5px] border-2 border-slate-300 text-slate-600"
                        defaultValue={role} onChange={(e)=>setRole(e.target.value.toLowerCase())} >
                            <option>Scholar</option>
                            <option>Company</option>
                        </select>
                       
                         <button type="submit" id="create-user" className='ml-auto border-2 '>
                            {/* <Link to ='create-user' className='text-white'></Link> */}
                            CreateUser</button> 
                        
                    </form>
                </div>
                <div className='mt-4 border-t-2 border-slate-100'>

                <h3 className='mt-4 mb-2 font-semibold'>Create multiple users using file</h3>
                <div className='items-center flex bg-slate-100/25 rounded w-[1012px] p-4'>
                    <input type="file" id="file-upload" className='mt-1'/>
                    <div className='bg-transparent shadow-inner h-10 w-72 border-2 rounded sm:ml-[-286px] ml-[-270px] border-slate-500/20'></div>
                    <button type="submit" onClick={handleSubmit} id="create-user" >
                        {/* <Link to ='create-user' className='text-white'></Link> */}
                        CreateUser</button>
                </div>
            </div>
                </div>
        </div>
        </>
    )
}
export default CreateUser

import {useNavigate} from 'react-router-dom';
import React, { useState} from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom'
const Login=()=>{
    
    const navigate = useNavigate()
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
                
    
    const handleEmail=(e) =>{
        setEmail(e.target.value)
    }
    const handlePassword=(e)=> {
        setPassword(e.target.value)
    }
    const onSubmit = async(e) =>{
        e.preventDefault()
        const userObject = {
            "loginDetails":{
                email: email,
                password: password
            } 
        };
        console.log(":: userObject :: "+userObject)
        console.log(":: userObject :: "+JSON.stringify(userObject))
        await axios.post('api/company/login', userObject)
        .then((res) => {
            console.log(res.data)
            if(res.data.success){
                navigate('/dashboard/company')
            }
            else{
                console.log("err")
            }
        }).catch((error) => {
            console.log(error)
        });
    }

        return (
            <div className='z-10 text-bold box-border flex justify-center h-auto p-8 bg-gray-200'>
                <div className='text-bold bg-white drop-shadow-[0_0_3px_rgba(0,0,0,0.1)] mt-3 rounded-lg'>  
                    <form onSubmit={onSubmit} className='px-36 py-8 rounded-lg' >
                            <h4 className='my-2 font-medium text-lg inline-block'>Company Login</h4> 
                            <Link to='../scholar-login' className="font-bold underline ml-[138px] text-violet-400 hover:text-violet-800">Login as scholar</Link>
                        <div>
                            <label>Email</label>
                            <input type="text" placeholder='Enter your email' value={email} onChange={handleEmail} className="my-3  border-2 rounded-md  border-violet-200" />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" placeholder='********' value={password} onChange={handlePassword} className="my-3  border-2 rounded-md  border-violet-200" />
                        </div>
                        <button className="bg-[#8751c4] hover:bg-violet-400 text-white  font-medium py-2 px-10 ml-32 rounded-md" type="submit" >Login</button>
                        <div className='mt-4 ml-[130px]'>
                            <Link to='../forgot-password'  className="font-bold underline ml-[138px] text-violet-400 hover:text-violet-800">ForgotPassword?</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
export default Login
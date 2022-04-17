import {useNavigate} from 'react-router-dom';
import React, { useState} from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom'
const ScholarLogin=()=>{
    document.title='Scholar Login | DUCS Placement Portal'
    
    const navigate = useNavigate()
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError]= useState('')
    const [id, setId]= useState('')
                
    
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
        await axios.post('api/scholar/login', userObject)
        .then((res) => {
            console.log(res.data)
            setId(res.data.id)
            if(res.data.success){
                navigate(`/dashboard/companies`)
                // navigate(`/dashboard/scholar/${id}`)
            }
            else{
               console.log("error")
            }
        }).catch((error) => {
            console.log("error")
            console.log(error)
            if(error?.response?.data){
                const {data} = error.response
                console.log("catch catch")
                if(!data.success) {
                    if(data.error){
                        setError(data.error[0].msg)
                    }else if (data.message){
                        setError(data.message)
                    }
                }
            }
            console.log("catch part: "+error)
        });
    }
    return (
        <div className='text-bold box-border flex justify-center h-auto p-8 bg-gray-200'>
            <div className='text-bold bg-white drop-shadow-[0_0_3px_rgba(0,0,0,0.1)] mt-3 rounded-lg'>  
                
                <form type="submit" onSubmit={onSubmit} className='px-36 py-8 rounded-lg' >
                    <h4 className='my-2 font-medium text-lg inline-block'>Scholar Login</h4> 
                    <Link to='../login'  className="font-bold  mt-1 underline ml-[160px] text-violet-400 hover:text-violet-800">Company Login</Link>
                    <div>
                        <label>Email</label>
                        <input type="email" placeholder='Enter your email' value={email} onChange={handleEmail} className="my-3  border-2 rounded-md  border-violet-200" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder='********' value={password} onChange={handlePassword} className="my-3  border-2 rounded-md  border-violet-200" />
                    </div>
                    {error && <p className='pb-2 text-pink-600'>{error}</p>}
                    <button className="bg-[#8751c4] hover:bg-violet-400 text-white  font-medium py-2 px-10 ml-32 rounded-md" type="submit">Login</button>
                    <div className='mt-4 ml-[130px]'>
                        <Link to='../forgot-password'  className="font-bold  inline-block underline ml-[138px] text-violet-400 hover:text-violet-800">ForgotPassword?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ScholarLogin

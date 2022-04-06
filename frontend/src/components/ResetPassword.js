import React,{useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router'
import { Link } from 'react-router-dom'
import axios from '../axiosConfig';
import queryString from 'query-string'


const ResetPassword = () =>{
    const location = useLocation();
    const navigate = useNavigate(); 
    const [invalidUser, setInvalidUser] = useState(''); 
    const [loading, setLoading] = useState(true); 
    const [error , setError] = useState('');
    const [success, setSuccess] = useState(false); 
    const [newPasssword , setNewPasssword] = useState({
        passsword:'',
        confirmPassword:''
    })
    console.log(location)
    
    const verifyToken=async()=>{
        const {email, token, id} = queryString.parse(location.search)
        try{
            
            const {data} = await axios(`api/user/verify-token?email=${email}&token=${token}`);
            setLoading(false);          
           
        }catch(error){
            if(error?.response?.data){
                const {data} = error.response

                if(!data.success) return setInvalidUser(data.error)
            }
            console.log("catch part: "+error)
        }
    };

    useEffect(()=>{
        verifyToken();
    },[]);
    
    const handleChange = async(e)=>{
        const {name, value} = e.target
        setNewPasssword({...newPasssword,[name]:value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {password , confirmPassword} =newPasssword
        
        if(password.length <8 || password.length >20)
            return setError('Password must be 8 to 20 characters long')
        if(password !== confirmPassword)
            return setError('Passwords do not match')
        try{
            const {email, token, id} = queryString.parse(location.search)
            setLoading(true)
            const {data} = await axios.post(`api/user/reset-password?email=${email}&token=${token}`, {password, confirmPassword});
            console.log("data: "+JSON.stringify(data))
            setLoading(false);
            if(data.success){
                setSuccess(true)
                navigate(`/login`)
            }
        }catch(error){
            if(error?.response?.data){
                const {data} = error.response
                console.log("catch catch")
                if(!data.success) return setInvalidUser(data.error)
            }
            console.log("catch part: "+error)
        }
    }
    
    if(invalidUser) 
        return <div className="max-w-200 bg-green">{invalidUser}</div>
    if(loading) 
        return <div className="max-w-200 bg-green">Please wait for a moment</div>
    if(success) 
        return <div className="max-w-200 bg-green">Reset successfull</div>
        
    return (
      
        <div className='text-bold box-border flex justify-center h-auto p-8 bg-gray-200'>
        <div className='text-bold bg-white drop-shadow-[0_0_3px_rgba(0,0,0,0.1)] mt-3 rounded-lg'>  
           
            <form className='px-36 py-8 rounded-lg' onSubmit={handleSubmit}>
                <div>
                    <label  className="m-0 p-0">Password</label>
                    <input required type="password" name="password" placeholder="********" defaultValue='' onChange={handleChange}  className="px-3 my-5 border-2 rounded-md  border-violet-200" />
                </div>
                <div>
                    <label  className="m-0 p-0">confirmPassword</label>
                    <input required type="password" name="confirmPassword" placeholder="********" defaultValue='' onChange={handleChange}  className="px-3 my-5 border-2 rounded-md  border-violet-200" />
                    
                </div>
                <p className='text-pink-600'>{error}</p>
                <div>
                    <button type="submit"  value="Reset Password"  className="bg-[#8751c4] hover:bg-violet-400 text-white  font-bold py-2 px-4 ml-28 rounded-md" >Reset Password</button>
                </div> 
            </form>
            </div>
        </div>
    )
}

export default ResetPassword
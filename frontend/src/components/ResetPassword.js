import React,{useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router'
import { Link } from 'react-router-dom'
import axios from '../axiosConfig';
import queryString from 'query-string'
import {MdGeneratingTokens} from 'react-icons/md'
import Loading from './Loading';

const ResetPassword = () =>{
    const location = useLocation();
    const navigate = useNavigate(); 
    const [invalidUser, setInvalidUser] = useState(''); 
    const [isLoading, setIsLoading] = useState(true); 
    const [error , setError] = useState('');
    const [success, setSuccess] = useState(false); 
    const [newPasssword , setNewPasssword] = useState({
        passsword:'',
        confirmPassword:''
    })

    const verifyToken=async()=>{
        const {email, token} = queryString.parse(location.search)
        try{
            
            const {data} = await axios(`api/user/verify-token?email=${email}&token=${token}`);
            if(!data.success){
                setInvalidUser(true)
            }
            setIsLoading(false);  
           
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
            const {email, token} = queryString.parse(location.search)
            setIsLoading(true)
            const {data} = await axios.post(`api/user/reset-password?email=${email}&token=${token}`, {password, confirmPassword});
            console.log("data: "+JSON.stringify(data))
            setIsLoading(false);
            if(data.success){
                setSuccess(true)
                setTimeout(()=>{navigate(`/login`)},2500)
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
        return (
        <>
        <div className="bg-zinc-100 bg-gradient-to-b h-full from-white to-zinc-100/25"> 
            <div className=' flex flex-col py-40 items-center '>
                <p className='px-2 text-6xl font-bold text-zinc-400/75'>404</p>
                <p className='px-2 text-3xl font-bold text-zinc-400/75'> Page not found</p>
                <p className='justify-center font-500 text-lg mt-3 p-5 text-zinc-400'>Seems like your token has expired. Please request for another password reset token</p>
                <p className="mx-6 mt-3 text-lg">
                    <Link to='/forgot-password' className='text-zinc-600  hover:text-white hover:bg-purple-300 hover:rounded-md hover:p-4'>
                        <MdGeneratingTokens className=' mx-1 mb-1 inline-block'/>Request Token
                    </Link>
                </p>
                
            </div>  
         </div>
        
        </>)

    if(isLoading) 
        return (
            <>
            <Loading message={`Please wait for a moment`}/>
            </>
        )

    if(success) 
    return (
        <>
        <div className="bg-zinc-100 bg-gradient-to-b h-full z-50 from-white to-zinc-100/25">
            <div className=' flex flex-col  items-center'>
                <div class="my-44 py-3   mb-24">
                    <svg className="checkmark " viewBox="0 0 50 50"><circle className="checkmark-circle" cx="25" cy="25" r="20" fill="none"  /><path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                    <p className="p-4 block text-[#1BDA9C] text-lg font-semibold">Password reset successful</p>
                </div>
            </div>
        </div>
        </>
    )
        
    return (
      
        <div className='text-bold box-border flex justify-center h-auto p-8 bg-gray-200'>
        <div className='text-bold bg-white drop-shadow-[0_0_3px_rgba(0,0,0,0.1)] mt-3 rounded-lg'>  
        <h4 className='my-2 font-medium text-lg m-3 inline-block'>Reset Password</h4>
            <form className='px-36 py-3 rounded-lg' onSubmit={handleSubmit}>
                <div>
                    <label  className="m-0 p-0">Password</label>
                    <input required type="password" name="password" placeholder="********" defaultValue='' onChange={handleChange}  className="px-3 my-2 border-2 rounded-md  border-violet-200" />
                </div>
                <div>
                    <label  className="m-0 p-0">Confirm Password</label>
                    <input required type="password" name="confirmPassword" placeholder="********" defaultValue='' onChange={handleChange}  className="px-3 my-2 border-2 rounded-md  border-violet-200" />
                    
                </div>
                {/* {success && <p className='text-pink-600'>{success}</p>} */}
                {error && <p className='text-pink-600'>{error}</p>}
                <div>
                    <button type="submit"  value="Reset Password"  className="bg-[#8751c4] hover:bg-violet-400 text-white  font-bold py-2 px-4 ml-28 rounded-md" >Reset Password</button>
                </div> 
            </form>
            </div>
        </div>
    )
}

export default ResetPassword
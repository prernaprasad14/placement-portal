
import {useNavigate} from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import axios from '../axiosConfig';
import {Link} from 'react-router-dom'
import {UserContext} from '.../App';
import Loading from '../../Loading';

const Login=()=>{
    document.title='Login | DUCS Placement Portal'
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate()
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError]= useState('')
    const [isLoading, setIsLoading]= useState(false)
    const [isLoggedIn, setIsLoggedIn]= useState(false)
    const [id, setId]= useState('')

    const checkLoggedIn=()=>{
        setIsLoading(true)
        axios.get('/api/user/logged-in')
         .then((res)=>{
            console.log(res)
            setIsLoggedIn(true)
            dispatch({type:"LOGGEDIN", role:res.data.role})
            navigate('/dashboard')
            
         }).catch((error)=>{
            dispatch({type:"USER", role:"USER"})
             console.log("error checkLoggedIn"+error)
         }) 
        setIsLoading(false)

     }
     useEffect(()=>{
         checkLoggedIn();
     },[]);
    
    const handleEmail=(e) =>{
        if(e.altKey && e.key === 'Enter'){
            handleSubmit(e)
        }else{
            setEmail(e.target.value)
        }
    }
    const handlePassword=(e)=> {
        if(e.altKey && e.key === 'Enter'){
            handleSubmit(e)
        }else{
            setPassword(e.target.value)
        }
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const userObject = {
                "loginDetails":{
                    email: email,
                    password: password
                    } 
                };

            await axios.post('api/company/login', userObject)
            .then((res) => {
                console.log(res.data)
                setId(res.data.id)
                if(res.data.success){
                    dispatch({type:"user", role:res.data.role})
                    console.log("state"+state)
                    navigate(`/dashboard`)
                    // navigate(`/dashboard`)
                }
                else{
                   console.log("error")
                }
            }).catch((error) => {
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
    }catch(err){
        console.log("Error inside login", err)
    }
      
            
        
    }
    if(isLoading){
        return(<Loading message={'Loading...'}/>)
    }
    return (
        <div className='z-10 text-bold box-border flex justify-center h-auto p-8 bg-gray-200'>
            <div className='text-bold bg-white drop-shadow-[0_0_3px_rgba(0,0,0,0.1)] mt-3 rounded-lg'>  
                <form type="submit"  onSubmit={handleSubmit} className='px-36 py-8 rounded-lg' >
                        <h4 className='my-2 font-medium text-lg inline-block'>Company Login</h4> 
                        <Link to='../scholar-login' className="font-bold underline ml-[138px] text-violet-400 hover:text-violet-800">Login as scholar</Link>
                    <div>
                        <label>Email</label>
                        <input type="email" placeholder='Enter your email' value={email} onChange={handleEmail} className="my-3  border-2 rounded-md  border-violet-200" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder='********' value={password} onChange={handlePassword} className="my-3  border-2 rounded-md  border-violet-200" />
                    </div>
                    {error && <p className='pb-2 text-pink-600'>{error}</p>}
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
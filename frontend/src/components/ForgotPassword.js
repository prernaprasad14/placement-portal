import React,{useState, useEffect} from 'react'
import axios from '../axiosConfig';

const ForgotPassword = () =>{

    const [email, setEmail] =useState('')
    const [error , setError] = useState('')
    const [success , setSuccess] = useState('')
  
    const handleChange=(e)=>{
        console.log("handle change")
        setEmail(e.target.value)
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();

        console.log(`2 email `)
        console.log(`3 email:: ${email}`)
        console.log(`4 email:: JSON.stringify(email) `+JSON.stringify(email))
        try{
            const {data} = await axios.post('api/user/forgot-password/', {email})
            console.log("5 data.message"+data.message)
            setError('')
            setSuccess(data.message)
        }catch(error){
            setSuccess('')
            setError(error.response.data.message)
            console.log("6 error.response.data.message",error.response.data.message)
        };
        
        console.log("7")
    }
    useEffect(()=>{
    },[])
    return (
        <>
            <div className='text-bold box-border flex justify-center bg-gray-200 h-[450px] p-8'>
                <div className=' mt-8 text-bold'>
                    <form id ="forgot-pass"  className='px-36 py-8 bg-white rounded-md' onSubmit={handleSubmit}>
                    <h4 className='my-2 font-medium text-lg inline-block'>Forgot Password</h4>
                        <div>
                            <label>Email</label>
                            <input type="email" name="email" placeholder='Enter your email here'  onChange={handleChange} className="px-3 my-2 border-2 rounded-md  border-violet-200" /> 
                            {success && <p className='mt-0 text-[#1BDA9C] opacity-100 text-sm pl-2 pb-4'>{success}</p>}
                            {error && <p className='mt-0 text-pink-600 opacity-100 text-sm pl-2 pb-4'>{error}</p>}
                        </div>
                        <div>
                            <input type="submit" value="Send Password Reset link" className="bg-[#8751c4] hover:bg-violet-400 text-white font-bold py-2 px-4 mr-2 rounded-md" />
                        </div>
                    </form>
                </div>
            </div>
        </> 
    )
}

export default ForgotPassword
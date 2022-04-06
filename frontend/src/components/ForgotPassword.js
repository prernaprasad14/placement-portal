import React,{useState} from 'react'
import logo from "../img/logo.png"
import { Link } from 'react-router-dom'
import axios from '../axiosConfig';


const ForgotPassword = () =>{
  
    const initialValues=[{
        email:''
    }]

    const [email , setEmail] = useState(initialValues)
    
    function onChangeUserEmail (e){
        let name =  e.target.name
        let value =  e.target.value
        console.log(`1 ${name}, ${value}`)
        setEmail({...email, [name]:value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();

        console.log(`2 email `)
        console.log(`3 email:: ${email}`)
        console.log(`4 email:: JSON.stringify(email) `+JSON.stringify(email))
        await axios.post('api/user/forgot-password/', email)
            .then((res) => {
                console.log(res.json(email))
            }).catch((error) => {
                console.log(error)
            });
        
        console.log(`5 email :: JSON.stringify(email) `+JSON.stringify(email))
    }
    return (
        
        <div className='text-bold box-border flex justify-center bg-gray-200 h-[450px] p-8'>
            <div className=' mt-24 text-bold'>

                 <form id ="forgot-pass"  className='px-36 py-8 bg-white rounded-md' onSubmit={handleSubmit}>
                    
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" placeholder='Enter your email here' defaultValue='' onChange={onChangeUserEmail} className="px-3 my-2 border-2 rounded-md  border-violet-200" /> 
                    </div>
                    <div>
                        <input type="submit" value="Send Password Reset link" className="bg-[#8751c4] hover:bg-violet-400 text-white font-bold py-2 px-4 mr-2 rounded-md" />
                    </div>
                </form>
                </div>
            </div>
    )
}

export default ForgotPassword
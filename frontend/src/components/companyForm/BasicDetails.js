import {useNavigate, Link} from 'react-router-dom';
import React, { Component ,useState} from 'react';
import axios from '../../axiosConfig';



const BasicDetails = ({ nextStep, handleChange, values }) => {


    console.log(`Basic Details:: values: ${values}`)
    const [error, setError] = useState(false);
    const navigate = useNavigate(); 
    const Continue = async(e) =>{
        
        e.preventDefault()
        nextStep()
        // console.log("values.email"+values.email)
        // const check={email:values.email}
        // console.log(check)
        // await axios.get("api/company/verify-email", check)
        // .then((res) => {
        //     console.log("4.1 res.data: "+res) 
        //     const success= JSON.stringify(res.data.success)
        //     console.log("const status = JSON.stringify(res.data.success)"+ success )
        //     if(success)
        //       nextStep()
        //       else{
        //         alert('You already have an account')
        //         navigate(`/login`)
        //       }
        // }).catch(err=>{
            
        //     console.log("Error: "+err)
        // })
          
               
    }
   
    return(    
        <>
        <div className='text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className="my-5 p-4 text-md font-semibold text-white bg-[#7947b3] rounded-md">Step 1/6 : Company Details</h1>
            <form form className='px-36 py-8 drop-shadow-[0_0_3px_rgba(0,0,0,0.1)] bg-white rounded-lg ' >
                <p>Fields marked as<span className='text-pink-600'>*</span> are mandatory to fill</p>
                    <div className="my-5">
                        <label className='m-0 p-0'>Email</label>
                        <input type="text"  onChange={handleChange('email')} defaultValue={values.email}
                        className="px-3 my-2 border-2 rounded-md  border-violet-200" />
                    </div>
                    <div className="my-5">
                        <label className='m-0 p-0'>Name of the company<span className='text-pink-600'>*</span></label>
                        <input type="text" onChange={handleChange('cname')} defaultValue={values.cname}
                             className="px-3 my-2 border-2 rounded-md  border-violet-200" />
                    </div>
                    <div className="my-5">
                        <label className='m-0 p-0'>Website<span className='text-pink-600'>*</span></label>
                        <input type="text"  onChange={handleChange('website')} defaultValue={values.website}
                             className="px-3 my-2 border-2 rounded-md  border-violet-200" />
                    </div>
                    <div className="my-5">
                        <label className="m-0 p-0">Phone number <span className='text-pink-600'>*</span></label>
                        <input type="text" placeholder="" min="0" max="9" onChange={handleChange('phone')} defaultValue={values.phone}
                            className="px-3 my-2 border-2 rounded-md  border-violet-200" />
                    </div>
                    <button type="submit" className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 ml-[218px] rounded-md" onClick={ Continue } >Save and Continue</button>
                    <p>{error && <span> The following fields cannot be empty. Please fill them to proceed</span>}</p>
                </form>
            </div>
        </div>  
        </>
    ) 
}

export default BasicDetails

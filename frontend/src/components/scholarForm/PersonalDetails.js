import {useNavigate, Link} from 'react-router-dom';
import React, { Component ,useState} from 'react';


import {scholarSchema} from '../../validation/scholarValidation.js'

const PersonalDetails = ({ nextStep, handleChange, values }) => {

   
    const [error, setError] = useState(false);
    console.log("1values")
    console.log(values)
    // const [disable, setDisable] = useState(false)
    const Continue = e =>{
        e.preventDefault()  
        console.log("2values")
        console.log(values)
        // const isValid=e.target.classList.contains('invalid')
        // if(!isValid)
        // {
        //     console.log("handleChange")
        //     setError(true)
        // }
        
        // console.log("1 btn clicked")        
        // if(!fname|| !lname || !dob || !gender || !phone ||
        //     !perma_addr1 || !perma_addr2 || !perma_city || !perma_state || !perma_pin || 
        //     !corr_addr1 || !corr_addr2 || !corr_city || !corr_state || !corr_pin){
        //         console.log("2 Continue: error true")        
        //     setError(true)
        // }
        // else{
        //     console.log("3 Continue: error false")
        //     setError(false)
        // }
        //    else{
        //     setError(false)
            
        //    }
          nextStep();
    }
   
    return(    
        <>
        <div className='text-bold box-border flex justify-center bg-gray-100  h-auto p-8'>
            <div className='text-bold'>
            <h1 className="my-5 p-4 text-md font-semibold text-white bg-[#7947b3] rounded-lg ">Step 1/6 : Personal Details</h1>
            <form className='px-36 py-8 drop-shadow-[0_0_3px_rgba(0,0,0,0.1)] bg-white rounded-lg ' >
                <p className='text-sm'>Instructions</p>
                <p className='text-sm'>1. This form requires 10-15 mins to fill</p>
                <p className='text-sm'>2. Fill all details carefully</p>
                <p className='text-sm'>4. Fields marked with <span className='text-pink-600'>*</span> are mandatory to fill</p>
                    <div>
                        <label >First name <span className='text-pink-600'>*</span></label>
                        <input type="text" name="fname" onChange={handleChange('fname')} value={values.fname}
                             className="px-3 my-1 border-2 rounded-lg border-violet-200" />
                        <p>First Name should be 3 to 20 characters long </p>       
                    </div>
                    <div>
                        <label >Last name <span className='text-pink-600'>*</span></label>
                        <input type="text" name="lname" onChange={handleChange('lname')} value={values.lname}
                             className="px-3  my-1 border-2 rounded-lg border-violet-200" />
                        <p>Last Name should be 3 to 20 characters long </p>
                    </div>
                    <div className='my-5'> 
                        <label>Date of Birth <span className='text-pink-600'>*</span></label>
                        <input type="date" name="dob" onChange={handleChange('dob')} defaultValue={values.dob}
                                className=" hover:cursor-pointer px-3 my-1 border-2 rounded-lg  border-violet-200" />
                        <p>Enter a valid birth date which is a past date</p>
                    </div>
                    <div onChange={handleChange('gender')} name="gender" defaultValue={values.gender} className=" my-1 inline-block ">
                        <p className='font-semibold'>Gender<span className='text-pink-600'>*</span></p>
                        <div className='mr-2  inline-block'>
                            <input required type="radio" name="group1" value="Male" className=" hover:cursor-pointer p-2  text-lg  my-3 border-2  border-violet-200"/>
                            <label className="px-4" htmlFor="male" >Male</label>
                        </div>
                        <div className='mr-2  inline-block'>
                            <input type="radio" name="group1" value="Female" className="  hover:cursor-pointer p-2  text-lg  my-3 border-2  border-violet-200"/>
                            <label className="px-4" htmlFor="female">Female</label>
                        </div>
                        <div className='mr-2  inline-block'>
                            <input type="radio" name="group1" value="Prefer not to say"className="  hover:cursor-pointer p-2   text-lg  my-3 border-2  border-violet-200"/>
                            <label className="px-4" htmlFor="preferNotToSay">Prefer not to say</label>
                        </div> 
                        <p className='text-md text-gray-500 ml-[20px]'>Please select an option</p>
                    </div>
                    <div>
                        <label>Phone number <span className='text-pink-600'>*</span></label>
                        <input type="text" name="phone" placeholder="" min="0" max="9" onChange={handleChange('phone')}  defaultValue={values.phone}
                            className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                        <p>Enter a valid 10-digit phone number</p>

                    </div>
                    <div>
                        <label>Alternative Phone number <span className='text-xs text-gray-500'>(optional)</span> </label>
                        <input type="text" name="alternative_phone" placeholder="" min="0" max="9" onChange={handleChange('alternative_phone')} defaultValue={values.alternative_phone}
                            className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                        <p>Enter a valid 10-digit phone number</p>
                    </div>
                    <div className='my-8'>
                        <p className='font-bold'>Permanent Address</p>
                         <div>
                             <label>Address Line 1 <span className='text-pink-600'>*</span></label>
                            <input type="text" name="perma_addr1" placeholder="" onChange={handleChange('perma_addr1')} defaultValue={values.perma_addr1} 
                                className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                            <p>This is a required field</p>

                         </div>
                         <div>
                             <label>Address Line 2 <span className='text-pink-600'>*</span></label>
                            <input type="text"  name="perma_addr2"placeholder="" onChange={handleChange('perma_addr2')} defaultValue={values.perma_addr2} 
                                className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                            <p>This is a required field</p>

                         </div>
                         <div>
                             <label>State <span className='text-pink-600'>*</span></label>
                            <input type="text"name="perma_state"  placeholder="" onChange={handleChange('perma_state')} defaultValue={values.perma_state} 
                                className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                            <p>This is a required field</p>

                         </div>
                         <div>
                             <label>City <span className='text-pink-600'>*</span></label>
                            <input type="text"  name="perma_city" placeholder="" onChange={handleChange('perma_city')} defaultValue={values.perma_city} 
                                className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                            <p>This is a required field</p>

                         </div>
                         <div>
                             <label>PIN <span className='text-pink-600'>*</span></label>
                            <input type="text" name="perma_pin" min="0" max="9"  placeholder="" onChange={handleChange('perma_pin')} defaultValue={values.perma_pin} 
                                className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                            <p>This is a required field</p> 

                         </div>
                    </div>
                    <div className='my-5'>
                    <p className='font-bold'>Correspondence Address</p>
                    
                    <div>
                        <label>Address Line 1 <span className='text-pink-600'>*</span></label>
                        <input type="text" name="corr_addr1" placeholder="" onChange={handleChange('corr_addr1')} defaultValue={values.corr_addr1} 
                        className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                        <p>This is a required field</p>

                    </div>
                    <div>
                        <label>Address Line 2 <span className='text-pink-600'>*</span></label>
                        <input type="text" name="corr_addr2" placeholder="" onChange={handleChange('corr_addr2')} defaultValue={values.corr_addr2} 
                        className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                        <p>This is a required field</p>

                    </div>
                    <div>
                        <label>State <span className='text-pink-600'>*</span></label>
                        <input type="text" name="corr_state" placeholder="" onChange={handleChange('corr_state')} defaultValue={values.corr_state} 
                        className="px-3 my-1  border-2 rounded-lg  border-violet-200" />
                        <p>This is a required field</p>

                    </div>
                    <div>
                        <label>City<span className='text-pink-600'>*</span></label>
                        <input type="text" name="corr_city" placeholder="" onChange={handleChange('corr_city')} defaultValue={values.corr_city} 
                        className="px-3 my-1  border-2 rounded-lg  border-violet-200" />
                        <p>This is a required field</p>

                    </div>
                    <div>
                        <label>PIN <span className='text-pink-600'>*</span></label>
                        <input type="text"  name="corr_pin" min="0" max="9"placeholder="" onChange={handleChange('corr_pin')} defaultValue={values.corr_pin} 
                        className="px-3 my-1  border-2 rounded-lg  border-violet-200" />
                        <p>PIN should be a number</p>

                    </div>
                    {error && <p className='text-pink-600'>Please fill all the required* fields before proceeding</p>} 
                    </div>
                    <button type="button" className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 ml-[214px] rounded-lg" onClick={ Continue } >Save and Continue</button>
                </form>
            </div>
        </div>  
        </>
    ) 
}

export default PersonalDetails

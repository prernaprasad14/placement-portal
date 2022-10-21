import React, {useEffect,useState} from 'react';
import validator from 'validator'
import {states} from '../../helpers/dropDownOptions'
const PersonalDetails = ({complete, nextStep, isValid, handleChange, values }) => {

    const [error, setError] = useState({
        emptyField:false,
        invalidFormat:false
    });

    const Continue = (e) =>{
        e.preventDefault()  
      console.log(isValid)

        try{
           if (
          validator.isEmpty(values.fname) ||
          validator.isEmpty(values.lname) ||
          validator.isEmpty(values.dob) ||
          validator.isEmpty(values.gender) ||
          validator.isEmpty(values.phone) ||
          validator.isEmpty(values.perma_addr1) ||
          validator.isEmpty(values.perma_addr2) ||
          validator.isEmpty(values.perma_city) ||
          validator.isEmpty(values.perma_state) ||
          validator.isEmpty(values.perma_pin) ||
          validator.isEmpty(values.corr_addr1) ||
          validator.isEmpty(values.corr_addr2) ||
          validator.isEmpty(values.corr_city) ||
          validator.isEmpty(values.corr_state) ||
          validator.isEmpty(values.corr_pin) 
        ) {
          setError(prevState => ({
            emptyField: {            
                ...prevState.error,    
                emptyField: true      
            }
        }))
        }else if(
            !validator.isLength(values.fname,{min:3, max:20})||
            !validator.isLength(values.lname,{min:3, max:20})||
            !validator.isNumeric(values.phone) ||
            values.phone.length<10 ||values.phone.length>12||
            !validator.isLength(values.dob,{min:3, max:20})||
            !validator.isLength(values.perma_addr1,{min:8, max:70})||
            !validator.isLength(values.perma_addr2,{min:8, max:40})||
            !validator.isLength(values.perma_city,{max:20})||
            !validator.isLength(values.perma_state,{max:20})||
            !validator.isLength(values.perma_pin,{ min:6, max:9})||
            !validator.isLength(values.corr_addr1,{min:8, max:70})||
            !validator.isLength(values.corr_addr2,{min:8, max:40})||
            !validator.isLength(values.corr_city,{max:20})||
            !validator.isLength(values.corr_state,{max:20})||
            (!validator.isEmpty(values.alternative_phone) &&  ((values.alternative_phone.length<10 || values.alternative_phone.length>12)))||
            (!validator.isEmpty(values.alternative_phone) && !validator.isNumeric(values.alternative_phone))||
            !validator.isNumeric(values.phone)||
            !validator.isLength(values.corr_pin,{min:6, max:9})
        )
        {
            setError(prevState => ({
                invalidFormat: {           
                    ...prevState.error,    
                    invalidFormat: true     
                }
            }))
            
        }
        else{
            nextStep();
        }
    }
    catch(err){
        console.log(err)
    }
    }
    
    
    return(    
        <>
        <div className='form-head text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className='flex justify-center sm:justify-start my-2 p-3 text-md font-semibold text-white rounded-md '>Step 1/7 : Personal Details</h1>
            <div className=''>

            
            <form className='px-36 py-4 bg-white rounded-md ' >
                <p className='font-semibold'>Email - <span>{values.email}</span></p>
                <p className='text-sm'>Instructions</p>
                <p className='text-sm'>1. This form requires 10-15 mins to fill</p>
                <p className='text-sm'>2. Fill all details carefully</p>
                <p className='text-sm'>4. Fields marked with <span className='text-pink-600'>*</span> are mandatory to fill</p>
                    <div className='form-group mt-5'>
                        <label >First name <span className='text-pink-600'>*</span></label>
                        <input required type='text' name='fname' onChange={handleChange('fname')} value={values.fname}
                             className={isValid.fname===null ?'border-2 rounded-md border-violet-200': isValid.fname?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                       { isValid.fname===false && <p>First Name should be 3 to 20 characters long </p> }                             
                    </div>
                    <div className='form-group'>
                        <label >Last name <span className='text-pink-600'>*</span></label>
                        <input required type='text' name='lname' onChange={handleChange('lname')} value={values.lname}
                            className={isValid.lname===null ?'border-2 rounded-md border-violet-200': isValid.lname?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                        { isValid.lname===false && <p>Last Name should be 3 to 20 characters long </p> }
                    </div>
                    <div className='form-group'> 
                        <label>Date of Birth <span className='text-pink-600'>*</span></label>
                        <input required min="1997-12-31" max="2002-12-031" type='date' name='dob' onChange={handleChange('dob')} defaultValue={values.dob}
                                className=' hover:cursor-pointer  border-2 rounded-md  border-violet-200' />
                        { isValid.dob===false && <p>Enter a valid birth date which is a past date</p>}
                    </div>
                    <div onChange={handleChange('gender')} name='gender' defaultValue={values.gender} className='form-group'>
                        <p className='font-semibold'>Gender<span className='text-pink-600'>*</span></p>
                        <div className='mr-2  inline-block'>
                            <input required type='radio' checked={values.gender==='Male'} name='group1' value='Male' className=' hover:cursor-pointer p-2  text-lg  my-3 border-2  border-violet-200'/>
                            <label className='px-4' htmlFor='Male' >Male</label>
                        </div>
                        <div className='mr-2  inline-block'>
                            <input type='radio' name='group1' checked={values.gender==='Female'} value='Female' className='  hover:cursor-pointer p-2  text-lg  my-3 border-2  border-violet-200'/>
                            <label className='px-4' htmlFor='Female'>Female</label>
                        </div>
                        <div className='mr-2  inline-block'>
                            <input type='radio' name='group1' checked={values.gender==='Prefer not to say'} value='Prefer not to say' className='  hover:cursor-pointer p-2   text-lg  my-3 border-2  border-violet-200'/>
                            <label className='px-4' htmlFor='Prefer not to say'>Prefer not to say</label>
                        </div> 
                        { isValid.gender===false && <p className='text-md text-gray-500 mb-6 ml-[20px]'>Please select an option</p>}
                    </div>
                    <div className='form-group'>
                        <label>Phone number <span className='text-pink-600'>*</span></label>
                        <input required  type='text' name='phone' placeholder='' min='0' max='9' onChange={handleChange('phone')}  defaultValue={values.phone}
                             className={isValid.phone===null ?'border-2 rounded-md border-violet-200': isValid.phone?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                        { isValid.phone===false && <p>Enter a valid 10-digit phone number</p>}

                    </div>
                    <div className='form-group'>
                        <label>Alternative Phone number <span className='text-xs text-gray-500'>(optional)</span> </label>
                        <input type='text' name='alternative_phone' placeholder='' min='0' max='9' onChange={handleChange('alternative_phone')} defaultValue={values.alternative_phone}
                             className={isValid.alternative_phone===null ?'border-2 rounded-md border-violet-200': isValid.alternative_phone?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                       {isValid.alternative_phone===false && <p>Enter a valid 10-digit phone number</p>}
                    </div>
                    <div className='form-group mt-3 border-t-2 border-slate-200'>
                        <p className='font-bold mt-2 py-2'>Permanent Address</p>
                         <div>
                             <label>Address Line 1 <span className='text-pink-600'>*</span></label>
                            <input required  type='text' name='perma_addr1' placeholder='' onChange={handleChange('perma_addr1')} defaultValue={values.perma_addr1} 
                             className={isValid.perma_addr1===null ?'border-2 rounded-md border-violet-200': isValid.perma_addr1?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                            { isValid.perma_addr1===false && <p>Address Line 1 must be 8 to 30 characters</p>}


                         </div>
                         <div>
                            <label>Address Line 2 <span className='text-pink-600'>*</span></label>
                            <input required  type='text'  name='perma_addr2'placeholder='' onChange={handleChange('perma_addr2')} defaultValue={values.perma_addr2} 
                             className={isValid.perma_addr2===null ?'border-2 rounded-md border-violet-200': isValid.perma_addr2?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                            { isValid.perma_addr2===false && <p>Address Line 2 must be 8 to 30 characters</p>}


                         </div>
                         <div>
                            <label className='block mb-1'>State <span className='text-pink-600'>*</span></label>
                            <select required onChange={handleChange('perma_state')} defaultValue={values.perma_state} 
                            className={isValid.perma_state===null? 'w-56 p-1 text-sm sm:text-lg  rounded-[5px] border-2 border-slate-300 text-slate-600' 
                            : isValid.perma_state===false?  'w-56 px-2 py-1 text-sm sm:text-lg  rounded-[5px] border-2 text-slate-600 border-[#DB2777]': 'w-56 p-1 border-[#1BDA9C]  text-sm sm:text-lg rounded-[5px] border-2 text-slate-600 '}>
                            <option selected value="">Select an option</option>
                            {states.map(state=><option>{state}</option>)}
                          </select>
                          {isValid.perma_state===false && <p className='font-baseline text-pink-600' >Select an option</p>}

                         </div>
                         {/* <div>
                             <label>State <span className='text-pink-600'>*</span></label>
                            <input required  type='text'name='perma_state'  placeholder='' onChange={handleChange('perma_state')} defaultValue={values.perma_state} 
                             className={isValid.perma_state===null ?'border-2 rounded-md border-violet-200': isValid.perma_state?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                            { isValid.perma_state===false && <p>This is a required field</p>}

                         </div> */}
                         <div>
                            <label>City <span className='text-pink-600'>*</span></label>
                            <input required  type='text'  name='perma_city' placeholder='' onChange={handleChange('perma_city')} defaultValue={values.perma_city} 
                             className={isValid.perma_city===null ?'border-2 rounded-md border-violet-200': isValid.perma_city?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                             { isValid.perma_city===false && <p>This is a required field</p>}

                         </div>
                         <div>
                             <label>PIN <span className='text-pink-600'>*</span></label>
                            <input type='text' name='perma_pin' min='0' max='9'  placeholder='' onChange={handleChange('perma_pin')} defaultValue={values.perma_pin} 
                             className={isValid.perma_pin===null ?'border-2 rounded-md border-violet-200': isValid.perma_pin?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                            { isValid.perma_pin===false && <p>PIN should be  6 to 9 digits</p> }

                         </div>
                    </div>
                    <div className='form-group mt-3  border-t-2 border-slate-200'>
                    <p className='font-bold mt-2 py-2'>Correspondence Address</p>
                    
                    <div>
                        <label>Address Line 1 <span className='text-pink-600'>*</span></label>
                        <input required  type='text' name='corr_addr1' placeholder='' onChange={handleChange('corr_addr1')} defaultValue={values.corr_addr1} 
                             className={isValid.corr_addr1===null ?'border-2 rounded-md border-violet-200': isValid.corr_addr1?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                         { isValid.corr_addr1===false && <p>Address Line 1 must be 8 to 30 characters</p>}

                    </div>
                    <div>
                        <label>Address Line 2 <span className='text-pink-600'>*</span></label>
                        <input required  type='text' name='corr_addr2' placeholder='' onChange={handleChange('corr_addr2')} defaultValue={values.corr_addr2} 
                             className={isValid.corr_addr2===null ?'border-2 rounded-md border-violet-200': isValid.corr_addr2?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                        { isValid.corr_addr2===false && <p>Address Line 2 must be 8 to 30 characters</p>}

                    </div>
                    <div>
                            <label className='block mb-2'>State <span className='text-pink-600'>*</span></label>
                            <select required onChange={handleChange('corr_state')} defaultValue={values.corr_state} 
                            className={isValid.corr_state===null? 'w-56 p-1 text-sm sm:text-lg  rounded-[5px] border-2 border-slate-300 text-slate-600' 
                            : isValid.corr_state===false?  'w-56 px-2 py-1 text-sm sm:text-lg  rounded-[5px] border-2 text-slate-600 border-[#DB2777]': 'w-56 p-1 border-[#1BDA9C]  text-sm sm:text-lg rounded-[5px] border-2 text-slate-600 '}>
                            <option selected value="">Select an option</option>
                            {states.map(state=><option>{state}</option>)}
                          </select>
                          {isValid.corr_state===false && <p className='font-baseline text-pink-600' >Select an option</p>}

                         </div>
                    {/* <div>
                        <label>State <span className='text-pink-600'>*</span></label>
                        <input required  type='text' name='corr_state' placeholder='' onChange={handleChange('corr_state')} defaultValue={values.corr_state} 
                             className={isValid.corr_state===null ?'border-2 rounded-md border-violet-200': isValid.corr_state?'border-2 focus:ring-inset rounded-md border-[#1BDA9C]':'border-2 focus:ring-inset rounded-md border-[#DB2777]' }/>
                        { isValid.corr_state===false && <p>This should atleast 3 characters</p>}

                    </div> */}
                    <div>
                        <label>City<span className='text-pink-600'>*</span></label>
                        <input required  type='text' name='corr_city' placeholder='' onChange={handleChange('corr_city')} defaultValue={values.corr_city} 
                             className={isValid.corr_city===null ?'border-2 rounded-md border-violet-200': isValid.corr_city?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                         { isValid.corr_city===false && <p>This should atleast 3 characters</p>}

                    </div>
                    <div>
                        <label>PIN <span className='text-pink-600'>*</span></label>
                        <input required  type='text'  name='corr_pin' min='0' max='9'placeholder='' onChange={handleChange('corr_pin')} defaultValue={values.corr_pin} 
                             className={isValid.corr_pin===null ?'border-2 rounded-md border-violet-200 focus:ring-inset ': isValid.corr_pin?'border-2   rounded-md border-[#1BDA9C]':'border-2  rounded-md border-[#DB2777]' }/>
                             { isValid.corr_pin===false && <p>PIN should be  6 to 9 digits</p>}

                    </div>
                        {error.emptyField && <p name='emptyField' className='text-[#d03863] font-semibold'>Please fill all the required* fields before proceeding</p>} 
                        {error.invalidFormat && <p name='invalidFormat' className='text-[#d03863] font-semibold'>Please fill fields in the requied format before proceeding</p>} 
                    </div>
                    <div className='flex flex-row justify-center'>            
                        <button className='mx-3 my-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4  rounded-md' onClick={ Continue } type='submit' >Continue</button>
                    </div>
                </form>
            </div>
            </div>
        </div>  
        </>
    ) 
}

export default PersonalDetails

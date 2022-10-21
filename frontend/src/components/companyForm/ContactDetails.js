import React, { useEffect, useState } from 'react'
import validator from 'validator'

const ContactDetails = ({ isValid, prevStep, nextStep, handleChange, values }) => {
 
  const [error, setError] = useState({
    emptyField:false,
    invalidFormat:false
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const Continue = e => {
    e.preventDefault()
    if(validator.isEmpty(values.head_email)|| validator.isEmpty(values.head_mobile)||validator.isEmpty(values.head_name)||
    validator.isEmpty(values.second_email)|| validator.isEmpty(values.second_mobile)||validator.isEmpty(values.second_name))
    {
        setError(prevState => ({
            emptyField: {
                ...prevState.error,
                emptyField: true 
            }
        }))
    }else  if(!validator.isEmail(values.head_email)|| !validator.isNumeric(values.head_mobile)||
      !validator.isEmail(values.second_email)|| !validator.isNumeric(values.second_mobile))
      {
      setError(prevState => ({
        invalidFormat: {           
          ...prevState.error,    
          invalidFormat: true     
        }
      }))
    }else  if(!isValid.head_email|| !isValid.head_mobile||!isValid.head_name||
      !isValid.second_email|| !isValid.second_mobile||!isValid.second_name)
      {
        setError(prevState => ({
        invalidFormat: {           
          ...prevState.error,    
          invalidFormat: true     
        }
        
      }))
    }
    else{
        nextStep()
    }
  }
  
  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  return (
    <>
        <div className='form-head text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className='flex justify-center sm:justify-start my-2 p-3 text-md font-semibold text-white rounded-md'>Step 2/7 : Contact Details</h1>
            <form id ="contactdetails"  className='px-40 py-8 bg-white rounded-md'>
              <p>Required <span className='text-pink-600'>*</span></p>
              <div className='my-8'>
                <p className='font-bold'>HR contact details</p>
                  <div className='form-group'>
                      <label>Name<span className='text-pink-600'>*</span></label>
                    <input type="text"  placeholder="" onChange={handleChange('head_name')} defaultValue={values.head_name} 
                         className={isValid.head_name===null ?'border-2 rounded-md border-violet-200': isValid.head_name?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]'}/>
                         { isValid.head_name===false && <p>Full name from 3 to 20 characters</p>}
                   
                  </div>
                  <div className='form-group'>
                      <label>Email<span className='text-pink-600'>*</span></label>
                      <input type="email"  placeholder="" onChange={handleChange('head_email')} defaultValue={values.head_email} 
                         className={isValid.head_email===null ?'border-2 rounded-md border-violet-200': isValid.head_email?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]'}/>
                         { isValid.head_email===false && <p>Provide email address</p>}
                   
                  </div>
                  <div className='form-group'>
                      <label>Mobile <span className='text-pink-600'>*</span></label>
                      <input type="text"  placeholder="" onChange={handleChange('head_mobile')} defaultValue={values.head_mobile} 
                        className={isValid.head_mobile===null ?'border-2 rounded-md border-violet-200': isValid.head_mobile?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]'}/>
                            { isValid.head_mobile===false && <p>Provide a 10digit mobile no.</p>}
                      
                  </div>
                </div>
              <div className='my-8'>
                <p className='font-bold'>Second contact person</p>
                  <div className='form-group'>
                      <label>Name<span className='text-pink-600'>*</span></label>
                    <input type="text"  placeholder="" onChange={handleChange('second_name')} defaultValue={values.second_name} 
                        className={isValid.second_name===null ?'border-2 rounded-md border-violet-200': isValid.second_name?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]'}/>
                            { isValid.second_name===false && <p>Full name from 3 to 20 characters</p>}
                      
                  </div>
                  <div className='form-group'>
                      <label>Email<span className='text-pink-600'>*</span></label>
                      <input type="email"  placeholder="" onChange={handleChange('second_email')} defaultValue={values.second_email} 
                        className={isValid.second_email===null ?'border-2 rounded-md border-violet-200': isValid.second_email?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]'}/>
                            { isValid.second_email===false && <p>Provide email address</p>}
                      
                  </div>
                  <div className='form-group'>
                      <label>Mobile<span className='text-pink-600'>*</span></label>
                    <input type="text"  placeholder="" onChange={handleChange('second_mobile')} defaultValue={values.second_mobile} 
                        className={isValid.second_mobile===null ?'border-2 rounded-md border-violet-200': isValid.second_mobile?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                            { isValid.second_mobile===false && <p>Provide a 10digit mobile no.</p>}
                      
                  </div>
                </div>
                {error.emptyField && <p name="emptyField" className='text-[#d03863] font-semibold'>Please fill all the required* fields before proceeding</p>} 
                {error.invalidFormat && <p name="invalidFormat" className='text-[#d03863] font-semibold'>Please fill fields in the requied format before proceeding</p>} 
           
                <div className='flex flex-row justify-center'>            
                    <button className='mx-3 my-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 rounded-md' onClick={ Previous } type='submit'>Previous</button>
                    <button className='mx-3 my-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4  rounded-md' onClick={ Continue } type='submit' >Continue</button>
              </div>
            </form>
      </div>
      </div>
    </>

  )
}

export default ContactDetails
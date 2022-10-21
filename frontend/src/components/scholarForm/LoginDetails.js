import {useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from '../../axiosConfig';
// import {scholarSchema} from '../../validation/scholarValidation.js'
import validator from 'validator'

const LoginDetails=({isValid, prevStep, handleChange, values }) => {

  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const [success, setSuccess]= useState(false)

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
  
    const Previous = e => {
      e.preventDefault();
      prevStep();
    }

    const onSubmit= async(e) => { 

      try{
        e.preventDefault();
        if (
          validator.isEmpty(values.email) ||
          validator.isEmpty(values.username) ||
          validator.isEmpty(values.password) ||
          validator.isEmpty(values.confirmPassword)
        ){
          setError('Fill all the fields');
        }else if(values.password!== values.confirmPassword ){
          setError('Passwords do not match');
        } else if(values.password.length<8 || values.password.length>20){
          setError('Passwords should be 8 to 20 characters');
        }   
        else{

          const studentData = {
      
            email:values.email,
            password:values.password,
            confirmPassword:values.confirmPassword,
            username:values.username,
        
            fname:values.fname,
            lname:values.lname,
            dob:values.dob,
            gender:values.gender,
            phone:values.phone,
            alternative_phone:values.alternative_phone,

            perma_addr1:values.perma_addr1,
            perma_addr2:values.perma_addr2,
            perma_state:values.perma_state,
            perma_city:values.perma_city,
            perma_pin:values.perma_pin,

            corr_addr1:values.corr_addr1,
            corr_addr2:values.corr_addr2,
            corr_state:values.corr_state,
            corr_city:values.corr_city,
            corr_pin:values.corr_pin,

            pg_course :values.pg_course,
            pg_exam_roll :values.pg_exam_roll,
            pg_class_roll :values.pg_class_roll,
            pg_aggr_percentage :values.pg_aggr_percentage,
            pg_backlogs :values.pg_backlogs,
            pg_backlog_details :values.pg_backlog_details,

            grad_college :values.grad_college,
            grad_university :values.grad_university,
            grad_course :values.grad_course,
            grad_roll_no :values.grad_roll_no,
            grad_marks_obtained :values.grad_marks_obtained,
            grad_max_marks :values.grad_max_marks,
            grad_aggr_percentage :values.grad_aggr_percentage,
            grad_year_of_passing :values.grad_year_of_passing,

            inter_board:values.inter_board,
            inter_roll_no:values.inter_roll_no,
            inter_marks_obtained:values.inter_marks_obtained,
            inter_max_marks:values.inter_max_marks,
            inter_aggr_percentage:values.inter_aggr_percentage,
            inter_year_of_passing:values.inter_year_of_passing,

            high_board:values.high_board,
            high_roll_no:values.high_roll_no,
            high_marks_obtained:values.high_marks_obtained,
            high_max_marks:values.high_max_marks,
            high_aggr_percentage:values.high_aggr_percentage,
            high_year_of_passing:values.high_year_of_passing
           };
          // const isValid = await scholarSchema.isValid(studentData)
          await axios.post(`api/scholar/register`, studentData)
             .then((res) => {
                if(res.status===201){
                  setSuccess(true)
                  alert('Registration successful')
                  navigate(`/login`)
                  console.log(res) 
                }else{
                  console.log(res) 
                  alert('Already registered')
                  navigate(`/login`)
                }
        }).catch((error) => {
            setError(error.response.data.error.map(err=><li>{err.msg}</li>))
            console.log(error.response.data.error.map(err=>console.log(err.msg))) 
        });
      }
    }catch(error){
      console.log('Error occurred',error)
    }
  }
  
  return(  
    <>
    {    console.log(values.email)}

    {    console.log(values.username)}
       <div className='form-head text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className='flex justify-center sm:justify-start my-2 p-3 text-md font-semibold text-white rounded-md'>Step 7 (Final) :  Login Details</h1>
            <form  className='px-36 py-8 bg-white rounded-md'>
            <p className='text-sm font-semibold'>Set a strong password (8 to 20charaters)</p>
              <div>
                <label >Password<span className='text-pink-600'>*</span></label>
                <input type='password' placeholder='**********' name='password' onChange={handleChange('password')} defaultValue={values.password}
                   className={isValid.password===null ?'border-2 rounded-md border-violet-200': isValid.password?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>         
               { isValid.password===false && <p>Password should be 8 to 20 characters</p>}
              </div>
              <div>
                <label >Confirm password<span className='text-pink-600'>*</span></label>
                <input type='password' placeholder='**********' name='confirmPassword' onChange={handleChange('confirmPassword')} defaultValue={values.confirmPassword}
                  className={isValid.confirmPassword===null ?'border-2 rounded-md border-violet-200': isValid.confirmPassword?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.confirmPassword===false && <p>This is a required field</p>}
              </div>
              { error.length > 0 && 
                <p className='text-pink-600'>
                  <ul className='ml-4 my-2 list-decimal'>{error}</ul>
                </p>
              }
              <div className='flex flex-row justify-center'>            
                <button className='my-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4  rounded-md'  onClick={ onSubmit} type='submit' >Submit</button>
              </div>
        </form>
        </div>
      </div>
    </>
  )
}
export default LoginDetails
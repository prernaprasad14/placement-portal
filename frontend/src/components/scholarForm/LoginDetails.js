import {useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from '../../axiosConfig';
import Success from './Confirm';
import {scholarSchema} from '../../validation/scholarValidation.js'

const LoginDetails=({ prevStep, handleChange, values }) => {

  console.log("values"+values)
  console.log("values"+ JSON.stringify(values))
  console.log("values.email"+ JSON.stringify(values.email))
  
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
      console.log("1. LoginDetails page, inside onsubmit: ")

      console.log("1.1 values:: "+JSON.stringify(values))
      try{
        e.preventDefault();
       
        console.log(`2.  LoginDetails try-block, inside onsubmit: hello`);
         const studentData = {
          "loginDetails":{
             email:values.email,
             password:values.password,
             confirmPassword:values.confirmPassword,
             username:values.username
           },
             "personalDetails":{
                 fname:values.fname,
                 lname:values.lname,
                 dob:values.dob,
                 gender:values.gender,
                 phone:values.phone,
                 alternative_phone:values.alternative_phone,
                "permanent_addr":{
                  perma_addr1:values.perma_addr1,
                  perma_addr2:values.perma_addr2,
                  perma_state:values.perma_state,
                  perma_city:values.perma_city,
                  perma_pin:values.perma_pin,
                  },
                "correspondence_addr":{
                  corr_addr1:values.corr_addr1,
                  corr_addr2:values.corr_addr2,
                  corr_state:values.corr_state,
                  corr_city:values.corr_city,
                  corr_pin:values.corr_pin,
                }
             },
             "postGraduationDetails":{
               pg_course :values.pg_course,
               pg_exam_roll :values.pg_exam_roll,
               pg_class_roll :values.pg_class_roll,
               pg_aggr_percentage :values.pg_aggr_percentage,
               pg_backlogs :values.pg_backlogs,
               pg_backlog_details :values.pg_backlog_details
             },
             "graduationDetails" :{
               grad_college :values.grad_college,
               grad_university :values.grad_university,
               grad_course :values.grad_course,
               grad_roll_no :values.grad_roll_no,
               grad_marks_obtained :values.grad_marks_obtained,
               grad_max_marks :values.grad_max_marks,
               grad_aggr_percentage :values.grad_aggr_percentage,
               grad_year_of_passing :values.grad_year_of_passing
             },
             "intermediateDetails": {
                inter_board:values.inter_board,
                inter_roll_no:values.inter_roll_no,
                inter_marks_obtained:values.inter_marks_obtained,
                inter_max_marks:values.inter_max_marks,
                inter_aggr_percentage:values.inter_aggr_percentage,
                inter_year_of_passing:values.inter_year_of_passing
             },
             "highSchoolDetails": {
                 high_board:values.high_board,
                 high_roll_no:values.high_roll_no,
                 high_marks_obtained:values.high_marks_obtained,
                 high_max_marks:values.high_max_marks,
                 high_aggr_percentage:values.high_aggr_percentage,
                 high_year_of_passing:values.high_year_of_passing
             },
           };
          const isValid = await scholarSchema.isValid(studentData)
         console.log("2.1. isValid "+isValid)
         console.log("3. :: studentData :: "+studentData)
         console.log("4. :: studentData :: "+JSON.stringify(studentData))
         //  await axios.post(`api/user/register/email=${email}&user=${username}&token=${token}`, studentData)
         const data = await axios.post(`api/scholar/register`, studentData)
             .then((res) => {
                 console.log("4.1 res.data: "+res) 
                 const status = JSON.stringify(res.data.success)
            console.log("const status = JSON.stringify(res.data.success)"+ status )
            if(status){
              setSuccess(true)
              alert('Registration successful')
              navigate(`/login`)
            }else{
              alert('Alreday registered')
              navigate(`/login`)
            }
      }).catch((error) => {
                 console.log("5. error: "+error) 
             });
           
      }catch(err){
        console.log("6. LoginDetails error , ERROR:: "+err)
        
      }
  }
  
  return(  
    <>
       <div className='text-bold box-border flex justify-center bg-gray-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className="my-5 p-4 text-md font-semibold text-white bg-[#7947b3] rounded-md">Step 6 (Final) :  Login Details</h1>
            <form id ="intermediate"  className='px-36 py-8 bg-white rounded-md'>
            <p className='text-sm'>Fields marked with <span className='text-pink-600'>*</span> are mandatory to fill</p>
              <div>
                <label >Email<span className='text-pink-600'>*</span></label>
                <input type="text"  name="email" onChange={handleChange('email')} defaultValue={values.email}
                   className="px-3 my-1 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label >Username<span className='text-pink-600'>*</span></label>
                <input type="text" name="username" onChange={handleChange('username')} defaultValue={values.username}
                   className="px-3 my-1 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label >Password<span className='text-pink-600'>*</span></label>
                <input type="password" placeholder="**********" name="password" onChange={handleChange('password')} defaultValue={values.password}
                   className="px-3 my-1 border-2 rounded-md  border-violet-200 placeholder:italic" />
                <p>This is a required field</p>
              </div>
              <div>
                <label >Confirm password<span className='text-pink-600'>*</span></label>
                <input type="password" placeholder="**********" name="confirmPassword" onChange={handleChange('confirmPassword')} defaultValue={values.confirmPassword}
                   className="px-3 my-1 border-2 rounded-md  border-violet-200 placeholder:italic" />
                <p>This is a required field</p>
              </div>
              <button className="bg-[#6F42A2] hover:bg-violet-400  text-white font-bold py-2 px-4 mr-2 rounded-md" onClick={ Previous } type="submit" >Previous</button>
              <button className="bg-[#6F42A2] hover:bg-violet-400  text-white font-bold py-2 px-4 ml-[193px] rounded-md" onClick={ onSubmit} type="submit" >Submit</button>
        </form>
        </div>
      </div>
    </>
  )
}
export default LoginDetails
import {useNavigate, Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from '../../axiosConfig';
import validator from 'validator'


const LoginDetails=({ isValid,prevStep,  handleChange, values }) => {
  console.log("values"+values)
  console.log("values"+ JSON.stringify(values))
  console.log("values.email"+ JSON.stringify(values.email))
  
  const navigate = useNavigate(); 
  const [success, setSuccess]= useState(false)
  const [error, setError] = useState(false)
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

          const companyData = {
          // "loginDetails":{
             email:values.email,
             password:values.password,
             confirmPassword:values.confirmPassword,
             username:values.username,
          //  },
            cname:values.cname,
            phone:values.phone,
            website:values.website,
            // "contactDetails":{
            //   "head_hr":{
                head_name:values.head_name,
                head_email:values.head_email,
                head_mobile:values.head_mobile,
              // },
              // "second_contact":{
                second_name:values.second_name,
                second_email:values.second_email,
                second_mobile:values.second_mobile,
            //   },
            // },
            // "jobDetails":{
              job_profile:values.job_profile,
              designation:values.designation,
              place_of_posting:values.place_of_posting,
              job_desc:values.job_desc,
              recruitment_type:values.recruitment_type,
            //  "salary_details":{
                  annual_package:values.annual_package,
                  breakage_ctc:values.breakage_ctc,
              // }
          // // },    
          // // "selectionDetails":{
              courses_allowed:values.courses_allowed,  
              aptitude_test:values.aptitude_test,
              coding_test:values.coding_test,
              interview:values.interview,
              hr_round:values.hr_round,
              any_other_rounds:values.any_other_rounds,
          // },
          // "placement_timeline":{
              pre_placement_talk:values.pre_placement_talk,
              coding_test_date:values.coding_test_date,
              interview_date:values.interview_date,
              notes:values.notes
          // }
        };
     
        //  await axios.post(`api/user/register/email=${email}&username=${username}&token=${token}`, companyData )
        const data = await axios.post(`api/company/register`,companyData )
         .then((res) => {
            console.log("4.1 res.data: "+res) 
            const status = JSON.stringify(res.data.success)
            console.log("const status = JSON.stringify(res.data.success)"+ status )
            if(status){
              setSuccess(true)
              alert('Registration successful')
              navigate(`/login`)
            }
            else if(!status){
              setSuccess(false)
              alert('You alreay have an account')
              navigate(`/login`)
            }
         }).catch((error) => {
            setError(error.response.data.error.map(err=><li>{err.msg}</li>))
                 console.log("5. error: "+error)
                 
            });
      }catch(err){
        console.log("6. ERROR::Company login Details page error"+err)
        
      }

  }

  return(  
    <>
        <div className='form-head text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className='flex justify-center sm:justify-start my-2 p-3 text-md font-semibold text-white rounded-md'>Step 7 (Final) :  Login Details</h1>
            <form className='px-40 py-8 bg-white rounded-md'>
              <p>Required <span className='text-pink-600'>*</span></p>
              
              {/* <div className="form-group">
                <label className='m-0 p-0'>Username</label>
                <input type="text"  onChange={handleChange('username')} defaultValue={values.username}
                   className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div> */}
              {/* <div className="form-group">
                <label className='m-0 p-0'>Username</label>
                <input type="text"  onChange={handleChange('username')} defaultValue={values.username}
                   className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div> */}
              <div className="form-group">
                <label className='m-0 p-0'>Password</label>
                <input type="password" onChange={handleChange('password')} defaultValue={values.password}
                   className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div>
              <div className="form-group">
                <label className='m-0 p-0'>Confirm password</label>
                <input type="password" onChange={handleChange('confirmPassword')} defaultValue={values.confirmPassword}
                   className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div>
              {error.length>0 && <p className='text-pink-600'>
                <ul className='ml-4 my-2 list-decimal'>{error}</ul></p>}
              <div className='flex flex-row justify-center'>            
                <button className='mx-3 my-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4  rounded-md' onClick={ onSubmit } type='submit' >Submit</button>
          </div>
        </form>
        </div>
      </div>
    </>
  )
}
export default LoginDetails
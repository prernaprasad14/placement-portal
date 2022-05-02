import {useNavigate, Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from '../../axiosConfig';


const LoginDetails=({ prevStep,  handleChange, values }) => {
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
     
        console.log("3. :: companyData  :: "+companyData )
        console.log("4. :: companyData  :: "+JSON.stringify(companyData ))
        //  await axios.post(`api/user/register/email=${email}&user=${username}&token=${token}`, companyData )
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
                 console.log("5. error: "+error)
                 
            });
      }catch(err){
        console.log("6. ERROR::Company login Details page error"+err)
        
      }

  }

  return(  
    <>
       <div className='text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className="my-5 p-4 text-md font-semibold text-white bg-[#7947b3] rounded-md">Step 6 (Final) :  Login Details</h1>
            <form id ="intermediate"  className='px-40 py-8 bg-white rounded-md'>
              <p>Required <span className='text-pink-600'>*</span></p>
              
              {/* <div className="my-5">
                <label className='m-0 p-0'>Username</label>
                <input type="text"  onChange={handleChange('username')} defaultValue={values.username}
                   className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div> */}
              <div className="my-5">
                <label className='m-0 p-0'>Username</label>
                <input type="text"  onChange={handleChange('username')} defaultValue={values.username}
                   className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div>
              <div className="my-5">
                <label className='m-0 p-0'>Password</label>
                <input type="password" onChange={handleChange('password')} defaultValue={values.password}
                   className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div>
              <div className="my-5">
                <label className='m-0 p-0'>Confirm password</label>
                <input type="password" onChange={handleChange('confirmPassword')} defaultValue={values.confirmPassword}
                   className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div>
              <button type="submit" className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 mr-2 rounded-md" onClick={ Previous }>Previous</button>
              {/* <button className="bg-[#7947b3] hover:bg-[#572a89] text-white border-2  font-bold py-2 px-4 ml-[144px] rounded-md" onClick={ onSubmit} type="submit" >Submit</button> */}
              <button  className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 ml-[200px] rounded-md" type="submit"onClick={ onSubmit} >Submit</button>
        </form>
        </div>
      </div>
    </>
  )
}
export default LoginDetails
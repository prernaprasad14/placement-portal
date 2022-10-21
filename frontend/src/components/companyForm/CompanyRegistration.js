import React, { useState, useEffect, useRef} from 'react'
import validator from 'validator'
import Loading from '../Loading';
import axios from '../../axiosConfig';
import { useLocation, useNavigate } from 'react-router'
import queryString from 'query-string'
import BasicDetails from './BasicDetails';
import ContactDetails from './ContactDetails';
import JobDetails from './JobDetails';
import LoginDetails from './LoginDetails';
import PlacementTimeline from './PlacementTimeline';
import SelectionDetails from './SelectionDetails';
import Confirm from './Confirm';
import { companyRegex } from '../../helpers/regex';
import Page404 from '../Page404';


const CompanyRegistration = () =>{
  const location = useLocation();
  const [isTokenValid, setIsTokenValid]= useState(false)
  const [isCompanyRegistered, setIsCompanyRegistered]= useState(false)
  const [email, setEmail ]=useState('')
  const [username, setUsername ]=useState('')
  const [request,setRequest]= useState(false)
  const [isLoading, setIsLoading]= useState(true)
  const  bar = useRef()
  const navigate = useNavigate()

  useEffect(()=>{
    
    try{
      const {email, username, token} = queryString.parse(location.search)
      console.log(email, token, username)
    if(validator.isEmpty(email)|| validator.isEmpty(username)|| validator.isEmpty(token)){

        setRequest(true)
    }
    else{
      setEmail(email)
      setUsername(username)
        axios.get(`api/company/is-company-registered?email=${email}`)
        .then(res=>{
            if(res.status === 200){
              setIsCompanyRegistered(true)
                setTimeout(()=>{
                            setIsLoading(false)
                },9000) 
                setTimeout(()=>{
                  navigate('/login')
                },6000)
            }
        })
        .catch(error=>{   
            console.log(error.response.status)
            axios.get(`api/user/verify-registration-token?email=${email}&username=${username}&token=${token}`)
            .then(res=>{
              console.log(res)
              setIsTokenValid(true)
            })
            .catch(err=>console.log(err))
           
            // if(error.response.status===412)
            // {setIsCompanyRegistered(false)
            // }
           
        })
    }}catch(err){
      console.log(err,"here")
    }
  },[])
 const step1 = useRef()
 const step2 = useRef()
 const step3 = useRef()
 const step4 = useRef()
 const step5 = useRef()
 const step6 = useRef()
 const step7 = useRef()
    
  
  
if(isLoading){
   return <Loading message={'Just a moment...verifying email'}/>
  }

 
  if(isCompanyRegistered){
    return(<>
     <div className='flex flex-col pt-12 text-slate-900  bg-slate-100 items-center'>
          <p className='text-2xl font-bold'>Requisition Form Placements'22</p>
          <div className='text-bold box-border flex justify-center bg-slate-100 '>
              <h1 className='text-lg fond-bold bg-white drop-shadow-sm mt-2 mb-32 py-3 px-32 rounded'>You have already registered</h1>
          </div>
      </div>
    </>)
  }
if(isTokenValid){
  return(<>
  <div className='form-head flex flex-col pt-12 text-slate-900  bg-slate-100 items-center'>
          <p className='text-2xl font-bold mb-3 '>Requisition Form Placements'22</p>
          {/* <div className='progressbar rounded-full my-10 '>
            <div ref={bar} className='w-[12%] rounded-full '> */}
              {/* <div ref={barSpan} className='rounded-full bg-red-800 text-white'>{step}</div> */}
            {/* </div> */}
            {/* <div className='mt-[-20px]'>
            <ul className='flex flex-unwrap flex-col sm:flex-wrap sm:flex-row '>
                <li ref={step1} className='mx-6 my-1 px-2 py-1 rounded-full border-[4px] box-border border-slate-100  text-white font-bold text-[13px]' value='1'>Basic&nbsp;Details</li>
                <li ref={step2} className='mx-6 my-1 px-2 py-1 rounded-full border-[4px] box-border border-slate-100  text-white font-bold text-[13px]' value='2'>Contact&nbsp;Details</li>
                <li ref={step3} className='mx-6 my-1 px-2 py-1 rounded-full border-[4px] box-border  border-slate-100 text-white font-bold text-[13px]' value='3'>Job&nbsp;Details</li>
                <li ref={step4} className='mx-6 my-1 px-2 py-1 rounded-full border-[4px] box-border  border-slate-100 text-white font-bold text-[13px]' value='4'>Selection&nbsp;Details</li>
                <li ref={step5} className='mx-6 my-1 px-2 py-1 rounded-full border-[4px] box-border  border-slate-100 text-white font-bold text-[13px]' value='5'>Placement Timeline</li>
                <li ref={step6} className='mx-6 my-1 px-2 py-1 rounded-full border-[4px] box-border  border-slate-100 text-white font-bold text-[13px]' value='5'>Confirm&nbsp;Details</li>
                <li ref={step7} className='mx-6 my-1 px-2 py-1 rounded-full border-[4px] box-border  border-slate-100  text-white font-bold text-[13px]' value='6'>Login&nbsp;Details</li>
              </ul>
          </div> */}
        {/* </div>  */}
 
    <Form email={email} username={username} className=' sm:mt-2'/>
  </div>

</>)
}

return(<>
  <div className='flex flex-col pt-12 h-[500px] text-slate-900  bg-slate-100 items-center'>
        <p className='text-2xl font-bold mx-2 mb-3'>Requisition Form Placements'22</p>
        <div className='text-bold box-border flex justify-center '>
            <h1 className='text-base fond-bold bg-white drop-shadow-sm mt-2 mb-32  py-3 px-3 sm:px-32 rounded'>Seems like your token is Invalid</h1>
        </div>
    </div>
 </>)
}
export default CompanyRegistration 

export function Form({email, username}){
  const [step, setStep]=useState(1)
  const  bar = useRef()

  const [formData, setFormData]=useState({

    email:email,
    password:'',
    confirmPassword:'',
    username:username,

    cname:'',
    phone:'',
    website:'',

    head_name:'',
    head_email: '',
    head_mobile:'',

    second_name:'',
    second_email:'',
    second_mobile:'',

    job_profile:'',
    designation:'',
    place_of_posting:'',
    job_desc:'',
    recruitment_type:'',

    annual_package:'',
    breakage_ctc:'',

    courses_allowed:'',  
    aptitude_test : '',
    coding_test: '',
    interview:'',
    hr_round:'',
    any_other_rounds:'',

    pre_placement_talk:'',
    coding_test_date:'',
    interview_date:'',
    notes:''
  });

  const [isValid, setIsValid]=useState({

        email:true,
        password:null,
        confirmPassword:null,
        username:username,

        cname:null,
       phone:null,
       website:null,

       head_name:null,
          head_email: null,
          head_mobile:null,

          second_name:null,
           second_email:null,
           second_mobile:null,

           job_profile:null,
         designation:null,
         place_of_posting:null,
         job_desc:null,
         recruitment_type:null,

         annual_package:null,
         breakage_ctc:null,

         courses_allowed:null,  
         aptitude_test : null,
         coding_test: null,
         interview:null,
         hr_round:null,
         any_other_rounds:null,

         pre_placement_talk:null,
         coding_test_date:null,
         interview_date:null,
         notes:null,

        } );

  
  const nextStep=()=>{
    setStep(step+1)
    console.log(step)
    const width = (step+1)*14.28
    // bar.current.style.width= width+'%'
  }

  const prevStep=()=>{
    setStep(step-1)
    const width = (step-1)*14.28
    // bar.current.style.width= width+'%'
  }
 
  const handleChange = input => e => {
    setFormData({...formData, [input]: e.target.value });
    if(companyRegex[input].test(e.target.value) ){
      console.log(isValid)
      setIsValid({...isValid, [input]:true})
    }
    else{
      setIsValid({...isValid, [input]:false})
    }
  }

  switch(step) {
    case 1: 
      return (<>
        <BasicDetails
            nextStep={nextStep}
            handleChange={handleChange }
            values={formData}
            isValid={isValid}
          /></>
      )
    case 2:
        return ( 
        <ContactDetails
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange }
          values={formData}
          isValid={isValid}
        />
        )
    case 3: 
      return(
        <JobDetails
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange }
          values={formData}
          isValid={isValid}
        />
      )
    case 4: 
      return (
        <SelectionDetails
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange }
          values={formData}
          isValid={isValid}
        />
      )
    case 5: 
      return (
        <PlacementTimeline
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange }
          values={formData}
          isValid={isValid}
        />
      )
    case 6: 
      return (<>
        <Confirm nextStep={nextStep} 
          prevStep={prevStep}
          handleChange={handleChange }
          values={formData }
          isValid={isValid}
          setStep={setStep}
        />
      </>
        
      )
    case 7: 
      return (
        <LoginDetails
          prevStep={prevStep}
          handleChange={handleChange }
          values={formData}
          isValid={isValid}
            
        />
      )
      
    default: 
       <Page404/>
  }
    

}
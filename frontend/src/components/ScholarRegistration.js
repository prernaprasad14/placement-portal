import React, { useEffect, useState ,useRef} from 'react'
import { useLocation, useNavigate } from 'react-router'
import {states, pg_courses} from '../helpers/dropDownOptions'
import {scholarRegex} from '../helpers/regex'
import queryString from 'query-string'
import PersonalDetails from './scholarForm/PersonalDetails'
import PostGraduation from './scholarForm/PostGraduation'
import Graduation from './scholarForm/Graduation'
import Intermediate from './scholarForm/Intermediate'
import HighSchool from './scholarForm/HighSchool'
import Confirm from './scholarForm/Confirm'
import LoginDetails from './scholarForm/LoginDetails'
import validator from 'validator'
import Loading from './Loading'
import Page404 from './Page404'
import axios from '../axiosConfig';

const ScholarRegistration = () =>{
  const location = useLocation();
  const [isTokenValid, setIsTokenValid]= useState(false)
  const [isScholarRegistered, setIsScholarRegistered]= useState(false)
  const [email, setEmail ]=useState('')
  const [username, setUsername ]=useState('')
  const [request,setRequest]= useState(false)
  const [isLoading, setIsLoading]= useState(true)
  // const  barWidth = useRef(null)
  const navigate = useNavigate()

  useEffect(()=>{
   
    try{
      const {email, username, token} = queryString.parse(location.search)
      console.log(email, token, username)
      if(validator.isEmpty(email)|| validator.isEmpty(username)|| validator.isEmpty(token)){

          setRequest(true)
      }else{
        setEmail(email)
        setUsername(username)
          axios.get(`api/scholar/is-scholar-registered?email=${email}`)
          .then(res=>{
              if(res.status === 200){
                setIsScholarRegistered(true)
                  setTimeout(()=>{
                              setIsLoading(false)
                  },9000) 
                  setTimeout(()=>{
                    navigate('/scholar-login')
                  },6000)
              }
          })
          .catch(error=>{   
              console.log(error.response.status)
              axios.get(`api/user/verify-registration-token?email=${email}&username=${username}&token=${token}`)
              .then(res=>{
                console.log(res)
              
                setIsTokenValid(true)
                setIsLoading(false)
              })
              .catch(err=>{console.log(err)})
            
            
          })
      }
    }catch(err){
      console.log(err,"here")
    }
  },[])


  const [page,setPage]=useState(0)
    const steps=[
      {'label':'Personal Details'},
      {'label':'PostGraduation Details'},
      {'label':'Graduation Details'},
      {'label':'Intermediate Details'},
      {'label':'HighSchool Details'},
      {'label':'Confirm Details'},
      {'label':'Login Details'}
    ]
   
    if(isLoading){
        return <Loading message={'Just a moment...verifying email'}/>
    }

    if(isScholarRegistered){
      return(<>
        <div className='flex flex-col pt-12 text-slate-900 bg-slate-100 items-center'>
        <p className='text-2xl font-bold mx-2 mb-3 '>Student's Registration Form Placements'22</p>
            <div className='text-bold box-border flex justify-center '>
                <h1 className='text-base fond-bold bg-white drop-shadow-sm mt-2 mb-32 p-3 sm:py-3 sm:px-32 rounded'>You have already registered</h1>
            </div>
        </div>
      </>)
    }

    if(isTokenValid){
      return(<>
      <div className='form-head flex flex-col pt-12 text-slate-900  bg-slate-100 items-center'>
              <p className='text-2xl font-bold mx-2 mb-3 '>Student's Registration Form Placements'22</p>
              {/* <div className='progressbar  mt-10 mb-2 w-4/6 py-[2px]'> */}
                {/* <div ref={barWidth} className='progress_step rounded-full '></div> */}
                {/* <div  className='progress_bg rounded-full '></div> */}
                  {/* <div ref={barSpan} className='rounded-full bg-red-800 text-white'>{step}</div> */}
                
                {/* <div className='progressbar bg-red-900 p-1'>
                  <ul className='user-select-none flex flex-nowrap flex-col lg:flex-wrap sm:flex-row '>
                    <li ref={step1} className='mx-2 my-1 px-2 py-1' value='1'><span></span><span>Personal&nbsp;Details</span></li>
                    <li ref={step2} className='mx-2 my-1 px-2 py-1' value='2'><span></span><span>PostGraduation&nbsp;Details</span></li>
                    <li ref={step3} className='mx-2 my-1 px-2 py-1' value='3'><span></span><span>Graduation&nbsp;Details</span></li>
                    <li ref={step4} className='mx-2 my-1 px-2 py-1' value='4'><span></span><span>Intermediate&nbsp;Details</span></li>
                    <li ref={step5} className='mx-2 my-1 px-2 py-1' value='5'><span></span><span>HighSchool&nbsp;Details</span></li>
                    <li ref={step6} className='mx-2 my-1 px-2 py-1' value='6'><span></span><span>Confirm&nbsp;Details</span></li>
                    <li ref={step7} className='mx-2 my-1 px-2 py-1' value='7'><span></span><span>Login&nbsp;Details</span></li>
                  </ul>
              </div> */}
                {/* <div className='progress_labels py-2 px-12 rounded-sm'>
                  <ul className='user-select-none flex flex-nowrap flex-col lg:flex-wrap sm:flex-row '>
                    { steps.map((label, index)=><><li value='1'>
                      <p>
                      {page-1<=index? 
                        <span className='text-blue-600 bg-white'><RiCheckboxBlankCircleLine className='text-2xl'/></span>
                      : <span className='text-[#1BDA9C] bg-white'><RiCheckboxCircleLine className='text-2xl'/></span>}
                        <span>{Object.values(label)}</span>
                      </p></li></>)}                
                  </ul>

                </div> */}
              {/* </div> */}
        <div className=' sm:w-4/6'>
          <Form email={email} username={username} setPage={setPage} className='sm:mt-2'/>
        </div>
      </div>

    </>)
    }
 if(!isTokenValid)
    return(<>
      <div className='flex flex-col pt-12 h-[500px] text-slate-900  bg-slate-100 items-center'>
            <p className='text-2xl font-bold mx-2 mb-3'>Student's Registration Form Placements'22</p>
            <div className='text-bold box-border flex justify-center '>
                <h1 className='text-base fond-bold bg-white drop-shadow-sm mt-2 mb-32  py-3 px-3 sm:px-32 rounded'>Seems like your token is Invalid</h1>
            </div>
        </div>
    </>)
}
export default ScholarRegistration


export function  Form ({email,username, setPage}){
  const step1= useRef(null)
  const [step, setStep]=useState(1)
  

 const [isValid, setIsValid]=useState({
     
    email:true,
    password:null,
    confirmPassword:null,
    username:true,
 
      fname:null,
      lname:null,
      dob:null,
      gender:null,
      phone:null,
      alternative_phone :null, 
      perma_addr1:null,
      perma_addr2:null,
      perma_state:null,
      perma_city:null,
      perma_pin:null,

      corr_addr1:null,
      corr_addr2:null,
      corr_state:null,
      corr_city:null,
      corr_pin:null,
   
      pg_course:null,
      pg_exam_roll:null,
      pg_class_roll:null,
      pg_aggr_percentage:null,
      pg_backlogs:null,
      pg_backlog_details:null,

      grad_college:null,
      grad_university:null,
      grad_course:null,
      grad_roll_no:null,
      grad_marks_obtained:null,
      grad_max_marks:null,
      grad_aggr_percentage:null,
      grad_year_of_passing:null,
  
      inter_board:null,
      inter_roll_no:null,
      inter_marks_obtained:null,
      inter_max_marks:null,
      inter_aggr_percentage:null,
      inter_year_of_passing:null,

      high_board:null,
      high_roll_no:null,
      high_marks_obtained:null,
      high_max_marks:null,
      high_aggr_percentage:null,
      high_year_of_passing:null
});
const[formDate, setFormDate] =useState({
  grad_year_of_passing:new Date(),
  inter_year_of_passing:new Date(),
  high_year_of_passing:new Date()

});
  const [formData, setFormData]=useState({
     
        email:email,
        password:'',
        confirmPassword:'',
        username:username,
        fname:'',
        lname:'',
        dob:'',
        gender:'',
        phone:'',
        alternative_phone :'', 
        perma_addr1:'',
        perma_addr2:'',
        perma_state:'',
        perma_city:'',
        perma_pin:'',

        corr_addr1:'',
        corr_addr2:'',
        corr_state:'',
        corr_city:'',
        corr_pin:'',
       
        pg_course:'',
        pg_exam_roll:'',
        pg_class_roll:'',
        pg_aggr_percentage:'',
        pg_backlogs:'',
        pg_backlog_details:'',
    
        grad_college:'',
        grad_university:'',
        grad_course:'',
        grad_roll_no:'',
        grad_marks_obtained:'',
        grad_max_marks:'',
        grad_aggr_percentage:'',
      
        inter_board:'',
        inter_roll_no:'',
        inter_marks_obtained:'',
        inter_max_marks:'',
        inter_aggr_percentage:'',

        high_board:'',
        high_roll_no:'',
        high_marks_obtained:'',
        high_max_marks:'',
        high_aggr_percentage:''
  });

  useEffect(() => {
    // const items = JSON.parse(localStorage.getItem('formData'));
    // if (items) {
    //  setFormData(items);
    // }
  
    console.log(`${JSON.parse(localStorage.getItem('formData'))}`)

  }, []);

  const nextStep=()=>{
   setStep(step+1)
   setPage(step+1)
  }
  const prevStep=()=>{
    setStep(step-1)
    setPage(step-1)
   }

  const handleDate=(input, date)=> {
    var year = date._d.toString().split(' ')    
    setFormData({...formData,[input]:year[3]})
    console.log(formData.grad_year_of_passing)
    setIsValid({...isValid, [input]:true})
  }

  const handleChange= input =>(e) => {
    console.log(input)
    console.log(`${localStorage.getItem('formData', JSON.stringify(formData))}`)
    localStorage.setItem('formData', JSON.stringify(formData));
    if(input ==='dob'|| input==='gender'){
      console.log("here",input)
  
        setIsValid({...isValid, [input]:true})
      }
    if(input==='fname'|| input ==='lname'){
      const val = e.target.value.toUpperCase()
      setFormData({...formData, [input]: val });
    } 
    else{
      setFormData({...formData, [input]: e.target.value });
    }

    if(input ==='pg_course'){
      const result= pg_courses.filter(course=> course===e.target.value)
      if(result.length>0){
         setIsValid({...isValid, [input]:true})
      }
     
      if(result.length===0){
          setIsValid({...isValid, [input]:false})
      }

    }else if(input ==='perma_state' || input ==='corr_state'){
      const result= states.filter(state=> state===e.target.value)
      if(result.length>0){
         setIsValid({...isValid, [input]:true})
      }
     
      if(result.length===0){
          setIsValid({...isValid, [input]:false})
      }

    }else if(scholarRegex[input].test(e.target.value) ){
      console.log("here")
      setIsValid({...isValid, [input]:true})
    }
    else{
      setIsValid({...isValid, [input]:false})
    }
    
    
  }

     
  switch(step) {
    case 1: 
      return (<>
        <PersonalDetails  nextStep={nextStep}
          isValid={isValid}
          handleChange={handleChange}
          values={formData}
        /> 
       </>
      )
    case 2:
        return ( <>
          <PostGraduation nextStep={nextStep} 
              isValid={isValid}
              prevStep={prevStep}
              handleChange={handleChange}
              values={formData} 
            /> 
        </>
        )
    case 3: 
      return (<>
        <Graduation nextStep={nextStep} prevStep={prevStep}       
            handleChange={handleChange}
            handleDate={handleDate}
            isValid={isValid}
            setFormDate={setFormDate}
            values={formData}
          />
        </>)
       
    case 4: 
      return (<>
        <Intermediate nextStep={nextStep} prevStep={prevStep}
          handleChange={handleChange}
          isValid={isValid}
          formDate={formDate}
          values={formData}
        />
       </> ) 
     
    case 5: 
      return (<>
        <HighSchool nextStep={nextStep} prevStep={prevStep}
          handleChange={handleChange}
          isValid={isValid}
          formDate={formDate}
          values={formData}
        />
      </>) 
      
    case 6: 
      return (
        <Confirm nextStep={nextStep} prevStep={prevStep}
        handleChange={handleChange}
        setStep={setStep}
        formDate={formDate}
         isValid={isValid}
        values={formData} />
      )

    case 7: 
      return (<>
        <LoginDetails nextStep={nextStep} prevStep={prevStep}
            handleChange={handleChange}
             isValid={isValid}
            values={formData}
        />
        </>)
        
    default: 
        return <Page404/>
  }

}
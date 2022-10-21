import React, { useState , useEffect} from 'react'
import validator from 'validator';
import Loading from '../Loading';
import {RiEdit2Fill} from 'react-icons/ri'
import { getParsedDate } from '../../helpers/getParsedDate';


const Confirm = ({isValid, values,nextStep, setStep, prevStep, handleChange}) => {
    document.title='Confirm details-Company requitsition for Session\'22 | DUCS Placement Portal'

    const [isLoading, setIsLoading]= useState(true)
    const [error , setError] = useState('')
    const [isEditMode , setIsEditMode] = useState(false)
  
   

    const Continue = e => {
      e.preventDefault();
      const check= Object.entries(isValid).map(x=>x.every(isValid=>{
        if(!isValid.password || !isValid.confirmPassword) 
        return isValid===true
    }))
    console.log(check)
    
        if(!check){ 
            setError("Unexpected Error");
            } else {
                nextStep();
            }
    }   
  
    const Previous = e => {
      e.preventDefault();
      prevStep();
    }

    useEffect(()=>{
        // window.scrollTo(0, 0)
        console.log('Inside Confirm')
        setIsLoading(false)    
    },[]);    
   
    if(isLoading){
        return <Loading message={'Just a moment'}/>
    }

    if(isEditMode){
        return(
            <>
                <div>
                </div>
            </>
        )
    }

    return(<>
        <div className='form-head text-bold box-border  flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>

            <div className=''>
            <div className='confirm-details form-head  row justify-center'>
               
                    <h1 className='col-md-10 my-2 p-3 text-md font-semibold text-white rounded-md'>6/7: Confirm your details</h1>
                <div className='col-md-10 bg-white rounded-lg mb-3 pb-3'>
                     <div className=''>
                     
                     <div className='p-3 py-2 '>
                        <div className='row  mt-2 py-2 sm:ml-8 font-semibold italic'>Email: {values.email}</div>
                        <div className='row flex items-baseline align-middle  mt-2 py-2 sm:ml-8 border-b-2 border-slate-100'>
                            <h3 className='font-semibold mb-3 text-lg '>Company Details  <span className=''>
                                 <button type="button" onClick={()=>setStep(1)} className=" mx-5  cursor-pointer" value="btn">
                                 <RiEdit2Fill className='focus:border-2 focus:border-white text-2xl text-fuchsia-900 hover:text-white'/>
                                 </button>
                                
                                </span></h3>
                      <div className='col-md-12'><label className='font-normal'>Company Name</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.cname}</p></div>
                      <div className='col-md-12'><label className='font-normal'>Website</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.website}</p></div>
                      <div className='col-md-4'><label className='font-normal'>Contact no.</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.second_mobile}</p></div>
                  </div>
 
                        <div className='row mt-4 py-2 sm:ml-8 border-b-2 border-slate-100'>
                            <h3 className=' font-semibold mb-2'>Contact Details
                            <span className=''> <button type="button" onClick={()=>setStep(2)} className=" mx-5  cursor-pointer" value="btn">
                                 <RiEdit2Fill className='focus:border-2 focus:border-white text-2xl text-fuchsia-900 hover:text-white'/>
                                 </button>
                                
                                </span></h3>
                            <div className='row rounded-md m-1 p-1'>
                                <h4 className=' pt-2 font-semibold'>HR</h4>
                                <div className='col-md-4'><label className='font-normal'>Name</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.head_name}</p></div>
                                <div className='col-md-4'><label className='font-normal'>Email</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.head_email}</p></div>
                                <div className='col-md-4'><label className='font-normal'>Contact no.</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.head_mobile}</p></div>
                            </div>
                            <div className='row rounded-md m-1 p-1'>
                                <h4 className=' pt-2 font-semibold'>Second contact person</h4>
                                <div className='col-md-4'><label className='font-normal'>Name</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.second_name}</p></div>
                                <div className='col-md-4'><label className='font-normal'>Email</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.second_email}</p></div>
                                <div className='col-md-4'><label className='font-normal'>Contact no.</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.second_mobile}</p></div>
                            </div>
                         </div>
                        <div className='row mt-4 py-2 sm:ml-8 border-b-2 border-slate-100'>
                        <h3 className='font-semibold my-2'>Job Description  <span className=''> <button type="button" onClick={()=>setStep(3)} className=" mx-5  cursor-pointer" value="btn">
                                 <RiEdit2Fill className='focus:border-2 focus:border-white text-2xl text-fuchsia-900 hover:text-white'/>
                                 </button>
                                
                                </span></h3>
                        <div className='col-md-12'><label className='font-normal'>Job profile</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.job_profile}</p></div>
                        <div className='col-md-12'><label className='font-normal'>Designation</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.designation}</p></div>
                        <div className='col-md-12'><label className='font-normal'>Job description</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.job_desc}</p></div>          
                        <div className='col-md-12'><label className='font-normal'>Place of posting</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.place_of_posting}</p></div>            
                        <div className='col-md-12'><label className='font-normal'>Recruitment type : </label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.recruitment_type}</p></div>  
                        <div className='col-md-12'><label className='font-normal'>Aptitude test : </label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.aptitude_test}</p></div>  
                        <div className='col-md-12'><label className='font-normal'>Coding round : </label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.coding_test}</p></div>          
                        <div className='col-md-12'><label className='font-normal'>Interview : </label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.interview}</p></div>          
                        <div className='col-md-12'><label className='font-normal'>Courses allowed : </label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.courses_allowed}</p></div>                 
                    </div>
                    <div className='row mt-4 py-2 sm:ml-8 border-b-2 border-slate-100'>
                        <h3 className='font-semibold my-2'>Salary Details  <span className=''> <button type="button" onClick={()=>setStep(4)} className=" mx-5  cursor-pointer" value="btn">
                                 <RiEdit2Fill className='focus:border-2 focus:border-white text-2xl text-fuchsia-900 hover:text-white'/>
                                 </button>
                                
                                </span></h3>
                        <div className='col-md-12'><label className='font-normal'>Annual package</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.annual_package}</p></div>
                        <div className='col-md-12'><label className='font-normal'>Breakage of CTC</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.breakage_ctc}</p></div>                        
                    </div>
                    <div className='row mt-1 py-2 sm:ml-8'>
                        <h3 className='font-semibold my-2'>Timeline  <span className=''> <button type="button" onClick={()=>setStep(5)} className=" mx-5  cursor-pointer" value="btn">
                                 <RiEdit2Fill className='focus:border-2 focus:border-white text-2xl text-fuchsia-900 hover:text-white'/>
                                 </button>
                                
                                </span></h3>
                        <div className='col-md-12'><label className='font-normal'>Pre-placement talk(PPT) :</label><p className='border-2 p-1 border-violet-200 rounded-md'>{getParsedDate(values.pre_placement_talk)}</p></div>          
                        <div className='col-md-12'><label className='font-normal'>Coding round :</label><p className='border-2 p-1 border-violet-200 rounded-md'>{getParsedDate(values.coding_test_date)}</p></div>          
                        <div className='col-md-12'><label className='font-normal'>Interview :</label><p className='border-2 p-1 border-violet-200 rounded-md'>{getParsedDate(values.interview_date)}</p></div>          
                        <div className='col-md-12'><label className='font-normal'>Notes :</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.notes}</p></div>                                  
                    </div> 
                </div>
                </div>
                <div className='flex flex-row justify-center'>            
                    <button className='m-4 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 rounded-md' onClick={ Previous } type='submit'>Previous</button>
                    <button className='m-4 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4  rounded-md' onClick={ Continue } type='submit' >Confirm</button>
                </div>
                    </div>
               
                </div>
                </div>
            </div>
        </div>
    </>)
}


export default Confirm
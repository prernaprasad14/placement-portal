import React, { useState , useEffect, useContext} from 'react'
import Loading from '../Loading';
import {RiEdit2Fill} from 'react-icons/ri'



const Confirm = ({isValid,values,nextStep, setStep, prevStep,handleChange}) => {
    document.title='Confirm details-Scholar Registration Session\'22 | DUCS Placement Portal'

    const [isLoading, setIsLoading]= useState(true)
    const [error , setError] = useState('')
    const [isEditMode , setIsEditMode] = useState(false)
  
   

    const Continue = e => {
      e.preventDefault();
      console.log(isValid)
     const check= Object.entries(isValid).map(x=>x.every(isValid=>{
            if(!isValid.password || !isValid.confirmPassword) 
            return isValid===true
        }))
     console.log(check)
   if(!check){ 
        setError('Unexpected Error');
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
                         <p>Check all the details carefully</p>
                        <div className='p-3 py-2 '>
                        <div className='row  mt-2 py-2 sm:ml-8 font-semibold '>Email: {values.email}</div>
                        <div className='row flex items-baseline align-middle  mt-2 py-2 sm:ml-8 border-b-2 border-slate-100'>
                            <h3 className='font-semibold mb-3 text-lg '>Personal Details 
                                <span className=''>
                                    <button type="button" onClick={()=>setStep(1)} className=" mx-5  cursor-pointer" value="btn">
                                        <RiEdit2Fill className='focus:border-2 focus:border-white text-2xl text-fuchsia-900 hover:text-white'/>
                                    </button>
                                </span>
                            </h3>
                            <div className='col-md-4'><label className='font-normal'>First name</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.fname}</p></div>
                            <div className='col-md-4'><label className='font-normal'>Last name</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.lname}</p></div>
                            <div className='col-md-4'><label className='font-normal'>Mobile no.</label><p className='border-2 p-1 border-violet-200 rounded-md' >{values.phone}</p></div>
                            <div className='col-md-4'><label className='font-normal'>Date of Birth</label><p className='border-2 p-1 border-violet-200 rounded-md' >{values.dob}</p></div>
                            <div className='col-md-4'><label className='font-normal'>Gender</label><p className='border-2 p-1 border-violet-200 rounded-md' >{values.gender}</p></div>
                            <div className='col-md-4'><label className='font-normal'>Alternative phone no.</label>{values.alternative_phone ==='' ? <p className='border-2 p-1 border-violet-200 rounded-md' >NA</p> : <p className='border-2 p-1 border-violet-200 rounded-md' >{values.alternative_phone}</p>}</div>
                        </div>
                        <div className='row mt-4 py-2 sm:ml-8 border-b-2 border-slate-100'>
                            <h4 className=' font-semibold '>Permanent Address</h4>
                            <div className='col-md-4'><label className='font-normal'>Address Line 1</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.perma_addr1}</p></div>
                            <div className='col-md-4'><label className='font-normal'>Address Line 2</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.perma_addr2}</p></div>
                            <div className='col-md-4'><label className='font-normal'>City</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.perma_city}</p></div>
                            <div className='col-md-4'><label className='font-normal'>State</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.perma_state}</p></div>
                            <div className='col-md-4'><label className='font-normal'>PIN</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.perma_pin}</p></div>
                        </div>
                        <div className='row mt-4 py-2 sm:ml-8 border-b-2 border-slate-100'>
                            <h4 className='font-semibold '>Correspondance Address</h4>
                            <div className='col-md-4 '><label className='font-normal'>Address Line 1</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.corr_addr1}</p></div>
                            <div className='col-md-4 '><label className='font-normal'>Address Line 2</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.corr_addr2}</p></div>
                            <div className='col-md-4'><label className='font-normal'>City</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.corr_city}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>State</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.corr_state}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>PIN</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.corr_pin}</p></div>               
                        </div>
                        <div className='row mt-4 py-2 sm:ml-8 border-b-2  border-slate-100'>
                       
                            <h3 className='font-semibold mb-3 '>PostGraduation Details
                                <span> 
                                    <button type="button" onClick={()=>setStep(2)} className=" mx-5  cursor-pointer" value="btn">
                                        <RiEdit2Fill className='focus:border-2 focus:border-white text-2xl text-fuchsia-900 hover:text-white'/>
                                    </button>
                                </span>
                            </h3>
                            <div className='col-md-4'><label className='font-normal'>Course</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.pg_course}</p></div>
                            <div className='col-md-4'><label className='font-normal'>Class roll no.</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.pg_class_roll}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Exam roll no.</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.pg_exam_roll}</p></div>
                            <div className='col-md-4'><label className='font-normal'>Backlogs</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.pg_backlogs}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Backlog details</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.pg_backlog_details}</p></div>               
                        </div>
                        <div className='row mt-4 py-2 sm:ml-8 border-b-2 border-slate-100'>
                            <h3 className='font-semibold mb-3 '>Graduation Details
                                <span>
                                    <button type="button" onClick={()=>setStep(3)} className=" mx-5  cursor-pointer" value="btn">
                                        <RiEdit2Fill className='focus:border-2 focus:border-white text-2xl text-fuchsia-900 hover:text-white'/>
                                    </button>
                                </span>
                            </h3>
                            <div className='col-md-4'><label className='font-normal'>University</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.grad_university}</p></div>
                            <div className='col-md-4'><label className='font-normal'>College</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.grad_college}</p></div>
                            <div className='col-md-4'><label className='font-normal'>Course</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.grad_course}</p></div>
                            <div className='col-md-4'><label className='font-normal'>Roll no.</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.grad_roll_no}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Marks obtained</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.grad_marks_obtained}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Maximum marks</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.grad_max_marks}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Percentage</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.grad_marks_obtained}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Year of passing</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.grad_year_of_passing}</p></div>               
                        </div>
                       
                        <div className='row mt-4 py-2 sm:ml-8 border-slate-100'>
                            <h3 className='font-semibold mb-3 '>Intermediate Details(10+2 or equivalent)
                                <span>
                                    <button type="button" onClick={()=>setStep(4)} className=" mx-5  cursor-pointer" value="btn">
                                        <RiEdit2Fill className='focus:border-2 focus:border-white text-2xl text-fuchsia-900 hover:text-white'/>
                                    </button>
                                </span>
                            </h3>
                            <div className='col-md-4'><label className='font-normal'>Board</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.inter_board}</p></div>
                            <div className='col-md-4'><label className='font-normal'>Roll no.</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.inter_roll_no}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Marks obtained</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.inter_marks_obtained}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Maximum marks</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.inter_max_marks}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Percentage</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.inter_aggr_percentage}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Year of passing</label><p className='border-2 p-1 border-violet-200 rounded-md'>{values.inter_year_of_passing}</p></div>               
                        </div>
                        <div className='row mt-4 py-2 sm:ml-8 border-b-2 border-slate-100'>
                            <h3 className='font-semibold mb-3 '>Highschool Details(10th)
                                <span>
                                    <button type="button" onClick={()=>setStep(5)} className=" mx-5  cursor-pointer" value="btn">
                                        <RiEdit2Fill className='focus:border-2 focus:border-white text-2xl text-fuchsia-900 hover:text-white'/>
                                    </button>
                                </span>
                            </h3>
                            <div className='col-md-4'><label className='font-normal'>Board</label><p  className='border-2 p-1 border-violet-200 rounded-md'>{values.high_board}</p></div>
                            <div className='col-md-4'><label className='font-normal'>Roll no.</label><p  className='border-2 p-1 border-violet-200 rounded-md'>{values.high_roll_no}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Marks obtained</label><p  className='border-2 p-1 border-violet-200 rounded-md'>{values.high_marks_obtained}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Maximum marks</label><p  className='border-2 p-1 border-violet-200 rounded-md'>{values.high_max_marks}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Percentage</label><p  className='border-2 p-1 border-violet-200 rounded-md'>{values.high_aggr_percentage}</p></div>          
                            <div className='col-md-4'><label className='font-normal'>Year of passing</label><p  className='border-2 p-1 border-violet-200 rounded-md'>{values.high_year_of_passing}</p></div>               
                        </div>
                    </div>
                    {error && <p>Error :{error} </p>}
                    <div className='flex flex-row justify-center'>            
                        <button className='m-4 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 rounded-md' onClick={ Previous } type='submit'>Previous</button>
                        <button className='m-4 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4  rounded-md' onClick={ Continue } type='submit' >Confirm</button>
                    </div>
                   </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    </>)
}


export default Confirm
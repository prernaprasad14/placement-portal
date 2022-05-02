import {useNavigate, Link} from 'react-router-dom';
import React, { useEffect } from 'react'
import axios from '../../axiosConfig';

const JobDetails = ({ prevStep, nextStep, handleChange, values}) => {
    
   useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
  
    const Continue = async(e) => {
        e.preventDefault();
        nextStep();
    }

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }
  
   
      return(    
        <div className='text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
        <div className='text-bold'>
        <h1 className="my-5 p-4 text-md font-semibold text-white bg-[#7947b3] rounded-md">Step 3/6 : Job Details</h1>
        <form className='px-40 py-8 bg-white rounded-md' >
            <p>Required <span className='text-pink-600'>*</span></p>
            
              <div className='my-5'>
                <label  className='m-0 p-0'>Job Profile<span className='text-pink-600'>*</span></label>
                <input type="text" placeholder="" onChange={handleChange('job_profile')} defaultValue={values.job_profile}
               className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div>
              <div className='my-5'>
                <label  className='m-0 p-0'>Designation<span className='text-pink-600'>*</span></label>
                <input type="text" placeholder="" onChange={handleChange('designation')} defaultValue={values.designation}
                 className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div>
              <div className='my-5'>
                <label  className='m-0 p-0'>Place of posting<span className='text-pink-600'>*</span></label>
                <input type="text" placeholder="" onChange={handleChange('place_of_posting')} defaultValue={values.place_of_posting}
                 className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div>
              <div className='my-5'>
                <label  className='m-0 p-0'>Job Description<span className='text-pink-600'>*</span></label>
                <input type="text" placeholder="" onChange={handleChange('job_desc')} defaultValue={values.job_desc}
                 className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div>
              <div onChange={handleChange('recruitment_type')} defaultValue={values.recruitment_type} className=" my-1 ">
                  <p className='font-semibold'>Recruitment type<span className='text-pink-600'>*</span></p>
                  <div className="inline-block ">
                      <input type="radio" name="group1" value="Internship" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                      <label className="px-4" >Internship </label>
                  </div>
                  <div className="inline-block ">
                      <input type="radio" name="group1" value="Fulltime" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                      <label className="px-4">Fulltime</label>
                  </div>
                  <div className="inline-block ">
                      <input type="radio" name="group1" value="Internship and Fulltime"className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                      <label className="px-4">Internship + Fulltime</label>
                  </div> 
              </div>
              <div className='my-5'>
                <p className='font-bold'>Salary details</p>
                <div className='my-5'>
                  <label  className='m-0 p-0'>Annual package<span className='text-pink-600'>*</span></label>
                  <input type="text" placeholder="" onChange={handleChange('annual_package')} defaultValue={values.annual_package}
                  className="px-3 my-2 border-2 rounded-md  border-violet-200" />
                </div>
                <div className='my-5'>
                  <label  className='m-0 p-0'>Breakage of ctc<span className='text-pink-600'>*</span></label>
                  <textarea type="text" name="breakage_ctc" maxLength="100"  placeholder={`description of CTC\n`} onChange={handleChange('breakage_ctc')} defaultValue={values.pg_backlog_details}
                    className="px-3 my-5 min-h-[90px] max-h-[160px]  border-2 rounded-md  border-violet-200 placeholder:italic"></textarea>
                </div>
              </div>
                
              <button  className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 mr-2 rounded-md"  onClick={ Previous } type="submit">Previous</button>
              <button  className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 ml-[110px] rounded-md"  onClick={ Continue } type="submit" >Save and Continue</button>
          </form>
          </div>
          </div>  
       )     
   
}

export default JobDetails

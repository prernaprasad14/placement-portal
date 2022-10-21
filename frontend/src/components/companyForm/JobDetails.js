import React, {useEffect,useState} from 'react';
import validator from 'validator'

const JobDetails = ({ isValid, prevStep, nextStep, handleChange, values}) => {
  const [error, setError] = useState({
    emptyField:false,
    invalidFormat:false
});
   useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
  
    const Continue = async(e) => {
      e.preventDefault()  
      if (
        validator.isEmpty(values.job_desc) ||
        validator.isEmpty(values.job_profile) ||
        validator.isEmpty(values.designation) ||
        validator.isEmpty(values.recruitment_type) ||
        validator.isEmpty(values.place_of_posting) ||
        validator.isEmpty(values.annual_package) ||
        validator.isEmpty(values.breakage_ctc) 
      ) {
          setError(prevState => ({
            emptyField: {                
                ...prevState.error,    
                emptyField: true    
            }
        }))
      } else if( !isValid.job_desc||
        !isValid.job_profile||
        !isValid.designation||
        !isValid.recruitment_type||
        !isValid.place_of_posting||
        !isValid.annual_package||
        !isValid.breakage_ctc) 
       {
          setError(prevState => ({
              invalidFormat: {
                  ...prevState.error,
                  invalidFormat: true 
              }
          }))

      } else{
          nextStep();
      }
  
    }

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }
  
   
      return(    
        <div className='form-head text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
        <div className='text-bold'>
        <h1 className='flex justify-center sm:justify-start my-2 p-3 text-md font-semibold text-white rounded-md'>Step 3/7 : Job Details</h1>
        <form className='px-40 py-8 bg-white rounded-md' >
            <p>Required <span className='text-pink-600'>*</span></p>
            
              <div className='form-group'>
                <label  className='m-0 p-0'>Job Profile<span className='text-pink-600'>*</span></label>
                <input type="text" placeholder="" onChange={handleChange('job_profile')} defaultValue={values.job_profile}
               className={isValid.job_profile===null ?'border-2 rounded-md border-violet-200': isValid.job_profile?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                    { isValid.job_profile===false && <p>Provide a 10digit mobile no.</p>}
              </div>
              <div className='form-group'>
                <label  className='m-0 p-0'>Designation<span className='text-pink-600'>*</span></label>
                <input type="text" placeholder="" onChange={handleChange('designation')} defaultValue={values.designation}
                 className={isValid.designation===null ?'border-2 rounded-md border-violet-200': isValid.designation?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                    { isValid.designation===false && <p>Provide a 10digit mobile no.</p>}
              </div>
              <div className='form-group'>
                <label  className='m-0 p-0'>Place of posting<span className='text-pink-600'>*</span></label>
                <input type="text" placeholder="" onChange={handleChange('place_of_posting')} defaultValue={values.place_of_posting}
                 className={isValid.place_of_posting===null ?'border-2 rounded-md border-violet-200': isValid.place_of_posting?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                    { isValid.place_of_posting===false && <p>Provide a 10digit mobile no.</p>}
              </div>
              <div className='form-group'>
                <label  className='m-0 p-0'>Job Description<span className='text-pink-600'>*</span></label>
                <input type="text" placeholder="" onChange={handleChange('job_desc')} defaultValue={values.job_desc}
                 className={isValid.job_desc===null ?'border-2 rounded-md border-violet-200': isValid.job_desc?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                            { isValid.job_desc===false && <p>Provide a 10digit mobile no.</p>}
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
                      {/* <p className="text-pink-600 ">*Internship + Full Time: If anybody gets a full-time offer then he/she will definitely */}
                        {/* get an internship offer also.</p> */}
                  </div> 
              </div>
              <div className='form-group'>
                <p className='font-bold'>Salary details</p>
                <div className='form-group'>
                  <label  className='m-0 p-0'>Annual package<span className='text-pink-600'>*</span></label>
                  <input type="text" placeholder="" onChange={handleChange('annual_package')} defaultValue={values.annual_package}
                  className={isValid.annual_package===null ?'border-2 rounded-md border-violet-200': isValid.annual_package?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                    { isValid.annual_package===false && <p>Provide annual package in LPA</p>}
                </div>
                <div className='form-group'>
                  <label  className='m-0 p-0'>Breakage of CTC<span className='text-pink-600'>*</span></label>
                  <textarea type="text" name="breakage_ctc" maxLength="100"  placeholder={`description of CTC\n`} onChange={handleChange('breakage_ctc')} defaultValue={values.breakage_ctc}
                    className={isValid.breakage_ctc===null ?'min-h-[90px] max-h-[160px] border-2 rounded-md border-violet-200': 
                    isValid.breakage_ctc?'min-h-[90px] max-h-[160px] border-2 rounded-md border-[#1BDA9C]':'min-h-[90px] max-h-[160px]  border-2 rounded-md border-[#DB2777]' }/>
                    { isValid.breakage_ctc===false && <p>Provide breakage of CTC, upto 70 characters</p>}
                </div>
              </div>
              {error.emptyField && <p name="emptyField" className='text-[#d03863] font-semibold'>Please fill all the required* fields before proceeding</p>} 
              {error.invalidFormat && <p name="invalidFormat" className='text-[#d03863] font-semibold'>Please fill fields in the requied format before proceeding</p>} 
           
              <div className='flex flex-row justify-center'>            
                <button className='mx-3 my-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 rounded-md' onClick={ Previous } type='submit'>Previous</button>
                <button className='mx-3 my-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4  rounded-md' onClick={ Continue } type='submit' >Continue</button>
          </div></form>
          </div>
          </div>  
       )     
   
}

export default JobDetails

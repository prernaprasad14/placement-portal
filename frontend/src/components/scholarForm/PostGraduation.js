import React, { useEffect , useState}from 'react'
import validator from 'validator'
import {pg_courses } from '../../helpers/dropDownOptions';

const  PostGraduation= ({ isValid,prevStep, nextStep, handleChange, values }) => {    
  const [error, setError] = useState({
    emptyField:false,
    invalidFormat:false
});
  const [disable, setDisable]=useState(true)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [, set]= useState(true)
  const Continue = e => {
    e.preventDefault();
    if (
      validator.isEmpty(values.pg_course) ||
      validator.isEmpty(values.pg_exam_roll) ||
      validator.isEmpty(values.pg_class_roll) ||
      validator.isEmpty(values.pg_aggr_percentage) ||
      validator.isEmpty(values.pg_backlogs) ||
      (values.pg_backlogs>0 && validator.isEmpty(values.pg_backlog_details) ))
   { 
      setError(prevState => ({
        emptyField: { 
            ...prevState.error,
            emptyField: true 
        }
    }))
    }else if(
      !isValid.pg_course|| !isValid.pg_aggr_percentage || !isValid.pg_backlog_details ||
      !isValid.pg_backlogs || values.pg_backlogs>5 ||  values.pg_backlogs<0|| !isValid.pg_class_roll || !isValid.pg_exam_roll
      ){
         
        setError(prevState => ({
          invalidFormat: {
              ...prevState.error, 
              invalidFormat: true  
          }
      }))
    }else {
        nextStep();
    }
  }

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  return(  
    <>
      <div className='form-head  first-line:text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>
          <h1 className='flex justify-center sm:justify-start my-2 p-3 text-md font-semibold text-white  rounded-md'>Step 2/7 : Post Graduation Details</h1>
          <form id='postGraduation'  className='px-36 py-8 bg-white rounded-md'>
          <p className='text-sm'>Fields marked with <span className='text-pink-600'>*</span> are mandatory to fill</p>
          <div>
              <label className='block mb-2'>State <span className='text-pink-600'>*</span></label>
              <select required onChange={handleChange('pg_course')} defaultValue={values.pg_course} 
              className={isValid.pg_course===null? 'w-56 p-1 text-sm sm:text-lg  rounded-[5px] border-2 border-slate-300 text-slate-600' 
              : isValid.pg_course===false?  'w-56 px-2 py-1 text-sm sm:text-lg  rounded-[5px] border-2 text-slate-600 border-[#DB2777]': 'w-56 p-1 border-[#1BDA9C]  text-sm sm:text-lg rounded-[5px] border-2 text-slate-600 '}>
              <option selected value="">Select an option</option>
              {pg_courses.map(course=><option>{course}</option>)}
            </select>
            {isValid.pg_course===false && <p className='font-baseline text-pink-600' >Select an option</p>}

          </div>
            <div className='form-group'>
              <label className='m-0 p-0'>Examination roll number<span className='text-pink-600'>*</span></label>
              <input type='text' name='pg_exam_roll' placeholder='' onChange={handleChange('pg_exam_roll')} defaultValue={values.pg_exam_roll} 
                 className={isValid.pg_exam_roll===null ?'border-2 rounded-md border-violet-200': isValid.pg_exam_roll?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                 { isValid.pg_exam_roll===false && <p>Roll no. cannot contain spaces</p>}
            </div>
            <div className='form-group'>
              <label className='m-0 p-0'>Class roll number<span className='text-pink-600'>*</span></label>
              <input type='text' name='pg_class_roll' placeholder=''onChange={handleChange('pg_class_roll')} defaultValue={values.pg_class_roll} 
                className={isValid.pg_class_roll===null ?'border-2 rounded-md border-violet-200': isValid.pg_class_roll?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                { isValid.pg_class_roll===false && <p>Roll no. cannot contain spaces</p>}
            </div>
            <div className='form-group'>
              <label className='m-0 p-0'>Aggregate Percentage<span className='text-pink-600'>*</span></label>
              <input type='text' name='pg_aggr_percentage' placeholder='example: 62.88' onChange={handleChange('pg_aggr_percentage')} defaultValue={values.pg_aggr_percentage} 
                  className={isValid.pg_aggr_percentage===null ?'border-2 rounded-md border-violet-200': isValid.pg_aggr_percentage?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.pg_aggr_percentage===false && <p>Upto 2 decimal places</p>}
                
            </div>
            <div className='form-group'>
              <label className='m-0 p-0'>Backlogs<span className='text-pink-600'>*</span></label>
              <input type='number' min='0' max="5" name='pg_backlogs' placeholder='example : 0'onChange={handleChange('pg_backlogs')} defaultValue={values.pg_backlogs} 
                  className={isValid.pg_backlogs===null ?'border-2 rounded-md border-violet-200': isValid.pg_backlogs?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.pg_backlogs===false && <p>Provide 1 dgit value only </p>}
            </div>
            <div className='form-group'>
              <label >Details of Backlogs<span className='text-pink-600'>*</span></label>
              <textarea type='text' name='pg_backlog_details' maxLength='100'  placeholder={`description of backlogs (if applicable)\nexample: 1. Maths, otherwise NA`} onChange={handleChange('pg_backlog_details')} defaultValue={values.pg_backlog_details}
                 className={isValid.pg_backlog_details===null ?'min-h-[120px] border-2 rounded-md border-violet-200': isValid.pg_backlog_details?'min-h-[120px] border-2 rounded-md border-[#1BDA9C]':'min-h-[120px] border-2 rounded-md border-[#DB2777]' }/>
                 { isValid.pg_backlog_details===false && <p className='text-pink-600'>This is a required field</p>}
            </div>
            {error.emptyField && <p name='emptyField' className='text-[#d03863] font-semibold'>Please fill all the required* fields before proceeding</p>} 
            {error.invalidFormat && <p name='invalidFormat' className='text-[#d03863] font-semibold'>Please fill fields in the requied format before proceeding</p>} 
            
            <div className='flex flex-row justify-center'>            
                <button className='mx-3 my-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 rounded-md' onClick={ Previous } type='submit'>Previous</button>
                <button className='mx-3 my-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4  rounded-md' onClick={ Continue } type='submit' >Continue</button>
          </div>
          </form>
        </div>
      </div>
     </>
   )
 }

export default PostGraduation
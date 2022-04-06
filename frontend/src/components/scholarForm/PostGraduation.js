import React, { useEffect } from 'react'

const  PostGraduation= ({ prevStep, nextStep, handleChange, values }) => {
  const { pg_course,pg_exam_roll, pg_class_roll,pg_aggr_percentage,pg_backlogs,pg_backlog_details} = values
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const Continue = e => {
    e.preventDefault();
    nextStep();
  }

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  return(  
    <>
      {/* postGraduation */}
          <div className='text-bold box-border flex justify-center bg-gray-100 drop-shadow-[0_0_3px_rgba(0,0,0,0.1)] h-auto p-8'>
          <div className='text-bold'>
          <h1 className="my-5 p-4 text-md font-semibold text-white bg-[#7947b3] rounded-md">Step 2/6 : Post Graduation Details</h1>
          <form id="postGraduation"  className='px-36 py-8 bg-white rounded-md'>
          <p className='text-sm'>Fields marked with <span className='text-pink-600'>*</span> are mandatory to fill</p>
            <div className="my-5">
              <label className='m-0 p-0'>Course<span className='text-pink-600'>*</span></label>
              <input type="text" name="pg_course" placeholder="" onChange={handleChange('pg_course')} defaultValue={values.pg_course} 
                  className="px-3 my-2 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
            </div>
            <div className="my-5">
              <label className='m-0 p-0'>Examination roll number<span className='text-pink-600'>*</span></label>
              <input type="text" name="pg_exam_roll" placeholder="" onChange={handleChange('pg_exam_roll')} defaultValue={values.pg_exam_roll} 
                 className="px-3 my-2 border-2 rounded-md  border-violet-200" />
                <p>This can only have numeric value</p>
            </div>
            <div className="my-5">
              <label className='m-0 p-0'>Class roll number<span className='text-pink-600'>*</span></label>
              <input type="text" name="pg_class_roll" placeholder=""onChange={handleChange('pg_class_roll')} defaultValue={values.pg_class_roll} 
                 className="px-3 my-2 border-2 rounded-md  border-violet-200" />
                <p>This can only have numeric value</p>
            </div>
            <div className="my-5">
              <label className='m-0 p-0'>Aggregate Percentage<span className='text-pink-600'>*</span></label>
              <input type="text" name="pg_aggr_percentage" placeholder="" onChange={handleChange('pg_aggr_percentage')} defaultValue={values.pg_aggr_percentage} 
                 className="px-3 my-2 border-2 rounded-md  border-violet-200" />
                <p>This can only have numeric value</p>
            </div>
            <div className="my-5">
              <label className='m-0 p-0'>Backlogs<span className='text-pink-600'>*</span></label>
              <input type="number" name="pg_backlogs" placeholder="for example : 2"onChange={handleChange('pg_backlogs')} defaultValue={values.pg_backlogs} 
                 className="px-3 my-2 border-2 rounded-md  border-violet-200 placeholder:italic" />
                <p>This can only have numeric value</p>
            </div>
            <div className="my-5">
              <label className='m-0 p-0'>Details of Backlogs<span className='text-pink-600'>*</span></label>
              <textarea type="text" name="pg_backlog_details" maxLength="100"  placeholder={`description of backlogs (if applicable)\nfor example: 1. Maths, otherwise NA`} onChange={handleChange('pg_backlog_details')} defaultValue={values.pg_backlog_details}
                className="px-3 my-5 min-h-[90px] max-h-[160px]  border-2 rounded-md  border-violet-200 placeholder:italic"></textarea>
                <p>This is a required field</p>
            </div>
            <button className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 mr-2 rounded-md" onClick={ Previous } type="submit">Previous</button>
            <button className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 ml-[102px] rounded-md" onClick={ Continue } type="submit" >Save and Continue</button>
          </form>
        </div>
      </div>
     </>
   )
 }

export default PostGraduation
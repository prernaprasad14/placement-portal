import React, { useEffect } from 'react'

const UserDetails = ({ prevStep, nextStep, handleChange, values }) => {

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

  return (
    <>
       <div className='text-bold box-border flex justify-center bg-gray-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className="my-5 p-4 text-md font-semibold text-white bg-[#7947b3] rounded-md">Step 3/6 : Graduation Details</h1>
            <form id ="graduation"  className='px-36 py-8 bg-white rounded-md'>
            <p className='text-sm'>Fields marked with <span className='text-pink-600'>*</span> are mandatory to fill</p>
              <div>
                <label>College<span className='text-pink-600'>*</span></label>
                <input type="text" name="grad_college" placeholder="" onChange={handleChange('grad_college')} defaultValue={values.grad_college}
                  className="px-3 my-1 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label>University<span className='text-pink-600'>*</span></label>
                <input type="text" name="grad_university" placeholder="" onChange={handleChange('grad_university')} defaultValue={values.grad_university}
                  className="px-3 my-1 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label>Course<span className='text-pink-600'>*</span></label>
                <input type="text" name="grad_course" placeholder="" onChange={handleChange('grad_course')} defaultValue={values.grad_course}
                  className="px-3 my-1 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label>Roll number<span className='text-pink-600'>*</span></label>
                <input type="text" name="grad_roll_no" placeholder="" onChange={handleChange('grad_roll_no')} defaultValue={values.grad_roll_no}
                  className="px-3 my-1 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label>Marks obtained<span className='text-pink-600'>*</span></label>
                <input type="text" name="grad_marks_obtained" placeholder="" onChange={handleChange('grad_marks_obtained')} defaultValue={values.grad_marks_obtained}
                  className="px-3 my-1 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label>Maximum marks<span className='text-pink-600'>*</span></label>
                <input type="text" name="grad_max_marks" placeholder="" onChange={handleChange('grad_max_marks')} defaultValue={values.grad_max_marks}
                  className="px-3 my-1 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label>Aggregate Percentage<span className='text-pink-600'>*</span></label>
                <input type="text" name="grad_aggr_percentage" placeholder="" onChange={handleChange('grad_aggr_percentage')} defaultValue={values.grad_aggr_percentage}
                  className="px-3 my-1 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label>Year of passing<span className='text-pink-600'>*</span></label>
                <input type="text" name="grad_year_of_passing" placeholder="for example : 2015" min="4" max="4"  onChange={handleChange('grad_year_of_passing')} defaultValue={values.grad_year_of_passing} 
                  className="px-3 my-1 border-2 rounded-md  border-violet-200 placeholder:italic" />
                <p>Enter the full year</p>
              </div>
              <button className="bg-[#6F42A2] hover:bg-violet-400  text-white font-bold py-2 px-4 mr-2 rounded-md" onClick={ Previous } type="submit" >Previous</button>
              <button className="bg-[#6F42A2] hover:bg-violet-400  text-white font-bold py-2 px-4 ml-[102px] rounded-md" onClick={ Continue } type="submit">Save and Continue</button>
          </form>
      </div>
      </div>
    </>

  )
}

export default UserDetails
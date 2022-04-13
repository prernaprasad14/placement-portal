
import {useNavigate, Link} from 'react-router-dom';
import React, { useEffect } from 'react'



const IntermediateDetails=({ prevStep, nextStep, handleChange, values }) => {
   
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
      <div className='text-bold box-border flex justify-center bg-gray-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className="my-5 p-4 text-md font-semibold text-white bg-[#7947b3] rounded-md">Step 4/6 : Intermediate Details</h1>
            <form id ="intermediate"  className='px-36 py-8 bg-white rounded-md'>
            <p className='text-sm'>Fields marked with <span className='text-pink-600'>*</span> are mandatory to fill</p>
              <div>
                <label >Intermmediate board (10+2 or Equivalent)<span className='text-pink-600'>*</span></label>
                <input type="text" name="inter_board"placeholder="" onChange={handleChange('inter_board')} defaultValue={values.inter_board}
                  className="px-3 my-1 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label >Roll number<span className='text-pink-600'>*</span></label>
                <input type="text" name="inter_roll_no" placeholder=""onChange={handleChange('inter_roll_no')} defaultValue={values.inter_roll_no}
                  className="px-3 my-1 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label >Marks obtained<span className='text-pink-600'>*</span></label>
                <input type="text" name="inter_marks_obtained"placeholder="" onChange={handleChange('inter_marks_obtained')} defaultValue={values.inter_marks_obtained}
                  className="px-3 my-1 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label >Maximum marks<span className='text-pink-600'>*</span></label>
                <input type="text" name="inter_max_marks" placeholder=""onChange={handleChange('inter_max_marks')} defaultValue={values.inter_max_marks}
                  className="px-3 my-1 border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label >Aggregate Percentage<span className='text-pink-600'>*</span></label>
                <input type="text" name="inter_aggr_percentage" placeholder=""onChange={handleChange('inter_aggr_percentage')} defaultValue={values.inter_aggr_percentage}
                  className="my-3  border-2 rounded-md  border-violet-200" />
                <p>This is a required field</p>
              </div>
              <div>
                <label >Year of passing<span className='text-pink-600'>*</span></label>
                <input type="text" name="inter_year_of_passing" placeholder="for example : 2015" min="4" max="4"  onChange={handleChange('inter_year_of_passing')} defaultValue={values.inter_year_of_passing}
                  className="px-3 my-1 border-2 rounded-md  border-violet-200 placeholder:italic" />
                <p>Enter the full year</p>
              </div>
              <button className="bg-[#6F42A2] hover:bg-violet-400  text-white font-bold py-2 px-4 mr-2 rounded-md" onClick={ Previous } type="submit">Previous</button>
              <button className="bg-[#6F42A2] hover:bg-violet-400  text-white font-bold py-2 px-4 ml-[102px] rounded-md" onClick={ Continue } type="submit" >Save and Continue</button>
        </form>
        </div>
      </div>
    </>
  )
}
export default IntermediateDetails
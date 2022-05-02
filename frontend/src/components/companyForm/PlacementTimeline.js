
import {useNavigate, Link} from 'react-router-dom';
import React, { useEffect } from 'react'



const PlacementTimeline=({ prevStep, nextStep, handleChange, values }) => {
   
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
    
      <div className='text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className="my-5 p-4 text-md font-semibold text-white bg-[#7947b3] rounded-md">Step 5/6 : Placement Timeline</h1>
            <form id ="timeline"  className='px-40 py-8 bg-white rounded-md'>
              <p>Required <span className='text-pink-600'>*</span></p>
              <div className="my-5">
                <label className='m-0 p-0'>Pre-Placement Talk<span className='text-pink-600'>*</span></label>
                <input type="date" placeholder="" onChange={handleChange('pre_placement_talk')} defaultValue={values.pre_placement_talk}
                  className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div>
              <div className="my-5">
                <label className='m-0 p-0'>Coding test<span className='text-pink-600'>*</span></label>
                <input type="date" placeholder="" onChange={handleChange('coding_test_date')} defaultValue={values._coding_test_date}
                  className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div>
              <div className="my-5">
                <label className='m-0 p-0'>Interview<span className='text-pink-600'>*</span></label>
                <input type="date" placeholder="" onChange={handleChange('interview_date')} defaultValue={values.interview_date}
                  className="px-3 my-2 border-2 rounded-md  border-violet-200" />
              </div>
              <div className="my-5">
              <label className='m-0 p-0'>Notes<span className='text-pink-600'>*</span></label>
              <textarea type="text" maxLength="100"  placeholder="" onChange={handleChange('notes')} defaultValue={values.notes}
                className="px-3 my-5 min-h-[90px] max-h-[160px]  border-2 rounded-md  border-violet-200"></textarea>
            </div>
              <button type="button" className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 mr-2 rounded-md"  onClick={ Previous } >Previous</button>
              <button type="button" className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 ml-[110px] rounded-md" onClick={ Continue }  >Save and Continue</button>
        </form>
        </div>
      </div>
    </>
  )
}
export default PlacementTimeline




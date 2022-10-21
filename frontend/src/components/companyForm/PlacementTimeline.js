import React, {useEffect,useState} from 'react';
import validator from 'validator'
const PlacementTimeline=({isValid, prevStep, nextStep, handleChange, values }) => {
  const [error, setError] = useState({
    emptyField:false,
    invalidFormat:false
});
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    const Continue = e => {
      e.preventDefault()  
        if (
          validator.isEmpty(values.coding_test_date) ||
          validator.isEmpty(values.pre_placement_talk) ||
          validator.isEmpty(values.interview_date) ||
          validator.isEmpty(values.notes) 
        ) {
          setError(prevState => ({
            emptyField: {                
                ...prevState.error,              
                emptyField: true
            }
        }))
        } else if(values.notes.length>50 ){
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
    <>
    
    <div className='form-head text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className='flex justify-center sm:justify-start my-2 p-3 text-md font-semibold text-white rounded-md'>Step 5/7 : Placement Timeline</h1>
            <form id ="timeline"  className='px-40 py-8 bg-white rounded-md'>
              <p>Required <span className='text-pink-600'>*</span></p>
              
              <div className="form-group">
                <label className='m-0 p-0'>Pre-Placement Talk<span className='text-pink-600'>*</span></label>
                <input type="date" min='2022-01-31' max='2023-05-31' pattern="\d{4}-\d{2}-\d{2}"  placeholder="" onChange={handleChange('pre_placement_talk')} defaultValue={values.pre_placement_talk}
                 className={isValid.pre_placement_talk===null ?'border-2 rounded-md border-violet-200': 'border-2 rounded-md border-[#1BDA9C]' }/>
                 {/* className={isValid.pre_placement_talk===null ?'border-2 rounded-md border-violet-200': isValid.pre_placement_talk?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/> */}
                 {/* { isValid.pre_placement_talk===false && <p>cannot have past values</p>} */}
              </div>
              <div className="form-group">
                <label className='m-0 p-0'>Coding round<span className='text-pink-600'>*</span></label>
                <input type="date" min='2022-01-31'  max='2023-05-31' pattern="\d{4}-\d{2}-\d{2}" placeholder="" onChange={handleChange('coding_test_date')} defaultValue={values._coding_test_date}
                 className={isValid.coding_test_date===null ?'border-2 rounded-md border-violet-200': 'border-2 rounded-md border-[#1BDA9C]' }/>
                 {/* className={isValid.coding_test_date===null ?'border-2 rounded-md border-violet-200': isValid.coding_test_date?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/> */}
                 {/* { isValid.coding_test_date===false && <p>cannot have past values</p>} */}
              </div>
              <div className="form-group">
                <label className='m-0 p-0'>Interview<span className='text-pink-600'>*</span></label>
                <input type="date" min='2022-01-31' max='2023-05-31'  pattern="\d{4}-\d{2}-\d{2}" placeholder="" onChange={handleChange('interview_date')} defaultValue={values.interview_date}
                  className={isValid.interview_date===null ?'border-2 rounded-md border-violet-200': 'border-2 rounded-md border-[#1BDA9C]' }/>
                  {/* className={isValid.interview_date===null ?'border-2 rounded-md border-violet-200': isValid.interview_date?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/> */}
                  {/* { isValid.interview_date===false && <p>cannot have past values</p>} */}
              </div>
              <div className="form-group">
              <label className='m-0 p-0'>Notes<span className='text-pink-600'>*</span></label>
              <textarea type="text" maxLength="50"  placeholder='Any other notes, in case not applicable -NA' onChange={handleChange('notes')} defaultValue={values.notes}
               className={isValid.notes===null ?'max-h-[190px] min-h-[90px] border-2 rounded-md border-violet-200': isValid.notes?'min-h-[90px] max-h-[190px] border-2 rounded-md border-[#1BDA9C]':'min-h-[90px] max-h-[190px] border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.notes===false && <p>Notes can be upto 50 characters</p>}
            </div>
            {error.emptyField && <p name="emptyField" className='text-[#d03863] font-semibold'>Please fill all the required* fields before proceeding</p>} 
            {error.invalidFormat && <p name="invalidFormat" className='text-[#d03863] font-semibold'>Please fill fields in the requied format before proceeding</p>} 
           
            <div className='flex flex-row justify-center'>            
                <button className='mx-3 my-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 rounded-md' onClick={ Previous } type='submit'>Previous</button>
                <button className='mx-3 my-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4  rounded-md' onClick={ Continue } type='submit' >Continue</button>
          </div></form>
        </div>
      </div>
    </>
  )
}
export default PlacementTimeline




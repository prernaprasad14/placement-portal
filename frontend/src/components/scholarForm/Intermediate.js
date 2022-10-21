
import React, { useEffect, useState}  from 'react'
import validator from 'validator'

const IntermediateDetails=({ isValid, prevStep, nextStep, handleChange, values }) => {

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
        validator.isEmpty(values.inter_board) ||
        validator.isEmpty(values.inter_roll_no) ||
        validator.isEmpty(values.inter_marks_obtained) ||
        validator.isEmpty(values.inter_max_marks) ||
        validator.isEmpty(values.inter_aggr_percentage) ||
        validator.isEmpty(values.inter_year_of_passing)
      ){
        setError(prevState => ({
          emptyField: {             
              ...prevState.error, 
              emptyField: true 
          }
        }))
      } else if(!isValid.inter_board||
        !isValid.inter_roll_no||
        !isValid.inter_marks_obtained||
        !isValid.inter_max_marks||
        !isValid.inter_aggr_percentage||
        !isValid.inter_year_of_passing
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
      <div className='form-head text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className='flex justify-center sm:justify-start my-2 p-3 text-md font-semibold text-white  rounded-md'>Step 4/7 : Intermediate Details (10+2 or Equivalent)</h1>
            <form id ='intermediate'  className='px-36 py-8 bg-white rounded-md'>
            <p className='text-sm'>Fields marked with <span className='text-pink-600'>*</span> are mandatory to fill</p>
              <div>
                <label >Intermmediate board (10+2 or Equivalent)<span className='text-pink-600'>*</span></label>
                <input type='text' name='inter_board'placeholder='' onChange={handleChange('inter_board')} defaultValue={values.inter_board}
                  className={isValid.inter_board===null ?'border-2 rounded-md border-violet-200': isValid.inter_board?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.inter_board===false && <p>This is a required field</p>}
              </div>
              <div>
                <label >Roll number<span className='text-pink-600'>*</span></label>
                <input type='text' name='inter_roll_no' placeholder=''onChange={handleChange('inter_roll_no')} defaultValue={values.inter_roll_no}
                  className={isValid.inter_roll_no===null ?'border-2 rounded-md border-violet-200': isValid.inter_roll_no?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.inter_roll_no===false && <p>This is a required field</p>}
              </div>
              <div>
                <label >Marks obtained<span className='text-pink-600'>*</span></label>
                <input type='text' name='inter_marks_obtained'placeholder='' onChange={handleChange('inter_marks_obtained')} defaultValue={values.inter_marks_obtained}
                  className={isValid.inter_marks_obtained===null ?'border-2 rounded-md border-violet-200': isValid.inter_marks_obtained?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.inter_marks_obtained===false && <p>This is a required field</p>}
              </div>
              <div>
                <label >Maximum marks<span className='text-pink-600'>*</span></label>
                <input type='text' name='inter_max_marks' placeholder=''onChange={handleChange('inter_max_marks')} defaultValue={values.inter_max_marks}
                  className={isValid.inter_max_marks===null ?'border-2 rounded-md border-violet-200': isValid.inter_max_marks?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.inter_max_marks===false && <p>This is a required field</p>}
              </div>
              <div>
                <label >Aggregate Percentage<span className='text-pink-600'>*</span></label>
                <input type='text' name='inter_aggr_percentage' placeholder=''onChange={handleChange('inter_aggr_percentage')} defaultValue={values.inter_aggr_percentage}
                  className={isValid.inter_aggr_percentage===null ?'border-2 rounded-md border-violet-200': isValid.inter_aggr_percentage?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.inter_aggr_percentage===false && <p>Upto 2 decimal places</p>}
              </div>
              <div>
                <label >Year of passing<span className='text-pink-600'>*</span></label>
                <input type='text' name='inter_year_of_passing' placeholder='for example : 2015' min='4' max='4'  onChange={handleChange('inter_year_of_passing')} defaultValue={values.inter_year_of_passing}
                  className={isValid.inter_year_of_passing===null ?'border-2 rounded-md border-violet-200': isValid.inter_year_of_passing?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.inter_year_of_passing===false && <p>Enter full year</p>}
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
export default IntermediateDetails
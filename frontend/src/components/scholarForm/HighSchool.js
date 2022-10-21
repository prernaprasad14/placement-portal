import React, { useEffect , useState} from 'react'
import validator from 'validator'


const HighSchool = ({ isValid, prevStep, nextStep, handleChange, values }) => {
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
        validator.isEmpty(values.high_board) ||
        validator.isEmpty(values.high_roll_no) ||
        validator.isEmpty(values.high_marks_obtained) ||
        validator.isEmpty(values.high_max_marks) ||
        validator.isEmpty(values.high_aggr_percentage) ||
        validator.isEmpty(values.high_year_of_passing)
      ) {
        setError(prevState => ({
          emptyField: {
              ...prevState.error,
              emptyField: true 
          }
      }))
      } else if(!isValid.high_board||
                !isValid.high_roll_no||
                !isValid.high_marks_obtained||
                !isValid.high_max_marks||
                !isValid.high_aggr_percentage||
                !isValid.high_year_of_passing
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
      <div className='form-head text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
      <div className='text-bold'>
      <h1 className='flex justify-center sm:justify-start my-2 p-3 text-md font-semibold text-white rounded-md'>Step 5/7: HighSchool Details</h1>
      <form className='px-36 py-8 bg-white rounded-md' >
      <p className='text-sm'>Fields marked with <span className='text-pink-600'>*</span> are mandatory to fill</p>
          
            <div className='form-group'>
              <label >HighSchool board<span className='text-pink-600'>*</span></label>
              <input type='text' name='high_board' placeholder='' onChange={handleChange('high_board')} defaultValue={values.high_board}
             className={isValid.high_board===null ?'border-2 rounded-md border-violet-200': isValid.high_board?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.high_board===false && <p>This is a required field</p>}
            </div>
            <div className='form-group'>
              <label  >Roll number<span className='text-pink-600'>*</span></label>
              <input type='text' name='high_roll_no' placeholder='' onChange={handleChange('high_roll_no')} defaultValue={values.high_roll_no}
               className={isValid.high_roll_no===null ?'border-2 rounded-md border-violet-200': isValid.high_roll_no?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.high_roll_no===false && <p>This is a required field</p>}
            </div>
            <div className='form-group'>
              <label  >Marks obtained<span className='text-pink-600'>*</span></label>
              <input type='text' name='high_marks_obtained' placeholder='' onChange={handleChange('high_marks_obtained')} defaultValue={values.high_marks_obtained}
               className={isValid.high_marks_obtained===null ?'border-2 rounded-md border-violet-200': isValid.high_marks_obtained?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.high_marks_obtained===false && <p>This is a required field</p>}
            </div>
            <div className='form-group'>
              <label  >Maximum marks<span className='text-pink-600'>*</span></label>
              <input type='text' name='high_max_marks' placeholder='' onChange={handleChange('high_max_marks')} defaultValue={values.high_max_marks}
               className={isValid.high_max_marks===null ?'border-2 rounded-md border-violet-200': isValid.high_max_marks?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.high_max_marks===false && <p>This is a required field</p>}
            </div>
            <div className='form-group'>
              <label  >Aggregate Percentage<span className='text-pink-600'>*</span></label>
              <input type='text' name='high_aggr_percentage' placeholder='' onChange={handleChange('high_aggr_percentage')} defaultValue={values.high_aggr_percentage}
               className={isValid.high_aggr_percentage===null ?'border-2 rounded-md border-violet-200': isValid.high_aggr_percentage?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.high_aggr_percentage===false && <p>Upto 2 decimal places</p>}
            </div>
            <div className='form-group'>
              <label>Year of passing<span className='text-pink-600'>*</span></label>
              <input type='text' name='high_year_of_passing' placeholder='for example : 2015' min='4' max='4' onChange={handleChange('high_year_of_passing')} defaultValue={values.high_year_of_passing}  
                className={isValid.high_year_of_passing===null ?'border-2 rounded-md border-violet-200': isValid.high_year_of_passing?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                { isValid.high_year_of_passing===false && <p>Enter full year</p>}
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
    ) 
}

export default HighSchool

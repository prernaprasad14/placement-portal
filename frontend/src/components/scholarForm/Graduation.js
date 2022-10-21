import React, { useEffect , useState} from 'react'
import validator from 'validator'
import DatePicker from "react-datetime";
import 'react-datetime/css/react-datetime.css';

const Gradution = ({ handleDate, isValid, prevStep, nextStep, handleChange, values , setFormDate}) => {
  const [error, setError] = useState(false);
  const [disable, setDisable]=useState(true)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const Continue = e => {
    e.preventDefault();
    console.log(values.grad_year_of_passing)
    if(
      validator.isEmpty(values.grad_college) ||
      validator.isEmpty(values.grad_university) ||
      validator.isEmpty(values.grad_course) ||
      validator.isEmpty(values.grad_roll_no) ||
      validator.isEmpty(values.grad_marks_obtained) ||
      validator.isEmpty(values.grad_max_marks) ||
      validator.isEmpty(values.grad_aggr_percentage) ||
      validator.isEmpty(values.grad_year_of_passing)
    ){
        setError(prevState => ({
          emptyField: {
              ...prevState.error,
              emptyField: true 
          }
      }))
    } else if (
      !isValid.grad_college ||
      !isValid.grad_university ||
      !isValid.grad_course ||
      !isValid.grad_roll_no ||
      !isValid.grad_marks_obtained ||
      !isValid.grad_max_marks ||
      !isValid.grad_aggr_percentage ||
      !isValid.grad_year_of_passing
    ){
      setError(prevState => ({
          invalidFormat: {           
              ...prevState.error,    
              invalidFormat: true     
          }
      }))   
    }else{
          nextStep();
      }
  }

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  return (
    <>
       <div className='form-head  first-line:text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>
              {/* <div className='row'> */}
            <h1 className=' flex justify-center sm:justify-start my-2 p-3 text-md font-semibold text-white rounded-md'>Step 3/7 : Graduation Details</h1>
              {/* </div> */}
                
            <form id ='graduation'  className='px-36 py-8 bg-white rounded-md'>
            <p className='text-sm'>Fields marked with <span className='text-pink-600'>*</span> are mandatory to fill</p>
              <div className='form-group'>
                <label>College<span className='text-pink-600'>*</span></label>
                <input type='text' name='grad_college' placeholder='' onChange={handleChange('grad_college')} defaultValue={values.grad_college}
                  className={isValid.grad_college===null ?'border-2 rounded-md border-violet-200': isValid.grad_college?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.grad_college===false && <p>Provide full name</p>}
              </div>
              <div className='form-group'>
                <label>University<span className='text-pink-600'>*</span></label>
                <input type='text' name='grad_university' placeholder='' onChange={handleChange('grad_university')} defaultValue={values.grad_university}
                  className={isValid.grad_university===null ?'border-2 rounded-md border-violet-200': isValid.grad_university?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.grad_university===false && <p>Provide full name</p>}
              </div>
              <div className='form-group'>
                <label>Course<span className='text-pink-600'>*</span></label>
                <input type='text' name='grad_course' placeholder='' onChange={handleChange('grad_course')} defaultValue={values.grad_course}
                  className={isValid.grad_course===null ?'border-2 rounded-md border-violet-200': isValid.grad_course?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.grad_course===false && <p>Provide full name</p>}
              </div>
              <div className='form-group'>
                <label>Roll number<span className='text-pink-600'>*</span></label>
                <input type='text' name='grad_roll_no' placeholder='' onChange={handleChange('grad_roll_no')} defaultValue={values.grad_roll_no}
                  className={isValid.grad_roll_no===null ?'border-2 rounded-md border-violet-200': isValid.grad_roll_no?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.grad_roll_no===false && <p>Roll no. cannot contain spaces</p>}
              </div>
              <div className='form-group'>
                <label>Marks obtained<span className='text-pink-600'>*</span></label>
                <input type='text' name='grad_marks_obtained' placeholder='88.10' onChange={handleChange('grad_marks_obtained')} defaultValue={values.grad_marks_obtained}
                  className={isValid.grad_marks_obtained===null ?'border-2 rounded-md border-violet-200': isValid.grad_marks_obtained?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.grad_marks_obtained===false && <p>This can only have numeric value, provide upto 2-decimal places</p>}
              </div>
              <div className='form-group'>
                <label>Maximum marks<span className='text-pink-600'>*</span></label>
                <input type='text' name='grad_max_marks' placeholder='100' onChange={handleChange('grad_max_marks')} defaultValue={values.grad_max_marks}
                  className={isValid.grad_max_marks===null ?'border-2 rounded-md border-violet-200': isValid.grad_max_marks?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.grad_max_marks===false && <p>This can only have numeric value, minimum 2-digits</p>}
              </div>
              <div className='form-group'>
                <label>Aggregate Percentage<span className='text-pink-600'>*</span></label>
                <input type='text' name='grad_aggr_percentage' placeholder='88.10' onChange={handleChange('grad_aggr_percentage')} defaultValue={values.grad_aggr_percentage}
                 className={isValid.grad_aggr_percentage===null ?'border-2 rounded-md border-violet-200': isValid.grad_aggr_percentage?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.grad_aggr_percentage===false && <p>This can only have numeric value, provide upto 2-decimal places</p>}
              </div>
              <div className='form-group'>
                <label>Year of passing<span className='text-pink-600'>*</span></label>
                {/* <Datetime 
                    name="grad_year_of_passing"
dateFormat='YYYY'  
onS
                    onChange={(date)=>this.handleDate(date, 'grad_year_of_passing')} //pass name as string
                    defaultValue={values.grad_year_of_passing}  />                 */}
      {/* <DatePicker dateFormat="YYYY" max="4" onChange={(year) =>handleDate('grad_year_of_passing',year)} defaultValue={values.grad_year_of_passing}/> */}
                
                {/* <DatePicker
      // selected={values.grad_year_of_passing}
      // onChange={()=>{ setValues({...values, [grad_year_of_passing]:date})}}
      showYearPicker
      dateFormat="yyyy"
      yearItemNumber={9}
    /> */}
                <input type='text' name='grad_year_of_passing' placeholder='for example : 2015' min='4' max='4'  onChange={handleChange('grad_year_of_passing')} defaultValue={values.grad_year_of_passing} 
                  className={isValid.grad_year_of_passing===null ?'border-2 rounded-md border-violet-200': isValid.grad_year_of_passing?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                  { isValid.grad_year_of_passing===false && <p>Enter full year</p>}
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

export default Gradution
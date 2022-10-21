import React, {useEffect,useState} from 'react';
import validator from 'validator'


const  SelectionDetails= ({ isValid, prevStep, nextStep, handleChange, values }) => {
  const [error, setError] = useState({
    emptyField:false,
    invalidFormat:false
});

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const Continue = e => {
    e.preventDefault()  
    console.log("here1")
   
    if (
        validator.isEmpty(values.interview) ||
        validator.isEmpty(values.aptitude_test) ||
        validator.isEmpty(values.coding_test) ||
        validator.isEmpty(values.courses_allowed) ||
        validator.isEmpty(values.hr_round) ||
        validator.isEmpty(values.any_other_rounds)
        ) {
        console.log("here2") 
        console.log(values)
        setError(prevState => ({
            emptyField: {        
                ...prevState.error,
                emptyField: true
            }
        }))
    } else if(
        // !isValid.interview ||
        // !isValid.aptitude_test ||
        // !isValid.coding_test ||
        // !isValid.courses_allowed ||
        // !isValid.hr_round ||
        !isValid.any_other_rounds 
        ){
            console.log("here3")
            setError(prevState => ({
                invalidFormat: { 
                    ...prevState.error,
                    invalidFormat: true
                }
            }))
            
        } else{
        console.log("here4")
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
            <h1 className='flex justify-center sm:justify-start my-2 p-3 text-md font-semibold text-white rounded-md'>Step 4/7 : Selection Details</h1>
          <form id="selection"  className='px-40 py-8 bg-white rounded-md'>
            <p>Required <span className='text-pink-600'>*</span></p>
           
            <div onChange={handleChange('courses_allowed')} name="courses_allowed" defaultValue={values.courses_allowed} className=" my-1 ">
                <p className='font-semibold'>Courses allowed<span className='text-pink-600'>*</span></p>
                <div className="inline-block ">
                    <input required type="radio" checked={values.courses_allowed==='MCA'} name="group1" value="MCA" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4" htmlFor='MCA' >MCA </label>
                </div>
                <div className="inline-block ">
                    <input type="radio" checked={values.courses_allowed==='Msc'} name="group1" value="Msc" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4"htmlFor='MSc' >MSc</label>
                </div>
                <div className="inline-block ">
                    <input type="radio" checked={values.courses_allowed==='Msc, MCA'} name="group1" value="Msc, MCA"className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4" htmlFor='Both' >Both</label>
                </div> 
            </div>

            <div onChange={handleChange('aptitude_test')} name="aptitude_test" defaultValue={values.aptitude_test} className=" my-1  ">
                <p className='font-semibold'>Aptitude test<span className='text-pink-600'>*</span></p>
                <div className="inline-block ">
                    <input required type="radio" checked={values.aptitude_test==='Yes'} name="group2" value="Yes" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4" htmlFor='Yes' >Yes</label>
                </div>
               <div className="inline-block ">
                    <input type="radio" checked={values.aptitude_test==='No'} name="group2" value="No" className="hover:cursor-pointer p-2  text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4" htmlFor='No' >No</label>
                </div>
            </div>
            <div onChange={handleChange('coding_test')} name="coding_test" defaultValue={values.coding_test} className=" my-1 ">
                <p className='font-semibold'>Coding round<span className='text-pink-600'>*</span></p>
                <div className="inline-block ">
                    <input required type="radio" checked={values.coding_test==='Yes'} name="group3" value="Yes" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4">Yes</label>
                </div>
                <div className="inline-block ">
                    <input type="radio" checked={values.coding_test==='No'} name="group3" value="No" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4">No</label>
                </div>
            </div>
            <div onChange={handleChange('interview')} name="interview" defaultValue={values.interview} className=" my-1 inline-block ">
                <p className='font-semibold'>Personal interview<span className='text-pink-600'>*</span></p>
                <div className="inline-block ">
                    <input required type="radio"    checked={values.interview==='Yes'} name="group4" value="Yes" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4">Yes</label>
                </div>
                <div className="inline-block ">
                    <input type="radio" checked={values.interview==='No'} name="group4" value="No" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4">No</label>
                </div>
            </div>
            <div onChange={handleChange('hr_round')} name="hr_round" defaultValue={values.hr_round} className=" form-group my-1 ">
                <p className='font-semibold'>HR round<span className='text-pink-600'>*</span></p>
                <div className="inline-block ">
                    <input required type="radio" checked={values.hr_round==='Yes'} name="group5" value="Yes" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4" >Yes</label>
                </div>
                <div className="inline-block ">
                    <input type="radio" checked={values.hr_round==='No'} name="group5" value="No" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4">No</label>
                </div>
            </div>
            
            <div className="form-group">
              <label className=''>Any other rounds<span className='text-pink-600'>*</span></label>
              <textarea type="text" maxLength="100"  placeholder="Description about other rounds(if applicable), otherwise NA" onChange={handleChange('any_other_rounds')} defaultValue={values.any_other_rounds}
                 className={isValid.any_other_rounds===null ?'border-2 rounded-md border-violet-200 min-h-[90px] max-h-[160px] ': 
                    isValid.any_other_rounds?'border-2 rounded-md border-[#1BDA9C] min-h-[90px] max-h-[160px] ':'border-2 rounded-md border-[#DB2777] min-h-[90px] max-h-[160px] ' }></textarea>
             { isValid.any_other_rounds===false && <p className='px-1 text-pink-600'>NA, if Not applicable</p>}
            </div>
            {error.emptyField && <p name="emptyField" className='text-[#d03863] font-semibold'>Please fill all the required* fields before proceeding</p>} 
            {error.invalidFormat && <p name="invalidFormat" className='text-[#d03863] font-semibold'>Please fill fields in the requied format before proceeding</p>} 
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

export default SelectionDetails
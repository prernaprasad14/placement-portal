import React, { useEffect } from 'react'

const  SelectionDetails= ({ prevStep, nextStep, handleChange, values }) => {
  
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
      <div className='text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
          <div className='text-bold'>
          <h1 className="my-5 p-4 text-md font-semibold text-white bg-[#7947b3] rounded-md">Step 4/6 : Selection Details</h1>
          <form id="selection"  className='px-40 py-8 bg-white rounded-md'>
            <p>Required <span className='text-pink-600'>*</span></p>
           
            <div onChange={handleChange('courses_allowed')} name="courses_allowed" defaultValue={values.courses_allowed} className=" my-1 ">
                <p className='font-semibold'>Courses allowed<span className='text-pink-600'>*</span></p>
                <div className="inline-block ">
                    <input type="radio" name="group1" value="mca" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4"  >MCA </label>
                </div>
                <div className="inline-block ">
                    <input type="radio" name="group1" value="msc" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4" >MSc</label>
                </div>
                <div className="inline-block ">
                    <input type="radio" name="group1" value="both"className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4" >Both</label>
                </div> 
            </div>

            <div onChange={handleChange('aptitude_test')} name="aptitude_test" defaultValue={values.aptitude_test} className=" my-1  ">
                <p className='font-semibold'>Aptitude test<span className='text-pink-600'>*</span></p>
                <div className="inline-block ">
                    <input type="radio" name="group2" value="yes" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4"  >Yes</label>
                </div>
               <div className="inline-block ">
                    <input type="radio" name="group2" value="no" className="hover:cursor-pointer p-2  text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4" >No</label>
                </div>
            </div>
            <div onChange={handleChange('coding_test')} name="coding_test" defaultValue={values.coding_test} className=" my-1 ">
                <p className='font-semibold'>Coding test<span className='text-pink-600'>*</span></p>
                <div className="inline-block ">
                    <input type="radio" name="group3" value="yes" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4">Yes</label>
                </div>
                <div className="inline-block ">
                    <input type="radio" name="group3" value="no" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4">No</label>
                </div>
            </div>
            <div onChange={handleChange('interview')} name="interview" defaultValue={values.interview} className=" my-1 inline-block ">
                <p className='font-semibold'>Personal interview<span className='text-pink-600'>*</span></p>
                <div className="inline-block ">
                    <input type="radio" name="group4" value="yes" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4">Yes</label>
                </div>
                <div className="inline-block ">
                    <input type="radio" name="group4" value="no" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4">No</label>
                </div>
            </div>
            <div onChange={handleChange('hr_round')} name="hr_round" defaultValue={values.hr_round} className=" my-1 ">
                <p className='font-semibold'>HR round<span className='text-pink-600'>*</span></p>
                <div className="inline-block ">
                    <input type="radio" name="group5" value="yes" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4" >Yes</label>
                </div>
                <div className="inline-block ">
                    <input type="radio" name="group5" value="no" className="hover:cursor-pointer p-2 inline-block text-lg  my-3 border-2  border-violet-200"/>
                    <label className="px-4">No</label>
                </div>
            </div>
            
            <div className="my-5">
              <label className='m-0 p-0'>Any other rounds<span className='text-pink-600'>*</span></label>
              <textarea type="text" maxLength="100"  placeholder="Description about other rounds(if applicable), otherwise NA"onChange={handleChange('any_other_rounds')} defaultValue={values.any_other_rounds}
                className="px-3 my-5 min-h-[90px] max-h-[160px]  border-2 rounded-md  border-violet-200"></textarea>
            </div>

            <button type="button" className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 mr-2 rounded-md" onClick={ Previous }>Previous</button>
            <button type="button" className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 ml-[110px] rounded-md" onClick={ Continue }>Save and Continue</button>
          </form>
        </div>
      </div>
     </>
   )
 }

export default SelectionDetails
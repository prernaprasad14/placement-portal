import React, { useEffect } from 'react'

const ContactDetails = ({ prevStep, nextStep, handleChange, values }) => {
 
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
       <div className='text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className="my-5 p-4 text-md font-semibold text-white bg-[#7947b3] rounded-md">Step 2/6 : Contact Details</h1>
            <form id ="contactdetails"  className='px-40 py-8 bg-white rounded-md'>
              <p>Required <span className='text-pink-600'>*</span></p>
              <div className='my-8'>
                <p className='font-bold'>HR contact details</p>
                  <div>
                      <label>Name<span className='text-pink-600'>*</span></label>
                    <input type="text"  placeholder="" onChange={handleChange('head_name')} defaultValue={values.head_name} 
                        className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                    <p>This is a required field</p>
                  </div>
                  <div>
                      <label>Email<span className='text-pink-600'>*</span></label>
                      <input type="email"  placeholder="" onChange={handleChange('head_email')} defaultValue={values.head_email} 
                        className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                    <p>This is a required field</p>
                  </div>
                  <div>
                      <label>Phone <span className='text-pink-600'>*</span></label>
                      <input type="text"  placeholder="" onChange={handleChange('head_mobile')} defaultValue={values.head_mobile} 
                        className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                    <p>This is a required field</p>
                  </div>
                </div>
              <div className='my-8'>
                <p className='font-bold'>Second contact person</p>
                  <div>
                      <label>Name<span className='text-pink-600'>*</span></label>
                    <input type="text"  placeholder="" onChange={handleChange('second_name')} defaultValue={values.second_name} 
                        className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                    <p>This is a required field</p>
                  </div>
                  <div>
                      <label>Email<span className='text-pink-600'>*</span></label>
                      <input type="email"  placeholder="" onChange={handleChange('second_email')} defaultValue={values.second_email} 
                        className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                    <p>This is a required field</p>
                  </div>
                  <div>
                      <label>Phone<span className='text-pink-600'>*</span></label>
                    <input type="text"  placeholder="" onChange={handleChange('second_mobile')} defaultValue={values.second_mobile} 
                        className="px-3 my-1 border-2 rounded-lg  border-violet-200" />
                    <p>This is a required field</p>
                  </div>
                </div>
              <button type="button" className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 mr-2 rounded-md"  onClick={ Previous } >Previous</button>
              <button type="button" className="bg-[#6F42A2] hover:bg-violet-400 text-white font-bold py-2 px-4 ml-[110px] rounded-md" onClick={ Continue } >Save and Continue</button>
          </form>
      </div>
      </div>
    </>

  )
}

export default ContactDetails
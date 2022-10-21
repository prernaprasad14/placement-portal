const PCInfo=({index, handleChange, data, formData, course, setFormData})=>{
    
    return (
    <>
        {<p className='bg-rose-200'>index:{index}</p>}
        <div className='bg-lime-100 border-slate-100 rounded-md border-2 mx-8 my-2 p-3 flex flex-col justify-center flex-unwrap sm:flex-wrap '>
            <p >{Object.entries(data).map(data=><p className='bg-sky-300 flex-unwrap sm:flex-wrap'>{data}</p>)}</p>
            <div className='form-group'>
                <input onChange={(e)=>handleChange(index, e)} 
                    defaultValue={Object.entries(data).pcname} 
                    type='text' 
                    name='pcname'  
                    placeholder='Name'
                    className='border-slate-200 border-2 rounded-md p-2 m-1'/>
            </div>
            <div className='form-group'>
                <input onChange={(e)=>handleChange(index, e)} 
                    defaultValue={Object.entries(data).email} 
                    type='email'
                    name='email' 
                    placeholder='Email'
                    className='border-slate-200 border-2 rounded-md p-2 m-1' />
            </div>
            <div className='form-group'>
                <input onChange={(e)=>handleChange(index, e)} 
                    defaultValue={Object.entries(data).contact} 
                    type='text' 
                    name='contact'
                    placeholder='Phone no.'
                    className='border-slate-200 border-2 rounded-md p-2 m-1'/>
            </div>
            <div className='form-group'>
                <select  className='h-10 w-72 m-1 px-2  rounded-[5px] border-2 border-slate-200 text-slate-600'
                    name='course' defaultValue={Object.entries(data).course} onChange={(e)=>handleChange(index,e)}>
                    <option >Master of Computer Applications</option>
                    <option >Master of Computer Science</option>
                </select>
            </div>
        </div>
        
    </>)
}
export default PCInfo
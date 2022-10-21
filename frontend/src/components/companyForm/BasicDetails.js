import {useNavigate,useLocation} from 'react-router-dom';
import React, { useEffect ,useState} from 'react';
import validator from 'validator';


const BasicDetails = ({ isValid, nextStep, handleChange, values }) => {

    const [error, setError] = useState({
        emptyField:false,
        invalidFormat:false
    });

    const Continue = async(e) =>{

        e.preventDefault()
        if(validator.isEmpty(values.website)|| validator.isEmpty(values.cname)||validator.isEmpty(values.phone)){
            setError(prevState => ({
                emptyField: {
                    ...prevState.error,
                    emptyField: true 
                }
            }))
        }else if(!isValid.website|| !isValid.cname || !isValid.phone){       
          setError(prevState => ({
            invalidFormat: {           
                ...prevState.error,    
                invalidFormat: true     
            }
            }))
        }
        else{
            nextStep()
        }
       
    }

    useEffect(()=>{
        window.scrollTo(0,0)
        
        
    },[])

    return(    
        <>
        <div className='form-head text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
            <div className='text-bold'>
            <h1 className='flex justify-center sm:justify-start my-2 p-3 text-md font-semibold text-white rounded-md'>Step 1/7 : Company Details</h1>
            <form form className='px-36 py-8 drop-shadow-[0_0_3px_rgba(0,0,0,0.1)] bg-white rounded-lg ' >
                <p className='font-semibold'>Email - <span>{values.email}</span></p>
                <p>Fields marked as<span className='text-pink-600'>*</span> are mandatory to fill</p>
                    {/* <div className="form-group">
                        <label>Email</label>
                        <input type="text"  onChange={handleChange('email')} defaultValue={values.email}
                        className="px-3 my-2 border-2 rounded-md  border-violet-200" />
                    </div> */}
                   
                    <div className="form-group">
                        <label>Name of the company<span className='text-pink-600'>*</span></label>
                        <input type="text" onChange={handleChange('cname')} defaultValue={values.cname}
                            //  className="px-3 my-2 border-2 rounded-md  border-violet-200" />
                            className={isValid.cname===null ?'border-2 rounded-md border-violet-200': isValid.cname?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                            { isValid.cname===false && <p>Provide full name of the company</p>}
                      
                            </div>
                    <div className="form-group">
                        <label>Website<span className='text-pink-600'>*</span></label>
                        <input type="text"  onChange={handleChange('website')} defaultValue={values.website}
                             className={isValid.website===null ?'border-2 rounded-md border-violet-200': isValid.website?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                             { isValid.website===false && <p>Please provide a valid website url</p>}
                    </div>
                    <div className="form-group">
                        <label className="m-0 p-0">Phone number <span className='text-pink-600'>*</span></label>
                        <input type="text" placeholder="" min="0" max="9" onChange={handleChange('phone')} defaultValue={values.phone}
                           className={isValid.phone===null ?'border-2 rounded-md border-violet-200': isValid.phone?'border-2 rounded-md border-[#1BDA9C]':'border-2 rounded-md border-[#DB2777]' }/>
                           { isValid.phone===false && <p>Provide a 10-digit phone no.</p>}
                    </div>
                    <div>
                        {error.emptyField && <p name='emptyField' className='text-[#d03863] font-semibold'>Any of the above fields cannot be empty. Please fill them to proceed</p>} 
                        {error.invalidFormat && <p name='invalidFormat' className='text-[#d03863] font-semibold'>Please fill fields in the requied format before proceeding</p>}            
                    </div>
                    <div className='flex flex-row justify-center'>            
                        <button className='mx-3 my-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4  rounded-md' onClick={ Continue } type='submit' >Continue</button>
                    </div>    
                </form>
            </div>
        </div>  
        </>
    ) 
}

export default BasicDetails
// import {useNavigate,useLocation} from 'react-router-dom';
// import React, { useEffect ,useState} from 'react';
// import axios from '../../axiosConfig';
// import Loading from '../Loading';
// import queryString from 'query-string'



// const BasicDetails = ({ isValid, nextStep, handleChange, values }) => {



//     const location = useLocation();
//     const [error, setError] = useState(false);
//     const navigate = useNavigate(); 
//     const [isLoading,setIsLoading]= useState(true)
//     const [request,setRequest]= useState(false)
//     const [isCompanyRegistered,setIsCompanyRegistered]= useState(true)
//     const Continue = async(e) =>{
        
//         e.preventDefault()
//         nextStep()
       
//     }

//     useEffect(()=>{
//         const {email} = queryString.parse(location.search)
//         if(!email){
//             setRequest(true)
//         }
//         else{
//             axios.get(`api/company/is-company-registered?email=${email}`)
//         .then(res=>{
//             if(res.status === 200){
//                 setIsCompanyRegistered(true)
//                 setIsLoading(false)
//             }
//         })
//         .catch(err=>{   
//             console.log(err)
//             setIsCompanyRegistered(false)
//             setIsLoading(false)
//         })
//         }
        
//     },[])


//     if(request){
//         return(<>
//             <div className='text-bold box-border flex justify-center bg-slate-100  h-auto p-8'>
//                 <h1 className='text-base fond-bold bg-white drop-shadow-sm mt-2 mb-32 py-3 min-h-[120px] flex  justify-center items-center px-32 rounded'>Looks like you've followed a broken link. To know more please contact your Administrator.</h1>
//             </div>
    
//            </>)
//     }
//     if(isLoading){

//         return(<><Loading message={'Just a moment, verifying email'}/></>)
//     }

//     if(isCompanyRegistered){
//        return(<>
//             <div className='text-bold box-border flex justify-center bg-gray-100  h-auto p-8'>
//                     <h1 className='text-lg fond-bold bg-white drop-shadow-sm mt-2 mb-32 py-3 px-32 rounded'>You have already registered</h1>
//             </div>
    
//            </>)
//     }

//     return(    
//         <>
//         <div className='form-head text-bold box-border flex justify-center bg-slate-100 h-auto p-8'>
//             <div className='text-bold'>
//             <h1 className='flex justify-center sm:justify-start my-2 p-3 text-md font-semibold text-white rounded-md'>Step 1/6 : Company Details</h1>
//             <form form className='px-36 py-8 drop-shadow-[0_0_3px_rgba(0,0,0,0.1)] bg-white rounded-lg ' >
//                 <p className='font-semibold'>Email - <span>{values.email}</span></p>
//                 <p>Fields marked as<span className='text-pink-600'>*</span> are mandatory to fill</p>
//                     {/* <div className="form-group">
//                         <label>Email</label>
//                         <input type="text"  onChange={handleChange('email')} defaultValue={values.email}
//                         className="px-3 my-2 border-2 rounded-md  border-violet-200" />
//                     </div> */}
                   
                       

//                     <div className="form-group">
//                         <label>Name of the company<span className='text-pink-600'>*</span></label>
//                         <input type="text" onChange={handleChange('cname')} defaultValue={values.cname}
//                              className="px-3 my-2 border-2 rounded-md  border-violet-200" />
//                     </div>
//                     <div className="form-group">
//                         <label>Website<span className='text-pink-600'>*</span></label>
//                         <input type="text"  onChange={handleChange('website')} defaultValue={values.website}
//                              className="px-3 my-2 border-2 rounded-md  border-violet-200" />
//                     </div>
//                     <div className="form-group">
//                         <label className="m-0 p-0">Phone number <span className='text-pink-600'>*</span></label>
//                         <input type="text" placeholder="" min="0" max="9" onChange={handleChange('phone')} defaultValue={values.phone}
//                             className="px-3 my-2 border-2 rounded-md  border-violet-200" />
//                     </div>
//                     <div className='flex flex-row justify-center'>            
//                 <button className='mx-3 my-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4  rounded-md' onClick={ Continue } type='submit' >Continue</button>
//           </div>                    <p>{error && <span> The following fields cannot be empty. Please fill them to proceed</span>}</p>
//                 </form>
//             </div>
//         </div>  
//         </>
//     ) 
// }

// export default BasicDetails

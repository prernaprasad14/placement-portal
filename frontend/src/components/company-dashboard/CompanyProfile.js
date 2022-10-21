import {useNavigate} from 'react-router';
import { useState, useEffect, useContext } from 'react'
import axios from '../../axiosConfig'
import Loading from '../Loading';
import { UserContext } from '../../App';
import { HiUserCircle } from 'react-icons/hi';
import { getParsedDate } from '../../helpers/getParsedDate';

const CompanyProfile=()=>{
    
    document.title='Profile | DUCS Placement Portal'
    console.log('inside CompanyProfile')
    const {state, dispatch}= useContext(UserContext)
    const navigate = useNavigate();

    console.log('1here')
    const [data, setData]= useState('')
    const [isLoading, setIsLoading]= useState(true)
    const [isLoggedIn , setIsLoggedIn] = useState(false)

    const getCompany=()=>{
        console.log('here here')
        axios(`api/company/profile`)
        .then((res)=>{
            console.log(res)
            const company = res.data.company;
           console.log(company);
            setData(company);
            setIsLoading(false)
          }).catch(error=> {
              console.log('Error getCompany : '+error)
              if(error.response.status=='401'){
                dispatch({type:'USER', role:'USER'})
                navigate('/login')
              }
              if(error.response.status=='403'){
                dispatch({type:'LOGGEDIN', role:state})
                navigate('/forbidden')
                
              }
            }) 
    }
    useEffect(()=>{
        window.scrollTo(0, 0)
        console.log('inside use effect')
        getCompany()
    },[]);
 
    if(isLoading){
        return(
            <>
                <Loading message={`Fetching Data`}/>
            </>)
      }
         
        return(<>
        
        <div className='company-profile profile w-90% rounded bg-white m-3 '>
        <div className='flex space-between my-3'>
            <div className='mx-12  w-4/6'><p className='text-lg font-semibold'><HiUserCircle className='mb-1 font-bold text-3xl inline-block'/>&nbsp;Profile</p>
            </div>
        </div>
                {/* <h1 className='rounded-full border-[5px] border-slate-600 bg-white px-[35px] py-[26px] my-1 font-bold text-3xl'>{data.username.slice(0,1).toUpperCase()}</h1>
                <span className='font-weight-bold'>{data.username}</span>
                </div>
            </div> */}
        <div  className='h-auto flex flex-nowrap flex-col text-sm lg:text-base lg:flex-wrap items-start rounded-md mx-8  text-gray-500'>
                    <div className='p-2 '>
                    <p className='text-black-50'>Email: {data.email}</p>
                        <div className='row mt-2 py-2 text-sm lg:text-base md:ml-8 '>
                            <div className='my-1'><label className='font-normal '>Name -</label><p className='inline-block px-1'>{data.cname}</p></div>
                            <div className='my-1'><label className='font-normal'>Website -</label>
                            <p className="inline-block px-1"><a href={data.website} target="_blank" className="cursor-pointer underline-offset-2 underline hover:text-indigo-600">
                               {data.website}
                            </a></p></div>
                            <div className='my-1'><label className='font-normal'>Contact no. -</label><p className='inline-block px-1' >{data.phone}</p></div>
                        </div>
                        <div className='row mt-4 py-2  text-sm lg:text-base md:ml-8'>
                            <h2 className=' font-semibold mb-2 text-2xl border-b-2'>Contact Details</h2>
 
                            <div  className=' scrollbar flex-col flex-wrap overflow-x-scroll items-start py-4 w-[20px] text-gray-600'>
                                <table id="company-contact-details"> 
                                    <thead>
                                        <tr className='border-b-2 border-slate-100'>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='hover:bg-slate-200'>
                                            <td className='font-bold pr-3 py-2'>HR</td>
                                            <td>{data.head_name}</td>
                                            <td>{data.head_email}</td>
                                            <td>{data.head_mobile}</td>
                                        </tr>
                                        <tr className='hover:bg-slate-200'>
                                            <td className='font-bold pr-3 py-2'>Second Contact person</td>
                                            <td>{data.second_name}</td>
                                            <td>{data.second_email}</td>
                                            <td>{data.second_mobile}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='row mt-4 py-2 text-sm lg:text-base md:ml-8'>
                            <h2 className='font-semibold text-2xl border-b-2'>Job Description</h2>
                            <div className='col-md-12 my-1'><label className='font-normal'>Job profile</label><p className=' px-1'>{data.job_profile}</p></div>
                            <div className='col-md-12 my-1'><label className='font-normal'>Designation</label><p className=' px-1'>{data.designation}</p></div>
                            <div className='col-md-12 my-1'><label className='font-normal'>Job description</label><p className=' px-1'>{data.job_desc}</p></div>          
                            <div className='col-md-8 my-1'><label className='font-normal'>Place of posting</label><p className=' px-1'>{data.place_of_posting}</p></div>          
                            </div>
                        <div className='row mt-1 py-2 text-sm lg:text-base md:ml-8'>
                            <h2 className='font-semibold my-2 text-2xl border-b-2'>Selection Details</h2>
                            <div className='col-md-4 my-1'><label className='font-normal'>Recruitment type: </label><p className='inline-block px-1'>{data.recruitment_type}</p></div> 
                            <div className='col-md-12 my-1'><label className='font-normal'>Courses allowed : </label><p className='inline-block px-1'>{data.courses_allowed}</p></div>  
                            <div className='col-md-12 my-1'><label className='font-normal'>Aptitude test : </label><p className='inline-block px-1'>{data.aptitude_test}</p></div>  
                            <div className='col-md-12 my-1'><label className='font-normal'>Coding round : </label><p className='inline-block px-1'>{data.coding_test}</p></div>          
                            <div className='col-md-12 my-1'><label className='font-normal'>Interview : </label><p className='inline-block px-1'>{data.interview}</p></div>            
                        
                        </div>
                        <div className='row mt-1 py-2 text-sm lg:text-base md:ml-8'>
                            <h2 className='font-semibold my-2 text-2xl border-b-2'>Salary Details</h2>
                            <div className='col-md-12 my-1'><label className='font-normal'>Annual Package</label><p className='px-1'>{data.annual_package}</p></div>
                            <div className='col-md-12 my-1'><label className='font-normal'>Breakage of CTC</label><p className='px-1'>{data.annual_package}</p></div>                        
                        </div>
        
                        <div className='row mt-4 py-2 text-sm lg:text-base md:ml-8'>
                            <h2 className='font-semibold text-2xl border-b-2'>Timeline</h2>
                            <div className='col-md-12 my-1'><label className='font-normal'>Pre-placement talk&#40;PPT&#41;</label><p className='px-1'>{getParsedDate(data.pre_placement_talk)}</p></div>          
                            <div className='col-md-12 my-1'><label className='font-normal'>Coding round</label><p className='px-1'>{getParsedDate(data.coding_test_date)}</p></div>          
                            <div className='col-md-12 my-1'><label className='font-normal'>Interview</label><p className='px-1'>{getParsedDate(data.interview_date)}</p></div>          
                            <div className='col-md-12 my-1'><label className='font-normal'>Notes</label><p className='px-1'>{data.notes}</p></div>                                  </div>
                        
                </div>
            </div>
        </div>

        </>)
        

}
export default CompanyProfile
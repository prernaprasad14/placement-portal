import { useNavigate } from 'react-router';
import { useState, useEffect, useContext } from 'react'
import axios from '../../../axiosConfig'
import Loading from '../../Loading';
import { UserContext } from '../../../App';
import { HiUserCircle } from 'react-icons/hi';

const ScholarProfile=() => {

    document.title='Profile | DUCS Placement Portal'
    const {state, dispatch}= useContext(UserContext)
    const navigate = useNavigate();
    const [data, setData]= useState('')
    const [isLoading, setIsLoading]= useState(true)
    // const [username , setUsername] = useState('')
    // const [isLoggedIn , setIsLoggedIn] = useState(false)
    const [placementdetails, setPlacementDetails] = useState('')

    const getScholar=() => {

        console.log('Inside getScholar')
        axios.get(`api/scholar/profile`)
        .then((res) => {
            console.log(res.data.scholar.placementDetails)
            console.log(res.data.scholar.placementdetails)
            const scholar = res.data.scholar;
            setData(scholar);
            setPlacementDetails(scholar.placementDetails)
            setIsLoading(false)
          }).catch(error=> {
              console.log('Error getScholar : '+error)
              console.log(error.response.status)
              if(error.response.status==='401'){
                dispatch({type:'USER', role:'USER'})
                navigate('/login')
              }
              if(error.response.status==='403'){
                dispatch({type:'USER', role:state})
                navigate('/forbidden')   
              }
            }) 

    }
    useEffect(() => {
        window.scrollTo(0, 0)
        console.log('Inside ScholarProfile')
        getScholar()
        setIsLoading(false)    
    },[]);    
   
    if(isLoading){
        return <Loading message={'Just a moment'}/>
    }

    return(<>
    
        <div className='profile w-90% rounded bg-white m-3 '>
            <div className='flex space-between my-3'>
                <div className='mx-12  w-4/6'><p className='text-lg font-semibold mb-2'>
                    <HiUserCircle className='mb-1 font-bold text-3xl inline-block'/>&nbsp;Profile</p>
                </div>
            </div>
            <div className='row mx-4 '>
                    <p className='text-black-50 '>Username&nbsp;-&nbsp;{data.username}</p>
                    <p className='text-black-50'>Email&nbsp;-&nbsp;{data.email}</p>
                <div className='p-3 pb-5 '>
                <div className='row  mt-4 py-2 sm:ml-8'>
                        <h3 className='font-semibold mb-2'>Personal Details</h3>
                        <div className='mt-2 col-md-6'><label className='font-normal'>First name</label><p className='border-2 p-1 rounded-md'>{data.fname}</p></div>
                        <div className='mt-2 col-md-6'><label className='font-normal'>Last name</label><p className='border-2 p-1 rounded-md'>{data.lname}</p></div>
                        <div className='mt-2 col-md-6'><label className='font-normal'>Mobile no.</label><p className='border-2 p-1 rounded-md' >{data.phone}</p></div>
                        <div className='mt-2 col-md-6'><label className='font-normal'>Alternative phone no.</label><p className='border-2 p-1 rounded-md' >{data.alternative_phone}</p></div>
                    </div>
                    <div className='row mt-4 py-2 sm:ml-8'>
                        <h4 className=' font-semibold mb-2 '>Permanent Address</h4>
                        <div className='mt-2 col-md-12'><label className='font-normal'>Address Line 1</label><p className='border-2 p-1 rounded-md'>{data.perma_addr1}</p></div>
                        <div className='mt-2 col-md-12'><label className='font-normal'>Address Line 2</label><p className='border-2 p-1 rounded-md'>{data.perma_addr2}</p></div>
                        <div className='mt-2 col-md-4'><label className='font-normal'>City</label><p className='border-2 p-1 rounded-md'>{data.perma_city}</p></div>
                        <div className='mt-2 col-md-4'><label className='font-normal'>State</label><p className='border-2 p-1 rounded-md'>{data.perma_state}</p></div>
                        <div className='mt-2 col-md-4'><label className='font-normal'>PIN</label><p className='border-2 p-1 rounded-md'>{data.perma_pin}</p></div>
                    </div>
                    <div className='row mt-4 py-2 sm:ml-8'>
                        <h4 className='font-semibold mb-2 '>Correspondance Address</h4>
                        <div className='mt-2 col-md-12'><label className='font-normal'>Address Line 1</label><p className='border-2 p-1 rounded-md'>{data.corr_addr1}</p></div>
                        <div className='mt-2 col-md-12'><label className='font-normal'>Address Line 2</label><p className='border-2 p-1 rounded-md'>{data.corr_addr2}</p></div>
                        <div className='mt-2 col-md-4'><label className='font-normal'>City</label><p className='border-2 p-1 rounded-md'>{data.corr_city}</p></div>          
                        <div className='mt-2 col-md-4'><label className='font-normal'>State</label><p className='border-2 p-1 rounded-md'>{data.corr_state}</p></div>          
                        <div className='mt-2 col-md-4'><label className='font-normal'>PIN</label><p className='border-2 p-1 rounded-md'>{data.corr_pin}</p></div>               
                    </div>
                    <div className='row mt-4 sm:ml-8'>
                        <h3 className='font-semibold mb-2 '>PostGraduation Details</h3>
                        <div className='mt-2 col-md-12'><label className='font-normal'>Course</label><p className='border-2 p-1 rounded-md'>{data.pg_course}</p></div>
                        <div className='mt-2 col-md-4'><label className='font-normal'>Class roll no.</label><p className='border-2 p-1 rounded-md'>{data.pg_class_roll}</p></div>          
                        <div className='mt-2 col-md-4'><label className='font-normal'>Exam roll no.</label><p className='border-2 p-1 rounded-md'>{data.pg_exam_roll}</p></div>
                        <div className='mt-2 col-md-4'><label className='font-normal'>Backlogs</label><p className='border-2 p-1 rounded-md'>{data.pg_backlogs}</p></div>          
                        <div className='mt-2 col-md-4'><label className='font-normal'>Backlog details</label><p className='border-2 p-1 rounded-md'>{data.pg_backlog_details}</p></div>               
                    </div>
                    <div className='row mt-4 py-2 sm:ml-8'>
                        <h3 className='font-semibold mb-2 '>Graduation Details</h3>
                        <div className='mt-2 col-md-6'><label className='font-normal'>Course</label><p className='border-2 p-1 rounded-md'>{data.grad_course}</p></div>
                        <div className='mt-2 col-md-6'><label className='font-normal'>Roll no.</label><p className='border-2 p-1 rounded-md'>{data.grad_roll_no}</p></div>          
                        <div className='mt-2 col-md-12'><label className='font-normal'>College</label><p className='border-2 p-1 rounded-md'>{data.grad_college}</p></div>
                        <div className='mt-2 col-md-12'><label className='font-normal'>University</label><p className='border-2 p-1 rounded-md'>{data.grad_university}</p></div>
                        <div className='mt-2 col-md-3'><label className='font-normal'>Marks obtained</label><p className='border-2 p-1 rounded-md'>{data.grad_marks_obtained}</p></div>          
                        <div className='mt-2 col-md-3'><label className='font-normal'>Maximum marks</label><p className='border-2 p-1 rounded-md'>{data.grad_max_marks}</p></div>          
                        <div className='mt-2 col-md-3'><label className='font-normal'>Percentage</label><p className='border-2 p-1 rounded-md'>{data.grad_aggr_percentage}</p></div>          
                        <div className='mt-2 col-md-3'><label className='font-normal'>Year of passing</label><p className='border-2 p-1 rounded-md'>{data.grad_year_of_passing}</p></div>               
                    </div>
                    <div className='row mt-4 py-2 sm:ml-8'>
                        <h3 className='font-semibold mb-2 '>Highschool Details(10th)</h3>
                        <div className='mt-2 col-md-6'><label className='font-normal'>Board</label><p className='border-2 p-1 rounded-md'>{data.high_board}</p></div>
                        <div className='mt-2 col-md-6'><label className='font-normal'>Roll no.</label><p className='border-2 p-1 rounded-md'>{data.high_roll_no}</p></div>          
                        <div className='mt-2 col-md-3'><label className='font-normal'>Marks obtained</label><p className='border-2 p-1 rounded-md'>{data.high_marks_obtained}</p></div>          
                        <div className='mt-2 col-md-3'><label className='font-normal'>Maximum marks</label><p className='border-2 p-1 rounded-md'>{data.high_max_marks}</p></div>          
                        <div className='mt-2 col-md-3'><label className='font-normal'>Percentage</label><p className='border-2 p-1 rounded-md'>{data.high_aggr_percentage}</p></div>          
                        <div className='mt-2 col-md-3'><label className='font-normal'>Year of passing</label><p className='border-2 p-1 rounded-md'>{data.high_year_of_passing}</p></div>               
                    </div>
                    <div className='row mt-4 py-2 sm:ml-8'>
                        <h3 className='font-semibold mb-2 '>Intermediate Details(10+2 or equivalent)</h3>
                        <div className='mt-2 col-md-6'><label className='font-normal'>Board</label><p className='border-2 p-1 rounded-md'>{data.inter_board}</p></div>
                        <div className='mt-2 col-md-6'><label className='font-normal'>Roll no.</label><p className='border-2 p-1 rounded-md'>{data.inter_roll_no}</p></div>          
                        <div className='mt-2 col-md-3'><label className='font-normal'>Marks obtained</label><p className='border-2 p-1 rounded-md'>{data.inter_marks_obtained}</p></div>          
                        <div className='mt-2 col-md-3'><label className='font-normal'>Maximum marks</label><p className='border-2 p-1 rounded-md'>{data.inter_max_marks}</p></div>          
                        <div className='mt-2 col-md-3'><label className='font-normal'>Percentage</label><p className='border-2 p-1 rounded-md'>{data.inter_aggr_percentage}</p></div>          
                        <div className='mt-2 col-md-3'><label className='font-normal'>Year of passing</label><p className='border-2 p-1 rounded-md'>{data.inter_year_of_passing}</p></div>               
                    </div>
                    
                    <div className='row mt-4 sm:ml-8'>
                        <h3 className='font-semibold mb-2'>Placement Details</h3>
                        <div className='col-md-6'><label className='font-normal'>Company</label><p className='border-2 p-1 rounded-md'>{placementdetails.company}</p></div>
                        <div className='col-md-6'><label className='font-normal'>Annual package</label><p className='border-2 p-1 rounded-md'>{placementdetails.annual_package===0? 'NA' : ` ${placementdetails.annual_package}`}</p></div>          
                        <div className='col-md-6'><label className='font-normal'>Place of posting</label><p className='border-2 p-1 rounded-md'>{placementdetails.place_of_posting}</p></div>          
                        <div className='col-md-6'><label className='font-normal'>Job profile</label><p className='border-2 p-1 rounded-md'>{placementdetails.job_profile}</p></div>              
                    </div> 
                    
                </div>
            </div>
        </div>
    </>)

}

export default ScholarProfile
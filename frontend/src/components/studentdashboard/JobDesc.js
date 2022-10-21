import { useParams ,useNavigate} from "react-router";
import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import axios from "../../axiosConfig"
import Loading from "../Loading";
import { UserContext } from "../../App";
import { getParsedDate } from "../../helpers/getParsedDate";

const JobDesc=()=>{

    
    const {state, dispatch}= useContext(UserContext)
    const navigate = useNavigate();
    const {username} = useParams();
    const [data, setData]= useState('')
    const [isLoading, setIsLoading]= useState(true)
    
    document.title=`${username}-Job description | DUCS Placement Portal`
    const getJobDesc=()=>{
        console.log("here here")
        axios.get(`api/company/job-desc/${username}`)
        .then((res)=>{
            console.log(res)
            const company = res.data.company;
           console.log(res.data.role);
            setData(company);
            dispatch({type:"LOGGEDIN", role:res.data.role})
            setIsLoading(false)
  
          }).catch(error=> {
              console.log("Error getCompany : "+error)
              if(error.response.status=='401'){
                dispatch({type:"USER",  role:"USER"})
                navigate('/login')
              }
              if(error.response.status=='403'){
                dispatch({type:"LOGGEDIN", role:state})
                navigate('/forbidden')
              }
              if(error.response.status=='404'){
                dispatch({type:"LOGGEDIN", role:state})
                navigate('/404-not-found')
              }
            }) 
    }

    useEffect(()=>{
        window.scrollTo(0, 0)
        getJobDesc()
    },[]);

    if(isLoading){
        return(
        <>
            <Loading message={`Fetching Data`}/>
        </>)
    }

    return(<>
    <div className="profile w-90%  bg-slate-100 py-5 text-slate-500">
        <div className="mx-1 row" >
            <div className="col-md-3">
                <div className="d-flex flex-column align-items-center text-center mx-3" >
                    <Link to="/dashboard" className="font-semibold hover:bg-purple-400 text-white bg-violet-600 mb-4 lg:my-0 text-sm sm:text-base px-3 py-1 rounded-md ">Back to dashboard</Link>
                </div>
            </div>
            <div className="bg-white col-md-7 rounded-lg ">
                <div className="row p-2 bg-[#a779e4] items-center rounded-t-lg text-white border-b-4 border-slate-200">
                   <h4 className="font-semibold text-3xl col-xs-6 col-sm-12 ">{data.username}</h4>
                </div>
                <div className="px-5 py-3">
                <div className="row py-2 sm:ml-8 "> 
                        <div className="col-md-12"><label className="font-normal text-2xl">Compnay name :</label>
                            <p className="inline-block pl-2 py-1 rounded-md">
                                {data.cname}
                               
                            </p>
                        </div>
                        <div className="col-md-12"><label className="font-normal text-2xl">Website :</label>
                            <p className="inline-block pl-2 py-1 rounded-md">
                                <a href={data.website} target="_blank" className="cursor-pointer underline-offset-2 underline hover:text-indigo-600">
                                {data.website}
                                </a>
                            </p>
                        </div>
                        
                           
                        {state ==='admin' &&     
                            <><div className="col-md-12">
                                <label className="font-normal">Email :</label>
                                <p className="inline-block pl-2 py-1 rounded-md">{data.email}</p>
                            </div>
                            <div className="col-md-12">
                                <label className="font-normal">Contact no. :</label>
                                <p className="inline-block pl-2 py-1 rounded-md">{data.phone}</p>
                            </div></>
                        }
                    </div>
                    {state ==='admin' && <div className="row mt-4 py-2  text-sm lg:text-base lg:ml-8">
                    <h2 className=' font-semibold mb-2'>Contact Details</h2>
                        <div  className=' scrollbar flex-col flex-wrap overflow-x-scroll items-start rounded-md py-4 w-[20px] text-gray-600'>
                            <table id="jd-company-contact-details"> 
                                <thead>
                                    <tr className='border-b-2  border-slate-100'>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='hover:bg-slate-200'>
                                        <td className='font-bold pr-5 py-2'>HR</td>
                                        <td className="pr-12 py-2'">{data.head_name}</td>
                                        <td className="pr-12 py-2'">{data.head_email}</td>
                                        <td className="pr-12 py-2'">{data.head_mobile}</td>
                                    </tr>
                                    <tr className='hover:bg-slate-200'>
                                        <td className='font-bold pr-5 py-2'>Second Contact person</td>
                                        <td className="pr-12 py-2'">{data.second_name}</td>
                                        <td className="pr-12 py-2'">{data.second_email}</td>
                                        <td className="pr-12 py-2'">{data.second_mobile}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                            {/* <div className="row border-2 rounded-md m-1 p-2">
                            <h4 className=" pt-2 font-semibold">HR</h4>
                            <div className="col-md-4"><label className="font-normal">Name</label><p className=" p-1 rounded-md">{data.head_name}</p></div>
                            <div className="col-md-4"><label className="font-normal">Email</label><p className=" p-1 rounded-md">{data.head_email}</p></div>
                            <div className="col-md-4"><label className="font-normal">Contact no.</label><p className=" p-1 rounded-md">{data.head_mobile}</p></div>
                        </div>
                        <div className="row border-2 rounded-md m-1 p-2">
                            <h4 className=" pt-2 font-semibold">Second contact person</h4>
                            <div className="col-md-4"><label className="font-normal">Name</label><p className=" p-1 rounded-md">{data.second_name}</p></div>
                            <div className="col-md-4"><label className="font-normal">Email</label><p className=" p-1 rounded-md">{data.second_email}</p></div>
                            <div className="col-md-4"><label className="font-normal">Contact no.</label><p className=" p-1 rounded-md">{data.second_mobile}</p></div>
                        </div> */}
                    </div>}
                    <div className="row mt-1 py-2 sm:ml-8">
                        <h2 className="font-semibold my-2 text-2xl border-b-2">Job Description</h2>
                        <div className="col-md-12"><label className="font-normal">Job profile: </label><p className=" inline-block p-1 rounded-md">{data.job_profile}</p></div>
                        <div className="col-md-12"><label className="font-normal">Designation: </label><p className=" inline-block p-1 rounded-md">{data.designation}</p></div>
                        <div className="col-md-12"><label className="font-normal">Job description</label><p className=" inline-block p-1 rounded-md">{data.job_desc}</p></div>          
                        <div className="col-md-12"><label className="font-normal">Place of posting: </label><p className=" inline-block p-1 rounded-md">{data.place_of_posting}</p></div>            
                    </div>
                    <div className="row mt-1 py-2 sm:ml-8 ">
                        <h2 className="font-semibold my-2 text-xl border-b-2">Selection Details</h2>
                        <div className="col-md-12"><label className="font-normal">Recruitment type : </label><p className="inline-block p-1 rounded-md">{data.recruitment_type}</p></div>  
                        <div className="col-md-12"><label className="font-normal">Aptitude test : </label><p className="inline-block p-1 rounded-md">{data.aptitude_test}</p></div>  
                        <div className="col-md-12"><label className="font-normal">Coding round: </label><p className="inline-block p-1 rounded-md">{data.coding_test}</p></div>          
                        <div className="col-md-12"><label className="font-normal">Interview : </label><p className="inline-block p-1 rounded-md">{data.interview}</p></div>          
                        <div className="col-md-12"><label className="font-normal">Courses allowed : </label><p className="inline-block p-1 rounded-md">{data.courses_allowed}</p></div>                 
                    </div>
                    <div className="row mt-1 py-2 sm:ml-8 ">
                        <h2 className="font-semibold my-2 text-xl border-b-2">Salary Details</h2>
                        <div className="col-md-12"><label className="font-normal">Annual package</label><p className=" p-1 rounded-md">{data.annual_package}</p></div>
                        <div className="col-md-12"><label className="font-normal">Breakage of CTC</label><p className=" p-1 rounded-md">{data.breakage_ctc}</p></div>                        
                    </div>
                    <div className="row mt-1 py-2 sm:ml-8 ">
                        <h2 className="font-semibold my-2 text-xl border-b-2">Timeline</h2>
                        <div className="col-md-12"><label className="font-normal">Pre-placement talk(PPT) :</label><p className=" inline-block p-1 rounded-md">{getParsedDate(data.pre_placement_talk)}</p></div>          
                        <div className="col-md-12"><label className="font-normal">Coding round :</label><p className=" inline-block p-1 rounded-md">{getParsedDate(data.coding_test_date)}</p></div>          
                        <div className="col-md-12"><label className="font-normal">Interview :</label><p className="inline-block  p-1 rounded-md">{getParsedDate(data.interview_date)}</p></div>          
                        <div className="col-md-12"><label className="font-normal">Notes :</label><p className=" inline-block p-1 rounded-md">{data.notes}</p></div>                                  
                    </div> 
                </div>
                
               
            
            </div>
            <div className="d-flex flex-column align-items-center text-center mx-3 mt-4" >
                    <Link to="/dashboard" className="font-semibold hover:bg-purple-400 text-white bg-violet-600  text-sm sm:text-base px-3 py-1 rounded-md ">Back to dashboard</Link>
            </div>
        </div>
    </div>
    </>)
        

}
export default JobDesc
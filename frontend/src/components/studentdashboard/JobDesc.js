import { useParams ,useNavigate} from "react-router";
import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import profilepic from '../../img/user.jpg';
import axios from "../../axiosConfig"
import Loading from "../Loading";
import { UserContext } from "../../App";

const JobDesc=()=>{
    
    console.log("inside JobDesc")
    const {state, dispatch}= useContext(UserContext)
    const navigate = useNavigate();
    const {username} = useParams();
    document.title=`${username}-Job description | DUCS Placement Portal`
    console.log("1here")
    const [data, setData]= useState('')
    const [isLoading, setIsLoading]= useState(true)
    const [isEditMode , setIsEditMode] = useState(false)
    const [isLoggedIn , setIsLoggedIn] = useState(false)
    const getJobDesc=()=>{
    //    setTimeout(()=>{
        console.log("here here")
        axios.get(`api/company/job-desc/${username}`)
        .then((res)=>{
            console.log(res)
            const company = res.data.company;
           console.log(company);
            setData(company);
            setIsLoading(false)
  
          }).catch(error=> {
              console.log("Error getCompany : "+error)
              if(error.response.status=='401'){
                dispatch({type:"USER",  role:"USER"})
                navigate('/login')
              }
              if(error.response.status=='403'){
                dispatch({type:"USER", role:state})
                navigate('/forbidden')
                
              }
            }) 
        // },90000) 
    }
    useEffect(()=>{
        // window.scrollTo(0, 0)
        console.log("inside use effect")
        console.log(state)
        getJobDesc()
    

    },[]);

    console.log("6 outside function")
    console.log("7 profile data Company({data})::"+JSON.stringify(data))

    if(isLoading){
        
     return(
        <>
            <Loading message={`Fetching Data`}/>
        </>)
    }
        return(<>
        
        <div className="profile w-90% rounded bg-slate-100 py-5">
            <div className="row" >
                <div className="col-md-3 my-3">
                    <div className="d-flex flex-column align-items-center text-center mx-3" >
                    <Link to="/dashboard" className="text-lg font-semibold hover:bg-purple-400 text-white bg-violet-600   px-3 py-1 rounded-md ">Back to dashboard</Link>
                    {/* <Link to="/ ">/Back</Link> */}
                    </div>
                </div>
                <div className="bg-white col-md-7 rounded-md ">
                    <div className="row p-2 bg-slate-800 items-center rounded-t-md text-white border-b-4 border-slate-200">
                            <img className="rounded-circle col-xs-6 col-md-1 col-lg-1" src={profilepic}/>
                            <h4 className="font-semibold text-3xl col-xs-6 col-md-2 col-lg-1 ">{data.username}</h4>
                    </div>
                    <div className="p-5">
                    <div className="row mt-2 py-2 sm:ml-8 ">
                            <h3 className="font-semibold my-2">Company Details</h3>
                            <div className="col-md-12"><label className="font-normal">Company Name</label><p className="border-2 p-1 rounded-md">{data.cname}</p></div>
                            <div className="col-md-12"><label className="font-normal">Website</label><p className="border-2 p-1 rounded-md">{data.website}</p></div>
                            {state ==='ADMIN' &&     
                                <div className="col-md-4"><label className="font-normal">Contact no.</label><p className="border-2 p-1 rounded-md">{data.second_mobile}</p></div>
                            }
                        </div>
                        {state ==='ADMIN' && <div className="row mt-4 py-2 sm:ml-8">
                            <h3 className=" font-semibold mb-2">Contact Details</h3>
                            <div className="row border-2 rounded-md m-1 p-2">
                                <h4 className=" pt-2 font-semibold">HR</h4>
                                <div className="col-md-4"><label className="font-normal">Name</label><p className="border-2 p-1 rounded-md">{data.head_name}</p></div>
                                <div className="col-md-4"><label className="font-normal">Email</label><p className="border-2 p-1 rounded-md">{data.head_email}</p></div>
                                <div className="col-md-4"><label className="font-normal">Contact no.</label><p className="border-2 p-1 rounded-md">{data.head_mobile}</p></div>
                            </div>
                            <div className="row border-2 rounded-md m-1 p-2">
                                <h4 className=" pt-2 font-semibold">Second contact person</h4>
                                <div className="col-md-4"><label className="font-normal">Name</label><p className="border-2 p-1 rounded-md">{data.second_name}</p></div>
                                <div className="col-md-4"><label className="font-normal">Email</label><p className="border-2 p-1 rounded-md">{data.second_email}</p></div>
                                <div className="col-md-4"><label className="font-normal">Contact no.</label><p className="border-2 p-1 rounded-md">{data.second_mobile}</p></div>
                            </div>
                        </div>}
                        <div className="row mt-4 py-2 sm:ml-8">
                            <h3 className="font-semibold my-2">Job Description</h3>
                                <div className="col-md-12"><label className="font-normal">Job profile</label><p className="border-2 p-1 rounded-md">{data.job_profile}</p></div>
                                <div className="col-md-12"><label className="font-normal">Designation</label><p className="border-2 p-1 rounded-md">{data.designation}</p></div>
                                <div className="col-md-12"><label className="font-normal">Job description</label><p className="border-2 p-1 rounded-md">{data.job_desc}</p></div>          
                                <div className="col-md-4"><label className="font-normal">Recruitment type</label><p className="border-2 p-1 rounded-md">{data.recruitment_type}</p></div>  
                                <div className="col-md-8"><label className="font-normal">Place of posting</label><p className="border-2 p-1 rounded-md">{data.place_of_posting}</p></div>          
                                 
                        </div>
                        <div className="row mt-4 py-2 sm:ml-8">
                            <h3 className="font-semibold my-2">Timeline</h3>
                            <div className="col-md-12"><label className="font-normal">Pre-placement talk(PPT)</label><p className="border-2 p-1 rounded-md">{data.pre_placement_talk}</p></div>          
                            <div className="col-md-12"><label className="font-normal">Coding test</label><p className="border-2 p-1 rounded-md">{data.coding_test_date}</p></div>          
                            <div className="col-md-12"><label className="font-normal">Interview</label><p className="border-2 p-1 rounded-md">{data.interview_date}</p></div>          
                            <div className="col-md-12"><label className="font-normal">Notes</label><p className="border-2 p-1 rounded-md">{data.notes}</p></div>                                  </div>
                        
                    </div>
                </div>
            </div>
        </div>

        </>)
        

}
export default JobDesc
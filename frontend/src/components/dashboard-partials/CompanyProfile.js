import { useParams ,useNavigate} from "react-router";
import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import profilepic from '../../img/user.jpg';
import axios from "../../axiosConfig"
import Loading from "../Loading";
import { UserContext } from "../../App";

const CompanyProfile=({data})=>{
    
    document.title='Profile | DUCS Placement Portal'
    console.log("inside CompanyProfile")
    const {state, dispatch}= useContext(UserContext)
    const navigate = useNavigate();
    const {id} = useParams();
    console.log("1here")
    const [company, setCompany]= useState('')
    const [isLoading, setIsLoading]= useState(true)
    const [username , setUsername] = useState('')
    const [isEditMode , setIsEditMode] = useState(false)
    const [isLoggedIn , setIsLoggedIn] = useState(false)
    // const [placementdetails, setPlacementDetails] = useState(data.placementdetails)
    // console.log(placementdetails)
    const getCompany=()=>{
    //    setTimeout(()=>{
        console.log("here here")
        axios(`api/company/profile/${username}`)
        .then((res)=>{
            console.log(res)
            const company = res.data.company;
           console.log(company);
            setCompany(company);
            setIsLoading(false)
            setUsername(company.username)
          }).catch(error=> {
              console.log("Error getCompany : "+error)
              if(error.response.status=='401'){
                dispatch({type:"USER",role:"COMPANY"})
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
        console.log(data)
        setIsLoading(true)
        if(data!=null){
            setIsLoading(false)
        }else{
            getCompany()
        }

    },[]);
    const edit=(event)=>{
        setIsEditMode(true)
    }
    
    console.log("6 outside function")
    console.log("7 profile data Company({data})::"+JSON.stringify(data))
    if(data!=null){
        console.log(data)
        return(<>
        
        <div className="profile w-90% rounded bg-white m-3 ">
            <div className="row">
                <div className="col-md-3 border-right">
                    <h4 className="font-semibold text-2xl mx-28 my-5">Profile</h4>
                    <div className="d-flex flex-column align-items-center text-center mx-3" >
                        <img className="rounded-circle " width="150px" src={profilepic}/>
                        <span className="font-weight-bold">{data.username}</span>
                        <span className="text-black-50">{data.email}</span>
                    </div>
                </div>
                <div className="col-md-7 border-right">
                    <div className="p-3 py-5 ">
                        <div className="row mt-2 py-2 sm:ml-8 ">
                            <h3 className="font-semibold">Company Details</h3>
                            <div className="col-md-12"><label className="font-normal">Company Name</label><p className="border-2 p-1 rounded-md">{data.cname}</p></div>
                            <div className="col-md-12"><label className="font-normal">Website</label><p className="border-2 p-1 rounded-md">{data.website}</p></div>
                            <div className="col-md-12"><label className="font-normal">Mobile no.</label><p className="border-2 p-1 rounded-md" >{data.phone}</p></div>
                        </div>
                        <div className="row mt-4 py-2 sm:ml-8">
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
                        </div>
                        <div className="row mt-4 py-2 sm:ml-8">
                            <h3 className="font-semibold">Job Description</h3>
                                <div className="col-md-12"><label className="font-normal">Job profile</label><p className="border-2 p-1 rounded-md">{data.job_profile}</p></div>
                                <div className="col-md-12"><label className="font-normal">Designation</label><p className="border-2 p-1 rounded-md">{data.designation}</p></div>
                                <div className="col-md-12"><label className="font-normal">Job description</label><p className="border-2 p-1 rounded-md">{data.job_desc}</p></div>          
                                <div className="col-md-4"><label className="font-normal">Recruitment type</label><p className="border-2 p-1 rounded-md">{data.recruitment_type}</p></div>  
                                <div className="col-md-8"><label className="font-normal">Place of posting</label><p className="border-2 p-1 rounded-md">{data.place_of_posting}</p></div>          
                                 
                        </div>
                        <div className="row mt-4 py-2 sm:ml-8">
                            <h3 className="font-semibold">Timeline</h3>
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
     return(
        <>
            <Loading message={`Fetching Data`}/>
        </>)
}
export default CompanyProfile
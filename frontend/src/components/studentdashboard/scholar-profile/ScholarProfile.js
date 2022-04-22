import { useParams ,useNavigate} from "react-router";
import { useState, useEffect, useContext } from "react"
import profilepic from '../../../img/user.jpg';
import {AiFillEdit} from 'react-icons/ai'
import axios from "../../../axiosConfig"
import PersonalDetails from "./PersonalDetails";
import PostGraduationDetails from "./PostGraduationDetails";
import GraduationDetails from "./GraduationDetails";
import IntermediateDetails from "./IntermediateDetails";
import HighSchoolDetails from "./HighSchoolDetails";
import Loading from "../../Loading";
import { UserContext } from "../../../App";

const ScholarProfile=({data})=>{

    document.title='Profile | DUCS Placement Portal'
    console.log("inside scholarProfile")
    const {state, dispatch}= useContext(UserContext)
    const navigate = useNavigate();
    const {id} = useParams();
    console.log("1here")
    const [scholar, setScholar]= useState('')
    const [isLoading, setIsLoading]= useState(true)
    const [username , setUsername] = useState('')
    const [isEditMode , setIsEditMode] = useState(false)
    const [isLoggedIn , setIsLoggedIn] = useState(false)

    const getScholar=()=>{
    //    setTimeout(()=>{
        console.log("here here")
        axios.get(`api/scholar/profile`)
        .then((res)=>{
            const scholar = res.data.scholar;
            setScholar(scholar);
            setIsLoading(false)
            setUsername(scholar.loginDetails.username)
          }).catch(error=> {
              console.log("Error getScholar : "+error)
              console.log(error.response.status)
              if(error.response.status=='401'){
                dispatch({type:"USER", payload:false})
                navigate('/login')
              }
              if(error.response.status=='403'){
                dispatch({type:"USER", payload:true})
                navigate('/forbidden')
                
              }
            }) 
        // },90000) 
    }
    useEffect(()=>{
        window.scrollTo(0, 0)
        console.log("inside use effect")
        if(data!=null){
            setIsLoading(false)
            // getScholar()
        }
    },[]);
    const edit=(event)=>{
        setIsEditMode(true)
    }
    const {fname, lname} = data.personalDetails
    const {perma_addr1, perma_addr2, perma_city, perma_state, perma_pin}= data.personalDetails.permanent_addr
    const {corr_addr1, corr_addr2, corr_city, corr_state, corr_pin}= data.personalDetails.correspondence_addr
    console.log("6 outside function")
    console.log("7 profile data scholar({data})::"+JSON.stringify(data))
    if(data!=''){
        return(<>
        
        <div className="w-90% rounded bg-white m-3 ">
            <div className="row">
                <div className="col-md-3 border-right">
                    <h4 className="font-semibold text-2xl mx-28 my-5">Profile</h4>
                    <div className="d-flex flex-column align-items-center text-center mx-3" >
                        <img className="rounded-circle " width="150px" src={profilepic}/>
                        <span className="font-weight-bold">{data.loginDetails.username}</span>
                        <span className="text-black-50">{data.loginDetails.email}</span>
                    </div>
                </div>
                <div className="col-md-6 border-right">
                    <div className="p-3 py-5 ">
                        <div className="row mt-2 sm:ml-8 border-l-[5px] border-purple-400 ">
                            <h2 className="text-lg">Personal Details</h2>
                            <div className="col-md-6"><label className="labels">First name</label><p className="form-control">{fname}</p></div>
                            <div className="col-md-6"><label className="labels">Last name</label><p className="form-control">{lname}</p></div>
                            <div className="col-md-6"><label className="labels">Mobile no.</label><p className="form-control" >{data.personalDetails.phone}</p></div>
                            <div className="col-md-6"><label className="labels">Alternative phone no.</label><p className="form-control" >{data.personalDetails.alternative_phone}</p></div>
                        </div>
                        <div className="row mt-5 sm:ml-8 border-l-[5px] border-purple-400">
                            <h3 className=" ">Permanent Address</h3>
                            <div className="col-md-12"><label className="labels">Address Line 1</label><p className="form-control">{perma_addr1}</p></div>
                            <div className="col-md-12"><label className="labels">Address Line 2</label><p className="form-control">{perma_addr2}</p></div>
                            <div className="col-md-4"><label className="labels">City</label><p className="form-control">{perma_city}</p></div>
                            <div className="col-md-4"><label className="labels">State</label><p className="form-control">{perma_state}</p></div>
                            <div className="col-md-4"><label className="labels">PIN</label><p className="form-control">{perma_pin}</p></div>
                        </div>
                        <div className="row mt-5 sm:ml-8 border-l-[5px] border-purple-400">
                            <h3 className=" mt-3">Correspondance Address</h3>
                            <div className="col-md-12"><label className="labels">Address Line 1</label><p className="form-control">{corr_addr1}</p></div>
                            <div className="col-md-12"><label className="labels">Address Line 2</label><p className="form-control">{corr_addr2}</p></div>
                            <div className="col-md-4"><label className="labels">City</label><p className="form-control">{corr_city}</p></div>          
                            <div className="col-md-4"><label className="labels">State</label><p className="form-control">{corr_state}</p></div>          
                            <div className="col-md-4"><label className="labels">PIN</label><p className="form-control">{corr_pin}</p></div>               
                        </div>
                        {/* <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Education</label><p className="form-control" placeholder="education" /></div>
                        </div> */}
                        {/* <div className="mt-5 text-center"><button className="bg-[#ac73ee] hover:bg-violet-400 text-white font-bold py-2 px-4 rounded-md profile-button" type="button">Save Profile</button></div> */}
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="p-2 py-5">
                        <div className="d-flex justify-content-between align-items-center experience">
                            <button className="bg-[#ac73ee] hover:bg-violet-400 text-white font-bold py-2 px-4 rounded-md" onClick={edit}>
                                <div>
                                    <h4 className="inline-block  text-sm text-right"><AiFillEdit className="inline-block"/>Edit</h4>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>)

    }
        return(
            < >
            {isLoading && 
                <Loading message={`Fetching Data`}/>
            }
            { scholar && 
                <div className="flex-col bg-lime-200">
                    <p>id :{id}</p>  
                    <div className="w-5/6 bg-slate-700 p-7">
                        
                        <div className="bg-rose-200">Profile <p>username :{username}</p>  </div>  
                        <PersonalDetails personal={scholar.personalDetails}/>
                        <PostGraduationDetails postgraduation={scholar.postGraduationDetails}/>
                        <GraduationDetails graduation={scholar.graduationDetails}/>
                        <IntermediateDetails intermediate={scholar.intermediateDetails}/>
                        <HighSchoolDetails highschool={scholar.highSchoolDetails}/>
                    </div>
                    
                </div>
            }

            </>
        )
    
    
}
export default ScholarProfile
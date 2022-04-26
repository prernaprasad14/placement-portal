import { useParams ,useNavigate} from "react-router";
import { useState, useEffect, useContext } from "react"
import profilepic from '../../../img/user.jpg';
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
    const [placementdetails, setPlacementDetails] = useState(data.placementdetails)
    console.log(placementdetails)
    const getScholar=()=>{
    //    setTimeout(()=>{
        console.log("here here")
        axios.get(`api/scholar/profile`)
        .then((res)=>{
            const scholar = res.data.scholar;
            setScholar(scholar);
            setIsLoading(false)
            setUsername(scholar.username)
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
        // window.scrollTo(0, 0)
        console.log("inside use effect")
        if(data!=null){
            setIsLoading(false)
            // getScholar()
        }
    },[]);
    const edit=(event)=>{
        setIsEditMode(true)
    }
    
    console.log("6 outside function")
    console.log("7 profile data scholar({data})::"+JSON.stringify(data))
    if(data!=''){
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
                            <h3 className="font-semibold text-lg">Personal Details</h3>
                            <div className="col-md-6"><label className="font-normal">First name</label><p className="border-2 p-1 rounded-md">{data.fname}</p></div>
                            <div className="col-md-6"><label className="font-normal">Last name</label><p className="border-2 p-1 rounded-md">{data.lname}</p></div>
                            <div className="col-md-6"><label className="font-normal">Mobile no.</label><p className="border-2 p-1 rounded-md" >{data.phone}</p></div>
                            <div className="col-md-6"><label className="font-normal">Alternative phone no.</label><p className="border-2 p-1 rounded-md" >{data.alternative_phone}</p></div>
                        </div>
                        <div className="row mt-4 py-2 sm:ml-8">
                            <h2 className=" font-semibold ">Permanent Address</h2>
                            <div className="col-md-12"><label className="font-normal">Address Line 1</label><p className="border-2 p-1 rounded-md">{data.perma_addr1}</p></div>
                            <div className="col-md-12"><label className="font-normal">Address Line 2</label><p className="border-2 p-1 rounded-md">{data.perma_addr2}</p></div>
                            <div className="col-md-4"><label className="font-normal">City</label><p className="border-2 p-1 rounded-md">{data.perma_city}</p></div>
                            <div className="col-md-4"><label className="font-normal">State</label><p className="border-2 p-1 rounded-md">{data.perma_state}</p></div>
                            <div className="col-md-4"><label className="font-normal">PIN</label><p className="border-2 p-1 rounded-md">{data.perma_pin}</p></div>
                        </div>
                        <div className="row mt-4 py-2 sm:ml-8">
                            <h2 className="font-semibold ">Correspondance Address</h2>
                            <div className="col-md-12"><label className="font-normal">Address Line 1</label><p className="border-2 p-1 rounded-md">{data.corr_addr1}</p></div>
                            <div className="col-md-12"><label className="font-normal">Address Line 2</label><p className="border-2 p-1 rounded-md">{data.corr_addr2}</p></div>
                            <div className="col-md-4"><label className="font-normal">City</label><p className="border-2 p-1 rounded-md">{data.corr_city}</p></div>          
                            <div className="col-md-4"><label className="font-normal">State</label><p className="border-2 p-1 rounded-md">{data.corr_state}</p></div>          
                            <div className="col-md-4"><label className="font-normal">PIN</label><p className="border-2 p-1 rounded-md">{data.corr_pin}</p></div>               
                        </div>
                        <div className="row mt-4 sm:ml-8">
                            <h3 className="font-semibold ">PostGraduation Details</h3>
                            <div className="col-md-12"><label className="font-normal">Course</label><p className="border-2 p-1 rounded-md">{data.pg_course}</p></div>
                            <div className="col-md-4"><label className="font-normal">Class roll no.</label><p className="border-2 p-1 rounded-md">{data.pg_class_roll}</p></div>          
                            <div className="col-md-4"><label className="font-normal">Exam roll no.</label><p className="border-2 p-1 rounded-md">{data.pg_exam_roll}</p></div>
                            <div className="col-md-4"><label className="font-normal">Backlogs</label><p className="border-2 p-1 rounded-md">{data.pg_backlogs}</p></div>          
                            <div className="col-md-4"><label className="font-normal">Backlog details</label><p className="border-2 p-1 rounded-md">{data.pg_backlog_details}</p></div>               
                        </div>
                        <div className="row mt-4 py-2 sm:ml-8">
                            <h3 className="font-semibold ">Graduation Details</h3>
                            <div className="col-md-6"><label className="font-normal">Course</label><p className="border-2 p-1 rounded-md">{data.grad_course}</p></div>
                            <div className="col-md-6"><label className="font-normal">Roll no.</label><p className="border-2 p-1 rounded-md">{data.grad_roll_no}</p></div>          
                            <div className="col-md-12"><label className="font-normal">College</label><p className="border-2 p-1 rounded-md">{data.grad_college}</p></div>
                            <div className="col-md-12"><label className="font-normal">University</label><p className="border-2 p-1 rounded-md">{data.grad_university}</p></div>
                            <div className="col-md-3"><label className="font-normal">Marks obtained</label><p className="border-2 p-1 rounded-md">{data.grad_marks_obtained}</p></div>          
                            <div className="col-md-3"><label className="font-normal">Maximum marks</label><p className="border-2 p-1 rounded-md">{data.grad_max_marks}</p></div>          
                            <div className="col-md-3"><label className="font-normal">Percentage</label><p className="border-2 p-1 rounded-md">{data.grad_marks_obtained}</p></div>          
                            <div className="col-md-3"><label className="font-normal">Year of passing</label><p className="border-2 p-1 rounded-md">{data.grad_year_of_passing}</p></div>               
                        </div>
                        <div className="row mt-4 py-2 sm:ml-8">
                            <h3 className="font-semibold ">Highschool Details(10th)</h3>
                            <div className="col-md-6"><label className="font-normal">Board</label><p className="border-2 p-1 rounded-md">{data.high_board}</p></div>
                            <div className="col-md-6"><label className="font-normal">Roll no.</label><p className="border-2 p-1 rounded-md">{data.high_roll_no}</p></div>          
                            <div className="col-md-3"><label className="font-normal">Marks obtained</label><p className="border-2 p-1 rounded-md">{data.high_marks_obtained}</p></div>          
                            <div className="col-md-3"><label className="font-normal">Maximum marks</label><p className="border-2 p-1 rounded-md">{data.high_max_marks}</p></div>          
                            <div className="col-md-3"><label className="font-normal">Percentage</label><p className="border-2 p-1 rounded-md">{data.high_marks_obtained}</p></div>          
                            <div className="col-md-3"><label className="font-normal">Year of passing</label><p className="border-2 p-1 rounded-md">{data.high_year_of_passing}</p></div>               
                        </div>
                        <div className="row mt-4 py-2 sm:ml-8">
                            <h3 className="font-semibold ">Intermediate Details(10+2 or equivalent)</h3>
                            <div className="col-md-6"><label className="font-normal">Board</label><p className="border-2 p-1 rounded-md">{data.inter_board}</p></div>
                            <div className="col-md-6"><label className="font-normal">Roll no.</label><p className="border-2 p-1 rounded-md">{data.inter_roll_no}</p></div>          
                            <div className="col-md-3"><label className="font-normal">Marks obtained</label><p className="border-2 p-1 rounded-md">{data.inter_marks_obtained}</p></div>          
                            <div className="col-md-3"><label className="font-normal">Maximum marks</label><p className="border-2 p-1 rounded-md">{data.inter_max_marks}</p></div>          
                            <div className="col-md-3"><label className="font-normal">Percentage</label><p className="border-2 p-1 rounded-md">{data.inter_marks_obtained}</p></div>          
                            <div className="col-md-3"><label className="font-normal">Year of passing</label><p className="border-2 p-1 rounded-md">{data.inter_year_of_passing}</p></div>               
                        </div>
                        {placementdetails &&
                            <div className="row mt-4 sm:ml-8">
                            <h3 className="font-semibold">Placement Details</h3>
                            <div className="col-md-6"><label className="font-normal">Company</label><p className="border-2 p-1 rounded-md">{placementdetails.company}</p></div>
                            <div className="col-md-6"><label className="font-normal">Annual CTC</label><p className="border-2 p-1 rounded-md">{placementdetails.annual_ctc}</p></div>          
                            <div className="col-md-3"><label className="font-normal">Type of employment </label><p className="border-2 p-1 rounded-md">{placementdetails.employment_type}</p></div>          
                            <div className="col-md-3"><label className="font-normal">Designation</label><p className="border-2 p-1 rounded-md">{placementdetails.designation}</p></div>              
                        </div> 
                        }
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
                        <PersonalDetails personal={scholar}/>
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
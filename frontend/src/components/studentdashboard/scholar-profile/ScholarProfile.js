import { useParams ,useNavigate} from "react-router";
import { useState, useEffect } from "react"
import axios from "../../../axiosConfig"
import PersonalDetails from "./PersonalDetails";
import PostGraduationDetails from "./PostGraduationDetails";
import GraduationDetails from "./GraduationDetails";
import IntermediateDetails from "./IntermediateDetails";
import HighSchoolDetails from "./HighSchoolDetails";
import Loading from "../../Loading";
const ScholarProfile=()=>{
    document.title='Profile | DUCS Placement Portal'
    console.log("inside scholarProfile")
    const navigate = useNavigate();
    const {id} = useParams();
    console.log("1here")
    const [scholar, setScholar]= useState('')
    const [isLoading, setIsLoading]= useState(true)
    const [username , setUsername] = useState('')
    const getScholar=()=>{
    //    setTimeout(()=>{
        console.log("here here")
        axios.get(`api/scholar/profile/${id}`)
        .then((res)=>{
            const scholar = res.data.scholar;
            setScholar(scholar);
            setIsLoading(false)
            setUsername(scholar.loginDetails.username)
          }).catch(error=> {
              console.log("Error getScholar : "+error)
              console.log(error.response.status)
              if(error.response.status=='401')
                navigate('/login')
              if(error.response.status=='403'){}
                navigate('/forbidden')
            }) 
        // },90000) 
    }
    useEffect(()=>{
        window.scrollTo(0, 0)
        console.log("inside use effect")
        getScholar()
    },[]);

    console.log("6 outside function")

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
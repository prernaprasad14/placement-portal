import { useParams } from "react-router";
import { useState, useEffect } from "react"
import axios from "../../../axiosConfig"
import PersonalDetails from "./PersonalDetails";
import PostGraduationDetails from "./PostGraduationDetails";
import GraduationDetails from "./GraduationDetails";
import IntermediateDetails from "./IntermediateDetails";
import HighSchoolDetails from "./HighSchoolDetails";

const ScholarProfile=()=>{
    const {id} = useParams();
    console.log("1here")
    const [scholar, setScholar]= useState('')
    const [isLoading, setIsLoading]= useState(true)
    const [username , setUsername] = useState('')
    const getScholar=()=>{
       
        console.log("here here")
        axios.get(`api/scholar/profile/${id}`)
        .then((res)=>{
            const scholar = res.data.scholar;
            setScholar(scholar);
            setIsLoading(false)
            setUsername(scholar.loginDetails.username)
          })  .catch(err=> console.log("Error getScholar : "+err))  
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
                <div className="flex justify-center items-center text-[#a375de]">
                    <svg className="spinner" viewBox="0 0 50 50">
                        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg>
                    <p className="px-2 block">Fetching data</p>
                </div>
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
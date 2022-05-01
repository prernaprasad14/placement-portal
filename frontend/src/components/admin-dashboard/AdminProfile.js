import { useParams ,useNavigate} from "react-router";
import { useState, useEffect, useContext } from "react"
import profilepic from '../../img/user.jpg';
import axios from "../../axiosConfig"
import Loading from "../Loading";
import { UserContext } from "../../App";
import Card from "../Card";

const AdminProfile=()=>{

    document.title='Profile | DUCS Placement Portal'
    console.log("inside Admin Profile")
    const {state, dispatch}= useContext(UserContext)
    const navigate = useNavigate();
    console.log("1here")
    const [admin, setAdmin]= useState('')
    const [isLoading, setIsLoading]= useState(true)
    const [error, setError]= useState(false)
    const [pcData, setPcData] = useState('')
    // const [isEditMode , setIsEditMode] = useState(false)
    // const [isLoggedIn , setIsLoggedIn] = useState(false)

    const getAdmin=()=>{
    //    setTimeout(()=>{
        console.log("inside getAdmin")
        axios.get(`api/admin/profile`)
        .then((res)=>{
            console.log(res)
            const admin = res.data.admin;
            setAdmin(admin);
            setPcData(admin.pc)
            setIsLoading(false)
          }).catch(error=> {
              console.log("Error getAdmin : "+error)
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
        // if(data!=null){
        //     setIsLoading(false)
        // }
        getAdmin()
        // axios('/api/user/home')
        // .then((res)=>{
        //     console.log(res.data)
        //         const data = res.data.homeData
        //         setPcData(data.pc)
        //         setIsLoading(false)
        // })
        // .catch((err)=>{
        //     setError(true)
        //     setIsLoading(false)

        // })       


    },[]);
    const edit=(event)=>{
        setIsEditMode(true)
    }
    
    console.log("6 outside function")
    if(isLoading)
    return(
        <>
          <Loading message={`Fetching Data`}/>
          </>)

    // if(data!=''){
        return(<>
        
        <div className="profile w-90% rounded bg-white m-3 ">
            <div className="row">
                <div className="col-md-3 border-right">
                    <h4 className="font-semibold text-2xl mx-28 my-5">Profile</h4>
                    <div className="d-flex flex-column align-items-center text-center mx-3" >
                        <img className="rounded-circle " width="150px" src={profilepic}/>
                        <span className="font-weight-bold">{pcData.username}</span>
                        <span className="text-black-50">{pcData.email}</span>
                    </div>
                </div>
                <div className="col-md-7 border-right">
                    <div className="p-3 py-5 ">
                        <div className="row mt-2 py-2 sm:ml-8 ">
                            <h3 className="font-semibold">Admin Details</h3>
                            
                        </div>
                        <div className="row mt-4 py-2 sm:ml-8">
                            <h3 className=" font-semibold mb-2">Contact Details</h3>
                            <div className='flex flex-col my-3 items-center px-10 py-3' >
                                <div className='flex flex-wrap w-[720px]'>
                                    {Object.entries(pcData).map((data, index)=>{
                                        
                                        console.log(data[1].pcname)
                                        return (<>
                                                <Card src={data[1].avatar} content={data[1].course} name={data[1].pcname}/>
                                        </>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>)
        
    
    
}
export default AdminProfile
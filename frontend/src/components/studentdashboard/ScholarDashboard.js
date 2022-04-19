import { Link, useNavigate} from 'react-router-dom'
import React, { useEffect , useState, useContext} from 'react'
import Sidebar from './Sidebar'
import WorkArea from './WorkArea'
import { UserContext } from '../../App'
import axios from '../../axiosConfig'
import CreateUser from './CreateUser'
import Loading from '../Loading'

const  ScholarDashboard = () => {
  const id="62530ab146c921a4807c7607"
  const navigate = useNavigate()
  console.log("1 inside ScholarDashboard")
  const {state, dispatch}= useContext(UserContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [companies, setCompanies]= useState('')
  const [scholars, setScholars]= useState('')
  const [scholar, setScholar]= useState('')
  const [username , setUsername] = useState('')

    const checkLoggedIn=()=>{
      axios.get('/api/user/logged-in')
       .then((res)=>{
         console.log("1",res)
        console.log("1")
        console.log(res.status)
        if(res.status==200){
          dispatch({type:"USER", payload:true})
          setIsLoggedIn(true)
          setIsLoading(false)
        }   
  
       }).catch((error)=>{
           console.log("error checkLoggedIn"+error)
           console.log("error res"+error.response)
          //  if(error.response.status=='401'){
          //   console.log("2")
          //   dispatch({type:"USER", payload:false})
          //    navigate('/login')
          //  }
          //  if(error.response.status=='403'){
          //   console.log("3")
          //   dispatch({type:"USER", payload:false})
          //    navigate('/forbidden')
          //  }
       })
  
   }
    const getAllCompanies=()=>{
      console.log("here here")
      axios.get('/companies')
      .then((res)=>{
          const companies = res.data.companies;
          console.log("here")
          console.log(res)
          console.log(res.data)
          setCompanies(companies);
      })
      .catch(err=> console.log("Error getAllCompanies : "+err))
  }
    // const getScholar=()=>{
    // //    setTimeout(()=>{
    //     console.log("here here")
    //     axios.get(`api/scholar/profile/${id}`)
    //     .then((res)=>{
    //         const scholar = res.data.scholar;
    //         setScholar(scholar);
    //         setIsLoading(false)
    //         setUsername(scholar.loginDetails.username)
    //       }).catch(error=> {
    //           console.log("Error getScholar : "+error)
    //           console.log(error.response.status)
    //           // if(error.response.status=='401')
    //           //   navigate('/login')
    //           if(error.response.status=='403'){}
    //             navigate('/forbidden')
    //         }) 
    //     // },90000) 
    // }
    const getAllScholars=()=>{
      console.log("here here")
      axios.get('/scholars')
      .then((res)=>{
          const scholars = res.data.scholars;
          console.log("here")
          console.log(res)
          console.log(res.data)
          setScholars(scholars);
      })
      .catch(err=> console.log("Error getAllScholars : "+err))
  }


  
  useEffect(()=>{
    checkLoggedIn();
    // getScholar();
    getAllCompanies();
    getAllScholars();
  },[]);

  if(isLoading){
    return(
      <>
        <Loading message={`Fetching Data`}/>
      </>
    )
  }
  return(  
    <>
    
        {/* <ul className=''>
            <li className='item bg-orange-400'><Link to="/dashboard">ScholarDashboard</Link></li>    
            <li className='item'><Link to="/dashboard/profile">Profile</Link></li>    
            <li className='item'><Link to="/dashboard/scholar">Scholars</Link></li>    
            <li className='item'><Link to="/dashboard/companies">Companies</Link></li>    
            <li className='item'><Link to="/dashboard/notifications">Notifications</Link></li>    
        </ul> */}

          
        <div className='w-screen h-screen bg-yellow-200'>
            <WorkArea companies={companies} scholars={scholars}  />        
        </div>
  
 
     </>
   )
 }

export default ScholarDashboard
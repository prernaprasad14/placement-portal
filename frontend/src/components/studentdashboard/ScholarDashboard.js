import { Link, useNavigate} from 'react-router-dom'
import React, { useEffect , useState, useContext} from 'react'
import Sidebar from './Sidebar'
import WorkArea from './WorkArea'
import { UserContext } from '../../App'
import axios from '../../axiosConfig'
import CreateUser from '../admin-dashboard/CreateUser'
import Loading from '../Loading'

const  ScholarDashboard = () => {
  document.title='Dashboard | DUCS Placement Portal'
  const navigate = useNavigate()
  console.log("1 inside ScholarDashboard")
  const {state, dispatch}= useContext(UserContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [companies, setCompanies]= useState('')
  const [company, setCompany]= useState('')
  const [scholars, setScholars]= useState('')
  const [scholar, setScholar]= useState('')

  const checkLoggedIn=()=>{
    axios.get('/api/user/logged-in')
      .then((res)=>{
        console.log("1",res)
        console.log("1")
        console.log(res.status)
        if(res.status==200){
          console.log(res.data.role)
          dispatch({type:"LOGGEDIN", role:res.data.role})
          setIsLoggedIn(true)
          setIsLoading(false)
        }   
      }).catch((error)=>{
          console.log("error checkLoggedIn"+error)
          console.log("error res"+error.response)
         if(error.response.status=='401'){
          dispatch({type:"USER", role:"USER"})
           navigate('/login')
         }
         if(error.response.status=='403'){
          dispatch({type:"LOGGEDIN", role:state})
           navigate('/forbidden')
         }
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
    const getScholar=()=>{
    //    setTimeout(()=>{
        console.log("here here")
        axios.get(`api/scholar/profile`)
        .then((res)=>{
            const scholar = res.data.scholar;
            setScholar(scholar);
            setIsLoading(false)
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
    // setTimeout(()=>{
    checkLoggedIn();  
    if(state==='SCHOLAR'){
      getScholar();
      getAllCompanies();
    }
    // },80000000)
   
  },[]);

  if(isLoading){
    return(
      <>
        <Loading message={`Fetching Data`}/>
        </>)
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

          
        <div className=''>
            <WorkArea companies={companies}  scholar={scholar}/>        
        </div>
  
 
     </>
   )
 }

export default ScholarDashboard
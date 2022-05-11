import { Link, useNavigate} from 'react-router-dom'
import React, { useEffect , useState, useContext} from 'react'
import AdminWorkArea from './AdminWorkArea'
import { UserContext } from '../../App'
import axios from '../../axiosConfig'
// import CreateUser from './CreateUser'
import Loading from '../Loading'


const  AdminDashboard = () => {
  document.title='Dashboard | DUCS Placement Portal'
  const id="62530ab146c921a4807c7607"
  const navigate = useNavigate()
  console.log("1 inside AdminDashboard")
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
          dispatch({type:"LOGGEDIN", role:res.data.role})
          setIsLoggedIn(true)
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
    
    const getAllScholars=()=>{
      console.log(state)
      axios.get(`/scholars/${state}`)
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
    // setTimeout(()=>{
    checkLoggedIn();
    if(state==='ADMIN'){
      getAllCompanies();
      getAllScholars();
      setIsLoading(false)
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
        <div className=''>
            <AdminWorkArea  companies={companies} scholars={scholars}/>        
        </div>
  
 
     </>
   )
 }

export default AdminDashboard
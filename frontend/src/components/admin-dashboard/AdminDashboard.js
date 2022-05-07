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
        dispatch({type:"LOGGEDIN",role:"ADMIN"})
        setIsLoggedIn(true)
        
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
    // setTimeout(()=>{
    // checkLoggedIn();
    if(state!='ADMIN'){navigate('/forbidden')}
    getAllCompanies();
    getAllScholars();
    setIsLoading(false)
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
            <AdminWorkArea  companies={companies} scholars={scholars}  scholar={scholar} company={company}/>        
        </div>
  
 
     </>
   )
 }

export default AdminDashboard
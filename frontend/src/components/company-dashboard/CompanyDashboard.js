import { Link, useNavigate} from 'react-router-dom'
import React, { useEffect , useState, useContext} from 'react'
import CompanyWorkArea from './CompanyWorkArea'
import { UserContext } from '../../App'
import axios from '../../axiosConfig'
import Loading from '../Loading'


const  CompanyDashboard = () => {
  document.title='Dashboard | DUCS Placement Portal'
  const id="62530ab146c921a4807c7607"
  const navigate = useNavigate()
  const {state, dispatch}= useContext(UserContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [company, setCompany]= useState('')
  const [scholars, setScholars]= useState('')


  const checkLoggedIn=()=>{
    axios.get('/api/user/logged-in')
      .then((res)=>{
        console.log("1",res)
        if(res.status==200){
            console.log(res.data.role)
          dispatch({type:"LOGGEDIN", role:res.data.role})
          setIsLoading(false)
          setIsLoggedIn(true)
        }   
      }).catch((error)=>{
          console.log("error checkLoggedIn"+error)
          console.log("error res"+error.response)
         if(error.response.status=='401'){
          console.log("2")
          dispatch({type:"USER", role:"USER"})
          setIsLoading(false)
           navigate('/login')
         }
         if(error.response.status=='403'){
          console.log("3")
          dispatch({type:"LOGGEDIN", role:state})
          setIsLoading(false)
           navigate('/forbidden')
         }
      })
  }
  
  const getCompany=()=>{


        axios(`api/company/profile`)
        .then((res)=>{
            console.log(res)
            const company = res.data.company;
           console.log(company);
            setCompany(company);
          }).catch(error=> {
              console.log("Error getCompany : "+error)
              // if(error.response.status=='401'){
              //   dispatch({type:"USER", role:state})
              //   navigate('/login')
              // }
              // if(error.response.status=='403'){
              //   dispatch({type:"LOGGEDIN", role:"company"})
              //   navigate('/forbidden')
                
              // }
            }) 

  }
  const getAllScholars=()=>{
      console.log("Inside getAllScholars, user state:",state)
      axios.get(`/api/scholar/scholars`)
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
    window.scrollTo(0,0)
    checkLoggedIn();
  },[]);

  if(isLoading){
    return <Loading message={`Fetching Data`}/>
  }

  if(state!=='company')
    navigate('/forbidden')
    
  return(  
    <>
        <div className=''>
            <CompanyWorkArea />        
        </div>
  
 
     </>
   )
 }

export default CompanyDashboard
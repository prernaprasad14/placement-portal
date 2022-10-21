import { Link, useNavigate} from 'react-router-dom'
import React, { useEffect , useState, useContext} from 'react'
import AdminWorkArea from './AdminWorkArea'
import { UserContext } from '../../App'
import axios from '../../axiosConfig'
// import CreateUser from './CreateUser'
import Loading from '../Loading'


const  AdminDashboard = () => {
  document.title='Dashboard | DUCS Placement Portal'
  const navigate = useNavigate()
  const {state, dispatch}= useContext(UserContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const checkIsLoggedIn=()=>{
    setIsLoading(true)
    axios('api/user/logged-in')
    .then(res=>{
        if(res.status == 200){
            setIsLoggedIn(true)
            dispatch({type:"LOGGEDIN", role:res.data.role})
            console.log("here??????")
            setIsLoading(false)
     }
    }).catch(err=>{
        dispatch({type:"USER", role:"USER"})
        console.log(err.status)
        navigate('/login')
        setIsLoading(false)
    } 
    )
}
    
    
    

  useEffect(()=>{
   
    window.scrollTo(0,0)
    checkIsLoggedIn();   
    
  },[]);
  
  if(isLoading){
    return(
      <>
        <Loading message={`Fetching Data`}/>
        </>)
    }
   
    if(state!=='admin')
      navigate('/forbidden')
    
    return(  
    <>
        <div className=''>
            <AdminWorkArea />        
        </div>
  
 
     </>
   )
 }

export default AdminDashboard
import { useState, useContext, useEffect} from 'react';
import {UserContext} from '../App';
import Page404 from './Page404';
import axios from '../axiosConfig'
import AdminDashboard from './admin-dashboard/AdminDashboard';
import CompanyDashboard from './company-dashboard/CompanyDashboard';
import ScholarDashboard from './studentdashboard/ScholarDashboard';
import Loading from './Loading';
import { useNavigate } from 'react-router';
function Dashboard(){
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const {state, dispatch}= useContext(UserContext)
    // const DisplayDashboard =()=>{
    //     switch(state){
    //         case 'admin': return <AdminDashboard/>
    //         case 'scholar': return <ScholarDashboard/>
    //         case 'company': return <CompanyDashboard/>
    //         default: navigate('/')
    //     }
    // }
    const checkIsLoggedIn=()=>{
        setIsLoading(true)
        axios('api/user/logged-in')
        .then(res=>{
            if(res.status == 200){
                setLoggedIn(true)
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
       console.log("Inside Main Dashboard Component, user State: ",state)
       checkIsLoggedIn()
       
    },[])

    if(isLoading){
        return <Loading message={'Loading Dashboard...'}/>
    }
    
    if(state==='admin'){
        // return <AdminDashboard/>
        navigate('/dashboard/admin')
    }
    if(state==='scholar'){
        // return <ScholarDashboard/>
        navigate('/dashboard/scholar')
    }
    if(state==='company'){
    // return <CompanyDashboard/>
    navigate('/dashboard/company')
    }

    return(
    <>
        <Page404/>
        {/* <div className='dashboard'><DisplayDashboard/></div> */}
        
    </>
    )
}
export default Dashboard
// import { useState, useContext, useEffect} from 'react';
// import { useNavigate } from 'react-router';
// import {UserContext} from '../App';

// function Dashboard(){
//     const navigate = useNavigate()
//     const {state} = useContext(UserContext)
//     // const DisplayDashboard =()=>{
//     //     switch(state){
//     //         case 'admin': return <AdminDashboard/>
//     //         case 'scholar': return <ScholarDashboard/>
//     //         case 'company': return <CompanyDashboard/>
//     //         default: navigate('/')
//     //     }
//     // }
//     useEffect(()=>{
//         console.log("Inside Main Dashboard Component, user State: ",state)
//         if(state==='admin'){
//        navigate('/dashboard/admin')
//         }
//         else if(state==='scholar'){
//         navigate('/dashboard/scholar')
//         }
//         if(state==='company'){
//         navigate('/dashboard/company')
//         }
      
//     },[])
   
//     return(
//     <>
//         <div className='dashboard'>Dashboard</div>
//         {/* <div className='dashboard'><DisplayDashboard/></div> */}
        
//     </>
//     )
// }
// export default Dashboard
import axios from '../axiosConfig'
import { useState,useEffect, useContext } from 'react'
import { useNavigate } from 'react-router';
import {UserContext} from '../App';
import Loading from './Loading';


const Logout=()=>{
    document.title='DUCS Placement Portal'
    const {state, dispatch} = useContext(UserContext);
    const [isLoading, setIsLoading]=useState(true)
    const navigate = useNavigate();


    const logout=()=>{
        console.log("inisde logout")
       
            setIsLoading(true)
            axios.get('api/user/logout')
            .then(res=> {
                console.log(res)
                console.log(res.data)
                console.log(res.data.role)
                dispatch({type:"USER", role:res.data.role})
        })       
        .catch(error=> {
            dispatch({type:"USER", role:"USER"})
            if(error.response.status==404){
                navigate('/404')
            }else{
              
            }
        })
        setIsLoading(false)
            
        // setIsLoading(false)
        
     
    }

    useEffect(()=>{
       logout();
    
      setIsLoading(false) 
        setTimeout(()=>{
            // navigate('/brochure')
            navigate('/')
        },1000)
    },[]);
    
if(isLoading)
    return(
        <>
            <Loading message={`Logging out...`}/>
        </>
    )

    return (
        <>
            <Loading message={`Logging out...`}/>
        </>
    )
}
export default Logout
import axios from '../axiosConfig'
import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router';
import {UserContext} from '../App';
import Loading from './Loading';


const Logout=()=>{
    document.title='Logging out | DUCS Placement Portal'
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(()=>{
      
            axios.get('api/user/logout',{
            headers:{
                Accept :"application/json",
                "Content-Type":"application/json"
            },
            credentials: "include"
        }).then((res)=>{
            console.log(res)
            dispatch({type:"USER", payload:false})
            navigate('/')
        }).catch(err=> console.log("error"+err))
    },[]);

    return(
        <>
            <Loading message={`Logging out`}/>
        </>
    )
}
export default Logout
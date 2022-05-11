import axios from '../axiosConfig'
import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router';
import {UserContext} from '../App';
import Loading from './Loading';


const Logout=()=>{
    document.title='Logging out | DUCS Placement Portal'
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const logout=()=>{
        axios.get('api/user/logout')
        // {headers:{
        //     Accept :"application/json",
        //     "Content-Type":"application/json"
        // },
        // credentials: "include"}
        .then((res)=>{
            console.log(res)
            console.log(state)
            dispatch({type:"USER", role:"USER"})
            navigate('/')
        }).catch(err=> console.log("error"+err))   
      
    } 
    useEffect(()=>{
        logout();
    },[]);

    return(
        <>
            <Loading message={`Logging out`}/>
        </>
    )
}
export default Logout
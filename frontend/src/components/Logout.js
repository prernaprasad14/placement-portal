import axios from '../axiosConfig'
import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router';
import {UserContext} from '../App';


const Logout=()=>{
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
            dispatch({type:"user", payload:false})
            navigate('/')
        }).catch(err=> console.log("error"+err))
    });

    return(
        <>
            <div>logout page</div>
        </>
    )
}
export default Logout
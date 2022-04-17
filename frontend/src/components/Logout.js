import axios from '../axiosConfig'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

const Logout=()=>{
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
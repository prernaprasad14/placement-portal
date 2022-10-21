import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { UserContext } from '../App'
import axios from '../axiosConfig'
import Loading from './Loading'
import {AiFillHome }from 'react-icons/ai'


function Page500() {
    document.title='500 Internal Server Error | DUCS Placement Portal'

    const {state, dispatch}= useContext(UserContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const checkIsLoggedIn=()=>{
        axios('api/user/logged-in')
        .then(res=>{
            if(res.status == 200){
                setIsLoggedIn(true)
                dispatch({type:"LOGGEDIN", role:res.data.role})
                setIsLoading(false)
         }
        }).catch(err=>{
            dispatch({type:"USER", role:err.data.role})
            console.log(err.status)
            // navigate('/login')
            setIsLoading(false)
        } 
        )
    }
    useEffect(()=>{
        // window.scrollTo(0,0);
        checkIsLoggedIn()
    },[])
    
    if(isLoading){
        return(<Loading message={'Just a moment'}/>)
    }

    if(isLoggedIn){
        return (
            <>
            <div className='bg-zinc-100 bg-gradient-to-b h-full z-50 from-white via-zinc-100/25 to-zinc-100/30'>
            <div className=' flex flex-col py-40 items-center '>
                <p className='px-2 text-6xl font-bold text-zinc-400/75'>500</p>
                <p className='px-2 text-3xl font-bold text-zinc-400/75'>Internal Server Error</p>
                <p className='justify-center font-500 text-lg mt-3 p-5 text-zinc-400'>Server Error</p>
                <p className='mx-6  mt-3 text-lg'>
                    <Link to="/dashboard"  className=' text-zinc-600 hover:text-white hover:bg-purple-300 hover:rounded-md hover:p-4 '>
                        <AiFillHome className=' mx-1 mb-1 inline-block'/>Back to Dashboard
                    </Link>
                </p>
            </div>
            </div>
            </> 
        )
    }
    return (
        <>
        <div className='bg-zinc-100 bg-gradient-to-b  from-white via-zinc-100/25 to-zinc-100/30'>
        <div className=' flex flex-col py-40 items-center '>
            <p className='px-2 text-6xl font-bold text-zinc-400/75'>500</p>
            <p className='px-2 text-3xl font-bold text-zinc-400/75'>Internal Server Error</p>
            <p className='justify-center font-500 text-lg mt-3 p-5 text-zinc-400'>Server Error</p>
            <p className='mx-6  mt-3 text-lg'>
                <Link to="/"  className=' text-zinc-600 hover:text-white hover:bg-purple-300 hover:rounded-md hover:p-4 '>
                    <AiFillHome className=' mx-1 mb-1 inline-block'/>Back to Home
                </Link>
            </p>
        </div>
        </div>
        </> 
    )
    
  }
export default Page500
import React, { useEffect,useContext,useState } from 'react'
import {AiFillHome }from 'react-icons/ai'
import { Link } from 'react-router-dom'
import axios from '../axiosConfig'
import { UserContext } from '../App'


function Page404() {
    document.title='404 Not found | DUCS Placement Portal'
    const [loggedIn, setLoggedIn] = useState(false)
    const {state, dispatch}= useContext(UserContext)

    useEffect(()=>{
        axios('api/user/logged-in')
        .then(res=>{
            if(res.status == 200)
            setLoggedIn(true)
            dispatch({type:"LOGGEDIN", role:res.data.role})
        }).catch(err=> console.log(err+"404"))
    },[])
    // if(loggedIn){
    //     return (<div className='bg-zinc-100 bg-gradient-to-b h-full from-white to-zinc-100/25  '>
    //         <div className=' flex flex-col py-40 items-center '>
    //             <p className='px-2 text-6xl font-bold text-zinc-400/75'>404</p>
    //             <p className='px-2 text-3xl font-bold text-zinc-400/75'> Page not found</p>
    //             <p className='justify-center font-500 text-lg mt-3 p-5 text-zinc-400'>The resource you are trying to access doesn't exist</p>
    //             <p className='mx-6  mt-3 text-lg'>
    //                 <Link to="/dashboard"  className='text-zinc-600 hover:text-white hover:bg-purple-300 hover:rounded-md hover:p-4'>
    //                     <AiFillHome className='mx-1 mb-1 inline-block'/>Back to Dashboard
    //                 </Link>
    //             </p>
    //         </div>
    //     </div>
    //     )
    // }
    return (
        <>
        
        <div className='bg-zinc-100 bg-gradient-to-b h-full from-white to-zinc-100/25  '>
            <div className=' flex flex-col py-40 items-center '>
                <p className='px-2 text-6xl font-bold text-zinc-400/75'>404</p>
                <p className='px-2 text-3xl font-bold text-zinc-400/75'> Page not found</p>
                <p className='justify-center font-500 text-lg mt-3 p-5 text-zinc-400'>The resource you are trying to access doesn't exist</p>
                <p className='mx-6  mt-3 text-lg'>
                    <Link to="/"  className='text-zinc-600 hover:text-white hover:bg-purple-300 hover:rounded-md hover:p-4'>
                        <AiFillHome className='mx-1 mb-1 inline-block'/>Back to Home
                    </Link>
                </p>
            </div>
        </div>
        </> 
    )
  }
export default Page404
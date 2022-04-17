import React from 'react'
import { Link } from 'react-router-dom'
import {AiFillHome }from 'react-icons/ai'

function Page403() {
    document.title='403 Forbidden | DUCS Placement Portal'
    return (
        <>
        <div className='bg-zinc-100 bg-gradient-to-b h-full z-50 from-white via-zinc-100/25 to- -100/30'>
        <div className=' flex flex-col py-40 items-center '>
            <p className='px-2 text-6xl font-bold text-zinc-400/75'>403</p>
            <p className='px-2 text-3xl font-bold text-zinc-400/75'>Forbidden</p>
            <p className='justify-center font-500 text-lg mt-3 p-5 text-zinc-400'>You don't have permission to access this resouce</p>
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
export default Page403
import React from 'react'
import {AiFillHome }from 'react-icons/ai'
import { Link } from 'react-router-dom'


function Page404() {
    document.title='404 Not found | DUCS Placement Portal'

    return (
        <>
        <div className='bg-zinc-100 bg-gradient-to-b h-full from-white to-zinc-100/25  '>
            <div className=' flex flex-col py-40 items-center '>
                <p className='px-2 text-6xl font-bold text-zinc-400/75'>404</p>
                <p className='px-2 text-3xl font-bold text-zinc-400/75'> Page not found</p>
                <p className='justify-center font-500 text-lg mt-3 p-5 text-zinc-400'>The resource you are trying to access doesn't exist</p>
                <p className='mx-6  mt-3 text-lg'>
                    <Link to="/"  className='text-zinc-600hover:text-white hover:bg-purple-300 hover:rounded-md hover:p-4'>
                        <AiFillHome className='mx-1 mb-1 inline-block'/>Back to Home
                    </Link>
                </p>
            </div>
        </div>
        </> 
    )
  }
export default Page404
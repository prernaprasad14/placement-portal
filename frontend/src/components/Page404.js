import React from 'react'
import {AiFillHome }from 'react-icons/ai'

function Page404() {
    return (
        <>
        <div className='bg-zinc-100 bg-gradient-to-b h-full z-50 from-white via-zinc-100/25 to- -100/30'>
        <div className=' flex flex-col py-40 items-center '>
            <p className='px-2 text-6xl font-bold text-zinc-400/75'>404</p>
            <p className='px-2 text-3xl font-bold text-zinc-400/75'> Page not found</p>
            <p className='justify-center font-500 text-lg mt-3 p-5 text-zinc-400'>The resource you are trying to access doesnt exist</p>
            <p className='mx-6  mt-3 text-lg'><a href="/"  className=' text-zinc-600 no-underline hover:text-purple-600 hover:underline '><AiFillHome className='mx-1 mb-1 inline-block'/>Back to Home</a></p>
        </div>
        </div>
        </> 
    )
  }
export default Page404
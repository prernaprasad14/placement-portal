import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'

const Card=({data})=> {

    const {state}=useContext(UserContext)
    const {avatar , pcname, course,   email, contact} =data[1]
    const start_year= new Date(data[1].start_year).getFullYear()
    const  end_year= new Date(data[1].end_year).getFullYear()
    
    useEffect(()=>{
        console.log("Inside Card")
    },[])

    return(
        <>
            <div className='border-t-[30px] rounded-md border-violet-300  bg-white flex drop-shadow-md flex-col items-center m-2 w-56'>
                <div className='relative border-t-2  border-r-2 mt-[-23px] p-2 bg-gray-100 border-gray-200 rounded drop-shadow-sm  w-2 h-2'></div>
                <div className='my-3 form-group flex flex-col justify-center items-center'>
                   
                {
                    Object.entries(avatar).map((datum, index)=>{
                        const base64String = btoa(new Uint8Array(avatar.img.data.data).reduce(function (data, byte) {
                            return data + String.fromCharCode(byte);
                        }, ''));
                        return <>{ 
                            index===0 && <img className='bg-gray-100/25 p-2 cursor-pointer' width='110px' height='auto'  src={`data:image/*;base64, ${base64String}`}/>
                        }</>
                    })
                }
                <h1 name="pcname">{pcname}</h1>
                <h6 className='px-2 m-2 text-[12px] font-semibold'>{course}</h6>
                {state==='admin' && <>
                    <h6 className='px-2 m-2 text-[12px] font-semibold'>{email}</h6>
                    <h6 className='px-2 m-2 text-[12px] font-semibold'>{contact}</h6>
                </>}
                <div className='border-t-2 border-slate-200/75'>
                    <p className='px-2 m-2 text-[12px] font-semibold'>{start_year}-{end_year}</p>
                </div>
            </div>
            </div>        

        </>
    )
    
  
}
export default Card

import axios from '../../axiosConfig'
import React, {useEffect, useState} from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';


const CompanyRow =(company)=>{
    const {_id, username, email} =company.company[1].loginDetails
    const id = JSON.stringify(_id)
    const {cname} =company.company[1]
    const onClick=()=>{
        navigate(`/profile/${username}`)
     }

    return(
        <>
            <tr className="border-b-2 border-box border-gray-700/15 bg-rose-500/25 cursor-pointer"  onClick={onClick}>
                <input type="checkbox" className='rounded-sm focus:bg-transparent border-purple-300 ml-8 my-4 p-2'></input>
                <td className=' py-4 px-8'>{cname}</td>
                <td className=' py-4 px-8'>{username}</td>
                <td className=' py-4 px-8'>{email}</td>    
                <td className=' py-4 px-2' ><button type="to"><BsThreeDotsVertical /></button></td>        
            </tr>
        </>
    )

}

export default CompanyRow
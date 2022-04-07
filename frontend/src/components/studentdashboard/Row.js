import axios from '../../axiosConfig'
import React, {useEffect, useState} from 'react'
import Scholars from './Scholars'
import { BsThreeDotsVertical } from 'react-icons/bs';


const Row =(scholar)=>{
    const {_id, placement_status} =scholar.scholar[1]
    const {fname,lname, phone} =scholar.scholar[1].personalDetails
    const {email} =scholar.scholar[1].loginDetails

    return(
        <>
            <tr className="border-b-2 border-gray-700/15 " key={_id}>
                <td className=" py-4 px-8"><input type="checkbox" className='rounded-sm focus:bg-transparent border-purple-300 p-2'></input></td>
                <td className=' py-4 px-8'>{fname}</td>
                <td className=' py-4 px-8'>{lname}</td>
                <td className=' py-4 px-8'>{email}</td>
                <td className=' py-4 px-8'>{phone}</td>
                <td className=' py-4 px-8'>{placement_status}</td>        
                <td className=' py-4 px-2' ><button type="to"><BsThreeDotsVertical /></button></td>        
            </tr>
        </>
    )

}

export default Row
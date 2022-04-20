import axios from '../../axiosConfig'
import React from 'react'
import {useNavigate} from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';


const ScholarRow =(scholar)=>{
    const navigate= useNavigate()
    const{_id,  placement_status, token} =scholar.scholar[1]
    console.log(_id)
    const id = JSON.stringify(_id)
    console.log(id)
    const {fname,lname, phone} =scholar.scholar[1].personalDetails
    const {email, username} =scholar.scholar[1].loginDetails
    const onClick=()=>{
       navigate(`/profile/${_id}`)
    }
    return(
        <>
            <tr className="border-b-2 border-box border-gray-700/15 bg-rose-500/25 cursor-pointer" key={id} onClick={onClick}>
                <td className=" py-3 px-8"><input type="checkbox" className='rounded-sm focus:bg-transparent border-purple-300 p-2'></input></td>
                <td className=' py-3 px-8'>{fname}</td>
                <td className=' py-3 px-8'>{lname}</td>
                <td className=' py-3 px-8'>{email}</td>
                <td className=' py-3 px-8'>{phone}</td>
                <td className=' py-3 px-8'>{placement_status}</td>        
                <td className=' py-3 px-2' ><button type="to"><BsThreeDotsVertical /></button></td>        
            </tr>

        </>
    )

}

export default ScholarRow
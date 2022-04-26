import axios from '../../axiosConfig'
import React from 'react'
import {useNavigate} from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';


const ScholarRow =({scholar})=>{
    console.log("scholars row")
    console.log(scholar)
    const navigate= useNavigate()
    // const{_id,  placement_status, token} =scholar.scholar[1]
    console.log(scholar._id)
    // const id = JSON.stringify(_id)
    // console.log(id)
    // const {fname,lname, phone,gender} =scholar.scholar[1].personalDetails
    // const {email, username} =scholar.scholar[1].loginDetails
    const onClick=()=>{
       navigate(`/profile`)
    }
    return(
        <>
            <tr onClick={onClick}>
                <td className=" py-3 px-8"><input type="checkbox" className='rounded-sm focus:bg-transparent border-purple-300 p-2'></input></td>
                <td className=' py-3 px-8'>{scholar.fname}</td>
                <td className=' py-3 px-8'>{scholar.lname}</td>
                <td className=' py-3 px-8'>{scholar.gender}</td>
                <td className=' py-3 px-8'>{scholar.email}</td>
                <td className=' py-3 px-8'>{scholar.phone}</td>
                <td className=' py-3 px-8'>{scholar.placement_status}</td>        
                <td className=' py-3 px-2' ><button><BsThreeDotsVertical /></button></td>        
            </tr>
        </>
    )

}

export default ScholarRow
import axios from '../../axiosConfig'
import React, {useEffect, useState} from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import {useNavigate} from 'react-router-dom'

const CompanyRow =({company})=>{
    // const {username, email} =company.company[1].loginDetails
    // const {website, phone} =company.company[1]
    // const id = JSON.stringify(_id)
    // const {cname} =company.company[1]
    const navigate =useNavigate()
    console.log("company")
    console.log(company)
    const onClick=()=>{
        navigate(`/profile`)
     }

    return(
        <>
            <tr onClick={onClick}>
                <td><input type="checkbox" className='rounded-sm focus:bg-transparent border-purple-300 ml-8 my-4 p-2'></input></td>
                <td className=' py-3 px-8'>{company.cname}</td>
                <td className=' py-3 px-8'>{company.username}</td>
                <td className=' py-3 px-8'>{company.email}</td>    
                <td className=' py-3 px-8'>{company.website}</td>    
                <td className=' py-3 px-8'>{company.phone}</td>    
                <td className=' py-3 px-2' ><button type="to"><BsThreeDotsVertical /></button></td>        
            </tr>
        </>
    )

}

export default CompanyRow
import React, { useEffect } from 'react'
import logo from "../../img/logo.png"
import { UserContext } from '../../App'
import {Link } from 'react-router-dom'
import {MdSpaceDashboard} from 'react-icons/md'
import {BiNotification} from 'react-icons/bi'
import {HiUserCircle} from 'react-icons/hi'
import {FaUserGraduate,FaSignOutAlt} from 'react-icons/fa'

const  CompanySidebar= ({menu,chosenItem}) => {
  const menuItems = menu.map((item)=>{
    return item.toLowerCase()
  }) 
  useEffect(()=>{
    console.log("Inside CompanySidebar")
  },[])
  return(  

    <>
      <div className="side-menu" >
          <Link to='#' onClick={()=>chosenItem("0")} className='side-menu-links'>
            <div className='text-lg  '>
                <MdSpaceDashboard className='inline-block mb-1 mx-2 sm:text-sm md:text-lg'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Dashboard</p>
            </div>
          </Link>

          <Link to='#profile' onClick={()=>chosenItem("1")} className='side-menu-links'>
            <div className='text-lg '>
              <HiUserCircle   className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
              <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Profile</p>
            </div>
          </Link>
          <Link to='#scholars'onClick={()=>chosenItem("2")} className='side-menu-links'>
              <div className='text-lg '>
                <FaUserGraduate   className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Scholars</p>
               </div>
          </Link>
           
          {/* <Link to='#announcements' onClick={()=>chosenItem("3")} className='side-menu-links'>
            <div className='text-lg '>              
                <BiNotification   className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Announcements</p>
            </div>
          </Link> */}
      </div>
    
    </>
  )
}

export default CompanySidebar
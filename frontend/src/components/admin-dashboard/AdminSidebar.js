import React, { useEffect } from 'react'
import logo from "../../img/logo.png"
import { UserContext } from '../../App'
import {Link } from 'react-router-dom'
import {MdSpaceDashboard} from 'react-icons/md'
import {BiNotification} from 'react-icons/bi'
import {HiUserGroup,HiUserCircle} from 'react-icons/hi'
import {FaUserGraduate,FaSignOutAlt,FaUserPlus} from 'react-icons/fa'

const  AdminSidebar= ({menu,chosenItem}) => {
  console.log("2 insideSidebar")
  const menuItems = menu.map((item)=>{
    return item.toLowerCase()
  }) 

    console.log("menuItems:: "+ menuItems)
    console.log("menu:: "+ menu)
  return(  

    <>
      <div id="side-menu" >
          <Link to='#' onClick={()=>chosenItem("0")} className='side-menu-links'>
            <div className='text-lg  '>
                <MdSpaceDashboard className='inline-block mb-1 mx-2 sm:text-sm md:text-lg'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-lg'>Dashboard</p>
            </div>
          </Link>

          <Link to='#profile' onClick={()=>chosenItem("1")} className='side-menu-links'>
            <div className='text-lg '>
              <HiUserCircle  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-xl'/>
              <p className='hidden sm:inline-block sm:text-sm md:text-lg'>Profile</p>
            </div>
          </Link>

          <Link to="#companies"  onClick={()=>chosenItem("2")} className='side-menu-links'>
            <div className='text-lg '>              
                <HiUserGroup  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-lg'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-lg'>Companies</p>
            </div>
          </Link>
          
          <Link to='#scholars'onClick={()=>chosenItem("3")} className='side-menu-links'>
              <div className='text-lg '>
                <FaUserGraduate  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-lg'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-lg'>Scholars</p>
               </div>
          </Link>
           
          <Link to='#notifications' onClick={()=>chosenItem("4")} className='side-menu-links'>
            <div className='text-lg '>              
                <BiNotification  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-lg'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-lg'>Notifications</p>
            </div>
          </Link>
          <Link to='#manage-users' onClick={()=>chosenItem("5")} className='side-menu-links'>
            <div className='text-lg '>              
                <FaUserPlus  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-lg'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-lg'>Manage Users</p>
            </div>
          </Link>
          <Link to='/logout' className=' mt-auto side-menu-links' >
            <div className='text-lg'>
                <FaSignOutAlt className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-lg'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-lg'>Logout</p>
          </div>
          </Link>
      </div>
    
    </>
  )
}

export default AdminSidebar
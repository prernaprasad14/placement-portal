import React, { useEffect } from 'react'
import logo from "../../img/logo.png"
import { UserContext } from '../../App'
import {Link } from 'react-router-dom'
import {MdSpaceDashboard} from 'react-icons/md'
import {BiNotification} from 'react-icons/bi'
import {CgOrganisation} from 'react-icons/cg'
import {HiUserGroup,HiUserCircle,HiDocumentDuplicate} from 'react-icons/hi'
import {FaUserGraduate,FaSignOutAlt,FaUserPlus} from 'react-icons/fa'
// import {CgOrganisation} from 'react-icons/cg'
const  AdminSidebar= ({menu,chosenItem}) => {
  const menuItems = menu.map((item)=>{
    return item.toLowerCase()
  }) 

  useEffect(()=>{
    console.log("Inside AdminSidebar")

  },[])
  return(  

    <>
      <div className="side-menu" >
          <Link to='#' onClick={()=>chosenItem("0")} className='side-menu-links'>
            <div className='text-base font-semibold  '>
                <MdSpaceDashboard className='inline-block mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Dashboard</p>
            </div>
          </Link>
          {/* <Link to='#announcements' onClick={()=>chosenItem("4")} className='side-menu-links'>
            <div className='text-base font-semibold '>              
                <BiNotification  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Announcements</p>
            </div>
          </Link> */}
          <Link to="#companies"  onClick={()=>chosenItem("2")} className='side-menu-links'>
            <div className='text-base font-semibold '>              
                <CgOrganisation className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Companies</p>
            </div>
          </Link>
          <Link to='#scholars'onClick={()=>chosenItem("3")} className='side-menu-links'>
              <div className='text-base font-semibold '>
                <FaUserGraduate  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Scholars</p>
               </div>
          </Link>
           
          
          <Link to='#manage-users' onClick={()=>chosenItem("5")} className='side-menu-links'>
            <div className='text-base font-semibold '>              
                <FaUserPlus  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Manage Users</p>
            </div>
          </Link>
          <Link to='#manage-brochures' onClick={()=>chosenItem("6")} className='side-menu-links'>
            <div className='text-base font-semibold '>              
                <HiDocumentDuplicate  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Manage Brochures</p>
            </div>
          </Link>
        
          <Link to='#profile' onClick={()=>chosenItem("1")} className='side-menu-links'>
            <div className='text-base font-semibold '>
              <HiUserCircle  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-xl'/>
              <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Profile</p>
            </div>
          </Link>

      </div>
    
    </>
  )
}

export default AdminSidebar
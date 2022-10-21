import React, { useEffect } from 'react'
import {Link } from 'react-router-dom'
import {MdSpaceDashboard} from 'react-icons/md'
import {HiUserGroup,HiUserCircle} from 'react-icons/hi'

const  ScholarSidebar= ({menu,chosenItem}) => {
  console.log("2 insideSidebar")
  const menuItems = menu.map((item)=>{
    return item.toLowerCase()
  }) 


  return(  
    <>
      <div className="side-menu">
          <Link to='#' onClick={()=>chosenItem("0")} className='side-menu-links'>
            <div className='text-lg  '>
                <MdSpaceDashboard   className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Dashboard</p>
            </div>
          </Link>

          <Link to='#profile' onClick={()=>chosenItem("1")} className='side-menu-links'>
            <div className='text-lg '>
              <HiUserCircle    className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
              <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Profile</p>
            </div>
          </Link>

          <Link to="#companies"  onClick={()=>chosenItem("2")} className='side-menu-links'>
            <div className='text-lg '>              
                <HiUserGroup   className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Companies</p>
            </div>
          </Link>
          {/* <Link to='#announcements' onClick={()=>chosenItem("3")} className='side-menu-links'>
            <div className='text-lg '>              
                <BiNotification    className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Announcements</p>
            </div>
          </Link> */}
          {/* <Link to='/logout' className=' mt-auto side-menu-links' >
            <div className='text-lg'>
                <FaSignOutAlt  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-base font-semibold'/>
                <p className='hidden sm:inline-block sm:text-sm md:text-base font-semibold'>Logout</p>
          </div>
          </Link> */}
      </div>


      <div className="flex justify-between">
        
        <div className="hidden md:flex items-center space-x-1 ">
     {/* min-h-screen align-middle w-80 p-5 px-16 bg-violet-300 "> */}
        {/* <div className=' transition duration-300'>
            <MenuItem menuitem='Dashboard'/>
            {titles.map( title => <MenuItem key={c++} menuitem={title}/> ) }

        </div> */}
        <div>
          
					
				</div>
			</div>
    
        </div>
    
    </>
  )
}

export default ScholarSidebar
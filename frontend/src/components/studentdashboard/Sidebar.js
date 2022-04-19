import React, { useEffect } from 'react'
import { UserContext } from '../../App'
import Dashboard from './ScholarDashboard'
import MenuItem from './MenuItem'
import { Link } from 'react-router-dom'
import {MdSpaceDashboard} from 'react-icons/md'
import {BiNotification} from 'react-icons/bi'
import {HiUserGroup,HiUserCircle} from 'react-icons/hi'
import {FaUserGraduate} from 'react-icons/fa'

const  Sidebar= ({menu}) => {
  console.log("2 insideSidebar")
  const menuItems = menu.map((item)=>{
    return item.toLowerCase()
  }) 


  useEffect(()=>{
    const responsive=()=>{
    const btn = document.querySelector("button.mobile-menu-button");
				const menu = document.querySelector(".mobile-menu");

				btn.addEventListener("click", () => {
					menu.classList.toggle("hidden");
				});
  }},[])
   
    console.log("menuItems:: "+ menuItems)
    console.log("menu:: "+ menu)
  return(  

    <>
      <div className=' h-full py-10 px-2 flex-col justify-start text-white border-2 border-emerald-600'>
          <div className=' text-lg my-8'>
            <Link to='/dashboard/companies' className='sm:px-8' >
              <MdSpaceDashboard className='inline-block mb-1'/><p className='hidden sm:inline-block'>Dashboard</p>
            </Link>
          </div>

          <div className='text-lg my-8'>
            <Link to='/dashboard/profile' className='sm:px-8 '>
            <HiUserCircle  className='inline-block mb-1 text-xl'/><p className='hidden sm:inline-block'>Profile</p>
            </Link>
          </div>
          <div className='text-lg my-8'>
            <Link to='/dashboard/companies' className='sm:px-8'>
            <HiUserGroup  className='inline-block mb-1 text-xl'/><p className='hidden sm:inline-block'>Companies</p>
            </Link>
          </div>
          <div className='text-lg my-8'>
            <Link to='/dashboard/scholars' className='sm:px-8'>
            <FaUserGraduate  className='inline-block mb-1 text-xl'/><p className='hidden sm:inline-block'>Scholars</p>
            </Link>
          </div>
          <div className='text-lg my-8'>
            <Link to='/dashboard/notification' className='sm:px-8'>
            <BiNotification  className='inline-block mb-1 text-xl'/><p className='hidden sm:inline-block'>Notification</p>
            </Link>
          </div>
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
	
			<div className="hidden mobile-menu">
				<ul className="">
					<li className="active"><a href="index.html" className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
					<li><a href="#services" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
					<li><a href="#about" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
					<li><a href="#contact" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
				</ul>
			</div>
		
    
        </div>
    
    </>
  )
}

export default Sidebar
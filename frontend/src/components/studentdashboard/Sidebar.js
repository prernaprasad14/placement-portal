import React, { useEffect } from 'react'
import logo from "../../img/logo.png"
import { UserContext } from '../../App'
import Dashboard from './ScholarDashboard'
import MenuItem from './MenuItem'
import {Link } from 'react-router-dom'
import {MdSpaceDashboard} from 'react-icons/md'
import {BiNotification} from 'react-icons/bi'
import {HiUserGroup,HiUserCircle} from 'react-icons/hi'
import {FaUserGraduate,FaSignOutAlt} from 'react-icons/fa'

const  Sidebar= ({menu,chosenItem}) => {
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
      <div className='mr-7 py-8 flex flex-col justify-start gap-y-2 text-white '>
          <div className=' text-lg my-4 '>
            <button href='#companies' className='sm:px-6 hover:text-purple-700' onClick={()=>chosenItem("0")}>
              <MdSpaceDashboard className='inline-block mb-1 mx-2 sm:text-sm md:text-lg'/><p className='hidden sm:inline-block sm:text-sm md:text-lg'>Dashboard</p>
            </button>
          </div>

          <div className='text-lg my-4'>
            <button className='sm:px-6 hover:text-purple-700'  onClick={()=>chosenItem("1")}>
            <HiUserCircle  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-xl'/><p className='hidden sm:inline-block sm:text-sm md:text-lg'>Profile</p>
            </button>
          </div>
          <div className='text-lg my-4'>
            <button  className='sm:px-6 hover:text-purple-700'  onClick={()=>chosenItem("2")}>
            <HiUserGroup  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-lg'/><p className='hidden sm:inline-block sm:text-sm md:text-lg'>Companies</p>
            </button>
          </div>
          <div className='text-lg my-4'>
            <button  className='sm:px-6 hover:text-purple-700'  onClick={()=>chosenItem("3")}>
            <FaUserGraduate  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-lg'/><p className='hidden sm:inline-block sm:text-sm md:text-lg'>Scholars</p>
            </button>
          </div>
          <div className='text-lg my-4'>
            <button className='sm:px-6 hover:text-purple-700'  onClick={()=>chosenItem("4")}>
            <BiNotification  className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-lg'/><p className='hidden sm:inline-block sm:text-sm md:text-lg'>Notifications</p>
            </button>
          </div>
          <div className='text-lg mt-auto'>
            <Link to='/logout' className='sm:px-6 hover:text-purple-700'>
            <FaSignOutAlt className='inline-block text-xl mb-1 mx-2 sm:text-sm md:text-lg'/><p className='hidden sm:inline-block sm:text-sm md:text-lg'>Logout</p>
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
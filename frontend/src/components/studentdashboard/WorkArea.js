import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Item from './Item'
import CreateUser from './CreateUser'
import Sidebar from './Sidebar'
import Scholars from './Scholars'
import Companies from './Companies'
const  WorkArea = ({companies, scholars}) => {
  console.log("3 inside workarea")
  const sidemenu=()=>{
    console.log("inside side menu")
  }
  return(  
    <>  
        <div className='flex'>
          {/* <button className='bg-emerald-600 hover:bg-green-400  inline-block rounded m-auto px-4 py-2 text-white font-300'><Link to ='dashboard/create-user'>CreateUser</Link></button> */}
          <div className='hidden w-0 md:flex sm:w-1/6  bg-purple-200'>
            <Sidebar menu={['Profile', 'Scholars', 'Companies', 'Notifications']} />
            {/* <Sidebar menu={['Profile', 'Companies', 'Notifications']} />
            <Sidebar menu={['Profile', 'Scholars', 'Notifications']} /> */}
          </div>
          
          <div className='inline-block sm:hidden' onClick={sidemenu}>
              <button className="outline-none ">
              <svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              </button>
              <div id='responsive-menu'>
              <ul className='hidden'>
                <li>Profile</li>
                <li>Scholars</li>
                <li>Companies</li>
                <li>Notifications</li>
              </ul>
            </div>
     
            </div>
          <div className='w-full sm:w-5/6'>
            <CreateUser/>
            <Scholars data={scholars}/>
            <Companies data={companies}/>
          </div>
        </div>
     </>
   )
 }

export default WorkArea



import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import WorkArea from './WorkArea'

import CreateUser from './CreateUser'
const  Dashboard = () => {
  console.log("1 inside Dashboard")
  
  return(  
    <>
    <div>
        <ul className=''>
            <li className='item bg-orange-400'><Link to="/dashboard">Dashboard</Link></li>    
            <li className='item'><Link to="/dashboard/profile">Profile</Link></li>    
            <li className='item'><Link to="/dashboard/scholar">Scholars</Link></li>    
            <li className='item'><Link to="/dashboard/companies">Companies</Link></li>    
            <li className='item'><Link to="/dashboard/notifications">Notifications</Link></li>    
        </ul>
    </div>
    <div className='flex '>
      <div className='w-1/6'>

        <Sidebar className="bg-pink-200"/>
       
      </div>
      <div className='w-5/6'>
       
        <WorkArea/>
      </div>
      

    </div>
  
     </>
   )
 }

export default Dashboard
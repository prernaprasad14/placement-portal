import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import WorkArea from './WorkArea'

import CreateUser from './CreateUser'
const  Dashboard = () => {

  
  return(  
    <>
    <div>
        <ul>
            <li className='item'><Link to="/dashboard">Dashboard</Link></li>    
            <li className='item'><Link to="/dashboard/profile">Profile</Link></li>    
            <li className='item'><Link to="/dashboard/scholar">Scholars</Link></li>    
            <li className='item'><Link to="/dashboard/companies">Companies</Link></li>    
            <li className='item'><Link to="/dashboard/notifications">Notifications</Link></li>    
        </ul>
    </div>
    <div className='flex '>
      <div>

        <Sidebar/>
       
      </div>
      <div>
       
        <WorkArea/>
      </div>
      

    </div>
  
     </>
   )
 }

export default Dashboard
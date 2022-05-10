import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateUser from './CreateUser'
import AdminProfile from './AdminProfile'
import AdminSidebar from './AdminSidebar'
import Scholars from '../dashboard-partials/Scholars'
import Companies from '../dashboard-partials/Companies'
import {MdSpaceDashboard} from 'react-icons/md'
import {BiNotification} from 'react-icons/bi'
import {HiUserGroup,HiUserCircle} from 'react-icons/hi'
import {FaUserGraduate,FaSignOutAlt} from 'react-icons/fa'
import {TiThMenu} from 'react-icons/ti'



const  AdminWorkArea = ({companies, scholars}) => {
  console.log("3 inside workarea")
  const [choice , setChoice] = useState('0')
  const responsive= useRef()
  console.log(choice+"choice")
  var c=0;
  const [isActive, setActive] = useState(false);
  const sidemenu=()=>{
    setActive(!isActive);
  };
 

  const ChosenItem=({option})=>{
   console.log(option+"option")
   setChoice(option)
   switch(option){
      case '0' : return( <><AdminProfile/></>)
      
      case '1' : return( <><AdminProfile/></>)
      
      case '2' : return <Companies data={companies}/>
      
      case '3' : return<Scholars  data={scholars}/>
      // case '4' : return <><Notifications/></>
      case '5' : return<CreateUser/>
  
    default :  return <><AdminProfile/></>
  }
  }
  useEffect(()=>{

  },[])
  
  return(  
    <>  
        <div className='flex-col sm:flex-row flex sm:flex'>
          <div className=' hidden sm:flex top-left sm:h-screen' >
            <AdminSidebar menu={['Profile', 'Scholars', 'Companies', 'Notifications']} chosenItem={setChoice} />
          </div>
          <div className='sm:hidden block bg-violet-900' >
              <button className=" outline-none "  onClick={sidemenu}>
              
              <TiThMenu  className="p-1 m-1 w-10 h-10 active:border-2 active:border-white active:rounded-md text-indigo-200  active:text-white "/>
              </button>
              <div ref={responsive} id='responsive-menu' className={isActive ? 'block  ml-[-30px] ': 'hidden'}>
                <ul className='w-screen'>
                  <Link to="#">
                    <button onClick={()=>setChoice('0')}>
                      <li className='px-6 py-2 font-semibold '>
                        <MdSpaceDashboard className='inline-block mr-2'/>Dashboard
                      </li>
                    </button>
                  </Link>
                  <Link to="#profile" className='block'>
                    <button onClick={()=>setChoice('1')}><li className='px-6 py-2 font-semibold '>
                        <HiUserCircle  className='inline-block mr-2'/>Profile
                      </li>
                    </button>
                  </Link>
                  <Link to="#companies" className='block'>
                    <button onClick={()=>setChoice('2')}>
                      <li className='px-6 py-2 font-semibold '>
                        <HiUserGroup  className='inline-block mr-2'/>Companies
                      </li>
                    </button>
                  </Link>
                  <Link to="#scholars" className='block'>
                    <button onClick={()=>setChoice('3')}>
                      <li className='block px-6 py-2 font-semibold '>
                        <FaUserGraduate  className='inline-block mr-2'/>Scholars
                      </li>
                    </button>
                  </Link>
                  <Link to="#notifications" className='block'>
                    <button onClick={()=>setChoice('4')}>
                      <li className='block px-6 py-2 font-semibold '>
                        <BiNotification  className='inline-block mr-2'/>Notifications
                      </li>
                    </button>
                  </Link>
                  <Link to="#notifications" className='block'>
                    <button onClick={()=>setChoice('5')}>
                      <li className='block px-6 py-2 font-semibold '>
                        <BiNotification  className='inline-block mr-2'/>Manage Users
                      </li>
                    </button>
                  </Link>
                </ul>
              </div>
            </div>
            <div className='relative flex flex-col w-full sm:w-5/6 bg-slate-100'>
              {/* {(option)=>chosenItem(option)} */}
              <ChosenItem option={choice}/>
              {/* <CreateUser/>
              <Scholars data={scholars}/>
              <Companies data={companies}/> */}
            </div>
         </div>
     </>
   )
 }

export default AdminWorkArea




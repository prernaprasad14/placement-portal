import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Item from './Item'
import CreateUser from '../admin-dashboard/CreateUser'
import StudentProfile from '../studentdashboard/scholar-profile/ScholarProfile'
import CompanyProfile from '../companydashboard/CompanyProfile'
// import AdminProfile from '../admin-dashboard/AdminProfile'
import ScholarSidebar from './ScholarSidebar'
import Companies from '../dashboard-partials/Companies'
import {MdSpaceDashboard} from 'react-icons/md'
import {BiNotification} from 'react-icons/bi'
import {HiUserGroup,HiUserCircle} from 'react-icons/hi'
import {FaUserGraduate,FaSignOutAlt} from 'react-icons/fa'
import {TiThMenu} from 'react-icons/ti'



const  WorkArea = ({companies, scholar}) => {
  console.log("3 inside workarea")

  const [choice , setChoice] = useState('0')
  const responsive= useRef()
  console.log(choice+"choice")
  var c=0;
  const [isActive, setActive] = useState(false);
  const sidemenu=()=>{
    // responsive.current.style.transitionProperty='all 2s'
    // responsive.current.style.transitionDurataion='75s'
    // responsive.current.style.transitionTimingFunction='ease-in-out'
    setActive(!isActive);
  };
 

  const ChosenItem=({option})=>{
    console.log(option+"option")
   setChoice(option)
   switch(option){
    case '0' :   return(<><StudentProfile data={scholar}/></>)
    case '1' : {
                  console.log("companiesData"+companies)
                  return <Companies data={companies}/>
              }
    // case '2' : return <><Notifications/></>

    default:  return <StudentProfile data={scholar}/>
  }
  }
  useEffect(()=>{

  },[])
  
  return(  
    <>  
        <div className='flex-col sm:flex-row flex sm:flex'>
          <div className=' hidden sm:flex top-left sm:h-screen' >
            <ScholarSidebar menu={['Profile', 'Companies', 'Notifications']} chosenItem={setChoice}/>
          </div>
          <div className='sm:hidden block bg-violet-900' >
              <button className=" outline-none "  onClick={sidemenu}>
              
              <TiThMenu  className="p-1 m-1 w-10 h-10 active:border-2 active:border-white active:rounded-md text-indigo-200  active:text-white "/>
              </button>
              <div ref={responsive} id='responsive-menu' className={isActive ? 'block  ml-[-30px] ': 'hidden'}>
                <ul className='w-screen'>
                  <Link to="#">
                    <button onClick={()=>setChoice('5')}>
                      <li className='px-6 py-2 font-semibold '>
                        <MdSpaceDashboard className='inline-block mr-2'/>Dashboard
                      </li>
                    </button>
                  </Link>
                  <Link to="#profile" className='block'>
                    <button onClick={()=>setChoice('0')}><li className='px-6 py-2 font-semibold '>
                        <HiUserCircle  className='inline-block mr-2'/>Profile
                      </li>
                    </button>
                  </Link>
                  <Link to="#companies" className='block'>
                    <button onClick={()=>setChoice('1')}>
                      <li className='px-6 py-2 font-semibold '>
                        <HiUserGroup  className='inline-block mr-2'/>Companies
                      </li>
                    </button>
                  </Link>
                  <Link to="#notifications" className='block'>
                    <button onClick={()=>setChoice('2 ')}>
                      <li className='block px-6 py-2 font-semibold '>
                        <BiNotification  className='inline-block mr-2'/>Notifications
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

export default WorkArea




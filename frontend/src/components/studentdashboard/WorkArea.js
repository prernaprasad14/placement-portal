import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Item from './Item'
import CreateUser from './CreateUser'
import StudentProfile from '../studentdashboard/scholar-profile/ScholarProfile'
import Sidebar from './Sidebar'
import Scholars from './Scholars'
import Companies from './Companies'
import {MdSpaceDashboard} from 'react-icons/md'
import {BiNotification} from 'react-icons/bi'
import {HiUserGroup,HiUserCircle} from 'react-icons/hi'
import {FaUserGraduate,FaSignOutAlt} from 'react-icons/fa'



const  WorkArea = ({companies, scholars}) => {
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
    // case '0' :  component= <StudentProfile/>
    // case '1' : component=  <><StudentProfile/>
    case '2' : {console.log("companiesData"+companies)
    return <Companies data={companies}/>
    
  }
    case '3' :  {console.log("companiesData"+companies)
     return<Scholars  data={scholars}/>}
    // case '4' : return <><Notifications/></>
    default:  return <Companies  data={companies}/>
  }
  }
  useEffect(()=>{

  },[])
  
  return(  
    <>  
        <div className='relative sm:flex'>
          <div className='h-screen sticky sm:relative hidden sm:flex  sm:bg-sky-500 ' >
            <Sidebar menu={['Profile', 'Scholars', 'Companies', 'Notifications']} chosenItem={setChoice} />
            {/* <Sidebar menu={['Profile', 'Companies', 'Notifications']} /> */}
            {/* <Sidebar menu={['Profile', 'Scholars', 'Notifications']} /> */}
          </div>
          <div className='sm:hidden flex' >
              
              <button className="  outline-none flex-col sm:flex-row"  onClick={sidemenu}>
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
              <div ref={responsive} id='responsive-menu' className={isActive ? 'block mt-4 ml-[-30px] ': 'hidden'}>
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
                </ul>
              </div>
            </div>
            <div className='block sm:inline-block w-full sm:w-5/6 border-5 bg-slate-500'>
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




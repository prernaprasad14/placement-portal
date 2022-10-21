import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StudentProfile from './scholar-profile/ScholarProfile'
import ScholarSidebar from './ScholarSidebar'
import Companies from '../dashboard-partials/Companies'
import {MdSpaceDashboard} from 'react-icons/md'
import {HiUserGroup,HiUserCircle} from 'react-icons/hi'
import {TiThMenu} from 'react-icons/ti'
import WelcomeScreen from '../dashboard-partials/WelcomeScreen'


const  WorkArea = () => {


  const [choice , setChoice] = useState('0')
  const responsive= useRef()
  const [isActive, setActive] = useState(false);
  const sidemenu=() => {
    // responsive.current.style.transitionProperty='all 2s'
    // responsive.current.style.transitionDurataion='75s'
    // responsive.current.style.transitionTimingFunction='ease-in-out'
    setActive(!isActive);
  };
 

  const ChosenItem=({option}) => {
    setChoice(option)
    switch(option){
      case '0' :  return <WelcomeScreen/>
      case '1' :  return <StudentProfile /> 
      case '2' :  return <Companies/>
      // case '3' : return <><Announcements/></>
      default  :  return <WelcomeScreen/>
    }
  }

  useEffect(() => {
    window.scrollTo(0,0);
    console.log("Inside ScholarWorkarea")
  },[])
  
  return(  
    <>  
        <div className='flex-col lg:flex-row flex'>
        <div className=' hidden lg:flex top-left md:h-screen' >
            <ScholarSidebar menu={['Profile', 'Companies']} chosenItem={setChoice}/>
          </div>
          <div className='lg:hidden block mb-1 bg-[#494949]' >
              <button className=" outline-none "  onClick={sidemenu}>
                <TiThMenu  className="p-1 m-2 w-7 h-7 active:rounded-md text-white focus:border-2 focus:border-white  active:border-2 active:border-white "/>
              </button>
              <div ref={responsive} id='responsive-menu' className={isActive ? 'block  ml-[-30px] ': 'hidden'}>
                <ul className='w-screen'>
                  <Link to="#">
                    <button onClick={() => {setChoice('0'); setActive(!isActive)}}>
                      <li className='px-6 py-2 font-semibold '>
                        <MdSpaceDashboard className='inline-block mr-2'/>Dashboard
                      </li>
                    </button>
                  </Link>
                  <Link to="#profile" className='block'>
                    <button onClick={() => {setChoice('1'); setActive(!isActive)}}><li className='px-6 py-2 font-semibold '>
                        <HiUserCircle  className='inline-block mr-2'/>Profile
                      </li>
                    </button>
                  </Link>
                  <Link to="#companies" className='block'>
                    <button onClick={() => {setChoice('2'); setActive(!isActive)}}>
                      <li className='px-6 py-2 font-semibold '>
                        <HiUserGroup  className='inline-block mr-2'/>Companies
                      </li>
                    </button>
                  </Link>
                  {/* <Link to="#announcements" className='block'>
                    <button onClick={() => {setChoice('3'); setActive(!isActive)}}>
                      <li className='block px-6 py-2 font-semibold '>
                        <BiNotification  className='inline-block mr-2'/>Announcements
                      </li>
                    </button>
                  </Link> */}
                </ul>
              </div>
            </div>
            <div className='relative flex flex-col w-full lg:w-5/6 bg-slate-100'>
              <ChosenItem option={choice}/>
            </div>
         </div>
     </>
   )
 }

export default WorkArea




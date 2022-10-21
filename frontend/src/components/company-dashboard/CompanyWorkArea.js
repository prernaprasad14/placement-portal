import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CompanyProfile from './CompanyProfile'
import CompanySidebar from './CompanySidebar'
import Scholars from '../dashboard-partials/Scholars'
import {BiNotification} from 'react-icons/bi'
import {MdSpaceDashboard} from 'react-icons/md'
import {HiUserGroup,HiUserCircle} from 'react-icons/hi'
import {FaUserGraduate,FaSignOutAlt} from 'react-icons/fa'
import {TiThMenu} from 'react-icons/ti'
import WelcomeScreen from '../dashboard-partials/WelcomeScreen'



const  CompanyWorkArea = () => {
  const [choice , setChoice] = useState('0')
  const responsive= useRef()
  var c=0;
  const [isActive, setActive] = useState(false);
  const sidemenu=()=>{
    setActive(!isActive);
  };
 

  const ChosenItem=({option})=>{
    console.log("option",option)
   setChoice(option)
   switch(option){
    case '0' :  return <WelcomeScreen/>
    case '1' :  return <CompanyProfile/> 
    case '2' :  return <Scholars/>
    // case '3' : return <><Announcements/></>
  
    default  :  return <WelcomeScreen/>
  }
  }
  useEffect(()=>{
    console.log("Inside CompanyWorkarea")
    console.log(choice+"choice")
  
  },[])
  
  return(  
    <>  
        <div className='flex-col lg:flex-row flex'>
        <div className=' hidden lg:flex top-left md:h-screen' >
            <CompanySidebar menu={['Profile', 'Scholars'] } chosenItem={setChoice} />
          </div>
          <div className='lg:hidden block bg-[#494949]' >
              <button className=""  onClick={sidemenu}>
                <TiThMenu  className="p-1 m-2 w-7 h-7 active:rounded-md text-white focus:border-2 focus:border-white  active:border-2 active:border-white "/>
              </button>
              <div ref={responsive} id='responsive-menu' className={isActive ? 'block  ml-[-30px] ': 'hidden'}>
                <ul className='w-screen'>
                  <Link to="#dashboard">
                    <button onClick={()=>{setChoice('0'); setActive(!isActive)}}>
                      <li className='px-6 py-2 font-semibold '>
                        <MdSpaceDashboard className='inline-block mr-2'/>Dashboard
                      </li>
                    </button>
                  </Link>
                  <Link to="#profile" className='block'>
                    <button onClick={()=>{setChoice('1'); setActive(!isActive)}}>
                      <li className='px-6 py-2 font-semibold '>
                        <HiUserCircle  className='inline-block mr-2'/>Profile
                      </li>
                    </button>
                  </Link>
                  <Link to="#scholars" className='block'>
                    <button onClick={()=>{setChoice('2'); setActive(!isActive)}}>
                      <li className='block px-6 py-2 font-semibold '>
                        <FaUserGraduate  className='inline-block mr-2'/>Scholars
                      </li>
                    </button>
                  </Link>
                  {/* <Link to="#announcements" className='block'>
                    <button onClick={()=>{setChoice('3'); setActive(!isActive)}}>
                      <li className='block px-6 py-2 font-semibold '>
                        <BiNotification  className='inline-block mr-2'/>Announcements
                      </li>
                    </button>
                  </Link> */}
                </ul>
              </div>
            </div>
            <div className='relative flex flex-col w-full lg:w-5/6 bg-slate-100'>
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

export default CompanyWorkArea




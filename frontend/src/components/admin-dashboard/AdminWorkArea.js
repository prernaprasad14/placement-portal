import React, { useRef, useEffect, useState } from 'react'
import ManageUsers from './ManageUsers'
import ManageBrochures from './ManageBrochures'
import AdminProfile from './AdminProfile'
import AdminSidebar from './AdminSidebar'
import Scholars from '../dashboard-partials/Scholars'
import Companies from '../dashboard-partials/Companies'
import {MdSpaceDashboard} from 'react-icons/md'
import {HiUserGroup,HiUserCircle ,HiDocumentDuplicate} from 'react-icons/hi'
import {FaUserGraduate,FaUserPlus } from 'react-icons/fa'
import {TiThMenu} from 'react-icons/ti'
import {CgOrganisation} from 'react-icons/cg'
import WelcomeScreen from '../dashboard-partials/WelcomeScreen'



const  AdminWorkArea = () => {

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
  //  setChoice(option)
   switch(option){
      case '0' : return( <><WelcomeScreen/></>)
      
      case '1' : return( <><AdminProfile/></>)
      
      case '2' : return <Companies/>
      
      case '3' : return <Scholars/>
      // case '4' : return <><Announcements/></>
      case '5' : return(<ManageUsers/>)
      case '6' : return(<ManageBrochures/>)
  
    default :  return(<><WelcomeScreen/></>)
  }
  }
  
  useEffect(()=>{
    console.log("Inside AdminWorkarea")

  },[])
  
  return(  
    <>  
        <div className='flex-col lg:flex-row flex '>
          <div className=' hidden lg:flex top-left md:h-screen' >
            <AdminSidebar menu={['Profile', 'Scholars', 'Companies']} chosenItem={setChoice} />
          </div>
          <div className='lg:hidden block bg-[#494949]' >
              <button className=" outline-none "  onClick={sidemenu}>
                <TiThMenu  className="p-1 m-2 w-7 h-7 active:rounded-md text-white focus:border-2 focus:border-white  active:border-2 active:border-white "/>
              </button>
              <div ref={responsive} id='responsive-menu' className={isActive ? 'block  ml-[-30px] ': 'hidden'}>
                <ul className='w-screen'>
                  {/* <Link to="#"> */}
                    <button onClick={()=>setChoice('0')}>
                      <li className='px-6 py-2 font-semibold '>
                        <MdSpaceDashboard className='inline-block mr-2'/>Dashboard
                      </li>
                    </button>
                  {/* </Link> */}
                  
                  {/* <Link to="#companies" className='block'> */}
                    <button onClick={()=>{setChoice('2'); setActive(!isActive)}}>
                      <li className='px-6 py-2 font-semibold '>
                        <CgOrganisation  className='inline-block mr-2'/>Companies
                      </li>
                    </button>
                  {/* </Link> */}
                  {/* <Link to="#scholars" className='block'> */}
                    <button onClick={()=>{setChoice('3'); setActive(!isActive)}}>
                      <li className='block px-6 py-2 font-semibold '>
                        <FaUserGraduate  className='inline-block mr-2'/>Scholars
                      </li>
                    </button>
                  {/* </Link>
                  <Link to="#announcements" className='block'> */}
                    {/* <button onClick={()=>{setChoice('4'); setActive(!isActive)}}>
                      <li className='block px-6 py-2 font-semibold '>
                        <BiNotification  className='inline-block mr-2'/>Announcements
                      </li>
                    </button> */}
                  {/* </Link>
                  <Link to="#manage-users" className='block'> */}
                    <button onClick={()=>{setChoice('5'); setActive(!isActive)}}>
                      <li className='block px-6 py-2 font-semibold '>
                        <FaUserPlus   className='inline-block mr-2'/>Manage Users
                      </li>
                    </button>
                  {/* </Link> */}
                  {/* <Link to="#manage-users" className='block'> */}
                    <button onClick={()=>{setChoice('6'); setActive(!isActive)}}>
                      <li className='block px-6 py-2 font-semibold '>
                        <HiDocumentDuplicate  className='inline-block mr-2'/>Manage Brochures
                      </li>
                    </button>
                  {/* </Link> */}
                  {/* <Link to="#profile" className='block'> */}
                  <button onClick={()=>{setChoice('1'); setActive(!isActive)}}><li className='px-6 py-2 font-semibold '>
                        <HiUserCircle  className='inline-block mr-2'/>Profile
                      </li>
                    </button>
                  {/* </Link> */}
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

export default AdminWorkArea




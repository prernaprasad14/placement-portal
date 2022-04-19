import React, { Profiler, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Item from './Item'
import CreateUser from './CreateUser'
import StudentProfile from '../studentdashboard/scholar-profile/ScholarProfile'
import Sidebar from './Sidebar'
import Scholars from './Scholars'
import Companies from './Companies'
const  WorkArea = ({companies, scholars}) => {
  console.log("3 inside workarea")
  const [choice , setChoice] = useState('0')
  console.log(choice+"choice")
  const sidemenu=()=>{
    console.log("inside side menu")
  }
  const ChosenItem=({option})=>{
    console.log(option+"option")
   setChoice(option)
   switch(option){
    // case '0' :  component= <StudentProfile/>
    // case '1' : component=  <><StudentProfile/>
    case '2' : {console.log("companiesData"+companies)
    return <Companies data={companies}/>
    
  }
    case '3' :   return<Scholars  data={scholars}/>
    // case '4' : return <><Notifications/></>
    default:  return <Companies  data={companies}/>
  }
  }
  useEffect(()=>{

  },[])
  
  return(  
    <>  
        <div className='relative flex'>
          <div className='h-screen sticky sm:relative hidden sm:flex  sm:bg-sky-500 ' >
            <Sidebar menu={['Profile', 'Scholars', 'Companies', 'Notifications']} chosenItem={setChoice} />
            {/* <Sidebar menu={['Profile', 'Companies', 'Notifications']} /> */}
            {/* <Sidebar menu={['Profile', 'Scholars', 'Notifications']} /> */}
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
          <div className='w-full sm:w-5/6 border-5 bg-slate-500'>
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




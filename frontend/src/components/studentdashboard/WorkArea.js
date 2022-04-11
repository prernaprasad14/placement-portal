import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Item from './Item'
import CreateUser from './CreateUser'
import Table from './ScholarTable'
import Scholars from './Scholars'
import Companies from './Companies'
const  WorkArea = () => {
  console.log("3 inside workarea")

  return(  
    <>  
        <div className='h-full bg-violet-200 '>
          <p>workspace</p>
          {/* <button className='bg-emerald-600 hover:bg-green-400  inline-block rounded m-auto px-4 py-2 text-white font-300'><Link to ='dashboard/create-user'>CreateUser</Link></button> */}
          <CreateUser/>
          <Scholars/>
          <Companies/>
          <Item/>
        </div>
     </>
   )
 }

export default WorkArea
import React, { useEffect } from 'react'
import Item from './Item'
import CreateUser from './CreateUser'
import Table from './Table'
import Scholars from './Scholars'
const  WorkArea = () => {
  console.log("3 inside workarea")

  return(  
    <>  
        <div className='h-full bg-violet-200 '>
          <p>workspace</p>
          <CreateUser/>
          <Scholars/>
          <Item/>
        </div>
     </>
   )
 }

export default WorkArea
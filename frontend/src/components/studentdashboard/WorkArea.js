import React, { useEffect } from 'react'
import Item from './Item'
import CreateUser from './CreateUser'
const  WorkArea = () => {
 

  return(  
    <>  
        <div className='h-full bg-violet-200 w-screen'>
          <p>workspace</p>
          <CreateUser/>
          <Item/>
        </div>
     </>
   )
 }

export default WorkArea
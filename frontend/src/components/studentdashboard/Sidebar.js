import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../App'
import Dashboard from './Dashboard'
import MenuItem from './MenuItem'

const  Sidebar= () => {
  console.log("2 insideSidebar")
  // const {state, dispatch} = useContext(UserContext)
  // useEffect(()=>{
  //   dispatch({type:"admin", payload:true})
  // },[])
  var c= 1
    const titles = ['Profile', 'Scholars', 'Companies', 'Notifications']
  return(  
    <>
    <div className="flex min-h-screen align-middle w-80 p-5 px-16 bg-violet-300 ">
        <div className=''>
            <MenuItem menuitem='Dashboard'/>
            {titles.map( title => <MenuItem key={c++} menuitem={title}/> ) }

        </div>
        <div>
        </div>
      
    </div>
    
    </>
  )
}

export default Sidebar
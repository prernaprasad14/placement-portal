import axios from '../../axiosConfig'
import React, { useEffect } from 'react'

const  Item= ({title,val}) => {

 console.log("5 inside Item")
  return(  
    <>  
        <div className="flex px-3 my-1 border-2 rounder-sm bg-white w-78">
              <div className=" justify-start px-3 my-1 border-2 bg-indigo-200 "><p>{title}</p></div>
              <div className="justify-end px-3 my-1 border-2 bg-rose-200"><p>{val}</p></div>
        </div>
     </>
   )
 }

export default Item
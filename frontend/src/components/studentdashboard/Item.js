import axios from '../../axiosConfig'
import React, { useEffect } from 'react'

const  Item= () => {
 function getData(){
    const data = axios.get('/student')
 }
 console.log("5 inside Item")
  return(  
    <>  
        <div className='bg-orange-400 '>
          <p>Component</p>
        </div>
     </>
   )
 }

export default Item
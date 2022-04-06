import axios from '../../axiosConfig'
import React, { useEffect } from 'react'

const  Item= () => {
 function getData(){
    const data = axios.get('/student')
 }
  return(  
    <>  
        <div className='bg-orange-400 w-screen'>
          <p>Hello </p>
          {/* {data.map(data=>{
              <Item data={data}/>
          })} */}

        </div>
     </>
   )
 }

export default Item
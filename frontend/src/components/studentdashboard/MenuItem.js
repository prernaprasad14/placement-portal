import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const  MenuItem = ({menuitem}) => {
 
    const link = menuitem.toLowerCase()

  

    return(  
        <>
            <div className='py-10 px-5 flex justify-start text-white  border-2 border-emerald-600'>
                <Link to={link} ><p className=''>{menuitem}</p></Link>
            </div>
        </>
    )
}
export default MenuItem
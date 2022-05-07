import React from 'react'

const Card=({src ,name, content, batch} )=> {

    return(
        <>
            <div className='border-t-[30px] rounded-md border-violet-300  bg-white flex drop-shadow-md flex-col items-center m-2 w-56'>
                <div className='relative border-t-2 border-r-2 mt-[-23px] p-2 bg-gray-100 border-gray-200 rounded drop-shadow-sm  w-2 h-2'></div>
                <img className="rounded-md m-3 " width="110px" height="auto" src={src}/>
                <h1>{name}</h1>
                <h6 className='px-2 m-2 text-[12px] font-semibold'>{content}</h6>
                <p className='px-2 m-2 text-[12px] font-semibold'>{batch}</p>
            </div>

        </>
    )
    
  
}
export default Card

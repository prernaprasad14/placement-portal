import {useNavigate, Routes, Route, Link} from 'react-router-dom';
import React from 'react';


export default function Footer (){
        const date= new Date();
        const year = date.getFullYear() 

        return (<>
            <footer className='h-40 mt-auto flex flex-col-reverse justify-end items-center bg-[#6F42A2] pt-7 text-white'>
               <p>Placement Portal {year}</p> 
               <p>Department of Computer Science</p>
                <p><a href='http://www.cs.du.ac.in/' className='no-underline hover:caret-white'>University of Delhi</a></p><br/>
            </footer>
            </>
            //   <>
            //   <footer className='text-xs h-25 pb-2 flex flex-col-reverse justify-end items-center bg-[#6F42A2] pt-2 text-white'>
            //       <p>Placement Portal {year}</p> 
            //       <p>Department of Computer Science</p>
            //       <p><a href='http://www.du.ac.in/' className='no-underline'>University of Delhi</a></p><br/>
            //   </footer>
            //   </>
        )
}
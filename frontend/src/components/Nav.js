import React, { useContext, useEffect} from 'react'
import logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import { HashLink } from 'react-router-hash-link'
import axios from '../axiosConfig'

const Nav = () =>{

    const {state, dispatch}= useContext(UserContext)
    

    const RenderNav=()=>{
        useEffect(()=>{
            console.log('RenderNav : state '+state)
        },[])

        // if(state==='admin' || state==='scholar'|| state==='company')
        if(state!=='USER')
        {
            return(
                <>
                    <li className='item nav-items box-content'>
                        <Link className='hover:text-[#ffffff] md:hover:text-slate-900 text-[#ffffffd1] md:text-slate-900' to='/dashboard'>Dashboard</Link>
                    </li>
                    <li className='nav-items box-content'>
                        <HashLink to='#contact-us' className='hover:text-[#ffffff] md:hover:text-slate-900 text-[#ffffffd1] md:text-slate-900'>Contact&nbsp;us</HashLink>
                    </li>
                    <li className=' nav-items box-content '>
                        <Link  className='hover:text-[#ffffff] md:hover:text-slate-900 text-[#ffffffd1] md:text-slate-900' to='/logout'>Logout</Link>
                    </li>
                  
                    {/* <li className=' nav-items box-content '>
                        <p  className='hover:text-[#ffffff] px-2 md:hover:text-slate-900 text-[#ffffffd1] border-2 border-pink-600 md:text-slate-900'>  {state}</p>
                    </li> */}
                    
                </>
            )
        }
        return(
        <>
            <li className='nav-items box-content'>
                <HashLink to='#contact-us' className='hover:text-[#ffffff] md:hover:text-slate-900 text-[#ffffffd1] md:text-slate-900'>Contact us</HashLink>
            </li>
            <li className=' nav-items box-content'>
                <Link className='hover:text-[#ffffff] md:hover:text-slate-900 text-[#ffffffd1] md:text-slate-900' to='login'>Login</Link>
            </li>
{/*              
            <li className=' nav-items box-content '>
                <p  className='hover:text-[#ffffff] px-2 md:hover:text-slate-900 text-[#ffffffd1] border-2 border-pink-600 md:text-slate-900'>  {state}</p>
            </li> */}
        </>
        )
    }  

    return (
    <>
        <div className='user-select-none nav-container flex flex-col '>
            <ul className='navbar flex flex-col md:flex-row justify-center items-center'> 
                <li className='my-2 md:my-0 flex flex-row justify-center items-center '>
                    <Link className='hover:text-[#ffffff] active:border-2 active:rounded-md  md:hover:text-slate-900 text-[#ffffffd1] md:text-slate-900' to='/'>
                        <div className='home-link flex flex-col  sm:flex-row justify-center items-center'>
                            <div className="flex">
                                <img src={logo} width='70px' height='70px' alt='du-logo' id='logo'/>
                            </div>
                            <div className='flex flex-col text-xs lg:text-md items-center sm:items-start font-semibold'>                        
                                <h1 className=' text-lg font-semibold'>Placement&nbsp;Cell</h1>
                                <h5>Department of Computer Science</h5>
                                <h6>University of Delhi</h6>                                
                            </div>
                        </div>
                    </Link>
                </li> 
                <div className='flex flex-row'>
                    <li className=' md:ml-auto nav-items box-content'>
                        <Link className='hover:text-[#ffffff] md:hover:text-slate-900 text-[#ffffffd1] md:text-slate-900' to='brochure'>Brochure</Link>
                    </li>
                    <RenderNav />
                    {/* <li className=' border-2 border-pink-700 box-content mr-5'>
                        <p className='text-pink-700 font-bold'>{state}</p>
                    </li>  */}
                </div>
            </ul> 
        </div>

    </>
    )
}


export default Nav
import React, { useContext, useEffect } from 'react'
import logo from "../img/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import MenuItem from './studentdashboard/MenuItem'
import Sidebar from './studentdashboard/Sidebar'
import ScholarDashboard from './studentdashboard/ScholarDashboard'

const Nav = () =>{
    const {state, dispatch}= useContext(UserContext)
    
    const RenderNav=()=>{
        console.log("RenderNav : state "+state)

        if(state)
        {
            console.log("RenderNav : state "+state)
            return(
                <>
                    <li className='ml-auto  nav-hover box-content mr-5'>
                        <Link className="hover:text-black" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className=' nav-hover box-content mr-5'>
                        <Link className="hover:text-black" to="logout">Logout</Link>
                    </li>
                </>
            )
        }
        console.log("RenderNav : state "+state)
        return(
        <>
            <li className=' ml-auto   nav-hover box-content'>
                <Link className="hover:text-black" to="brochure">Brochure</Link>
            </li>
            <li className=' nav-hover box-content'>
                <Link className="hover:text-black" to="login">Login</Link>
            </li>
            <li className='item  nav-hover box-content'>
                <Link className="hover:text-black" to="company-registration">Company Register</Link>
            </li>
            <li className='item  nav-hover box-content'>
                <Link className="hover:text-black" to="scholar-registration">Scholar register</Link>
            </li>
        </>
        )
    }  

    return (
    <>
    <div className="user-select-none nav-container">
            <ul className='navItems text-md '> 
            <li className='item'>
                <Link className="hover:text-black" to="/">
                    <div className='home'>
                        <div>
                            <img src={logo} width="90px" height="90px" alt="du-logo" id="logo"/>
                        </div>
                        <div className='mt-2 text-xs font-semibold'>                        
                            <h1 className=' text-xl font-semibold'>Placement Cell</h1>
                            <h5>Department of Computer Science</h5>
                            <h6>University of Delhi</h6>                                
                        </div>
                    </div>
                </Link>
            </li> 
                <RenderNav/>
            </ul> 
            </div>

    </>
    )
}


export default Nav
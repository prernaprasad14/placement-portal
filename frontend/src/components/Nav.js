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
                    <li className='ml-auto border-transparent  border-b-4 hover:border-purple-500 box-content mr-5'>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className='border-transparent  border-b-4 hover:border-purple-500 box-content mr-5'>
                        <Link to="logout">Logout</Link>
                    </li>
                </>
            )
        }
        console.log("RenderNav : state "+state)
        return(
        <>
            <li className=' ml-auto  border-transparent  border-b-4 hover:border-purple-500 box-content'>
                <Link to="brochure">Brochure</Link>
            </li>
            <li className='border-transparent  border-b-4 hover:border-purple-500 box-content'>
                <Link to="login">Login</Link>
            </li>
            <li className='item border-transparent  border-b-4 hover:border-purple-500 box-content'>
                <Link to="company-registration">Company Register</Link>
            </li>
            <li className='item border-transparent  border-b-4 hover:border-purple-500 box-content'>
                <Link to="scholar-registration">Scholar register</Link>
            </li>
        </>
        )
    }  

    return (
    <>
    <div className="nav-container">
            <ul className='navItems text-md '> 
            <li className='item'>
                <Link to="/">
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
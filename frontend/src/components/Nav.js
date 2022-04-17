import React from 'react'
import logo from "../img/logo.png"
import { Link } from 'react-router-dom'

const Nav = () =>{
    return (
        <div className="nav-container px-8 py-2">
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
                <li className='item border-transparent  border-b-4 hover:border-purple-500 box-content'><Link to="brochure">Brochure</Link></li>    
                <li className='item border-transparent  border-b-4 hover:border-purple-500 box-content'><Link to="login">Login</Link></li>    
                <li className='item border-transparent  border-b-4 hover:border-purple-500 box-content'><Link to="logout">Logout</Link></li>    
                <li className='item border-transparent  border-b-4 hover:border-purple-500 box-content'><Link to="company-registration">Company Register</Link></li>    
                <li className='item border-transparent  border-b-4 hover:border-purple-500 box-content'><Link to="scholar-registration">Scholar register</Link></li>    
            </ul>
            
        </div>
    )
}

export default Nav
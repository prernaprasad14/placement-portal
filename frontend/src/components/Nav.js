import React from 'react'
import logo from "../img/logo.png"
import { Link } from 'react-router-dom'


const Nav = () =>{
    return (
        <div className="nav-container">
            <ul className='navItems'>
                <li className='item'>
                    <Link to="/">
                        <div className='home'>
                            <div>
                                <img src={logo} width="90px" height="90px" alt="du-logo" id="logo"/>
                            </div>
                            <div>                        
                                <h2>Placement Cell</h2>
                                <h4>Department of Computer Science</h4>
                                <h5>University of Delhi</h5>                                
                            </div>
                        </div>
                    </Link>
                </li>    
                <li className='item border-transparent  border-b-4 hover:border-[#6F42A2] box-content'><Link to="brochure">Brochure</Link></li>    
                <li className='item border-transparent  border-b-4 hover:border-[#6F42A2] box-content'><Link to="login">Login</Link></li>    
                <li className='item border-transparent  border-b-4 hover:border-[#6F42A2] box-content'><Link to="logout">Logout</Link></li>    
                <li className='item border-transparent  border-b-4 hover:border-[#6F42A2] box-content'><Link to="company-registration">Company Register</Link></li>    
                <li className='item border-transparent  border-b-4 hover:border-[#6F42A2] box-content'><Link to="scholar-registration">Scholar register</Link></li>    
            </ul>
            
        </div>
    )
}

export default Nav
import { Route , Routes} from 'react-router-dom';
import { useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router';
import {UserContext} from '../App';

function Dashboard(){
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const {state} = useContext(UserContext)
    console.log(state)
    useEffect(()=>{
        if(state==='ADMIN'){
       navigate('/dashboard/admin')
    }
    else if(state==='SCHOLAR'){
       navigate('/dashboard/scholar')
    }
    else if(state==='COMPANY'){
       navigate('/dashboard/company')
    }
    else navigate('/404-not-found')
    })
   
    return(
    <>
        <div className='dashboard'>Dashboard</div>
        
    </>
    )
}
export default Dashboard
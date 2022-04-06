import { Route , Routes} from 'react-router-dom';
import { useState} from 'react';

function Dashboard(){
    const [user, setUser] = useState()

    return(<div className='dashboard'>Dashboard</div>)
}
export default Dashboard
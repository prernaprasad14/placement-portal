import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { Component ,useState} from 'react';

const CreateUser=()=>{
    console.log("3 inside CreateUser")
    return(
        <>
        <div className='bg-emerald-500 inline-block rounded m-auto px-4 py-2 text-white font-300'>
            <button><Link to =''>Create user</Link></button>
        </div>
        </>
    )
}
export default CreateUser
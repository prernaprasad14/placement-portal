import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { Component ,useState} from 'react';

const CreateUser=()=>{
    console.log("3 inside CreateUser")
    return(
        <>
        <div>

            <label htmlFor="file-upload" className="cursor-pointer bg-red-900 hover:bg-rose-500 font-thin rounded px-4 py-2 text-white" >Choose File<input type="file" id="file-upload" className='hidden '/></label>
            <button className='bg-emerald-600 hover:bg-green-500  inline-block rounded m-auto px-4 py-2 text-white font-300'><Link to ='dashboard/create-user'>CreateUser</Link></button>
        </div>
        </>
    )
}
export default CreateUser
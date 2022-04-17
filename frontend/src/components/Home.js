import React, { useEffect } from 'react'
import axios from '../axiosConfig'

function Home() {
    document.title='Home | DUCS Placement Portal'

    const onChange=()=>{
        console.log("here")
        axios.get('/').then(res=>console.log(res)).catch(err=>console.log(err+"err"))
    }

    useEffect(()=>{
        onChange()
    })
    return (
        <div className="homepage ">
            <h1 className="">HomePage</h1>
        </div>
    )
  }
  

export default Home
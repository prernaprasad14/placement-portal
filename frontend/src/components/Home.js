import React from 'react'
import axios from '../axiosConfig'

function Home() {

    const onChange=()=>{
        console.log("here")
        axios.get('/').then(res=>console.log(res)).catch(err=>console.log(err+"err"))
    }

    return (
        <div className="homepage ">
            <h1 className="" onLoad={onChange()}>HomePage</h1>
        </div>
    )
  }
  

export default Home
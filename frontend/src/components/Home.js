import React, { useEffect,useState, useContext} from 'react'
import { UserContext } from '../App'
import axios from '../axiosConfig'

function Home() {
    document.title='Home | DUCS Placement Portal'
   const {state, dispatch}= useContext(UserContext)
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   const checkLoggedIn=()=>{
        axios.get('/api/user/logged-in')
        .then((res)=>{
        console.log("1",res)
        console.log("1")
        console.log(res.status)
        if(res.status==200){
            dispatch({type:"USER", payload:true})
            setIsLoggedIn(true)
            setIsLoading(false)
        }   
        }).catch((error)=>{
            console.log("error checkLoggedIn"+error)
            console.log("error res"+error.response)
            //  if(error.response.status=='401'){
            //   console.log("2")
            //   dispatch({type:"USER", payload:false})
            //    navigate('/login')
            //  }
            //  if(error.response.status=='403'){
            //   console.log("3")
            //   dispatch({type:"USER", payload:false})
            //    navigate('/forbidden')
            //  }
        })
    }

    useEffect(()=>{
        checkLoggedIn();
    })
    return (
        <div className="homepage ">
            <h1 className="">HomePage</h1>
        </div>
    )
  }
  

export default Home
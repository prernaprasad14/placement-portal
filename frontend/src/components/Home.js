import React, { useEffect,useState, useContext} from 'react'
import { UserContext } from '../App'
import axios from '../axiosConfig'
import Card from './Card'
import {mcaPcData, mcsPcData, hodData, advisorData } from './homeData'
function Home() {
    document.name='Home | DUCS Placement Portal'
   const {state, dispatch}= useContext(UserContext)
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   const checkLoggedIn=()=>{
        axios.get('/api/user/logged-in')
        .then((res)=>{
        console.log("1",res)
        console.log("1")
        console.log(res.status)
        if(res.status==1500){ height="150px"
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
                <>
                <div className="homepage items-center flex flex-col ">
            <div className='bg-sky-100 m-3 p-3 '>
                <h1 className="">HomePage</h1>
                <div>Carousel</div>
            </div>
            <div className='flex flex-col items-center w-[700px] m-3  p-3 '>
                <h1 className='m-1 text-xl'>Head of Department</h1>
                <div className='flex-col align-center'>
                    <img className="m-2 rounded-md" width="150px" height="150px" src={hodData.src}/>
                    <h1>{hodData.name}</h1>
                </div>            
                <p>{hodData.message}</p>
            </div>
            <div className='flex flex-wrap flex-col items-center w-[700px] m-3  p-3 '>
                <h1 className='m-1 text-xl'>Placement Advisor</h1>
                <div className='flex-col align-center '>             
                    <div><img className="m-2 rounded-md" width="150px" height="150px" src={advisorData.src}/>
                    <h1>{advisorData.name}</h1>
                    </div>
                </div>
                <p>{advisorData.message}</p>
            </div>

            <div className='flex flex-col my-3 items-center px-10 py-3' >
                <h1 className='m-1 text-xl'>Placement Coordinators 2022</h1>
                <div className='flex flex-col sm:flex-row justify-center m-3 '>
                    {mcaPcData.map((data)=>{
                        return(
                            <>
                                <Card src={data.src} name={data.name} content= {data.course}/>
                            </>
                        )
                    })}
                </div>
                <div className='flex flex-col sm:flex-row justify-center m-3 '>
                    {mcsPcData.map((data)=>{
                        return(
                            <>
                                <Card src={data.src} name={data.name} content= {data.course}/>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    </>
    )
  }
  

export default Home
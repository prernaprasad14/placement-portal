import React, { useEffect,useState, useContext} from 'react'
import { UserContext } from '../App'
import axios from '../axiosConfig'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {BsFillArrowUpCircleFill} from 'react-icons/bs'
import Card from './Card'

import Loading from './Loading'
function Home() {
    document.name='Home | DUCS Placement Portal'
   const {state, dispatch}= useContext(UserContext)
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(false)
   const [pcData, setPcData] = useState('')
   const [hodData, setHodData] = useState('')
   const [advisorData, setAdvisorData] = useState('')

   const checkLoggedIn=()=>{
        axios.get('/api/user/logged-in')
        .then((res)=>{
        console.log("1",res)
        console.log("1")
        console.log(res.status)
        
        console.log(res.status)
        if(res.status==200){
            dispatch({type:"LOGGEDIN", role:res.data.role})
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
        
    const getHomeData=()=>{
        axios('/api/user/home')
        .then((res)=>{
            console.log(res.data)
                const data = res.data.homeData
                setPcData(data.pc)
                setHodData(data.hod)
                setAdvisorData(data.advisor)
                setIsLoading(false)
        })
        .catch((err)=>{
            setError(true)
            setIsLoading(false)
        })  
    }
    useEffect(()=>{
        // checkLoggedIn();
        getHomeData()
    }
    ,[])

  if(isLoading)
    return(<>
        <Loading message={"Loading home"}/>
    </>)

    return (
        <>
        {error && 
            <div className='flex justify-center bg-pink-600 py-3 text-white'>
                <p>Failed to fetch all resources, please try again"</p>
            </div>
        }
         <div className="homepage items-center flex flex-col ">
           
            <div  className=' m-3 p-3' >
                <div className=' p-3 mx-3 flex'>
                    <Carousel className='w-4/6 mx-3 h-auto'>
                        <div>
                            <img src={"https://images.unsplash.com/photo-1648737119247-e93f56878edf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"} />
                            <p className="legend">Department of Computer Science</p>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80" />
                            <p className="legend">MSc Batch 2022-24</p>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
                            <p className="legend">MCA Batch 2022-25</p>
                        </div>
                    </Carousel >
                    <div className='w-2/6 h-auto mx-3 flex flex-col bg-slate-50 rounded-md '>
                        <div className='rounded'>
                            <h1 className='flex justify-center text-white bg-slate-400 text-lg font-normal py-2  rounded-md border-b-4 drop-shadow-sm  border-b-slate-200 '>Placement Statistics</h1>
                            <div className='h-3'></div>
                        </div> 
                    </div>
                </div>
            </div>
            <div className='flex justify-center m-3'>
                <div className='m-3 p-3 justify-center bg-white border-2 rounded-lg drop-shadow-sm items-center flex flex-col w-2/6'>
                    <h1 className='m-2 text-xl'>Head of Department</h1>
                    <img className="m-2 rounded-md" width="120px" src={hodData.avatar}/>
                    <h1>{hodData.name}</h1>
                    <p>{hodData.msg}</p>
                </div>
                <div className='m-3 p-3 justify-center bg-white border-2 rounded-lg drop-shadow-sm items-center flex flex-col w-2/6'>
                    <h1 className='m-2 text-xl'>Placement Advisor</h1>
                    <img className="m-2 rounded-md" width="120px" src={advisorData.avatar}/>
                    <h1>{advisorData.name}</h1>
                    <p>{advisorData.msg}</p>
                </div>
            </div>

            <div className='flex flex-col my-3 mb-1 items-center px-10 py-3' >
                <h1 className='m-1 my-3 text-xl'>Placement Coordinators 2022</h1>
        
                <div className='flex flex-wrap w-[720px]'>
                {Object.entries(pcData).map((data, index)=>{
                    
                    return (<>
                            <Card src={data[1].avatar} content={data[1].course} name={data[1].pcname}/>
                    </>)
                })}
                </div>
            </div>
        </div>
        <div className='flex justify-end py-1 mb-2 px-5 cursor-pointer' onClick={()=>window.scrollTo(0,0)}>
            <div className='text-center'>
               <BsFillArrowUpCircleFill className='text-violet-300 hover:text-violet-500  drop-shadow-sm text-6xl'/>
            </div>
        </div>

    </>
    )
  }
  

export default Home
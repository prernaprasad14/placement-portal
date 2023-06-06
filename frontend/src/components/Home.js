import React, { useEffect,useState, useContext, useRef} from 'react'
import { HashLink } from 'react-router-hash-link'
import { UserContext } from '../App'
import axios from '../axiosConfig'
import Loading from './Loading'
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {BsFillArrowUpCircleFill} from 'react-icons/bs'
import stats from './../img/stats.jpg';
import placeholder_slide_1 from './../img/placeholder_slide_1.PNG'
import placeholder_slide_2  from './../img/placeholder_slide_2.png'
import slide_dept from './../img/slide_dept.png';

function Home() {
   document.name='Home | DUCS Placement Portal'
   const {state, dispatch}= useContext(UserContext)
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(false)
   const [pcData, setPcData] = useState('')
   const [hodData, setHodData] = useState('')
   const [advisorData, setAdvisorData] = useState('')
   const backToTop= useRef()
 
    const getHomeData=()=>{
        try{
            console.log(state)
            axios.get('/api/user/home')
            .then((res)=>{
                console.log(res.data)
                const data = res.data.homeData
                setHodData(data.hod)
                setAdvisorData(data.advisor)
                if(res.data.role==='USER'){
                        console.log("role",res.data.role)
                        
                        dispatch({type:"USER", role:"USER"})
                    }else{
                        console.log("role",res.data.role)

                        dispatch({type:"LOGGEDIN", role:res.data.role})
                    }
            })       
            .catch(error=> {
                dispatch({type:"USER", role:"USER"})
            })  
        }catch(error){
            dispatch({type:"USER", role:"USER"})
            console.log(error)
           setError(true)
        }
            
    }
    const getPcData=()=>{
        try{
            axios.get('/api/user/pc-info')
            .then((res)=>{
                console.log(res.data)
                const data = res.data.pcData
                console.log(data.pc)
                    setPcData(data.pc)
                    if(res.data.role==='USER'){

                        dispatch({type:"USER", role:"USER"})
                    }else{

                        dispatch({type:"LOGGEDIN", role:res.data.role})
                    }
            })       
            .catch(error=> {
                dispatch({type:"USER", role:"USER"})
            })  
            
        }catch(err){
            console.log(err)
            setError(true)
        }
    }
        useEffect(()=>{
            window.scrollTo(0,0)
            setIsLoading(true)
            getPcData()
            getHomeData()
            setIsLoading(false)
    }
    ,[]);


  if(isLoading)
    return(<>
        <Loading message={'Loading home...'}/>
    </>)

    return (
        <>
        <div className=' '>
        {error && 
            <div className='flex justify-center bg-pink-600 py-3 text-white'>
                <p>Failed to fetch all resources, please try again</p>
            </div>
        } 
        <div className='h-10 drop-shadow-sm flex justify-around items-center bg-slate-100 text-slate-600/95 text-sm font-semibold'>
            <ul className='flex flex-wrap text-xs md:text-sm'>
                <li className='mx-2 sm:mx-12'><HashLink to='#hod_s-message' className='hover:text-slate-900 p-2 border-4 border-transparent '>HOD's message</HashLink></li>
                <li className='mx-2 sm:mx-12'><HashLink to='#advisor_s-message' className='hover:text-slate-900 p-2 border-4 border-transparent'>Advisor's message</HashLink></li>
                <li className='mx-2 sm:mx-12'><HashLink to='#placement-coordinators' className='hover:text-slate-900 p-2 border-4 border-transparent '>Placement Coordinators</HashLink></li>
            </ul>
        </div>
         <div className='homepage my-2 items-center flex flex-col '>
          
            <div  className=' my-1 mx-4 sm:mx-5 p-1  mt-3 lg:p-3' >
                <div className=' p-1 md:p-2 mx-1 md:mx-5 flex flex-col sm:flex-row'>
                    <Carousel autoPlay={true} className='w-[95%] px-2 h-auto m-auto sm:w-4/6 sm:mx-3'>
                        <div>
                            <img  src={slide_dept}/>
                            <p className='legend'>Department of Computer Science</p>
                        </div>
                        <div>
                            <img  src={placeholder_slide_1}/>
                            <p className='legend'>MSc Batch 2021-23</p>
                        </div>
                        <div>
                            <img  src={placeholder_slide_2}/>
                            <p className='legend'>Placement Team 2022-23</p>
                        </div>
                        <div>
                            <img  src={placeholder_slide_1}/>
                            <p className='legend'>MCA Batch 2020-23</p>
                        </div>
                        
                       
                        <div>
                            <img  src={placeholder_slide_1}/>
                            <p className='legend'>Google Developer Student Club -Department of Computer Science</p>
                        </div>
                        <div>
                            <img  src={placeholder_slide_2}/>
                            <p className='legend'>CodeChef Chapter-Department of Computer Science</p>
                        </div>
                       
                    </Carousel >
                    <div className='w-[95%] lg:w-2/6 h-56 lg:h-auto lg:mx-3 px-2 flex flex-col bg-slate-50 rounded-md '>
                        <div className='rounded'>
                            <h1 className='flex justify-center text-white bg-slate-700 text-sm lg:text-lg font-normal py-2  rounded-md border-b-4 drop-shadow-sm  border-b-slate-200 '>Placement Statistics</h1>
                            <div className=''><img width="100%" className='block max-h-[inherit] lg:h-[100%] lg:w-[100%] ' src={stats}/></div>
                        </div> 
                    </div>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row itmes-center justify-center m-3'>
                <div id='hod_s-message' className='drop-shadow-md my-1 sm:m-3 p-3 justify-center bg-white rounded-lg  items-center flex flex-col w-full sm:w-5/6 lg:w-2/6'>
                    <h1 className='m-2 text-xl'>Head of Department</h1>
                    <img className='m-2 rounded-md' width='120px' src={hodData.avatar}/>
                    <h1 className='py-2 font-semibold'>{hodData.name}</h1>
                    <p className='text-justify'>{hodData.msg}</p>
                </div>
                <div id='advisor_s-message' className='drop-shadow-md my-1 sm:m-3 p-3 justify-center bg-white rounded-lg  items-center flex flex-col w-full sm:w-5/6 lg:w-2/6'>
                    <h1 className='m-2 text-xl'>Placement Advisor</h1>
                    <img className='m-2 rounded-md' width='120px' src={advisorData.avatar}/>
                    <h1 className='py-2 font-semibold'>{advisorData.name}</h1>
                    <p className='text-justify'>{advisorData.msg}</p>
                </div>
            </div>

            <div id='placement-coordinators' className='bg-white rounded-md flex flex-col my-3 mb-1 items-center px-10 py-3'>
                <h1 className='m-1 my-3 text-xl'>Placement Coordinators 2022-23</h1>
        
                <div className='flex flex-col mb-2 sm:flex-row flex-unwrap sm:flex-wrap sm:w-[720px]'>
                {Object.entries(pcData).map((data, index)=>{
                    
                    return (<>
            
                        <div className='border-t-[10px] rounded-md border-violet-300  bg-white flex drop-shadow-md flex-col items-center m-2 w-56'>
                        <div className='form-group flex flex-col justify-center items-center  '>
                        
                        {Object.entries(data[1].avatar).map((datum, index)=>{
                            
                            const base64String = btoa(new Uint8Array(data[1].avatar.img.data.data).reduce(function (data, byte) {
                                return data + String.fromCharCode(byte);
                                }, ''));
                            return <>{ 
                                index===0 && <img className='mt-3 bg-gray-100/25 p-2 ' width='110px' height='auto'  src={`data:image/*;base64, ${base64String}`}/>
                            }</>
                            })
                        }
                        <h1 name="pcname">{data[1].pcname}</h1>
                        <h6 className='px-2 m-2 text-[12px] font-semibold'>{data[1].course}</h6>
                    </div>
                    </div>        
                    </>)
                })}
                </div>
            </div>
        </div>
    
        <div id='back-to-top' ref={backToTop} className='flex sticky justify-end py-1 mb-2 px-5 '>
            <div  onClick={()=>window.scrollTo(0,0)} className='text-center cursor-pointer'>
               <BsFillArrowUpCircleFill className='text-violet-300 hover:text-violet-500  drop-shadow-sm text-4xl'/>
            </div>
        </div>
        </div>

    </>
    )
}
  

export default Home
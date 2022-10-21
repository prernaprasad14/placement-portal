import React, { useEffect, useState } from 'react'
import '../styles/main.css'
import Loading from './Loading'
import axios from '../axiosConfig'
import { UserContext } from '../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router'

const Brochure=()=>{
    document.title='Brochure | DUCS Placement Portal'
    const [isLoading, setIsLoading]= useState(true)
    const [brochures,setBrochures]=useState([])
    const [brochure,setBrochure]=useState('')
    const [message,setMessage]=useState('')
    const {state, dispatch}=useContext(UserContext)
    const navigate = useNavigate()

    //get all the brochures
    const getBrochures=()=>{
        axios.get('api/user/all-brochures')
        .then(res=> {
                console.log(res)
                const files= res.data.files
                console.log(files)
                setBrochures(files)
                setIsLoading(false)
                console.log(res.data)
                console.log(res.data.role)
                dispatch({type:"LOGGEDIN", role:res.data.role})
        })       
        .catch(error=> {
            dispatch({type:"USER", role:"USER"})
            if(error.response.status==404){
                navigate('/404')
            }else{
                setMessage(error.response.data.err)
                setIsLoading(false)
            }
        })
    }

    //get all the requested brochure
    const getBrochure=(id)=>{    
        setIsLoading(true) 
        console.log(id)
         axios.get(`api/admin/brochure/${id}`)
         .then(res=>{
                 console.log(res.data)
                 setBrochure(res.data)
             }
             )
        .catch(error=>{
            if(error.response.status==404){
                navigate('/404')
                console.log(error)
            }else{
                setMessage(error.response.data.err)
                setIsLoading(false)
            }
        })
        setIsLoading(false) 
     }
 
    
    useEffect(()=>{
        getBrochures();
    },[])

    

    if(isLoading){
        return <Loading message={'Loading Brochures...'}/>
    }

    return (<>


    <h2 className='mx-12 py-4 text-lg flex justify-start font-bold text-slate-900/90'>Brochures</h2>
      <div className="mx-8 mb-8 py-2 rounded-lg border-slate-100 border-2 min-h-[300px] text-gray-700 text-sm">
        <div className='flex-col lg:flex-row flex p-4 items-start '>
            <div className='w-auto lg:w-[18%] m-3 px-1'>
                <section>
                    {message.length>0 && <p className='text-red-600 font-semibold text-sm mb-4'>{message}, Try refreshing the page</p>}
                    <ul id='pdf-list-sm' className=''>
                        {Object.entries(brochures).map(brochure=>{
                            const file= brochure[1].filename.split('.').slice(0, -1).join('.');
                            const id= brochure[1]._id
                            console.log(brochure[1]._id)
                            return <li onClick={()=>{console.log(brochure[1]._id); getBrochure(id)} } value={file} 
                                className='list-disc p-1 mb-3  hover:cursor-pointer hover:underline hover:underline-offset-2
                                 font-semibold hover:text-indigo-600'>{file}</li>
                        })}
                    </ul>
                    <ul id='pdf-list' className=''>
                        {Object.entries(brochures).map(brochure=>{
                            const file= brochure[1].filename.split('.').slice(0, -1).join('.');
                            const id= brochure[1]._id
                            console.log(brochure[1]._id)
                            return (<li onClick={()=>{console.log(brochure[1]._id); getBrochure(id)} } value={file} 
                                className='list-disc p-1  hover:cursor-pointer hover:underline hover:underline-offset-2
                                 font-semibold hover:text-indigo-600'>
                                    {/* <a target='_blank' href={`data:application/pdf; base64,${brochure}`} >{file}</a> */}
                                    {file}
                                </li>)
                        })}
                    </ul>
                </section> 
                
             {brochure.length>0 && <p>Total {brochure.length} bytes </p>}
            </div>
            {brochure.length>0 &&
            <>
            {console.log(brochure)}
           
            < div className='w-5/6 border-4 border-gray-100 mx-7 rounded-md'>
   
                {/* {brochure && <iframe height='1200px'  className='w-[550px] sm:w-[1080px]' src={`data:application/pdf; binary,${brochure}`}/>} */}
                <><iframe onLoad={()=>alert('Successfuly loaded') }  id="pdf-js-viewer" width ='auto' height='1200px'  className=' w-[700px] lg:w-[1080px]'
                 src={`data:application/pdf; base64,${brochure}`}/></>
            </div></>}
        </div>
        </div>
        </> 
    )
}

export default Brochure
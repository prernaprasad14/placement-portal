import { useState, useEffect, useContext ,useRef} from 'react'
import axios from '../../axiosConfig'
import Loading from '../Loading';
import { UserContext } from '../../App';
import {RiUpload2Fill} from 'react-icons/ri'
import {HiDocumentDuplicate } from 'react-icons/hi'
import {CgFileRemove} from 'react-icons/cg'
import {VscDebugRestart} from 'react-icons/vsc'
import validator from 'validator';
const ManageBrochures=()=>{
    
    document.title='Manage Brochures | DUCS Placement Portal'
    const {state, dispatch}= useContext(UserContext)
    const fileMsg = useRef(null)
    const delMsg= useRef(null)
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setIsLoading]= useState(true)
    const [error, setError]= useState(false)
    const [pcData, setPcData] = useState('')
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState('')
    const [isFileEmpty, setIsFileEmpty] = useState(true)
    const [message, setMessage] = useState('')
    const [fileMessage, setFileMessage] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [brochures,setBrochures]=useState([])
    const [btn, setBtn]=useState(false)
    
   
    const getBrochures=()=>{
        axios.get('api/user/all-brochures')
        .then(res=> {
            console.log(res)
            const files= res.data.files
            console.log(files)
        setBrochures(files)
        setBtn(true)
        setMessage('')
        setIsLoading(false)
        setRefresh(true)
        console.log(brochures)
        })       
        .catch(error=> {
            setBrochures('')
            setMessage(error.response.data.err)
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        // window.scrollTo(0, 0)
        setIsLoading(false)
        console.log('inside ManageBrochures')
    },[]);
    
    const handleFileSelection=(e)=>{
        console.log(file)
        console.log(fileName)
        console.log(e.target.files[0])
        const filename= e.target.files[0].name
        
            setFile(e.target.files[0]) 
            setFileName(e.target.files[0].name) 
            setIsFileEmpty(false)
        
    }

    const handleFileUpload=(e)=>{
        e.preventDefault();
        console.log('insidebrochure handleFileUpload')
        const formData = new FormData() 
        try{
            const fileNameExists=fileName.split('.').slice(0, -1)
            if(validator.isEmpty(fileNameExists[0])|| fileNameExists[0]===null || fileNameExists[0]===undefined|| fileNameExists[0]===''){
               
                setError(true)
        }
        else{
            
            setError(false)
            formData.append('file', file)
            formData.append('fileName', fileName)
            console.log(fileName)
            axios.post('api/admin/uploads/brochure', formData)
            .then(res=>{
                console.log(res)
                setFileMessage(res.data.message)
                // setFile('')
                // setFileName('')
                fileMsg.current.style.opacity='0.6'
                setTimeout(()=>{
                    setFileMessage('')
                },1000)
                }).catch(error=>{
                    console.log(error)
                    setFileMessage(error)
                    // setError(true)
                })
            }
        }catch(error){
            setFileMessage(error)
            console.log(error)
        }
    }

    const handleDelete=(e,id)=>{
        e.preventDefault()
        e.target.style.opacity='0.3'
        console.log(id)
        console.log('brochure delete')
        axios.delete(`/api/admin/brochure/${id}`)
        .then(res=>{
            console.log(res)
            setMessage(res.data.message)
            delMsg.current.style.opacity='0.6'
            setTimeout(()=>{
                getBrochures()
                e.target.transition= 'all 0.3s ease-in-out'
                e.target.style.opacity='1'
            },550)
        }).catch(err=>{
            console.log(err)
        })
    }


    if(isLoading)
        return(
            <>
                <Loading message={`Just a moment`}/>
            </>
        )

        return(<>
          <div className='user-select-none w-90% rounded h-auto items-center m-3 bg-white min-h-[685px]' id='upload-brochure'>
            <div className='flex space-between my-3'>
                <div className='text-md mx-12 font-semibold w-4/6'>
                    <p><HiDocumentDuplicate className='mb-2  mx-1  font-bold text-xl inline-block'/>&nbsp;Manage Brochures</p>
                </div>
            </div>
            <div  className=' h-auto  flex  flex-nowrap flex-col sm:flex-wrap items-start rounded-md border-slate-100  mx-8 my-6 p-4 border-2 text-gray-700'>
 
                    <h5 className='mt-2 mb-2 font-semibold'>Upload brochure</h5>  
                    <div className='items-center flex rounded w-auto sm:w-[1012px] p-4'>
                        <form className='flex flex-col' onSubmit={handleFileUpload}>
                            {fileMessage &&  
                                <p ref={fileMsg} className='py-2 my-2 '>{fileMessage}</p>
                            }  
                            {error && <p>File name cannot be empty</p>}
                            <div className='flex flex-nowrap sm:flex-wrap flex-col align-top items-start sm:justify-center '>
                                <div className='flex flex-col'>
                                <input name={fileName} required onChange={handleFileSelection} type='file' accept='.pdf' id='file-upload' className='flex-wrap mt-1 mr-1 my-2 sm:mr-6 sm:my-0'/>
                                </div>
                                <div className='flex flex-col ml-20'>
                                <button disabled={isFileEmpty}  type='submit' className={isFileEmpty ? 'disabled-btn' :'create-user'} >
                                    <RiUpload2Fill className='mb-1 mx-1 font-bold text-xl inline-block'/>&nbsp;Upload
                                </button>   
                                </div>
                            </div>                      
                        </form>        
                    </div>
                    <button disabled={btn}  onClick={getBrochures} className='text-indigo-600 hover:text-underline'>Show all brochures
                    {refresh  && <span className='mx-5 p-1  m-2 inline-block text-emerald-600 hover:cursor-pointer  hover:animate-pulse' onClick={getBrochures}><VscDebugRestart className=' inline-block text-xl active:animate-[spin_0.4s_ease-in-out_1] font-bold'/></span>}</button>
                    {message && <p ref={delMsg} className='text-slate-600 mx-3 px-4'>{message}</p>}
                    {brochures && <div className='w-[18%] m-3 px-1'>
                        <section className='w-[500px]'>
                            <ul className='flex flex-col'>
                          
                             {Object.entries(brochures).map(brochure=>{
                                    const file= brochure[1].filename.split('.').slice(0, -1).join('.');
                                    const id= brochure[1]._id
                                    return <li name='file' value={file} className='list-disc border-slate-100 py-2 border-b-2 only:border-b-0 last:border-b-0 font-semibold '>
                                    <button className='px-2' onClick={(e)=>handleDelete(e,id)} type='button' >
                                        <CgFileRemove className='mr-4 hover:cursor-pointer hover:text-rose-500 text-2xl inline-block'/>{file}</button></li>
                                })}
                            </ul>
                        </section>
                    </div>}
                </div>
                </div>
        </>)
}
export default ManageBrochures
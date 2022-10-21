import { Link, NavLink,useNavigate} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import React, { useState, useEffect, useContext, useRef} from 'react';
import axios from '../../axiosConfig';
import { UserContext } from '../../App';
import {AiOutlineUserAdd,AiOutlineUsergroupAdd} from 'react-icons/ai'
import {FaUserPlus} from 'react-icons/fa'
import {BsFillArrowUpCircleFill} from 'react-icons/bs'
import {VscDebugRestart} from 'react-icons/vsc'
import {DiGoogleAnalytics} from 'react-icons/di'


const ManageUsers=()=>{
    const {backToTop} =useRef()
    const [val, setVal] =useState(false)
    const [role, setRole] =useState('')
    const {state}= useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [allScholars, setAllScholars] = useState([])
    const [allCompanies,setAllCompanies] = useState([])
    const [allUsers,setAllUsers] = useState([])
    const [error, setError] = useState(false)
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('')
    const [isFileEmpty, setIsFileEmpty] = useState(true)
    const [message, setMessage] = useState('')
    const [fileMessage, setFileMessage] = useState('')
    const [fileResponse, setFileResponse] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [userData, setUserData]=useState('')
    const users =allUsers
    const scholars = allScholars
    const companies= allCompanies
    const scholarEmailRegex = /^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/;
    const [isAllScholarsActive, setIsAllScholarsActive]= useState(false)
    const [isAllCompaniesActive, setIsAllCompaniesActive]= useState(false)
    const [isAllUsersActive, setIsAllUsersActive]= useState(false)
    const [order, setOrder]= useState("ASC")

    const handleShowScholars=()=>{
        setIsAllScholarsActive(!isAllScholarsActive)
    }
    const handleShowCompanies=()=>{
        setIsAllCompaniesActive(!isAllCompaniesActive)
    }
    const handleShowUsers=()=>{
        setIsAllUsersActive(!isAllUsersActive)
    }

    const handleEmail=(e)=>{
        
        console.log("inside handleEmail")
        setEmail(e.target.value) 
        console.log(email)
    }
    const handleUsername=(e)=>{
         console.log("inside handleUsername")
        setUsername(e.target.value) 
    }
    const enableBtn =()=>{
        console.log("inside enableBtn",btnDisabled)
        if(role===''||  username===''|| email===''){
            console.log("qqqq")
            setBtnDisabled(true)
        }else{
            console.log("yyyy")
            setBtnDisabled(false)
        }
    }
  
    const handleSubmit  = async (e)=>{
        e.preventDefault();
        console.log('inside manage submit')
        console.log(role)
        if(role===''||  username===''|| email===''){
            console.log(role,username,email)
            console.log("qqqq")
            setError("Fill all the fields")
            // setBtnDisabled(true)
           
        }else if(role==='Scholar' && !scholarEmailRegex.test(email)){
            console.log(role)
            console.log(scholarEmailRegex.test(email))
            setError("Use cs.du.ac.in domain to create scholars")
        }else{
            setError('')
            console.log("yyyy")
            // setBtnDisabled(false)
            const userObj = {
                'role':role,
                'email':email, 
                'username':username
            }
            console.log("userObj")
           axios.post(`api/admin/create-user/${role}`, userObj)
            .then(res=>{
                console.log(res)
                if(res.data.success){
                // setSuccess(true)
                getAllUsers();
                setMessage(res.data.message)
                setTimeout(()=>{
                    setEmail('')
                    setUsername('')
                    setRole('')
                    setMessage('')
                    setRefresh(true)
                },2500)
            }
            })
            .catch((error)=>{
                console.log("catch-block", error.msg)
                const err =error.response.data.error
                if(err){
                    setError(error.response.data.error.map(err=><li>{err.msg}</li>))
                    console.log(error.response.data.error.map(err=>console.log(err.msg))) 

                }else{
                    setMessage(error.response.data.message)
                    setTimeout(()=>{
                        setMessage('')
                    },2500)
                }
               
            })
        }
    }

    const handleFileSelect=(e)=>{
        // console.log(file)
        // console.log(fileName)
        // console.log(e.target.files[0])
        if(!e.target.files[0]){
            
            setIsFileEmpty(true)
        }
        else{
            
            setFile(e.target.files[0]) 
            setFileName(e.target.files[0].name) 
            setIsFileEmpty(false)
        }
    }
    const handleFileUpload=async(e)=>{
        e.preventDefault();
        console.log('inside createusers handleFileUpload')
        const formData = new FormData() 
        console.log(file)
        console.log(fileName)
        formData.append('file', file)
        formData.append('fileName', fileName)
        if(file!==null)
        {
           await axios.post('api/admin/create-users', formData)
            .then(res=>{
                console.log(res)
        
                    setFileMessage(res.data.message) 
                    setFileResponse(res.data.users.map((user,index)=>{
                    console.log(user)
                    if(index>0 && user.length>0)
                            return <li>Existing users - {user}</li>
                    if(user.length>0)
                            return <li>Created users - {user}</li>
                    }))
                    setIsFileEmpty(true)
                    setFileName('')
                    setTimeout(()=>{
                        console.log(e.target.files)
                        setFileMessage('')
                        setFileResponse('')
                    },2500)
                // )
                setRefresh(true)
            }).catch(error=>{
                console.log(error)
                setFileMessage(error.response.data.message)
                setTimeout(()=>{
                    setFileMessage('')
                },2500)
                // setError(true)
            })
        }else{
            setFileMessage('Select a file')
            setTimeout(()=>{
                    setFileMessage('')
                },2500)
        }
    }

    const getAllUsers=()=>{
        axios.get('/api/admin/users')
        .then(res=>{
            setUserData(res.data)
            setAllScholars(res.data.scholars)    
            setAllCompanies(res.data.companies)
            setAllUsers(res.data.createdUsers)
        }).catch(err=>{
            console.log(err)
        })
    }
    
    const handleSort=(col)=>{
        console.log("col")
        console.log(col)
           if(order==='ASC'){
              const sorted = [...allUsers].sort((a,b)=>{
                console.log( a[col],b[col])
                return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
              }
              );
              setAllUsers(sorted)
              setOrder('DES')
            }
            if(order==='DES'){
                const sorted = [...allUsers].sort((a,b)=>
                    a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
                );
                setAllUsers(sorted)
                setOrder('ASC')
            }
        
      }
    useEffect(()=>{
        console.log('3 inside ManageUsers')        
        getAllUsers()
        // window.scrollTo(0,0)
        setIsLoading(false)
        
        if(file==null){
            setIsFileEmpty(true)
        }else
        setIsFileEmpty(false)

    },[])

    return(
        <>
        
        
        <div className=' w-90% rounded h-auto flex flex-col m-3 bg-white'>
            <div className='flex space-between my-3'>
                <div className='text-md mx-12 font-semibold w-4/6'><p><FaUserPlus className='mb-2 font-bold text-xl inline-block'/>&nbsp;Manage Users</p>
                </div>
            </div>
            <div className='mx-10'>
                <ul className='flex text-xs sm:text-sm flex-wrap  '>
                    <li className='mx-2 py-2 m-1 sm:py-1 rounded-md bg-slate-100/75 font-[500]'>
                        <HashLink  to='#create-user' className='hover:bg-slate-100 hover:text-indigo-600 px-2 py-2 rounded text-slate-500 cusror-pointer'>CREATE&nbsp;USER</HashLink>
                    </li>
                    <li className='mx-2 py-2 m-1 sm:py-1 rounded-md bg-slate-100/75 font-[500]'>
                        <HashLink to='#create-multiple-users' className='hover:bg-slate-100 hover:text-indigo-600 px-2 py-2 rounded text-slate-500 cusror-pointer'>CREATE&nbsp;MULTIPLE&nbsp;USERS</HashLink>
                    </li>
                    <li className='mx-2 py-2 m-1 sm:py-1 rounded-md bg-slate-100/75 font-[500]'>
                        <HashLink  to='#registered-scholars' className='hover:bg-slate-100 hover:text-indigo-600 px-2 py-2 rounded text-slate-500 cusror-pointer'>REGISTERED&nbsp;SCHOLARS</HashLink>
                    </li>
                    <li className='mx-2 py-2 m-1 sm:py-1 rounded-md bg-slate-100/75 font-[500]'>
                        <HashLink to='#registered-companies' className='hover:bg-slate-100 hover:text-indigo-600 px-2 py-2 rounded text-slate-500 cusror-pointer'>REGISTERED&nbsp;COMPANIES</HashLink>
                    </li>
                    <li className='mx-2 py-2 m-1 sm:py-1 rounded-md bg-slate-100/75 font-[500]'>
                        <HashLink to='#all-created-users'  className='hover:bg-slate-100 hover:text-indigo-600 px-2 py-2 rounded text-slate-500 cusror-pointer'>ALL&nbsp;&nbsp;USERS</HashLink>
                    </li>
                </ul>
            </div>
            <div  className=' h-auto items-start rounded-md border-slate-100 bg-violet-100 sm:bg-white mx-2 sm:mx-8 my-6 px-2 py-4 border-2 text-gray-700'>
                <div id='create-user' className='flex flex-col my-4 px-2 rounded-sm bg-white sm:mx-8'>
                    <h3 className='mt-2 mb-2 font-semibold'>Create user</h3>

                    <form className='flex-1 flex-col justify-center items-start px-4 sm:px-0 mt-3 mb-4'>
                        {error &&  
                            <p className='py-2 my-2 text-[#da2e2e]'>{error}</p>
                        }  
                        {message &&  
                            <p className='py-2 my-2 text-emerald-600'>{message}</p>
                        }
                        {role==='Scholar'  && 
                            <p className='py-2 my-2 text-slate-700'>Use <span className='font-bold italic select-text'>cs.du.ac.in</span> domain to create scholars</p>
                        }  
                        <select required className='h-10 w-44 px-2 mb-2 rounded-[5px] border-2 border-slate-300 text-slate-600'
                        defaultValue={role} onChange={(e)=>{setRole(e.target.value);setVal(true);}} >
                            <option selected className={val ? 'hidden':'visible'} disabled={val} value="">Select an option</option>
                            <option value="Scholar">Scholar</option>
                            <option value='Company'>Company</option>
                        </select>
                        <input placeholder='Email' required type='email' onChange={handleEmail}  className='w-64 sm:w-68 mb-2 rounded h-10 border-2 border-slate-300'/>
                        <input placeholder='Username' required onChange={handleUsername} type='text' className='w-64 sm:w-68 mb-2 rounded h-10 border-2 border-slate-300'/>
                        <button  onClick={handleSubmit}  type='submit' className='create-user' >
                            <AiOutlineUserAdd className='mb-1 font-bold text-2xl inline-block'/>Create User
                        </button>                        
                    </form>
                </div>

                <div id='create-multiple-users' className='flex flex-col my-4 px-2 rounded-sm bg-white sm:mx-8'>
                    <h3 className='my-4 font-semibold'>Create multiple users by uploading file a<span className='text-indigo-600 font-bold italic'> csv </span>file</h3>
                    {fileMessage &&  
                        <p className='mt-1 text-sm text-slate-600 font-semibold'>{fileMessage}</p>
                    }
                    {fileResponse!=='' && 
                        <ul className='text-sm font-semibold italic text-slate-600'>{fileResponse}</ul>
                    }
                        
                    <form className=' flex flex-col sm:flex-row align-center sm:items-baseline flex-1 mb-2 ' onSubmit={handleFileUpload}>
                        <div className=''>
                            <input name='file' required onChange={handleFileSelect} type='file' accept='.xlsx, .xls, .csv' id='file-upload' className='mt-1 w-5/6'/>
                        </div>
                        <div className='flex flex-row flex-1'>
                            <button disabled={isFileEmpty} type='submit' className={isFileEmpty ? 'disabled-btn' : 'create-user'} >
                                <AiOutlineUsergroupAdd className='mb-1 font-bold text-2xl inline-block'/>Create&nbsp;Users
                            </button>   
                        </div>
                    </form>   
                </div>

                <div id='registered-scholars' className='my-2 py-4 px-2 rounded-sm border-slate-100 bg-white sm:mx-8'>
                    <h3 onClick={handleShowScholars} 
                        className='hover:text-xl duration-75 hover:cursor-pointer border-b-2 border-slate-200 py-2
                        text-indigo-600 flex text-lg font-semibold'>Registered Scholars
                        <span className='ml-auto text-sm font-semibold mr-10'>Total {allScholars.length}</span>
                    </h3>
                    <section className={isAllScholarsActive ? 'scrollbar overflow-x-scroll mt-1 ml-0 sm:ml-2 mb-3 w-full text-gray-700': 'hidden'}>
                        <table className='my-3'>
                            <thead className='text-white bg-violet-500 mx-4 '>
                                <tr>   
                                    <th className='px-3 py-2  min-w-[30px]'>Roll no.</th>
                                    <th className='px-3 py-2  min-w-[190px]'>Username</th>
                                    <th className='px-3 py-2  min-w-[190px]'>Name</th>
                                    <th className='px-3 py-2  min-w-[190px]'>Email</th>
                                </tr>
                            </thead>
                            <tbody >
                            {Object.entries(scholars).map(scholar=>{
                           
                                return <>
                                <tr id={scholar.pg_class_roll} className='text-[15px] text-[#1b1b1b] border-b-[1px] border-slate-100/75 hover:bg-slate-100 mx-4 py-1'>
                                    <td className='px-3 py-2 min-w-[30px]'>{scholar[1].pg_class_roll}</td>
                                    <td className='px-3 py-2 min-w-[190px]'>{scholar[1].username}</td>
                                    <td className='px-3 py-2 min-w-[190px]'>{scholar[1].fname} {scholar[1].lname}</td>
                                    <td className='px-3 py-2 min-w-[190px]'>{scholar[1].email}</td>
                                </tr>
                                </>
                            })} 
                            </tbody>
                        </table>
                    </section>
                </div>

                <div id='registered-companies' className='my-2 py-4 px-2 rounded-sm border-slate-100 bg-white sm:mx-8'>
                            <h3  onClick={handleShowCompanies} 
                                className='hover:text-xl  duration-75 hover:cursor-pointer border-b-2 border-slate-200 py-2 
                                text-indigo-600 flex text-lg font-semibold'>Registered companies
                                <span className='ml-auto text-sm font-semibold  mr-10'>Total {allCompanies.length}</span>
                            </h3>
                            <section className={isAllCompaniesActive ? 'scrollbar overflow-x-scroll mt-1 ml-0 sm:ml-2 mb-3 w-full text-gray-700': 'hidden'}>
                                <table className='my-3'>
                                    <thead className='text-white bg-violet-500 mx-4 '>
                                        <tr>
                                            <th className='px-3 py-2 min-w-[190px]'>Username</th>
                                            <th className='px-3 py-2 min-w-[190px]'>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {Object.entries(companies).map(company=>{
                                            return <>
                                            <tr id={company.email} className='text-[15px] text-[#1b1b1b] border-b-[1px] border-slate-100/75 hover:bg-slate-100 mx-4 py-1'>
                                                <td className='px-3 py-2 min-w-[190px]'>{company[1].username}</td>
                                                <td className='px-3 py-2 min-w-[190px]'>{company[1].email}</td>
                                            </tr>
                                            </>
                                        })}
                                    </tbody>
                                </table>
                            </section>
                                    
                </div>

                <div id='all-created-users' className='my-2 py-4 px-2 rounded-sm border-slate-100 flex flex-col bg-white sm:mx-8'>
                    <h3 onClick={handleShowUsers}
                        className='hover:text-xl  duration-75 hover:cursor-pointer border-b-2 border-slate-200 py-2
                        text-indigo-600 flex text-lg font-semibold'>
                        Show All
                        <span className='ml-auto text-sm font-semibold  mr-10'>Total {allUsers.length}</span>
                    </h3>
                    <div className={isAllUsersActive ? 'mt-1 ml-0 sm:ml-2 mb-3 w-full text-gray-700': 'hidden'}>
                        <div className=''>  
                            <section className='scrollbar overflow-x-scroll w-auto sm:w-[1012px]'>
                                <table id="all-users" className='my-3'>
                                    <thead className='text-white bg-violet-500 mx-4'>
                                        <tr>
                                            <th className='px-3 py-2 min-w-[100px]' onClick={()=>handleSort('username')} >
                                                Username<span className={order==='ASC' ? 'rotate-180 ':''}></span>
                                            </th>
                                            <th className='px-3 py-2 min-w-[100px]'>
                                                Email
                                            </th>
                                            <th className='px-3 py-2 min-w-[70px]' onClick={()=>handleSort('role')}>
                                                Role<span className={order==='ASC' ? 'rotate-180 ':''}></span>
                                            </th>
                                            <th className='px-3 py-2 min-w-[70px]' onClick={()=>handleSort('status')}>
                                                Status<span className={order==='ASC' ? 'rotate-180 ':''}></span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {Object.entries(users).map(user=>{
                                            return <>
                                            <tr id={user.username} className='text-[15px] text-[#1b1b1b] border-b-[1px] border-slate-100/75 hover:bg-slate-100 mx-4 py-2'>
                                                <td className='px-3 py-2 min-w-[100px]'>{user[1].username}</td>
                                                <td className='px-3 py-2 min-w-[100px]'>{user[1].email}</td>
                                                <td className='px-3 py-2 min-w-[70px]'>{user[1].role}</td>
                                                <td className='px-3 py-2 min-w-[70px]'>{user[1].status}</td>
                                            </tr>
                                            </>
                                        })}      
                                    </tbody>
                                </table>  
                            </section>
                            <div className='border-l-0 sm:border-l-2 border-slate-100 flex flex-col flex-wrap w-[350px] lg:w-min-[200px] ml-3 md:mt-3 lg:ml-6  p-2 text-slate-500' >
                                <div className='bg-white p-1'>
                                    <h1 className='px-2 text-sm md:text-base font-semibold text-[24px] mb-3'><DiGoogleAnalytics className='inline-block text-slate-500 mb-1 mr-2 text-[24px]'/>User Analytics</h1>
                                    <p className='px-2 py-1'>Total Registered : 
                                        <span className="font-medium">{allUsers.filter(user => user.status==='Registered').length}</span>
                                    </p>
                                    <p className='px-2 py-1'>Total Pending : 
                                        <span className="font-medium">{allUsers.filter(user => user.status==='Pending').length}</span>
                                    </p>
                                    <div className='flex flex-row sm:flex-col justify-between'>
                                        <div className='font-semibold m-2'>
                                            Status Pending
                                            <p className='font-normal  text-[14px] '>Scholars : 
                                                <span className="font-medium">{allUsers.filter(user => user.status==='Pending' && user.role==='Scholar').length}</span>
                                            </p>
                                            <p className='font-normal  text-[14px] '>Companies : 
                                                <span className="font-medium">{allUsers.filter(user => user.status==='Pending' && user.role==='Company').length}</span>
                                            </p>
                                        </div >
                                        <div className='font-semibold m-2'>
                                            Status Registered
                                            <p className='font-normal  text-[14px] '>Scholars : 
                                                <span className="font-medium">{allUsers.filter(user => user.status==='Registered' && user.role==='Scholar').length}</span>
                                            </p>
                                            <p className='font-normal  text-[14px] '>Companies : 
                                                <span className="font-medium">{allUsers.filter(user => user.status==='Registered' && user.role==='Company').length}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
            <div id='back-to-top' ref={backToTop} className='flex fixed right-6 bottom-3 justify-end py-1 mb-2 px-5 '>
            <div  onClick={()=>window.scrollTo(0,0)} className='text-center cursor-pointer'>
               <BsFillArrowUpCircleFill className='text-violet-300 hover:text-violet-500  drop-shadow-sm text-4xl'/>
            </div>
        </div>
        </div>
         

        </>
    )
}
export default ManageUsers
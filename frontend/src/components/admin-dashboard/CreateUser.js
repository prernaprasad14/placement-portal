import { Link, NavLink,useNavigate} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import React, { useState, useEffect, useContext, useRef} from 'react';
import axios from '../../axiosConfig';
import { UserContext } from '../../App';
import {AiOutlineUserAdd,AiOutlineUsergroupAdd} from 'react-icons/ai'
import {FaUserPlus} from 'react-icons/fa'
import validator from 'validator';

const CreateUser=()=>{
    const [val, setVal] =useState(false)
    const [role, setRole] =useState('Select an option')
    const {state}= useContext(UserContext)
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [allScholars, setAllScholars] = useState([])
    const [allCompanies,setAllCompanies] = useState([])
    const [allUsers,setAllUsers] = useState([])
    const [errors, setErrors] = useState({
        email:false,
        username:false
    })
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState('')
    const [isFileEmpty, setIsFileEmpty] = useState(true)
    const [message, setMessage] = useState('')
    const [fileMessage, setFileMessage] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const scholarEmailRegex = /^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/;

    const handleChange=(e)=>{
        const {name, value} = e.target
        if(name==='email'){
            if(role ==='scholar'){
                // scholarEmailRegex.test(email) ? setEmail(email) : setError({...errors,[e.target.name]:true})
                scholarEmailRegex.test(email) ? setEmail(value) : setErrors('use domain cs.du.ac.in') 
                if(errors.email){
                    console.log(errors)
                   
                }
             
            }else if(role==='company' && validator.isEmail(value)){
                setEmail(value)
               
            }else setErrors('Invalid format') 
            
        }
        else if(name==='useranme'){
            if(validator.isEmpty(username)){
               
                setErrors("useranme cannot be empty")
            }
            else{
                setUsername(value)
            }
        }       
    }

    const handleSubmit  = async (e)=>{
        e.preventDefault();
        console.log('inside createuser submit')
        console.log(role)
        const userObj = {
            'email':email, 'username':username
        }
        if(state==='admin'){
            
            await axios.post(`api/admin/create-user/${role}`, userObj)
        .then(res=>{
            console.log(res)
            if(res.data.success){
                // setSuccess(true)
                getAllUsers();
                setMessage(res.data.message)
                setEmail('')
                setUsername()
                setRole('')
            }
        })
        .catch(error=>{
            setMessage(error.response.data.message)
            // setMessage(error[0])
        })
    }
        // setEmail('')
        // setUsername('')
        // setVal(false)
        // setRole('Choose an option')
    }

    const handleFileSelection=(e)=>{
        
        console.log(file)
        console.log(fileName)
        console.log(e.target.files[0])
        setFile(e.target.files[0]) 
        setFileName(e.target.files[0].name) 
        setIsFileEmpty(false)
    }
    const handleFileUpload=(e)=>{
        e.preventDefault();
        console.log('inside createusers handleFileUpload')
        const formData = new FormData() 
        console.log(file)
        console.log(fileName)
        formData.append('file', file)
        formData.append('fileName', fileName)
        axios.post('api/admin/create-users', formData)
        .then(res=>{
            console.log(res)
            setFileMessage(res.data.message)
        }).catch(error=>{
            console.log(error)
            setFileMessage(error.response.data.message)
            // setError(true)
        })
    }

    const getAllUsers=()=>{
        axios.get('/api/admin/users')
        .then(res=>{
            setAllScholars(res.data.scholars)    
            setAllCompanies(res.data.companies)
            setAllUsers(res.data.createdUsers)
        }).catch(err=>{
            console.log(err)
        })
    }
    const [isAllScholarsActive, setIsAllScholarsActive]= useState(false)
    const [isAllCompaniesActive, setIsAllCompaniesActive]= useState(false)
    const [isAllUsersActive, setIsAllUsersActive]= useState(false)

    const handleShowScholars=()=>{
        setIsAllScholarsActive(!isAllScholarsActive)
    }
    const handleShowCompanies=()=>{
        setIsAllCompaniesActive(!isAllCompaniesActive)
    }
    const handleShowUsers=()=>{
        setIsAllUsersActive(!isAllUsersActive)
    }
    useEffect(()=>{
        // scrolldiv.current.scrollIntoView({behaviour:'smooth'})
        console.log('Inside CreateUser')
        console.log('Inside CreateUser')
        getAllUsers()
        // window.scrollTo(0,0)
        setIsLoading(false)
        if(role==='Select an option'){
            setBtnDisabled(true)
        }
        console.log(role, email, username)
        
        if(file==null){
            setIsFileEmpty(true)
        }else
        setIsFileEmpty(false)
    },[])

    return(
        <>
        <div className='user-select-none w-90% rounded h-auto flex flex-col m-3 bg-white'>
            <div className='flex space-between my-3'>
                <div className='text-lg mx-12 font-semibold w-4/6'><p><FaUserPlus className='mb-2 font-bold text-2xl inline-block'/>&nbsp;Manage Users</p>
                </div>
            </div>
            <div className='mx-10'>
                <ul className='flex text-xs sm:text-sm flex-wrap  '>
                    <li className='px-3 py-2 m-1 sm:py-1 boder-slate-200 border-2'>
                        <HashLink  to='#create-user' className='hover:border-b-slate-500 hover:text-slate-700 px-2 py-1 rounded border-transparent border-4 cusror-pointer'>Create&nbsp;user</HashLink>
                    </li>
                    <li className='px-3 py-2 m-1 sm:py-1 boder-slate-200 border-2'>
                        <HashLink to='#create-multiple-users' className='hover:border-b-slate-500 hover:text-slate-700 px-2 py-1 rounded border-transparent border-4 cusror-pointer'>Create&nbsp;Mulitple&nbsp;Users</HashLink>
                    </li>
                    <li className='px-3 py-2 m-1 sm:py-1 boder-slate-200 border-2'>
                        <HashLink to='#registered-companies' className='hover:border-b-slate-500 hover:text-slate-700 px-2 py-1 rounded border-transparent border-4 cusror-pointer'>Registered&nbsp;Companies</HashLink>
                    </li>
                    <li className='px-3 py-2 m-1 sm:py-1 boder-slate-200 border-2'>
                        <HashLink  to='#registered-scholars' className='hover:border-b-slate-500 hover:text-slate-700 px-2 py-1 rounded border-transparent border-4 cusror-pointer'>Registered&nbsp;Scholars</HashLink>
                    </li>
                    <li className='px-3 py-2 m-1 sm:py-1 boder-slate-200 border-2'>
                        <HashLink to='#all-created-users'  className='hover:border-b-slate-500 hover:text-slate-700 px-2 py-1 rounded border-transparent border-4 cusror-pointer'>All&nbsp;Created&nbsp;Users</HashLink>
                    </li>
                </ul>
            </div>

            <div  className=' h-auto  flex  flex-nowrap flex-col items-start rounded-md border-slate-100  mx-8 my-6 p-4 border-2 text-gray-700'>
                <div id='create-user' className=''>
                    <h3 className='mt-2 mb-2 font-semibold'>Create user</h3>

                    <form className='flex flex-col justify-center items-start rounded p-4'>
                     {errors.email>0 &&  
                       <> <p className='py-2 my-2  text-slate-700'>Use <span className='font-bold italic select-text'>cs.du.ac.in</span> domain to create scholars</p>
                       <p>{errors.email}</p></>}  
                     {message &&  
                        <p className='py-2 my-2 text-emerald-600'>{message}</p>
                       }  
                        <label  className='rounded text-slate-900' >Email</label>
                        <input required onChange={handleChange} type='email' name='email' className='w-68 rounded my-2 h-10 border-2 border-slate-300'/>
                        <label htmlFor='username' className='rounded text-slate-900' >Username</label>
                        <input required onChange={handleChange} type='text' name='username' className='w-68 rounded my-2 h-10 border-2 border-slate-300'/>

                        <select className='h-10 w-44 mx-0 px-2 my-4 rounded-[5px] border-2 border-slate-300 text-slate-600'
                        defaultValue={role} onChange={(e)=>{setVal(true);setRole(e.target.value.toLowerCase())}} >
                            <option selected className={val ? 'hidden':'visible'} disabled={val} value="Select an option">Select an option</option>
                            <option value="scholar">Scholar</option>
                            <option value='company'>Company</option>
                        </select>
                        <button disabled={btnDisabled} onClick={handleSubmit}  type='submit' className={btnDisabled ? 'disabled-btn' :'create-user'} >
                        <AiOutlineUserAdd className='mb-1 font-bold text-2xl inline-block'/>Create User</button>                        
                    </form>
                </div>
                <div className='mt-4 border-t-2 border-slate-100 ' id='create-multiple-users'>
                    <h3 className='mt-4 mb-2 font-semibold'>Create multiple users by uploading file a<span className='font-bold italic '> csv </span>file</h3>
                    <div className='items-center flex rounded w-[1012px] p-4'>
                        <form className='flex flex-col' onSubmit={handleFileUpload}>
                            {fileMessage &&  
                                <p className='py-2 my-2  text-emerald-600'>{fileMessage}</p>
                            }  
                            <div className='flex'>
                                <input name={fileName} required onChange={handleFileSelection} type='file' accept='.xlsx, .xls, .csv' id='file-upload' className='mt-1 mr-6'/>
                                <button disabled={isFileEmpty}  type='submit' className={isFileEmpty ? 'disabled-btn' :'create-user'} >
                                <AiOutlineUsergroupAdd className='mb-1 font-bold text-2xl inline-block'/>Create Users</button>   
                            </div>                      
                        </form>        
                    </div>
                </div>
                
                <div className='my-2 py-4 border-slate-100 '>
                    <h3 id='registered-scholars' onClick={handleShowScholars} className='hover:text-xl  duration-75 hover:cursor-pointer border-b-2 border-slate-200 p-2 text-indigo-600 px-3 flex text-lg font-semibold'>Registered Scholars<span className='px-6  ml-auto text-sm font-semibold '>Total {allScholars.length}</span></h3>
                    <section className=' rounded w-[1012px] '>
                        <table>
                            <thead></thead>
                            <tbody   className={isAllScholarsActive ? 'block mt-3' : 'hidden'}>
                            {allScholars.map(scholar=>{
                                return <>
                                <tr id={scholar.pg_class_roll} className='mx-4 py-2 px-10'>
                                    <td className='px-2 py-4'>{scholar.pg_class_roll}</td>
                                    <td className='px-2 py-4'>{scholar.email}</td>
                                </tr>
                                </>
                            })} 
                            </tbody>
                        </table>
                    </section>
                </div>
                
                <div className='my-2 py-4 border-slate-100 '>
                    <h3  id='registered-companies' onClick={handleShowCompanies} className='hover:text-xl  duration-75 hover:cursor-pointer border-b-2 border-slate-200 p-2 text-indigo-600 px-3 flex text-lg font-semibold'>Registered companies<span className='px-6  ml-auto text-sm font-semibold'>Total {allCompanies.length}</span></h3>
                    <section className='rounded w-[1012px] '>
                        <table>
                            <thead></thead>
                            <tbody  className={isAllCompaniesActive ? 'block mt-3' : 'hidden'}>
                                {allCompanies.map(company=>{
                                    return <>
                                    <tr id={company.email} className='mx-4 py-2 px-10'>
                                        <td className='px-2 py-4'>{company.username}</td>
                                        <td className='px-2 py-4'>{company.email}</td>
                                    </tr>
                                    </>
                                })}
                            </tbody>
                        </table>
                    </section>
                </div>
                <div  className='my-2 py-4 border-slate-100 '>
                    <h3   id='all-created-users' onClick={handleShowUsers}  className='hover:text-xl  duration-75 hover:cursor-pointer border-b-2 border-slate-200 p-2 text-indigo-600 px-3 flex text-lg font-semibold'>Created Users<span className='px-6 ml-auto text-sm font-semibold'>Total {allUsers.length}</span></h3>
                    <section className='rounded w-[1012px] '>
                        <table>
                            <thead></thead>
                            <tbody className={isAllUsersActive ? 'block mt-3' : 'hidden'}>
                                {allUsers.map(user=>{
                                    return <>
                                    <tr id={user.username} className='mx-4 py-2 px-10'>
                                        <td className='px-2 py-4'>{user.username}</td>
                                        <td className='px-2 py-4'>{user.email}</td>
                                    </tr>
                                    </>
                                })}     
                            </tbody>
                        </table>    
                    </section>
                </div>
            </div>
            </div>
        </>
    )
}
export default CreateUser
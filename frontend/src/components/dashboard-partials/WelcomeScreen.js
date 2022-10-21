import { useEffect , useState} from "react"
import Loading from "../Loading"
import {MdSpaceDashboard} from 'react-icons/md'
import axios from '../../axiosConfig'
const WelcomeScreen=()=>{
    const [data, setData]=useState('')
    const [isLoading, setIsLoading]=useState(true)
    const getUsername=()=>{
        setIsLoading(true)

        console.log("inside getUsername")
        try{
            console.log("try-block")
            axios.get('/api/user/username')
            .then((res)=>{
                console.log(res.data.userData)
                setData(res.data.userData)
            })
            .catch((err)=>{
                console.log(err) 
            })
        }catch(error){
            console.log("inside catch-block",error)
        }
        setIsLoading(false)
    }
    
    useEffect(()=>{
        window.scrollTo(0,0)
        console.log("inside WelcomeScreen")
        getUsername()
    },[])

    if(isLoading){
        return (<>
            <Loading message={'Loading Dashboard'}/>
        </>)
    }
    return(<>
         <div className='user-select-none w-90% rounded h-full flex flex-col m-3 bg-white'>
        <div className='flex space-between my-3'>
            <div className='mx-12  w-4/6'><p className='text-lg font-semibold'><MdSpaceDashboard className='mb-1 font-bold text-xl inline-block'/>&nbsp;Dashboard</p>
            </div>
        </div>{console.log(data.lastLogged ===null ,data.lastLogged )}
               {data.lastLogged ===null ?
                    <p className='mx-8 px-4 py-2 mb-2 text-lg bg-violet-400 rounded-sm text-white '><h1>Hello {data.username}, welcome!</h1></p>
                :
                    <p className='mx-8 px-4 py-2 mb-2 text-lg bg-violet-400 drop-shadow-sm rounded-sm text-white '><h1>Hello {data.username}, welcome back!</h1></p>
                }
        <div className="mx-8 mb-8 mt-2 py-2 rounded-lg border-slate-100 h-full border-2 min-h-[300px] text-gray-700 text-sm">
            <div className='flex-col lg:flex-row  flex pt-2 px-4 items-start '>
                {/* <div className='w-auto lg:w-[18%] m-3 px-1'>{userData} */}
               {/* </div> */}
            </div>
        </div>
        </div>
    
    
    
    </>)




}
export default WelcomeScreen
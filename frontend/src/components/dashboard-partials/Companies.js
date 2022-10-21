import { useState, useEffect, useContext } from "react"
import CompanyCard from "./CompanyCard"
import axios from "../../axiosConfig"
import { UserContext } from "../../App";
import Loading from "../Loading";
import {CgOrganisation} from 'react-icons/cg'
const Companies=()=>{
   document.title='Recruiting Companies | DUCS Placement Portal'
   
    const {state}=useContext(UserContext)
    const [companies, setCompanies]= useState('')
    const [isLoading, setIsLoading]= useState(true)
    const date= Date.now()

    const getAllCompanies=()=>{
        console.log("Inside getAllCompanies")
        axios.get('/companies')
        .then((res)=>{
            const companies = res.data.companies;
            console.log("here")
            console.log(res)
            console.log(res.data)
            setCompanies(companies);
            setIsLoading(false)
        })
        .catch(err=> console.log("Error getAllCompanies : "+err))
    }

    useEffect(()=>{ 
        console.log("Inside Companies")
        if(state==='admin'|| state==='scholar'){
            getAllCompanies()
        }
    },[]);
    
    
    if(isLoading){
        return <Loading message={"Just a moment"}/>
    
    }

    return(<>
    <div className="w-90% rounded h-auto flex flex-col m-3 min-h-[685px] bg-white">
        <div className="flex space-between my-3">
            <div className="text-lg mx-12 font-semibold w-4/6 "><p><CgOrganisation className='mb-2 mx-1 font-bold text-xl inline-block'/>Companies</p></div>
        </div>
        <CompanyCard companies={companies}/>
    </div>
    </>)
    
}
export default Companies
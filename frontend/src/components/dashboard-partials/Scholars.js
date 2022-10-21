import { useState, useEffect, useContext } from "react"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ScholarTable from "../studentdashboard/ScholarTable"
import axios from "../../axiosConfig"
import { UserContext } from "../../App";
import Loading from "../Loading";
import {FaUserGraduate} from 'react-icons/fa'

const Scholars=()=>{
   
    const {state}= useContext(UserContext)
    const date = Date.now()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData]= useState(null)
    
    //fetch all scholars
    const getAllScholars=()=>{
        console.log("Inside getAllScholars")  
        axios.get(`/api/scholar/scholars`)
        .then((res)=>{
            const scholars = res.data.scholars;
            console.log(res)
            console.log(res.data)
            setData(scholars);
            console.log(scholars)
            setIsLoading(false)
        })
        .catch(err=> console.log("Error getAllScholars : "+err))
    }

    useEffect(()=>{ 
        console.log("Inside Scholars")
        getAllScholars();
    },[]);

  
    if(isLoading){
        return <Loading message={"Fetching data...This may take a while"}/>
    }
    
    return(
        <>
        <div className="w-90% rounded h-auto flex flex-col  m-3 min-h-[685px] bg-white">
            <div className="flex justify-end my-3 user-select-none">
                <div className="text-lg mx-12  w-4/6 font-semibold"><p><FaUserGraduate className='mb-2  mx-1  font-bold text-lg inline-block'/>Scholars</p></div>
                <div className="download-xls-btn ">
                    <ReactHTMLTableToExcel id="test-table-xls-button"  target="_blank" table="scholars-table"
                    filename={`${date}-scholars`} sheet="tablexls" buttonText="Export&nbsp;View"/>
                </div>
            </div>
            <ScholarTable scholars={data}/>
        </div>
        </>
    )
    
    // return(
    //     <>
    
    //         <div  className="inline-block rounded m-auto px-4 py-2 h-inherit text-white font-300">
    //             <ReactHTMLTableToExcel id="test-table-xls-button" className="download-table-xls-button" target="_blank" table="scholars-table"
    //                 filename={`${date}-scholars`} sheet="tablexls"  buttonText="Export"/>
    //             </div>
    //         <div onLoad={getAllScholars} className="p-9">Scholars
    //             <ScholarTable scholars={scholars}/>
    //         </div>
       
    //     </>
    // )
}
export default Scholars
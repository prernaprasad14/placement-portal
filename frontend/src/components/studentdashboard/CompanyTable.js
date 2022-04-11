import { useEffect, useState } from "react"
import Row from "./CompanyRow"

const CompanyTable=(props)=>{
    console.log(props.companies)
    console.log("4 -insideTable ")
    const [loading, setLoading]= useState(true)
    const {companies}= props
    const date = Date.now()
    var length = Object.keys(companies).length;
    // if(length>0){
    //     setLoading(false)
    // }else{
    //     console.log("j")
    // }
    useEffect(()=>{

    },[length])
    return(
    <>
    <div className="bg-white p-4 flex  rounded-md  text-gray-700">
            <table id="company-table" className="bg-purple-500/40 rounded-md overflow-scroll">
                <thead className="bg-slate-100/25 border-b-2 drop-shadow-sm rounded  overflow-scroll border-gray-700/25 w-10  p-2">
                    <tr>
                        <td><input type="checkbox" className=' rounded-sm focus:bg-transparent border-purple-300 ml-8 my-2 p-2 focus:ring-offset-0'/></td>
                        <td className=" px-8 w-10">Company&nbsp;name</td>
                        <td className=" px-8">Username</td>   
                        <td className=" px-8">Email</td>
                        <td className=' pl-2 pr-8'></td>
                    </tr>
                </thead>
                <tbody className=" px-2 py-4">
                {   Object.entries(companies).map((company)=>{
                        return (<Row company={company}/>)
                    })
                }
                </tbody>   
            </table>
    </div>
    </>
    )
}

export default CompanyTable
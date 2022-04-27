import { useEffect, useState } from "react"
import Row from "./CompanyRow"

const CompanyTable=( {companies})=>{

    console.log("4 -insideTable ")
    console.log(companies)
    const [loading, setLoading]= useState(true)
    const [data, setData] = useState(companies)
    const date = Date.now()
    // var length = Object.keys(companies).length;
    // if(length>0){
    //     setLoading(false)
    // }else{
    //     console.log("j")
    // }
    const sortByDate= (companies)=>{
        const sortedByDate = [...data].sort((a,b)=>
                a[companies.createdAt] > b[companies.createdAt]? 1 : -1
        );
        setData(sortedByDate)
    }
    useEffect(()=>{
        sortByDate(companies)
    },[])

    return(
    <>
    <div className="scrollbar p-4 flex overflow-x-scroll rounded-md  border-slate-100 border-2 mx-8 text-gray-700">
            <table id="company-table" className="rounded-md overflow-scroll">
                <thead  className=" overflow-scroll  w-10  ">
                    <tr>
                        <td><input type="checkbox" className=' rounded-sm focus:bg-transparent border-purple-300 ml-8 my-2 p-2 focus:ring-offset-0'/></td>
                        <td className=" px-8 w-10">Company&nbsp;name</td>
                        <td className=" px-8">Username</td>   
                        <td className=" px-8">Email</td>
                        <td className=' px-8'>Website</td>
                        <td className=' px-8'>Phone&nbsp;no.</td>
                        <td className=' pl-2 pr-8'></td>
                    </tr>
                </thead>
                <tbody className=" px-2 py-4">
                {  data && data.map((company)=>{
                    return (
                        <>
                         <tr >
                            <td><input type="checkbox" className='rounded-sm focus:bg-transparent border-purple-300 ml-8 my-4 p-2'></input></td>
                            <td className=' py-3 px-8'>{company.cname}</td>
                            <td className=' py-3 px-8'>{company.username}</td>
                            <td className=' py-3 px-8'>{company.email}</td>    
                            <td className=' py-3 px-8'>{company.website}</td>    
                            <td className=' py-3 px-8'>{company.phone}</td>    
                            {/* <td className=' py-3 px-2' ><button type="to"><BsThreeDotsVertical /></button></td>         */}
                        </tr>
                        </>
                    )
                })
                }
                </tbody>   
            </table>
    </div>
    </>
    )
}

export default CompanyTable
import { useEffect, useState } from "react"
import Row from "./CompanyRow"

const CompanyCard=( {companies})=>{

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
                a[companies.pre_placement_talk] > b[companies.pre_placement_talk]? 1 : -1
        );
        setData(sortedByDate)
    }
    useEffect(()=>{
        // sortByDate(companies)
        console.log(data )
    },[])
    const handleCompany=()=>{

    }
    return(
    <>
        <div className="flex flex-nowrap m-8 p-4 sm:flex-wrap  rounded-md border-slate-100 border-2 text-gray-700">
                {data && data.map((company)=>{
                    return(<>
                        <div onClick={handleCompany} className="hover:cursor-pointer bg-[#fff] hover:bg-slate-600 drop-shadow-md border-b-8 border-b-slate-600 flex flex-col items-center rounded-lg w-72 p-2 m-2 h-[370px]">
                            <img src={company.avatar} 
                                className="rounded-full border-[5px] mt-2 border-slate-600 bg-white p-1" width="140px" height="140px"/>
                            <h2 className="bg-white rounded-md border-none font-bold mt-1 p-1 text-lg">{company.cname}</h2>
                            <a href={company.website}><p className=" bg-white no-underline hover:underline focus:underline text-slate-900 rounded-md font-semibold mt-3 p-1 py-2 w-64 ">{company.website}</p></a>
                            <hr className="bg-slate-700 h-1 w-full mt-1"/>
                            <p className=" bg-white rounded-md font-semibold mt-1 p-1 py-2 w-64">PPT : {company.pre_placement_talk}</p>
                        </div>
                    </>)
                    })
                }
        </div>
    </>
    )
}

export default CompanyCard
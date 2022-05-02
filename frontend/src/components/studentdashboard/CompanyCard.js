import { useEffect, useState } from "react"
import Row from "./CompanyRow"

const CompanyCard=( {companies})=>{

    console.log("4 -insideTable ")
    console.log(companies)
    const [loading, setLoading]= useState(true)
    const [data, setData] = useState(companies)
    const [dataSorted, setDataSorted] = useState({})
    const date = Date.now()
    // var length = Object.keys(companies).length;
    // if(length>0){
    //     setLoading(false)
    // }else{
    //     console.log("j")
    // }
    const sortByPPT= (data)=>{
        console.log(data)
        const sortedByPPT = [...data].sort((a,b) => {
                return new Date(a.pre_placement_talk).getTime() - new Date(b.pre_placement_talk).getTime()
            })
        
        console.log(sortedByPPT)
        setData(sortedByPPT)
    }
    useEffect(()=>{
        sortByPPT(companies)
        console.log(data)
        console.log(dataSorted)
    },[])
    const handleCompany=()=>{

    }
    function getParsedDate(rawdate){
        rawdate = new Date(rawdate)
        var splitDate = String(rawdate).split(' ');
        console.log(date)
        var day = String(splitDate[0])+', '
        var month = String(splitDate[1])+' '
        var date = String(splitDate[2])+', '
        var year= rawdate.getFullYear()
        console.log(year)

        return [day, month, date, year];
      }
    return(
    <>
    <div className="flex flex-unwrap items-center flex-col sm:flex-row sm:flex-wrap">
        {data && data.map((company)=>{
            return(<>
                <div onClick={handleCompany} className="hover:cursor-pointer bg-[#fff] hover:bg-slate-600 hover:scale-105  duration-75 drop-shadow-lg border-b-8 border-b-slate-600 flex flex-col items-center rounded-lg w-[280px] px-3 m-4 h-[370px]">
                    <img src={company.avatar} 
                        className="rounded-full border-[5px] mt-2 border-slate-600 bg-white p-1" width="130px" height="130px"/>
                    <h2 className="bg-white rounded-md border-none font-bold mt-2 p-1 text-lg mx-1">{company.cname}</h2>
                    <p className="break-words bg-white text-slate-900 rounded-md font-semibold mt-3 p-1 py-2 w-[250px] h-16 mx-1"><a href={company.website} className="no-underline text-slate-900 hover:underline focus:underline">{company.website}</a></p>
                    <hr className="bg-slate-700 h-1 w-full mt-1"/>
                    <p className=" bg-white rounded-md font-bold mt-1 p-1 py-2 w-[250px] text-rose-600 ">PPT :&nbsp;
                        <span className="font-semibold text-slate-900">
                            {getParsedDate(company.pre_placement_talk).map(date=>{
                                return <span>{date}</span>
                            })}
                        </span>
                    </p>
                    <p className=" bg-white rounded-md font-bold mt-1 p-1 py-2 w-[250px] text-rose-600 mx-1 ">Coding test :&nbsp;
                        <span className="font-semibold text-slate-900">
                            {getParsedDate(company.coding_test_date).map(date=>{
                                return <span>{date}</span>
                            })}
                        </span>
                    </p>
                   
                </div>
            </>)
            })
        }
    </div>
        
    </>
    )
}

export default CompanyCard
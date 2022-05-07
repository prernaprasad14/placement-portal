import axios from "../../axiosConfig"
import { useEffect, useState } from "react"
import Row from "../studentdashboard/CompanyRow"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

const CompanyCard = ({companies}) =>{
    const navigate = useNavigate()
    console.log("4 -insideTable ")
    console.log(companies)
    const [loading, setLoading]= useState(true)
    const [data, setData] = useState(companies)
    const [choice, setChoice] = useState('Sort by PPT')

    const sortByPPT= (data, choice)=>{
        console.log("sortByPPT")
        const sortedByPPT = [...data].sort((a,b) => {
                return new Date(a.pre_placement_talk).getTime() - new Date(b.pre_placement_talk).getTime()
            })
        
        console.log(sortedByPPT)
        setData(sortedByPPT)
        setChoice(choice)
    }
  
    const sortByName= (data, choice)=>{
        console.log("sortByName")
        console.log(data)
        console.log(choice)
        const sortedByName = [...data].sort((a,b) => {
               return a.username  > b.username ? 1 : -1
            })
        setData(sortedByName)
        setChoice(choice)
    }
    
    const sortCompanies=(choice)=>{
        console.log("inside sortCompanies")
        switch(choice){
            case 'Sort by PPT': {
                    sortByPPT(data, choice)
                    break;  
            }
            case 'Sort by Name': {
                    sortByName(data, choice)
                    break;
            }
            default : {
                sortByPPT(data, choice)
            }
        }
    }
    
    const handleCompany=(e)=>{
        const username =  e.target.id
        console.log(e.target.id)
        
            navigate(`/dashboard/profile/${username}`)
    }

    useEffect(()=>{
        sortCompanies(choice)
    },[choice])
    
    function getParsedDate(rawdate){
        rawdate = new Date(rawdate)
        var splitDate = String(rawdate).split(' ');
        var day = String(splitDate[0])+', '
        var month = String(splitDate[1])+' '
        var date = String(splitDate[2])+', '
        var year= rawdate.getFullYear()
        return [day, month, date, year];
      }


    return(
    <>
    <div className="text-lg flex ">
        <select className="ml-auto mr-[100px] w-44 px-2 rounded-[5px] border-2 border-slate-300 text-slate-600"
                defaultValue={choice} onChange={(e)=>sortCompanies(e.target.value)} >
            <option >Sort by PPT</option>
            <option >Sort by Name</option>
        </select>
    </div>
    <div className="flex flex-unwrap items-center flex-col sm:flex-row sm:flex-wrap rounded-md border-slate-100  mx-8 my-6 p-4 border-2 text-gray-700">
        {data && data.map((company)=>{
            return(<>
                <Link to={`/job-desc/${company.username}`} className="hover:text-slate-900">
                    <div onClick={(e)=>handleCompany(e)} id={company.username}  className="hover:cursor-pointer bg-[#fff] hover:bg-slate-600 hover:scale-105  duration-75 drop-shadow-lg border-b-8 border-b-slate-600 flex flex-col items-center rounded-lg w-[280px] px-3 m-4 h-[370px]">
                        <img src={company.avatar} 
                            className="rounded-full border-[5px] mt-2 border-slate-600 bg-white p-1" width="130px" height="130px"/>
                        <h2 className="bg-white rounded-md border-none font-bold mt-2 p-1 text-lg mx-1">{company.username}</h2>
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
                </Link>
                                
            </>)
            })
        }
    </div>   
    </>
    )
}

export default CompanyCard
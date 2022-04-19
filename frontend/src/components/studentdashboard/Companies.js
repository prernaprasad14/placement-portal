import { useState, useEffect } from "react"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CompanyTable from "./CompanyTable"
import axios from "../../axiosConfig"

const Companies=({data})=>{
    console.log("1 inside Companies")
    console.log("3333333 companiesData"+data)
    const [companies, setCompanies]= useState('')
    const date= Date.now()
    console.log("2 Company")
    useEffect(()=>{
        getAllCompanies()
    },[]);


    const getAllCompanies=()=>{
        console.log("here here")
        axios.get('/companies')
        .then((res)=>{
            const companies = res.data.companies;
            console.log("here")
            console.log(res)
            console.log(res.data)
            setCompanies(companies);
        })
        .catch(err=> console.log("Error getAllCompanies : "+err))
    }
    if(data!=null){
        console.log("6666666666 data"+data)
        return(<>
        <div className="bg-red-300">
            <div className="bg-emerald-600 hover:bg-green-500  inline-block rounded m-auto px-4 py-2 text-white font-300"><ReactHTMLTableToExcel id="test-table-xls-button" className="download-table-xls-button" target="_blank" table="company-table"
            filename={`companies`+date} sheet="tablexls"  buttonText="Export"/></div>
            <div className=" p-9">Companies
                <CompanyTable companies={data}/>
            </div>
        </div>
        </>)
    }
    return(
        <>
        <div className="bg-yellow-300">
            <div className="bg-emerald-600 hover:bg-green-500  inline-block rounded m-auto px-4 py-2 text-white font-300"><ReactHTMLTableToExcel id="test-table-xls-button" className="download-table-xls-button" target="_blank" table="company-table"
            filename={`companies`+date} sheet="tablexls"  buttonText="Export"/></div>
            <div onLoad={getAllCompanies} className=" p-9">Companies
                <CompanyTable companies={companies}/>
            </div>
        </div>
        </>
    )
}
export default Companies
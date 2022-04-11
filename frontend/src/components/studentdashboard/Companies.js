import { useState, useEffect } from "react"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CompanyTable from "./CompanyTable"
import axios from "../../axiosConfig"

const Companies=()=>{
    console.log("1 inside Companies")
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
    return(
        <>
        <div onLoad={getAllCompanies} className="bg-yellow-300 p-9">hello
        <div  className="bg-emerald-600 hover:bg-green-500  inline-block rounded m-auto px-4 py-2 text-white font-300"><ReactHTMLTableToExcel id="test-table-xls-button" className="download-table-xls-button" target="_blank" table="company-table"
        filename={`companies`+date} sheet="tablexls"  buttonText="Export"/></div>
            <CompanyTable companies={companies}/>
        </div>
        </>
    )
}
export default Companies
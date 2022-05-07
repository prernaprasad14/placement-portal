import { useState, useEffect } from "react"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ScholarTable from "../studentdashboard/ScholarTable"
import axios from "../../axiosConfig"

const Scholars=({data})=>{
    console.log("1 inside Scholars")
    console.log("1 inside Scholars"+data)
    const [scholars, setScholars]= useState('')
    console.log("2 Scholar")
    useEffect(()=>{
        getAllScholars()
    },[]);
    const date = Date.now()
    const getAllScholars=()=>{
        console.log("here here")
        axios.get('/scholars')
        .then((res)=>{
            const scholars = res.data.scholars;
            console.log("here")
            console.log(res)
            console.log(res.data)
            setScholars(scholars);
        })
        .catch(err=> console.log("Error getAllScholars : "+err))
    }
    if(data!=''){
        return(
            <>
            <div className="w-90% rounded h-auto flex flex-col m-3 bg-white">
                <div className="flex justify-end my-3">
                    <div className="text-lg mx-12  w-4/6 font-semibold"><p>Scholars</p></div>
                    <div className="download-xls-btn inline-block rounded m-auto px-4 py-2 1/6 text-white font-300">
                        <ReactHTMLTableToExcel id="test-table-xls-button"  target="_blank" table="scholars-table"
                        filename={`${date}-scholars`} sheet="tablexls" buttonText="Export"/>
                    </div>
                </div>
                    <ScholarTable scholars={data}/>
            </div>
            </>
        )
    }

    return(
        <>
    
            <div  className="inline-block rounded m-auto px-4 py-2 h-inherit text-white font-300">
                <ReactHTMLTableToExcel id="test-table-xls-button" className="download-table-xls-button" target="_blank" table="scholars-table"
                    filename={`${date}-scholars`} sheet="tablexls"  buttonText="Export"/>
                </div>
            <div onLoad={getAllScholars} className="p-9">Scholars
                <ScholarTable scholars={scholars}/>
            </div>
       
        </>
    )
}
export default Scholars
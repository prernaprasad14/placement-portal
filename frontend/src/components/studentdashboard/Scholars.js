import { useState, useEffect } from "react"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ScholarTable from "./ScholarTable"
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
            <div className="bg-blue-300">
                <div  className="bg-emerald-600 hover:bg-green-500  inline-block rounded m-auto px-4 py-2 text-white font-300"><ReactHTMLTableToExcel id="test-table-xls-button" className="download-table-xls-button" target="_blank" table="scholars-table"
                    filename={`${date}-scholars`} sheet="tablexls"  buttonText="Export"/>
                    </div>
                <div className="p-9">Scholars
                    <ScholarTable scholars={data}/>
                </div>
            </div>
            </>
        )
    }
    return(
        <>
        <div className="bg-blue-300">
            <div  className="bg-emerald-600 hover:bg-green-500  inline-block rounded m-auto px-4 py-2 text-white font-300"><ReactHTMLTableToExcel id="test-table-xls-button" className="download-table-xls-button" target="_blank" table="scholars-table"
                filename={`${date}-scholars`} sheet="tablexls"  buttonText="Export"/>
                </div>
            <div onLoad={getAllScholars} className="p-9">Scholars
                <ScholarTable scholars={scholars}/>
            </div>
        </div>
        </>
    )
}
export default Scholars
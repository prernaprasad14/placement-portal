import { useState, useEffect } from "react"
import { CSVLink, CSVDownload } from "react-csv";
import Table from "./Table"
import axios from "../../axiosConfig"

const Scholars=()=>{
    console.log("inside Scholars")
    console.log("1 Scholar")
    const [scholars, setScholars]= useState('')
    console.log("2 Scholar")
    useEffect(()=>{
        getAllScholars()
    },[]);

    const csvData=  [Object.entries(scholars).map((scholar)=>{
        return JSON.stringify(scholar)})]

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
    return(
        <>
        <div  className="bg-emerald-500 inline-block rounded m-auto px-4 py-2 text-white font-300"><CSVLink data={csvData}>Export</CSVLink></div>
        <div onLoad={getAllScholars} className="bg-yellow-300 p-9">hello
            <Table scholars={scholars}/>
        </div>
        </>
    )
}
export default Scholars
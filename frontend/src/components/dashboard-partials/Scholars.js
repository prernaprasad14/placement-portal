import { useState, useEffect, useContext } from "react"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ScholarTable from "../studentdashboard/ScholarTable"
import axios from "../../axiosConfig"
import { UserContext } from "../../App";
import Loading from "../Loading";

const Scholars=({data})=>{
    console.log("1 inside Scholars")
    const {state}= useContext(UserContext)
    const date = Date.now()
    const [scholars, setScholars]= useState(null)
    console.log("2 Scholar")
    useEffect(()=>{
        console.log(typeof data)
        getAllScholars()
    },[]);


    const getAllScholars=()=>{
        console.log("here here")  
        console.log(state)
        axios.post(`/scholars/${state}`)
        .then((res)=>{
            const scholars = res.data.scholars;
            console.log("here")
            console.log(res)
            console.log(res.data)
            setScholars({scholars});
            console.log(typeof scholars)
            setScholars(scholars);
            console.log(typeof scholars)

        })
        .catch(err=> console.log("Error getAllScholars : "+err))
    }
        
        
    
    if(data!=''){
        return(
            <>
            <div className="w-90% rounded h-auto flex flex-col m-3 bg-white">
                <div className="flex justify-end my-3">
                    <div className="text-lg mx-12  w-4/6 font-semibold"><p>Scholars</p></div>
                    <div className="download-xls-btn ">
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
        <Loading message={"Fetching data...This may take a while"}/>
    )
 
    
    // return(
    //     <>
    
    //         <div  className="inline-block rounded m-auto px-4 py-2 h-inherit text-white font-300">
    //             <ReactHTMLTableToExcel id="test-table-xls-button" className="download-table-xls-button" target="_blank" table="scholars-table"
    //                 filename={`${date}-scholars`} sheet="tablexls"  buttonText="Export"/>
    //             </div>
    //         <div onLoad={getAllScholars} className="p-9">Scholars
    //             <ScholarTable scholars={scholars}/>
    //         </div>
       
    //     </>
    // )
}
export default Scholars
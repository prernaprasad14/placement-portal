import { useEffect, useState } from "react"
import Row from "./ScholarRow"

const ScholarTable=(props)=>{
    console.log(props.scholars)
    console.log("4 -insideTable ")
    const [loading, setLoading]= useState(true)
    const {scholars}= props
    const [sortedField, setSortedField] = useState(null);
    let sortedScholars = [...scholars];
    if (sortedField !== null) {
        sortedScholars.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
            return -1;
        }
        if (a[sortedField] > b[sortedField]) {
            return 1;
        }
        return 0;
        });
    }
    // var length = Object.keys(scholars).length;
    // if(length>0){
    //     setLoading(false)
    // }else{
    //     console.log("j")
    // }
    useEffect(()=>{

    },[length])
    return(
    <>
    <div className="scrollbar p-4 flex overflow-x-scroll rounded-md  border-slate-100 border-2 mx-8 text-gray-700">
    
            <table id="scholars-table" className="rounded-md ">
                <thead className=" w-10">
                    <tr>
                        <td><input type="checkbox" className=' rounded-sm focus:bg-transparent my-2 border-purple-300 ml-8 p-2 focus:ring-offset-0'></input></td>
                        <td className=" px-8 w-10" onClick={()=>setSortedField('fname')}>First&nbsp;name</td>
                        <td className=" px-8">Last&nbsp;name</td>   
                        <td className=" px-8">Email</td>
                        <td className=' px-8'>Phone no.</td>
                        <td className=' px-8'>Status</td>
                        <td className=' pl-2 pr-8'></td>
                    </tr>
                </thead>
                <tbody className="px-2 py-4">
                {   Object.entries(scholars).map((scholar)=>{
                    console.log(JSON.stringify(scholar))
                        return (<Row scholar={scholar}/>)
                    })
                }
                </tbody>   
            </table>
  
    </div>
    </>
    )
}

export default ScholarTable
import { useEffect, useState, createElement} from "react"
import { MdSelectAll } from "react-icons/md";
import { BsThreeDotsVertical,BsArrowLeftSquareFill,BsArrowRightSquareFill } from 'react-icons/bs';
import { RiArrowUpSFill} from 'react-icons/ri';
import Row from "./ScholarRow"

const ScholarTable=({scholars})=>{
    console.log("4 -insideTable ")
    const [data, setData] = useState(scholars)
    const [loading, setLoading]= useState(true)
    const [order, setOrder]= useState("ASC")
    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState({
        fname:false
    })
    const [rowCount, setRowCount]= useState(scholars.length)
    


    const [checkedState, setCheckedState] = useState(new Array(rowCount).fill(false));

    const handleOnChange = (position) => {
        console.log("position")
        console.log(position)
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }
    

    const sort=(col)=>{
        if(order=="ASC"){
            const sorted = [...data].sort((a,b)=>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setData(sorted)
            setOrder("DES")
        }
        if(order=="DES"){
            const sorted = [...data].sort((a,b)=>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setData(sorted)
            setOrder("ASC")
        }
    }
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
      };
      const selectAllRows=()=>{
        console.log("inside select all rows")
      }



    const selectAllFields=(e)=>{
        console.log(e.target)
        setCheckedAll(true)
    }
    
    const selectPostGrad =() =>{
        setChecked
    }
    const selectGrads =() =>{

    }
    const selectInter =() =>{

    }
    const selectHighschool =() =>{

    }
    const totalRowCount=()=>{
            const len= scholars.length
            setRowCount(len)
        }
    useEffect(()=>{
        console.log(data)
        totalRowCount()
    },[rowCount])
    let count=0;
    return(
    <>
    <div className="flex flex-col">
    <div className=" p-4 mx-3 flex border-slate-100 text-gray-700">
        <input type="checkbox" onClick={selectAllFields} name="selectAll" className="mt-2 rounded-sm  border-purple-300 p-2 "/>
        <label for ="selectAll" className="px-2 mr-5">All</label>
        <input type="checkbox" onClick={selectPostGrad} name="selectAll" className="mt-2 rounded-sm  border-purple-300 p-2 "/>
        <label for ="selectAll" className="px-2 mr-5">Post Graduation Details</label>
        <input type="checkbox" onClick={selectGrads} name="selectAll" className="mt-2 rounded-sm  border-purple-300 p-2 "/>
        <label for ="selectAll" className="px-2 mr-5">Graduation Details</label>
        <input type="checkbox" onClick={selectInter} name="selectAll" className="mt-2 rounded-sm  border-purple-300 p-2 "/>
        <label for ="selectAll" className="px-2 mr-5">Intermediate Details</label>
        <input type="checkbox" onClick={selectHighschool} name="selectAll" className="mt-2 rounded-sm  border-purple-300 p-2 "/>
        <label for ="selectAll" className="px-2 mr-5">HighSchool Details</label>
    </div>
    <div className="scrollbar flex-1 flex-col h-32 p-4 overflow-scroll sm:overflow-scroll rounded-md  border-slate-100 border-2 mx-8 text-gray-700">
            <table id="scholars-table" className=" flex-1 rounded-md ">
                <thead className="">
                    <tr>
                        <th rowSpan="2" key="check"><input type="checkbox" onClick={()=>selectAllRows()} className=' rounded-sm my-2 border-purple-300 ml-8 p-2 '></input></th>
                        <th rowSpan="2" key="fname" onClick={(e)=>sort('fname')} className="px-1 cursor-pointer">
                            <p>First&nbsp;name<span className={order==="ASC" ? "rotate-180 ":""}></span></p>
                        </th>
                        <th rowSpan="2" key="lname" onClick={()=>sort('lname')} className="px-1 cursor-pointer">
                            <p >Last&nbsp;name<span className={order==="ASC" ? "rotate-180":""}></span></p>
                        </th>
                        <th rowSpan="2" key="email" onClick={()=>sort('email')} className="px-1 ml-2 cursor-pointer">
                            <p>Email
                                <span className={order==="ASC" ? "px-2 rotate-180":"px-2 "}></span>
                            </p>
                        </th>
                        <th rowSpan="2" key="phone" className=' ml-2 px-1 '>Phone no.</th>
                        <th rowSpan="2" key="alt_phone" className=' px-8  py-2'>Alternative Phone no.</th>
                        <th rowSpan="2" key="status" onClick={()=>sort('status')} className="px-1 ">Status</th>
                        <th rowSpan="2" key="gender" className="px-1 mr-10">Gender</th>                   
                        <th colSpan="3" key="pg" className="px-1 mr-10"><td className="px-32">Post-Graduation Details</td>
                            <th onClick={()=>sort('pg_course')}><p>Course<span className={order==="ASC" ? " rotate-180":""}></span></p></th>
                            <th onClick={()=>sort('pg_backlogs')}><p>Backlogs<span className={order==="ASC" ? " rotate-180":""}></span></p></th>
                            <th onClick={()=>sort('pg_backlog_details')}><p>Backlog details<span className={order==="ASC" ? " rotate-180":""}></span></p></th>
                            <th onClick={()=>sort('pg_backlog_details')}><p>Backlog details<span className={order==="ASC" ? " rotate-180":""}></span></p></th>
                            <th onClick={()=>sort('pg_backlog_details')}><p>Backlog details<span className={order==="ASC" ? " rotate-180":""}></span></p></th>
                            <th onClick={()=>sort('pg_backlog_details')}><p>Backlog details<span className={order==="ASC" ? " rotate-180":""}></span></p></th>
                        </th>                   
                        <th className=' pl-2 pr-8'></th>
                    </tr>
                </thead>
                <tbody className="px-2 py-4">
                {  
                    data.map((scholar,index)=>{
                        return (<>
                            {
                            <tr key={count++} > 
                                <td className=" py-3 px-8 border-1  border-gray-100 "><input onClick={()=>handleOnChange(index)} type="checkbox" className='rounded-sm border-purple-300 p-2'></input></td>
                                <td className=' py-3 pl-2  border-1  border-gray-100 pr-12'>{scholar.fname}</td>
                                <td className=' py-3 pl-2  border-1  border-gray-100 pr-12'>{scholar.lname}</td>
                                <td className=' py-3 pl-2  border-1  border-gray-100 pr-12'>{scholar.email}</td>
                                <td className=' py-3 pl-2  border-1  border-gray-100 pr-12'>{scholar.phone}</td>
                                <td className=' py-3 pl-2  border-1  border-gray-100 pr-12'>{scholar.alternative_phone}</td>
                                <td className=' py-3 pl-2  border-1  border-gray-100 pr-12'>{scholar.placement_status}</td>        
                                <td className=' py-3 pl-2  border-1  border-gray-100 pr-20 w-5'>{scholar.gender}</td>    
                                <td className=' py-3 pl-2  border-1  border-gray-100 pr-20 w-5'>{scholar.pg_backlogs}</td>      
                                <td className=' py-3 pl-2  border-1  border-gray-100 pr-20 w-5'>{scholar.pg_backlog_details}</td>      
                                <td className=' py-3 pl-2  border-1  border-gray-100 pr-20 w-5'>{scholar.pg_class_roll}</td>       
                                <td className=' py-3 pl-2  border-1  border-gray-100 pr-20 w-5'>{scholar.pg_course}</td>      
                                <td className=' py-3 pl-2  border-1  border-gray-100 pr-20 w-5'>{scholar.pg_backlogs}</td>      
                                <td className=' py-3 pl-2  border-1  border-gray-100 pr-20 w-5'>{scholar.pg_backlog_details}</td>       
                                <td className=' py-3 px-2 border-1  border-gray-100'><button><BsThreeDotsVertical /></button></td>
                            </tr>}
                        </>)
                    })
                }
                </tbody>   
            </table>
    </div>
    <div id="pagination" className="">
        <div className=" flex p-4 mr-8 justify-end">
            { rowCount>25 && <p className="px-4 py-1">showing results 25 of {rowCount}</p>}
            { rowCount==25 && <p className="px-4 py-1">showing results 25 of 25</p>}
            { rowCount<25 && <p className="px-4 py-1">showing results {rowCount} of {rowCount}</p>}                
            <BsArrowLeftSquareFill onClick={()=>setRowCount({rowCount}-1)}className="text-2xl text-violet-300 m-1 cursor-pointer"/>
            <BsArrowRightSquareFill onClick={()=>setRowCount({rowCount}+1)}className="text-2xl text-violet-300 m-1 cursor-pointer"/>
        </div>
    </div>
    </div>
    </>
    )
}

export default ScholarTable
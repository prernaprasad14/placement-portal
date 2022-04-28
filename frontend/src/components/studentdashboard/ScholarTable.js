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
    const [course, setCourse]=useState("")


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

    const handleCourseSelection=({course})=> {
        console.log(course+"course Selected!!");
        setCourse({course});
        console.log(course);
      
        }
        
    useEffect(()=>{
        console.log(data)
        totalRowCount()
    },[rowCount])
    let count=1;
    return(
    <>
    <div className="flex flex-col">
        <div className=" px-4 py-2 mx-3 flex items-center border-slate-100 text-gray-700 text-sm">
            <input type="checkbox" onClick={selectAllFields} name="selectAll" className=" rounded-sm  border-purple-300 "/>
            <label for ="selectAll" className="px-1 mr-5">All</label>
            <input type="checkbox" onClick={selectPostGrad} name="selectAll" className=" rounded-sm  border-purple-300 "/>
            <label for ="selectAll" className="px-1 mr-5">Post Graduation&nbsp;Details</label>
            <input type="checkbox" onClick={selectGrads} name="selectAll" className=" rounded-sm  border-purple-300 "/>
            <label for ="selectAll" className="px-1 mr-5">Graduation&nbsp;Details</label>
            <input type="checkbox" onClick={selectInter} name="selectAll" className=" rounded-sm  border-purple-300 "/>
            <label for ="selectAll" className="px-1 mr-5">Intermediate&nbsp;Details</label>
            <input type="checkbox" onClick={selectHighschool} name="selectAll" className=" rounded-sm  border-purple-300 "/>
            <label for ="selectAll" className="px-1 mr-5">HighSchool&nbsp;Details</label>
            <div className="select-container">
            <select>
           
              <option onClick={()=>handleCourseSelection("MCA")} value="MCA">MCA</option>
              <option onClick={()=>handleCourseSelection("MSC")} value="MSC">MSC</option>
            
          </select>
        </div>
        </div>
        <div className="scrollbar flex-1 flex-col h-32 p-3 overflow-scroll sm:overflow-scroll rounded-md  border-slate-100 border-2 mx-8 text-gray-700">
                <table id="scholars-table" className="rounded-md auto ">
                    <thead className="">
                        <tr>
                            <th rowSpan="2" key="check"><input type="checkbox" onClick={()=>selectAllRows()} className=' rounded-sm mx-2 border-purple-300'></input></th>
                            <th rowSpan="2" key="srno" >Sr&nbsp;no.</th>
                            <th rowSpan="2" key="fname" onClick={(e)=>sort('fname')} className=" cursor-pointer">
                                First&nbsp;name<span className={order==="ASC" ? "rotate-180 ":""}></span>
                            </th>
                            <th rowSpan="2" key="lname" onClick={()=>sort('lname')} className="cursor-pointer">
                               Last&nbsp;name<span className={order==="ASC" ? "rotate-180":""}></span>
                            </th>
                            <th rowSpan="2" key="email" onClick={()=>sort('email')} className=" cursor-pointer">
                                Email
                                    <span className={order==="ASC" ? "px-2 rotate-180":"px-2 "}></span>
                                
                            </th>
                            <th rowSpan="2" key="phone" className=''>Phone&nbsp;no.</th>
                            <th rowSpan="2" key="alt_phone" className=''>Alternative&nbsp;no.</th>
                            <th rowSpan="2" key="status" onClick={()=>sort('placement_status')} className=" ">Status<span className={order==="ASC" ? "px-2 rotate-180":"px-2 "}></span></th>
                            <th rowSpan="2" key="gender" className="">Gender</th>                   
                            <th colSpan="6" key="pg" className="">Post&#8209;Graduation&nbsp;Details</th>                   
                            <th colSpan="8" key="grad" className="">Graduation&nbsp;Details</th>                   
                            <th colSpan="6" key="inter" className="">Intermediate&nbsp;Details</th>                   
                            <th colSpan="6" key="high" className="">HighSchool&nbsp;Details</th>                   
                            <th rowSpan="2" key="btn" className=""></th>                   
                        </tr>
                        <tr> 
                            <td onClick={()=>sort('pg_course')}>Course<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('pg_exam_roll')}>Exam&nbsp;roll&nbsp;no.<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('pg_class_roll')}>Class&nbsp;roll&nbsp;no.<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('pg_aggr_percentage')}>Class&nbsp;roll&nbsp;no.<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('pg_backlogs')}>Backlogs<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td>Backlog&nbsp;details</td>
                            <td onClick={()=>sort('grad_university')}>University<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('grad_college')}>College<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('grad_course')}>Course<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('grad_roll_no')}>Roll&nbsp;no.<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('grad_max_marks')}>Maximum&nbsp;marks</td>
                            <td onClick={()=>sort('grad_marks_obtained')}>Marks&nbsp;obtained</td>
                            <td onClick={()=>sort('grad_aggr_percentage')}>Percentage<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('grad_year_of_passing')}>Year&nbsp;of&nbsp;passing<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('inter_board')}>Board<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('inter_roll_no')}>Roll&nbsp;no.<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('inter_max_marks')}>Maximum&nbsp;marks</td>
                            <td onClick={()=>sort('inter_marks_obtained')}>Marks&nbsp;obtained</td>
                            <td onClick={()=>sort('inter_aggr_percentage')}>Percentage<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('inter_year_of_passing')}>Year&nbsp;of&nbsp;passing<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('high_board')}>Board<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('high_roll_no')}>Roll&nbsp;no.<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('high_max_marks')}>Maximum&nbsp;marks</td>
                            <td onClick={()=>sort('high_marks_obtained')}>Marks&nbsp;obtained</td>
                            <td onClick={()=>sort('high_aggr_percentage')}>Percentage<span className={order==="ASC" ? " rotate-180":""}></span></td>
                            <td onClick={()=>sort('high_year_of_passing')}>Year&nbsp;of&nbsp;passing<span className={order==="ASC" ? " rotate-180":""}></span></td>
                        </tr>
                    </thead>
                    <tbody className="px-2 py-4">
                    {  
                        data.map((scholar,index)=>{
                            return (<>
                                {
                                <tr key={count++} > 
                                    <td className=''><input onClick={()=>handleOnChange(index)} type="checkbox" className='rounded-sm mx-2 border-purple-300'></input></td>
                                    <td className=''>{++index}</td>
                                    <td className=''>{scholar.fname}</td>
                                    <td className=''>{scholar.lname}</td>
                                    <td className=''>{scholar.email}</td>
                                    <td className=''>{scholar.phone}</td>
                                    <td className=''>{scholar.alternative_phone}</td>
                                    <td className=''>{scholar.placement_status}</td>        
                                    <td className=''>{scholar.gender}</td>    
                                    <td className=''>{scholar.pg_course}</td>      
                                    <td className=''>{scholar.pg_exam_roll}</td>      
                                    <td className=''>{scholar.pg_class_roll}</td>       
                                    <td className=''>{scholar.pg_aggr_percentage}</td>      
                                    <td className=''>{scholar.pg_backlogs}</td>      
                                    <td className=''>{scholar.pg_backlog_details}</td>       
                                    <td className=''>{scholar.grad_university}</td>      
                                    <td className=''>{scholar.grad_college}</td>      
                                    <td className=''>{scholar.grad_course}</td>       
                                    <td className=''>{scholar.grad_roll_no}</td>       
                                    <td className=''>{scholar.grad_max_marks}</td>      
                                    <td className=''>{scholar.grad_marks_obtained}</td>      
                                    <td className=''>{scholar.grad_aggr_percentage}</td>       
                                    <td className=''>{scholar.grad_year_of_passing}</td>       
                                    <td className=''>{scholar.inter_board}</td>      
                                    <td className=''>{scholar.inter_roll_no}</td>       
                                    <td className=''>{scholar.inter_max_marks}</td>      
                                    <td className=''>{scholar.inter_marks_obtained}</td>      
                                    <td className=''>{scholar.inter_aggr_percentage}</td>       
                                    <td className=''>{scholar.inter_year_of_passing}</td>       
                                    <td className=''>{scholar.high_board}</td>      
                                    <td className=''>{scholar.high_roll_no}</td>       
                                    <td className=''>{scholar.high_max_marks}</td>      
                                    <td className=''>{scholar.high_marks_obtained}</td>      
                                    <td className=''>{scholar.high_aggr_percentage}</td>       
                                    <td className=''>{scholar.high_year_of_passing}</td>       
                                    <td className=''><button><BsThreeDotsVertical /></button></td>
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
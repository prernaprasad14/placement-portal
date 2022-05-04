import { useEffect, useState, createElement} from "react"
import  ReactDOM  from "react-dom";
import { BsThreeDotsVertical,BsArrowLeftSquareFill,BsArrowRightSquareFill } from 'react-icons/bs';
import { RiArrowUpSFill} from 'react-icons/ri';
import Row from "./ScholarRow"

const ScholarTable=({scholars})=>{
    console.log("4 -insideTable ")
    let count=1;
    const [data, setData] = useState(scholars)
    const [order, setOrder]= useState("ASC")
    const [rowCount, setRowCount]= useState(scholars.length)
    const [checkedAllRow, setCheckedAllRow] = useState(true);
    const [checkedRow, setCheckedRow] = useState(new Array(rowCount).fill(true));
    const [checkedAll, setCheckedAll] = useState(true);
    const [checked, setChecked] = useState({
        pg : true,
        grad : true,
        inter :true,
        high :true,
    })
    
    //column sorting
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
    const selectAllFields = (e) => {
          setCheckedAll(e.target.checked);
          setChecked((prevState) => {
            const newState = { ...prevState };
            for (const name in newState) {
              newState[name] = e.target.checked;
            }
            return newState;
          });
    }
    
    const selectGroup =(e) =>{
      const {name} = e.target
      setChecked({...checked,[name]: e.target.checked})
    }
    
    const selectAllRows=(e)=>{
      setCheckedAllRow(e.target.checked);
      setCheckedRow((prevState) => {
        const newState = { ...prevState };
        for (const name in newState) {
          newState[name] = e.target.checked;
        }

        return newState;
      });
    }
    
    const selectRow=(e)=>{
      const {name} = e.target
      setCheckedRow({...checkedRow,[name]: e.target.checked})
    }

    const totalRowCount=()=>{
            const len= scholars.length
            setRowCount(len)
    }
      
    useEffect(() => {
      let allChecked = true;
      for (const inputName in checked) {
        if (checked[inputName] === false) {
          allChecked = false;
        }
      }
      if (allChecked) {
        setCheckedAll(true);
      } else {
        setCheckedAll(false);
      }
      
      let allRowChecked = true;
      for (const inputName in checkedRow) {
        if (checkedRow[inputName] === false) {
          allRowChecked = false;
        }
      }
      if (allRowChecked) {
        setCheckedAllRow(true);
      } else {
        setCheckedAllRow(false);
      }
      
      totalRowCount()
    }, [rowCount, checked, checkedRow]);
    
    
    return(
    <>
    <div className="flex flex-col">
        <div className=" px-4 py-2 mx-3 flex items-center border-slate-100 text-gray-700 text-sm">
            <input checked={checkedAll} type="checkbox" onChange={(e)=>selectAllFields(e)}  className=" rounded-sm  border-purple-300 "/>
            <label  className="px-1 mr-5">All</label>
            <input checked={checked["pg"]} type="checkbox" onChange={(e)=>selectGroup(e)} name="pg" className=" rounded-sm  border-purple-300 "/>
            <label  className="px-1 mr-5">Post Graduation&nbsp;Details</label>
            <input checked={checked["grad"]} type="checkbox" onChange={(e)=>selectGroup(e)} name="grad" className=" rounded-sm  border-purple-300 "/>
            <label  className="px-1 mr-5">Graduation&nbsp;Details</label>
            <input checked={checked["inter"]} type="checkbox" onChange={(e)=>selectGroup(e)} name="inter" className=" rounded-sm  border-purple-300 "/>
            <label  className="px-1 mr-5">Intermediate&nbsp;Details</label>
            <input checked={checked["high"]} type="checkbox" onChange={(e)=>selectGroup(e)} name="high" className=" rounded-sm  border-purple-300 "/>
            <label  className="px-1 mr-5">HighSchool&nbsp;Details</label>
        </div>
        <div className="scrollbar flex-1 flex-col h-32 p-3 overflow-scroll sm:overflow-scroll rounded-md  border-slate-100 border-2 mx-8 text-gray-700">
                <table id="scholars-table" className="rounded-md auto ">
                    <thead className="">
                        <tr>
                            <th rowSpan="2" key="check"><input  checked={checkedAllRow} type="checkbox" onChange={(e)=>selectAllRows(e)} className=' rounded-sm mx-2 border-purple-300'></input></th>
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
                            <th colSpan="6" key="pg" className={checked.pg === true ? "px-1 mr-5 ": "hidden px-1 mr-5"}>Post&#8209;Graduation&nbsp;Details</th>                   
                            <th colSpan="8" key="grad" className={checked.grad === true ? "px-1 mr-5 ": "hidden px-1 mr-5"}>Graduation&nbsp;Details</th>                   
                            <th colSpan="6" key="inter" className={checked.inter === true ? "px-1 mr-5 ": "hidden px-1 mr-5"}>Intermediate&nbsp;Details</th>                   
                            <th colSpan="6" key="high"className={checked.high === true ? "px-1 mr-5 ": "hidden px-1 mr-5"}>HighSchool&nbsp;Details</th>                   
                            <th rowSpan="2"  onClick={(e)=>sort('fname')} className=" cursor-pointer">
                                First&nbsp;name<span className={order==="ASC" ? "rotate-180 ":""}></span>
                            </th>
                            <th  rowSpan="2" key="btn"></th>                   
                        </tr>
                        <tr> 
                            { checked.pg &&
                              <>
                                <td onClick={()=>sort('pg_course')}>Course<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('pg_exam_roll')}>Exam&nbsp;roll&nbsp;no.<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('pg_class_roll')}>Class&nbsp;roll&nbsp;no.<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('pg_aggr_percentage')}>Class&nbsp;roll&nbsp;no.<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('pg_backlogs')}>Backlogs<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td>Backlog&nbsp;details</td>
                              </> 
                            }
                            { checked.grad && 
                              <>
                                <td onClick={()=>sort('grad_university')}>University<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('grad_college')}>College<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('grad_course')}>Course<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('grad_roll_no')}>Roll&nbsp;no.<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('grad_max_marks')}>Maximum&nbsp;marks</td>
                                <td onClick={()=>sort('grad_marks_obtained')}>Marks&nbsp;obtained</td>
                                <td onClick={()=>sort('grad_aggr_percentage')}>Percentage<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('grad_year_of_passing')}>Year&nbsp;of&nbsp;passing<span className={order==="ASC" ? " rotate-180":""}></span></td>
                              </>
                            }
                            { checked.inter && 
                              <>
                                <td onClick={()=>sort('inter_board')}>Board<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('inter_roll_no')}>Roll&nbsp;no.<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('inter_max_marks')}>Maximum&nbsp;marks</td>
                                <td onClick={()=>sort('inter_marks_obtained')}>Marks&nbsp;obtained</td>
                                <td onClick={()=>sort('inter_aggr_percentage')}>Percentage<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('inter_year_of_passing')}>Year&nbsp;of&nbsp;passing<span className={order==="ASC" ? " rotate-180":""}></span></td>
                              </>
                            }
                            { checked.high && 
                              <>
                                <td onClick={()=>sort('high_board')}>Board<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('high_roll_no')}>Roll&nbsp;no.<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('high_max_marks')}>Maximum&nbsp;marks</td>
                                <td onClick={()=>sort('high_marks_obtained')}>Marks&nbsp;obtained</td>
                                <td onClick={()=>sort('high_aggr_percentage')}>Percentage<span className={order==="ASC" ? " rotate-180":""}></span></td>
                                <td onClick={()=>sort('high_year_of_passing')}>Year&nbsp;of&nbsp;passing<span className={order==="ASC" ? " rotate-180":""}></span></td>
                              </>
                            }
                            
                        </tr>
                    </thead>
                    <tbody className="px-2 py-4">
                    {  
                        data.map((scholar,index)=>{
                            return (<>
                                {
                                <tr key={count++} > 
                                    <td className=''><input checked={checkedRow[index]} type="checkbox" onChange={(e)=>selectRow(e)} name={index} className='rounded-sm mx-2 border-purple-300'></input></td>
                                    <td className=''>{++index}</td>
                                    <td className=''>{scholar.fname}</td>
                                    <td className=''>{scholar.lname}</td>
                                    <td className=''>{scholar.email}</td>
                                    <td className=''>{scholar.phone}</td>
                                    <td className=''>{scholar.alternative_phone}</td>
                                    <td className=''>{scholar.placement_status}</td>        
                                    <td className=''>{scholar.gender}</td>    
                                    { checked.pg && <>
                                        <td className=''>{scholar.pg_course}</td>      
                                        <td className=''>{scholar.pg_exam_roll}</td>      
                                        <td className=''>{scholar.pg_class_roll}</td>       
                                        <td className=''>{scholar.pg_aggr_percentage}</td>      
                                        <td className=''>{scholar.pg_backlogs}</td>      
                                        <td className=''>{scholar.pg_backlog_details}</td>       
                                        </>
                                    }
                                    {checked.grad && 
                                      <>
                                        <td className=''>{scholar.grad_university}</td>      
                                        <td className=''>{scholar.grad_college}</td>      
                                        <td className=''>{scholar.grad_course}</td>       
                                        <td className=''>{scholar.grad_roll_no}</td>       
                                        <td className=''>{scholar.grad_max_marks}</td>      
                                        <td className=''>{scholar.grad_marks_obtained}</td>      
                                        <td className=''>{scholar.grad_aggr_percentage}</td>       
                                        <td className=''>{scholar.grad_year_of_passing}</td>
                                      </>   
                                    }
                                    {checked.inter &&
                                      <>
                                        <td className=''>{scholar.inter_board}</td>      
                                        <td className=''>{scholar.inter_roll_no}</td>       
                                        <td className=''>{scholar.inter_max_marks}</td>      
                                        <td className=''>{scholar.inter_marks_obtained}</td>      
                                        <td className=''>{scholar.inter_aggr_percentage}</td>       
                                        <td className=''>{scholar.inter_year_of_passing}</td>  

                                      </>
                                    } 
                                    {checked.high &&
                                      <>
                                        <td className=''>{scholar.high_board}</td>      
                                        <td className=''>{scholar.high_roll_no}</td>       
                                        <td className=''>{scholar.high_max_marks}</td>      
                                        <td className=''>{scholar.high_marks_obtained}</td>      
                                        <td className=''>{scholar.high_aggr_percentage}</td>       
                                        <td className=''>{scholar.high_year_of_passing}</td>       
                                      </>
                                    } 
                                    <td className=''>{scholar.fname}</td>     
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
                { rowCount>25 && <p className="px-4 py-1">Showing results 25 of {rowCount}</p>}
                { rowCount==25 && <p className="px-4 py-1">Showing results 25 of 25</p>}
                { rowCount<25 && <p className="px-4 py-1">Showing results {rowCount} of {rowCount}</p>}                
                <BsArrowLeftSquareFill onClick={()=>setRowCount({rowCount}-1)}className="text-2xl text-violet-300 m-1 cursor-pointer hover:text-violet-600"/>
                <BsArrowRightSquareFill onClick={()=>setRowCount({rowCount}+1)}className="text-2xl text-violet-300 m-1 cursor-pointer hover:text-violet-600"/>
            </div>
        </div>
    </div>
    </>
    )
}

export default ScholarTable
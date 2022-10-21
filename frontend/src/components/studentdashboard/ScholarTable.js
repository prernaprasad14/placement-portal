import { useEffect, useState, useContext, useRef} from 'react'
import {Link} from 'react-router-dom'
import { BsThreeDotsVertical,BsArrowLeftSquareFill,BsArrowRightSquareFill } from 'react-icons/bs';
import { UserContext } from '../../App';
import Loading from '../Loading';
import { getParsedDob } from '../../helpers/getParsedDob';

const ScholarTable=({scholars})=>{
  
  const {state} =useContext(UserContext)
  const [data , setData]=   useState(scholars)
  // const [dataChunk, setDataChunk] = useState(data)
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder]= useState('ASC')
  const [leftBtnDisabled, setLeftBtnDisabled]= useState(true)
  const [status, setStatus]= useState('all')
  const [selectedScholars, setSelectedScholars]= useState(scholars)
  const [rowCount, setRowCount]= useState(scholars.length)
  const [rowsPerPage, setRowsPerPage]=useState(5)
  const [currentPage, setCurrentPage]=useState(1);
  const maxPage = Math.ceil(rowCount/rowsPerPage)
  const indexOfLast= currentPage * rowsPerPage
  const indexOfFirst= indexOfLast - rowsPerPage
  const currentRows = data.slice(indexOfFirst, indexOfLast)
  var exportRows =[];
  const btnRight= useRef()
  const btnLeft= useRef()
  
  const [searchResults, setSearchResults]=useState([])
  var pageNums =[]
    for(let i=1; i<=maxPage;i++){
      pageNums.push(i)
  }

    //checkbox states-rows
  const [checkedAllRow, setCheckedAllRow] = useState(true);
  const [checkedRow, setCheckedRow] = useState(new Array(rowCount).fill(true));
  const [clickedEdit, setClickedEdit] = useState(new Array(rowCount).fill(false));

  //checkbox states-qualification groups
  const [checkedAll, setCheckedAll] = useState(true);
  const [checked, setChecked] = useState({
      pg : true,
      grad : true,
      inter :true,
      high :true,
  })
    //////////////////////////////////////////////////////////////////////////////////////////
    // //checkbox states-courses
    // const [checkedAllCourses,setCheckedAllCourses]= useState(true);
    // const [checkedCourse, setCheckedCourse]=useState({
    //   "MSc Computer Science":false,
    //   "Master of Computer Applications":false
    // })
    //////////////////////////////////////////////////////////////////////////////////////////

  //update state variables after search, filter operations
  const updateVars=(newData)=>{
    setCurrentPage(1)
    console.log(newData.length)
    setData(newData)
    setRowCount(newData.length)
  }
   

    // const selectAllCourses=(e)=>{
    //   setCheckedAllCourses(e.target.checked);
    //   setCheckedCourse((prevState) => {
    //     const newState = { ...prevState };
    //     for (const name in newState) {
    //       newState[name] = e.target.checked;
    //       console.log(newState)
    //     }
    //     return newState;
    //   });
      // var filteredScholars
      // // if(search==''){
      //   filteredScholars= scholars.filter(object => {
      //     const courseFiltered = Object.values(object).toString().toLowerCase().includes(value)
      //     return courseFiltered
      // })
      // // }
      // console.log(filteredScholars)
    //   updateVars(scholars)
    // }

    // const selectCourse=(e)=>{
    //   const {name, value} = e.target
    //   console.log(name)
    //   setCheckedCourse({...checkedCourse,[name]: e.target.checked})
    //   // const filteredScholars = data.filter(obj=>obj===name)
    //   var filteredScholars
    //   // if(search==''){
    //     filteredScholars= scholars.filter(object => {
    //       const courseFiltered = Object.values(object).toString().toLowerCase().includes(value)
    //       return courseFiltered
    //   })
    //   // }
    //   console.log(filteredScholars)
    //   updateVars(filteredScholars)
    //   // console.log('inside select course')
    //   // const {name} = e.target
    //   // console.log(name)
    //   // console.log(e.target.value)
    //   // setCheckedCourse({...checked,[name]: e.target.checked})
    //   // const newChunk= data.filter(course=> {
    //   //   console.log(course === e.target.name)
    //   //   return course === e.target.name})
    //   // setDataChunk(newChunk)
    //   //export based on selected course 
    //   //       if(e.target.checked===false){
    //   //    const updatedScholars = data.filter((scholar)=>{
    //   //     return scholar.pg_course == e.target.name
    //   //   }) 
    //   //   setSelectedScholars(updatedScholars)
    //   // }else{
    //   //   setSelectedScholars(scholars)
    //   // }     
    // }

    //column sorting
    const sort=(col)=>{
      console.log("col")
      console.log(col)
      if(col==='placement_status')
       { if(order==='ASC'){
            const sorted = [...data].sort((a,b)=>{
              console.log( a['placementDetails'][col])
              return a['placementDetails'][col].toLowerCase() > b['placementDetails'][col].toLowerCase() ? 1 : -1
            }
            );
            setData(sorted)
            setOrder('DES')
        }
        if(order==='DES'){
            const sorted = [...data].sort((a,b)=>
                a['placementDetails'][col].toLowerCase() < b['placementDetails'][col].toLowerCase() ? 1 : -1
            );
            setData(sorted)
            setOrder('ASC')
        }
      }
     else{   if(order==='ASC'){
            const sorted = [...data].sort((a,b)=>{
              console.log( a[col],b[col])
              return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            }
            );
            setData(sorted)
            setOrder('DES')
          }
          if(order==='DES'){
              const sorted = [...data].sort((a,b)=>
                  a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
              );
              setData(sorted)
              setOrder('ASC')
          }
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
          setSelectedScholars(scholars)
    }
    
    const selectGroup =(e) =>{
      const {name} = e.target
      setChecked({...checked,[name]: e.target.checked})
      //new filter to add the updated cols on in the export
      // const updatedScholars =  data.filter((scholar)=>{
      //     return 
      // })
      // setSelectedScholars(scholars)
    }
    
    const selectAllRows=(e)=>{
      setCheckedAllRow(e.target.checked);
      setCheckedRow((prevState) => {
        const newState = { ...prevState };
        for (const name in newState) {
          newState[name] = e.target.checked;
          console.log(newState)
        }
        return newState;
      });
    }
    
    const selectRow=(e)=>{
      const {name} = e.target
      setCheckedRow({...checkedRow,[name]: e.target.checked})
    }

    const len= scholars.length
    const totalRowCount=()=>{
      setRowCount(len)
    }
      
    const handleMouseOver=(e)=>{
      e.target.style.color='#8b5cf6'
    }
    const handleMouseOut=(e)=>{
      e.target.style.color='#c4b5fd'
    }

    const [search, setSearch]= useState('')
    const handleSearch=(e)=>{
      setStatus('all')
      const value= e.target.value.toLowerCase()
      setSearch(value)

      //no word was searched
      if(value.length<=0){
          setSearchResults(scholars)
          updateVars(scholars)  
      }
      else{ // when word is searched 
     
        console.log(value)
        const newChunk= scholars.filter(object => {
          const searchedItem = Object.values(object).toString().toLowerCase().includes(value)
          return searchedItem
        }
        );
        setSearchResults(newChunk)
        updateVars(newChunk)
      }
    }

    const handleStatus=(e)=>{
      console.log(status)
      const {value} = e.target
      setStatus(value)
      filterStatus(value)
    }
   const [filteredData, setFilteredData]= useState('')
   
    const clearFilters=()=>{
      setStatus('all')
      filterStatus('all')
      setChecked(true)
      // setCheckedCourse(true) 
  
    }

    const filterStatus=(value)=>{
      if(searchResults.length<=0){
        if(value==='all'){
        updateVars(scholars) 
        searchResults(scholars)
        setFilteredData(scholars)
        }
        else{
          const newChunk= scholars.filter(chunk=>chunk.placementDetails.placement_status.toLowerCase()===value)
          updateVars(newChunk)  
          searchResults(newChunk)
          setFilteredData(newChunk)
          
        } 
      }
    else{
      if(value==='all'){
          updateVars(searchResults) 
          searchResults(searchResults) 
          setFilteredData(scholars)
        }else{
           const newChunk= searchResults.filter(chunk=>chunk.placementDetails.placement_status.toLowerCase()===value)
          updateVars(newChunk) 
          searchResults(newChunk)
          setFilteredData(newChunk)
        }
          
          
       
      }
    }
    const resetRowEdit=()=>{
      const clicked=[...clickedEdit]

      for(const indx in clickedEdit){
        console.log("i",indx,"indx",indx,        clicked[indx]=false  )
        clickedEdit[indx]=false
      }
      setClickedEdit(clicked)
    }

    const handleRightClick = (e)=>{
      e.preventDefault()
      resetRowEdit()
      if(currentPage>=maxPage){
        btnRight.current.style.color='#d1d5db'
      }  
      else{
        btnLeft.current.style.color='#c4b5fd'
        setCurrentPage(currentPage+1)
      }
    }
    
    const handleLeftClick = (e)=>{
      e.preventDefault()
      resetRowEdit()

      console.log('inside left click')
      if(currentPage<=1){
        btnLeft.current.style.color='#d1d5db'
      }
      else{
        btnRight.current.style.color='#c4b5fd'
        setCurrentPage(currentPage-1)  
      }
    }

   const  handleShowAll=()=>{
      setCurrentPage(1)
      setRowsPerPage(scholars.length)
   }
    const handleShowPaginated=()=>{
      setCurrentPage(1)
      setRowsPerPage(5)
    }
    const handleRowClick=(e,index)=>{
      e.preventDefault();
      const clicked=[...clickedEdit]

      for(const indx in clickedEdit){
        console.log("i",indx,"indx",indx, clicked[indx]=false  )
        clickedEdit[indx]=false
      }
      clicked[index]=true
      setClickedEdit(clicked)
    }

    const [isEditMode, setIsEditMode]= useState(false)

    useEffect(() => {
      console.log('inside ScholarTable ')
      console.log(currentPage,'currentPage onload ')
      setLeftBtnDisabled(true)
      let allChecked = true;
      let allCoursesChecked = true;
      let allRowChecked = true;


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
      // for (const inputName in checkedCourse) {
      //   if (checkedCourse[inputName] === false) {
      //     allCoursesChecked = false;
      //   }
      // }
      // if (allCoursesChecked) {
      //   setCheckedAllCourses(true);
      // } else {
      //   setCheckedAllCourses(false);
      // }
      totalRowCount();      
      setIsLoading(false)
      // }, [checked, checkedRow, checkedCourse ]);
      }, [checked, checkedRow ]);

    if(isLoading){
      return(<><Loading message={`Just a moment..Fetching scholars`}/></>)
    }
    // if(isEditMode){
    //   return(
    //     <ScholarDetails/>
    //   )
    // }
    // if(state==='admin'){
    //   return()
    // }
    return(
    <>
 
    <div className='scholar-table flex flex-col'>
      <div className='search mx-8 py-2 flex flex-unwrap sm:flex-wrap flex-row'>
          <input typ='text' placeholder='Search text'
          onChange={handleSearch} value={search} className='border-slate-100 px-2 border-2'/>
        <button onClick={clearFilters} className='bg-slate-100 text-gray-400 hover:bg-slate-200 rounded-md mx-3 px-3'>Clear&nbsp;filters</button>
      </div>
      <div className='mx-8 user-select-none flex flex-col sm:flex-row flex-unwrap sm:flex-wrap items-center border-slate-100 rounded-md border-2 text-gray-700 text-sm'>
         
            {state==='admin' && 
              <div className='flex-col sm:flex-row border-0 sm:border-l-2 my-2 py-2 border-gray pl-4 items-start rounded-sm'>
                <h2 className=' font-semibold mr-4 py-1'>Placement status</h2>
                <div className='form-group inline-block'>
                  <input type='radio' defaultChecked checked={status==='all'} name='placement_status_group' value='all' onChange={handleStatus} className='rounded-full border-purple-300'/>         
                  <label className='px-1 mr-5'>All</label>
                </div>
                <div className='form-group inline-block'>
                  <input type='radio' checked={status==='placed'} name='placement_status_group' value='placed' onChange={handleStatus} className='rounded-full border-purple-300'/>         
                  <label className='px-1 mr-5'>Placed</label>
                </div>
                <div className='form-group inline-block'>
                  <input type='radio' checked={status==='unplaced'} name='placement_status_group' value='unplaced' onChange={handleStatus} className='rounded-full border-purple-300'/>          
                  <label className='px-1 mr-5'>Unplaced</label>
                </div>
              </div>
            }
         {/* <div className='flex-col sm:flex-row items-start my-2 p-2 rounded-sm'>
            <h2 className=' font-semibold mr-4'>Courses </h2>
            <input checked={checkedAllCourses} name='all' type='checkbox' onChange={(e)=>selectAllCourses(e)}  
              className='rounded-sm border-purple-300'/>         
            <label  className='px-1 mr-5'>All&nbsp;</label>
            <input checked={checkedCourse['MSc Computer Science']} name='MSc Computer Science' type='checkbox' onChange={(e)=>selectCourse(e)}  
              className='rounded-sm border-purple-300'/>         
            <label  className='px-1 mr-5'>MCS</label>
            <input checked={checkedCourse['Master of Computer Applications']} name='Master of Computer Applications' type='checkbox' onChange={(e)=>selectCourse(e)}  
              className='rounded-sm border-purple-300'/>          
            <label  className='px-1 mr-5'>MCA</label>
          </div> */}
        <div className='flex flex-col sm:flex-row  border-slate-100 text-gray-700 text-sm items-start rounded-sm mx-2 min-h-[62px]'>
          <div className='my-2'>
              <input checked={checkedAll} type='checkbox' onChange={(e)=>selectAllFields(e)}  className='rounded-sm border-purple-300 '/>
              <label  className='px-1 mr-5'>All</label>
          </div> 
          <div className='my-2'>
            <input checked={checked['pg']} type='checkbox' onChange={(e)=>selectGroup(e)} name='pg' className='rounded-sm border-purple-300 '/>
            <label  className='px-1 mr-5'>Post Graduation&nbsp;Details</label>
          </div>
          <div className='my-2'>
            <input checked={checked['grad']} type='checkbox' onChange={(e)=>selectGroup(e)} name='grad' className='rounded-sm border-purple-300 '/>
            <label  className='px-1 mr-5'>Graduation&nbsp;Details</label>
          </div>
          <div className='my-2'>
            <input checked={checked['inter']} type='checkbox' onChange={(e)=>selectGroup(e)} name='inter' className='rounded-sm border-purple-300 '/>
            <label  className='px-1 mr-5'>Intermediate&nbsp;Details</label>
          </div>
          <div className='my-2'>
            <input checked={checked['high']} type='checkbox' onChange={(e)=>selectGroup(e)} name='high' className='rounded-sm border-purple-300 '/>
            <label  className='px-1 mr-5'>HighSchool&nbsp;Details</label>
          </div>
        </div>
      </div>

 
      <div id='pagination' className='user-select-none mt-3' >
          <div className='flex-col sm:flex-row'>
            <div className='my-3'>
              <button onClick={handleShowAll} className="px-3 py-1 bg-violet-100 rounded-md mx-2 hover:text-white hover:bg-violet-400
              focus:bg-violet-300 text-slate-600 active:bg-violet-300 focus:text-white ">Show&nbsp;all</button>
              <button onClick={handleShowPaginated} className="px-3 py-1 bg-violet-100 rounded-md mx-2 hover:text-white hover:bg-violet-400
              focus:bg-violet-300 text-slate-600 active:bg-violet-300 focus:text-white ">Paginated</button>
            </div>
            {indexOfLast<rowCount && <p className='px-4 py-1 mb-0 sm:mb-3 '>Showing results {indexOfFirst+1}-{indexOfLast} of {rowCount}</p>} 
            {rowCount===0 && <p className='px-4 py-1 mb-0 sm:mb-3 '>Showing results {indexOfFirst}-{rowCount} of {rowCount}</p>} 
            {indexOfLast>=rowCount && rowCount!==0 && <p className='px-4 py-1 mb-0 sm:mb-3'>Showing results {indexOfFirst+1}-{rowCount} of {rowCount}</p>} 
            <div className='flex flex-row my-2'>
              <button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ref={btnLeft} onClick={handleLeftClick} className='text-violet-300 cursor-pointer'><BsArrowLeftSquareFill  className='font-semibold pointer-events-none text-2xl m-1 '/></button>
              <ul className='  p-1 flex text-slate-600 flex-row'>
                {pageNums.map(pageNum=> <button className =' px-2 font-semibold hover:text-white hover:bg-violet-300  focus:bg-violet-500 focus:text-white active:text-white active:bg-violet-500 rounded-md m-1 flex flex-row' onClick={()=>setCurrentPage(pageNum)}>{pageNum}</button>)}
              </ul>
              <button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ref={btnRight} onClick={handleRightClick} className='text-violet-300 cursor-pointer'><BsArrowRightSquareFill  className='font-semibold pointer-events-none text-2xl m-1'/></button>
            </div>
          </div>
        </div>
      <div  className=' scrollbar mt-1 mb-3 flex-1 flex-col h-32 p-3 overflow-x-scroll sm:overflow-scroll rounded-md  border-slate-100 border-2 mx-8 text-gray-700'>
      {currentRows.length>=1 && 
        <table id='scholars-table' className='rounded-md auto '>
            <thead className=''>
                <tr>
                    <th rowSpan='2' key='srno' className=' mx-2' >Sr&nbsp;no.</th>
                    <th rowSpan='2'  onClick={(e)=>sort('fname')} className=' cursor-pointer'>
                        First&nbsp;name<span className={order==='ASC' ? 'rotate-180 ':''}></span>
                    </th>
                    <th rowSpan='2' key='lname' onClick={()=>sort('lname')} className='cursor-pointer'>
                        Last&nbsp;name<span className={order==='ASC' ? 'rotate-180':''}></span>
                    </th>
                    <th rowSpan='2' key='email' onClick={()=>sort('email')} className=' cursor-pointer'>
                        Email
                            <span className={order==='ASC' ? 'px-2 rotate-180':'px-2 '}></span>
                    </th>
                    <th rowSpan='2' key='phone' className=''>Phone&nbsp;no.</th>
                    <th rowSpan='2' key='alt_phone' className=''>Alternative&nbsp;no.</th>
                    {state==='admin' && <th rowSpan='2' key='placement_status' onClick={()=>sort('placement_status')} className=' '>Status<span className={order==='ASC' ? 'px-2 rotate-180':'px-2 '}></span></th>}
                    {state==='admin' && <th rowSpan='2' key='dob' className=''>Date of birth</th>}  
                              
                    {state==='admin' && <th rowSpan='2' key='gender' className=''>Gender</th>     }              
                    {state==='admin' && <th colSpan='5' key='perma' className='text-center bg-[#8667e1] px-1 mr-5'>Permanent&#8209;Address&nbsp;Details</th>   }                
                    {state==='admin' && <th colSpan='5' key='corr' className='text-center bg-[#8667e1] px-1 mr-5'>Correspondance&#8209;Address&nbsp;Details</th>   }                
                    {checked.pg &&<th colSpan='6' key='pg' className={  ' px-1 mr-5'}>Post&#8209;Graduation&nbsp;Details</th>   }                
                    <th colSpan='8' key='grad' className={checked.grad === true ? 'px-1 mr-5 ': 'hidden px-1 mr-5'}>Graduation&nbsp;Details</th>                   
                    <th colSpan='6' key='inter' className={checked.inter === true ? 'px-1 mr-5 ': 'hidden px-1 mr-5'}>Intermediate&nbsp;Details</th>                   
                    <th colSpan='6' key='high'className={checked.high === true ? 'px-1 mr-5 ': 'hidden px-1 mr-5'}>HighSchool&nbsp;Details</th>                   
                    <th rowSpan='2'  onClick={(e)=>sort('fname')} className=' cursor-pointer'>
                        First&nbsp;name<span className={order==='ASC' ? 'rotate-180 ':''}></span>
                    </th>
                    <th rowSpan='2'>{state==='admin'&& <td  key='btn'></td>  } </th>                
                </tr>
                <tr> 
                    {state==='admin' && 
                    <>
                      <td className=''>Address&nbsp;Line1</td>
                      <td className=''>Address&nbsp;Line2</td>
                      <td className=''>City</td>
                      <td className=''>State</td>
                      <td className=''>PIN</td>
                      <td className=''>Address&nbsp;Line1</td>
                      <td className=''>Address&nbsp;Line2</td>
                      <td className=''>City</td>
                      <td className=''>State</td>
                      <td className=''>PIN</td>
                    </>}  
                    { checked.pg &&
                      <>
                        <td onClick={()=>sort('pg_course')}>Course<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('pg_exam_roll')}>Exam&nbsp;roll&nbsp;no.<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('pg_class_roll')}>Class&nbsp;roll&nbsp;no.<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('pg_aggr_percentage')}>Percentage<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('pg_backlogs')}>Backlogs<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td>Backlog&nbsp;details</td>
                      </> 
                    }
                    { checked.grad && 
                      <>
                        <td onClick={()=>sort('grad_university')}>University<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('grad_college')}>College<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('grad_course')}>Course<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('grad_roll_no')}>Roll&nbsp;no.<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('grad_max_marks')}>Maximum&nbsp;marks</td>
                        <td onClick={()=>sort('grad_marks_obtained')}>Marks&nbsp;obtained</td>
                        <td onClick={()=>sort('grad_aggr_percentage')}>Percentage<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('grad_year_of_passing')}>Year&nbsp;of&nbsp;passing<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                      </>
                    }
                    { checked.inter && 
                      <>
                        <td onClick={()=>sort('inter_board')}>Board<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('inter_roll_no')}>Roll&nbsp;no.<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('inter_max_marks')}>Maximum&nbsp;marks</td>
                        <td onClick={()=>sort('inter_marks_obtained')}>Marks&nbsp;obtained</td>
                        <td onClick={()=>sort('inter_aggr_percentage')}>Percentage<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('inter_year_of_passing')}>Year&nbsp;of&nbsp;passing<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                      </>
                    }
                    { checked.high && 
                      <>
                        <td onClick={()=>sort('high_board')}>Board<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('high_roll_no')}>Roll&nbsp;no.<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('high_max_marks')}>Maximum&nbsp;marks</td>
                        <td onClick={()=>sort('high_marks_obtained')}>Marks&nbsp;obtained</td>
                        <td onClick={()=>sort('high_aggr_percentage')}>Percentage<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                        <td onClick={()=>sort('high_year_of_passing')}>Year&nbsp;of&nbsp;passing<span className={order==='ASC' ? ' rotate-180':''}></span></td>
                      </>
                    }
                    
                </tr>
            </thead>
            <tbody className='px-2 py-4'>
            {  
                currentRows.map((scholar,index)=>{
                    return (<>
                      <tr className='searchText'>
                          {/* <td className=''><input checked={checkedRow[index]} type='checkbox' onChange={(e)=>selectRow(e)} name={index} className='rounded-sm mx-2 border-purple-300'></input></td> */}
                          {/* <td className=''>{scholar.placementDetails.annual_package}</td> */}
                          <td className='px-2'>{++index}</td>
                          <td className=' '>{scholar.fname}</td>
                          <td className=''>{scholar.lname}</td>
                          <td className=''>{scholar.email}</td>
                          <td className=''>{scholar.phone}</td>
                          <td className=''>{scholar.alternative_phone}</td>
                          {state==='admin' && 
                            <>
                              <td className=''>{scholar.placementDetails.placement_status}</td>        
                              <td className=''>{getParsedDob(scholar.dob)}</td>       
                              <td className=''>{scholar.gender}</td>  
                              <td className='min-w-[233px]'>{scholar.perma_addr1}</td>
                              <td className='min-w-[233px]'>{scholar.perma_addr2}</td>
                              <td className=''>{scholar.perma_city}</td>
                              <td className=''>{scholar.perma_state}</td>
                              <td className=''>{scholar.perma_pin}</td>
                              <td className='min-w-[233px]'>{scholar.corr_addr1}</td>
                              <td className='min-w-[233px]'>{scholar.corr_addr2}</td>
                              <td className=''>{scholar.corr_city}</td>
                              <td className=''>{scholar.corr_state}</td>
                              <td className=''>{scholar.corr_pin}</td>
                            </>
                          }  
                          { checked.pg && <>
                              <td className='min-w-[170px]'>{scholar.pg_course}</td>
                              <td className='min-w-[170px]'>{scholar.pg_exam_roll}</td>      
                              <td className=''>{scholar.pg_class_roll}</td>       
                              <td className=''>{scholar.pg_aggr_percentage}</td>      
                              <td className=''>{scholar.pg_backlogs}</td>      
                              <td className=''>{scholar.pg_backlog_details}</td>       
                              </>
                          }
                          {checked.grad && 
                            <>
                              <td className='min-w-[170px]'>{scholar.grad_university}</td>      
                              <td className='min-w-[170px]'>{scholar.grad_college}</td>      
                              <td className='min-w-[170px]'>{scholar.grad_course}</td>       
                              <td className='min-w-[130px]'>{scholar.grad_roll_no}</td>       
                              <td className=''>{scholar.grad_max_marks}</td>      
                              <td className=''>{scholar.grad_marks_obtained}</td>      
                              <td className=''>{scholar.grad_aggr_percentage}</td>       
                              <td className=''>{scholar.grad_year_of_passing}</td>
                            </>   
                          }
                          {checked.inter &&
                            <>
                              <td className='min-w-[133px]'>{scholar.inter_board}</td>      
                              <td className=''>{scholar.inter_roll_no}</td>       
                              <td className=''>{scholar.inter_max_marks}</td>      
                              <td className=''>{scholar.inter_marks_obtained}</td>      
                              <td className=''>{scholar.inter_aggr_percentage}</td>       
                              <td className=''>{scholar.inter_year_of_passing}</td>  

                            </>
                          } 
                          {checked.high &&
                            <>
                              <td className='min-w-[133px]'>{scholar.high_board}</td>      
                              <td className=''>{scholar.high_roll_no}</td>       
                              <td className=''>{scholar.high_max_marks}</td>      
                              <td className=''>{scholar.high_marks_obtained}</td>      
                              <td className=''>{scholar.high_aggr_percentage}</td>       
                              <td className=''>{scholar.high_year_of_passing}</td>       
                            </>
                          } 
                          <td className=''>{scholar.fname}</td>     
                          {
                            state==='admin' && 
                            <td className='hover:cursor-pointer'><>
                            <BsThreeDotsVertical onClick={(e)=>handleRowClick(e,index)} className={clickedEdit[index]?'hidden ':'visible ml-4' }/>
                            <Link className={clickedEdit[index] ? `bg-violet-300 text-white
                               hover:bg-violet-500 hover:text-white visible px-3 py-1 rounded-sm`:'hidden'}  
                               to={`/dashboard/scholar-details/${scholar._id}`} target="_blank" 
                               rel="noopener noreferrer"> 
                              Edit</Link></></td>
                          }
                          {state==='company'&& <td className=''></td>}

                      </tr>
                    </>)
                  })
                }
            </tbody>   
        </table>}
        {currentRows.length<1 && <p className='flex my-3 text-pink-400 justify-center align-middle'>No Records were found!</p>}
      </div>
    </div>
    </>
  )

}

export default ScholarTable
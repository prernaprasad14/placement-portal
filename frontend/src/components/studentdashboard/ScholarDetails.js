import { useParams ,useNavigate} from 'react-router';
import { Link} from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'
import profilepic from './../../img/user.jpg';
import axios from './../../axiosConfig'
import Loading from './../Loading';
import { UserContext } from './../../App';
import {RiEdit2Fill} from 'react-icons/ri'

const ScholarDetails =()=>{    
    document.title='Scholar Details | DUCS Placement Portal'
    const {state, dispatch}= useContext(UserContext)
    const navigate = useNavigate();
    const {id} = useParams();
    const [isLoading, setIsLoading]= useState(true)
    const [message , setMessage] = useState({
        personalDetails:'',
        pgDetails:'',
        gradDetails:'',
        highSchoolDetails:'',
        interDetails:'',
        placementDetails:''
    })
    const [isEditMode , setIsEditMode] = useState({
        personalDetails:false,
        pgDetails:false,
        gradDetails:false,
        highSchoolDetails:false,
        interDetails:false,
        placementDetails:false
    })
    const [placementDetails, setPlacementDetails] = useState('')
    const [personalDetails, setPersonalDetails] = useState('')
    const [pgDetails, setPgDetails] = useState('')
    const [gradDetails, setGradDetails] = useState('')
    const [interDetails, setInterDetails] = useState('')
    const [highSchoolDetails, setHighSchoolDetails] = useState('')
    
    const getPersonalDetails=(id)=>{
        console.log('inside getPersonalDetails')
        console.log(id)
        axios.get(`api/admin/scholar-personal-details/${id}`)
        .then(res=>{
            console.log(res)
            console.log(res.data.personalDetails)
            setPersonalDetails(res.data.personalDetails)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const getHighschoolDetails=(id)=>{
        axios.get(`api/admin/scholar-highschool-details/${id}`)
        .then(res=>{
            console.log(res)
            console.log(res.data.highschoolDetails)
            setHighSchoolDetails(res.data.highschoolDetails)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const getIntermmediateDetails=(id)=>{
        axios.get(`api/admin/scholar-intermmediate-details/${id}`)
        .then(res=>{
            console.log(res)
            console.log(res.data.interDetails)
            setInterDetails(res.data.interDetails)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const getGraduationDetails=(id)=>{
        axios.get(`api/admin/scholar-graduation-details/${id}`)
        .then(res=>{
            console.log(res)
            console.log(res.data.gradDetails)
            setGradDetails(res.data.gradDetails)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const getPostGraduationDetails=(id)=>{
        axios.get(`api/admin/scholar-postgraduation-details/${id}`)
        .then(res=>{
            console.log(res)
            console.log(res.data.pgDetails)
            setPgDetails(res.data.pgDetails)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const getPlacementeDetails=(id)=>{
        axios.get(`api/admin/scholar-placement-details/${id}`)
        .then(res=>{
            console.log(res)
            console.log(res.data.placementDetails)
            setPlacementDetails(res.data.placementDetails)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const getScholar=()=>{
        console.log('Inside getScholar')
        // getPersonalDetails(id)
        // getHighschoolDetails(id)
        // getIntermmediateDetails(id)
        // getGraduationDetails(id)
        // getPostGraduationDetails(id)
        // getPlacementeDetails(id)
        axios.get(`api/admin/scholar-details/${id}`)
        .then((res)=>{
            const scholar = res.data.scholar;
            // setData(scholar);
            console.log(res.data.role)
            dispatch({type:'LOGGEDIN', role:res.data.role})
            setPersonalDetails({
                email:scholar.email,
                username:scholar.username,
                fname:scholar.fname,
                lname:scholar.lname,
                dob:scholar.dob,
                gender:scholar.gender,
                phone:scholar.phone,
                alternative_phone:scholar.alternative_phone,
                perma_addr1:scholar.perma_addr1,
                perma_addr2:scholar.perma_addr2,
                perma_state:scholar.perma_state,
                perma_city:scholar.perma_city,
                perma_pin:scholar.perma_pin,
                corr_addr1:scholar.corr_addr1,
                corr_addr2:scholar.corr_addr2,
                corr_state:scholar.corr_state,
                corr_city:scholar.corr_city,
                corr_pin:scholar.corr_pin
            })
            setPgDetails({
                pg_course:scholar.pg_course,
                pg_exam_roll:scholar.pg_exam_roll,
                pg_class_roll:scholar.pg_class_roll,
                pg_aggr_percentage:scholar.pg_aggr_percentage,
                pg_backlogs:scholar.pg_backlogs,
                pg_backlog_details:scholar.pg_backlog_details
            })
            setGradDetails({
                grad_college:scholar.grad_college,
                grad_university:scholar.grad_university,
                grad_course:scholar. grad_course,
                grad_roll_no:scholar.grad_roll_no,
                grad_marks_obtained:scholar.grad_marks_obtained,
                grad_max_marks:scholar.grad_max_marks,
                grad_aggr_percentage:scholar.grad_aggr_percentage,
                grad_year_of_passing:scholar.grad_year_of_passing
                
            })
            setHighSchoolDetails({
                high_board : scholar.high_board,
                high_roll_no : scholar.high_roll_no,
                high_marks_obtained : scholar.high_marks_obtained,
                high_max_marks : scholar.high_max_marks,
                high_aggr_percentage : scholar.high_aggr_percentage,
                high_year_of_passing : scholar.high_year_of_passing
                
            })
            setInterDetails({
                inter_board : scholar.inter_board,
                inter_roll_no : scholar.inter_roll_no,
                inter_marks_obtained : scholar.inter_marks_obtained,
                inter_max_marks : scholar.inter_max_marks,
                inter_aggr_percentage : scholar.inter_aggr_percentage,
                inter_year_of_passing : scholar.inter_year_of_passing
            })
            setPlacementDetails(scholar.placementDetails)
            setIsLoading(false)
            }).catch(error=> {
                console.log('Error getScholar : '+error)
                console.log(error.response.status)
                const role= error.response.data.role
                if(role!='USER'){
                    dispatch({type:'LOGGEDIN', role:error.response.data.role})
                }
                else{
                    dispatch({type:'USER', role:error.response.data.role})
                
                } 
                
                if(error.response.status=='404'){
                    navigate('/not-found')
                }
                if(error.response.status=='500'){
                    navigate('/internal-server-error')
                }
                if(error.response.status=='401'){
                    navigate('/login')
                }
                if(error.response.status=='403'){
                    navigate('/forbidden')   
                }
            }) 
        }

    const handleEditMode = (e, edit)=>{
        e.preventDefault()
        console.log('inside handleEditMode')
        setIsEditMode({...isEditMode, [edit]:true})
    }
    
    const handleChange=(e, input, section)=>{
        // e.preventDefault();
        console.log()
        console.log('inside handleChange')
        const {value}=e.target
        console.log(value, input)
        switch(section){
            case 'personalDetails':{
                setPersonalDetails({...personalDetails, [input]:value})
                break;
            }
            case 'pgDetails':{
                setPgDetails({...pgDetails, [input]:value})
                break;
            }
            case 'gradDetails':{
                setGradDetails({...gradDetails, [input]:value})
                break;
            }
            case 'interDetails':{
                setInterDetails({...interDetails, [input]:value})
                break;
            }
            case 'highschoolDetails':{
                setHighSchoolDetails({...highSchoolDetails, [input]:value})
                break;
            }
            case 'placementDetails':{
                setPlacementDetails({...placementDetails, [input]:value})
                break;
            }
        }
    }

    const handleSubmit=(e, submitSection)=>{
        e.preventDefault();
        console.log('inside handleSubmit')
        console.log('submitSection',submitSection)


        switch(submitSection){
            case 'personalDetails' : {
                console.log('1')
               const dataObj={
                    id : id,
                    fname:personalDetails.fname,
                    lname:personalDetails.lname,
                    dob:personalDetails.dob,
                    gender:personalDetails.gender,
                    phone:personalDetails.phone,
                    alternative_phone:personalDetails.alternative_phone,
                    perma_addr1:personalDetails.perma_addr1,
                    perma_addr2:personalDetails.perma_addr2,
                    perma_state:personalDetails.perma_state,
                    perma_city:personalDetails.perma_city,
                    perma_pin:personalDetails.perma_pin,
                    corr_addr1:personalDetails.corr_addr1,
                    corr_addr2:personalDetails.corr_addr2,
                    corr_state:personalDetails.corr_state,
                    corr_city:personalDetails.corr_city,
                    corr_pin:personalDetails.corr_pin
                }
                console.log(dataObj)
                axios.patch('/api/admin/update-scholar-personal-details', dataObj)
                .then(res=> {
                    console.log(res)
                    // getPersonalDetails(id)
                    setMessage({...message, personalDetails:res.data.message})
                    setTimeout(()=>{
                        setMessage({...message, [personalDetails]:''})
                    },2000)
                }).catch(err=>{
                    console.log(err)
            
                })
                setIsEditMode({...isEditMode, [submitSection]:false})
                break;
            }
            case 'pgDetails' : {
                console.log('2')
                console.log('2')
                const dataObj ={
                    id : id,
                    pg_course : pgDetails.pg_course,
                    pg_exam_roll : pgDetails.pg_exam_roll,
                    pg_class_roll : pgDetails.pg_class_roll,
                    pg_aggr_percentage : pgDetails.pg_aggr_percentage,
                    pg_backlogs : pgDetails.pg_backlogs,
                    pg_backlog_details : pgDetails.pg_backlog_details
                }
                axios.patch('/api/admin/update-scholar-pg-details', dataObj)
                .then(res=> {
                    console.log(res)
                    // getPostGraduationDetails(id)
                    setMessage({...message, pgDetails:res.data.message})
                    setTimeout(()=>{
                        setMessage({...message, [pgDetails]:''})
                    },2000)
                
                }).catch(err=>{
                    console.log(err)
            
                })
                setIsEditMode({...isEditMode, [submitSection]:false})
                break;
            }
            case 'gradDetails' : {
                console.log('3')
                console.log('3')
                console.log('3')
                const dataObj={
                    id : id,
                    grad_college:gradDetails.grad_college,
                    grad_university:gradDetails.grad_university,
                    grad_course:gradDetails. grad_course,
                    grad_roll_no:gradDetails.grad_roll_no,
                    grad_marks_obtained:gradDetails.grad_marks_obtained,
                    grad_max_marks:gradDetails.grad_max_marks,
                    grad_aggr_percentage:gradDetails.grad_aggr_percentage,
                    grad_year_of_passing:gradDetails.grad_year_of_passing
                }
                axios.patch('/api/admin/update-scholar-grad-details',  dataObj)
                .then(res=> {
                    console.log(res)
                    setMessage({...message, gradDetails:res.data.message})
                    setTimeout(()=>{
                        setMessage({...message, [gradDetails]:''})
                    },2000)
                
                    // getGraduationDetails(id)
                }).catch(err=>{
                    console.log(err)
            
                })
                setIsEditMode({...isEditMode, [submitSection]:false})
                break;
            }
            case 'interDetails' : {
                console.log('4')
                const dataObj ={
                   id : id,
                   inter_board : interDetails.inter_board,
                   inter_roll_no : interDetails.inter_roll_no,
                   inter_marks_obtained : interDetails.inter_marks_obtained,
                   inter_max_marks : interDetails.inter_max_marks,
                   inter_aggr_percentage : interDetails.inter_aggr_percentage,
                   inter_year_of_passing : interDetails.inter_year_of_passing
                }
                axios.patch('/api/admin/update-scholar-inter-details',  dataObj)
                .then(res=> {
                    console.log(res)
                    // getIntermmediateDetails(id)
                    setMessage({...message, interDetails:res.data.message})
                    setTimeout(()=>{
                        setMessage({...message, [interDetails]:''})
                    },2000)
                }).catch(err=>{
                    console.log(err)
            
                })
                setIsEditMode({...isEditMode, [submitSection]:false})
                break;
            }
            case 'highSchoolDetails' : {
                console.log('5')
                console.log('5')
                const dataObj ={
                    id : id,
                    high_board : highSchoolDetails.high_board,
                    high_roll_no : highSchoolDetails.high_roll_no,
                    high_marks_obtained : highSchoolDetails.high_marks_obtained,
                    high_max_marks : highSchoolDetails.high_max_marks,
                    high_aggr_percentage : highSchoolDetails.high_aggr_percentage,
                    high_year_of_passing : highSchoolDetails.high_year_of_passing
                }
                console.log(dataObj)
                axios.patch('/api/admin/update-scholar-highschool-details', dataObj)
                .then(res=>{
                    console.log(res)
                    if(res.status===200){
                        // getHighschoolDetails(id)
                        setMessage({...message, highSchoolDetails:res.data.message})
                        setTimeout(()=>{
                            setMessage({...message, [highSchoolDetails]:''})
                        },2000)
                    }
                }).catch(err=>{
                    console.log(err)
                })
                setIsEditMode({...isEditMode, [submitSection]:false})               
                break;
            }
            case 'placementDetails' : {
                console.log('6')
                const dataObj ={
                    id : id,
                    placement_status : placementDetails.placement_status,
                    company : placementDetails.company,
                    job_profile : placementDetails.job_profile,
                    place_of_posting : placementDetails.place_of_posting,
                    annual_package : placementDetails.annual_package
                }
                console.log(dataObj)
                axios.patch('/api/admin/update-scholar-placement-details', dataObj)
                .then(res=>{
                    console.log(res)
                    if(res.status===200){
                        setMessage({...message, placementDetails:res.data.message})
                        setTimeout(()=>{
                            setMessage({...message, [placementDetails]:''})
                        },2000)
                        // setMessage({...message, [submitSection]:res.data.message})
                        // getPlacementeDetails(id)
                    }
                }).catch(err=>{
                    console.log(err)
                })
                setIsEditMode({...isEditMode, [submitSection]:false})
                break;
            }
        }
        
    }
    // const cancelEdit=(e, section)=>{
    //     e.preventDefault();
    //     console.log('cancel edit')
    //     setPlacementDetails(placementDetails)
    //     setPersonalDetails(personalDetails)
    //     setIsEditMode({...isEditMode, [section]:false})
    // }
  
    const data={
        fname:personalDetails.fname,
        lname:personalDetails.lname,
        dob:personalDetails.dob,
        gender:personalDetails.gender,
        phone:personalDetails.phone,
        alternative_phone:personalDetails.alternative_phone,
        perma_addr1:personalDetails.perma_addr1,
        perma_addr2:personalDetails.perma_addr2,
        perma_state:personalDetails.perma_state,
        perma_city:personalDetails.perma_city,
        perma_pin:personalDetails.perma_pin,
        corr_addr1:personalDetails.corr_addr1,
        corr_addr2:personalDetails.corr_addr2,
        corr_state:personalDetails.corr_state,
        corr_city:personalDetails.corr_city,
        corr_pin:personalDetails.corr_pin,
        pg_course : pgDetails.pg_course,
        pg_exam_roll : pgDetails.pg_exam_roll,
        pg_class_roll : pgDetails.pg_class_roll,
        pg_aggr_percentage : pgDetails.pg_aggr_percentage,
        pg_backlogs : pgDetails.pg_backlogs,
        pg_backlog_details : pgDetails.pg_backlog_details,
        grad_college:gradDetails.grad_college,
        grad_university:gradDetails.grad_university,
        grad_course:gradDetails. grad_course,
        grad_roll_no:gradDetails.grad_roll_no,
        grad_marks_obtained:gradDetails.grad_marks_obtained,
        grad_max_marks:gradDetails.grad_max_marks,
        grad_aggr_percentage:gradDetails.grad_aggr_percentage,
        grad_year_of_passing:gradDetails.grad_year_of_passing,
        inter_board : interDetails.inter_board,
        inter_roll_no : interDetails.inter_roll_no,
        inter_marks_obtained : interDetails.inter_marks_obtained,
        inter_max_marks : interDetails.inter_max_marks,
        inter_aggr_percentage : interDetails.inter_aggr_percentage,
        inter_year_of_passing : interDetails.inter_year_of_passing,
        high_board : highSchoolDetails.high_board,
        high_roll_no : highSchoolDetails.high_roll_no,
        high_marks_obtained : highSchoolDetails.high_marks_obtained,
        high_max_marks : highSchoolDetails.high_max_marks,
        high_aggr_percentage : highSchoolDetails.high_aggr_percentage,
        high_year_of_passing : highSchoolDetails.high_year_of_passing,
        company:placementDetails.company,
        job_profile:placementDetails.job_profile,
        place_of_posting:placementDetails.place_of_posting,
        annual_package:placementDetails.annual_package,
        placement_status:placementDetails.placement_status
    }

    useEffect(()=>{
        // window.scrollTo(0, 0)
        console.log('Inside ScholarDetails')
        getScholar()
        setIsLoading(false)    
    },[]);    
    
    if(isLoading){
        return <Loading message={'Just a moment'}/>
    }
    
    const PersonalDetails=()=>{
        if(isEditMode.personalDetails){
            return(<>
            <div className='mb-1 py-2 mx-4'>
                <form onSubmit={(e)=>handleSubmit(e, 'personalDetails')}> 
                <h3 className='font-semibold flex items-center' >Personal Details<span className='italic font-normal pl-3'>(Edit Mode)</span></h3>
                    <div className='flex border-b-2 border-slate-100'>
                        <div className=' flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                            <div className='flex flex-col px-2 py-1'><label>First name</label><input onChange={(e)=> handleChange(e,'fname','personalDetails')}
                                className='border-2  rounded-md' value={personalDetails.fname}/></div>
                            <div className='flex flex-col px-2 py-1'><label>Last name</label><input onChange={(e)=> handleChange(e,'lname','personalDetails')}
                                className='border-2  rounded-md'  value={personalDetails.lname}/></div>
                            <div className='flex flex-col px-2 py-1'><label>Mobile no.</label><input onChange={(e)=> handleChange(e,'phone','personalDetails')}
                                className='border-2  rounded-md' value={personalDetails.phone}/></div>
                            <div className='flex flex-col px-2 py-1'><label>Alternative phone no.</label><input onChange={(e)=> handleChange(e,'alternative_phone','personalDetails')}
                                className='border-2  rounded-md'  value={personalDetails.alternative_phone}/></div>
                        </div>
                    </div>
                    <div className='mt-1 py-2 border-b-2 border-slate-100'>
                        <h4 className=' font-semibold mx-2 bg-violet-300/20 py-2 px-2 rounded-md'>Permanent Address</h4>
                        <div className='flex'>
                        <div className='flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                            <div className='flex flex-col px-2 py-1'><label>Address Line 1</label><input onChange={(e)=> handleChange(e,'perma_addr1','personalDetails')}
                                className='border-2  rounded-md' value={personalDetails.perma_addr1}/></div>
                            <div className='flex flex-col px-2 py-1'><label>Address Line 2</label><input onChange={(e)=> handleChange(e,'perma_addr2','personalDetails')}
                                className='border-2  rounded-md' value={personalDetails.perma_addr2}/></div>
                            <div className='flex flex-col px-2 py-1'><label>City</label><input onChange={(e)=>handleChange(e,'perma_city','personalDetails')}
                                className='border-2  rounded-md' value={personalDetails.perma_city}/></div>
                            <div className='flex flex-col px-2 py-1'><label>State</label><input onChange={(e)=> handleChange(e,'perma_state','personalDetails')}
                                className='border-2  rounded-md' value={personalDetails.perma_state}/></div>
                            <div className='flex flex-col px-2 py-1'><label>PIN</label><input onChange={(e)=> handleChange(e,'perma_pin','personalDetails')}
                                className='border-2  rounded-md' value={personalDetails.perma_pin}/></div>
                        </div>
                    </div>
                    </div>
                    <div className='flex'>
                        <div className='mt-1 py-2 '>
                            <h4 className='font-semibold mx-2 bg-violet-300/20 py-2 px-2 rounded-md'>Correspondance Address</h4>
                            <div className='flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                            <div className='flex flex-col px-2 py-1 '><label>Address Line 1</label><input onChange={(e)=> handleChange(e,'corr_addr1','personalDetails')}
                                className='border-2  rounded-md' value={data.corr_addr1}/></div>
                            <div className='flex flex-col px-2 py-1 '><label>Address Line 2</label><input onChange={(e)=> handleChange(e,'corr_addr2','personalDetails')}
                                className='border-2  rounded-md' value={data.corr_addr2}/></div>
                            <div className='flex flex-col px-2 py-1'><label>City</label><input onChange={(e)=> handleChange(e,'corr_city','personalDetails')}
                                className='border-2  rounded-md' value={data.corr_city}/></div>          
                            <div className='flex flex-col px-2 py-1'><label>State</label><input onChange={(e)=> handleChange(e,'corr_state','personalDetails')}
                                className='border-2  rounded-md' value={data.corr_state}/></div>          
                            <div className='flex flex-col px-2 py-1'><label>PIN</label><input onChange={(e)=> handleChange(e,'corr_pin','personalDetails')}
                                className='border-2  rounded-md' value={data.corr_pin}/></div>               
                        </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button className='bg-blue-500  hover:bg-blue-400  text-white font-semibold text-sm rounded-md py-2 px-3 mx-2'>SAVE</button>
                        {/* <button className='bg-blue-500  hover:bg-blue-400  text-white font-semibold text-sm rounded-md py-2 px-3 mx-2' onClick={(e)=>cancelEdit(e, 'personalDetails')}>CANCEL</button> */}
                    </div>
                </form>
            </div>
            </>)
        }
        return(<>
           
            <div className='mb-1 py-1 mx-4 '>
                        <h3 className='font-semibold flex items-center'>Personal Details <p> 
                    <button  onClick={(e)=>handleEditMode(e,'personalDetails')} className=' mx-5 cursor-pointer' >
                        <RiEdit2Fill className='rounded-sm  focus:border-2 focus:border-white text-xl text-fuchsia-900 hover:text-white'/>
                    </button>
                </p></h3>
                <div className='flex border-b-2 border-slate-100'>
                    <div className=' flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                        <div className='flex flex-col px-2 py-1'><label>First name</label><p className='border-2  rounded-md'>{personalDetails.fname}</p></div>
                            <div className='flex flex-col px-2 py-1'><label>Last name</label><p className='border-2  rounded-md'>{personalDetails.lname}</p></div>
                            <div className='flex flex-col px-2 py-1'><label>Mobile no.</label><p className='border-2  rounded-md' >{personalDetails.phone}</p></div>
                            <div className='flex flex-col px-2 py-1'><label>Alternative phone no.</label><p className='border-2  rounded-md' >{personalDetails.alternative_phone}</p></div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='mt-1 py-2  border-b-2 border-slate-100'>
                        <h4 className=' font-semibold bg-violet-300/20 py-2 px-2 rounded-md'>Permanent Address</h4>
                        <div className='flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                        <div className='flex flex-col px-2 py-1 '><label>Address Line 1</label><p className='w-[330px] border-2  rounded-md'>{personalDetails.perma_addr1}</p></div>
                        <div className='flex flex-col px-2 py-1 '><label className='font-normal'>Address Line 2</label><p className='w-[330px] border-2 rounded-md'>{personalDetails.perma_addr2}</p></div>
                        <div className='flex flex-col px-2 py-1'><label className='font-normal'>City</label><p className='border-2 rounded-md'>{personalDetails.perma_city}</p></div>
                        <div className='flex flex-col px-2 py-1'><label className='font-normal'>State</label><p className='border-2 rounded-md'>{personalDetails.perma_state}</p></div>
                        <div className='flex flex-col px-2 py-1'><label className='font-normal'>PIN</label><p className='border-2 rounded-md'>{personalDetails.perma_pin}</p></div>
                    </div>
                </div>
                </div>
                <div className='flex'>
                    <div className='mt-1 py-2'>
                        <h4 className='font-semibold bg-violet-300/20 py-2 px-2 rounded-md'>Correspondance Address</h4>
                        <div className='flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                        <div className='flex flex-col px-2 py-1 '><label className='font-normal'>Address Line 1</label><p className='w-[330px] border-2 rounded-md'>{personalDetails.corr_addr1}</p></div>
                        <div className='flex flex-col px-2 py-1 '><label className='font-normal'>Address Line 2</label><p className='w-[330px] border-2 rounded-md'>{personalDetails.corr_addr2}</p></div>
                        <div className='flex flex-col px-2 py-1'><label className='font-normal'>City</label><p className='border-2 rounded-md'>{personalDetails.corr_city}</p></div>          
                        <div className='flex flex-col px-2 py-1'><label className='font-normal'>State</label><p className='border-2 rounded-md'>{personalDetails.corr_state}</p></div>          
                        <div className='flex flex-col px-2 py-1'><label className='font-normal'>PIN</label><p className='border-2 rounded-md'>{personalDetails.corr_pin}</p></div>               
                    </div>
                    {message.personalDetails!=='' && <p className='mx-2 bg-slate-50 py-2 rounded-md'>{message.personalDetails}</p>}
                    </div>
                </div>
            </div>
        </>)
    }
    
    const PostGraduationDetails=()=>{
        if(isEditMode.pgDetails){
            return(<> 
            <div className='py-2 mx-4 '>
                <h3 className='font-semibold flex items-center'>PostGraduation Details<span className='italic font-normal pl-3'>(Edit Mode)</span></h3>
                <form onSubmit={(e)=>handleSubmit(e, 'pgDetails')}> 
                    <div className='flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                    <div className='flex flex-col px-2 py-1'><label className='font-normal'>Course</label><input onChange={(e)=>handleChange(e,'pg_course','pgDetails')}
                        className='border-2  rounded-md' value={data.pg_course}/></div>
                    <div className='flex flex-col px-2 py-1'><label className='font-normal'>Class roll no.</label><input onChange={(e)=>handleChange(e,'pg_class_roll','pgDetails')}
                        className='border-2  rounded-md' value={data.pg_class_roll}/></div>          
                    <div className='flex flex-col px-2 py-1'><label className='font-normal'>Exam roll no.</label><input onChange={(e)=>handleChange(e,'pg_exam_roll','pgDetails')}
                        className='border-2  rounded-md' value={data.pg_exam_roll}/></div>
                    <div className='flex flex-col px-2 py-1'><label className='font-normal'>Backlogs</label><input onChange={(e)=>handleChange(e,'pg_backlogs','pgDetails')}
                        className='border-2  rounded-md' value={data.pg_backlogs}/></div>          
                    <div className='flex flex-col px-2 py-1'><label className='font-normal'>Backlog details</label><input onChange={(e)=>handleChange(e,'pg_backlog_details','pgDetails')}
                        className='border-2  rounded-md' value={data.pg_backlog_details}/></div>               
                    </div>
                    
                    <div className='flex justify-center'>
                        <button className='bg-blue-500  hover:bg-blue-400  text-white font-semibold text-sm rounded-md py-2 px-3 mx-2'>SAVE</button>
                        {/* <button className='bg-blue-500  hover:bg-blue-400  text-white font-semibold text-sm rounded-md py-2 px-3 mx-2' onClick={(e)=>cancelEdit(e, 'pgDetails')}>CANCEL</button> */}
                    </div>
                </form>
            </div>
        
            
            </>)
        }
        return(<>
            <div className='   mt-1 py-2 mx-4 '>
                <h3 className='font-semibold flex items-center '>PostGraduation Details
                <p> 
                    <button  onClick={(e)=>handleEditMode(e,'pgDetails')} className=' mx-5  cursor-pointer' >
                        <RiEdit2Fill className='font-bold focus:border-2 focus:border-white text-xl text-fuchsia-900 hover:text-white'/>
                    </button>
                </p></h3>
                <div className='flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                    <div className='flex flex-col px-2 py-1'><label>Course</label><p className='border-2  rounded-md'>{pgDetails.pg_course}</p></div>
                    <div className='flex flex-col px-2 py-1'><label>Class roll no.</label><p className='border-2  rounded-md'>{pgDetails.pg_class_roll}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>Exam roll no.</label><p className='border-2  rounded-md'>{pgDetails.pg_exam_roll}</p></div>
                    <div className='flex flex-col px-2 py-1'><label>Backlogs</label><p className='border-2  rounded-md'>{pgDetails.pg_backlogs}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>Backlog details</label><p className='border-2  rounded-md'>{pgDetails.pg_backlog_details}</p></div>               
                </div>
                {message.pgDetails!=='' && <p className='mx-2 text-slate-500 font-semibold py-2 rounded-md'>{message.pgDetails}</p>}
            </div>

            
                    
        </>)
    }
    const GraduationDetails=()=>{
        if(isEditMode.gradDetails){
            return(<>
             <div className='  mt-1 py-2 mx-4 '>
           
                <h3 className='font-semibold flex items-center'>Graduation Details<span className='italic font-normal pl-3'>(Edit Mode)</span></h3>

                <form onSubmit={(e)=>handleSubmit(e, 'gradDetails')}> 
                <div className='flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                <div className='flex flex-col px-2 py-1'><label>Course</label><input onChange={(e)=>handleChange(e,'grad_course','gradDetails')} 
                    className='border-2  rounded-md' value={data.grad_course}/></div>
                <div className='flex flex-col px-2 py-1'><label>Roll no.</label><input onChange={(e)=>handleChange(e,'grad_roll_no','gradDetails')}
                     className='border-2  rounded-md' value={data.grad_roll_no}/></div>          
                <div className='flex flex-col px-2 py-1'><label>College</label><input onChange={(e)=>handleChange(e,'grad_college','gradDetails')}
                     className='border-2  rounded-md' value={data.grad_college}/></div>
                <div className='flex flex-col px-2 py-1'><label>University</label><input onChange={(e)=>handleChange(e,'grad_university','gradDetails')}
                     className='border-2  rounded-md' value={data.grad_university}/></div>
                <div className='flex flex-col px-2 py-1'><label>Marks obtained</label><input onChange={(e)=>handleChange(e,'grad_marks_obtained','gradDetails')}
                     className='border-2  rounded-md' value={data.grad_marks_obtained}/></div>          
                <div className='flex flex-col px-2 py-1'><label>Maximum marks</label><input onChange={(e)=>handleChange(e,'grad_max_marks','gradDetails')}
                     className='border-2  rounded-md' value={data.grad_max_marks}/></div>          
                <div className='flex flex-col px-2 py-1'><label>Percentage</label><input onChange={(e)=>handleChange(e,'grad_aggr_percentage','gradDetails')} 
                    className='border-2  rounded-md' value={data.grad_aggr_percentage}/></div>          
                <div className='flex flex-col px-2 py-1'><label>Year of passing</label><input onChange={(e)=>handleChange(e,'grad_year_of_passing','gradDetails')} 
                    className='border-2  rounded-md' value={data.grad_year_of_passing}/></div>               
            </div>
          
                <div className='flex justify-center'>
                    <button className='bg-blue-500  hover:bg-blue-400  text-white font-semibold text-sm rounded-md py-2 px-3 mx-2'>SAVE</button>
                    {/* <button className='bg-blue-500  hover:bg-blue-400  text-white font-semibold text-sm rounded-md py-2 px-3 mx-2' onClick={(e)=>cancelEdit(e, 'gradDetails')}>CANCEL</button> */}
                </div>
            </form>
            </div>
            </>)
        }
        return(<>
             <div className='   mt-1 py-2 mx-4 '>
                <h3 className='font-semibold flex items-center'>Graduation Details<p> 
                    <button  onClick={(e)=>handleEditMode(e,'gradDetails')} className=' mx-5  cursor-pointer' >
                        <RiEdit2Fill className='font-bold focus:border-2 focus:border-white text-xl text-fuchsia-900 hover:text-white'/>
                    </button>
                </p></h3>
                <div className='flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                    <div className='flex flex-col px-2 py-1'><label>Course</label><p className='border-2  rounded-md'>{gradDetails.grad_course}</p></div>
                    <div className='flex flex-col px-2 py-1'><label>Roll no.</label><p className='border-2  rounded-md'>{gradDetails.grad_roll_no}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>College</label><p className='border-2  rounded-md'>{gradDetails.grad_college}</p></div>
                    <div className='flex flex-col px-2 py-1'><label>University</label><p className='border-2  rounded-md'>{gradDetails.grad_university}</p></div>
                    <div className='flex flex-col px-2 py-1'><label>Marks obtained</label><p className='border-2  rounded-md'>{gradDetails.grad_marks_obtained}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>Maximum marks</label><p className='border-2  rounded-md'>{gradDetails.grad_max_marks}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>Percentage</label><p className='border-2  rounded-md'>{gradDetails.grad_aggr_percentage}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>Year of passing</label><p className='border-2  rounded-md'>{gradDetails.grad_year_of_passing}</p></div>               
                </div>
                {message.gradDetails!=='' && <p className='mx-2 bg-slate-50 py-2 rounded-md'>{message.gradDetails}</p>}
            </div>

        </>)
    }
    const HighSchoolDetails=()=>{
        
        if(isEditMode.highSchoolDetails){
        return(<>
            <div className='mt-1 py-2 mx-4 '>
            <h3 className='font-semibold flex items-center'>Highschool Details<span className='italic font-normal pl-3'>(Edit Mode)</span></h3>
            <form onSubmit={(e)=>handleSubmit(e, 'highSchoolDetails')}> 
            <div className='flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                    <div className='flex flex-col px-2 py-1'><label>Board</label><input onChange={(e)=>handleChange(e,'high_board','highschoolDetails')}
                        className='border-2  rounded-md' value={data.high_board}/></div>
                    <div className='flex flex-col px-2 py-1'><label>Roll no.</label><input onChange={(e)=>handleChange(e,'high_roll_no','highschoolDetails')}
                        className='border-2  rounded-md' value={data.high_roll_no}/></div>          
                    <div className='flex flex-col px-2 py-1'><label>Marks obtained</label><input onChange={(e)=>handleChange(e,'high_marks_obtained','highschoolDetails')}
                        className='border-2  rounded-md' value={data.high_marks_obtained}/></div>          
                    <div className='flex flex-col px-2 py-1'><label>Maximum marks</label><input onChange={(e)=>handleChange(e,'high_max_marks','highschoolDetails')}
                        className='border-2  rounded-md' value={data.high_max_marks}/></div>          
                    <div className='flex flex-col px-2 py-1'><label>Percentage</label><input onChange={(e)=>handleChange(e,'high_aggr_percentage','highschoolDetails')}
                        className='border-2  rounded-md' value={data.high_aggr_percentage}/></div>          
                    <div className='flex flex-col px-2 py-1'><label>Year of passing</label><input onChange={(e)=>handleChange(e,'high_year_of_passing','highschoolDetails')}
                        className='border-2  rounded-md' value={data.high_year_of_passing}/></div>               
                </div>
                
                    <div className='flex justify-center'>
                        <button className='bg-blue-500  hover:bg-blue-400  text-white font-semibold text-sm rounded-md py-2 px-3 mx-2'>SAVE</button>
                        {/* <button className='bg-blue-500  hover:bg-blue-400  text-white font-semibold text-sm rounded-md py-2 px-3 mx-2' onClick={(e)=>cancelEdit(e, 'highSchoolDetails')}>CANCEL</button> */}
                    </div>
                </form>
            </div>    
        </>)
        }
        return(<>
            <div className='   mt-1 py-2 mx-4 '>
            <h3 className='font-semibold  flex items-center '>Highschool Details<p> 
                    <button  onClick={(e)=>handleEditMode(e,'highSchoolDetails')} className=' mx-5  cursor-pointer' >
                        <RiEdit2Fill className='font-bold focus:border-2 focus:border-white text-xl text-fuchsia-900 hover:text-white'/>
                    </button>
                </p></h3>
                <div className='flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                    <div className='flex flex-col px-2 py-1'><label>Board</label><p className='border-2  rounded-md'>{highSchoolDetails.high_board}</p></div>
                    <div className='flex flex-col px-2 py-1'><label>Roll no.</label><p className='border-2  rounded-md'>{highSchoolDetails.high_roll_no}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>Marks obtained</label><p className='border-2  rounded-md'>{highSchoolDetails.high_marks_obtained}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>Maximum marks</label><p className='border-2  rounded-md'>{highSchoolDetails.high_max_marks}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>Percentage</label><p className='border-2  rounded-md'>{highSchoolDetails.high_aggr_percentage}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>Year of passing</label><p className='border-2  rounded-md'>{highSchoolDetails.high_year_of_passing}</p></div>               
                </div>
                {message.highSchoolDetails!=='' && <p className='mx-2 bg-slate-50 py-2 rounded-md'>{message.highSchoolDetails}</p>}
            </div>
               
        </>)

    }     
    const IntermmediateDetails=()=>{
        if(isEditMode.interDetails){
        return(<>
             <div className='   mt-1 py-2 mx-4 '>
                <h3 className='font-semibold flex items-center '>Intermediate Details(10+2 or equivalent)<span className='italic font-normal pl-3'>(Edit Mode)</span></h3>
                <form onSubmit={(e)=>handleSubmit(e, 'interDetails')}> 
                <div className='flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                    <div className='flex flex-col px-2 py-1'><label>Board</label><input onChange={(e)=>handleChange(e,'inter_board','interDetails')}
                         className='border-2  rounded-md' value={data.inter_board}/></div>
                    <div className='flex flex-col px-2 py-1'><label>Roll no.</label><input onChange={(e)=>handleChange(e,'inter_roll_no','interDetails')}
                         className='border-2  rounded-md' value={data.inter_roll_no}/></div>          
                    <div className='flex flex-col px-2 py-1'><label>Marks obtained</label><input onChange={(e)=>handleChange(e,'inter_marks_obtained','interDetails')}
                         className='border-2  rounded-md' value={data.inter_marks_obtained}/></div>          
                    <div className='flex flex-col px-2 py-1'><label>Maximum marks</label><input onChange={(e)=>handleChange(e,'inter_max_marks','interDetails')}
                         className='border-2  rounded-md' value={data.inter_max_marks}/></div>          
                    <div className='flex flex-col px-2 py-1'><label>Percentage</label><input onChange={(e)=>handleChange(e,'inter_aggr_percentage','interDetails')}
                         className='border-2  rounded-md' value={data.inter_aggr_percentage}/></div>          
                    <div className='flex flex-col px-2 py-1'><label>Year of passing</label><input onChange={(e)=>handleChange(e,'inter_year_of_passing','interDetails')}
                         className='border-2  rounded-md' value={data.inter_year_of_passing}/></div>               
                    </div>
                    
                    <div className='flex justify-center'>
                        <button className='bg-blue-500  hover:bg-blue-400  text-white font-semibold text-sm rounded-md py-2 px-3 mx-2'>SAVE</button>
                        {/* <button className='bg-blue-500  hover:bg-blue-400  text-white font-semibold text-sm rounded-md py-2 px-3 mx-2' onClick={(e)=>cancelEdit(e, 'interDetails')}>CANCEL</button> */}
                    </div>
                </form>
            </div>
            </>)
        }
        return(
            <>
             <div className='mt-1 py-2 mx-4 '>
                <h3 className='font-semibold flex items-center '>Intermediate Details(10+2 or equivalent)<p> 
                    <button  onClick={(e)=>handleEditMode(e,'interDetails')} className=' mx-5  cursor-pointer' >
                        <RiEdit2Fill className='font-bold focus:border-2 focus:border-white text-xl text-fuchsia-900 hover:text-white'/>
                    </button>
                </p></h3>
                <div className='flex flex-col sm:flex-row flex-wrap justify-start my-4 mx-4'>
                    <div className='flex flex-col px-2 py-1'><label>Board</label><p className='border-2  rounded-md'>{interDetails.inter_board}</p></div>
                    <div className='flex flex-col px-2 py-1'><label>Roll no.</label><p className='border-2  rounded-md'>{interDetails.inter_roll_no}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>Marks obtained</label><p className='border-2  rounded-md'>{interDetails.inter_marks_obtained}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>Maximum marks</label><p className='border-2  rounded-md'>{interDetails.inter_max_marks}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>Percentage</label><p className='border-2  rounded-md'>{interDetails.inter_aggr_percentage}</p></div>          
                    <div className='flex flex-col px-2 py-1'><label>Year of passing</label><p className='border-2  rounded-md'>{interDetails.inter_year_of_passing}</p></div>               
                </div>
                {message.interDetails!=='' && <p className='mx-2 bg-slate-50 py-2 rounded-md'>{message.interDetails}</p>}
            </div>
                
            </>
        )
        
    }
    const PlacementDetails=()=>{
        if(isEditMode.placementDetails){
            return(
             <><div className=' mt-1 py-2 mx-4 '>
                 <h3 className='font-semibold flex items-center ' >Placement Details<span className='italic font-normal pl-3'>(Edit Mode)</span></h3>
                    <form onSubmit={(e)=>handleSubmit(e, 'placementDetails')}> 
                        <div className='flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                         <div className='flex flex-col justify-start items-start px-2 py-1'>
                         {/* <label className='px-2 text-indigo-700'>Start&nbsp;year -</label> */}
                         <label htmlFor='placement_status'>Placement&nbsp;status</label>
                            <select required 
                                   className='mr-1 px-2 py-1 border-transparent focus:text-sm text-md focus:ring-0 focus:ring-transparent  focus:border-0 focus:border-b-[3px] focus:border-blue-600 m-1 w-[260px] '
                                    name='placement_status'
                                    value={data.placement_status}  onChange={(e)=>handleChange(e,'placement_status','placementDetails')}>
                                    <option selected value=''>Select an option</option>
                                    <option>Placed</option>
                                    <option>Unplaced</option>
                                </select>
                            </div>
                             <div className='flex flex-col px-2 py-1'>
                                <label htmlFor='company'>Company Name</label>
                                <input value={data.company} className='w-[300px] border-2 border-slate-300 ' onChange={(e)=>handleChange(e,'company','placementDetails')} name='company'/>
                             </div>
                             <div className='flex flex-col px-2 py-1'>
                                <label htmlFor=''company>Job profile</label>
                                 <input value={data.job_profile} className='w-[300px] border-2 border-slate-300 ' onChange={(e)=>handleChange(e,'job_profile','placementDetails')} name='job_profile'/>
                             </div>
                             <div className='flex flex-col px-2 py-1'>
                                <label htmlFor=''>Place of posting</label>
                                <input value={data.place_of_posting} className='w-[300px] border-2 border-slate-300 ' onChange={(e)=>handleChange(e,'place_of_posting','placementDetails')} name='place_of_posting'/>
                             </div>
                             <div className='flex flex-col px-2 py-1'>
                                <label htmlFor=''>Annual package</label>
                                <input value={data.annual_package} className='w-[300px] border-2 border-slate-300 ' onChange={(e)=>handleChange(e,'annual_package','placementDetails')} name='annual_package'/>
                             </div>
                         </div>
                         <div className='flex justify-center'>
                             <button className='bg-blue-500  hover:bg-blue-400  text-white font-semibold text-sm rounded-md py-2 px-3 mx-2'>SAVE</button>
                             {/* <button className='bg-blue-500  hover:bg-blue-400  text-white font-semibold text-sm rounded-md py-2 px-3 mx-2' onClick={(e)=>cancelEdit(e, 'placementDetails')}>CANCEL</button> */}
                         </div>
                     </form>
                </div>
             </>
        )}

        return(<>
            <div className='mt-1 py-2 mx-4 '>
                <h3 className='font-semibold flex items-center '>Placement Details
                    <p> 
                        <button  onClick={(e)=>handleEditMode(e,'placementDetails')} className=' mx-5  cursor-pointer' >
                            <RiEdit2Fill className='font-bold focus:border-2 focus:border-white text-xl text-fuchsia-900 hover:text-white'/>
                        </button>
                    </p>
                </h3> 
                <div className='flex flex-col sm:flex-row  flex-wrap justify-start my-4 mx-4'>
                    
                    <div className='flex flex-col px-2 py-1'><label>Placement&nbsp;status</label>
                        <p className='border-2 rounded-md '>{placementDetails.placement_status}</p>
                    </div>
                    <div className='flex flex-col px-2 py-1'><label>Company</label>
                        <p className='border-2 rounded-md '>{placementDetails.company}</p>
                    </div>
                    <div className='flex flex-col px-2 py-1'><label>Job&nbsp;description</label>
                        <p className='border-2 rounded-md '>{placementDetails.job_profile}</p>
                    </div>
                    <div className='flex flex-col px-2 py-1'><label>Place&nbsp;of&nbsp;posting</label>
                        <p className='border-2 rounded-md '>{placementDetails.place_of_posting}</p>
                    </div>
                    <div className='flex flex-col px-2 py-1'><label>Annual&nbsp;package</label>
                        <p className='border-2 rounded-md '>{placementDetails.annual_package===0? 'NA' :` ${placementDetails.annual_package}`}</p>
                    </div>
            </div>
            {message.placementDetails!=='' && <p className='mx-2 bg-slate-50 py-2 rounded-md'>{message.placementDetails}</p>}

         </div>
     </>
         )
    }



    return(
        <>
        <div className='scholar-details  w-90%  bg-slate-100 py-5 text-slate-500'>
            <div className="mx-1 row" >
                <div className="col-md-3">
                    <div className="d-flex flex-column align-items-center text-center mx-3" >
                        <Link to="/dashboard" className="font-semibold hover:bg-purple-400 text-white bg-violet-600 mb-4 lg:my-0 text-sm sm:text-base px-3 py-1 rounded-md ">Back to dashboard</Link>
                    </div>
                </div>
               
                <div className="bg-white col-md-7 rounded-lg ">
                    <div className="row p-2 bg-[#a779e4] items-center rounded-t-lg text-white border-b-4 border-slate-200">
                        <h4>Scholar details -
                            <span className='font-normal '>{personalDetails.fname}&nbsp;{personalDetails.lname}</span></h4>
                        </div>
                        
                        <p className='text-md mx-4 my-1 text-black-50 font-normal'>Email&nbsp;-&nbsp; {personalDetails.email}</p>
                        <PlacementDetails/>  
                        <PersonalDetails/>
                        <PostGraduationDetails/>
                        <GraduationDetails/>
                        <IntermmediateDetails/>
                        <HighSchoolDetails/>
                    </div>
                    <div className="d-flex flex-column align-items-center text-center mx-3 mt-4" >
                        <Link to="/dashboard" className="font-semibold hover:bg-purple-400 text-white bg-violet-600  text-sm sm:text-base px-3 py-1 rounded-md ">Back to dashboard</Link>
                    </div>
            </div>
        </div>
                
        </>
    )

}
export default ScholarDetails



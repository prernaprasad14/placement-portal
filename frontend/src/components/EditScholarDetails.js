import { useState, useEffect, useContext } from "react"
import axios from '../axiosConfig'
import {AiFillEdit} from 'react-icons/ai'

const EditScholarDetails=({scholar,data})=>{
    const [isEditMode, setIsEditMode] = useState(false)
    const id =  scholar
    const [isActive, setIsActive] = useState(false)
    const [placementDetails, setPlacementDetails] = useState({
      
    })
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
    const handleChange=(e, input)=>{
        e.preventDefault();
        console.log("inside handleChange")
        const {value}=e.target
        console.log(value, input)
        setPlacementDetails({...placementDetails, [input]:value})
    }
    const handleSubmit=(e)=>{
        console.log("inside handleSubmit")
        console.log("inside handleSubmit",id)
        e.preventDefault();
        const dataObj ={
            scholar_id : id,
            company : placementDetails.company,
            job_desc : placementDetails.job_desc,
            place_of_posting : placementDetails.place_of_posting,
            annual_package : placementDetails.annual_package
        }
        console.log(dataObj)
        axios.patch('/api/admin/update-scholar-placement-details', dataObj)
        .then(res=>{
            console.log(res)
            if(res.status===200){

                getPlacementeDetails(id)
            }
        }).catch(err=>{
            console.log(err)
        })
        setIsEditMode(!isEditMode)
    }
    const placeddata={
        company:placementDetails.company,
        job_desc:placementDetails.job_desc,
        place_of_posting:placementDetails.place_of_posting,
        annual_package:placementDetails.annual_package
    }
    useEffect(()=>{
        console.log("Inside placementDetails")
        setPlacementDetails(data)
    },[])

    if(isEditMode)
    return(
        <><div>
            <h3 className="font-semibold flex items-center " >Placement Details</h3>
            <div className="p-3 flex flex-col">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-row px-1">
                        <div className="form-group">
                            <label htmlFor=''>Company Name</label>
                            <input defaultValue={placeddata.company} className='w-[300px] border-2 border-slate-300 ' onChange={(e)=>handleChange(e,'company')} name="company"/>
                        </div>
                        <div className="form-group ml-4">
                            <label htmlFor=''>Job description</label>
                            <input defaultValue={placeddata.job_desc} className='w-[300px] border-2 border-slate-300 ' onChange={(e)=>handleChange(e,'job_desc')} name="job_desc"/>
                        </div>
                    </div>
                    <div className="flex flex-row px-1">
                        <div className="form-group">
                            <label htmlFor=''>Place of posting</label>
                            <input defaultValue={placeddata.place_of_posting} className='w-[300px] border-2 border-slate-300 ' onChange={(e)=>handleChange(e,'place_of_posting')} name="place_of_posting"/>
                        </div>
                        <div className="form-group ml-4">
                            <label htmlFor=''>Annual package</label>
                            <input defaultValue={placeddata.annual_package} className='w-[300px] border-2 border-slate-300 ' onChange={(e)=>handleChange(e,'annual_package')} name="annual_package"/>
                        </div>
                    </div>
                    <div className="flex justify-center">

                    <button className="bg-blue-500  hover:bg-blue-400 rounded-md py-2 px-3">Save</button>
                    </div>
                </form>
                </div>
            </div>
        </>
    )

    if(placementDetails!=null)
        return(
            <>
            <div>
                <h3 className="font-semibold flex items-center ">Placement Details
                    <p> 
                        <button type="button"  onClick={()=>setIsEditMode(!isActive)} className=" mx-5  cursor-pointer" value="btn">
                            <AiFillEdit className='focus:border-2 focus:border-white text-xl text-violet-300 hover:text-white'/>
                        </button>
                    </p>
                </h3>
            
                <div className="p-3"> 
                    
                    <div><label>Company</label>
                        <p className="">{placementDetails.company}</p>
                    </div>
                    <div><label>Job&nbsp;description</label>
                        <p className="">{placementDetails.job_desc}</p>
                    </div>
                    <div><label>Place&nbsp;of&nbsp;posting</label>
                        <p className="">{placementDetails.place_of_posting}</p>
                    </div>
                    <div><label>Annual&nbsp;package</label>
                        <p className="">{placementDetails.annual_package}</p>
                    </div>
                </div>
            </div>
            </>
        )
}
export default EditScholarDetails
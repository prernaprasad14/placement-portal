import { useParams } from "react-router";
import { useState, useEffect } from "react"
import axios from "../../axiosConfig"

const ScholarProfile=()=>{
    const {id} = useParams();
    var c=0
    c++
    
    console.log("here?"+c)
    const [scholar, setScholar]= useState({})
    
    useEffect(()=>{
        getScholar()
    },[]);

    const getScholar=()=>{
        console.log("here here")
        axios.get(`api/scholar/profile/${id}`)
        .then((res)=>{
            const scholar = res.data.scholar;
            console.log("1 scholar")
            console.log(res)
            console.log(res.data)
            setScholar(scholar);
            // console.log(scholar.loginDetails.username)
            console.log("2 scholar")
            
        })
        .catch(err=> console.log("Error getScholar : "+err))
    }
    console.log("outside function")
   
    // console.log(scholar.loginDetails.username)
    console.log("scholar")
    console.log(scholar.loginDetails)
    // const {fname, lname, dob, gender}= scholar.personalDetails
    // const {username}=scholar.loginDetails
    return(
        < >
        <p>id :{id}</p>    
        <div className="flex-col bg-lime-200" onLoad={getScholar}>
            <div className="bg-rose-200">Profile : username</div>
            <div>Personal Details
            <div className="flex">
                <div name="fname" className=" flex px-3 my-1 border-2 bg-white"><div>First name</div><div className="px-4">fname</div></div>
                <div name="lname" className=" flex px-3 my-1 border-2 bg-white" ><div>Last name</div><div className="px-4">lname</div></div>   
            </div>
            <div className='my-5'> 
                <div>Date of Birth </div>
                <div name="dob" className="px-3 border-2  bg-white" >dob</div>
            </div>
            <div className='mr-2 flex'><div>Gender</div><div className="px-4 bg-white" >gender</div></div> 
            <div className="flex">
                <div>Phone number </div>
                <div name="phone" className="px-3 border-2  bg-white" >phone</div>

            </div>
            <div className="flex">
                <div>Alternative Phone number <span className='text-xs text-gray-500'>(optional)</span> </div>
                <div name="alternative_phone"    className="px-3 my-1 border-2  bg-white" >alternative_phone</div>
            </div>
            <div className="flex ">
            <div className='my-8 px-5'>
                <p className='font-bold'>Permanent Address</p>
                <div className ="flex">
                    <div>Address Line 1 </div>
                <div name="perma_addr1" className="px-3 my-1 border-2  bg-white" ></div>

                </div>
                <div className ="flex">
                    <div>Address Line 2 </div>
                <div  name="perma_addr2" className="px-3 my-1 border-2  bg-white" >addr2</div>

                </div>
                <div className ="flex">
                    <div>State </div>
                <div name="perma_state" className="px-3 my-1 border-2  bg-white" >state</div>

                </div>
                <div className ="flex">
                    <div>City </div>
                <div name="perma_city" className="px-3 my-1 border-2  bg-white" >city</div>

                </div>
                <div className ="flex">
                    <div>PIN </div>
                <div name="perma_pin"  className="px-3 my-1 border-2  bg-white" >pin</div>

                </div>
            </div>
            <div className='my-8 px-5'>
                <p className='font-bold'>Correspondence Address</p>
            
                <div className ="flex">
                    <div>Address Line 1 </div>
                    <div name="corr_addr1"
                    className="px-3 my-1 border-2  bg-white" ></div>

                </div>
                <div className ="flex">
                    <div>Address Line 2 </div>
                    <div name="corr_addr2"
                    className="px-3 my-1 border-2  bg-white" ></div>

                </div>
                <div className ="flex">
                    <div>State </div>
                    <div name="corr_state"
                    className="px-3 my-1  border-2  bg-white" ></div>

                </div>
                <div className ="flex">
                    <div>City</div>
                    <div name="corr_city" className="px-3 my-1  border-2  bg-white" ></div>

                </div>
                <div className ="flex">
                    <div>PIN </div>
                    <div  name="corr_pin" min="0" max="9" className="px-3 my-1  border-2  bg-white" ></div>

                </div>
            </div>
            </div>  
                <div>Post Graduation Details
                    <div></div>
                </div>
                <div>Graduations Details</div>
                <div>Intermediate Details</div>
                <div>HighSchool Details</div>
            </div>
        </div>
        </>
    )
}
export default ScholarProfile
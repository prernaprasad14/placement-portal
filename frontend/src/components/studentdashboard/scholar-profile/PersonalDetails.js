import { useState, useEffect } from "react"
import Item from "../Item"
const PersonalDetails=({personal})=>{

    const {fname,lname, dob,gender, phone,alternative_phone} =personal
    const {perma_addr1,perma_addr2,perma_state, perma_city, perma_pin} = personal.permanent_addr
    const {corr_addr1,corr_addr2, corr_state, corr_city, corr_pin} =personal.correspondence_addr
    const [altPhone,setAltPhone] =useState('NA')    
    useEffect(()=>{
        if(alternative_phone){
            console.log("alternative_phone")
            setAltPhone(alternative_phone)
        }
    },[])
    return(
        <>
        <div className="bg-purple-300">
            <div className='my-8 px-5 bg-slate-400 p-2 flex-wrap'>
                <p>Personal Details</p>
                <div className='px-5  bg-green-200'>
                    <Item title = {"First name"} val={fname}  />
                <Item title = {"Last name"} val={lname}  />
                <Item title = {"Date of birth"} val={dob}  />
                <Item title = {"Gender"} val={gender}  />
                <Item title = {"Phone no."} val={phone}  />
                <Item title = {"Alternative phone no."} val={alternative_phone}  />
                </div>
                
                <div className="flex m-0 p-0">
                    <div className='px-5  bg-green-200'>
                        <p className='font-bold'>Permanent Address</p>
                        <Item title = {"Address Line 1"} val={perma_addr1}  />
                        <Item title = {"Address Line 2"} val={perma_addr2}  />
                        <Item title = {"City"} val={perma_city}  />
                        <Item title = {"State"} val={perma_state}  />
                        <Item title = {"PIN"} val={perma_pin}  />
                    </div>
                    <div className='px-5 bg-green-200'>
                        <p className='font-bold'>Correspondence Address</p>
                        <Item title = {"Address Line 1"} val={corr_addr1}  />
                        <Item title = {"Address Line 2"} val={corr_addr2}  />
                        <Item title = {"City"} val={corr_city}  />
                        <Item title = {"State"} val={corr_state}  />
                        <Item title = {"PIN"} val={corr_pin}  />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default PersonalDetails
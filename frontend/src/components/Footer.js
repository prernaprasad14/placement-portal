import {useNavigate, Routes, Route, Link} from 'react-router-dom';
import React, { useState } from 'react';
import {BsTelephoneFill} from 'react-icons/bs'
import {AiOutlineLinkedin} from 'react-icons/ai'
import {MdEmail} from 'react-icons/md'
import axios from 'axios';

export default function Footer (){
  const date= new Date();
  const year = date.getFullYear()
  const [value, setValue]=useState('') 
  const handleChange=(e)=>{
    const {name, value} = e.target
    console.log(e.target.value)
    setValue({...value, [name]:value})
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
  }

  return (
    <footer className='bg-slate-800 text-center text-lg-start text-muted'>
         <section className='row justify-content-center justify-content-lg-between p-2 border-bottom'>
          <div className='mx-24'>
            <p className='my-1 text-white/75'>Placement Cell, Department of Computer Science
              <a href='https://www.linkedin.com/in/ducs-placement' className='text-white/50 hover:text-white'>
                    <AiOutlineLinkedin className='hover:scale-110 inline-block mx-2 text-2xl'/>
              </a>
            </p>
          </div>
        </section>
        <div className='container  container-fluid text-center text-md-start mt-2'>
          <div className='row mt-1 py-3 px-5'>
            <div className='my-3 col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0'>
                <h6 className=' mb-1 text-white/75'>Contact</h6>
                <p>1st Floor, New Academic Block</p>
                <p>Department of Computer Science</p>
                <p>Faculty of Mathematical Sciences</p>
                <p>University of Delhi</p>
                <p>Delhi - 110007</p>
                <p><BsTelephoneFill className='inline-block'/>+91-11-27667591, 27667059.</p>
            </div>
            <div className='my-3  col-md-3 col-lg-3 col-xl-3 mx-auto'>
              <h6 className='mb-1  text-white/75'>Technical support</h6>
              <p><MdEmail className='inline-block'/>mailexample@cs.du.ac.in</p>
              <p><BsTelephoneFill className='inline-block'/> + 01 234 567 88</p>
              <p><BsTelephoneFill className='inline-block'/> + 01 234 567 89</p>
              <div className='mt-4'>
                <h6>Department website - <a href='http://www.cs.du.ac.in/' className='no-underline hover:underline hover:text-white/75'>cs.du.ac.in</a></h6>
              </div>
            </div>
            
            <div className='my-3 col-md-2 col-lg-2 col-xl-2 mx-auto max-h-[190px]'>
              <h6 className='mb-1 text-white/75'>Get in touch</h6> 
              <form onSubmit={handleSubmit} className='row text-center text-slate-100'>
                <input type='text' placeholder='Name' required onChange={handleChange} className='mt-2 text-xs h-[32px] inline-block bg-slate-800 rounded-md w-44'/>
                <input type='email' placeholder='Email' required onChange={handleChange} className= 'mt-2 text-xs h-[32px] bg-slate-800 rounded-md w-44'/>
                <textarea type='text' placeholder='Write your message' required onChange={handleChange} maxLength='140' className='mt-2 srcollbar overflow-y-hidden text-xs  bg-slate-800 rounded-md w-44 min-h-[52px]  max-h-[130px]'/>
                <button type='submit' className='hover:animate-pulse border-1 border-slate-600 bg-slate-500/50 active:border-slate-200 hover:bg-slate-100/25 text-semibold hover:text-white text-sm px-4 py-1 my-2 rounded-md'>Send</button>
              </form>
            </div>
            <div className='my-3 col-md-2 col-lg-2 col-xl-2 mx-auto p-0 mb-2 '>
              <h6 className='mb-1 text-white/75'>Location</h6>
              <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.053481012389!2d77.20778981772624!3d28.688046752847605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd928daadb91%3A0x76aa925fc6e58347!2sDepartment%20of%20Computer%20Science%2C%20University%20of%20Delhi!5e0!3m2!1sen!2sus!4v1651235759797!5m2!1sen!2sus'
                  width='220' 
                  height='180' 
                  className='px-1 w-[410px] sm:w-[220px] h-[180px] rounded-sm'
                  loading='lazy' >
              </iframe>
            </div>
        </div>
        </div>
       
      <div className='text-center text-sm p-3 bg-black/20'>
        <p> Copyright ©{year}</p>
      <a href='http://www.cs.du.ac.in/' className='block no-underline hover:underline hover:text-white/75'>Department of Computer Science</a>
      <a href='http://www.du.ac.in/' className='block no-underline hover:underline hover:text-white/75'>University of Delhi</a>
      </div>

    </footer>
  )
}

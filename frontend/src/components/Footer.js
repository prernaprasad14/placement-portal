import {useNavigate, Routes, Route, Link} from 'react-router-dom';
import React from 'react';
import {BsTelephoneFill} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'

export default function Footer (){
  const date= new Date();
  const year = date.getFullYear() 

  return (
    <footer className="text-center text-lg-start bg-light text-muted">

      <section className="row justify-content-center justify-content-lg-between p-4 border-bottom">

        <div className="d-lg-block">
          <span></span>
        </div>

      </section>

        <div className="container text-center text-md-start mt-2">
          <div className="row">
            <div className="bg-gray-300 col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-2">
                <h6 className=" mb-4">Contact</h6>
                <p>1st Floor, New Academic Block</p>
                <p>Department of Computer Science</p>
                <p>Faculty of Mathematical Sciences</p>
                <p>University of Delhi</p>
                <p>Delhi - 110007</p>
                <p><BsTelephoneFill className='inline-block'/> + 01 234 567 89</p>
            </div>
            <div className=" bg-gray-300 col-md-3 col-lg-3 col-xl-2 mx-auto mb-2">
              <h6 className="mb-4">Technical support</h6>
              <p><MdEmail className='inline-block'/>mail@cs.du.ac.in</p>
              <p><BsTelephoneFill className='inline-block'/> + 01 234 567 88</p>
              <p><BsTelephoneFill className='inline-block'/> + 01 234 567 89</p>
            </div>
            <div className="bg-gray-200 col-md-2 col-lg-2 col-xl-2 mx-auto mb-2">
            
            
            </div>
        </div>
        </div>



      <div className="text-center p-4 mt-2 bg-black/20">
        Copyright ©{year} <br/>
        <p>Placement Cell, Department of Computer Science</p>
      <Link to='http://www.cs.du.ac.in/' className='no-underline hover:text-white'>University of Delhi</Link>
      </div>

    </footer>
  )
}
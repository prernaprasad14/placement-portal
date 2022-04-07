import React, { Component, useState } from 'react'
import PersonalDetails from './scholarForm/PersonalDetails'
import PostGraduation from './scholarForm/PostGraduation'
import Graduation from './scholarForm/Graduation'
import Intermediate from './scholarForm/Intermediate'
import HighSchool from './scholarForm/HighSchool'
import LoginDetails from './scholarForm/LoginDetails'
import axios from '../axiosConfig';

export default class ScholarRegistration extends Component {

    state = {
      step: 1,
      loginDetails:{
        email:'',
        password:'',
        confirmPassword:'',
        username:''
      },
      personalDetails:{
          fname:'',
          lname:'',
          dob:'',
          gender:'',
          placement_status:'',
          phone:'',
          alternative_phone :'',
          permanent_addr: {
              perma_addr1:'',
              perma_addr2:'',
              perma_state:'',
              perma_city:'',
              perma_pin:''
          },
          correspondence_addr :{
              corr_addr1:'',
              corr_addr2:'',
              corr_state:'',
              corr_city:'',
              corr_pin:'',
          }
      },
      postGraduationDetails : {
          pg_course:'',
          pg_exam_roll:'',
          pg_class_roll:'',
          pg_aggr_percentage:'',
          pg_backlogs:'',
          pg_backlog_details:''
      },
      graduationDetails :{
          grad_college:'',
          grad_university:'',
          grad_course:'',
          grad_roll_no:'',
          grad_marks_obtained:'',
          grad_max_marks:'',
          grad_aggr_percentage:'',
          grad_year_of_passing:''
      },
      intermediateDetails: {
          inter_board:'',
          inter_roll_no:'',
          inter_marks_obtained:'',
          inter_max_marks:'',
          inter_aggr_percentage:'',
          inter_year_of_passing:''
      },
      highSchoolDetails : {
          high_board:'',
          high_roll_no:'',
          high_marks_obtained:'',
          high_max_marks:'',
          high_aggr_percentage:'',
          high_year_of_passing:''
      }
    } 

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  // proceed to the next step
  nextStep = async(e) => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }

  // Handle fields change
  handleChange = input => e => {

    const obj= { [input]: e.target.value }
    this.setState({ [input]: e.target.value });
    console.log(`1 inside handleChange: `+{[input]:e.target.value});
    console.log(`2 inside handleChange: `+JSON.stringify(obj));
   
    const pattern={
      fname: /^\w{3,20}$/,
      lname: /^\w{3,20}$/,
      phone : /^\d{10}$/,
      alternative_phone: /^\d{10}$/,
      perma_addr1:/^\d{8,20}$/,
      perma_addr2:/^\d{8,20}$/,
      perma_state:/^\d{8,20}$/,
      perma_city:/^\d{8,20}$/,
      perma_pin: /^\d{6,8}$/,
      corr_addr1:/^\d{8,20}$/,
      corr_addr2:/^\d{8,20}$/,
      corr_state:/^\d{8,20}$/,
      corr_city:/^\d{8,20}$/,
      corr_pin: /^\d{6,8}$/,
      

      pg_course:/^$/,
      pg_exam_roll:/^\d{8,20}$/,
      pg_class_roll:/^\d{1,2}$/,
      pg_aggr_percentage:/^\d{2}$/,
      pg_backlogs:/^\d{0,2}$/,
      pg_backlog_details:/^\w+\.?$/,

      grad_college:/^$/,
      grad_university:/^$/,
      grad_course:/^\w+\.$/,
      grad_roll_no:/^\d{4,20}$/,
      grad_marks_obtained:/^[0-9]+\.?[0-9]*$/,
      grad_max_marks:/^\d{3,5}$/,
      grad_aggr_percentage:/^\d{2}$/,
      grad_year_of_passing:/^\d{4}$/,

      inter_board:/^$/,
      inter_roll_no:/^d{1,10}$/,
      inter_marks_obtained:/^[0-9]+\.?[0-9]*$/,
      inter_max_marks:/^$/,
      inter_aggr_percentage:/^$/,
      inter_year_of_passing:/^\d{4}$/,

      high_board:/^$/,
      high_roll_no:/^\d{8,20}$/,
      high_marks_obtained:/^\d{2}$/,
      high_max_marks:/^[0-9]+\.?[0-9]*$/,
      high_aggr_percentage:/^\d{2}$/,
      high_year_of_passing:/^\d{4}$/,
      email:/^\w{3,20}(\.\w{3,20}){0,3}(@cs\.du\.ac\.in)$/,
      password:/^\w{8,20}$/,
      confirmPassword:/^\w{8,20}$/,
      username:/^\w$/

    };
    
    var val = JSON.stringify(input) ;
    // const [valid , setValid]= useState(false)
    console.log("3 const val= JSON.stringify(input), val:: "+val)
    console.log("4 pattern.val:: "+`${pattern.val}`)
    console.log("5 e:: "+e.target )
    // console.log("pattern.[e.target.value]:: "+pattern.val)
    if(pattern[input].test(e.target.value) ){
        console.log("valid")
        //  
        console.log("input.classList"+input.className)
        console.log("e.target.classList "+e.target.classList )
        e.target.classList.remove('invalid')
        e.target.classList.add('valid')
        e.target.style.borderColor="#1BDA9C"; 
    }
    else{
        console.log("invalid")
        // setValid(false)
        e.target.classList.remove('valid')
        e.target.classList.add('invalid')
        e.target.style.borderColor="#DB2777";
    }
  }

  render() {
  
    const { step } = this.state;
   
    console.log("this.state"+this.state)
    console.log("this.state"+JSON.stringify(this.state))
    // const values = { email, password, confirmPassword, username,
    //     fname,lname,dob,gender,phone,alternative_phone,
    //     perma_addr1,perma_addr2,perma_state,perma_city,perma_pin,
    //     corr_addr1,corr_addr2,corr_state,corr_city,corr_pin,
    //     pg_course,pg_exam_roll, pg_class_roll,pg_aggr_percentage,pg_backlogs,pg_backlog_details,
    //     grad_college,grad_university,grad_course,grad_roll_no,grad_marks_obtained,grad_max_marks,grad_aggr_percentage,grad_year_of_passing,
    //     inter_board,inter_roll_no,inter_marks_obtained,inter_max_marks,inter_aggr_percentage,inter_year_of_passing,
    //     high_board, high_roll_no, high_marks_obtained,high_max_marks,high_aggr_percentage,high_year_of_passing
    // }
    
    switch(step) {
      case 1: 
        return (<>
          <div className='flex flex-col pt-12 text-slate-900 bg-slate-100 items-center'>
            <p className='text-2xl font-bold '>Registration Form Placements'22</p>
          </div>
          <PersonalDetails 
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ this.state }
          /></>
        )
      case 2:
          return ( 
          <PostGraduation
              prevStep={ this.prevStep }
              nextStep={ this.nextStep }
              handleChange={ this.handleChange }
              values={ this.state  }
            /> 
            
          )
      case 3: 
        return (
          <Graduation
          prevStep={ this.prevStep }
          nextStep={ this.nextStep }
          handleChange={ this.handleChange }
          values={ this.state  }
        />
        )
      case 4: 
        return (
          <Intermediate
            prevStep={ this.prevStep }
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={this.state  }
          />
        )
      case 5: 
        return (
          <HighSchool
          prevStep={ this.prevStep }
          nextStep={ this.nextStep }
          handleChange={ this.handleChange }
            values={this.state  }
          />
        )
      case 6: 
        return (
          <LoginDetails
          prevStep={ this.prevStep }
          handleChange={ this.handleChange }
            values={ this.state  }
          />
        )
      // case 7: 
      //   return (
      //     <Confirm />
      //   )
      default: 
          // do nothing
    }
    
  }
}
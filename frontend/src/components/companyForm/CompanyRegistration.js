import React, { Component } from 'react'
import BasicDetails from './BasicDetails';
import ContactDetails from './ContactDetails';
import JobDetails from './JobDetails';
import LoginDetails from './LoginDetails';
import PlacementTimeline from './PlacementTimeline';
import SelectionDetails from './SelectionDetails';
import axios from '../../axiosConfig';


export default class CompanyRegistration extends Component {
  constructor(props) {
        
    super(props)
    this.state = {
      step: 1,
      "loginDetails":{
        email:'',
        password:'',
        confirmPassword:'',
        username:''
      },
       cname:'',
       phone:'',
       website:'',
       "contactDetails":{
         "head_hr":{
          head_name:'',
          head_email: '',
          head_mobile:'',
         },
         "second_contact":{
           second_name:'',
           second_email:'',
           second_mobile:''
         },
       },
       "jobDetails":{
         job_profile:'',
         designation:'',
         place_of_posting:'',
         job_desc:'',
         recruitment_type:'',
         "salary_details":{
             annual_package:'',
             breakage_ctc:''
         }
     },    
    "selectionDetails":{
         courses_allowed:'',  
         aptitude_test : '',
         coding_test: '',
         interview:'',
         hr_round:'',
         any_other_rounds:'',
     },
     "placement_timeline":{
         pre_placement_talk:'',
         coding_test_date:'',
         interview_date:'',
         notes:''
      }
    } 
    this.handleChange = this.handleChange.bind(this)
  }
  // go back to previous step
  prevStep = () => {
    const { step , } = this.state;
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

      email:/^$/,
      password:/^$/,
      confirmPassword:/^$/,
      username:/^$/,
      cname:/^$/,
      phone: /^\d{10, 13}$/,
      website:/^$/,
      contactDetails:/^$/,
      head_name:/^$/,
      head_email:/^$/,
      head_phone:/^$/,
      //second contact person
      second_name:/^$/,
      second_email:/^$/,
      second_phone:/^$/,

      courses_allowed:/^$/,
      recruitment_type:/^$/,
      job_profile:/^$/,
      designation:/^$/,
      place_of_posting:/^$/,
      job_desc:/^$/,
      salary:/^$/,
      annual_package:/^$/,
      breakage_ctc: /^$/,    
      pre_placement_talk:/^$/,
      aptitude_test:/^$/,
      coding_test:/^$/,
      interview:/^$/,
      hr_round:/^$/,
      any_other_rounds:/^$/,
      coding_test:/^$/,
      interview: /^$/,
    }

    if(pattern[input].test(e.target.value) ){
        e.target.classList.remove('invalid')
        e.target.classList.add('valid')
        e.target.style.borderColor="#1BDA9C"; 
    }
    else{
        e.target.classList.remove('valid')
        e.target.classList.add('invalid')
        e.target.style.borderColor="#DB2777";
    }
  }
 

  render() {
  
    const { step } = this.state;
    console.log("this.state"+this.state)
    console.log("this.state"+JSON.stringify(this.state))
    
    switch(step) {
      case 1: 
        return (<>
          <div className='flex flex-col pt-12 text-slate-900 bg-slate-100 items-center'>
            <p className='text-2xl font-bold '>Requisition Form Placements'22</p>
          </div>
          <BasicDetails 
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ this.state }
          /></>
        )
      case 2:
          return ( 
          <ContactDetails
              prevStep={ this.prevStep }
              nextStep={ this.nextStep }
              handleChange={ this.handleChange }
              values={ this.state }
            />
            
          )
      case 3: 
       return(
         <JobDetails
            prevStep={ this.prevStep }
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ this.state }
          />
       )
    
        
      case 4: 
        return (
          <SelectionDetails
            prevStep={ this.prevStep }
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ this.state }
          />
        )
      case 5: 
        return (
          <PlacementTimeline
          prevStep={ this.prevStep }
          nextStep={ this.nextStep }
          handleChange={ this.handleChange }
          values={ this.state }
          />
        )
      case 6: 
        return (
          <LoginDetails
          prevStep={ this.prevStep }
          handleChange={ this.handleChange }
            values={ this.state }
          />
        )
      // case 7: 
      //   return (
      //     <Confirm/>
      //   )
      default: 
          // do nothing
    }
    
  }
}
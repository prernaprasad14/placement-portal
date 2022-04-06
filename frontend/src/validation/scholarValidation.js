import * as Yup from "yup";
import moment from "yup"
export const scholarSchema= Yup.object().shape({
  
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(20).required(),
    confirmPassword: Yup.string().min(8).max(20).required(),
    username:Yup.string().min(8).max(20).required(),
    fname: Yup.string().min(3).max(20).required(),
    lname: Yup.string().min(3).max(20).required(),
    // dob:Yup.test("DOB", "Please choose a valid date of birth", (value) => {
    //     return moment().diff(moment(value), "years") >= 19;
    //     }).required(),
        
    // gender:Yup.string().required(),
    phone: Yup.string().matches(/^\d+$/).min(3).max(20).required(),
    alternative_phone : Yup.string().matches(/^\d+$/).min(10).max(10),
    perma_addr1: Yup.string().max(20).required(),
    perma_addr2: Yup.string().max(20).required(),
    perma_state: Yup.string().max(20).required(),
    perma_city: Yup.string().max(20).required(),
    perma_pin: Yup.string().matches(/^\d+$/).max(6).required(),
    corr_addr1: Yup.string().max(20).required(),
    corr_addr2: Yup.string().max(20).required(),
    corr_state: Yup.string().max(20).required(),
    corr_city: Yup.string().max(20).required(),
    corr_pin: Yup.string().matches(/^\d+$/).max(6).required(),
    pg_course: Yup.string().max(20).required(),
    pg_exam_roll: Yup.string().matches(/^\d+$/).max(6).required(),
    pg_class_roll: Yup.string().matches(/^\d+$/).max(6).required(),
    pg_aggr_percentage: Yup.string().matches(/^\d+$/).max(2).required(),
    pg_backlogs: Yup.string().matches(/^\d+$/).max(1).required(),
    pg_backlog_details: Yup.string().max(20).required(),
    pg_backlog_details: Yup.string().when("pg_backlogs",{
        is:true,
        then: Yup.string().max(20).required("Must enter details of backlogs")
    }),
    grad_college: Yup.string().max(15).required(),
    grad_university: Yup.string().max(15).required(),
    grad_course: Yup.string().max(15).required(),
    grad_roll_no: Yup.string().matches(/^\d+$/).max(6).required(),
    grad_marks_obtained: Yup.string().matches(/^\d+$/).max(6).required(),
    grad_max_marks: Yup.string().matches(/^\d+$/).max(6).required(),
    grad_aggr_percentage: Yup.string().matches(/^\d+$/).max(2).required(),
    grad_year_of_passing: Yup.string().matches(/^\d+$/).min(4).max(4).required(),

    inter_board:Yup.string().max(15).required(),
    inter_roll_no: Yup.string().matches(/^\d+$/).max(6).required(),
    inter_marks_obtained:Yup.string().matches(/^\d+$/).max(6).required(),
    inter_max_marks:Yup.string().matches(/^\d+$/).max(6).required(),
    inter_aggr_percentage: Yup.string().matches(/^\d+$/).max(2).required(),
    inter_year_of_passing: Yup.string().matches(/^\d+$/).min(4).max(4).required(),

    high_board: Yup.string().max(15).required(),
    high_roll_no: Yup.string().matches(/^\d+$/).max(6).required(),
    high_marks_obtained: Yup.string().matches(/^\d+$/).max(6).required(),
    high_max_marks: Yup.string().matches(/^\d+$/).max(6).required(),
    high_aggr_percentage: Yup.string().matches(/^\d+$/).max(2).required(),
    high_year_of_passing: Yup.string().matches(/^\d+$/).min(4).max(4).required()

})

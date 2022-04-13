const GraduationDetails=({graduation})=>{
    const { grad_college, grad_university , grad_course , 
        grad_roll_no , grad_marks_obtained , grad_max_marks, 
        grad_aggr_percentage, grad_year_of_passing
    } = graduation

    return(
        <>
        <div className="bg-sky-300">
            <div>Graduations Details</div>
            <div className ="flex">
                <div>College</div>
                <div className="px-3 border-2  bg-white">{grad_college}</div>
            </div>
            <div className ="flex">
                <div>University</div>
                <div className="px-3 border-2  bg-white">{grad_university}</div>
            </div>
            <div className ="flex">
                <div>Course</div>
                <div className="px-3 border-2  bg-white">{grad_course}</div>
            </div>
            <div className ="flex">
                <div>Roll number</div>
                <div className="px-3 border-2  bg-white">{grad_roll_no}</div>
            </div>
            <div className ="flex">
                <div>Marks obtained</div>
                <div className="px-3 border-2  bg-white">{grad_marks_obtained}</div>
            </div>
            <div className ="flex">
                <div>Maximum Marks</div>
                <div className="px-3 border-2  bg-white">{grad_max_marks}</div>
            </div>
            <div className ="flex">
                <div>Aggregate Percentage</div>
                <div className="px-3 border-2  bg-white">{grad_aggr_percentage}</div>
            </div>
            <div className ="flex">
                <div>Year of passing</div>
                <div className="px-3 border-2  bg-white">{grad_year_of_passing}</div>
            </div>
        </div>
        </>
    )
}
export default GraduationDetails
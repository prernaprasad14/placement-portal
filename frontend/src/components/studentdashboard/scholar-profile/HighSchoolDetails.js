const HighSchoolDetails=({highschool})=>{
    const { high_board, high_roll_no , high_marks_obtained , high_max_marks, 
        high_aggr_percentage, high_year_of_passing
    } = highschool

    return(
        <>
        <div className="bg-sky-300">
            <div>Highschool Details (10th)</div>
            <div className ="flex">
                <div>High School board</div>
                <div className="px-3 border-2  bg-white">{high_board}</div>
            </div>
            <div className ="flex">
                <div>Roll number</div>
                <div className="px-3 border-2  bg-white">{high_roll_no}</div>
            </div>
            <div className ="flex">
                <div>Marks obtained</div>
                <div className="px-3 border-2  bg-white">{high_marks_obtained}</div>
            </div>
            <div className ="flex">
                <div>Maximum Marks</div>
                <div className="px-3 border-2  bg-white">{high_max_marks}</div>
            </div>
            <div className ="flex">
                <div>Aggregate Percentage</div>
                <div className="px-3 border-2  bg-white">{high_aggr_percentage}</div>
            </div>
            <div className ="flex">
                <div>Year of passing</div>
                <div className="px-3 border-2  bg-white">{high_year_of_passing}</div>
            </div>
        </div>
        </>
    )
}
export default HighSchoolDetails
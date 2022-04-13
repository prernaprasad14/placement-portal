const IntermediateDetails=({intermediate})=>{
    const { inter_board,inter_roll_no , inter_marks_obtained , inter_max_marks, 
        inter_aggr_percentage, inter_year_of_passing
    } = intermediate

    return(
        <>
        <div className="bg-rose-300">
            <div>Intermediate Details (10+2 or Equivalent)</div>
            <div className ="flex">
                <div>Intermediate Board</div>
                <div className="px-3 border-2  bg-white">{inter_board}</div>
            </div>
            <div className ="flex">
                <div>Roll number</div>
                <div className="px-3 border-2  bg-white">{inter_roll_no}</div>
            </div>
            <div className ="flex">
                <div>Marks obtained</div>
                <div className="px-3 border-2  bg-white">{inter_marks_obtained}</div>
            </div>
            <div className ="flex">
                <div>Maximum Marks</div>
                <div className="px-3 border-2  bg-white">{inter_max_marks}</div>
            </div>
            <div className ="flex">
                <div>Aggregate Percentage</div>
                <div className="px-3 border-2  bg-white">{inter_aggr_percentage}</div>
            </div>
            <div className ="flex">
                <div>Year of passing</div>
                <div className="px-3 border-2  bg-white">{inter_year_of_passing}</div>
            </div>
        </div>
        </>
    )
}
export default IntermediateDetails
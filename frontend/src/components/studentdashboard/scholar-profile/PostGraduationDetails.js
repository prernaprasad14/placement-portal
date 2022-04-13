const PostGraduationDetails = ({postgraduation})=>{
    const {pg_course, pg_exam_roll, pg_class_roll , pg_aggr_percentage , pg_backlogs , pg_backlog_details }=postgraduation
    return(
        <>
        <div className="bg-green-300">
                    <div>Post Graduation Details</div>
                    <div className ="flex">
                        <div>Course</div>
                        <div  className="px-3 border-2  bg-white">{pg_course}</div>
                    </div>
                    <div className ="flex">
                        <div>Examination roll no.</div>
                        <div className="px-3 border-2  bg-white">{pg_exam_roll}</div>
                    </div>
                    <div className ="flex">
                        <div>Class roll no.</div>
                        <div className="px-3 border-2  bg-white">{pg_class_roll}</div>
                    </div>
                    <div className ="flex">
                        <div>Aggregate Percentage</div>
                        <div className="px-3 border-2  bg-white">{pg_aggr_percentage}</div>
                    </div>
                    <div className ="flex">
                        <div>Backlogs</div>
                        <div className="px-3 border-2  bg-white">{pg_backlogs}</div>
                    </div>
                    <div className ="flex">
                        <div>Details of Backlogs</div>
                        <div className="px-3 border-2  bg-white">{pg_backlog_details}</div>
                    </div>
                </div>
                </>
    )
}
export default PostGraduationDetails
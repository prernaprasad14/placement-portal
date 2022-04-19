const Loading=({message})=>{
    return(
        <>
        <div className='bg-zinc-100 bg-gradient-to-b h-68 from-white to-zinc-100/25 '>
                    <div className=' flex flex-col py-52 items-center '>
                        
                            <svg className="spinner" viewBox="0 0 50 50">
                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                            </svg>
                        
                        <p className='px-2 text-xl text-zinc-400'>{message}</p>
                    </div>
                </div>
        </>
    )
}
export default Loading
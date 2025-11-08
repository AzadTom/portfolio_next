import React from 'react'

const index = () => {
    return (
        <div className="grid  grid-cols-6 grid-rows-7 gap-4 h-screen max-w-[1000px] mx-auto py-20">
            <div className="row-span-4">
                <div className='w-full h-full bg-gray-400 rounded-3xl'>
                    <img className='w-full h-full object-cover rounded-3xl' src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1064" alt="img" />
                </div>
            </div>
            <div className="col-span-3 row-span-4">
                <div className='w-full h-full bg-gray-400 rounded-3xl'>
                    <img className='w-full h-full object-cover rounded-3xl' src="https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" alt="img" />
                </div>
            </div>
            <div className="col-span-2 row-span-4 col-start-5">
                <div className='w-full h-full bg-gray-400 rounded-3xl'>
                    <img className='w-full h-full object-cover rounded-3xl' src="https://images.unsplash.com/photo-1604079628040-94301bb21b91?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" alt="img" />
                </div>
            </div>
            <div className="col-span-2 row-span-3 row-start-5">
                <div className='w-full h-full bg-gray-400 rounded-3xl'>
                    <img className='w-full h-full object-cover rounded-3xl' src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" alt="img" />
                </div>
            </div>
            <div className="col-span-4 row-span-3 col-start-3 row-start-5">

                <div className='w-full h-full bg-gray-400 rounded-3xl'>
                    <img className='w-full h-full object-cover rounded-3xl' src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" alt="img" />
                </div>
            </div>
        </div>

    )
}

export default index
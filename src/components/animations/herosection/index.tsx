import React from 'react'

const index = () => {
    return (
        <div className=''>
            <NavBar/>
            <div className='text-white text-center'>
                <h1 className='font-bold text-[clamp(32px,48px,100px)] leading-12 mt-5'>
                    AI-Driven Conversion <br />
                    Growth Right Away 
                </h1>
                <p className='text-center mt-5'>From concept to conversation - manage thousands of successful <br /> influencer ads seamlessly.</p>
                <div className='flex justify-center items-center gap-4 mt-5'>
                    <button className='bg-white text-black rounded-full px-6 py-2'>Download Free App</button>
                    <button className='text-white border border-white px-6 py-2 rounded-full'>Get Started Free</button>
                </div>
            </div>
            <Graphics/>
        </div>
    )
}

export default index

const NavBar = () => {

    return (
        <nav className='flex justify-between items-center max-w-[1000px] mx-auto py-10 '>
            <div>
            </div>
            <div>
                <ul className='flex items-center gap-8 font-light text-white'>
                    <li>Products</li>
                    <li>Customer Stories</li>
                    <li>Resources</li>
                    <li>Pricing</li>
                </ul>
            </div>
            <div className='flex items-center  gap-4 text-white'>
                <button>Book a Demo</button>
                <button className='h-[40px] bg-white rounded-full text-black px-5 py-2'>Get Started</button>
            </div>
        </nav>
    )

}


const Graphics = ()=>{

    return(
        <div>
            
        </div>
    )
}
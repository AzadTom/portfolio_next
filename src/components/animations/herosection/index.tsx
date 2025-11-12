import React from 'react'

const index = () => {
    return (
        <div className=''>
            <NavBar/>
            <div className='text-white text-center'>
                <h1 className='font-bold text-[clamp(32px,48px,100px)]'>
                    AI-Driven Conversion <br />
                    Growth Right Away 
                </h1>
                <p>From concept to conversation - manage thousands of successful influencer ads seamlessly.</p>
                <div>
                    <button>Download Free App</button>
                    <button>Get Started Free</button>
                </div>
            </div>
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
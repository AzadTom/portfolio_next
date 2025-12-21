import React from 'react'

const Navigation = () => {

    return (
        <nav className='sm:flex justify-between items-center text-black px-12 py-8 hidden'>
            <div className='flex gap-6 text-base'>
                <a href="">Overview</a>
                <a href="">Solutions</a>
                <a href="">Resources</a>
            </div>
            <div className='size-[80px]'>
                <img width={42} height={42} src="https://freepngimg.com/thumb/burger/147579-king-logo-burger-free-png-hq.png" className='w-full h-full object-contain' alt="logo" />
            </div>
            <div className='flex gap-6 text-base'>
                <button><a href="">Live Demo</a></button>
                <button className='bg-white text-black px-6 py-2 rounded-4xl font-medium'><a href="">Get Started</a></button>
            </div>
        </nav>
    )
}

export default Navigation